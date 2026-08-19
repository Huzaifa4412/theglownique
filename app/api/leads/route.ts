import { NextResponse } from "next/server";

import { LEAD_LIMITS, type LeadPayload } from "@/lib/leads";
import {
  HAS_SANITY_WRITE_ACCESS,
  writeClient,
} from "@/sanity/lib/write-client";

/**
 * POST /api/leads — archive a submitted enquiry as a Sanity `lead` document.
 *
 * This is the only place in the app holding a Sanity write token, and the reason
 * lead capture is a route handler rather than a client-side write: a write token
 * in the browser bundle would let anyone edit or delete the entire dataset.
 *
 * Never trusted input: every field is coerced to a string, length-capped, and
 * whitelisted by name, so a caller cannot smuggle extra keys into the document
 * or post a megabyte of text.
 *
 * Always returns a 2xx to the browser on anything that is not a validation
 * error. The form's job is to get the customer to WhatsApp or the chat widget;
 * if archiving fails, that is our problem to see in logs, not a dead end for
 * them.
 */

// Uses a request body and a secret, so it must never be statically evaluated.
export const dynamic = "force-dynamic";

/** Only these keys are ever written. Anything else in the body is discarded. */
const STRING_FIELDS = [
  "name",
  "email",
  "phone",
  "country",
  "topic",
  "signType",
  "size",
  "quantity",
  "usageLocation",
  "budget",
  "timeline",
  "orderNumber",
  "pagePath",
] as const;

const VALID_SOURCES = new Set(["contact-form", "pre-chat", "newsletter"]);

/** Newsletter signups only ask for an email, so a name cannot be required. */
const SOURCES_WITHOUT_NAME = new Set(["newsletter"]);

/** Deliberately permissive — just enough to reject obvious nonsense. */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : undefined;
}

export async function POST(request: Request) {
  let body: Partial<LeadPayload>;
  try {
    body = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = clean(body.name, LEAD_LIMITS.short);
  const email = clean(body.email, LEAD_LIMITS.short);
  const source = clean(body.source, LEAD_LIMITS.short);

  if (!source || !VALID_SOURCES.has(source)) {
    return NextResponse.json({ error: "unknown source" }, { status: 400 });
  }
  if (!email || !EMAIL_SHAPE.test(email)) {
    return NextResponse.json({ error: "a valid email is required" }, { status: 400 });
  }
  if (!name && !SOURCES_WITHOUT_NAME.has(source)) {
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  }

  // No token configured (a fresh clone, or a preview deploy without secrets).
  // Accept the request and say so, rather than 500-ing at a customer.
  if (!HAS_SANITY_WRITE_ACCESS) {
    console.warn(
      "[leads] SANITY_API_WRITE_TOKEN is not set — lead accepted but NOT archived.",
    );
    return NextResponse.json({ archived: false }, { status: 202 });
  }

  // `_type` typed as a literal, not just a string key, because Sanity's create()
  // requires a document stub that provably has one.
  const document: { _type: "lead" } & Record<string, unknown> = {
    _type: "lead",
    status: "new",
    source,
    submittedAt: new Date().toISOString(),
    consent: body.consent === true,
  };

  for (const field of STRING_FIELDS) {
    const value = clean(body[field], LEAD_LIMITS.short);
    if (value !== undefined) document[field] = value;
  }
  const message = clean(body.message, LEAD_LIMITS.message);
  if (message !== undefined) document.message = message;

  try {
    await writeClient.create(document);
    return NextResponse.json({ archived: true }, { status: 201 });
  } catch (error) {
    // Log for us, succeed for them. Losing the archive copy must not look like a
    // broken form to a customer who has already been handed to WhatsApp.
    console.error("[leads] Sanity write failed:", error);
    return NextResponse.json({ archived: false }, { status: 202 });
  }
}
