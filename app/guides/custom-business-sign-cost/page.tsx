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
  title: "Custom Business Sign Cost: 2026 Guide",
  description:
    "Pricing guide for custom business signs: LED neon signs, 3D channel letters, lightboxes & acrylic logos. Compare cost drivers, sizing and mounting specs.",
  alternates: { canonical: "/guides/custom-business-sign-cost" },
  openGraph: {
    type: "article",
    siteName: "The Glownique",
    title: "Custom Business Sign Cost: 2026 Guide | The Glownique",
    description:
      "Understand what determines custom business sign pricing — sign technology, sizing, illumination styles, weatherproofing and custom quotes.",
    url: "/guides/custom-business-sign-cost",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom Business Sign Cost: 2026 Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Business Sign Cost: 2026 Guide | The Glownique",
    description:
      "Understand what determines custom business sign pricing — sign technology, sizing, illumination styles, weatherproofing and custom quotes.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

const costFaqs = [
  {
    q: "How much does a custom neon sign cost?",
    a: "Small to medium custom LED neon signs (approx 20–36 inches) typically range from $120 to $350. Large commercial feature wall signs (40–80+ inches) range from $400 to $900+ depending on total tubing length, font complexity, and acrylic cut style.",
  },
  {
    q: "What is the average price of 3D metal channel letter signs for storefronts?",
    a: "Fabricated commercial channel letter signs typically range from $800 to $3,500+ depending on letter height, stainless steel grade (304 vs 316), illumination style (frontlit, halo backlit, or dual-lit), and raceway vs flush mounting.",
  },
  {
    q: "Why is a 3D acrylic UV-print sign more economical for complex logos?",
    a: "When a logo has multiple gradient colors, small tagline text, or intricate emblems, rendering it purely in hand-bent neon tubing requires dozens of manual solder joints and metres of silicone tube. With UV-print acrylic, the printer produces high-definition detail in one pass, allowing neon to be placed only along key glowing contours — cutting build time and cost by 30–50%.",
  },
  {
    q: "Are design mockups and quote revisions free before ordering?",
    a: "Yes. The Glownique provides 100% free digital design mockups and itemized quotes with zero upfront payment or purchase obligation.",
  },
];

export default function CustomBusinessSignCostGuidePage() {
  const pageUrl = `${SITE_URL}/guides/custom-business-sign-cost`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Custom Business Sign Cost Guide — Pricing Drivers & Budgeting",
        description:
          "Detailed technical guide analyzing the cost drivers behind custom illuminated commercial signage.",
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
          { "@type": "ListItem", position: 3, name: "Custom Business Sign Cost: 2026 Guide", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: costFaqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <MetaGuideView guideName="Custom Business Sign Cost: 2026 Guide" />
      <AnnouncementBar />
      <ProductTopBar productName="cost guide" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#dcd6ce] bg-gradient-to-b from-[#efe9e0] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/guides" className="hover:underline">Guides</Link> &gt;{" "}
              <span className="text-[#8f2347]">Custom Business Sign Cost</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#8f2347]">
              Pricing &amp; Procurement Guide
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#282421] sm:text-5xl">
              Custom Business Sign Cost Guide
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Understand the core factors that influence custom illuminated signage pricing — sign category, dimensions, illumination method, acrylic thickness, and outdoor weatherproofing.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <article className="prose prose-pink max-w-none text-[#282421]">
              <h2 className="text-3xl font-semibold text-[#282421]">
                What Determines the Price of a Custom Business Sign?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                Because custom business signs are engineered to order based on your brand logo, physical wall dimensions, and illumination specifications, pricing varies across projects. Knowing the key cost drivers helps you optimize your signage budget while achieving maximum brand impact.
              </p>

              <div className="my-10 overflow-hidden rounded-2xl border border-[#dcd6ce] bg-white shadow-sm">
                <table className="w-full text-left text-sm text-[#282421]">
                  <thead className="bg-[#faf7f8] text-xs font-extrabold uppercase text-[#282421]">
                    <tr>
                      <th className="p-4 border-b border-[#dcd6ce]">Sign Category</th>
                      <th className="p-4 border-b border-[#dcd6ce]">Primary Application</th>
                      <th className="p-4 border-b border-[#dcd6ce]">Key Cost Drivers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dcd6ce]">
                    <tr>
                      <td className="p-4 font-bold">Custom LED Neon Signs</td>
                      <td className="p-4 text-[#5e5862]">Brand Walls, Reception, Bar/Lounge</td>
                      <td className="p-4 text-[#5e5862]">Total tube length, letter height, acrylic backer cut</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">3D Metal Channel Letters</td>
                      <td className="p-4 text-[#5e5862]">Storefront Façades, Building Exteriors</td>
                      <td className="p-4 text-[#5e5862]">Stainless grade, illumination type (front/halo/dual)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">Ultra-Thin Lightboxes</td>
                      <td className="p-4 text-[#5e5862]">Retail Display, Menus, Window Signs</td>
                      <td className="p-4 text-[#5e5862]">Frame size, single/double sided, edge-lit LED density</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold">3D Acrylic UV Logo Signs</td>
                      <td className="p-4 text-[#5e5862]">Corporate Offices, Salons, Reception</td>
                      <td className="p-4 text-[#5e5862]">Layer count, UV print area, neon contour complexity</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-2xl font-semibold text-[#282421] mt-8">
                Key Cost Factors Explained
              </h3>

              <div className="mt-6 space-y-6 text-sm text-[#5e5862] leading-relaxed">
                <div>
                  <h4 className="text-lg font-bold text-[#282421]">1. Physical Dimensions &amp; Scale</h4>
                  <p className="mt-1">
                    Larger signs require wider acrylic backers, additional structural bracing, and a higher density of LED modules and power transformers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#282421]">2. Illumination Method &amp; LEDs</h4>
                  <p className="mt-1">
                    Single-color LED neon is cost-effective, while RGB color-changing LEDs or dual-lit (front-lit + rear halo) 3D metal letters require dual wiring runs and advanced controllers.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-[#282421]">3. Indoor vs. Outdoor Weatherproofing (IP67)</h4>
                  <p className="mt-1">
                    Exterior storefront signs require IP67 sealed silicone tubing, waterproof transformers, and weather-resistant backing materials to withstand rain, wind, and UV exposure.
                  </p>
                </div>
              </div>

              {/* Pricing FAQs Section */}
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-[#282421] mb-6">
                  Frequently Asked Pricing Questions
                </h3>
                <div className="space-y-4">
                  {costFaqs.map((faq) => (
                    <div key={faq.q} className="rounded-2xl border border-[#dcd6ce] bg-[#fdfafb] p-6">
                      <h4 className="text-base font-extrabold text-[#282421]">{faq.q}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 rounded-3xl border border-[#dcd6ce] bg-[#efe9e0] p-8 text-center">
                <h3 className="text-2xl font-semibold text-[#282421]">
                  Get an Itemized Quote for Your Business Sign
                </h3>
                <p className="mt-2 text-sm text-[#5e5862]">
                  Share your logo or design idea with our team and receive a free digital mockup and itemized price breakdown within 1–2 hours.
                </p>
                <div className="mt-6">
                  <CustomQuoteButton
                    className="button button--whatsapp text-base px-8 py-3.5"
                    label="Request Itemized Quote & Free Mockup"
                    productName="custom business sign"
                  />
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
