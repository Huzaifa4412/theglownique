/**
 * Commercial claims as release data.
 *
 * Implements TECH-06 of SEO-Optimization/07-technical-seo-plan.md: every claim
 * that appears in visible copy, metadata, structured data and llms.txt resolves
 * to ONE value here, so a claim can never say three different things on three
 * surfaces. The evidence and owner for each claim live in
 * SEO-Optimization/resources/claims-and-proof-register.csv; this file is the
 * runtime half of that register.
 *
 * Rule when changing anything below: if a claim loses its evidence, it must be
 * removed from visible content, metadata, schema AND llms.txt in the same
 * release (see "Rollback rules" in the technical plan). Do not soften a claim
 * on one surface and leave it standing on another.
 */

export type ClaimStatus =
  /** Owner-approved and safe to state as fact. */
  | "approved"
  /** Stated today, but the evidence has not been supplied. Do not amplify. */
  | "validation_required"
  /** No longer true. Must not appear anywhere. */
  | "retired";

// ── Delivery (CLM-001) ──────────────────────────────────────────────────────
//
// The free-worldwide-delivery promotion ran to 2026-08-11 and has ENDED. It was
// previously asserted as evergreen fact in sitewide metadata, the announcement
// bar, the footer, the homepage FAQ, product copy and llms.txt — an expired
// promotion presented as standing policy, which is the exact failure CLM-001
// was raised against.
//
// What replaces it is deliberately narrow: worldwide tracked shipping is a
// capability we can evidence, the price of that shipping is not. Nothing here
// states or implies a shipping rate, because no approved rate exists. Etsy
// shows the real figure at checkout, which is where the money actually changes
// hands.

export const FREE_DELIVERY_PROMO = {
  status: "retired" as ClaimStatus,
  /** Last day the promotion was valid. Kept for the audit trail. */
  endedOn: "2026-08-11",
  reviewedOn: "2026-08-19",
} as const;

/** True only while a free-delivery promotion is actually running. */
export const HAS_FREE_DELIVERY_PROMO =
  FREE_DELIVERY_PROMO.status !== "retired";

export const DELIVERY = {
  status: "approved" as ClaimStatus,

  /** Chip/badge length. Used in trust rows and feature lists. */
  short: "Tracked worldwide delivery",

  /** One clause, for metadata and inline marketing sentences. */
  clause: "tracked worldwide delivery",

  /** A full sentence for body copy. States capability, never a price. */
  sentence:
    "We ship worldwide with tracked delivery, and your shipping cost is confirmed with your quote before you pay.",

  /** Sub-label for the footer/hero trust rows. */
  supporting: "Shipping confirmed with your quote",
} as const;

// ── Lead time (CLM-002) ─────────────────────────────────────────────────────
//
// FLAGGED, NOT RESOLVED. "10–15 days" currently means approval-to-arrival on
// /shipping, production-then-delivery in /terms, and production only in
// llms.txt. Splitting production from transit needs an owner-approved transit
// figure per region, which has not been supplied, so this release leaves the
// existing wording alone rather than inventing a number or silently redefining
// a delivery promise customers have already relied on.
export const LEAD_TIME = {
  status: "validation_required" as ClaimStatus,
  productionDays: "10–15 days",
  /** Owner must define transit separately before this can be stated. */
  transit: null,
} as const;

// ── Warranty (CLM-004) ──────────────────────────────────────────────────────
export const WARRANTY = {
  status: "validation_required" as ClaimStatus,
  term: "5-year warranty",
} as const;

// ── Third-party tooling (CLM-015, CLM-016) ──────────────────────────────────
//
// The privacy notice and llms.txt must describe exactly this list and nothing
// else. Adding a script to the app without adding it here is a privacy defect,
// not a nice-to-have — the previous copy claimed "no tracking pixels" while the
// Meta Pixel was live and setting _fbp/_fbc.

export type TrackingTool = {
  name: string;
  purpose: string;
  /**
   * What it stores, in plain language — on the visitor's device AND anything the
   * vendor holds on our behalf. The chat widget stores contact details and a
   * transcript server-side, so "cookies" alone would understate it.
   */
  storage: string;
  advertising: boolean;
};

export const TRACKING_TOOLS: readonly TrackingTool[] = [
  {
    name: "Meta Pixel",
    purpose:
      "measures which adverts lead to quote requests, and builds audiences for Facebook and Instagram advertising",
    storage: "advertising cookies (_fbp, and _fbc when you arrive from an ad)",
    advertising: true,
  },
  {
    name: "Vercel Analytics",
    purpose:
      "counts page views and performance timings so we can see which pages are slow",
    storage: "no cookies; visitors are counted without a persistent identifier",
    advertising: false,
  },
  {
    name: "Tawk.to live chat",
    purpose:
      "runs the optional chat widget. Before a conversation starts we ask for your name, email address and phone number on our own form and pass them to the chat, so a question does not go unanswered if you close the tab",
    storage:
      "your name, email and phone kept in your browser's local storage so you are not asked again on a later visit; the same details plus the chat transcript held by Tawk.to on our behalf; and session cookies set once you interact with the widget so a conversation survives a page change",
    advertising: false,
  },
];

/** True when any advertising/profiling tool ships. Gates the privacy wording. */
export const HAS_ADVERTISING_TRACKING = TRACKING_TOOLS.some(
  (tool) => tool.advertising,
);
