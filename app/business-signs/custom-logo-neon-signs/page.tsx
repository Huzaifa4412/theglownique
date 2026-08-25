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
  title: "Custom Logo Neon & Lobby Signs for Business",
  description:
    "Custom logo neon signs & lobby signs for business branding, reception walls, restaurants, and salons. Pantone color matching, 12V energy efficiency & 5-year warranty.",
  alternates: { canonical: "/business-signs/custom-logo-neon-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Logo Neon Signs & Lobby Signs for Business | The Glownique",
    description:
      "Precision-crafted LED logo neon signs for commercial spaces. Custom cut acrylic backings, Pantone brand matching, free design mockup.",
    url: "/business-signs/custom-logo-neon-signs",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom Logo Neon Signs for Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Logo Neon Signs & Lobby Signs for Business | The Glownique",
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
        contentName="Custom Logo Neon Signs for Business"
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
              Commercial Brand Illumination
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom Logo Neon Signs for Business
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Transform your business logo into an eye-catching LED neon centerpiece. Custom fabricated for office lobby walls, salons, restaurants, retail storefronts, and pop-up activations.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Free Logo Mockup"
                productName="custom logo neon sign"
              />
              <Link
                href="/products/custom-neon-signs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                View Neon Product Specs →
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
                  alt="Custom LED Logo Neon Sign on restaurant wall"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Built Exactly to Your Vector Logo
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Send us your AI, EPS, SVG, or high-res PNG file. Our engineering team maps your artwork onto laser-cut acrylic backings with exact Pantone color matching and 50,000-hour rated LED silicone tubing.
                </p>

                <ul className="space-y-4 text-sm text-[#1e1a22]">
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">100% Brand Font & Contour Accuracy</strong>
                    <span className="text-[#5e5862]">We custom bend flexible shatterproof silicone to follow intricate scripts, symbols, and geometric shapes.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">Cool-to-the-Touch 12V Operation</strong>
                    <span className="text-[#5e5862]">Safe for high-traffic public reception areas, child-accessible venues, and commercial interiors.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">Free Design Mockup with Sizing</strong>
                    <span className="text-[#5e5862]">See a true-to-scale digital preview of your glowing logo before committing to production.</span>
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
