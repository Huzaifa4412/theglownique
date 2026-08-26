import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { callerKey, createRateLimiter } from "@/lib/rate-limit";
import type { OutboundClickPayload } from "@/lib/outbound-click";
import { getPostHogClient } from "@/lib/posthog-server";
import { HAS_SANITY_WRITE_ACCESS, writeClient } from "@/sanity/lib/write-client";

/**
 * POST /api/outbound-click — record that a WhatsApp or Etsy CTA was opened.
 *
 * Same shape and same rules as /api/leads: the browser holds no write token, so
 * the write happens here; every field is whitelisted by name, coerced to a
 * string and length-capped, so a caller cannot smuggle extra keys into the
 * document or post a megabyte of text.
 *
 * ── What this can and cannot tell you ───────────────────────────────────────
 *
 * It records intent, not outcome. Once the visitor is handed to `wa.me` or to
 * Etsy this site sees nothing more, so a row here means "somebody opened
 * WhatsApp" or "somebody opened Etsy" — never "somebody messaged us" or
 * "somebody bought". Treat the count as CTA performance; WhatsApp and the Etsy
 * dashboard hold the truth about what followed. The schema docblock says the
 * same thing where an editor will read it.
 *
 * ── Privacy stance ──────────────────────────────────────────────────────────
 *
 * No cookie, no visitor id, no IP stored, no full URL. The IP is read to rate
 * limit and then discarded; the country header is coarse by construction. This
 * is what keeps the endpoint inside the "no profiling or scoring" promise on
 * /privacy — see SITE_MEASUREMENT in lib/claims.ts, which is the record that
 * page is generated from. Widening what is stored means updating that record in
 * the same release.
 *
 * Always returns 2xx on anything that is not a validation error or a rate-limit
 * rejection: a failed beacon must never surface to a visitor who is already on
 * their way out to buy something.
 */

// Reads request headers, so it must never be statically evaluated.
export const dynamic = "force-dynamic";

/**
 * Thirty a minute per address.
 *
 * A real person clicks a conversion button once or twice, and repeats within a
 * page are already suppressed in the browser. Thirty leaves generous room for a
 * shared office or mobile-carrier NAT address — where many genuine visitors
 * share one IP — while stopping a loop from writing thousands of documents into
 * the dataset overnight.
 */
const checkRate = createRateLimiter({ limit: 30, windowMs: 60_000 });

const VALID_CHANNELS = new Set(["whatsapp", "etsy"]);

/** Longest any single field may be. Nothing here is prose. */
const MAX_FIELD = 200;

function clean(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().slice(0, MAX_FIELD);
  return trimmed.length > 0 ? trimmed : undefined;
}

/**
 * Keep only the path.
 *
 * A query string can carry anything — an email in a link somebody pasted, a
 * session token from another system. Storing the path alone is both all we need
 * and the only version of this field that is safe by construction.
 */
function cleanPath(value: unknown): string | undefined {
  const raw = clean(value);
  if (!raw || !raw.startsWith("/")) return undefined;
  return raw.split("?")[0]!.split("#")[0];
}

/** Hostname shape only — no paths, no credentials, no ports. */
function cleanHost(value: unknown): string | undefined {
  const raw = clean(value)?.toLowerCase();
  if (!raw) return undefined;
  return /^[a-z0-9.-]+$/.test(raw) ? raw : undefined;
}

/**
 * Mobile or desktop, from request headers rather than anything the client
 * asserts. `sec-ch-ua-mobile` is exact where it exists (Chromium); the
 * user-agent sniff is the fallback for Safari and Firefox.
 */
function readDevice(request: Request): "mobile" | "desktop" {
  const hint = request.headers.get("sec-ch-ua-mobile");
  if (hint === "?1") return "mobile";
  if (hint === "?0") return "desktop";

  const ua = request.headers.get("user-agent") ?? "";
  return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(ua) ? "mobile" : "desktop";
}

/** Two-letter country from the CDN edge. Absent off Vercel, which is fine. */
function readCountry(request: Request): string | undefined {
  const country = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase();
  return country && /^[A-Z]{2}$/.test(country) ? country : undefined;
}

export async function POST(request: Request) {
  const { allowed, retryAfterSeconds } = checkRate(callerKey(request));
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  let body: Partial<OutboundClickPayload>;
  try {
    body = (await request.json()) as Partial<OutboundClickPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const channel = clean(body.channel);
  const source = clean(body.source);
  const pagePath = cleanPath(body.pagePath);

  if (!channel || !VALID_CHANNELS.has(channel)) {
    return NextResponse.json({ error: "unknown channel" }, { status: 400 });
  }
  if (!source || !pagePath) {
    return NextResponse.json({ error: "source and pagePath are required" }, { status: 400 });
  }

  // No token configured (a fresh clone, or a preview deploy without secrets).
  // Accept and say so rather than 500-ing at a visitor mid-click.
  if (!HAS_SANITY_WRITE_ACCESS) {
    console.warn("[outbound-click] SANITY_API_WRITE_TOKEN is not set — click NOT recorded.");
    return NextResponse.json({ recorded: false }, { status: 202 });
  }

  // Dotted `_id`, for the same reason as /api/leads: this dataset is public so
  // the blog can be read anonymously, and a public dataset grants anonymous read
  // on every id without a dot. These rows are analytics — country, device,
  // referrer, campaign — and they are ours, not the internet's.
  const document: { _type: "outboundClick"; _id: string } & Record<string, unknown> = {
    _id: `outboundClick.${randomUUID()}`,
    _type: "outboundClick",
    channel,
    // Server clock, not the browser's: a device with a wrong date would
    // otherwise scatter rows across the timeline and quietly ruin every count.
    occurredAt: new Date().toISOString(),
    source,
    pagePath,
    device: readDevice(request),
  };

  const country = readCountry(request);
  if (country) document.country = country;

  const referrerHost = cleanHost(body.referrerHost);
  if (referrerHost) document.referrerHost = referrerHost;

  const utmSource = clean(body.utmSource);
  if (utmSource) document.utmSource = utmSource;

  const utmMedium = clean(body.utmMedium);
  if (utmMedium) document.utmMedium = utmMedium;

  const utmCampaign = clean(body.utmCampaign);
  if (utmCampaign) document.utmCampaign = utmCampaign;

  try {
    await writeClient.create(document);

    const posthog = getPostHogClient();
    if (posthog) {
      posthog.capture({
        event: "outbound_click_tracked",
        properties: {
          channel,
          source,
          page_path: pagePath,
          device: document.device,
        },
      });
      await posthog.flush();
    }

    return NextResponse.json({ recorded: true }, { status: 201 });
  } catch (error) {
    console.error("[outbound-click] Sanity write failed:", error);
    return NextResponse.json({ recorded: false }, { status: 202 });
  }
}
