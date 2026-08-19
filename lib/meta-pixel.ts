/**
 * Meta Pixel event layer.
 *
 * Every fbq() call in this codebase goes through here. Components never touch
 * `window.fbq` directly — they import a named helper, which keeps the event
 * names, the standard-vs-custom distinction and the parameter shapes in one
 * auditable place instead of scattered across twenty CTAs.
 *
 * ── Why the events are mapped the way they are ───────────────────────────────
 *
 * This is a quote-based business with no on-site checkout: payment happens on
 * Etsy and there is no price on any product. So the classic ecommerce funnel
 * (ViewContent → AddToCart → InitiateCheckout → Purchase) has to be mapped onto
 * a lead funnel, and the mapping below is the honest one:
 *
 *   ViewContent       — a sign-type product page was viewed
 *   AddToCart         — the quote configurator was opened for a specific design
 *   Lead              — the quote form was completed and handed to WhatsApp
 *   Contact           — a WhatsApp link was clicked (intent, not a sent message)
 *   InitiateCheckout  — an Etsy link was clicked; Etsy holds the real checkout
 *   CustomizeProduct  — a colour was picked in the neon colour studio
 *   Search            — the catalog search box was used
 *
 * Purchase is deliberately absent. We cannot observe it: orders complete inside
 * Etsy and Etsy exposes no webhook we consume, so any Purchase event fired from
 * this site would be invented. Leave it out until there is a real order source.
 * The same goes for the Conversions API — see the notes at the bottom of this
 * file for what wiring it up would take.
 *
 * Optimise campaigns on `Lead`. `Contact` is a softer, higher-volume signal —
 * useful for retargeting audiences and for early learning while Lead volume is
 * thin, but a WhatsApp click is not a submitted enquiry and should not be
 * treated as one.
 */

/** Standard Meta events. Anything not on this list must go through trackCustom. */
type StandardEvent =
  | "PageView"
  | "ViewContent"
  | "Search"
  | "AddToCart"
  | "InitiateCheckout"
  | "Lead"
  | "Contact"
  | "CustomizeProduct"
  | "CompleteRegistration";

/** Custom events. Meta has no standard event that fits these honestly. */
type CustomEventName = "ViewCategory" | "ViewGuide" | "NewsletterSignup";

type EventParams = Record<
  string,
  string | number | boolean | string[] | undefined
>;

type Fbq = (
  command: string,
  eventName?: string,
  params?: EventParams,
  options?: { eventID?: string },
) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/**
 * Pixel ID. Overridable per environment so a staging deploy can point at a test
 * pixel — or at nothing — without a code change. The literal default is the
 * live pixel that was already hardcoded in app/layout.tsx.
 */
export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1768286464221414";

/** False when the pixel is deliberately switched off for an environment. */
export const HAS_META_PIXEL = META_PIXEL_ID.length > 0;

// ── Delivery ────────────────────────────────────────────────────────────────
//
// The base snippet loads with `afterInteractive`, which means there is a real
// window — first paint until the snippet runs — where `window.fbq` does not
// exist yet. A visitor who clicks "Get a free quote" inside that window would
// otherwise have their event silently dropped, and that click is the single
// most valuable signal on the site. So events are buffered and flushed once
// fbq appears.
//
// The buffer is bounded on both axes: at most MAX_BUFFERED events and at most
// MAX_FLUSH_ATTEMPTS retries. If the pixel is blocked by an ad blocker or a
// consent tool, this gives up quietly after a few seconds rather than retrying
// for the life of the page.

const MAX_BUFFERED = 20;
const MAX_FLUSH_ATTEMPTS = 40;
const FLUSH_INTERVAL_MS = 125;

type QueuedCall = {
  command: "track" | "trackCustom";
  eventName: string;
  params?: EventParams;
  eventId: string;
};

const buffer: QueuedCall[] = [];
let flushAttempts = 0;
let flushTimer: ReturnType<typeof setTimeout> | null = null;

function newEventId(): string {
  // eventID is what lets Meta deduplicate a browser event against the same
  // event sent server-side. There is no Conversions API here yet, so today
  // this is only forward-preparation — but generating it now means a future
  // CAPI handler only has to reuse the id rather than retrofit one.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

function flush() {
  flushTimer = null;

  if (typeof window === "undefined") return;

  if (!window.fbq) {
    if (flushAttempts >= MAX_FLUSH_ATTEMPTS) {
      // Pixel never arrived — almost always an ad blocker. Drop the queue so
      // it can't leak, and stop.
      buffer.length = 0;
      return;
    }
    flushAttempts += 1;
    flushTimer = setTimeout(flush, FLUSH_INTERVAL_MS);
    return;
  }

  while (buffer.length > 0) {
    const call = buffer.shift();
    if (!call) break;
    window.fbq(call.command, call.eventName, call.params, {
      eventID: call.eventId,
    });
  }
}

/**
 * Strip empty values. fbq serialises the params object as-is, so an explicit
 * `undefined` or "" shows up in Events Manager as an empty parameter, which
 * reads as a broken integration rather than an absent field.
 */
function clean(params?: EventParams): EventParams | undefined {
  if (!params) return undefined;

  const entries = Object.entries(params).filter(
    ([, value]) =>
      value !== undefined &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0),
  );

  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function enqueue(
  command: "track" | "trackCustom",
  eventName: string,
  params?: EventParams,
) {
  if (typeof window === "undefined" || !HAS_META_PIXEL) return;

  if (buffer.length >= MAX_BUFFERED) buffer.shift();
  buffer.push({
    command,
    eventName,
    params: clean(params),
    eventId: newEventId(),
  });

  if (!flushTimer) flush();
}

/** Fire a standard Meta event. */
export function track(event: StandardEvent, params?: EventParams) {
  enqueue("track", event, params);
}

/** Fire a custom Meta event. Custom events MUST use trackCustom, not track. */
export function trackCustom(event: CustomEventName, params?: EventParams) {
  enqueue("trackCustom", event, params);
}

// ── Event helpers ───────────────────────────────────────────────────────────
//
// One helper per real user action. Call these; don't call track() directly from
// a component — that is how parameter drift starts.

/**
 * Fired for the initial view and again on every client-side route change.
 *
 * The base snippet deliberately does NOT fire PageView itself (see
 * components/analytics/meta-pixel.tsx). App Router navigations never re-run
 * that inline script, so leaving PageView there would report exactly one
 * PageView per session no matter how many pages were read. Owning it here
 * means one PageView per view, first load included.
 */
export function trackPageView() {
  track("PageView");
}

type ViewContentInput = {
  /** Stable id for the thing viewed — the route slug. Doubles as content_ids. */
  id: string;
  name: string;
  category?: string;
};

/** A sign-type product page was viewed. */
export function trackViewContent({ id, name, category }: ViewContentInput) {
  track("ViewContent", {
    content_ids: [id],
    content_name: name,
    content_category: category,
    // "product" is what Dynamic Product Ads expect. There is no Meta catalog
    // for this shop yet, so today the value only shapes audiences — but keeping
    // content_ids equal to the route slug means a future catalog feed can use
    // the slug as its item id and the retargeting lines up for free.
    content_type: "product",
  });
}

/** A long-form guide was read. Custom: Meta has no standard event for articles. */
export function trackGuideView(guide: string) {
  trackCustom("ViewGuide", { content_name: guide, content_type: "article" });
}

/** A category filter was chosen in the catalog. */
export function trackViewCategory(category: string) {
  trackCustom("ViewCategory", { content_category: category });
}

/** The catalog search box was used. Debounced by the caller. */
export function trackSearch(query: string) {
  track("Search", { search_string: query });
}

/**
 * The quote configurator opened for a specific design.
 *
 * Mapped to AddToCart because this is the mid-funnel intent step a shop's
 * add-to-cart occupies: the visitor has picked a design and started
 * configuring it. It is the audience you retarget three days later.
 */
export function trackConfiguratorOpen(productName: string, category?: string) {
  track("AddToCart", {
    content_name: productName,
    content_category: category,
    content_type: "product",
  });
}

/**
 * Budget range → a number for `value`, in USD.
 *
 * These are midpoints of the ranges offered in the quote form, with the top
 * bucket pinned to its floor rather than guessed upward. It is an estimate, but
 * it is an estimate of something the customer told us — not an invented price —
 * and Meta needs a number to do value-based optimisation on leads.
 *
 * Keep this table in sync with the budget <select> in product-dialog.tsx.
 */
const BUDGET_VALUE_USD: Record<string, number> = {
  "Under $250": 125,
  "$250 - $500": 375,
  "$500 - $1,000": 750,
  "$1,000 - $2,500": 1750,
  "$2,500+": 2500,
};

type QuoteSubmitInput = {
  productName: string;
  signType: string;
  colour: string;
  size: string;
  usageLocation: string;
  deliveryCountry: string;
  /** Raw select value, e.g. "$500 - $1,000". "Not specified" when skipped. */
  budget: string;
  timeline: string;
  hasReferenceFile: boolean;
};

/**
 * The quote form was completed and handed off to WhatsApp — the real conversion
 * on this site, and the event campaigns should optimise for.
 *
 * `value` is only sent when the visitor actually chose a budget; an unpriced
 * lead is reported without a value rather than with a fabricated one.
 */
export function trackQuoteSubmitted(input: QuoteSubmitInput) {
  const value = BUDGET_VALUE_USD[input.budget];

  track("Lead", {
    content_name: input.productName,
    content_category: input.signType,
    content_type: "product",
    ...(value !== undefined ? { value, currency: "USD" } : {}),
    sign_type: input.signType,
    neon_colour: input.colour,
    sign_size: input.size,
    usage_location: input.usageLocation,
    delivery_country: input.deliveryCountry,
    budget_range: input.budget,
    order_timeline: input.timeline,
    has_reference_file: input.hasReferenceFile,
  });
}

/**
 * A WhatsApp link was clicked.
 *
 * Contact, not Lead: we can see the click but never whether the message was
 * actually sent, and inflating that into a Lead would poison the one metric the
 * ad account is optimising on.
 *
 * `source` names the button (from its data-meta-source), `pagePath` says which
 * page it was on. Both, because "the floating button" and "the floating button
 * on the channel-letters page" are different things to know.
 */
export function trackWhatsappContact(source: string, pagePath: string) {
  track("Contact", {
    contact_method: "whatsapp",
    contact_source: source,
    page_path: pagePath,
  });
}

/**
 * The live-chat pre-chat form was completed and the chat opened.
 *
 * Contact, not Lead, and the same reasoning as the WhatsApp click: we can see
 * that a conversation was started, never whether it produced an enquiry worth
 * quoting. `contact_method` distinguishes it from WhatsApp so the two channels
 * stay separable in Events Manager — they convert very differently.
 */
export function trackChatStarted(pagePath: string) {
  track("Contact", {
    contact_method: "live_chat",
    contact_source: "pre-chat-form",
    page_path: pagePath,
  });
}

/**
 * An Etsy link was clicked.
 *
 * InitiateCheckout is the accurate standard event here — Etsy holds the actual
 * checkout, so leaving the site for Etsy *is* starting checkout. It is also the
 * last step we can measure; the Purchase happens where we have no visibility.
 */
export function trackEtsyOutbound(source: string, pagePath: string) {
  track("InitiateCheckout", {
    checkout_channel: "etsy",
    link_source: source,
    page_path: pagePath,
  });
}

/** A colour was chosen in the neon colour studio. */
export function trackColourCustomised(colourName: string) {
  track("CustomizeProduct", {
    content_name: "Neon colour studio",
    content_type: "product",
    neon_colour: colourName,
  });
}

/**
 * The newsletter form was submitted.
 *
 * Custom rather than CompleteRegistration. The address IS now stored — it is
 * archived to Sanity as a `lead` — but the welcome code is still sent by hand,
 * so no automated registration has completed. Promote this to
 * CompleteRegistration once sending is actually automated, not before.
 */
export function trackNewsletterSignup() {
  trackCustom("NewsletterSignup");
}

// ── Not implemented, on purpose ─────────────────────────────────────────────
//
// Conversions API (server-side): would restore the 30–60% of signal browsers
// drop post-iOS 14, and is the biggest remaining measurement win here. It needs
// a lead/order source we control — a form POST to a route handler, or an Etsy
// order feed — plus META_CAPI_ACCESS_TOKEN, the _fbp and _fbc cookies forwarded
// from the request, and the same eventID this file already generates so Meta can
// deduplicate. Today every lead leaves via a WhatsApp deep link with no server
// round-trip, so there is nothing to send from.
//
// Product catalog feed (for Dynamic Product Ads): needs per-product prices,
// which this shop does not publish — everything is individually quoted.
//
// Consent gating: there is no cookie banner on this site, so the pixel loads for
// every visitor. If EU/UK traffic matters, gate the base snippet behind a consent
// tool and hold `fbq('consent', 'revoke')` until consent is granted.
