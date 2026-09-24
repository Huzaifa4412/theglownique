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
  title: "Custom Backlit Signs for Business",
  description:
    "Custom 3D metal backlit signs & halo-lit logo signage for business storefronts and offices. Handcrafted stainless steel letters with 5-year warranty.",
  alternates: { canonical: "/business-signs/backlit-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Backlit Signs for Business | The Glownique",
    description:
      "Commercial 3D metal backlit signs and halo-lit channel letters for storefronts, reception walls, and corporate offices. 12V low-voltage with 5-year warranty.",
    url: "/business-signs/backlit-signs",
    images: [{ url: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp", alt: "Custom Backlit Signs for Business" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Backlit Signs for Business | The Glownique",
    description:
      "Handcrafted 3D stainless steel backlit signage and halo-lit letters for businesses.",
    images: ["/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp"],
  },
};

const backlitFaqs = [
  {
    q: "What is a backlit sign and how does halo illumination work?",
    a: "A backlit sign (also called a halo-lit or reverse channel letter sign) features solid metal faces with open or translucent acrylic backs. High-efficiency LEDs inside each letter project light backward onto the mounting wall. The light reflects off the wall surface to create a soft, high-contrast silhouette halo around each letterform while keeping the letter face crisp and unlit.",
  },
  {
    q: "What wall surfaces work best with halo backlit signs?",
    a: "Halo-lit signage performs best on matte, light-to-medium toned wall surfaces such as painted drywall, smooth concrete, stone, and light natural timber. High-gloss finishes (like polished tile or mirror panels) can reflect individual LED diode hotspots; for gloss or uneven brick surfaces, we mount the letters onto an architectural matte backer panel first.",
  },
  {
    q: "How are wires and power supplies concealed on a backlit wall sign?",
    a: "For drywall and accessible interior walls, low-voltage wiring passes invisibly through hollow mounting standoffs directly into the wall cavity or drop ceiling. In spaces where wall penetrations are restricted, we mount the sign onto a slim, floating architectural backer panel that conceals all inter-letter wiring, requiring only a single power connection.",
  },
  {
    q: "Can backlit signs be installed outdoors?",
    a: "Yes. Our exterior backlit signs are fabricated from stainless steel with IP67-rated, silicone-encapsulated LEDs. Drainage weep holes prevent internal moisture accumulation, and exterior-rated low-voltage drivers ensure reliable operation in rain, snow, and direct sunlight.",
  },
  {
    q: "What metal finishes and LED color temperatures are available?",
    a: "Faces and returns can be finished in brushed titanium gold, matte black powder coat, brushed stainless steel, champagne bronze, or custom Pantone-matched enamel. LED halo lighting is available in 2700K warm white, 3000K soft white, 4000K neutral white, 6500K daylight white, or custom vibrant brand colors.",
  },
];

export default function BacklitSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/backlit-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Custom 3D Metal Backlit Signs",
        description:
          "Custom fabricated 3D stainless steel backlit signage and halo-lit channel letters engineered for corporate lobbies, boutique storefronts, and architectural walls.",
        image: `${SITE_URL}/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp`,
        category: "Commercial Illuminated Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Backlit Signs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: backlitFaqs.map((faq) => ({
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
        contentId="backlit-signs"
        contentName="Custom Backlit Signs for Business"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="backlit signs" />

      <main id="main-content" className="bg-[#0b0b0e] text-[#f5f5f7]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#181820] via-[#0f0f14] to-[#0b0b0e] pt-12 pb-20 sm:pt-20 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e0a23c]">
                  Architectural Halo Illumination
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Custom Backlit Signs & Halo-Lit Business Signage
                </h1>

                {/* Direct Answer Block for Search & AI Overviews */}
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-[#c7c7d2] sm:text-base">
                    <strong className="text-white">What is a backlit sign?</strong> A backlit sign is an architectural 3D illuminated display where solid metal letters project light backward onto the mounting wall. The light reflects off the surface to create a sophisticated, floating halo glow. Backlit signage delivers premium, glare-free legibility for executive reception walls, boutique retail, and upscale storefront facades.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#a0a0b0]">
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">5-Year Warranty</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">Free 2-Hour Mockup</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">Stainless Steel</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">12V Silent LED Drivers</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">IP67 Waterproofing</span>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CustomQuoteButton
                    productName="custom backlit sign"
                    label="Request Free Backlit Mockup"
                    className="w-full sm:w-auto"
                  />
                  <Link
                    href="/guides/front-lit-vs-halo-lit-vs-dual-lit"
                    className="text-center text-sm font-medium text-[#e0a23c] hover:underline"
                  >
                    Compare Front-Lit vs Halo-Lit →
                  </Link>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <div className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60">
                  <Image
                    src="/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp"
                    alt="Custom halo-lit 3D metal backlit sign on an office reception wall"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 460px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-[#808090]">
                  Custom brushed-gold halo backlit logo sign installed on a matte architectural wall.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Optical Principles Section */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                The Optical Principle: How Halo Backlighting Works
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#a0a0b0]">
                Unlike front-lit signs where light travels directly from the face to the viewer’s eye, a backlit sign borrows the mounting wall as an optical component. The wall finish, color, and standoff distance determine the character of your sign.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e0a23c]/10 text-[#e0a23c] font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-white">Solid Dimensional Face</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9595a5]">
                  Each letter is laser-cut and welded from sheet metal with deep side returns (depths from 1 to 3 inches). The solid opaque face ensures crisp typographic contrast in daylight and direct interior lighting.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e0a23c]/10 text-[#e0a23c] font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-white">Controlled Rear Diffusion</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9595a5]">
                  Commercial-grade LED modules are mounted inside the hollow channel, firing backward through a frosted acrylic diffuser plate that prevents internal LED hotspots and creates an even wash of light.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e0a23c]/10 text-[#e0a23c] font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-white">Calibrated Standoff Depth</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9595a5]">
                  Architectural standoffs hold the letters away from the wall (typically 15mm to 40mm). The standoff distance determines the width of the halo: shorter standoffs produce a crisp rim, while longer standoffs produce a wide ambient glow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Wall Surface Compatibility Table */}
        <section className="border-b border-white/10 bg-[#0e0e13] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Wall Surface Compatibility Matrix
              </h2>
              <p className="mt-4 text-sm text-[#a0a0b0] sm:text-base">
                Because the wall reflects the illumination, your background material dictates the ideal standoff distance and mounting specification.
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/15 bg-white/5 text-white">
                    <th className="py-3 px-4 font-semibold">Wall Surface</th>
                    <th className="py-3 px-4 font-semibold">Halo Reflection Behavior</th>
                    <th className="py-3 px-4 font-semibold">Recommended Standoff</th>
                    <th className="py-3 px-4 font-semibold">Mounting Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[#c0c0d0]">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Matte Drywall (White / Off-White)</td>
                    <td className="py-3 px-4">Broad, uniform dispersion with maximum soft glow.</td>
                    <td className="py-3 px-4">25 mm (1 in)</td>
                    <td className="py-3 px-4">Direct stud mount with concealed wiring.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Acoustic Slat Wood Panelling</td>
                    <td className="py-3 px-4">Warm reflection; vertical slats create subtle rhythmic shadows.</td>
                    <td className="py-3 px-4">25–35 mm</td>
                    <td className="py-3 px-4">Fastened into solid timber battens behind slats.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Dark Matte Walls (Charcoal / Navy)</td>
                    <td className="py-3 px-4">Tight, dramatic outline; background absorbs ambient wash.</td>
                    <td className="py-3 px-4">15–20 mm</td>
                    <td className="py-3 px-4">Use higher-lumen LEDs or contrasting backer plate.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Exposed Brick / Masonry</td>
                    <td className="py-3 px-4">Textured, rustic dispersion; deep joints create shadow lines.</td>
                    <td className="py-3 px-4">30–40 mm</td>
                    <td className="py-3 px-4">Anchored into mortar joints, or backer panel mount.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Gloss Paint, Glass or Polished Tile</td>
                    <td className="py-3 px-4">Specular reflection can reveal individual LED diode dots.</td>
                    <td className="py-3 px-4">N/A (Backer Required)</td>
                    <td className="py-3 px-4">Always specify a floating matte backer panel.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/guides/backlit-sign-wall-surfaces-and-standoffs"
                className="text-sm font-medium text-[#e0a23c] hover:underline"
              >
                Read the full technical guide to wall surfaces & standoffs →
              </Link>
            </div>
          </div>
        </section>

        {/* Architectural Finishes & Materials */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Precision Metal Finishes
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#a0a0b0]">
                Every backlit sign is fabricated in stainless steel, so the letters stay crisp on a façade or a reception wall alike.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-[#13131a] p-5">
                <div className="h-2 w-12 rounded-full bg-[#d4af37] mb-4" />
                <h3 className="text-base font-semibold text-white">Brushed Titanium Gold</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9595a5]">
                  PVD titanium coated for luxury boutique hotels, private clubs, and fine jewelry reception walls. Scratch and fingerprint resistant.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-5">
                <div className="h-2 w-12 rounded-full bg-[#202025] border border-white/20 mb-4" />
                <h3 className="text-base font-semibold text-white">Matte Black Powder Coat</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9595a5]">
                  Electrostatic powder coating offering an ultra-deep non-reflective finish. Perfect for modern industrial and tech headquarters.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-5">
                <div className="h-2 w-12 rounded-full bg-[#a8a8b2] mb-4" />
                <h3 className="text-base font-semibold text-white">Brushed Stainless Steel</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9595a5]">
                  Classic horizontal directional grain. The industry standard for corporate law firms, financial institutions, and medical suites.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-5">
                <div className="h-2 w-12 rounded-full bg-[#b87333] mb-4" />
                <h3 className="text-base font-semibold text-white">Champagne & Rose Bronze</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9595a5]">
                  Warm metallic undertones that complement Scandinavian timber, warm white 2700K lighting, and natural interior stone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="border-b border-white/10 bg-[#0e0e13] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Commercial Use Cases for Backlit Signs
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#a0a0b0]">
                Engineered for indoor executive interiors and high-end exterior architectural building facades.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Corporate Lobbies & Reception Walls</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a0a0b0]">
                    Create a commanding first impression for clients and investors. Backlit letters project an aura of stability, permanence, and sophisticated design. Pair with our silent remote-driver setup to ensure completely quiet operation in waiting areas.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/business-signs/backlit-lobby-signs"
                    className="text-sm font-semibold text-[#e0a23c] hover:underline"
                  >
                    Explore Backlit Lobby Signs Guide →
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Boutique Retail & Showroom Storefronts</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a0a0b0]">
                    Luxury fashion, bridal ateliers, and high-end retailers use backlit letters to establish distinct brand prestige without the harsh glare of generic plastic channel letters.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/business-signs/retail-storefronts"
                    className="text-sm font-semibold text-[#e0a23c] hover:underline"
                  >
                    View Retail Storefront Solutions →
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Salons, Spas & Aesthetic Clinics</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a0a0b0]">
                    Halo backlighting produces soft, diffused illumination that flatters skin tones and photographs cleanly on camera without lens flare, making it ideal for Instagrammable client check-in desks.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/business-signs/salon-spa-signs"
                    className="text-sm font-semibold text-[#e0a23c] hover:underline"
                  >
                    View Salon & Spa Signage →
                  </Link>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#13131a] p-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Restaurants, Bars & Private Clubs</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a0a0b0]">
                    In mood-lit dining rooms and cocktail lounges, backlit letters provide ambient illumination that integrates directly with dimmable architectural scene lighting.
                  </p>
                </div>
                <div className="mt-6">
                  <Link
                    href="/business-signs/restaurant-signs"
                    className="text-sm font-semibold text-[#e0a23c] hover:underline"
                  >
                    View Restaurant & Bar Signage →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Frequently Asked Questions About Backlit Signs
            </h2>

            <div className="mt-12 divide-y divide-white/10">
              {backlitFaqs.map((faq, index) => (
                <div key={index} className="py-6">
                  <h3 className="text-base font-semibold text-white sm:text-lg">
                    {faq.q}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a0a0b0] sm:text-base">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final Conversion CTA */}
        <section className="bg-gradient-to-t from-[#181820] to-[#0b0b0e] py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Preview Your Backlit Logo in Full Scale
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#a0a0b0]">
              Send your logo artwork and a straight-on photo of your wall. Our engineering team will create an accurate 2D digital mockup showing halo spread, standoff depth, and wire concealment options.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <CustomQuoteButton
                productName="custom backlit sign"
                label="Request Free Backlit Mockup"
                className="w-full sm:w-auto"
              />
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                Speak with a Sign Specialist
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
