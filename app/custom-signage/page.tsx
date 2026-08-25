import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Custom Signage & Light Up Signs for Homes & Businesses",
  description:
    "Handcrafted custom LED neon signs, personalized light up signs, 3D metal letters, ultra-thin lightboxes & UV-print acrylic signs. Free design mockup & 5-year warranty.",
  alternates: { canonical: "/custom-signage" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Signage & Light Up Signs for Homes & Businesses | The Glownique",
    description:
      "Explore custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signage with free mockup.",
    url: "/custom-signage",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique custom signage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Signage & Light Up Signs for Homes & Businesses | The Glownique",
    description:
      "Explore custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signage.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function CustomSignagePage() {
  const pageUrl = `${SITE_URL}/custom-signage`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Custom Signage & Light Up Signs for Homes & Businesses",
        description:
          "Explore custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signage.",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Custom Signage", item: pageUrl },
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
      <MetaViewCategory category="All sign types" />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Handcrafted Custom Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom Signage &amp; Light Up Signs
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#5e5862]">
              Every sign is handcrafted and made to order, with a free digital design mockup, a 5-year
              warranty and tracked worldwide delivery. Choose a sign type below to see full specs and custom options.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1320px] gap-6 px-4 sm:px-6 md:grid-cols-2">
            {PRODUCT_PAGES.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group block overflow-hidden rounded-3xl border border-[#eadfe4] bg-white shadow-[0_14px_40px_rgba(107,38,67,0.08)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5">
                  <Image
                    src={product.heroImage}
                    alt={`${product.name} — ${product.tagline}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg"
                    style={{ backgroundColor: product.accent }}
                  >
                    {product.category}
                  </span>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[#1e1a22]">
                    {product.name}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#5e5862]">{product.tagline}</p>
                  <span
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold transition-colors"
                    style={{ color: product.accent }}
                  >
                    Explore in detail
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Commercial Hub Link Callout */}
        <section className="border-t border-[#eadfe4] bg-[#faf7f8] py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-extrabold text-[#1e1a22]">
              Looking for Commercial &amp; Exterior Storefront Signage?
            </h2>
            <p className="mt-2 text-sm text-[#5e5862]">
              Visit our dedicated Business Signage Hub for architectural channel letters, office logo plaques, and commercial retail displays.
            </p>
            <div className="mt-6">
              <Link
                href="/business-signs"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1e1a22] px-6 py-3.5 text-xs font-extrabold uppercase tracking-widest text-white hover:bg-[#ce0754]"
              >
                Explore Business Signage Hub →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
