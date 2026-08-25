import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Custom Business & Storefront Signs",
  description:
    "National supplier of custom illuminated business signage — 3D metal channel letters, outdoor storefront signs, custom logo neon signs, ultra-thin lightboxes & acrylic signs. Free mockup & 5-year warranty.",
  alternates: { canonical: "/business-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Business & Storefront Signs | The Glownique",
    description:
      "Handcrafted custom illuminated business signs for storefronts, offices, restaurants, salons and events — LED neon, 3D channel letters, lightboxes & acrylic logo signs.",
    url: "/business-signs",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique Custom Business Signage" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Business & Storefront Signs | The Glownique",
    description:
      "Handcrafted custom illuminated business signs — LED neon, 3D channel letters, lightboxes & acrylic logo signs.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

const b2bProducts = [
  {
    slug: "custom-logo-neon-signs",
    name: "Custom Logo Neon Signs",
    category: "Brand & Interior",
    tagline: "Flexible LED silicone neon tubing mapped precisely to your brand logo, corporate typography, and Pantone colors.",
    specs: ["12V Low Voltage", "Shatterproof Silicone", "Pantone & HEX Match", "Indoor & IP67 Outdoor"],
    image: "/hero/neon-sign-hero.png",
    accent: "#f40b68",
  },
  {
    slug: "channel-letter-signs",
    name: "3D Metal Channel Letter Signs",
    category: "Storefront & Exterior",
    tagline: "Fabricated stainless-steel 3D letters with frontlit, halo backlit or dual-lit LED illumination for outdoor building façades.",
    specs: ["Frontlit / Halo / Dual-lit", "316 Stainless Steel", "Architectural Finishes", "Commercial Grade"],
    image: "/hero/business-coffee.png",
    accent: "#d97706",
  },
  {
    slug: "lightbox-signs",
    name: "Ultra-Thin Lightbox Signs",
    category: "Retail & Display",
    tagline: "Slim anodized aluminum lightboxes with edge-lit matrix LEDs for uniform, shadow-free promotional and menu displays.",
    specs: ["Ultra-Slim Profile", "Edge-Lit Uniform LED", "Tool-Free Graphic Swap", "Wall / Window Mount"],
    image: "/before-after/after-osee-beauty.png",
    accent: "#2563eb",
  },
  {
    slug: "acrylic-logo-signs",
    name: "3D UV-Print Acrylic Logo Signs",
    category: "Office & Reception",
    tagline: "Full-color UV-printed artwork on crystal-clear acrylic paired with glowing LED neon contours for executive brand walls.",
    specs: ["High-Res UV Print", "Layered 3D Acrylic", "LED Contour Glow", "Precision Laser Cut"],
    image: "/hero/workspace-sign.png",
    accent: "#7c3aed",
  },
];

const industries = [
  {
    name: "Retail & Storefronts",
    desc: "Outdoor channel letters, storefront signs, window LED neon and promotional lightboxes engineered to boost foot traffic and street-level road visibility.",
  },
  {
    name: "Corporate Offices & Lobby Walls",
    desc: "Custom office signs for walls with logo, acrylic logo signs with stainless standoffs, and halo-lit 3D metal letters that establish brand authority.",
  },
  {
    name: "Restaurants, Bars & Cafés",
    desc: "Custom bar neon signs, neon restaurant signs, cafe menu lightboxes, and warm ambient glowing wall art that elevates dining hospitality.",
  },
  {
    name: "Salons, Spas & Barbershops",
    desc: "Custom salon neon signs, hair salon logos, barbershop signage, and glamorous mirror plaques that clients love to photograph and share on social media.",
  },
  {
    name: "Gyms & Fitness Studios",
    desc: "High-impact gym neon signs, motivational wall lights, and durable sweat-resistant illuminated workout area branding.",
  },
  {
    name: "Event Spaces & Photo Booths",
    desc: "Personalized neon event backdrops, happy birthday neon signs, wedding neon signs, and photo-ready branded focal points.",
  },
];

const b2bGuides = [
  {
    slug: "custom-business-sign-cost",
    title: "Custom Business Sign Cost Guide",
    desc: "Detailed pricing drivers, sizing formulas, materials, and installation considerations for commercial signage budgets.",
  },
  {
    slug: "front-lit-vs-halo-lit-vs-dual-lit",
    title: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters",
    desc: "Compare visibility, wall reflection physics, and daytime vs nighttime legibility for exterior storefront channel letters.",
  },
];

export default function BusinessSignsHubPage() {
  const pageUrl = `${SITE_URL}/business-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Custom Business & Storefront Signs",
        description:
          "National supplier of custom illuminated business signs including logo neon signs, 3D metal channel letters, lightboxes and acrylic logo signs.",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: pageUrl },
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
      <MetaViewCategory category="Business signage" />
      <AnnouncementBar />
      <ProductTopBar productName="business sign" />
      <main id="main-content" className="bg-white">
        {/* Header Hero */}
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Commercial Signage Hub
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl lg:text-6xl">
              Custom Business Signs &amp; Storefront Signage
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-[#5e5862]">
              Handcrafted, made-to-order commercial signage for storefronts, corporate offices, restaurants,
              salons and retail brands. Delivered nationwide with a free design preview, 5-year warranty,
              and direct factory support.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Free Business Sign Mockup"
              />
              <Link
                href="/guides/custom-business-sign-cost"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] transition-colors hover:border-[#f40b68] hover:text-[#ce0754]"
              >
                View Business Sign Cost Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Commercial Products Grid */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-extrabold text-[#1e1a22] sm:text-4xl">
                Four Custom Illuminated Sign Categories
              </h2>
              <p className="mt-3 text-base text-[#5e5862]">
                Choose the right illuminated technology for your brand environment.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {b2bProducts.map((p) => (
                <div
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-[#eadfe4] bg-white shadow-[0_14px_40px_rgba(107,38,67,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/5">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-white shadow-md"
                      style={{ backgroundColor: p.accent }}
                    >
                      {p.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-2xl font-extrabold text-[#1e1a22]">
                      <Link href={`/business-signs/${p.slug}`} className="hover:underline">
                        {p.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{p.tagline}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.specs.map((s) => (
                        <span
                          key={s}
                          className="rounded-lg bg-[#f8f5f7] px-2.5 py-1 text-xs font-semibold text-[#1e1a22]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[#eadfe4] pt-6">
                      <Link
                        href={`/business-signs/${p.slug}`}
                        className="text-sm font-extrabold text-[#ce0754] hover:underline"
                      >
                        Explore B2B Specs & Uses →
                      </Link>
                      <CustomQuoteButton
                        className="text-xs font-bold text-[#1e1a22] hover:text-[#ce0754]"
                        label="Get Quote"
                        productName={p.name}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions Grid */}
        <section className="border-t border-[#eadfe4] bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
                Industry Applications
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-[#1e1a22] sm:text-4xl">
                Commercial Signage Tailored by Industry
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-base text-[#5e5862]">
                Custom engineered signage solutions matching architectural codes, visibility needs, and brand aesthetic.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((ind) => (
                <div
                  key={ind.name}
                  className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6 shadow-sm transition-all hover:border-[#f40b68]"
                >
                  <h3 className="text-lg font-extrabold text-[#1e1a22]">{ind.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5e5862]">{ind.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buying & Decision Support Section */}
        <section className="border-t border-[#eadfe4] bg-[#faf7f8] py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-[#1e1a22] sm:text-4xl">
                B2B Signage Decision Guides
              </h2>
              <p className="mt-3 text-base text-[#5e5862]">
                Balanced technical information to help procurement and facilities teams choose wisely.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {b2bGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="group rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm transition-all hover:border-[#f40b68] hover:shadow-md"
                >
                  <h3 className="text-xl font-bold text-[#1e1a22] group-hover:text-[#f40b68]">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5e5862]">{g.desc}</p>
                  <span className="mt-4 inline-block text-xs font-extrabold uppercase text-[#ce0754]">
                    Read Guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
