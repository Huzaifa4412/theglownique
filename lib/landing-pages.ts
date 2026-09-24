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
  /**
   * Optional direct answer to the page's central question ("which sign suits
   * a gym?"), 40–70 words, plain text, rendered as the lead under the H1 and
   * reproduced in llms.txt. It must stand alone if an answer engine lifts it.
   */
  answer?: string;
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

/** One photograph in a collection gallery. Alt text is content, so it is required. */
export type GalleryImage = {
  src: string;
  alt: string;
  /** What the sign says, or what the photo proves. Rendered under the tile. */
  caption?: string;
};

/**
 * What a consumer collection carries beyond the shared landing anatomy.
 *
 * The consumer pages are image-led where the B2B pages are specification-led:
 * a bride or a parent decides from photographs of rooms like theirs, so each
 * collection ships a gallery and a colour pulled from its own imagery. The
 * accent is the glow colour the category's signs actually tend to be — warm
 * white for weddings, violet for gaming — not a brand token, which is why it
 * lives on the content rather than in the stylesheet.
 */
/** A guide or article this collection hands people on to. Internal paths only. */
export type RelatedReading = {
  label: string;
  href: string;
  description: string;
};

export type CollectionExtras = {
  /**
   * The head term this page is written to answer, singular and plural, e.g.
   * "wedding neon sign" / "wedding neon signs". The template composes every
   * H2 from these so headings read the way people actually search, and so a
   * page cannot carry a heading about the wrong occasion.
   */
  keyword: string;
  keywordPlural: string;
  /**
   * The direct answer to the page's central question, 40–60 words, written to
   * stand alone if quoted: what the thing is, what it is made of, and the one
   * or two facts a buyer needs first. Rendered under the H1 and carried into
   * llms.txt, so it must contain nothing that could go out of date.
   */
  answer: string;
  /** ISO date of the last change a reader would notice. Rendered, so keep it honest. */
  updatedOn: string;
  /** Where to go next: the cost guide plus the journal article that covers this occasion. */
  related: RelatedReading[];
  /** Glow colour used on the dark bands and image halos. Never used for text on white. */
  accent: string;
  /** The same hue at a contrast that passes AA as text on white (≥ 4.5:1). */
  accentInk: string;
  /** One line under the H1, in the accent. */
  tagline: string;
  gallery: GalleryImage[];
  /** Wording people actually order for this occasion; rendered as examples, not a fixed list. */
  phrases: string[];
  /** Renders as "Lights on:" caption beside the hero image. */
  heroCaption: string;
};

export type CollectionPage = LandingPage & CollectionExtras;

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
export function requireLandingPage<T extends LandingPage>(
  pages: readonly T[],
  slug: string,
): T {
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
