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
  title: "3D UV-Print Acrylic Logo Signs for Offices & Stores",
  description:
    "Precision full-color UV-printed artwork on premium acrylic paired with glowing LED neon contours. Perfect for corporate reception walls, salons, and offices.",
  alternates: { canonical: "/business-signs/acrylic-logo-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "3D Acrylic Logo Signs | The Glownique",
    description:
      "Custom UV-printed acrylic logo signs with glowing LED neon accents for corporate offices and retail spaces.",
    url: "/business-signs/acrylic-logo-signs",
    images: [{ url: "/hero/workspace-sign.png", alt: "3D Acrylic Logo Signs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "3D Acrylic Logo Signs | The Glownique",
    description:
      "Custom UV-printed acrylic logo signs with glowing LED neon accents for corporate offices and retail spaces.",
    images: ["/hero/workspace-sign.png"],
  },
};

export default function AcrylicLogoSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/acrylic-logo-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "3D UV-Print Acrylic Logo Signs",
        description:
          "High-precision full-color UV printed artwork on clear or tinted acrylic backings integrated with custom LED neon lighting for corporate branding.",
        image: `${SITE_URL}/hero/workspace-sign.png`,
        category: "Corporate & Interior Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "3D Acrylic Logo Signs", item: pageUrl },
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
        contentId="acrylic-logo-signs"
        contentName="3D UV-Print Acrylic Logo Signs"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="3D acrylic logo sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/business-signs" className="hover:underline">Business Signs</Link> &gt;{" "}
              <span className="text-[#ce0754]">3D Acrylic Logo Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Corporate & Reception Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              3D UV-Print Acrylic Logo Signs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Combine razor-sharp UV printing for intricate logo details, gradients, and typography with glowing LED neon contours for an unforgettable reception wall statement.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get an Acrylic Logo Quote"
                productName="3D acrylic logo sign"
              />
              <Link
                href="/products/uv-print-acrylic-signs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                View General Acrylic Specs →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/hero/workspace-sign.png"
                  alt="3D UV-Print Acrylic Logo Sign in office reception"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  High-Precision Full Color + Neon Contours
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  When your brand logo includes fine tagline text, complex gradients or multi-colored emblems that pure neon cannot represent alone, our hybrid UV-print acrylic signage delivers 100% fidelity.
                </p>

                <ul className="space-y-3 text-sm font-medium text-[#1e1a22]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#7c3aed]">✓</span>
                    <span><strong>Industrial High-Res UV Printing:</strong> Scratch-resistant cured ink printed directly onto premium cast acrylic.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#7c3aed]">✓</span>
                    <span><strong>Illuminated Neon Accents:</strong> Key brand elements and border contours are outlined in glowing LED neon.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#7c3aed]">✓</span>
                    <span><strong>3D Standoff Mounting:</strong> Stainless steel wall standoffs create dimensional shadow lines on reception walls.</span>
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
