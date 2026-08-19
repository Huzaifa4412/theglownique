import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "3D Metal Channel Letter Signs for Storefronts",
  description:
    "Fabricated stainless-steel 3D channel letters with front-lit, halo backlit or dual-lit LED illumination. Commercial-grade storefront signage with 5-year warranty.",
  alternates: { canonical: "/business-signs/channel-letter-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "3D Metal Channel Letter Signs | The Glownique",
    description:
      "Commercial 3D metal channel letters for exterior storefronts and corporate offices. Frontlit, halo-lit & dual-lit options.",
    url: "/business-signs/channel-letter-signs",
    images: [{ url: "/hero/business-coffee.png", alt: "3D Metal Channel Letter Signs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Metal Channel Letter Signs | The Glownique",
    description:
      "Commercial 3D metal channel letters for exterior storefronts and corporate offices.",
    images: ["/hero/business-coffee.png"],
  },
};

export default function ChannelLetterSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/channel-letter-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "3D Metal Channel Letter Signs",
        description:
          "Custom fabricated 3D stainless steel channel letters offering front-lit, halo backlit, or dual-lit LED illumination for architectural storefronts and building façades.",
        image: `${SITE_URL}/hero/business-coffee.png`,
        category: "Exterior Commercial Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Channel Letter Signs", item: pageUrl },
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
      <MetaViewContent
        contentId="channel-letter-signs"
        contentName="3D Metal Channel Letter Signs"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="3D channel letter sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/business-signs" className="hover:underline">Business Signs</Link> &gt;{" "}
              <span className="text-[#ce0754]">Channel Letter Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Architectural Storefront Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              3D Metal Channel Letter Signs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Architectural stainless-steel 3D lettering engineered for high-visibility storefronts, commercial building façades, and corporate reception walls.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Channel Letter Quote"
                productName="3D metal channel letter sign"
              />
              <Link
                href="/guides/front-lit-vs-halo-lit-vs-dual-lit"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                Front-Lit vs Halo-Lit Comparison →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/hero/business-coffee.png"
                  alt="3D Metal Channel Letter Sign on commercial storefront"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Three Distinct Illumination Methods
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Every building facade presents unique lighting requirements. Choose from three precision LED configurations:
                </p>

                <ul className="space-y-4 text-sm text-[#1e1a22]">
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">1. Front-Lit Channel Letters</strong>
                    <span className="text-[#5e5862]">Bright acrylic faces throw clear, crisp illumination forward for maximum day and night readability.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">2. Halo Backlit Channel Letters</strong>
                    <span className="text-[#5e5862]">Solid metal faces project light backward onto the mounting wall, creating a sophisticated floating halo effect.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">3. Dual-Lit Channel Letters</strong>
                    <span className="text-[#5e5862]">Combines bright front face illumination with soft rear halo glow for ultimate brand presence.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
