import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { PRODUCT_PAGES } from "@/lib/product-catalog";

export const metadata: Metadata = {
  title: "Custom Signage for Homes & Businesses",
  description:
    "Explore custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signage. Free mockup, 5-year warranty and tracked worldwide delivery.",
  alternates: { canonical: "/custom-signage" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Signage for Homes & Businesses | The Glownique",
    description:
      "Explore custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signage.",
    url: "/custom-signage",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique custom signage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Signage for Homes & Businesses | The Glownique",
    description:
      "Explore custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signage.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function CustomSignagePage() {
  return (
    <>
      <MetaViewCategory category="All sign types" />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Explore the range
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom signage for homes and businesses
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#5e5862]">
              Every sign is handcrafted and made to order, with a free design mockup, a 5-year
              warranty and tracked worldwide delivery. Pick a type to see the full details.
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
      </main>
      <SiteFooter />
    </>
  );
}
