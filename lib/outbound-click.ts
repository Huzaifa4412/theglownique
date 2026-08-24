/**
 * Browser side of outbound conversion-click tracking.
 *
 * Mirrors lib/leads.ts: the browser holds no Sanity token, so it posts to a
 * route handler and never talks to the CMS directly.
 *
 * Everything here has to survive the tab navigating away half a millisecond
 * later — the click that fires this is the click that opens WhatsApp or Etsy.
 * Hence `keepalive`, hence fire-and-forget, and hence no awaiting anything.
 */

/** The two ways a visitor leaves this site in order to buy something. */
export type OutboundChannel = "whatsapp" | "etsy";

export type OutboundClickPayload = {
  channel: OutboundChannel;
  /** `data-meta-source` on the clicked link. */
  source: string;
  /** Path only. Never the query string. */
  pagePath: string;
  /** Hostname of the referrer, if any. */
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

/**
 * Clicks already reported by this page, keyed by channel + CTA + path.
 *
 * A module-level Set rather than sessionStorage, and that is the point: the
 * privacy policy promises no profiling, so there must be no identifier capable
 * of linking two clicks together. Deduplication that lives only in this page's
 * memory needs no such identifier — it dies with the page, which is exactly the
 * scope we want it to have.
 *
 * What it stops: a double-click, and a click that also fires `auxclick`. What
 * it deliberately does not stop: the same person returning tomorrow, which is a
 * genuinely different click and should be counted as one.
 */
const reportedThisPage = new Set<string>();

/** Read the UTM tags off the current URL, if the visitor arrived with any. */
function readUtm(): Pick<OutboundClickPayload, "utmSource" | "utmMedium" | "utmCampaign"> {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    };
  } catch {
    return {};
  }
}

/** Hostname of the referring page, or undefined for a direct visit. */
function readReferrerHost(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const host = new URL(document.referrer).hostname.toLowerCase();
    // Internal navigation is not a referrer worth recording.
    return host === window.location.hostname ? undefined : host;
  } catch {
    return undefined;
  }
}

/**
 * Record an outbound conversion click.
 *
 * Never throws, never blocks, never reports failure. If the beacon is lost the
 * visitor still reaches WhatsApp or Etsy, which is the outcome that matters — a
 * missing row is our problem, not theirs.
 */
export function recordOutboundClick(
  channel: OutboundChannel,
  source: string,
  pagePath: string,
): void {
  if (typeof window === "undefined") return;

  const key = `${channel}|${source}|${pagePath}`;
  if (reportedThisPage.has(key)) return;
  reportedThisPage.add(key);

  const payload: OutboundClickPayload = {
    channel,
    source,
    pagePath,
    referrerHost: readReferrerHost(),
    ...readUtm(),
  };

  try {
    void fetch("/api/outbound-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Offline, blocked by an extension, or the endpoint is down.
    });
  } catch {
    // Same.
  }
}
