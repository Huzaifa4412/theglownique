import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { BLOG_CACHE_TAG } from "@/lib/blog";

/**
 * Sanity → Next revalidation webhook.
 *
 * Without this the blog is still correct, just slower: every read is tagged and
 * revalidated on a five-minute window (see REVALIDATE_SECONDS in lib/blog.ts),
 * so a published post appears on its own eventually. This route is what makes
 * "eventually" mean "now".
 *
 * ── Wiring it up ────────────────────────────────────────────────────────────
 *
 * 1. Set SANITY_REVALIDATE_SECRET in .env.local and in the Vercel project.
 * 2. sanity.io/manage → API → Webhooks → Create webhook:
 *      URL      https://www.theglownique.com/api/revalidate
 *      Dataset  production
 *      Trigger  Create, Update, Delete
 *      Filter   _type in ["post", "category", "author", "blogSettings"]
 *      Secret   the same value as SANITY_REVALIDATE_SECRET
 *      HTTP     POST, API version v2021-03-25
 *
 * ── Why the signature check is not optional ─────────────────────────────────
 *
 * An unauthenticated revalidation endpoint is a free cache-flush button for
 * anyone who finds the URL: hammer it and every request behind it becomes a
 * cache miss that hits Sanity. So a missing secret returns 401 rather than
 * quietly trusting the caller — a webhook that silently stopped verifying is
 * worse than one that visibly stopped working.
 */

const REVALIDATE_TYPES = new Set(["post", "category", "author", "blogSettings"]);

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set — refusing to revalidate.");
    return NextResponse.json({ message: "Revalidation is not configured." }, { status: 401 });
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string; slug?: string }>(
      req,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature." }, { status: 401 });
    }

    const type = body?._type;
    if (!type || !REVALIDATE_TYPES.has(type)) {
      // Not an error — the webhook filter may be broader than this route cares
      // about, and a 200 keeps Sanity from retrying something we chose to skip.
      return NextResponse.json({ message: `Ignored ${type ?? "unknown"} document.` });
    }

    // One tag covers every blog read. Per-post tags would let a single edit
    // revalidate less, but a post edit also changes the hub, its category
    // archive and the "keep reading" rail on every sibling post — so the
    // narrower tag would need four more invalidations to stay correct, and
    // would silently miss the fifth the day someone adds another surface.
    revalidateTag(BLOG_CACHE_TAG, "max");

    return NextResponse.json({ revalidated: true, type });
  } catch (error) {
    console.error("[revalidate] Failed:", error);
    return NextResponse.json({ message: "Revalidation failed." }, { status: 500 });
  }
}
