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
  title: "Custom Logo Neon Signs for Business & Office Lobby Walls",
  description:
    "Custom LED logo neon signs for business brand walls, reception lobbies, restaurants and retail storefronts. Exact Pantone color matching, safe 12V power and 5-year warranty.",
  alternates: { canonical: "/business-signs/custom-logo-neon-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Logo Neon Signs for Business & Office Lobby Walls | The Glownique",
    description:
      "Precision-crafted LED logo neon signs for corporate offices, reception desks, retail storefronts and hospitality venues.",
    url: "/business-signs/custom-logo-neon-signs",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom Logo Neon Signs for Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Logo Neon Signs for Business & Office Lobby Walls | The Glownique",
    description:
      "Precision-crafted LED logo neon signs for commercial spaces with free digital mockup.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

const logoNeonFaqs = [
  {
    q: "Can you turn any company logo into a custom neon sign?",
    a: "Yes. Simply upload your vector logo file (AI, EPS, SVG, or high-resolution PNG/PDF). Our design engineers will map neon tubing paths, optimize line weights for glowing readability, and provide a 100% free digital proof before fabrication.",
  },
  {
    q: "How do you match our exact corporate brand colors?",
    a: "We match standard Pantone (PMS), HEX and CMYK brand color guidelines. We offer 13 distinct core silicone neon colors, full RGB addressable tubing, and precision-matched acrylic backboards.",
  },
  {
    q: "Are LED neon logo signs safe for commercial office spaces and high-traffic areas?",
    a: "Absolutely. Unlike fragile glass neon that operates at 3,000–15,000V, our commercial LED neon operates on safe 12V DC power. It produces zero heat, no buzzing noise, contains zero mercury, and uses flexible shatterproof silicone.",
  },
  {
    q: "What acrylic backboard cuts are available for business logos?",
    a: "We offer Cut to Shape (follows the silhouette of your logo), Cut to Letter (acrylic tightly routed around individual letters for an invisible backing effect), and Cut to Rectangle/Square (acrylic backer board with pre-drilled standoff holes).",
  },
];

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
      {
        "@type": "FAQPage",
        mainEntity: logoNeonFaqs.map((faq) => ({
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
              Transform your business logo, brand slogan or corporate mascot into a vibrant, energy-efficient
              illuminated centerpiece. Handcrafted with safe 12V silicone LED neon on optical cast acrylic.
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
                  Built for Maximum Commercial Visibility &amp; Longevity
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Whether you are outfitting a retail store, office reception, restaurant bar or fitness studio,
                  our commercial LED logo signs deliver eye-catching visibility without high energy bills.
                </p>

                <ul className="space-y-3 text-sm font-medium text-[#1e1a22]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#ce0754]">✓</span>
                    <span><strong>Pantone &amp; HEX Color Matching:</strong> Exact brand color alignment for contours and backings.</span>
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

        {/* Commercial Logo Applications */}
        <section className="border-t border-[#eadfe4] bg-[#faf7f8] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-10">
              Popular Business Logo Neon Sign Applications
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Office &amp; Lobbies</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Reception brand walls and executive conference rooms that project contemporary prestige.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Retail Storefronts</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Window hanging and in-store visual merchandising displays that drive foot traffic.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Hospitality &amp; Bars</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Atmospheric cocktail bar signs, restaurant wall emblems and Instagram photo moments.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Salons &amp; Studios</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Chic, photo-ready backdrop signs that turn clients into organic social media advocates.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t border-[#eadfe4] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-8">
              Business Logo Neon Sign FAQs
            </h2>
            <div className="space-y-4">
              {logoNeonFaqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6">
                  <h3 className="text-base font-extrabold text-[#1e1a22]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
