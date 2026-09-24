import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MetaGuideView } from "@/components/analytics/meta-view-trackers";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/**
 * Front-lit vs halo-lit vs dual-lit channel letters.
 *
 * The one comparison page for a cluster that the 2026-09-24 SERP study found
 * the most winnable on the site: "front lit vs halo lit", "halo lit vs
 * backlit" and "what is a dual lit sign" all resolve here rather than to three
 * thin pages. AI Overviews on those queries rebuild a comparison table and
 * warn about walls; none of the competing pages cited a primary source.
 *
 * Every technical statement below comes from the cited sources in SOURCES, or
 * from The Glownique's own product specification. Nothing here states a price,
 * a lead time, a listing or a rating for The Glownique's own signs.
 */

const UPDATED = "2026-09-24";
const UPDATED_LABEL = "24 September 2026";

export const metadata: Metadata = {
  title: "Front-Lit vs Halo-Lit vs Dual-Lit Letters",
  description:
    "How front-lit, halo-lit (reverse-lit) and dual-lit channel letters differ: light direction, what the wall needs, viewing distance, letter height and mounting.",
  alternates: { canonical: "/guides/front-lit-vs-halo-lit-vs-dual-lit" },
  openGraph: {
    type: "article",
    siteName: "The Glownique",
    title: "Front-Lit vs Halo-Lit vs Dual-Lit Letters | The Glownique",
    description:
      "Front-lit, halo-lit and dual-lit channel letters compared — with the letter-height rule sign engineers use and what your installer needs.",
    url: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    images: [
      {
        url: "/3d-metallic-neon-sign/duallit/2.webp",
        alt: "Dual-lit 3D metal channel letters with glowing faces and a halo on the wall behind",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Front-Lit vs Halo-Lit vs Dual-Lit Letters | The Glownique",
    description:
      "Front-lit, halo-lit and dual-lit channel letters compared — with the letter-height rule sign engineers use and what your installer needs.",
    images: ["/3d-metallic-neon-sign/duallit/2.webp"],
  },
};

type Source = { id: string; title: string; publisher: string; url: string };

const SOURCES: readonly Source[] = [
  { id: "ussc-rules", title: "Sign Legibility Rules of Thumb", publisher: "United States Sign Council (2006)", url: "https://files.secure.website/wscfus/7691102/uploads/USSC_Sign_Legibility_Rules_of_Thumb.pdf" },
  { id: "ussc-standards", title: "Best Practice Standards for On-Premise Signs", publisher: "USSC Foundation (2018)", url: "https://usscfoundation.org/wp-content/uploads/2018/03/USSC-Guideline-Standards-for-On-Premise-Signs-2018.pdf" },
  { id: "gp-halo", title: "Hello Halo: A Deeper Look at Halo-Lit Channel Letters", publisher: "GRAPHICS PRO (2019)", url: "https://graphics-pro.com/feature/hello-halo-a-deeper-look-at-halo-lit-channel-letters/" },
  { id: "gp-raceway", title: "Behind the Letter: Raceways' Roles in Channel Letter Projects", publisher: "GRAPHICS PRO (2020)", url: "https://graphics-pro.com/feature/behind-the-letter-raceways-roles-in-channel-letter-projects/" },
  { id: "gemini-letters", title: "What are Channel Letters?", publisher: "Gemini Product Guide", url: "https://hub.geminimade.com/knowledge/channel-letters-vs-fabricated-metal-letters" },
  { id: "gemini-halo", title: "Lit Fabricated Metal Halo Lit: Specifications, Mounting, and Installation", publisher: "Gemini Product Guide", url: "https://hub.geminimade.com/knowledge/fabricated-metal-halo-lit-product-specifications" },
  { id: "gemini-mounting", title: "Mounting Hardware: The Foundation Behind Every Sign", publisher: "Gemini Product Guide", url: "https://hub.geminimade.com/knowledge/mounting-hardware-the-foundation-behind-every-sign" },
  { id: "landlord-criteria", title: "Exhibit B: General Sign Criteria for Shopping Center", publisher: "Vestar (example landlord sign criteria)", url: "https://vestartenantservices.com/wp-content/uploads/2021/01/Sign-Approval-Criteria.pdf" },
  { id: "isa-ul48", title: "UL 48 Standard for Electric Signs", publisher: "International Sign Association", url: "https://signs.org/codes-regulations/technical-codes-and-standards/ul-48-standard-for-electric-signs/" },
  { id: "isa-nec", title: "Guidelines for Application of NEC Changes in Electric Sign Requirements", publisher: "International Sign Association", url: "http://nxt-live-books.s3.amazonaws.com/pub/nxtbooks/csg/isa_2011nec_guidelines/offline/csg_isa_2011nec_guidelines.pdf" },
  { id: "ul-signs-guide", title: "Listed Signs: Identifying UL Certification and Proper Use", publisher: "UL", url: "https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/UL-TCAEC-2014-Fall-v3.pdf" },
];

const COMPARISON: readonly { label: string; front: string; halo: string; dual: string }[] = [
  {
    label: "Where the light goes",
    front: "Forward, through a translucent acrylic face",
    halo: "Backward, out of the letter's back onto the wall",
    dual: "Both: through the face and onto the wall",
  },
  {
    label: "Letter face",
    front: "Translucent, carries the colour",
    halo: "Solid metal — the letter reads as a silhouette",
    dual: "Translucent face on a letter that also throws a halo",
  },
  {
    label: "What you read after dark",
    front: "The glowing letters themselves",
    halo: "The dark letter shapes against a ring of light",
    dual: "Glowing letters with depth behind them",
  },
  {
    label: "Reading from a distance",
    front: "The strongest of the three",
    halo: "Weaker; best where viewers are close",
    dual: "Strong, from the lit face",
  },
  {
    label: "What the wall needs",
    front: "Nothing — the wall plays no part",
    halo: "A light, matte, fairly smooth surface",
    dual: "Helps, but the face still reads on any wall",
  },
  {
    label: "Mounting",
    front: "Flush, raceway or backer panel",
    halo: "Standoffs, so light can reach the wall",
    dual: "Standoffs",
  },
  {
    label: "Build complexity",
    front: "Usually the simplest of the three",
    halo: "Adds standoffs and depends on the wall",
    dual: "The most involved: two lighting runs",
  },
  {
    label: "Typical setting",
    front: "Storefronts and façades read from the street",
    halo: "Receptions, lobbies, boutiques, interiors",
    dual: "Flagship frontages and feature walls",
  },
];

const FAQS: readonly { q: string; a: string }[] = [
  {
    q: "Which channel letter lighting is most visible from the road?",
    a: "Front-lit. The whole face of each letter glows, so the letters themselves stay legible from further away and through a windscreen. Dual-lit reads just as well from a distance, because it also has a lit face. Halo-lit letters are read as dark shapes against a ring of light, which works best when viewers are close.",
  },
  {
    q: "Is backlit the same as halo-lit?",
    a: "For channel letters, usually yes: sign makers use halo-lit, reverse-lit and back-lit for letters that throw their light onto the wall behind them. For lightboxes and posters, though, backlit means light passing through a translucent graphic from behind. When a quote says backlit, check which of the two is meant.",
  },
  {
    q: "Do halo-lit letters work on dark or textured walls?",
    a: "Less well. A halo is light reflected off the wall, so a dark, glossy or rough surface — or a steep viewing angle — weakens it and the letters lose definition. Sign trade guidance suggests a light, matte background, a contrasting backer panel, or dual-lit letters when the wall cannot be changed.",
  },
  {
    q: "How far from the wall should halo-lit letters sit?",
    a: "Close, but not flush. One metal-letter maker's default standoff is about 1.5 inches. Too far and the halo blurs; too close and the light has no room to spread. The right distance depends on the letter's depth and the wall, so it is set for the design rather than guessed.",
  },
  {
    q: "Can the face and the halo be different colours?",
    a: "Yes, on dual-lit letters. A baffle inside the channel separates the two light paths, so a white face can sit over a coloured halo, or a brand-colour face over a warm-white glow.",
  },
  {
    q: "How big should channel letters be?",
    a: "The US Sign Council's average rule is one inch of capital-letter height for every 30 feet of viewing distance, so 10-inch letters read at about 300 feet. Letters on a wall parallel to the road need to be roughly three times larger, because drivers see them at a steep angle.",
  },
];

function Cite({ id }: { id: string }) {
  const index = SOURCES.findIndex((source) => source.id === id);
  return (
    <sup className="ml-0.5 text-[0.7em] font-bold">
      <a href={`#source-${id}`} className="text-[#ce0754] no-underline hover:underline" aria-label={`Source ${index + 1}`}>
        [{index + 1}]
      </a>
    </sup>
  );
}

export default function LightingComparisonGuidePage() {
  const pageUrl = `${SITE_URL}/guides/front-lit-vs-halo-lit-vs-dual-lit`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: "Front-Lit vs Halo-Lit vs Dual-Lit Channel Letters",
        description:
          "How front-lit, halo-lit (reverse-lit) and dual-lit channel letters differ, what the wall needs, how big the letters should be and how they are mounted.",
        datePublished: "2026-08-11",
        dateModified: UPDATED,
        image: `${SITE_URL}/3d-metallic-neon-sign/duallit/2.webp`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: pageUrl,
        about: ["Channel letter", "Halo-lit sign", "Front-lit sign", "Dual-lit sign"],
        citation: SOURCES.map((source) => source.url),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: "Front-Lit vs Halo-Lit vs Dual-Lit", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
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
      <MetaGuideView guideName="Front-Lit vs Halo-Lit vs Dual-Lit Letters" />
      <AnnouncementBar />
      <ProductTopBar productName="channel letter guide" />
      <main id="main-content" className="bg-white">
        {/* ── Hero: the answer first ─────────────────────────────── */}
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-14 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/guides" className="hover:underline">Guides</Link> &gt;{" "}
              <span className="text-[#ce0754]" aria-current="page">Channel Letter Lighting</span>
            </nav>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Channel letter lighting guide
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Front-Lit vs. Halo-Lit vs. Dual-Lit Channel Letters
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#1e1a22]">
              <strong>Front-lit</strong> channel letters glow through a translucent face and read best
              from a distance. <strong>Halo-lit</strong> (reverse-lit) letters have solid faces and throw
              light onto the wall behind them, so you read their silhouette. <strong>Dual-lit</strong>{" "}
              letters do both. Choose by how far away people read the sign, whether the wall behind it
              helps or hurts, and the look your brand needs.
            </p>
            <p className="mt-4 text-xs font-semibold text-[#5e5862]">
              Last reviewed {UPDATED_LABEL} · Sources listed at the end of the page
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          {/* ── At a glance ───────────────────────────────────────── */}
          <section aria-labelledby="at-a-glance">
            <h2 id="at-a-glance" className="text-3xl font-extrabold text-[#1e1a22]">
              Front-lit, halo-lit and dual-lit at a glance
            </h2>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-[#eadfe4] shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm text-[#1e1a22]">
                <caption className="sr-only">
                  Comparison of front-lit, halo-lit and dual-lit channel letters
                </caption>
                <thead className="bg-[#faf7f8] text-xs font-extrabold uppercase tracking-wide">
                  <tr>
                    <th scope="col" className="border-b border-[#eadfe4] p-4"><span className="sr-only">Feature</span></th>
                    <th scope="col" className="border-b border-[#eadfe4] p-4">Front-lit</th>
                    <th scope="col" className="border-b border-[#eadfe4] p-4">Halo-lit (reverse-lit)</th>
                    <th scope="col" className="border-b border-[#eadfe4] p-4">Dual-lit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eadfe4]">
                  {COMPARISON.map((row) => (
                    <tr key={row.label} className="align-top">
                      <th scope="row" className="bg-[#fdfafb] p-4 font-bold">{row.label}</th>
                      <td className="p-4 text-[#5e5862]">{row.front}</td>
                      <td className="p-4 text-[#5e5862]">{row.halo}</td>
                      <td className="p-4 text-[#5e5862]">{row.dual}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── Front-lit ─────────────────────────────────────────── */}
          <section aria-labelledby="front-lit" className="mt-16 grid gap-8 md:grid-cols-[1fr_280px] md:items-start">
            <div>
              <h2 id="front-lit" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
                What is a front-lit channel letter?
              </h2>
              <p className="mt-4 leading-relaxed text-[#5e5862]">
                A front-lit (face-lit) channel letter is a hollow letter with metal sides — the
                &ldquo;returns&rdquo; — and a translucent acrylic face. LED modules inside light the face
                from behind, so the letter itself glows toward the street.<Cite id="gemini-letters" /> Sign
                makers often call it the standard channel letter.
              </p>
              <p className="mt-4 leading-relaxed text-[#5e5862]">
                Because the light comes straight at the viewer, front-lit letters are the most legible of
                the three at a distance and in daylight, and the face can carry your brand colour. The wall
                behind them plays no part, so they work on brick, render, cladding or glass. Choose
                front-lit for a shopfront read from across the street or from passing traffic.
              </p>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-[#eadfe4] bg-[#0b0910]">
              <Image
                src="/3d-metallic-neon-sign/frontlit/image.webp"
                alt="Front-lit 3D metal channel letters spelling Food Opera, the script faces glowing orange"
                width={736}
                height={981}
                sizes="(max-width: 768px) 100vw, 280px"
                className="h-auto w-full"
              />
              <figcaption className="bg-white p-3 text-xs text-[#5e5862]">
                Front-lit: the letter faces glow.
              </figcaption>
            </figure>
          </section>

          {/* ── Halo-lit ──────────────────────────────────────────── */}
          <section aria-labelledby="halo-lit" className="mt-16">
            <h2 id="halo-lit" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              What is a halo-lit (reverse-lit) channel letter?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              A halo-lit letter has a solid face — usually metal — and a clear or open back. The LEDs
              inside shine backwards, onto the wall, and the letter is mounted on standoffs so the light
              has room to spread. What you see after dark is the letter&apos;s dark shape outlined by a
              ring of light.<Cite id="gemini-letters" /><Cite id="gp-halo" />
            </p>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              Distance from the wall matters. One fabricated-metal letter maker uses about 1.5 inches as
              its default standoff; too far and the halo blurs, too close and the light has nowhere to
              go.<Cite id="gemini-halo" /><Cite id="gp-halo" /> The wall matters just as much: a halo is
              reflected light, so a dark, glossy or heavily textured surface — or a steep viewing angle —
              weakens it and the letters lose definition.<Cite id="gp-halo" /> Our{" "}
              <Link href="/guides/backlit-sign-wall-surfaces-and-standoffs" className="font-bold text-[#ce0754] hover:underline">
                wall surfaces and standoffs guide
              </Link>{" "}
              covers how plaster, wood, brick and tile each change the effect.
            </p>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              Halo-lit reads as considered rather than loud, which is why it is the usual choice for
              reception walls, lobbies and boutiques where people see the sign from a few metres away.
              See our{" "}
              <Link href="/business-signs/backlit-signs" className="font-bold text-[#ce0754] hover:underline">
                backlit and halo-lit signs
              </Link>{" "}
              for finishes and examples.
            </p>
          </section>

          {/* ── Terminology ───────────────────────────────────────── */}
          <section aria-labelledby="backlit-same" className="mt-16 rounded-3xl border border-[#eadfe4] bg-[#fdf7f9] p-6 sm:p-8">
            <h2 id="backlit-same" className="text-2xl font-extrabold text-[#1e1a22]">
              Is backlit the same as halo-lit?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              For channel letters, usually yes. Letter manufacturers and trade magazines use halo-lit,
              reverse-lit and back-lit for the same thing: a letter that throws its light onto the wall
              behind it.<Cite id="gemini-letters" /><Cite id="gp-halo" /> For lightboxes and posters,
              &ldquo;backlit&rdquo; means something else — light passing through a translucent graphic from
              behind. The US Sign Council avoids the ambiguity altogether with &ldquo;internal&rdquo;,
              &ldquo;external&rdquo; and &ldquo;exposed&rdquo; illumination.<Cite id="ussc-standards" />
            </p>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              On this site, <strong>halo-lit</strong> always means letters that glow onto the wall, and a{" "}
              <Link href="/business-signs/lightbox-signs" className="font-bold text-[#ce0754] hover:underline">
                backlit lightbox
              </Link>{" "}
              means a panel lit through its face. If a quote from anyone just says &ldquo;backlit&rdquo;,
              ask which one is meant.
            </p>
          </section>

          {/* ── Dual-lit ──────────────────────────────────────────── */}
          <section aria-labelledby="dual-lit" className="mt-16 grid gap-8 md:grid-cols-[1fr_280px] md:items-start">
            <div>
              <h2 id="dual-lit" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
                What is a dual-lit channel letter?
              </h2>
              <p className="mt-4 leading-relaxed text-[#5e5862]">
                A dual-lit letter — also called combination-lit — has a lit face and a halo: the face reads
                from a distance, and the glow on the wall adds depth.<Cite id="gemini-letters" /> A baffle
                inside the channel can separate the two light paths, so the face and the halo can run
                different colours.
              </p>
              <p className="mt-4 leading-relaxed text-[#5e5862]">
                Dual-lit is also the practical answer when you want a halo on a wall that will not hold
                one well — dark cladding, glossy tile or rough stone — because the face stays legible
                whatever the wall does.<Cite id="gp-halo" /> It is the most involved of the three to build,
                with two lighting runs in every letter.
              </p>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-[#eadfe4] bg-[#0b0910]">
              <Image
                src="/3d-metallic-neon-sign/duallit/2.webp"
                alt="Dual-lit 3D metal letters spelling AMERICA, with glowing white faces and a halo behind"
                width={1086}
                height={1448}
                sizes="(max-width: 768px) 100vw, 280px"
                className="h-auto w-full"
              />
              <figcaption className="bg-white p-3 text-xs text-[#5e5862]">
                Dual-lit: a lit face and a halo on the wall.
              </figcaption>
            </figure>
          </section>

          {/* ── Decision ──────────────────────────────────────────── */}
          <section aria-labelledby="choose" className="mt-16">
            <h2 id="choose" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              Which lighting style should you choose?
            </h2>
            <ul className="mt-6 space-y-4">
              {[
                ["The sign is read from the street or from passing cars", "Front-lit, or dual-lit if you also want depth."],
                ["The sign is on a reception wall, in a lobby or a boutique", "Halo-lit — people are close, and the silhouette reads as premium."],
                ["The wall is dark, glossy or rough", "Front-lit or dual-lit, or add a lighter backer panel behind halo letters."],
                ["The face must carry a strong brand colour", "Front-lit or dual-lit; a halo-lit face is solid metal."],
                ["You are in a shopping centre or a leased unit", "Read the landlord's sign criteria first: some require raceway mounting in a colour that matches the fascia."],
              ].map(([when, then]) => (
                <li key={when} className="rounded-2xl border border-[#eadfe4] bg-white p-5">
                  <p className="font-bold text-[#1e1a22]">{when}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5e5862]">{then}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Letter height ─────────────────────────────────────── */}
          <section aria-labelledby="letter-height" className="mt-16">
            <h2 id="letter-height" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              How big should channel letters be?
            </h2>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              The US Sign Council measures legibility as a <strong>Legibility Index</strong>: feet of viewing
              distance per inch of capital-letter height. Its average is <strong>30</strong> — so 1-inch
              letters read at about 30 feet and 10-inch letters at about 300 feet — and text set in all capitals
              needs letters about 15% taller.<Cite id="ussc-rules" /><Cite id="ussc-standards" />
            </p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-[#eadfe4]">
              <table className="w-full min-w-[420px] text-left text-sm">
                <caption className="sr-only">Letter height and approximate viewing distance at a Legibility Index of 30</caption>
                <thead className="bg-[#faf7f8] text-xs font-extrabold uppercase tracking-wide text-[#1e1a22]">
                  <tr>
                    <th scope="col" className="p-4">Capital-letter height</th>
                    <th scope="col" className="p-4">Readable to about (sign facing the viewer)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eadfe4] text-[#5e5862]">
                  {[
                    ["6 in", "180 ft"],
                    ["8 in", "240 ft"],
                    ["12 in", "360 ft"],
                    ["18 in", "540 ft"],
                    ["24 in", "720 ft"],
                  ].map(([height, distance]) => (
                    <tr key={height}>
                      <td className="p-4 font-bold text-[#1e1a22]">{height}</td>
                      <td className="p-4">{distance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-[#5e5862]">
              Distances are the Legibility Index of 30 multiplied by letter height; typeface, contrast and
              lighting move the real figure either way.<Cite id="ussc-rules" />
            </p>
            <p className="mt-6 leading-relaxed text-[#5e5862]">
              A wall sign that runs <strong>parallel to the road</strong> — the usual shopfront fascia — needs
              roughly <strong>three times</strong> the letter height, because drivers see it at a steep angle.
              The Council&apos;s rule of thumb for those signs is: letter height in inches = (number of traffic
              lanes × 10 + the setback from the curb in feet) ÷ 5. Two lanes and a 20-foot setback gives
              8-inch letters. In the Council&apos;s field study, drivers missed 30% of parallel signs even when
              they were two to three times larger.<Cite id="ussc-standards" />
            </p>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              We could not trace the popular &ldquo;one inch per ten feet&rdquo; charts to primary research;
              the Council&apos;s own figure for signs facing traffic is thirty.
            </p>
          </section>

          {/* ── Mounting ──────────────────────────────────────────── */}
          <section aria-labelledby="mounting" className="mt-16">
            <h2 id="mounting" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              How are channel letters mounted?
            </h2>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Flush (direct) mount", "Each letter is fixed to the wall on studs, with its own wiring pass-through. The cleanest look; the most holes in the wall."],
                ["Raceway", "The letters sit on one slim box that carries the wiring, so the wall needs far fewer penetrations and the sign is easier to service. Some landlords require it."],
                ["Backer panel", "The letters are mounted on a panel that doubles as the wiring enclosure — useful where the wall itself cannot be drilled much, or needs a contrasting background."],
                ["Standoffs", "Used for halo-lit and dual-lit letters, holding each letter off the wall so its light can reach the surface behind it."],
              ].map(([term, detail]) => (
                <div key={term} className="rounded-2xl border border-[#eadfe4] bg-white p-5">
                  <dt className="font-bold text-[#1e1a22]">{term}</dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#5e5862]">{detail}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-xs text-[#5e5862]">
              Mounting methods as described in sign trade and manufacturer guidance.<Cite id="gp-raceway" /><Cite id="gemini-mounting" /><Cite id="landlord-criteria" />
            </p>
          </section>

          {/* ── Permits & installer ───────────────────────────────── */}
          <section aria-labelledby="installer" className="mt-16 rounded-3xl border border-[#eadfe4] bg-[#fdf7f9] p-6 sm:p-8">
            <h2 id="installer" className="text-2xl font-extrabold text-[#1e1a22]">
              Permits, listing and your installer
            </h2>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              In the US, the National Electrical Code requires electric signs to be listed, whatever their
              voltage; the product standard behind that listing is UL 48, and the listing mark is applied at
              the factory rather than in the field.<Cite id="isa-nec" /><Cite id="isa-ul48" /><Cite id="ul-signs-guide" />{" "}
              On top of that, many cities require a sign permit, most landlords must approve an exterior
              sign, and a hard-wired illuminated sign is normally connected by a licensed electrician.
            </p>
            <p className="mt-4 leading-relaxed text-[#5e5862]">
              The Glownique makes and ships channel letters; it does not install them. Before you order, ask
              your installer what your city will inspect for, and tell us where the sign is going so the
              quote covers the right build. Your mockup shows the sign&apos;s dimensions, which a permit
              application will ask for.
            </p>
          </section>

          {/* ── FAQs ──────────────────────────────────────────────── */}
          <section aria-labelledby="faqs" className="mt-16">
            <h2 id="faqs" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              Channel letter lighting: common questions
            </h2>
            <div className="mt-6 space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6">
                  <h3 className="text-base font-extrabold text-[#1e1a22]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ───────────────────────────────────────────────── */}
          <section className="mt-16 rounded-3xl border border-[#eadfe4] bg-[#fff0f5] p-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#1e1a22]">
              See your logo in all three before you decide
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5e5862]">
              Send your logo and a photo of the wall, and the free mockup shows it front-lit, halo-lit or
              dual-lit at your chosen size.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp px-8 py-3.5 text-base"
                label="Get Free Channel Letter Mockups"
                productName="channel letter sign"
              />
              <Link
                href="/business-signs/channel-letter-signs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                3D metal channel letter signs →
              </Link>
            </div>
            <p className="mt-6 text-xs text-[#5e5862]">
              Planning a budget?{" "}
              <Link href="/guides/custom-business-sign-cost" className="font-bold text-[#ce0754] hover:underline">
                What drives the cost of a business sign
              </Link>
              . Choosing for a specific site?{" "}
              <Link href="/business-signs/retail-storefronts" className="font-bold text-[#ce0754] hover:underline">
                Storefronts
              </Link>
              ,{" "}
              <Link href="/business-signs/restaurant-signs" className="font-bold text-[#ce0754] hover:underline">
                restaurants
              </Link>{" "}
              and{" "}
              <Link href="/business-signs/office-signs" className="font-bold text-[#ce0754] hover:underline">
                offices and receptions
              </Link>
              .
            </p>
          </section>

          {/* ── Sources ───────────────────────────────────────────── */}
          <section aria-labelledby="sources" className="mt-16 border-t border-[#eadfe4] pt-8">
            <h2 id="sources" className="text-lg font-extrabold text-[#1e1a22]">Sources</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-[#5e5862]">
              {SOURCES.map((source) => (
                <li key={source.id} id={`source-${source.id}`}>
                  <a href={source.url} rel="noopener" className="text-[#1e1a22] underline-offset-2 hover:underline">
                    {source.title}
                  </a>{" "}
                  — {source.publisher}. Accessed 24 September 2026.
                </li>
              ))}
            </ol>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
