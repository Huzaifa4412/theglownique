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
  title: "Custom Acrylic Business Signs & 3D Logos",
  description:
    "Custom acrylic signs for business walls with logo, 3D UV-printed letters, stainless standoff mounting and glowing LED neon contours. Free design mockup & 5-year warranty.",
  alternates: { canonical: "/business-signs/acrylic-logo-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Acrylic Business Signs & 3D Logos | The Glownique",
    description:
      "Custom acrylic signs for business walls, corporate offices, reception desks and retail spaces with UV print & LED neon.",
    url: "/business-signs/acrylic-logo-signs",
    images: [{ url: "/hero/workspace-sign.png", alt: "3D Acrylic Logo Signs for Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Acrylic Business Signs & 3D Logos | The Glownique",
    description:
      "Custom acrylic signs for business walls, corporate offices and reception desks with free mockup.",
    images: ["/hero/workspace-sign.png"],
  },
};

const acrylicLogoFaqs = [
  {
    q: "What makes 3D UV-printed acrylic signs ideal for complex business logos?",
    a: "Direct-to-substrate UV printing renders microscopic tagline fonts, multi-shade gradients, and photorealistic emblems with 100% vector accuracy. Pairing printed artwork with hand-crafted LED neon contours creates a vibrant hybrid sign that neon tubing alone cannot replicate.",
  },
  {
    q: "Why is an acrylic + neon hybrid sign often more cost-effective than neon-only?",
    a: "Complex logos with numerous small letters or intricate shapes require metres of hand-bent neon tubing and multiple electrical solder joints. With UV-print acrylic, the printer produces the fine detail in a single pass, allowing us to route neon only around key glowing contours — cutting fabrication labour and overall cost.",
  },
  {
    q: "What acrylic materials and finishes are available?",
    a: "We offer optical-grade clear cast acrylic, solid opaque white or black acrylic, frosted diffusion acrylic, and mirrored gold, silver, or rose-gold backing panels with diamond-polished flame edges.",
  },
  {
    q: "How are acrylic logo signs mounted to interior walls?",
    a: "Each sign ships with pre-drilled precision corner holes and brushed stainless steel architectural standoff barrels (spacers) that suspend the sign 0.5–1 inch off the drywall, creating modern dimensional drop-shadows.",
  },
];

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
      {
        "@type": "FAQPage",
        mainEntity: acrylicLogoFaqs.map((faq) => ({
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
              Corporate &amp; Reception Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom Acrylic Logo Signs &amp; 3D Wall Plaques
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

        {/* Applications */}
        <section className="border-t border-[#eadfe4] bg-[#faf7f8] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-10">
              Popular Acrylic Logo Sign Applications
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Corporate Lobbies</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Main reception desk backdrops that welcome clients with sleek modern elegance.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Medical &amp; Dental</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Clean, sterile aesthetic with polished acrylic edges and subtle halo lighting.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Beauty &amp; Hair Salons</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Multi-layered gold mirror backing with full-color brand logos and neon highlights.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Conference Rooms</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Executive boardroom wall art emphasizing company mission statements and brand crests.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-t border-[#eadfe4] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-8">
              Acrylic Logo Sign FAQs
            </h2>
            <div className="space-y-4">
              {acrylicLogoFaqs.map((faq) => (
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
