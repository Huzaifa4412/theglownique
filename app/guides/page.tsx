import type { Metadata } from "next";
import Link from "next/link";

import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { GUIDE_SUMMARIES, type GuideSummary } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

const TITLE = "LED Neon & Business Sign Buying Guides";
const DESCRIPTION =
  "Guides to choosing an illuminated sign: cost, letter size, halo-lit vs front-lit, lightbox vs channel letters, LED vs glass neon and outdoor use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    url: "/guides",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom LED neon signs glowing on a dark wall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    images: ["/hero/neon-sign-hero.png"],
  },
};

/**
 * The hub groups guides by the question a buyer is at, not by format. A guide
 * missing from this map still appears, in the last group, so adding one to
 * lib/guides can never make it vanish from the hub.
 */
const GROUPS: readonly { id: string; heading: string; intro: string; slugs: readonly string[] }[] = [
  {
    id: "plan",
    heading: "Plan your sign",
    intro: "Start with budget, size and the type of sign that suits the space.",
    slugs: ["custom-business-sign-cost", "sign-size-viewing-distance", "lightbox-vs-channel-letters"],
  },
  {
    id: "specify",
    heading: "Choose the lighting and the build",
    intro: "How the sign is lit, what it mounts to, and what changes when it goes outside.",
    slugs: [
      "front-lit-vs-halo-lit-vs-dual-lit",
      "backlit-sign-wall-surfaces-and-standoffs",
      "indoor-vs-outdoor-illuminated-signs",
    ],
  },
  {
    id: "neon",
    heading: "Understand LED neon",
    intro: "What LED neon is, how it compares with glass neon, and how a custom piece is made.",
    slugs: ["led-neon-vs-glass-neon", "how-led-neon-signs-are-made"],
  },
];

function groupGuides() {
  const bySlug = new Map(GUIDE_SUMMARIES.map((guide) => [guide.slug, guide]));
  const placed = new Set<string>();
  const groups = GROUPS.map((group) => {
    const guides: GuideSummary[] = group.slugs.flatMap((slug) => {
      const guide = bySlug.get(slug);
      if (!guide) return [];
      placed.add(slug);
      return [guide];
    });
    return { ...group, guides };
  });
  const unplaced = GUIDE_SUMMARIES.filter((guide) => !placed.has(guide.slug));
  if (unplaced.length > 0) groups[groups.length - 1].guides.push(...unplaced);
  return groups.filter((group) => group.guides.length > 0);
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function GuidesHubPage() {
  const pageUrl = `${SITE_URL}/guides`;
  const groups = groupGuides();
  const ordered = groups.flatMap((group) => group.guides);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guides`,
        name: "Sign buying guides",
        itemListElement: ordered.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `${SITE_URL}${guide.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Sign buying guides
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Guides to Choosing, Sizing and Specifying Illuminated Signs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Plain-English answers to the questions buyers ask before ordering a custom LED neon sign,
              channel letters, a lightbox or an acrylic logo sign. Technical points link to the standard or
              manufacturer they come from, and every guide shows when it was last reviewed.
            </p>
            <nav aria-label="Guide sections" className="mt-8 flex flex-wrap justify-center gap-3">
              {groups.map((group) => (
                <a
                  key={group.id}
                  href={`#${group.id}`}
                  className="rounded-full border border-[#eadfe4] bg-white px-4 py-2 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
                >
                  {group.heading}
                </a>
              ))}
            </nav>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={group.id} className="mt-16 first:mt-0">
              <h2 id={group.id} className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
                {group.heading}
              </h2>
              <p className="mt-2 text-sm text-[#5e5862]">{group.intro}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {group.guides.map((guide) => (
                  <article
                    key={guide.slug}
                    className="flex flex-col justify-between rounded-3xl border border-[#eadfe4] bg-white p-7 shadow-[0_10px_30px_rgba(107,38,67,0.05)] transition-all hover:border-[#f40b68] hover:shadow-lg"
                  >
                    <div>
                      <span className="inline-block rounded-full bg-[#f8f5f7] px-3 py-1 text-xs font-extrabold text-[#ce0754]">
                        {guide.category}
                      </span>
                      <h3 className="mt-4 text-xl font-extrabold text-[#1e1a22] sm:text-2xl">
                        <Link href={guide.href} className="hover:underline">
                          {guide.title}
                        </Link>
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#5e5862]">{guide.summary}</p>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-[#eadfe4] pt-5 text-xs text-[#5e5862]">
                      <span>Last reviewed {formatDate(guide.updatedOn)}</span>
                      <Link
                        href={guide.href}
                        className="font-extrabold text-[#ce0754] hover:underline"
                        aria-label={`Read: ${guide.title}`}
                      >
                        Read guide →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="mt-20 rounded-3xl border border-[#eadfe4] bg-[#fff0f5] p-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#1e1a22]">Ready to see your design?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5e5862]">
              Send your logo or wording on WhatsApp for a free design mockup and a quote. You only pay once
              you have approved the design.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/business-signs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                Business signs →
              </Link>
              <Link
                href="/products/custom-neon-signs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                Custom LED neon signs →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
