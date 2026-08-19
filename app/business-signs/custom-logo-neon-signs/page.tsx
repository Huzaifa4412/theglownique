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
  title: "Custom Logo Neon Signs for Business",
  description:
    "Custom LED logo neon signs for business brand walls, reception areas, restaurants and salons. Exact Pantone color matching, 12V low voltage and 5-year warranty.",
  alternates: { canonical: "/business-signs/custom-logo-neon-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Logo Neon Signs for Business | The Glownique",
    description:
      "Precision-crafted LED logo neon signs for commercial spaces. Custom cut acrylic backings, Pantone brand matching, free design mockup.",
    url: "/business-signs/custom-logo-neon-signs",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom Logo Neon Signs for Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Logo Neon Signs for Business | The Glownique",
    description:
      "Precision-crafted LED logo neon signs for commercial spaces. Custom cut acrylic backings, Pantone brand matching, free design mockup.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function CustomLogoNeonSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/custom-logo-neon-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Custom Logo Neon Signs for Business",
        description:
          "Made-to-order commercial LED neon signs mapped to business logos, brand fonts, and Pantone color references with 12V energy efficiency.",
        image: `${SITE_URL}/hero/neon-sign-hero.png`,
        category: "Commercial Business Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Custom Logo Neon Signs", item: pageUrl },
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
        contentId="custom-logo-neon-signs"
        contentName="Custom Logo Neon Signs"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="custom logo neon sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/business-signs" className="hover:underline">Business Signs</Link> &gt;{" "}
              <span className="text-[#ce0754]">Custom Logo Neon Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Commercial Brand Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom Logo Neon Signs for Business
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Transform your business logo, brand slogan or mascot into a stunning, energy-efficient
              illuminated focal point. Handcrafted with safe 12V silicone LED neon on high-grade acrylic.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Free Logo Mockup & Quote"
                productName="custom logo neon sign"
              />
              <Link
                href="/products/custom-neon-signs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                View General Product Specs →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/hero/neon-sign-hero.png"
                  alt="Custom Logo Neon Sign for business feature wall"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Built for Business Impact & Durability
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Whether you are outfitting a retail store, office reception, restaurant bar or fitness studio,
                  our commercial LED logo signs deliver eye-catching visibility without high energy bills.
                </p>

                <ul className="space-y-3 text-sm font-medium text-[#1e1a22]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#ce0754]">✓</span>
                    <span><strong>Pantone & HEX Color Matching:</strong> Exact brand color alignment for contours and backings.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#ce0754]">✓</span>
                    <span><strong>Safe 12V Low Voltage:</strong> Cool to touch, shatterproof silicone tubing with 100,000-hour LED lifespan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#ce0754]">✓</span>
                    <span><strong>IP67 Outdoor Option:</strong> Full waterproofing available for exterior storefront entryways.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#ce0754]">✓</span>
                    <span><strong>5-Year Warranty:</strong> Complete coverage on LEDs, power transformers, and craftsmanship.</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/guides/custom-business-sign-cost"
                    className="text-sm font-bold text-[#ce0754] underline"
                  >
                    Compare custom logo sign cost factors in our business guide →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
