import type { Metadata } from "next";
import Link from "next/link";

import { MetaGuideView } from "@/components/analytics/meta-view-trackers";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters",
  description:
    "Compare 3D metal channel letter illumination styles — front-lit, halo backlit and dual-lit. Learn about day & night legibility, wall reflection requirements, and storefront aesthetics.",
  alternates: { canonical: "/guides/front-lit-vs-halo-lit-vs-dual-lit" },
  openGraph: {
    type: "article",
    siteName: "The Glownique",
    title: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters | The Glownique",
    description:
      "Comparative guide for storefront channel letter lighting methods, wall reflection requirements, and aesthetic impact.",
    url: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    images: [{ url: "/hero/business-coffee.png", alt: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters | The Glownique",
    description:
      "Comparative guide for storefront channel letter lighting methods, wall reflection requirements, and aesthetic impact.",
    images: ["/hero/business-coffee.png"],
  },
};

export default function LightingComparisonGuidePage() {
  const pageUrl = `${SITE_URL}/guides/front-lit-vs-halo-lit-vs-dual-lit`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters Guide",
        description:
          "Comparative technical analysis of storefront 3D channel letter illumination methods.",
        datePublished: "2026-08-11",
        dateModified: "2026-08-11",
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: "Front-Lit vs Halo-Lit vs Dual-Lit", item: pageUrl },
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
      <MetaGuideView guideName="Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters" />
      <AnnouncementBar />
      <ProductTopBar productName="channel letter guide" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/guides" className="hover:underline">Guides</Link> &gt;{" "}
              <span className="text-[#ce0754]">Channel Letter Lighting Comparison</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Illumination & Technology Guide
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Front-Lit vs. Halo-Lit vs. Dual-Lit Channel Letters
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Choosing the right lighting method for your 3D metal channel letter sign determines how your brand is perceived day and night. Here is how front-lit, halo backlit, and dual-lit options compare.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <article className="prose prose-pink max-w-none text-[#1e1a22]">
              <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                Illumination Styles Compared
              </h2>

              <div className="my-10 overflow-hidden rounded-2xl border border-[#eadfe4] bg-white shadow-sm">
                <table className="w-full text-left text-sm text-[#1e1a22]">
                  <thead className="bg-[#faf7f8] text-xs font-extrabold uppercase text-[#1e1a22]">
                    <tr>
                      <th className="p-4 border-b border-[#eadfe4]">Lighting Style</th>
                      <th className="p-4 border-b border-[#eadfe4]">Light Direction</th>
                      <th className="p-4 border-b border-[#eadfe4]">Best Wall Type</th>
                      <th className="p-4 border-b border-[#eadfe4]">Primary Aesthetic</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eadfe4]">
                    <tr>
                      <td className="p-4 font-bold">Front-Lit</td>
                      <td className="p-4 text-[#5e5862]">Forward through translucent acrylic face</td>
                      <td className="p-4 text-[#5e5862]">Any exterior surface (brick, wood, metal)</td>
                      <td className="p-4 text-[#5e5862]">High contrast, maximum distance legibility</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Halo-Lit (Backlit)</td>
                      <td className="p-4 text-[#5e5862]">Backward against wall surface</td>
                      <td className="p-4 text-[#5e5862]">Smooth matte or textured architectural wall</td>
                      <td className="p-4 text-[#5e5862]">Sophisticated, premium floating glow</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Dual-Lit</td>
                      <td className="p-4 text-[#5e5862]">Forward through face + backward halo</td>
                      <td className="p-4 text-[#5e5862]">Light-colored wall or building facade</td>
                      <td className="p-4 text-[#5e5862]">Maximum dramatic brand statement</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-8 space-y-8 text-sm text-[#5e5862] leading-relaxed">
                <div>
                  <h3 className="text-xl font-bold text-[#1e1a22]">1. Front-Lit Channel Letters</h3>
                  <p className="mt-2">
                    Front-lit channel letters feature fabricated stainless-steel side returns and a translucent acrylic front face. Internal LEDs illuminate the face of each letter directly toward viewing traffic. This option provides the highest night legibility over long distances, making it ideal for retail shopping centers and roadside storefronts.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1e1a22]">2. Halo-Lit (Backlit) Channel Letters</h3>
                  <p className="mt-2">
                    Halo-lit letters have solid stainless-steel metal faces and open or clear backs. Mounted on short standoffs away from the wall, internal LEDs reflect light backward onto the facade. This casts a soft, elegant halo outline around each letter. It is widely specified for luxury boutiques, corporate headquarters, and high-end restaurants.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#1e1a22]">3. Dual-Lit Channel Letters</h3>
                  <p className="mt-2">
                    Dual-lit channel letters feature both translucent front acrylic faces and clear rear backs with standoff mounts. They combine intense front readability with a surrounding halo aura, ensuring your storefront commands attention from every angle.
                  </p>
                </div>
              </div>

              <div className="mt-12 rounded-3xl border border-[#eadfe4] bg-[#fff0f5] p-8 text-center">
                <h3 className="text-2xl font-extrabold text-[#1e1a22]">
                  Need Help Deciding Which Lighting Style Fits Your Storefront?
                </h3>
                <p className="mt-2 text-sm text-[#5e5862]">
                  Our design team can provide digital mockups showing your exact logo rendered in front-lit, halo-lit or dual-lit channel letters.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <CustomQuoteButton
                    className="button button--whatsapp text-base px-8 py-3.5"
                    label="Get Free Channel Letter Mockups"
                    productName="3D channel letter sign"
                  />
                  <Link
                    href="/business-signs/channel-letter-signs"
                    className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3 py-3 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
                  >
                    View Channel Letter Sign Product Page →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
