import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { DetailCtaPair } from "@/components/detail/detail-cta-pair";
import type { DetailImage } from "@/components/detail/detail-gallery";
import { DetailClosing, DetailFaq, DetailHero, DetailTrustStrip } from "@/components/detail/detail-sections";
import { DetailStickyCta } from "@/components/detail/detail-sticky-cta";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { BACKLIT_PATH, BACKLIT_SIZE_ROWS } from "@/lib/backlit-signs";
import { LEAD_TIME, WARRANTY } from "@/lib/claims";
import { SITE_URL, whatsappQuoteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

import "@/components/detail/detail.css";

/**
 * /business-signs/backlit-lobby-signs — backlit signs for reception walls.
 *
 * The parent page (/business-signs/backlit-signs) explains what a backlit sign
 * is and how it is built. This one answers what a lobby adds to that: a leased
 * wall, a reception desk to size against, a corridor people walk down, and
 * power that has to come from somewhere. It links up for finishes and specs
 * instead of repeating them.
 *
 * Rewritten 2026-10-01. The earlier version stated a 2-hour mockup, "100%
 * silent" drivers, a 25 ft lead length, fixed Kelvin values and "ADA
 * compliant" letter depths; none had an owner-confirmed basis, so they are
 * gone. The ADA rule itself is cited, with the depth left to the mockup.
 */

const PATH = "/business-signs/backlit-lobby-signs";
const UPDATED_ON = "2026-10-01";
const SOURCE = "backlit-lobby";
const SUBJECT = "backlit lobby sign";
// The shop's reception-sign listing; its first photo is the hero picture here.
const ETSY_URL = "https://www.etsy.com/listing/4584462169/reception-sign-custom-lobby-logo-backlit";

const TITLE = "Backlit Lobby Signs & Reception Wall Logos";
const DESCRIPTION =
  "Custom backlit lobby signs: your logo in stainless steel with a halo glow, sized to your reception desk. Leased-wall mounting and a free mockup in 24 hours.";

const ANSWER =
  "A backlit lobby sign is a company logo in solid metal letters, mounted on the wall behind a reception desk and lit from behind so it sits in a soft halo. The Glownique makes each one from your logo file in stainless steel, sizes it to your desk and wall, and sends a free mockup before anything is made.";

const IMAGES: readonly DetailImage[] = [
  {
    src: "/backlit-signs/backlit-lobby-sign-reception-desk-wood-wall.webp",
    alt: "Design preview of a backlit lobby sign in rose gold on a dark timber wall behind a wooden reception desk",
    label: "wood wall",
  },
  {
    src: "/backlit-signs/backlit-office-sign-reception-wall.webp",
    alt: "Design preview of a backlit reception sign in mirror gold lettering on a white wall above a reception desk",
    label: "white wall",
    position: "50% 38%",
  },
  {
    src: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp",
    alt: "Design preview of a backlit lobby sign in matte black capitals with an amber halo on a gray plaster wall",
    label: "gray plaster",
  },
  {
    src: "/backlit-signs/backlit-reception-sign-monogram-gold.webp",
    alt: "Design preview of a backlit reception sign: large mirror-gold initials with a script name across them",
    label: "monogram",
  },
];

const OG_IMAGE = IMAGES[0];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    url: PATH,
    images: [{ url: OG_IMAGE.src, width: 1600, height: 1280, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    images: [OG_IMAGE.src],
  },
};

const DECISIONS = [
  {
    title: "Is the wall leased?",
    text: "Many leases limit how many holes you can drill. Instead of fixing every letter to the wall, the whole logo can be mounted on one backer panel in acrylic or metal, so the wall takes a few fixings and one cable. Check your lease, then tell us which you need.",
  },
  {
    title: "Where does the power come from?",
    text: "The LEDs run on low-voltage 12V from a power supply. Decide with your electrician where that supply sits and how the cable reaches the wall before the sign is made, and we will mark the cable exit on the mockup.",
  },
  {
    title: "Do people walk past it?",
    text: "A sign beside a corridor or doorway has a depth limit. The 2010 ADA Standards (section 307.2) allow objects mounted between 27 and 80 inches above the floor to project no more than 4 inches into a circulation path. Ask for the total depth, letters plus gap, on your mockup.",
  },
  {
    title: "What color is the room's light?",
    text: "Match the halo to the lighting already in the room. Warm white suits wood, stone and warm downlights; cool white suits white walls and bright, clinical interiors. Send a photo taken with the lights on.",
  },
] as const;

const PLACEMENTS = [
  {
    title: "Behind the reception desk",
    text: "The classic position. Center the logo on the desk, not on the wall, and keep it about half to three-quarters of the desk width.",
    image: IMAGES[0],
  },
  {
    title: "A plain reception wall",
    text: "With no desk to size against, aim for 40% to 60% of the wall width and hang the center of the logo at eye level from the door.",
    image: IMAGES[1],
  },
  {
    title: "Boardroom or corridor",
    text: "A smaller logo, read up close. Check the depth where people walk past, and choose a brushed or matte finish under strong downlights.",
    image: IMAGES[2],
  },
] as const;

const FAQS = [
  { q: "What is a backlit lobby sign?", a: ANSWER },
  {
    q: "Can a backlit lobby sign go on a leased office wall?",
    a: "Yes. Where a lease limits drilling, the logo is mounted on a single backer panel in acrylic or metal instead of letter by letter. The panel hangs from a few fixings and needs one cable, which leaves far less to repair when you move out. Check your lease, then tell us which mounting you need.",
  },
  {
    q: "How big should a lobby sign be compared with the reception desk?",
    a: "About half to three-quarters of the desk width looks balanced: 42 to 58 inches for a 6 to 8 foot desk. On a wall with no desk, aim for 40% to 60% of the wall width. Send a photo of the wall and the mockup shows the sign at scale.",
  },
  {
    q: "How far can a lobby sign stick out from the wall?",
    a: "On a circulation path, the 2010 ADA Standards (section 307.2) limit objects mounted between 27 and 80 inches above the floor to 4 inches of projection. A backlit sign's depth is its letter depth plus the gap behind it, so ask us to state that total on your mockup and confirm it with your building manager.",
  },
  {
    q: "Who installs and wires a backlit lobby sign?",
    a: "We make and ship the sign; we do not install it. It arrives prepared for the mounting method on your mockup. A local sign installer or contractor mounts it, and a licensed electrician makes any hard-wired connection.",
  },
  {
    q: "How long does a backlit lobby sign take?",
    a: `The free mockup comes back within 24 hours. After you approve it, the sign takes ${LEAD_TIME.otherProductionDays.replace("-", " to ")} to make and ${LEAD_TIME.transit.replace("-", " to ")} to deliver, free and tracked. Rush orders cost nothing extra: give us your opening or move-in date with the enquiry.`,
  },
  {
    q: "Can you match our brand colors and logo exactly?",
    a: "Send the logo as AI, PDF or SVG and the letterforms are cut from that file. Metal comes in mirror, brushed and antique finishes, and painted elements are matched as closely as the materials allow to a Pantone, HEX or CMYK reference. For several floors or sites, order together so the signs match each other.",
  },
] as const;

function buildJsonLd() {
  const pageUrl = `${SITE_URL}${PATH}`;
  const absolute = (src: string) => encodeURI(`${SITE_URL}${src}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        inLanguage: "en-US",
        dateModified: UPDATED_ON,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        primaryImageOfPage: absolute(OG_IMAGE.src),
      },
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Custom Backlit Lobby Sign",
        alternateName: ["Backlit reception sign", "Halo-lit lobby logo"],
        description: ANSWER,
        image: IMAGES.map((image) => absolute(image.src)),
        category: "Office and reception signage",
        material: "Stainless steel",
        brand: { "@type": "Brand", name: "The Glownique" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Backlit Signs", item: `${SITE_URL}${BACKLIT_PATH}` },
          { "@type": "ListItem", position: 4, name: "Backlit Lobby Signs", item: pageUrl },
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
}

export default function BacklitLobbySignsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <MetaViewContent contentId="backlit-lobby-signs" contentName="Backlit Lobby Signs" contentCategory="Backlit signs" />
      <AnnouncementBar />
      <ProductTopBar productName={SUBJECT} />

      {/* Brushed gold, the same accent as the backlit page this one sits under. */}
      <main id="main-content" className="detail-page" style={{ "--dt-accent": "#e2c078" } as CSSProperties}>
        <DetailHero
          crumbs={[
            { href: "/business-signs", label: "Business Signs" },
            { href: BACKLIT_PATH, label: "Backlit Signs" },
            { label: "Lobby Signs" },
          ]}
          eyebrow="Reception and lobby signs"
          title="Backlit Lobby Signs & Reception Wall Logos"
          lede="Your logo in stainless steel behind the reception desk, lit from behind and sized to the wall."
          checks={["Sized to your desk and wall", "Backer panel for leased walls", WARRANTY.term, "Free mockup within 24 hours"]}
          images={IMAGES}
          galleryLabel="Backlit lobby sign pictures"
          subject={SUBJECT}
          etsyUrl={ETSY_URL}
          source={SOURCE}
        />
        <DetailTrustStrip />

        {/* ─────────────────────── DIRECT ANSWER ─────────────────────── */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">What is a backlit lobby sign?</h2>
            <p className="mt-4 text-lg leading-relaxed text-(--dt-ink)">{ANSWER}</p>
            <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
              For how the sign is built, the finish chart and the full specifications, see{" "}
              <Link href={BACKLIT_PATH} className="detail-link">
                custom backlit signs
              </Link>
              . This page covers what a lobby adds: the lease, the desk, the corridor and the power.
            </p>
            <p className="mt-5 text-sm text-(--dt-muted)">
              Updated <time dateTime={UPDATED_ON}>October 1, 2026</time>. Pictures are design previews with sample logos.
            </p>
          </div>
        </section>

        {/* ─────────────────────── DECISIONS ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="lobby-decisions">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Before you order</p>
              <h2 id="lobby-decisions" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Four things to settle for a lobby sign
              </h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
                A reception wall comes with rules a shop wall does not have. Answer these four and the mockup can be right
                the first time.
              </p>
            </div>
            <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-2">
              {DECISIONS.map((item) => (
                <li key={item.title} className="border-t-2 border-(--dt-ink) pt-5">
                  <h3 className="text-xl font-extrabold tracking-tight">{item.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-(--dt-muted)">{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-(--dt-muted)">
              Source for the depth rule:{" "}
              <a
                className="detail-link"
                href="https://www.ada.gov/law-and-regs/design-standards/2010-stds/"
                target="_blank"
                rel="noopener"
              >
                2010 ADA Standards for Accessible Design
              </a>
              .
            </p>
          </div>
        </section>

        {/* ─────────────────────── SIZING ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="lobby-size">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <p className="detail-eyebrow">Sizing</p>
            <h2 id="lobby-size" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How big should a lobby sign be?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--dt-muted)">
              Size the sign to the desk under it. About half to three-quarters of the desk width looks balanced; smaller
              than that and the logo looks lost on the wall. These are starting points, and the mockup shows the sign at
              scale on a photo of your own wall.
            </p>
            <div className="detail-table-wrap mt-7">
              <table className="detail-table min-w-[620px]">
                <caption>Suggested backlit lobby sign width by reception desk width</caption>
                <thead>
                  <tr>
                    <th scope="col">Desk or wall</th>
                    <th scope="col">Sign width</th>
                    <th scope="col">Placement</th>
                  </tr>
                </thead>
                <tbody>
                  {BACKLIT_SIZE_ROWS.map((row) => (
                    <tr key={row.desk}>
                      <th scope="row">{row.desk}</th>
                      <td>{row.sign}</td>
                      <td>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─────────────────────── PLACEMENTS ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="lobby-places">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Where it goes</p>
              <h2 id="lobby-places" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Three places a lobby sign works
              </h2>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {PLACEMENTS.map((place) => (
                <article key={place.title} className="grid content-start gap-4">
                  <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] bg-(--dt-night)">
                    <Image
                      src={place.image.src}
                      alt={place.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      loading="lazy"
                      className="object-cover"
                      style={place.image.position ? { objectPosition: place.image.position } : undefined}
                    />
                  </div>
                  {/* Both ways to buy, directly under the picture. */}
                  <DetailCtaPair
                    subject={`${SUBJECT} for ${place.title.toLowerCase()}`}
                    etsyUrl={ETSY_URL}
                    source={`${SOURCE}-${place.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  />
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">{place.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-(--dt-muted)">{place.text}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-sm text-(--dt-muted)">
              Fitting out the whole office?{" "}
              <Link href="/business-signs/office-signs" className="detail-link">
                Office and reception signs
              </Link>{" "}
              covers the other sign types, and the{" "}
              <Link href="/guides/backlit-sign-wall-surfaces-and-standoffs" className="detail-link">
                wall surfaces guide
              </Link>{" "}
              explains how your wall changes the halo.
            </p>
          </div>
        </section>

        <DetailFaq heading="Backlit lobby sign FAQs" faqs={FAQS} />
        <DetailClosing
          heading="Send your logo and a photo of the wall."
          subject={SUBJECT}
          etsyUrl={ETSY_URL}
          source={SOURCE}
        />
      </main>

      <SiteFooter />
      <DetailStickyCta whatsappUrl={whatsappQuoteUrl(SUBJECT)} etsyUrl={ETSY_URL} source={SOURCE} />
    </>
  );
}
