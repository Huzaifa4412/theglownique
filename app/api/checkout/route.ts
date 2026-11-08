import { NextResponse } from "next/server";
import { parseCheckout } from "@/lib/cart";
import { checkoutConfigured, sendCheckoutEmail } from "@/lib/checkout-email";
import { CheckoutConflict, fulfillCheckout } from "@/lib/checkout-service";
import { callerKey, createRateLimiter } from "@/lib/rate-limit";
import {
  HAS_SANITY_WRITE_ACCESS,
  writeClient,
} from "@/sanity/lib/write-client";

export const runtime = "nodejs";
const checkRate = createRateLimiter({ limit: 8, windowMs: 10 * 60_000 });
const MAX_BODY_BYTES = 96 * 1024;

async function limitedJson(request: Request) {
  if (!request.body) throw new Error("Missing request body");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let text = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("Request too large");
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return NextResponse.json({ error: "Expected JSON." }, { status: 415 });
  const rate = checkRate(callerKey(request));
  if (!rate.allowed)
    return NextResponse.json(
      {
        error:
          "Too many attempts. Your cart is saved; please try again shortly.",
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfterSeconds) },
      },
    );
  let payload;
  try {
    payload = parseCheckout(await limitedJson(request));
  } catch (cause) {
    return NextResponse.json(
      {
        error:
          cause instanceof Error ? cause.message : "Please check your details.",
      },
      { status: 400 },
    );
  }
  if (!checkoutConfigured() || !HAS_SANITY_WRITE_ACCESS)
    return NextResponse.json(
      {
        error:
          "Email checkout is temporarily unavailable. Your cart is saved; please contact us.",
      },
      { status: 503 },
    );
  try {
    const result = await fulfillCheckout(payload, {
      create: (record) =>
        writeClient.createIfNotExists(record, { autoGenerateArrayKeys: true }),
      update: (id, fields) => writeClient.patch(id).set(fields).commit(),
      send: sendCheckoutEmail,
    });
    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (cause) {
    if (cause instanceof CheckoutConflict)
      return NextResponse.json({ error: cause.message }, { status: 409 });
    // Never log the request body, email address, or provider response with PII.
    console.error("[checkout] Submission incomplete", {
      submissionId: payload.submissionId,
    });
    return NextResponse.json(
      {
        error:
          "We couldn’t finish sending your request. Your cart is saved; please retry with the same details.",
      },
      { status: 503 },
    );
  }
}
