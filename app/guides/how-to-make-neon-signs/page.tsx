import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { MetaGuideView } from "@/components/analytics/meta-view-trackers";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "How to Make Neon Signs: Glass vs LED",
  description:
    "Learn how custom neon signs are made. We compare traditional glass blowing techniques against the modern, shatterproof LED silicone manufacturing process.",
  alternates: { canonical: "/guides/how-to-make-neon-signs" },
  openGraph: {
    type: "article",
    siteName: "The Glownique",
    title: "How to Make Neon Signs: Glass vs LED | The Glownique",
    description:
      "Understand the manufacturing process behind commercial custom neon signs — from vintage glass blowing and gas filling to precision LED silicone and laser-cut acrylic.",
    url: "/guides/how-to-make-neon-signs",
    images: [{ url: "/hero/neon-sign-hero.webp", alt: "How to Make Neon Signs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Make Neon Signs: Glass vs LED | The Glownique",
    description:
      "Understand the manufacturing process behind commercial custom neon signs — from vintage glass blowing and gas filling to precision LED silicone and laser-cut acrylic.",
    images: ["/hero/neon-sign-hero.webp"],
  },
};

const guideFaqs = [
  {
    q: "Can I make my own neon sign at home?",
    a: "While DIY hobby kits with basic electroluminescent (EL) wire exist, building a commercial-grade LED neon sign requires industrial tools. Professional manufacturing involves laser-cutting optical acrylic, precision micro-soldering 12V LED strips, and accurately seating silicone diffuser tubing for a flawless, bright glow.",
  },
  {
    q: "What are modern LED neon signs made of?",
    a: "Modern LED neon signs consist of three main components: a laser-cut optical-grade cast acrylic backboard, high-density LED light strips, and flexible, shatterproof silicone tubing that diffuses the light to recreate the classic neon glow.",
  },
  {
    q: "How long does it take to make a custom neon sign?",
    a: "At The Glownique, the manufacturing process—from vector-mapping the digital design, laser-cutting the acrylic, hand-shaping the silicone tubing, soldering the electronics, and performing a 24-hour burn-in quality test—typically takes 10 to 15 days before dispatch.",
  },
  {
    q: "Why are businesses switching from glass to LED neon?",
    a: "LED silicone neon operates on a safe, low-voltage 12V system rather than the 3,000–15,000V required for glass neon. This makes LED neon far safer for public spaces. It also consumes up to 80% less electricity, contains no toxic mercury, and is completely shatterproof.",
  },
];

export default function HowToMakeNeonSignsGuidePage() {
  const pageUrl = `${SITE_URL}/guides/how-to-make-neon-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "How to Make Neon Signs: Glass vs LED Manufacturing",
        description:
          "Detailed guide explaining how traditional glass neon signs and modern LED silicone neon signs are manufactured.",
        datePublished: "2026-09-24",
        dateModified: "2026-09-24",
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: "How to Make Neon Signs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guideFaqs.map((faq) => ({
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
      <MetaGuideView guideName="How to Make Neon Signs" />
      <AnnouncementBar />
      <ProductTopBar productName="manufacturing guide" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/guides" className="hover:underline">Guides</Link> &gt;{" "}
              <span className="text-[#ce0754]">How to Make Neon Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Manufacturing &amp; Technology Guide
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              How to Make Neon Signs: Glass vs LED
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Understanding the craftsmanship behind illuminated signage. We break down the evolution from traditional vintage glass blowing to the safety and precision of modern LED silicone flex.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <article className="prose prose-pink max-w-none text-[#1e1a22]">
              
              <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                The Evolution of Neon Sign Manufacturing
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                Since its invention in the early 20th century, the neon sign has been an iconic staple of commercial advertising and interior design. However, the exact answer to "how to make neon signs" depends entirely on which generation of technology you are talking about.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                Today, the industry is split between two entirely different manufacturing disciplines: the century-old art of glass blowing, and the modern precision-engineering of LED silicone flex.
              </p>

              <div className="my-12">
                <h3 className="text-2xl font-extrabold text-[#1e1a22]">
                  How Traditional Glass Neon Signs Are Made
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                  Traditional glass neon is a highly specialized craft that requires years of apprenticeship to master. The process revolves around heat, noble gases, and high-voltage electricity.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[#5e5862] list-disc list-outside ml-5">
                  <li><strong>Bending the Glass:</strong> A craftsperson heats hollow glass tubes over an open flame burner until the glass softens. Using a traced pattern underneath, they rapidly bend the tube by hand. Because glass cools quickly, this step requires extreme speed and muscle memory.</li>
                  <li><strong>Splicing and Electrodes:</strong> Once the letters are shaped, electrodes are fused to each end of the tube.</li>
                  <li><strong>Bombarding and Gas Filling:</strong> The tube is connected to a vacuum pump to remove all air and impurities. It is then injected with a noble gas (Neon for a red glow, Argon mixed with a drop of mercury for blue/other colors).</li>
                  <li><strong>High-Voltage Aging:</strong> Finally, a high-voltage transformer (operating between 3,000V and 15,000V) is attached to ignite the gas and "burn in" the tube, stabilizing the glow.</li>
                </ul>
              </div>

              <div className="my-12">
                <h3 className="text-2xl font-extrabold text-[#1e1a22]">
                  How Modern LED Neon Signs Are Made
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#5e5862]">
                  Modern LED neon eliminates the dangers of toxic gases, high-voltage currents, and fragile glass. Instead, the process relies on precise digital mapping, laser-cutting, and micro-electronics to produce a brighter, safer, and more energy-efficient sign.
                </p>
                
                <div className="my-8 rounded-2xl bg-[#faf7f8] p-6 border border-[#eadfe4]">
                  <h4 className="font-extrabold text-[#1e1a22] text-lg mb-4">The 4-Step Manufacturing Process:</h4>
                  <ol className="space-y-4 text-sm text-[#5e5862] list-decimal list-outside ml-5">
                    <li>
                      <strong>Vector Path Mapping:</strong> We begin by taking your brand logo or font and digitizing it into a continuous vector path. Our engineers calculate exactly where the LED strips will curve and join, optimizing the layout to hide wiring.
                    </li>
                    <li>
                      <strong>Laser-Cutting the Acrylic Backboard:</strong> Unlike glass neon which is often supported by heavy metal frames, LED neon is seated in an optical-grade cast acrylic backboard. A CNC laser cuts the acrylic exactly to the shape of your design, and routes out shallow tracks for the LED strip to sit in.
                    </li>
                    <li>
                      <strong>Soldering & Wiring:</strong> High-density, 12V LED strips are seated into the routed acrylic tracks. Technicians hand-solder the joints between letters and words using ultra-thin, transparent cabling to ensure the connections are invisible when the sign is lit.
                    </li>
                    <li>
                      <strong>Sealing the Silicone Flex:</strong> Finally, a thick, flexible silicone tubing is pressed over the LED strips. This silicone acts as a diffuser, scattering the pinpoint lights of the LEDs into a solid, continuous glow identical to traditional glass. For exterior business signs, the silicone is sealed to an IP67 waterproof rating.
                    </li>
                  </ol>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-[#1e1a22] mt-12 mb-6">
                Why the Industry Shifted to LED
              </h3>
              <div className="overflow-hidden rounded-2xl border border-[#eadfe4] bg-white shadow-sm">
                <table className="w-full text-left text-sm text-[#1e1a22]">
                  <thead className="bg-[#faf7f8] text-xs font-extrabold uppercase text-[#1e1a22]">
                    <tr>
                      <th className="p-4 border-b border-[#eadfe4]">Feature</th>
                      <th className="p-4 border-b border-[#eadfe4]">Glass Neon</th>
                      <th className="p-4 border-b border-[#eadfe4]">LED Silicone Neon</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eadfe4]">
                    <tr>
                      <td className="p-4 font-bold text-[#ce0754]">Durability</td>
                      <td className="p-4 text-[#5e5862]">Extremely fragile; easily broken during shipping.</td>
                      <td className="p-4 text-[#5e5862]">Shatterproof silicone and cast acrylic.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-[#ce0754]">Power &amp; Safety</td>
                      <td className="p-4 text-[#5e5862]">Runs at 3,000V–15,000V. Gets warm to the touch.</td>
                      <td className="p-4 text-[#5e5862]">Safe 12V low-voltage. Completely cool to touch.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-[#ce0754]">Energy Efficiency</td>
                      <td className="p-4 text-[#5e5862]">High power consumption.</td>
                      <td className="p-4 text-[#5e5862]">Up to 80% more energy efficient.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-[#ce0754]">Design Limits</td>
                      <td className="p-4 text-[#5e5862]">Cannot accurately replicate tight corners or complex logos.</td>
                      <td className="p-4 text-[#5e5862]">Laser precision allows exact replication of brand fonts.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* FAQs Section */}
              <div className="mt-16">
                <h3 className="text-2xl font-extrabold text-[#1e1a22] mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {guideFaqs.map((faq) => (
                    <div key={faq.q} className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6">
                      <h4 className="text-base font-extrabold text-[#1e1a22]">{faq.q}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12 rounded-3xl border border-[#eadfe4] bg-[#fff0f5] p-8 text-center">
                <h3 className="text-2xl font-extrabold text-[#1e1a22]">
                  Ready to See Your Logo in LED Neon?
                </h3>
                <p className="mt-2 text-sm text-[#5e5862]">
                  We use precision laser-cutting and premium silicone to perfectly match your brand. Get a free digital mockup of your custom sign today.
                </p>
                <div className="mt-6">
                  <CustomQuoteButton
                    className="button button--whatsapp text-base px-8 py-3.5"
                    label="Request Free Digital Mockup"
                    productName="custom led neon sign"
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
