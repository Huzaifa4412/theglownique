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
  title: "Custom Channel Letter & 3D Metal Signs",
  description:
    "Custom 3D metal channel letter signs for commercial storefronts. Front-lit, reverse halo backlit & dual-lit fabricated stainless steel letters with 5-year warranty.",
  alternates: { canonical: "/business-signs/channel-letter-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Channel Letter & 3D Metal Signs | The Glownique",
    description:
      "Commercial 3D metal channel letters for exterior storefronts and corporate building façades. Frontlit, halo-lit & dual-lit options with IP67 waterproofing.",
    url: "/business-signs/channel-letter-signs",
    images: [{ url: "/hero/business-coffee.png", alt: "3D Metal Channel Letter Signs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Channel Letter & 3D Metal Signs | The Glownique",
    description:
      "Commercial 3D metal channel letters for exterior storefronts and corporate building façades.",
    images: ["/hero/business-coffee.png"],
  },
};

const channelLetterFaqs = [
  {
    q: "What are channel letter signs?",
    a: "Channel letter signs are custom-fabricated three-dimensional letters, numbers, or logo shapes crafted from sheet metal (typically stainless steel or aluminum) and fitted with internal LED illumination. They are the premier standard for commercial storefronts and building façades.",
  },
  {
    q: "What is the difference between front-lit and halo-lit (reverse) channel letters?",
    a: "Front-lit letters have translucent acrylic faces that emit bright, forward-directed light for maximum road visibility. Halo-lit (or reverse channel) letters have solid metal faces and open or clear acrylic backs that project light onto the building wall, creating a sophisticated floating halo silhouette.",
  },
  {
    q: "How are channel letters mounted to building walls?",
    a: "We support direct flush/stud mounting (letters mount individually into the facade with concealed wiring) or raceway mounting (letters mount onto an architectural metal backer bar that houses all electrical wiring, requiring fewer wall penetrations).",
  },
  {
    q: "Are your channel letters weather-resistant for outdoor use?",
    a: "Yes. All our exterior channel letters are built with marine-grade 304/316 stainless steel, IP67-rated waterproof LEDs, and weather-sealed UL-certified power transformers engineered for extreme heat, rain, and snow.",
  },
];

export default function ChannelLetterSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/channel-letter-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Custom 3D Metal Channel Letter Signs",
        description:
          "Custom fabricated 3D stainless steel channel letters offering front-lit, halo backlit, or dual-lit LED illumination for architectural storefronts and building façades.",
        image: `${SITE_URL}/hero/business-coffee.png`,
        category: "Exterior Commercial Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Channel Letter Signs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: channelLetterFaqs.map((faq) => ({
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
        contentId="channel-letter-signs"
        contentName="3D Metal Channel Letter Signs"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="3D channel letter sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/business-signs" className="hover:underline">Business Signs</Link> &gt;{" "}
              <span className="text-[#ce0754]">Channel Letter Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Architectural Storefront Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom 3D Metal Channel Letter Signs
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Architectural stainless-steel 3D lettering engineered for high-visibility storefronts, commercial building façades, and corporate reception walls.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Channel Letter Quote"
                productName="3D metal channel letter sign"
              />
              <Link
                href="/guides/front-lit-vs-halo-lit-vs-dual-lit"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                Front-Lit vs Halo-Lit Comparison →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/hero/business-coffee.png"
                  alt="3D Metal Channel Letter Sign on commercial storefront"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Three Distinct Illumination Methods
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Every building facade presents unique architectural lighting requirements. Choose from three precision LED configurations:
                </p>

                <ul className="space-y-4 text-sm text-[#1e1a22]">
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">1. Front-Lit Channel Letters</strong>
                    <span className="text-[#5e5862]">Bright acrylic faces throw clear, crisp illumination forward for maximum day and night readability from roadways.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">2. Halo Backlit (Reverse) Channel Letters</strong>
                    <span className="text-[#5e5862]">Solid metal faces project light backward onto the mounting wall, creating a sophisticated floating halo silhouette.</span>
                  </li>
                  <li className="rounded-xl border border-[#eadfe4] bg-[#faf7f8] p-4">
                    <strong className="block text-base font-extrabold text-[#1e1a22]">3. Dual-Lit Channel Letters</strong>
                    <span className="text-[#5e5862]">Combines bright front face illumination with soft rear halo glow for ultimate architectural depth.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Specifications & Mounting Section */}
        <section className="border-t border-[#eadfe4] bg-[#faf7f8] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-10">
              Commercial Engineering &amp; Specifications
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Metal Construction</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Marine-grade 304/316 stainless steel with brushed, mirror, gold, brass or matte powder-coat finish.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">IP67 Waterproofing</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Fully sealed LED modules and drainage weep holes engineered for extreme rain, snow, and UV exposure.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Mounting Options</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Direct flush wall mounting, standoffs for halo dispersion, or structural raceway bars for easy installation.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Power &amp; Lifespan</h3>
                <p className="mt-2 text-xs text-[#5e5862]">12V/24V low-voltage UL drivers rated for 100,000 hours of continuous commercial operation.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="border-t border-[#eadfe4] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-8">
              Channel Letter Sign FAQs
            </h2>
            <div className="space-y-4">
              {channelLetterFaqs.map((faq) => (
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
