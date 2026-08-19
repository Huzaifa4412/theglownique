import { PRODUCT_PAGES } from "@/lib/product-catalog";

/**
 * The route manifest: every route this app serves, and what is true about it.
 *
 * One list, two consumers — app/sitemap.ts builds the sitemap from it, and
 * scripts/seo-audit.mjs asserts the live output against it (TECH-05, TECH-20).
 * Keeping them on the same source is the point: a route that gets added to the
 * app but not to this file fails the audit instead of quietly shipping
 * unindexed, and a route marked non-indexable can never leak into the sitemap.
 *
 * ── About `lastModified` ────────────────────────────────────────────────────
 *
 * These are MATERIAL modification dates, entered by hand. They are deliberately
 * not `new Date()`: a build-time timestamp tells search engines that every page
 * changed every time anything was deployed, which is false, and a sitemap that
 * cries wolf on twelve URLs is a sitemap whose dates get ignored.
 *
 * Bump a date when the page's own content, metadata or structured data changes
 * in a way a reader would notice. Do NOT bump it for shared chrome (header,
 * footer, announcement bar), a dependency upgrade, a styling tweak or a
 * refactor — if a chrome change bumped everything, the dates would carry no
 * information again.
 */

export type RouteEntry = {
  /** Path with leading slash, no trailing slash except the root. */
  path: string;
  /** ISO date (YYYY-MM-DD) of the last material change. */
  lastModified: string;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
  /**
   * False means: keep out of the sitemap, and expect the live response to carry
   * a noindex. The audit script enforces both directions.
   */
  indexable: boolean;
  /** Why a route is non-indexable. Required when `indexable` is false. */
  note?: string;
};

/** Baseline release date for content that has not materially changed since. */
const BASELINE = "2026-08-11";

/** This release: expired free-delivery promotion withdrawn, privacy corrected. */
const CLAIMS_RELEASE = "2026-08-19";

export const ROUTES: readonly RouteEntry[] = [
  // Home — free-delivery promo section removed, FAQ and comparison copy revised.
  { path: "/", lastModified: CLAIMS_RELEASE, changeFrequency: "weekly", priority: 1.0, indexable: true },

  // B2B hub and destinations.
  { path: "/business-signs", lastModified: BASELINE, changeFrequency: "weekly", priority: 0.95, indexable: true },
  { path: "/business-signs/custom-logo-neon-signs", lastModified: BASELINE, changeFrequency: "monthly", priority: 0.9, indexable: true },
  { path: "/business-signs/channel-letter-signs", lastModified: BASELINE, changeFrequency: "monthly", priority: 0.9, indexable: true },
  { path: "/business-signs/lightbox-signs", lastModified: BASELINE, changeFrequency: "monthly", priority: 0.9, indexable: true },
  { path: "/business-signs/acrylic-logo-signs", lastModified: BASELINE, changeFrequency: "monthly", priority: 0.9, indexable: true },

  // Decision guides.
  { path: "/guides", lastModified: BASELINE, changeFrequency: "weekly", priority: 0.85, indexable: true },
  { path: "/guides/custom-business-sign-cost", lastModified: BASELINE, changeFrequency: "monthly", priority: 0.8, indexable: true },
  { path: "/guides/front-lit-vs-halo-lit-vs-dual-lit", lastModified: BASELINE, changeFrequency: "monthly", priority: 0.8, indexable: true },

  // Broad product catalog — meta descriptions revised with the delivery claim.
  { path: "/products", lastModified: CLAIMS_RELEASE, changeFrequency: "weekly", priority: 0.8, indexable: true },
  ...PRODUCT_PAGES.map((product) => ({
    path: `/products/${product.slug}`,
    lastModified: CLAIMS_RELEASE,
    changeFrequency: "monthly" as const,
    priority: 0.75,
    indexable: true,
  })),

  // Contact is a conversion destination, not a policy page — hence the higher
  // priority than the policy block below.
  { path: "/contact", lastModified: CLAIMS_RELEASE, changeFrequency: "monthly", priority: 0.7, indexable: true },

  // Policy and trust routes.
  { path: "/shipping", lastModified: CLAIMS_RELEASE, changeFrequency: "yearly", priority: 0.4, indexable: true },
  { path: "/privacy", lastModified: CLAIMS_RELEASE, changeFrequency: "yearly", priority: 0.4, indexable: true },
  { path: "/returns", lastModified: BASELINE, changeFrequency: "yearly", priority: 0.4, indexable: true },
  { path: "/terms", lastModified: BASELINE, changeFrequency: "yearly", priority: 0.4, indexable: true },
  { path: "/accessibility", lastModified: BASELINE, changeFrequency: "yearly", priority: 0.4, indexable: true },

  // Not public content. Served with X-Robots-Tag: noindex from next.config.ts,
  // and deliberately still crawlable so that header is actually seen.
  {
    path: "/studio",
    lastModified: BASELINE,
    changeFrequency: "never",
    priority: 0.0,
    indexable: false,
    note: "Sanity Studio. noindex via X-Robots-Tag; authentication is an open decision (TECH-02).",
  },
];

/** Routes that belong in the sitemap. */
export const INDEXABLE_ROUTES = ROUTES.filter((route) => route.indexable);
