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
  title: "Custom Ultra-Thin LED Lightbox Signs",
  description:
    "Custom backlit signage & ultra-thin LED lightbox signs for retail storefronts, menus & exhibits. Even edge-lit illumination with tool-free graphic replacement. 5-year warranty.",
  alternates: { canonical: "/business-signs/lightbox-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Lightbox Signs & Ultra-Thin LED Lightboxes | The Glownique",
    description:
      "Commercial edge-lit lightboxes and backlit signage for retail displays, menu boards and promotional storefronts.",
    url: "/business-signs/lightbox-signs",
    images: [{ url: "/ultra-thin-slim-lightbox/main-hero.png", alt: "Custom Ultra-Thin Lightbox Sign" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Lightbox Signs & Ultra-Thin LED Lightboxes | The Glownique",
    description:
      "Commercial edge-lit lightboxes and backlit signage for retail displays and storefronts.",
    images: ["/ultra-thin-slim-lightbox/main-hero.png"],
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
        name: "Custom Ultra-Thin Lightbox Signs",
        description:
          "Ultra-thin anodized aluminum custom lightbox signs featuring edge-lit LED illumination for vibrant, shadow-free commercial display graphics.",
        image: `${SITE_URL}/ultra-thin-slim-lightbox/main-hero.png`,
        category: "Commercial Display Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Lightbox Signs", item: pageUrl },
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
        contentName="Custom Ultra-Thin Lightbox Signs"
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
              High-Luminance Commercial Displays
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom Lightbox Signs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Ultra-slim anodized aluminum edge-lit lightboxes delivering perfectly distributed, shadow-free backlighting. Designed for retail storefronts, hospitality menus, and exhibition backdrops.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Lightbox Quote"
                productName="Ultra-thin lightbox sign"
              />
              <Link
                href="/products/ultra-thin-lightbox"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                View Lightbox Specifications →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/ultra-thin-slim-lightbox/main-hero.png"
                  alt="Custom Ultra-Thin Lightbox Sign display in retail boutique"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Edge-Lit Diffusion Technology
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Traditional fluorescent lightbox cabinets are bulky and develop hot spots. Our custom slim lightboxes use an optical-grade acrylic light-guide panel (LGP) with high-density LED perimeter strips for 100% uniform brightness.
                </p>

                <ul className="space-y-4 text-sm text-[#1e1a22]">
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">Ultra-Thin Profile</strong>
                    <span className="text-[#5e5862]">Depth starting from just 18mm to 28mm for flush, modern architectural integration.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">Tool-Free Graphic Swaps</strong>
                    <span className="text-[#5e5862]">Snap-frame and silicone-edge (SEG) options allow graphics to be replaced in under 60 seconds without tools.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">High-CRI Daylight Illumination</strong>
                    <span className="text-[#5e5862]">6500K daylight-balanced illumination reveals true brand colors with zero flicker.</span>
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
