import type { Metadata } from "next";

/**
 * The shape shared by every category landing page on the site.
 *
 * Two families use it today and they sit under different hubs:
 *
 * - `lib/industry-pages.ts` — the eight B2B pages under `/business-signs`,
 *   which route an industry to the right sign type.
 * - `lib/collection-pages.ts` — the consumer collections under
 *   `/custom-signage`, which route an occasion to the right sign type.
 *
 * Both render through components/landing/landing-page.tsx. They share an
 * anatomy — hero, which sign type fits, what changes here, where these go,
 * FAQs — because the buyer's question is the same shape in both cases even
 * though the answers are not: a gym owner and a bride are both asking which of
 * four sign types suits their situation and what they will regret not deciding
 * before fabrication.
 *
 * ── Claims ──────────────────────────────────────────────────────────────────
 *
 * Copy on these pages may only restate claims already carrying evidence in
 * SEO-Optimization/resources/claims-and-proof-register.csv — the 5-year
 * warranty (CLM-004), the free design mockup (CLM-003), the IP67 outdoor
 * rating (CLM-008), 12V low-voltage shatterproof construction (CLM-009) and
 * Pantone/HEX matching (CLM-010).
 *
 * No page states a price, a lead time, a delivery cost, a customer count or a
 * rating. Those are either an open conflict (CLM-002) or retired (CLM-001),
 * and scripts/seo-audit.mjs fails the build on the retired ones. There is
 * deliberately no testimonial or review markup either: the brand cannot mark up
 * its own reviews with AggregateRating.
 */

export type LandingFaq = {
  q: string;
  a: string;
};

/** A sign type this page's audience buys, and the page that sells it. */
export type LandingMaterial = {
  name: string;
  href: string;
  why: string;
};

/** What actually differs about specifying a sign for this situation. */
export type LandingConsideration = {
  title: string;
  text: string;
};

export type LandingApplication = {
  name: string;
  text: string;
};

/** The hub a page sits under, for the breadcrumb and the schema trail. */
export type LandingParent = {
  href: string;
  label: string;
};

/**
 * Everything a page carries except where it lives. The two catalogs declare
 * this and attach `parent` and `footerLink` once for the whole family, rather
 * than repeating the same hub on every entry.
 */
export type LandingContent = {
  slug: string;
  /** Breadcrumb label and schema name. */
  name: string;
  /** Eyebrow above the H1. */
  kicker: string;
  h1: string;
  /**
   * The rendered <title> is this plus " | The Glownique" (16 chars) from the
   * template in app/layout.tsx, against a hard 60-char ceiling in
   * scripts/seo-audit.mjs. So this field has 44 characters to work with.
   */
  metaTitle: string;
  metaDescription: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  /** Product name passed to the WhatsApp quote CTA. */
  quoteProductName: string;
  quoteLabel: string;
  materials: LandingMaterial[];
  considerations: LandingConsideration[];
  applications: LandingApplication[];
  faqs: LandingFaq[];
};

export type LandingPage = LandingContent & {
  parent: LandingParent;
  /** Secondary CTA in the closing section, after the quote button. */
  footerLink: { href: string; label: string };
};

/** The four sign types every landing page routes its audience toward. */
export const SIGN_TYPE_HREF = {
  neon: "/business-signs/custom-logo-neon-signs",
  channel: "/business-signs/channel-letter-signs",
  lightbox: "/business-signs/lightbox-signs",
  acrylic: "/business-signs/acrylic-logo-signs",
} as const;

/** A page's own path, derived rather than stored so the two cannot disagree. */
export function landingPath(page: LandingPage): string {
  return `${page.parent.href}/${page.slug}`;
}

/**
 * The lookup used by route files. Throws rather than returning undefined
 * because each route passes a literal slug: a miss is a typo that should stop
 * the build, not a 404 to discover in production.
 */
export function requireLandingPage(
  pages: readonly LandingPage[],
  slug: string,
): LandingPage {
  const page = pages.find((candidate) => candidate.slug === slug);
  if (!page) {
    throw new Error(`No landing page defined for slug "${slug}".`);
  }
  return page;
}

/**
 * One metadata shape for every landing page, so a route cannot quietly ship
 * without a canonical or an og:image and fail scripts/seo-audit.mjs.
 *
 * `title` goes through the " | The Glownique" template in app/layout.tsx, while
 * the og and twitter titles are written out in full — those two carry no
 * template and read as truncated without the brand.
 */
export function landingMetadata(page: LandingPage): Metadata {
  const url = landingPath(page);
  const branded = `${page.metaTitle} | The Glownique`;

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "The Glownique",
      title: branded,
      description: page.metaDescription,
      url,
      images: [{ url: page.heroImage, alt: page.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: branded,
      description: page.metaDescription,
      images: [page.heroImage],
    },
  };
}
