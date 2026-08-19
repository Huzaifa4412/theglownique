import type { Metadata } from "next";
import Link from "next/link";

import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Business Signage Guides & Comparisons",
  description:
    "Comprehensive buying guides for commercial signage — cost breakdowns, channel letter lighting comparisons, sizing recommendations and material specs.",
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Business Signage Guides & Comparisons | The Glownique",
    description:
      "Expert signage guides: custom business sign costs, front-lit vs halo-lit channel letters, material selection & sizing.",
    url: "/guides",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Business Signage Guides" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Signage Guides & Comparisons | The Glownique",
    description:
      "Expert signage guides: custom business sign costs, front-lit vs halo-lit channel letters & material selection.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

const guidesList = [
  {
    slug: "custom-business-sign-cost",
    title: "Custom Business Sign Cost Guide",
    category: "Pricing & Budgeting",
    desc: "Detailed analysis of cost drivers for custom business signage — sign types, sizes, illumination methods, installation and shipping factors.",
    updated: "2026-08-11",
  },
  {
    slug: "front-lit-vs-halo-lit-vs-dual-lit",
    title: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters",
    category: "Illumination & Technology",
    desc: "Comparative visual and technical guide for storefront channel letter lighting methods, wall reflection requirements, and legibility.",
    updated: "2026-08-11",
  },
];

export default function GuidesHubPage() {
  const pageUrl = `${SITE_URL}/guides`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Business Signage Guides & Comparisons",
        description: "Expert technical and buying guides for commercial illuminated signage.",
        publisher: { "@id": `${SITE_URL}/#organization` },
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
      <ProductTopBar productName="signage guide" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Expert Signage Knowledge
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Business Signage Guides & Technical Comparisons
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Transparent, evidence-based guides written to help facilities managers, brand designers and business owners make informed signage decisions.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2">
              {guidesList.map((g) => (
                <article
                  key={g.slug}
                  className="flex flex-col justify-between rounded-3xl border border-[#eadfe4] bg-white p-8 shadow-[0_10px_30px_rgba(107,38,67,0.05)] transition-all hover:border-[#f40b68] hover:shadow-lg"
                >
                  <div>
                    <span className="inline-block rounded-full bg-[#f8f5f7] px-3 py-1 text-xs font-extrabold text-[#ce0754]">
                      {g.category}
                    </span>
                    <h2 className="mt-4 text-2xl font-extrabold text-[#1e1a22]">
                      <Link href={`/guides/${g.slug}`} className="hover:underline">
                        {g.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#5e5862]">{g.desc}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#eadfe4] pt-6 text-xs text-[#5e5862]">
                    <span>Updated {g.updated}</span>
                    <Link
                      href={`/guides/${g.slug}`}
                      className="font-extrabold text-[#ce0754] hover:underline"
                    >
                      Read Full Guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
