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
  title: "Backlit Lobby Signs & Reception Wall Logos",
  description:
    "Custom 3D metal backlit lobby signs and illuminated reception wall logos for corporate offices. Lease-friendly mounting, silent drivers & free 2-hr mockup.",
  alternates: { canonical: "/business-signs/backlit-lobby-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Backlit Lobby Signs & Reception Wall Logos | The Glownique",
    description:
      "Commercial backlit lobby signs, floating metal letters, and halo-lit reception logos for corporate offices, law firms, and executive suites.",
    url: "/business-signs/backlit-lobby-signs",
    images: [{ url: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp", alt: "Custom Backlit Lobby Sign on Corporate Reception Wall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backlit Lobby Signs & Reception Wall Logos | The Glownique",
    description:
      "Handcrafted 3D halo-lit metal signage for corporate lobbies, reception desks, and executive offices.",
    images: ["/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp"],
  },
};

const lobbySignFaqs = [
  {
    q: "Can we install a backlit lobby sign in a leased commercial office without damaging the wall?",
    a: "Yes. For leased corporate spaces where running individual wires through drywall is restricted, we fabricate the letters onto an architectural backer panel (matte acrylic, brushed aluminum, or frosted glass). The entire sign unit hangs on only 2 to 4 heavy-duty wall anchors, requiring a single discreet electrical connection and leaving minimal patching work upon lease turnover.",
  },
  {
    q: "How loud are the LED power supplies in quiet office reception areas?",
    a: "Our commercial-grade 12V LED power supplies are solid-state and engineered for 100% silent operation with zero buzzing or electrical hum. For executive boardrooms and quiet waiting areas, we can also supply extra low-voltage lead wire so the transformer can be remotely mounted in an accessible utility closet or drop ceiling.",
  },
  {
    q: "How do we size a backlit logo sign relative to our reception desk?",
    a: "As a general design rule, the width of your reception sign should measure between 50% and 75% of the total width of the reception desk beneath it. For an 8-foot (96 in) desk, an overall sign span of 48 to 65 inches provides balanced visual anchoring without crowding the wall edges. When you submit a wall photo, our team scales the sign to your exact room dimensions.",
  },
  {
    q: "Do backlit lobby signs comply with ADA wall protrusion standards?",
    a: "Yes. ADA Standards for Accessible Design (§307.2) dictate that wall-mounted objects along circulation paths with leading edges between 27 inches and 80 inches above the finished floor must not protrude more than 4 inches from the wall. Our standard lobby letter returns measure 1.5 to 2.5 inches with a 0.75-inch (20mm) standoff, well within the 4-inch compliance threshold.",
  },
  {
    q: "Can a backlit lobby sign be dimmed when evening ambient lighting drops?",
    a: "Yes. All our lobby signs include a wireless RF dimmer and remote control that allows reception staff to adjust brightness smoothly from 1% to 100%, cycle between lighting presets, or connect to an automated timer or architectural smart-office lighting system.",
  },
];

export default function BacklitLobbySignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/backlit-lobby-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Custom Backlit Lobby Signs",
        description:
          "Custom 3D stainless steel halo-lit lobby signage and corporate reception logos engineered for executive offices, boardrooms, and commercial suites.",
        image: `${SITE_URL}/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp`,
        category: "Office & Reception Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Backlit Lobby Signs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: lobbySignFaqs.map((faq) => ({
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
        contentId="backlit-lobby-signs"
        contentName="Backlit Lobby Signs & Reception Wall Logos"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="backlit lobby signs" />

      <main id="main-content" className="bg-[#0b0b0e] text-[#f5f5f7]">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#181820] via-[#0f0f14] to-[#0b0b0e] pt-12 pb-20 sm:pt-20 sm:pb-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#e0a23c]">
                  Corporate Interior Signage
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Custom Backlit Lobby Signs & Reception Wall Logos
                </h1>

                {/* Direct Answer Block for AI Overviews */}
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-sm leading-relaxed text-[#c7c7d2] sm:text-base">
                    <strong className="text-white">What are backlit lobby signs?</strong> Backlit lobby signs are three-dimensional corporate brand marks fabricated from solid architectural metals (such as brushed stainless steel or titanium gold) with concealed rear LEDs. The letters project a gentle, non-glare halo glow onto the reception wall, providing an executive, commanding presence that establishes trust the moment clients enter.
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 text-xs text-[#a0a0b0]">
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">Lease-Friendly Mounting</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">Silent Solid-State Drivers</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">ADA Compliant Protrusion</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">5-Year Warranty</span>
                  <span className="rounded-md border border-white/10 bg-white/5 px-3 py-1">Free 2-Hour Digital Proof</span>
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CustomQuoteButton
                    productName="custom backlit lobby sign"
                    label="Request Lobby Sign Mockup"
                    className="w-full sm:w-auto"
                  />
                  <Link
                    href="/business-signs/backlit-signs"
                    className="text-center text-sm font-medium text-[#e0a23c] hover:underline"
                  >
                    View All Backlit Sign Styles →
                  </Link>
                </div>
              </div>

              <div className="relative lg:col-span-5">
                <div className="relative mx-auto aspect-square w-full max-w-[460px] overflow-hidden rounded-2xl border border-white/15 shadow-2xl shadow-black/60">
                  <Image
                    src="/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp"
                    alt="Corporate backlit lobby sign mounted behind a reception desk"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 460px"
                    className="object-cover"
                  />
                </div>
                <p className="mt-3 text-center text-xs text-[#808090]">
                  Backlit stainless steel reception logo with floating standoff mounting on architectural plaster.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Fit-Out Considerations */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Engineered for Corporate Reception & Office Walls
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#a0a0b0]">
                Commercial office fit-outs involve strict lease covenants, acoustic requirements, and accessibility rules. Our backlit lobby signs are engineered around four key commercial realities:
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <h3 className="text-lg font-semibold text-white">1. Lease-Friendly Mounting (Zero Wall Penalties)</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9595a5]">
                  Many commercial landlords prohibit dozens of holes drilled into drywall or marble cladding for individual letters. We offer pre-assembled floating architectural backer panels in smoked acrylic, brushed aluminum, or painted composite. The complete sign mounts with just 4 drywall studs and requires only one discrete electrical feed.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <h3 className="text-lg font-semibold text-white">2. 100% Silent Operation for Quiet Spaces</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9595a5]">
                  A quiet reception waiting area amplifies any humming power supply. We utilize solid-state low-voltage 12V transformers with passive heat sinks rather than noisy fans. Extended wire harnesses allow the power unit to be located up to 25 feet away in a server room or ceiling plenum.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <h3 className="text-lg font-semibold text-white">3. ADA Protrusion Standards (§307.2)</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9595a5]">
                  Building inspectors will flag signs in reception corridors that project too far into the walking path. By fabricating shallow letter returns (typically 1.5 inches) paired with 20mm precision standoffs, our entire assembly maintains a depth under 2.5 inches, fully complying with the 4-inch ADA corridor limit.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#13131a] p-6">
                <h3 className="text-lg font-semibold text-white">4. Tuned Optical White Temperatures</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#9595a5]">
                  A reception sign must harmonize with the ambient architectural lighting. We tune our halo LEDs to match your ceiling fixtures: 3000K Soft White for warm executive warmth, 4000K Neutral White for modern architectural stone, or 5000K Clean White for clinical medical and tech offices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lobby Sizing Guide Section */}
        <section className="border-b border-white/10 bg-[#0e0e13] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Reception Desk & Wall Sizing Recommendations
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#a0a0b0]">
                A common mistake in office design is specifying a sign that is too small for the wall. Use this dimensional guideline to anchor your reception area:
              </p>
            </div>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/15 bg-white/5 text-white">
                    <th className="py-3 px-4 font-semibold">Reception Desk Width</th>
                    <th className="py-3 px-4 font-semibold">Recommended Sign Width</th>
                    <th className="py-3 px-4 font-semibold">Viewing Distance</th>
                    <th className="py-3 px-4 font-semibold">Best Placement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[#c0c0d0]">
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Small Desk (4 to 5 ft)</td>
                    <td className="py-3 px-4">28 to 36 inches</td>
                    <td className="py-3 px-4">10 to 15 feet</td>
                    <td className="py-3 px-4">Directly centered behind receptionist eye level.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Standard Desk (6 to 8 ft)</td>
                    <td className="py-3 px-4">42 to 58 inches</td>
                    <td className="py-3 px-4">15 to 25 feet</td>
                    <td className="py-3 px-4">Centered 60 to 66 inches from finished floor.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Executive Desk (10 to 12 ft)</td>
                    <td className="py-3 px-4">60 to 84 inches</td>
                    <td className="py-3 px-4">25 to 40 feet</td>
                    <td className="py-3 px-4">Anchors open double-height or expansive lobbies.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-white">Feature Wall (No Desk)</td>
                    <td className="py-3 px-4">40% to 60% of wall span</td>
                    <td className="py-3 px-4">Full room depth</td>
                    <td className="py-3 px-4">Boardrooms, elevator lobbies, and client corridors.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="border-b border-white/10 py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Frequently Asked Questions: Backlit Lobby Signs
            </h2>

            <div className="mt-12 divide-y divide-white/10">
              {lobbySignFaqs.map((faq, index) => (
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

        {/* Conversion CTA */}
        <section className="bg-gradient-to-t from-[#181820] to-[#0b0b0e] py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Bring Your Corporate Identity to Life
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[#a0a0b0]">
              Send your logo file (AI, EPS, SVG or PDF) and a photo of your reception wall. We’ll generate a 1:1 scale architectural mockup with mounting specs and hardware recommendations within 2 hours.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <CustomQuoteButton
                productName="custom backlit lobby sign"
                label="Request Free Lobby Sign Mockup"
                className="w-full sm:w-auto"
              />
              <Link
                href="/business-signs/office-signs"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
              >
                View General Office Signs →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
