import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { DELIVERY, WARRANTY } from "@/lib/claims";
import { requireGuideSummary } from "@/lib/guides";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { SIGN_TYPE_HREF } from "@/lib/landing-pages";
import { requireProductPage } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

import "./business-hub.css";

/**
 * /business-signs — the B2B hub.
 *
 * Its one job (PAGE-BRIEFS.md) is to route a business buyer to the right one
 * of four sign types, or to the industry page for their premises, and then to
 * a free mockup. Everything on it is built from the catalogs that render those
 * destinations — lib/product-catalog.ts, lib/industry-pages.ts, lib/guides —
 * so a name, path or image cannot drift from the page it links to. The only
 * copy that lives here is the hub's own: the direct answer, the decision
 * matrix, the outdoor/indoor split, the ordering steps and the FAQs.
 *
 * Head terms this page is written to (growth-system/KEYWORD-MAP.csv): custom
 * business signs, custom signage for business, storefront signs, outdoor
 * business signs, LED / illuminated signs for business. They appear in the
 * H1, H2s and the answer paragraph the way people search them, once each.
 *
 * Claims follow lib/landing-pages.ts: free mockup, 5-year warranty, tracked
 * delivery, 12V construction, Pantone/HEX matching, component-level IP67 on
 * channel letters. No price, lead time, delivery cost, customer count or
 * rating anywhere on the page or in its schema.
 */

const PATH = "/business-signs";
const TITLE = "Custom Business Signs & Storefront Signage";
const DESCRIPTION =
  "Custom business signs made to order: LED logo neon, 3D metal channel letters, slim lightboxes & acrylic logo signs for storefronts & offices. Free mockup.";
/** Date of the last change a reader would notice. Rendered, so keep it honest. */
const UPDATED_ON = "2026-09-26";

const HERO_IMAGE = {
  src: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp",
  alt: "Halo-lit 3D metal channel letters reading STUDIO.S on a corporate reception wall, the light spilling onto the plaster behind them",
  width: 1536,
  height: 1024,
};

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
    images: [{ url: HERO_IMAGE.src, width: HERO_IMAGE.width, height: HERO_IMAGE.height, alt: HERO_IMAGE.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    images: [HERO_IMAGE.src],
  },
};

/**
 * The 40–70 word direct answer under the H1. Written to stand alone if an
 * answer engine lifts it, so it defines the thing before it names the maker.
 */
const ANSWER =
  "Custom business signs are illuminated signs made to a company’s own logo, typeface and colours rather than bought off the shelf. The Glownique makes four kinds to order: LED logo neon, 3D metal channel letters, ultra-thin lightboxes and UV-printed acrylic logo signs. Send a photo of the wall and we return a free design mockup before anything is built.";

// ── The four sign types ──────────────────────────────────────────────────────
//
// Name, tagline, chips, accent and category come from the catalog. The hub adds
// two things of its own: where the B2B cluster sends this audience (the logo
// neon page rather than the consumer neon page, per SIGN_TYPE_HREF), and a
// one-line "best for" that the matrix below expands on.

type SignTypeKey = "neon" | "channel" | "lightbox" | "acrylic";

const SIGN_TYPE_SOURCE: ReadonlyArray<{
  key: SignTypeKey;
  slug: string;
  href: string;
  bestFor: string;
  /** Overrides for the one sign type whose catalog entry is consumer-led. */
  name?: string;
  shortName?: string;
  tagline?: string;
  image?: string;
  alt?: string;
}> = [
  {
    key: "neon",
    slug: "custom-neon-signs",
    href: SIGN_TYPE_HREF.neon,
    name: "Custom Logo Neon Signs",
    shortName: "Logo Neon Signs",
    tagline: "Flexible silicone LED neon, hand-bent to your logo and brand colours",
    image: "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
    alt: "Custom LED neon bar logo glowing pink and blue behind a commercial bar counter",
    bestFor: "Back bars, feature walls and window pieces that need colour after dark",
  },
  {
    key: "channel",
    slug: "3d-metal-neon-signs",
    href: SIGN_TYPE_HREF.channel,
    bestFor: "The name on a façade, and halo-lit logos on reception walls",
  },
  {
    key: "lightbox",
    slug: "ultra-thin-lightbox",
    href: SIGN_TYPE_HREF.lightbox,
    bestFor: "Menus, windows and promotions whose message changes",
  },
  {
    key: "acrylic",
    slug: "uv-print-acrylic-signs",
    href: SIGN_TYPE_HREF.acrylic,
    bestFor: "Full-colour logos, gradients and fine text that neon cannot trace",
  },
];

const SIGN_TYPES = SIGN_TYPE_SOURCE.map((entry) => {
  const product = requireProductPage(entry.slug);
  return {
    key: entry.key,
    slug: product.slug,
    href: entry.href,
    name: entry.name ?? product.name,
    shortName: entry.shortName ?? product.category,
    tagline: entry.tagline ?? product.tagline,
    accent: product.accent,
    image: entry.image ?? product.heroImage,
    alt: entry.alt ?? `${product.name} — ${product.tagline}`,
    chips: product.chips.slice(0, 4),
    bestFor: entry.bestFor,
    quoteName: product.singular,
  };
});

// ── The matrix ───────────────────────────────────────────────────────────────
//
// One row per job a business buyer actually arrives with, one column per sign
// type. The ratings restate what the industry pages say in their own answers
// (lib/industry-pages.ts), so the hub and the page it routes to agree.

type Fit = "best" | "works" | "no";

const FIT_LABEL: Record<Fit, string> = {
  best: "Best",
  works: "Works",
  no: "Not suited",
};

type MatrixRow = {
  job: string;
  hint: string;
  /** Industry pages for this job, in the order they are named in `hint`. */
  pages: ReadonlyArray<{ label: string; href: string }>;
  fits: Record<SignTypeKey, Fit>;
};

const industryHref = (slug: string) => `${PATH}/${slug}`;

const MATRIX: readonly MatrixRow[] = [
  {
    job: "The name on a building façade",
    hint: "Read from the street, day and night",
    pages: [
      { label: "Retail storefronts", href: industryHref("retail-storefronts") },
      { label: "Restaurants", href: industryHref("restaurant-signs") },
    ],
    fits: { neon: "works", channel: "best", lightbox: "works", acrylic: "no" },
  },
  {
    job: "A reception or lobby wall",
    hint: "Reads considered rather than loud",
    pages: [
      { label: "Office signs", href: industryHref("office-signs") },
      { label: "Backlit lobby signs", href: industryHref("backlit-lobby-signs") },
    ],
    fits: { neon: "works", channel: "best", lightbox: "works", acrylic: "best" },
  },
  {
    job: "A window or menu that changes",
    hint: "Swap the message, keep the sign",
    pages: [
      { label: "Open signs", href: industryHref("open-signs") },
      { label: "Restaurant menus", href: industryHref("restaurant-signs") },
    ],
    fits: { neon: "works", channel: "no", lightbox: "best", acrylic: "works" },
  },
  {
    job: "A full-colour logo or gradient",
    hint: "Brand marks that are more than letters",
    pages: [{ label: "Office logo walls", href: industryHref("office-signs") }],
    fits: { neon: "no", channel: "no", lightbox: "works", acrylic: "best" },
  },
  {
    job: "A feature wall or back bar",
    hint: "The wall guests photograph",
    pages: [
      { label: "Bars", href: industryHref("bar-signs") },
      { label: "Gyms", href: industryHref("gym-fitness-signs") },
      { label: "Salons", href: industryHref("salon-spa-signs") },
    ],
    fits: { neon: "best", channel: "works", lightbox: "no", acrylic: "works" },
  },
  {
    job: "A trade show booth",
    hint: "Packs flat, goes up in an hour",
    pages: [{ label: "Trade show signs", href: industryHref("trade-show-signs") }],
    fits: { neon: "works", channel: "no", lightbox: "best", acrylic: "works" },
  },
];

// ── Channel letter lighting styles ───────────────────────────────────────────
//
// Copy comes from the catalog's lighting section so the hub can never describe
// a style differently from the channel-letter page. The hub picks landscape
// photographs and decides where each style sends the reader: front-lit to the
// product, halo to the backlit page that owns that query, dual-lit to the guide.

const channelLetters = requireProductPage("3d-metal-neon-signs");

function requireLighting(name: string) {
  const item = channelLetters.lighting?.items.find((candidate) => candidate.name === name);
  if (!item) throw new Error(`Channel letters no longer define a "${name}" lighting style.`);
  return item;
}

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

const LIGHTING = [
  {
    ...requireLighting("Frontlit"),
    label: "Front-lit",
    image: "/3d-metallic-neon-sign/frontlit/2.webp",
    alt: "Front-lit stainless steel channel letter R with a glowing white acrylic face, on a workshop bench",
    href: SIGN_TYPE_HREF.channel,
    linkLabel: "Channel letter signs",
  },
  {
    ...requireLighting("Halo backlit"),
    label: "Halo-lit",
    image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp",
    alt: "Halo-lit 3D metal logo sign glowing softly onto a corporate reception wall",
    href: `${PATH}/backlit-signs`,
    linkLabel: "Backlit signs",
  },
  {
    ...requireLighting("Dual-lit"),
    label: "Dual-lit",
    image: "/3d-metallic-neon-sign/duallit/1.webp",
    alt: "Dual-lit channel letters with glowing white faces and dark green returns, the halo spilling onto the floor",
    href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    linkLabel: "Compare the three styles",
  },
];

// ── Outdoor vs indoor ────────────────────────────────────────────────────────

const OUTDOOR_POINTS = [
  { lead: "Built as an outdoor sign from the start.", text: "It is a different construction, specified at quote stage. An indoor sign should not be moved outside." },
  { lead: "Channel letters for the façade.", text: "Fabricated in stainless steel around IP67-rated LED modules, with an exterior-rated low-voltage power supply." },
  { lead: "Mounted by your local installer.", text: "We ship the letters prepared for the mounting method on your mockup; a licensed electrician makes the connection." },
  { lead: "Permits are usually local.", text: "Many US cities and most landlords require approval for a permanent exterior sign. Your mockup shows the dimensions an application asks for." },
  { lead: "Letter height sets the reading distance.", text: "Size the sign for the street it faces, not the wall it hangs on." },
];

const INDOOR_POINTS = [
  { lead: "Plugs into a standard outlet.", text: "Neon and acrylic signs run on 12V, and lightboxes on 12V or 24V, from a plug-in power supply. No glass tubes, no gas." },
  { lead: "Arrives ready to hang.", text: "Neon and acrylic signs mount on standoffs or a hanging kit; lightboxes hang, wall-mount or stand." },
  { lead: "Lightbox faces change without tools.", text: "Menus and promotions swap in seconds behind a magnetic or snap-frame face." },
  { lead: "Halo-lit letters on a reception wall.", text: "Solid metal faces with the glow behind them, on standoffs that hide the wiring." },
  { lead: "Keep the power supply dry and ventilated.", text: "In busy areas, mount the sign clear of reach." },
];

// ── How a quote works ────────────────────────────────────────────────────────

const STEPS = [
  {
    title: "Send us the wall",
    text: "A photo of the space, a rough size and your logo or wording. WhatsApp is the fastest way to reach us.",
  },
  {
    title: "Free design mockup",
    text: "We recommend a sign type and reply with a true-to-scale preview on your wall: lighting style, colours and mounting. Revise it until it is right.",
  },
  {
    title: "Approve and pay",
    text: "Payment runs through our Etsy shop, and eligible orders are covered by Etsy Purchase Protection. Nothing is built before you approve the design.",
  },
  {
    title: "Made to order, shipped tracked",
    text: "Built to the approved mockup and tested before packing. Shipping is confirmed with your quote, and your installer mounts it.",
  },
];

// ── Reading list ─────────────────────────────────────────────────────────────

const READING = [
  "custom-business-sign-cost",
  "front-lit-vs-halo-lit-vs-dual-lit",
  "lightbox-vs-channel-letters",
  "sign-size-viewing-distance",
  "backlit-sign-wall-surfaces-and-standoffs",
  "indoor-vs-outdoor-illuminated-signs",
].map(requireGuideSummary);

const costGuide = requireGuideSummary("custom-business-sign-cost");
const lightingGuide = requireGuideSummary("front-lit-vs-halo-lit-vs-dual-lit");
const outdoorGuide = requireGuideSummary("indoor-vs-outdoor-illuminated-signs");
const sizingGuide = requireGuideSummary("sign-size-viewing-distance");

// ── FAQs ─────────────────────────────────────────────────────────────────────
//
// The three questions the keyword map says this page exists to answer — which
// sign is best, how a quote works, what affects cost — plus the four that
// business buyers ask before they will send a logo.

const FAQS = [
  {
    q: "Which illuminated sign is best for a storefront?",
    a: "For the name on a façade, 3D metal channel letters are the standard choice: front-lit for the loudest daytime read, halo-lit for a softer, more architectural look, or dual-lit for both at once. Use a slim lightbox for a window or fascia panel whose message changes, and LED neon for a window piece that draws people in after dark.",
  },
  {
    q: "How does a business sign quote work?",
    a: "Send a photo of the wall, a rough size and your logo or wording on WhatsApp. We recommend a sign type and reply with a free, true-to-scale design mockup. Once you approve the design, payment runs through our Etsy shop, where eligible orders are covered by Etsy Purchase Protection, and the sign is made to order and shipped with tracking.",
  },
  {
    q: "What affects the cost of a custom business sign?",
    a: "Sign type, overall size and letter height, lighting style, materials and finish, whether it is built for outdoors, and shipping. Two signs with the same words can differ several times over because of these, so every quote is itemised against your artwork and your wall. The cost guide explains each driver in turn.",
  },
  {
    q: "Do you install business signs?",
    a: "No. We are a national supplier: we fabricate the sign and ship it prepared for the mounting method shown on your mockup. Interior neon, acrylic and lightbox signs plug into a standard outlet and hang on standoffs or a hanging kit. Exterior channel letters are mounted by a local sign installer and connected by a licensed electrician.",
  },
  {
    q: "Can you match our brand colours?",
    a: "Yes, as closely as the materials allow. Send Pantone, HEX or CMYK references. UV-printed acrylic reproduces them in print, LED neon comes in 13 tube colours plus RGB colour-change, and channel letters take a metallic finish or a custom-coloured face.",
  },
  {
    q: "Can these signs be used outdoors?",
    a: "Yes, as an outdoor build, which is a different construction from an indoor sign. Channel letters are fabricated in stainless steel around IP67-rated LED modules; neon, acrylic and lightbox signs have outdoor builds specified at quote stage. Tell us the sign is going outside and the mockup and quote will reflect it. An indoor sign should not be moved outdoors.",
  },
  {
    q: "Do you ship business signs nationwide?",
    a: `Yes, across the US and beyond. ${DELIVERY.sentence} Every sign is made to order after a free design mockup and carries a ${WARRANTY.term}.`,
  },
];

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

const accentStyle = (accent: string) => ({ "--accent": accent }) as CSSProperties;

export default function BusinessSignsHubPage() {
  const pageUrl = `${SITE_URL}${PATH}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        headline: TITLE,
        description: ANSWER,
        dateModified: UPDATED_ON,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@type": "Thing", name: "Custom business signs" },
        keywords: [
          "custom business signs",
          "custom signage for business",
          "storefront signs",
          "outdoor business signs",
          "illuminated signs for business",
        ],
        primaryImageOfPage: `${SITE_URL}${HERO_IMAGE.src}`,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#signtypes`,
        name: "Custom business sign types",
        itemListElement: SIGN_TYPES.map((type, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: type.name,
          url: `${SITE_URL}${type.href}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#industries`,
        name: "Business signs by industry",
        itemListElement: INDUSTRY_PAGES.map((industry, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: industry.name,
          url: `${SITE_URL}${industryHref(industry.slug)}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: pageUrl },
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
      <MetaViewCategory category="Business signage" />
      <AnnouncementBar />
      <ProductTopBar productName="business sign" />

      <main id="main-content" className="bhub">
        {/* ── Hero: a halo-lit sign on the wall it was made for ── */}
        <section className="bhub-hero" aria-labelledby="hub-h1">
          <div className="bhub-hero__glow bhub-hero__glow--gold" aria-hidden="true" />
          <div className="bhub-hero__glow bhub-hero__glow--violet" aria-hidden="true" />

          <div className="bhub-shell bhub-hero__inner">
            <div>
              <div className="bhub-hero__meta">
                <nav className="bhub-crumbs" aria-label="Breadcrumb">
                  <Link href="/">Home</Link>
                  <span aria-hidden="true">/</span>
                  <span aria-current="page">Business Signs</span>
                </nav>
                <p className="bhub-updated">
                  Updated <time dateTime={UPDATED_ON}>{formatDate(UPDATED_ON)}</time>
                </p>
              </div>

              <p className="bhub-kicker">
                <span className="bhub-kicker__dot" aria-hidden="true" />
                Commercial illuminated signage
              </p>
              <h1 id="hub-h1" className="bhub-h1">
                Custom Business Signs &amp; Storefront Signage
              </h1>
              <p className="bhub-tagline">Your logo, made to order in light.</p>
              <p className="bhub-answer">{ANSWER}</p>

              <ul className="bhub-trust" aria-label="What every business sign includes">
                <li>Free design mockup before we build</li>
                <li>Made to order to your logo</li>
                <li>{WARRANTY.term}</li>
                <li>{DELIVERY.short}</li>
              </ul>

              <div className="bhub-hero__actions">
                <CustomQuoteButton
                  className="button button--whatsapp bhub-cta-button"
                  label="Get a free business sign mockup"
                  productName="custom business sign"
                />
                <a href="#which-sign" className="bhub-hero__secondary">
                  Which sign for which job?
                </a>
              </div>
            </div>

            <figure className="bhub-hero__figure">
              <div className="bhub-hero__frame">
                <Image
                  src={HERO_IMAGE.src}
                  alt={HERO_IMAGE.alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="object-cover"
                />
                <ul className="bhub-plate" aria-label="Specification of the sign shown">
                  <li>Halo-lit</li>
                  <li>Stainless steel</li>
                  <li>12V LED</li>
                  <li>Standoff mount</li>
                </ul>
              </div>
              <figcaption className="bhub-hero__caption">
                <span>Lights on</span>
                Halo-lit channel letters on a reception wall: solid faces, the glow behind them.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── The four sign types ── */}
        <section id="sign-types" className="bhub-section" aria-labelledby="types-heading">
          <div className="bhub-shell">
            <div className="bhub-head bhub-head--center">
              <p className="bhub-eyebrow">Four sign types</p>
              <h2 id="types-heading" className="bhub-h2">
                Custom signage for business, <em>four ways to light it</em>
              </h2>
              <p className="bhub-lead">
                Every sign we make is one of these four, and they are not interchangeable. Each
                page carries the full specification, options and the questions installers ask.
              </p>
            </div>

            <div className="bhub-types bhub-reveal">
              {SIGN_TYPES.map((type) => (
                <article key={type.slug} className="bhub-type" style={accentStyle(type.accent)}>
                  <div className="bhub-type__media">
                    <Image
                      src={type.image}
                      alt={type.alt}
                      fill
                      sizes="(min-width: 1024px) 640px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span className="bhub-type__cat">{type.shortName}</span>
                  </div>
                  <div className="bhub-type__body">
                    <h3 className="bhub-type__name">
                      <Link href={type.href}>{type.name}</Link>
                    </h3>
                    <p className="bhub-type__tag">{type.tagline}</p>
                    <div className="bhub-type__best">
                      <span>Best for</span>
                      <p>{type.bestFor}</p>
                    </div>
                    <ul className="bhub-chips" aria-label={`${type.name} at a glance`}>
                      {type.chips.map((chip) => (
                        <li key={chip}>{chip}</li>
                      ))}
                    </ul>
                    <div className="bhub-type__foot">
                      <Link href={type.href} className="bhub-link">
                        Specs, options &amp; uses <span className="bhub-arrow" aria-hidden="true">→</span>
                      </Link>
                      <CustomQuoteButton
                        className="bhub-quote-mini"
                        label="Get a quote"
                        productName={type.quoteName}
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── The matrix: which sign for which job ── */}
        <section id="which-sign" className="bhub-section bhub-section--blush" aria-labelledby="matrix-heading">
          <div className="bhub-shell">
            <div className="bhub-head">
              <p className="bhub-eyebrow">Decide in a minute</p>
              <h2 id="matrix-heading" className="bhub-h2">
                Which business sign for which job
              </h2>
              <p className="bhub-lead">
                Start from what the sign has to do, not from what it is made of. The row is your
                job; the column that reads <strong>Best</strong> is where to start, and the industry
                pages under each job explain what changes in that setting.
              </p>
            </div>

            <div className="bhub-matrix__scroll bhub-reveal">
              <table className="bhub-matrix">
                <caption className="sr-only">
                  How well each of the four sign types suits six common business signage jobs
                </caption>
                <thead>
                  <tr>
                    <th scope="col">The job</th>
                    {SIGN_TYPES.map((type) => (
                      <th key={type.key} scope="col" style={accentStyle(type.accent)}>
                        <span className="bhub-matrix__col">
                          <Link href={type.href}>{type.shortName}</Link>
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MATRIX.map((row) => (
                    <tr key={row.job}>
                      <th scope="row">
                        <strong>{row.job}</strong>
                        <small>
                          {row.hint}
                          {" · "}
                          {row.pages.map((page, index) => (
                            <span key={page.href}>
                              {index > 0 ? ", " : ""}
                              <Link href={page.href}>{page.label}</Link>
                            </span>
                          ))}
                        </small>
                      </th>
                      {SIGN_TYPES.map((type) => {
                        const fit = row.fits[type.key];
                        return (
                          <td key={type.key} style={accentStyle(type.accent)}>
                            <span className={`bhub-fit bhub-fit--${fit}`}>
                              {fit === "no" ? (
                                <>
                                  <span aria-hidden="true">—</span>
                                  <span className="sr-only">{FIT_LABEL.no}</span>
                                </>
                              ) : (
                                FIT_LABEL[fit]
                              )}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="bhub-legend" aria-label="Legend">
              <li>
                <span className="bhub-fit bhub-fit--best" style={accentStyle("#e0a23c")}>Best</span>
                the sign type to start from
              </li>
              <li>
                <span className="bhub-fit bhub-fit--works" style={accentStyle("#e0a23c")}>Works</span>
                a sound choice with a trade-off
              </li>
              <li>
                <span className="bhub-fit bhub-fit--no" aria-hidden="true">—</span>
                not suited to this job
              </li>
            </ul>

            <div className="bhub-readnext">
              <Link href={lightingGuide.href}>
                <strong>{lightingGuide.title}</strong>
                <span>{lightingGuide.summary}</span>
              </Link>
              <Link href={costGuide.href}>
                <strong>{costGuide.title}</strong>
                <span>{costGuide.summary}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Channel letter lighting styles, on the ground they are seen against ── */}
        <section className="bhub-section bhub-section--night" aria-labelledby="lighting-heading">
          <div className="bhub-shell">
            <div className="bhub-head">
              <p className="bhub-eyebrow bhub-eyebrow--light">Channel letter lighting</p>
              <h2 id="lighting-heading" className="bhub-h2">
                Front-lit, halo-lit or <em>dual-lit</em>
              </h2>
              <p className="bhub-lead">
                The same fabricated stainless letters read three different ways depending on
                which direction the light leaves the channel. Decide this before the mockup: it
                changes the wall you need, the mounting and the mood.
              </p>
            </div>

            <div className="bhub-lights bhub-reveal">
              {LIGHTING.map((style) => (
                <article key={style.name} className="bhub-light">
                  <div className="bhub-light__media">
                    <Image
                      src={style.image}
                      alt={style.alt}
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="bhub-light__body">
                    <h3>
                      {style.label} <span>{lowerFirst(style.summary)}</span>
                    </h3>
                    <p>Best for {lowerFirst(style.bestFor)}.</p>
                    <Link href={style.href} className="bhub-link">
                      {style.linkLabel} <span className="bhub-arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <p className="bhub-note">
              Fitting out a reception? <Link href={`${PATH}/backlit-lobby-signs`}>Backlit lobby signs</Link>{" "}
              covers lease-friendly mounting, sizing against the desk and quiet power supplies.
              Halo on brick, plaster or timber behaves differently: see{" "}
              <Link href="/guides/backlit-sign-wall-surfaces-and-standoffs">wall surfaces and standoffs</Link>.
            </p>
          </div>
        </section>

        {/* ── Industries ── */}
        <section className="bhub-section" aria-labelledby="industries-heading">
          <div className="bhub-shell">
            <div className="bhub-head bhub-head--center">
              <p className="bhub-eyebrow">By premises</p>
              <h2 id="industries-heading" className="bhub-h2">
                Business signs <em>by industry</em>
              </h2>
              <p className="bhub-lead">
                A bar and a law firm do not need the same sign. Each page below says which of the
                four types suits that setting, what changes in it, and what to decide before we
                fabricate.
              </p>
            </div>

            <div className="bhub-inds bhub-reveal">
              {INDUSTRY_PAGES.map((industry) => (
                <Link key={industry.slug} href={industryHref(industry.slug)} className="bhub-ind">
                  <div className="bhub-ind__media">
                    <Image
                      src={industry.heroImage}
                      alt={industry.heroAlt}
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="bhub-ind__body">
                    <h3>{industry.name}</h3>
                    <p>{industry.intro}</p>
                    <span className="bhub-link">
                      See which signs fit <span className="bhub-arrow" aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Outdoor vs indoor ── */}
        <section className="bhub-section bhub-section--blush" aria-labelledby="outdoor-heading">
          <div className="bhub-shell">
            <div className="bhub-head">
              <p className="bhub-eyebrow">Where it hangs</p>
              <h2 id="outdoor-heading" className="bhub-h2">
                Outdoor business signs vs indoor signs: <em>what changes</em>
              </h2>
              <p className="bhub-lead">
                The same logo is built differently for a façade and for a reception wall. Tell us
                which at quote stage and the mockup, the construction and the price basis all
                follow from it.
              </p>
            </div>

            <div className="bhub-split bhub-reveal">
              <article className="bhub-panel">
                <p className="bhub-panel__eyebrow">Façades, fascias, exterior walls</p>
                <h3>Outdoor business signs</h3>
                <p>
                  LED outdoor business signs for buildings are almost always 3D metal channel
                  letters, with a slim lightbox or neon piece in the window beside them.
                </p>
                <ul>
                  {OUTDOOR_POINTS.map((point) => (
                    <li key={point.lead}>
                      <strong>{point.lead}</strong> {point.text}
                    </li>
                  ))}
                </ul>
                <Link href={sizingGuide.href} className="bhub-link">
                  {sizingGuide.title} <span className="bhub-arrow" aria-hidden="true">→</span>
                </Link>
              </article>

              <article className="bhub-panel bhub-panel--indoor">
                <p className="bhub-panel__eyebrow">Receptions, back bars, feature walls, windows</p>
                <h3>Indoor illuminated signs for business</h3>
                <p>
                  Inside, all four sign types are in play, and the choice comes down to whether the
                  wall is meant to be read, photographed or updated.
                </p>
                <ul>
                  {INDOOR_POINTS.map((point) => (
                    <li key={point.lead}>
                      <strong>{point.lead}</strong> {point.text}
                    </li>
                  ))}
                </ul>
                <Link href={outdoorGuide.href} className="bhub-link">
                  {outdoorGuide.title} <span className="bhub-arrow" aria-hidden="true">→</span>
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ── How a quote works ── */}
        <section className="bhub-section" aria-labelledby="process-heading">
          <div className="bhub-shell">
            <div className="bhub-head bhub-head--center">
              <p className="bhub-eyebrow">How a quote works</p>
              <h2 id="process-heading" className="bhub-h2">
                From a photo of the wall <em>to a sign on it</em>
              </h2>
              <p className="bhub-lead">
                Four steps, in this order. You see the sign on your wall before you pay for it, and
                nothing is fabricated until you approve the design.
              </p>
            </div>

            <ol className="bhub-steps bhub-reveal">
              {STEPS.map((step) => (
                <li key={step.title} className="bhub-step">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Reading list ── */}
        <section className="bhub-section bhub-section--blush" aria-labelledby="guides-heading">
          <div className="bhub-shell">
            <div className="bhub-head">
              <p className="bhub-eyebrow">Before you order</p>
              <h2 id="guides-heading" className="bhub-h2">
                Business sign buying guides
              </h2>
              <p className="bhub-lead">
                The decisions that are expensive to change after fabrication, explained with
                sources: cost drivers, letter height, lighting styles, wall surfaces and outdoor use.
              </p>
            </div>

            <div className="bhub-guides bhub-reveal">
              {READING.map((guide) => (
                <Link key={guide.slug} href={guide.href} className="bhub-guide">
                  <p className="bhub-guide__cat">{guide.category}</p>
                  <h3>{guide.title}</h3>
                  <p>{guide.summary}</p>
                  <span className="bhub-guide__meta">
                    Updated <time dateTime={guide.updatedOn}>{formatDate(guide.updatedOn)}</time>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="bhub-section" aria-labelledby="faq-heading">
          <div className="bhub-shell">
            <div className="bhub-head bhub-head--center">
              <p className="bhub-eyebrow">Questions, answered</p>
              <h2 id="faq-heading" className="bhub-h2">
                Custom business sign FAQs
              </h2>
            </div>

            <div className="bhub-faq">
              {FAQS.map((faq) => (
                <details key={faq.q}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Closing CTA ── */}
        <section className="bhub-section bhub-section--night bhub-cta" aria-labelledby="cta-heading">
          <div className="bhub-cta__glow" aria-hidden="true" />
          <div className="bhub-shell bhub-cta__inner">
            <p className="bhub-eyebrow bhub-eyebrow--light">Start with the wall</p>
            <h2 id="cta-heading" className="bhub-h2">
              Send us the wall. <em>We’ll send back the sign.</em>
            </h2>
            <p className="bhub-lead">
              A photo of the space and a rough size is enough to start. We come back with a free
              design mockup, and every sign we make carries a {WARRANTY.term}.
            </p>
            <div className="bhub-cta__actions">
              <CustomQuoteButton
                className="button button--whatsapp bhub-cta-button"
                label="Get a free business sign mockup"
                productName="custom business sign"
              />
              <Link href={costGuide.href} className="bhub-cta__secondary">
                Read the cost guide first
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
