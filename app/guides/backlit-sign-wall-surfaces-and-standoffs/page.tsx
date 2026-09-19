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
  title: "Backlit Sign Wall Surfaces & Standoff Guide",
  description:
    "How wall finishes (plaster, wood slats, brick, tile) and standoff distance change halo illumination on backlit signs. Complete architectural mounting guide.",
  alternates: { canonical: "/guides/backlit-sign-wall-surfaces-and-standoffs" },
  openGraph: {
    type: "article",
    siteName: "The Glownique",
    title: "Backlit Sign Wall Surfaces & Standoff Guide | The Glownique",
    description:
      "Technical architectural guide explaining how wall materials, texture, paint sheen, and standoff depth control halo illumination on backlit signs.",
    url: "/guides/backlit-sign-wall-surfaces-and-standoffs",
    images: [{ url: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp", alt: "Backlit Sign Wall Surfaces and Standoffs Guide" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backlit Sign Wall Surfaces & Standoff Guide | The Glownique",
    description:
      "Architectural guide to wall materials, standoffs, and halo light dispersion for backlit business signs.",
    images: ["/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp"],
  },
};

const wallGuideFaqs = [
  {
    q: "Why does a high-gloss wall ruin the halo effect on a backlit sign?",
    a: "Gloss paint, polished tile, and glass cause specular (mirror-like) reflection instead of diffuse reflection. Rather than scattering light evenly into a soft glow, the glossy surface acts like a mirror, reflecting individual bright LED diode dots and exposed mounting hardware. The reliable architectural fix is to mount the letters on a floating matte backer panel first.",
  },
  {
    q: "What is the optimal standoff distance for backlit letters?",
    a: "For most indoor corporate reception signs with 8 to 16-inch letter heights, a 25mm (1 inch) standoff provides the ideal balance between halo width and letter stability. For smaller script lettering under 6 inches, a 15mm standoff prevents the halo from washing out the letter shapes. For large building letters over 24 inches, 35mm to 50mm standoffs create a dramatic wide gradient wash.",
  },
  {
    q: "Can backlit signs be mounted on dark or black walls?",
    a: "Yes, but dark matte surfaces (charcoal, navy, deep slate) absorb a significant portion of the reflected light. Instead of a wide glowing background wash, you get a tight, dramatic rim outline around each letter. This creates a moody, high-end look popular in bars, private dining clubs, and tech suites. If more glow is desired on a dark wall, we specify higher-output LEDs or a lighter accent backer.",
  },
  {
    q: "How do you mount a backlit sign on textured brick or stone?",
    a: "Rough masonry has mortar joints and irregular depths that can distort a halo. To mount directly, we use longer adjustable standoffs (30mm to 40mm) anchored directly into the mortar joints. Alternatively, mounting the letters to a floating aluminum or clear acrylic backer panel creates a flat optical surface that ensures a perfectly symmetrical halo regardless of the wall's texture.",
  },
];

export default function BacklitWallSurfacesGuidePage() {
  const pageUrl = `${SITE_URL}/guides/backlit-sign-wall-surfaces-and-standoffs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Backlit Sign Wall Surfaces & Standoff Distance Guide",
        description:
          "Architectural analysis of how wall reflectivity, surface textures, and standoff depths control halo light dispersion on backlit signs.",
        datePublished: "2026-09-15",
        dateModified: "2026-09-15",
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: "Backlit Wall Surfaces & Standoffs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: wallGuideFaqs.map((faq) => ({
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
      <MetaGuideView guideName="Backlit Sign Wall Surfaces & Standoffs" />
      <AnnouncementBar />
      <ProductTopBar productName="backlit signs guide" />

      <main id="main-content" className="bg-white text-[#282421]">
        {/* Header Section */}
        <section className="border-b border-[#dcd6ce] bg-gradient-to-b from-[#fbf8fa] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d97706]">
                Architectural Signage Specification Guide
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#282421] sm:text-4xl lg:text-5xl">
                How Wall Surfaces & Standoff Distance Change Backlit Signs
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#5a5462]">
                Backlit signage never directs light toward the viewer. The sign’s face remains opaque, while rear LEDs project onto the wall behind it. This means the wall is not just a backdrop—it is an active optical component of the sign.
              </p>
            </div>
          </div>
        </section>

        {/* Content Body */}
        <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Section 1: Optical Physics */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#282421]">
              The Optical Rule: Diffuse vs. Specular Reflection
            </h2>
            <p className="mt-4 leading-relaxed text-[#4a4452]">
              When light strikes a wall, it reflects in one of two ways depending on the microscopic texture of the surface:
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-[#e5dce2] bg-[#fbf8fa] p-5">
                <h3 className="font-semibold text-[#282421]">Diffuse Reflection (Matte Walls)</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  Light rays bounce off in all directions at microscopic angles, blending into a smooth, seamless cloud of illumination (the halo). This is the intended optical behavior for reverse channel letters.
                </p>
              </div>
              <div className="rounded-xl border border-[#e5dce2] bg-[#fbf8fa] p-5">
                <h3 className="font-semibold text-[#282421]">Specular Reflection (Gloss Walls)</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  Light rays bounce off at a uniform angle like a mirror. The viewer sees the individual LED diodes, wire splices, and mounting brackets reflected in the wall rather than a diffused glow.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Detailed Wall Types */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#282421]">
              How 5 Common Wall Finishes Behave Behind Backlit Letters
            </h2>

            <div className="mt-8 space-y-8">
              <div className="border-l-4 border-[#d97706] pl-5">
                <h3 className="text-lg font-bold text-[#282421]">1. Matte White & Off-White Drywall</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  <strong>The baseline standard:</strong> Light-colored flat or eggshell latex paint reflects approximately 75% to 85% of visible light with total diffusion. The halo spreads broadly and evenly around each letter. A 25mm standoff produces a smooth 2 to 3-inch halo gradient that frames corporate typography perfectly.
                </p>
              </div>

              <div className="border-l-4 border-[#d97706] pl-5">
                <h3 className="text-lg font-bold text-[#282421]">2. Wood Slat & Acoustic Felt Panelling</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  <strong>Contemporary trend:</strong> Natural oak, walnut, or ash slats absorb cool light but amplify 2700K–3000K warm white LEDs into an inviting, Scandinavian glow. Because the vertical slats create subtle drop shadows across the gaps, we recommend mounting on solid backing rails or aligning standoffs directly into the slat centers.
                </p>
              </div>

              <div className="border-l-4 border-[#d97706] pl-5">
                <h3 className="text-lg font-bold text-[#282421]">3. Dark Matte Paint (Charcoal, Navy & Black)</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  <strong>The moody silhouette:</strong> Dark paint absorbs 80%+ of the reflected light. Instead of a wide glow, the light hugs the perimeter of each letter, creating a crisp, architectural rim outline. This look is popular in speakeasies, private executive lounges, and modern retail. Use slightly shorter standoffs (15–20mm) to keep the rim sharp.
                </p>
              </div>

              <div className="border-l-4 border-[#d97706] pl-5">
                <h3 className="text-lg font-bold text-[#282421]">4. Exposed Brick & Rough Masonry</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  <strong>Textured industrial character:</strong> Brick surfaces scatter light unevenly, and deep mortar joints cast horizontal shadow bands through the halo. For authentic loft interiors, this adds organic character. To prevent heavy distortion, increase the standoff depth to 35mm–40mm so the light washes over the surface rather than bunching inside the crevices.
                </p>
              </div>

              <div className="border-l-4 border-[#d97706] pl-5">
                <h3 className="text-lg font-bold text-[#282421]">5. Polished Stone, Marble, Tile & High Gloss</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">
                  <strong>The critical failure mode:</strong> High-gloss tile, polished porcelain, and glass will expose diode hotspots. The solution is simple: never mount backlit letters directly to high-gloss walls. Instead, mount the letters to a floating matte acrylic or satin metal backer panel, which is then hung on the tile. The backer panel provides the required matte optical surface.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Standoff Distance Engineering */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#282421]">
              Standoff Distance Guide: 15mm vs. 25mm vs. 40mm
            </h2>
            <p className="mt-4 leading-relaxed text-[#5a5462]">
              The distance between the back of the letter and the wall face directly dictates halo spread and contrast ratio:
            </p>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[540px] border-collapse border border-[#e5dce2] text-left text-sm">
                <thead>
                  <tr className="bg-[#fbf8fa] text-[#282421]">
                    <th className="border border-[#e5dce2] py-3 px-4 font-semibold">Standoff Depth</th>
                    <th className="border border-[#e5dce2] py-3 px-4 font-semibold">Halo Character</th>
                    <th className="border border-[#e5dce2] py-3 px-4 font-semibold">Best Letter Sizes</th>
                    <th className="border border-[#e5dce2] py-3 px-4 font-semibold">Recommended Environment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e5dce2] text-[#4a4452]">
                  <tr>
                    <td className="border border-[#e5dce2] py-3 px-4 font-medium">15 mm (0.6 in)</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Tight, concentrated rim glow; maximum letter contrast.</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Small letters (4 to 10 in)</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Intimate corridors, small meeting rooms, dark walls.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5dce2] py-3 px-4 font-medium">25 mm (1.0 in)</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Standard architectural halo wash; 2–3 inch soft spread.</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Medium letters (10 to 20 in)</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Corporate reception desks, conference rooms, retail.</td>
                  </tr>
                  <tr>
                    <td className="border border-[#e5dce2] py-3 px-4 font-medium">40 mm (1.6 in)</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Wide, diffuse atmospheric illumination with soft edges.</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Large letters (20 to 48 in+)</td>
                    <td className="border border-[#e5dce2] py-3 px-4">Double-height atriums, exterior building facades, brick.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: FAQs */}
          <section className="mb-14 border-t border-[#dcd6ce] pt-12">
            <h2 className="text-2xl font-bold text-[#282421]">
              Frequently Asked Technical Questions
            </h2>
            <div className="mt-6 divide-y divide-[#e5dce2]">
              {wallGuideFaqs.map((faq, index) => (
                <div key={index} className="py-5">
                  <h3 className="font-semibold text-[#282421]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5a5462]">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Links & Next Steps */}
          <section className="rounded-xl border border-[#dcd6ce] bg-[#fbf8fa] p-8 text-center">
            <h2 className="text-xl font-bold text-[#282421]">
              Ready to Specify Your Backlit Business Sign?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5a5462]">
              Explore our commercial product line or request a free digital mockup showing the exact halo behavior on your wall photo.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/business-signs/backlit-signs"
                className="rounded-lg bg-[#282421] px-5 py-2.5 text-sm font-semibold text-white hover:bg-black"
              >
                Explore Custom Backlit Signs
              </Link>
              <Link
                href="/business-signs/backlit-lobby-signs"
                className="rounded-lg border border-[#d5cbd0] bg-white px-5 py-2.5 text-sm font-semibold text-[#282421] hover:bg-[#f2ecef]"
              >
                Backlit Lobby Signs Guide
              </Link>
              <CustomQuoteButton
                productName="backlit wall sign mockup"
                label="Request Free Wall Mockup"
              />
            </div>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
