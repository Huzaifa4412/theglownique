import type { Guide } from "@/lib/guides/types";

import { guide as howLedNeonSignsAreMade } from "@/lib/guides/how-led-neon-signs-are-made";
import { guide as indoorVsOutdoorIlluminatedSigns } from "@/lib/guides/indoor-vs-outdoor-illuminated-signs";
import { guide as ledNeonVsGlassNeon } from "@/lib/guides/led-neon-vs-glass-neon";
import { guide as lightboxVsChannelLetters } from "@/lib/guides/lightbox-vs-channel-letters";
import { guide as signSizeViewingDistance } from "@/lib/guides/sign-size-viewing-distance";

/**
 * Every data-driven guide, in the order the /guides hub lists them. A guide is
 * added here only after its facts have been checked against the cited sources;
 * app/guides/[slug] generates one static page per entry, lib/routes.ts puts
 * each in the sitemap, and llms.txt reproduces each answer.
 */
export const GUIDES: readonly Guide[] = [
  howLedNeonSignsAreMade,
  indoorVsOutdoorIlluminatedSigns,
  ledNeonVsGlassNeon,
  lightboxVsChannelLetters,
  signSizeViewingDistance,
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

/** What the hub and the sign-type pages need to link to a guide. */
export type GuideSummary = {
  slug: string;
  href: string;
  title: string;
  category: string;
  summary: string;
  /** ISO date the guide was last reviewed. */
  updatedOn: string;
};

/** The three hand-built guides, which have their own folders under app/guides. */
const HAND_BUILT_GUIDES: readonly GuideSummary[] = [
  {
    slug: "custom-business-sign-cost",
    href: "/guides/custom-business-sign-cost",
    title: "Custom Business Sign Cost Guide",
    category: "Pricing & budgeting",
    summary:
      "What decides the price of a custom sign — type, size, lighting, materials, installation and shipping — and how to get a quote you can compare.",
    updatedOn: "2026-09-24",
  },
  {
    slug: "front-lit-vs-halo-lit-vs-dual-lit",
    href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    title: "Front-Lit vs. Halo-Lit vs. Dual-Lit Channel Letters",
    category: "Lighting",
    summary:
      "How each lighting style works, how far away it reads, which walls suit it and what landlords and permits usually ask for — with a letter-height table.",
    updatedOn: "2026-09-24",
  },
  {
    slug: "backlit-sign-wall-surfaces-and-standoffs",
    href: "/guides/backlit-sign-wall-surfaces-and-standoffs",
    title: "How Wall Surfaces & Standoff Distance Change Backlit Signs",
    category: "Mounting",
    summary:
      "Why the same halo-lit letters look different on plaster, brick, wood slats and tile, and how the gap behind them shapes the glow.",
    updatedOn: "2026-09-15",
  },
];

export const GUIDE_SUMMARIES: readonly GuideSummary[] = [
  ...HAND_BUILT_GUIDES,
  ...GUIDES.map((guide) => ({
    slug: guide.slug,
    href: `/guides/${guide.slug}`,
    title: guide.h1,
    category: guide.hub.category,
    summary: guide.hub.summary,
    updatedOn: guide.updatedOn,
  })),
];

/**
 * Resolves a guide by slug and throws when it does not exist, so a reading
 * list that names a withdrawn or misspelt guide fails the build instead of
 * rendering a dead link.
 */
export function requireGuideSummary(slug: string): GuideSummary {
  const summary = GUIDE_SUMMARIES.find((guide) => guide.slug === slug);
  if (!summary) throw new Error(`Unknown guide "${slug}".`);
  return summary;
}
