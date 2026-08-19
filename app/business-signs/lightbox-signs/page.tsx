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
  title: "Ultra-Thin Lightbox Signs for Retail & Hospitality",
  description:
    "Slim anodized aluminum edge-lit lightboxes for retail storefronts, menus, and exhibits. Tool-free graphic replacement, uniform illumination, 5-year warranty.",
  alternates: { canonical: "/business-signs/lightbox-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Ultra-Thin Lightbox Signs | The Glownique",
    description:
      "Commercial edge-lit lightboxes for retail displays, menu boards and promotional signage.",
    url: "/business-signs/lightbox-signs",
    images: [{ url: "/before-after/after-osee-beauty.png", alt: "Ultra-Thin Lightbox Sign" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ultra-Thin Lightbox Signs | The Glownique",
    description:
      "Commercial edge-lit lightboxes for retail displays, menu boards and promotional signage.",
    images: ["/before-after/after-osee-beauty.png"],
  },
};

export default function LightboxSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/lightbox-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Ultra-Thin Lightbox Signs",
        description:
          "Ultra-thin anodized aluminum lightbox signs featuring edge-lit LED illumination for vibrant, shadow-free commercial display graphics.",
        image: `${SITE_URL}/before-after/after-osee-beauty.png`,
        category: "Commercial Display Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Ultra-Thin Lightbox Signs", item: pageUrl },
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
        contentId="lightbox-signs"
        contentName="Ultra-Thin Lightbox Signs"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="ultra-thin lightbox sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/business-signs" className="hover:underline">Business Signs</Link> &gt;{" "}
              <span className="text-[#ce0754]">Lightbox Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Retail & Menu Display Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Ultra-Thin Edge-Lit Lightbox Signs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Sleek, tool-free graphic lightboxes designed for vibrant retail windows, restaurant menu displays, and trade show promotions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Lightbox Quote"
                productName="ultra-thin lightbox sign"
              />
              <Link
                href="/products/ultra-thin-lightbox"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                View Lightbox Catalog Specs →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/before-after/after-osee-beauty.png"
                  alt="Ultra-thin lightbox sign in beauty reception"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Sleek Profile & Easy Graphic Swaps
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Traditional heavy cabinet lightboxes are bulky and cumbersome to update. Our slim edge-lit aluminum lightboxes combine architectural elegance with effortless maintenance.
                </p>

                <ul className="space-y-3 text-sm font-medium text-[#1e1a22]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563eb]">✓</span>
                    <span><strong>Slim Anodized Aluminum Frame:</strong> Ultra-thin depth sits flush on walls or hangs in window displays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563eb]">✓</span>
                    <span><strong>Uniform Edge-Lit Diffusion:</strong> High-density LEDs provide continuous, shadow-free backlighting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563eb]">✓</span>
                    <span><strong>Snap-Frame Graphic Replacement:</strong> Swap promotional posters and seasonal menu graphics in under a minute.</span>
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
