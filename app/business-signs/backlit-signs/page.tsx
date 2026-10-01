import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronDown } from "lucide-react";

import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { DetailCtaPair } from "@/components/detail/detail-cta-pair";
import { DetailGallery } from "@/components/detail/detail-gallery";
import { DetailStickyCta } from "@/components/detail/detail-sticky-cta";
import { DetailVideo } from "@/components/detail/detail-video";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import {
  BACKLIT_ANATOMY,
  BACKLIT_ANSWER,
  BACKLIT_COMPARISON,
  BACKLIT_ETSY_URL,
  BACKLIT_FAQS,
  BACKLIT_FINISH_GROUPS,
  BACKLIT_HERO_IMAGES,
  BACKLIT_LEDE,
  BACKLIT_LIGHT_OPTIONS,
  BACKLIT_PATH,
  BACKLIT_ROUTE_IMAGES,
  BACKLIT_SIZE_ROWS,
  BACKLIT_SPACES,
  BACKLIT_SPECS,
  BACKLIT_STEPS,
  BACKLIT_UPDATED_LABEL,
  BACKLIT_UPDATED_ON,
  BACKLIT_WALL_ROWS,
} from "@/lib/backlit-signs";
import { DELIVERY, WARRANTY } from "@/lib/claims";
import { ETSY_SHOP_URL, SITE_URL, whatsappQuoteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

import "@/components/detail/detail.css";
import "./backlit.css";

/**
 * /business-signs/backlit-signs — the backlit sign detail page.
 *
 * Two jobs. It is the page the backlit Meta campaigns land on, so a visitor on
 * a phone has to see the product and both ways to buy (WhatsApp, Etsy) before
 * scrolling, and again under every picture. And it is the page that should
 * answer "what is a backlit sign", so the definition, the specs, the sizing and
 * wall tables and the FAQs are plain server-rendered text an engine can quote.
 *
 * Each space has an anchor (#hair-salon, #nail-salon, #beauty-salon,
 * #lobby-sign, #office-sign), so an ad set aimed at one kind of business can
 * land on its own section.
 *
 * Content and claims live in lib/backlit-signs.ts. No price, rating or review
 * count appears here or in the schema (scripts/seo-audit.mjs enforces it).
 */

const TITLE = "Custom Backlit Signs for Salons & Offices";
const DESCRIPTION =
  "Custom backlit signs: your logo in stainless steel with a halo glow, for hair, nail and beauty salons, lobbies and offices. Free mockup in 24 hours.";
const OG_IMAGE = BACKLIT_HERO_IMAGES[0];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BACKLIT_PATH },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    url: BACKLIT_PATH,
    images: [{ url: OG_IMAGE.src, width: 1402, height: 1122, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    images: [OG_IMAGE.src],
  },
};

const VIDEOS = [
  {
    src: "/backlit-signs/backlit-sign-rose-gold-letters-workshop.mp4",
    poster: "/backlit-signs/backlit-sign-rose-gold-letters-workshop-poster.webp",
    name: "Backlit letters in mirror rose gold, lit on the bench",
    label: "Close-up video of mirror rose gold backlit letters, first lit with a warm halo and then unlit to show the metal faces and sides",
    caption: "Mirror rose gold. The face stays metal; the light comes out behind it.",
  },
  {
    src: "/backlit-signs/backlit-sign-matte-black-letters-halo.mp4",
    poster: "/backlit-signs/backlit-sign-matte-black-letters-halo-poster.webp",
    name: "Matte black backlit letters with a warm white halo",
    label: "Close-up video of matte black backlit letters lying on a gray surface, each one ringed by a warm white halo",
    caption: "Matte black with a warm white halo, before mounting.",
  },
] as const;

const READING = [
  {
    href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    title: "Front-lit vs halo-lit vs dual-lit",
    text: "How the three lighting styles differ, with sources.",
  },
  {
    href: "/guides/backlit-sign-wall-surfaces-and-standoffs",
    title: "Wall surfaces and standoffs",
    text: "How the wall and the gap change the halo.",
  },
  {
    href: "/business-signs/backlit-lobby-signs",
    title: "Backlit lobby signs",
    text: "Sizing, leased walls and mounting for reception areas.",
  },
  {
    href: "/guides/custom-business-sign-cost",
    title: "What a custom sign costs",
    text: "What drives the price of each sign type.",
  },
] as const;

function buildJsonLd() {
  const pageUrl = `${SITE_URL}${BACKLIT_PATH}`;
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
        dateModified: BACKLIT_UPDATED_ON,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#product` },
        primaryImageOfPage: absolute(OG_IMAGE.src),
      },
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Custom Backlit Sign",
        alternateName: ["Halo-lit sign", "Reverse-lit channel letters", "Backlit logo sign"],
        description: BACKLIT_ANSWER,
        image: BACKLIT_ROUTE_IMAGES.map(absolute),
        category: "Illuminated business signage",
        material: "Stainless steel",
        brand: { "@type": "Brand", name: "The Glownique" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        url: pageUrl,
        audience: {
          "@type": "BusinessAudience",
          name: "Hair salons, nail salons, beauty salons, spas, offices and reception areas",
        },
        additionalProperty: BACKLIT_SPECS.map((spec) => ({
          "@type": "PropertyValue",
          name: spec.label,
          value: spec.value,
        })),
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
        "@type": "ItemList",
        name: "Backlit signs by space",
        itemListElement: BACKLIT_SPACES.map((space, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: space.heading,
          url: `${pageUrl}#${space.id}`,
        })),
      },
      {
        "@type": "HowTo",
        name: "How to order a custom backlit sign",
        step: BACKLIT_STEPS.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
      ...VIDEOS.map((video) => ({
        "@type": "VideoObject",
        name: video.name,
        description: video.label,
        thumbnailUrl: absolute(video.poster),
        contentUrl: absolute(video.src),
        uploadDate: BACKLIT_UPDATED_ON,
      })),
      {
        "@type": "FAQPage",
        mainEntity: BACKLIT_FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}

export default function BacklitSignsPage() {
  const generalWhatsapp = whatsappQuoteUrl("custom backlit sign");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      {/* The id is this route's slug, so a Meta catalog feed added later can
          use it as the item id and inherit the audiences built here. */}
      <MetaViewContent contentId="backlit-signs" contentName="Custom Backlit Signs" contentCategory="Backlit signs" />
      <AnnouncementBar />
      <ProductTopBar productName="custom backlit sign" />

      <main id="main-content" className="detail-page">
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className="detail-hero">
          <div className="relative z-10 mx-auto grid max-w-[1320px] gap-6 px-4 pb-12 pt-6 sm:gap-8 sm:px-6 sm:pt-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
            <div>
              <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60" aria-label="Breadcrumb">
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/business-signs" className="text-white/80 transition-colors hover:text-white">
                  Business Signs
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-white" aria-current="page">
                  Backlit Signs
                </span>
              </nav>

              <p className="detail-eyebrow detail-eyebrow--light">Halo-lit metal logo signs</p>
              <h1 className="mt-2 text-[2.25rem] font-extrabold leading-[1.04] tracking-tight sm:mt-3 sm:text-5xl lg:text-6xl">
                Custom <span className="backlit-word">Backlit</span> Signs{" "}
                <span className="detail-accent text-white/85">for salons, lobbies and offices</span>
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">
                {BACKLIT_LEDE.lead} <span className="hidden sm:inline">{BACKLIT_LEDE.rest}</span>
              </p>

              <ul className="mt-6 hidden max-w-xl gap-x-6 gap-y-2.5 text-sm font-semibold text-white/90 sm:grid sm:grid-cols-2">
                {["Free mockup within 24 hours", WARRANTY.term, DELIVERY.short, "Unlimited free revisions"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-(--dt-accent)" aria-hidden="true" />
                    <span className="first-letter:uppercase">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <DetailGallery
                images={BACKLIT_HERO_IMAGES}
                sizes="(max-width: 1024px) 100vw, 660px"
                label="Backlit sign photos by space"
                preload
              >
                <div>
                  <DetailCtaPair subject="custom backlit sign" etsyUrl={BACKLIT_ETSY_URL} source="detail-hero" />
                  <p className="mt-2.5 text-center text-xs leading-relaxed text-white/70">
                    Free mockup first. You pay nothing until you approve the design.
                  </p>
                </div>
              </DetailGallery>
            </div>
          </div>
        </section>

        {/* ─────────────────────── TRUST STRIP ─────────────────────── */}
        <section className="border-b border-(--dt-line) bg-white" aria-label="What every order includes">
          <ul className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-3 px-4 py-5 text-sm font-semibold text-(--dt-muted) sm:px-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-10">
            {["Free mockup within 24 hours", WARRANTY.term, DELIVERY.short, "Secure Etsy checkout"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--dt-accent-ink)">
                  <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />
                </span>
                <span className="first-letter:uppercase">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* ─────────────────────── DIRECT ANSWER ─────────────────────── */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">What is a backlit sign?</h2>
            <p className="mt-4 text-lg leading-relaxed text-(--dt-ink)">{BACKLIT_ANSWER}</p>
            <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
              The Glownique makes each one to order from your own logo, in stainless steel, in the finish and glow you
              choose. You see a free mockup on your wall before anything is made.
            </p>
            <p className="mt-5 text-sm text-(--dt-muted)">
              Updated <time dateTime={BACKLIT_UPDATED_ON}>{BACKLIT_UPDATED_LABEL}</time>.
            </p>
          </div>
        </section>

        {/* ─────────────────────── SPACES ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="backlit-spaces">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="detail-eyebrow">Find your space</p>
              <h2 id="backlit-spaces" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Backlit signs for salons, lobbies and offices
              </h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
                The same sign is chosen differently for each room. Pick yours for the finish, glow and size we would
                start from.
              </p>
            </div>

            <nav className="mt-8 flex flex-wrap justify-center gap-2" aria-label="Backlit signs by space">
              {BACKLIT_SPACES.map((space) => (
                <a
                  key={space.id}
                  href={`#${space.id}`}
                  className="rounded-full border border-(--dt-line) bg-white px-4 py-2 text-sm font-bold text-(--dt-ink) transition-colors hover:border-(--dt-accent-ink)"
                >
                  {space.name}
                </a>
              ))}
            </nav>

            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-(--dt-muted)">
              Pictures are design previews from our Etsy listings and show sample logos. Your sign is made from your own.
            </p>

            <div className="mt-12 grid gap-14 lg:gap-20">
              {BACKLIT_SPACES.map((space, index) => (
                <article
                  key={space.id}
                  id={space.id}
                  // Heading first in the source, so a phone reads "hair salons"
                  // before the pictures; from lg it sits beside the gallery.
                  className="detail-anchor grid gap-5 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-4"
                >
                  <h3
                    className={`text-2xl font-extrabold tracking-tight sm:text-3xl lg:row-start-1 lg:self-end ${
                      index % 2 === 1 ? "lg:col-start-1" : "lg:col-start-2"
                    }`}
                  >
                    {space.heading}
                  </h3>

                  <div
                    className={`min-w-0 lg:row-span-2 lg:row-start-1 lg:self-center ${
                      index % 2 === 1 ? "lg:col-start-2" : "lg:col-start-1"
                    }`}
                  >
                    <DetailGallery
                      images={space.images}
                      sizes="(max-width: 1024px) 100vw, 640px"
                      label={`${space.name} sign photos`}
                    >
                      <DetailCtaPair
                        subject={`backlit sign for ${/^[aeiou]/i.test(space.name) ? "an" : "a"} ${space.name.toLowerCase()}`}
                        etsyUrl={space.etsyUrl}
                        source={`backlit-${space.id}`}
                      />
                    </DetailGallery>
                  </div>

                  <div className={`min-w-0 lg:row-start-2 ${index % 2 === 1 ? "lg:col-start-1" : "lg:col-start-2"}`}>
                    <p className="text-base leading-relaxed text-(--dt-muted)">{space.answer}</p>
                    <dl className="mt-6 divide-y divide-(--dt-line) border-y border-(--dt-line)">
                      {space.picks.map((pick) => (
                        <div key={pick.label} className="grid grid-cols-[84px_1fr] gap-4 py-3 text-sm">
                          <dt className="font-bold text-(--dt-ink)">{pick.label}</dt>
                          <dd className="leading-relaxed text-(--dt-muted)">{pick.value}</dd>
                        </div>
                      ))}
                    </dl>
                    {space.more ? (
                      <p className="mt-5 text-sm">
                        <Link href={space.more.href} className="detail-link">
                          {space.more.label}
                        </Link>
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────── HOW IT WORKS ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="backlit-how">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[20px] bg-(--dt-night)">
              <Image
                src="/backlit-signs/backlit-sign-standoff-halo-close-up.webp"
                alt="Design preview, seen from the side, of matte black backlit letters standing off a concrete wall with warm light spilling out behind them"
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div>
              <p className="detail-eyebrow">How it works</p>
              <h2 id="backlit-how" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                How a backlit sign is built
              </h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
                A backlit sign uses the wall as part of the light. Four things decide how it looks: the face, the sides,
                the LEDs and the gap behind the letters.
              </p>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                {BACKLIT_ANATOMY.map((item) => (
                  <div key={item.part}>
                    <dt className="text-base font-bold text-(--dt-ink)">{item.part}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-(--dt-muted)">{item.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-[1320px] px-4 sm:px-6">
            <h3 className="text-xl font-extrabold tracking-tight sm:text-2xl">Real letters, filmed up close</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-(--dt-muted)">
              Two clips from our Etsy listings: fabricated letters on the bench, lit, before they are mounted.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {VIDEOS.map((video) => (
                <figure key={video.src}>
                  <DetailVideo src={video.src} poster={video.poster} label={video.label} />
                  <figcaption className="mt-3 text-sm text-(--dt-muted)">{video.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────────── FINISHES & LIGHT ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="backlit-finishes">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Options</p>
              <h2 id="backlit-finishes" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Metal finishes and light colors
              </h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
                Two choices set the character of a backlit sign: the metal you see by day, and the color of the light
                behind it at night.
              </p>
            </div>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
              <figure>
                <div className="overflow-hidden rounded-[20px] border border-(--dt-line) bg-white">
                  <Image
                    src="/backlit-signs/backlit-sign-metal-finish-chart.webp"
                    alt="Finish chart of 18 stainless steel letter samples: mirror, brushed and antique finishes in silver, titanium gold, rose gold, champagne gold, black titanium, copper and brass"
                    width={1600}
                    height={1280}
                    sizes="(max-width: 1024px) 100vw, 680px"
                    loading="lazy"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-(--dt-muted)">
                  The finish chart from our Etsy listings. Screens shift metal tones, so ask for a photo of the finish you
                  are choosing.
                </figcaption>
              </figure>

              <div className="grid gap-9">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">Metal finishes</h3>
                  <dl className="mt-4 divide-y divide-(--dt-line) border-y border-(--dt-line)">
                    {BACKLIT_FINISH_GROUPS.map((group) => (
                      <div key={group.group} className="grid grid-cols-[84px_1fr] gap-4 py-3 text-sm">
                        <dt className="font-bold text-(--dt-ink)">{group.group}</dt>
                        <dd className="leading-relaxed text-(--dt-muted)">{group.finishes}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">Light colors</h3>
                  <dl className="mt-4 divide-y divide-(--dt-line) border-y border-(--dt-line)">
                    {BACKLIT_LIGHT_OPTIONS.map((option) => (
                      <div key={option.name} className="py-3 text-sm">
                        <dt className="font-bold text-(--dt-ink)">{option.name}</dt>
                        <dd className="mt-1 leading-relaxed text-(--dt-muted)">{option.text}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────── SPECS ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="backlit-specs">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="detail-eyebrow">The details</p>
            <h2 id="backlit-specs" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Backlit sign specifications
            </h2>
            <dl className="mt-8 overflow-hidden rounded-2xl border border-(--dt-line)">
              {BACKLIT_SPECS.map((spec, index) => (
                <div
                  key={spec.label}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4 ${
                    index % 2 === 0 ? "bg-(--dt-blush)" : "bg-white"
                  }`}
                >
                  <dt className="text-sm font-bold text-(--dt-ink)">{spec.label}</dt>
                  <dd className="text-sm leading-relaxed text-(--dt-muted) first-letter:uppercase">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─────────────────────── SIZE & WALL ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20">
          <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-6">
            {/* min-w-0: a grid item is otherwise as wide as the table inside it. */}
            <div className="min-w-0">
              <p className="detail-eyebrow">Sizing</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">What size should a backlit sign be?</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--dt-muted)">
                Size a backlit sign to the wall and the furniture under it. Behind a reception desk, a sign about half to
                three-quarters of the desk width looks balanced. These are starting points, not rules: the mockup shows
                the sign at scale on a photo of your wall.
              </p>
              <div className="detail-table-wrap mt-7">
                <table className="detail-table min-w-[620px]">
                  <caption>Suggested backlit sign width by reception desk width</caption>
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
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-(--dt-muted)">
                In a corridor or walkway, check the depth as well. The{" "}
                <a
                  className="detail-link"
                  href="https://www.ada.gov/law-and-regs/design-standards/2010-stds/"
                  target="_blank"
                  rel="noopener"
                >
                  2010 ADA Standards (section 307.2)
                </a>{" "}
                limit objects mounted between 27 and 80 inches above the floor to 4 inches of projection into a
                circulation path. Ask us to mark the total depth, letters plus gap, on your mockup.
              </p>
            </div>

            <div className="min-w-0">
              <p className="detail-eyebrow">Your wall</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Which walls suit a backlit sign?</h2>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--dt-muted)">
                Matte walls in a light or mid tone give the widest, most even halo. The wall is half of the effect, so
                tell us what yours is made of.
              </p>
              <div className="detail-table-wrap mt-7">
                <table className="detail-table min-w-[680px]">
                  <caption>How a backlit sign looks and mounts on different wall surfaces</caption>
                  <thead>
                    <tr>
                      <th scope="col">Wall</th>
                      <th scope="col">How the halo looks</th>
                      <th scope="col">How we mount it</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BACKLIT_WALL_ROWS.map((row) => (
                      <tr key={row.wall}>
                        <th scope="row">{row.wall}</th>
                        <td>{row.glow}</td>
                        <td>{row.mount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm">
                <Link href="/guides/backlit-sign-wall-surfaces-and-standoffs" className="detail-link">
                  Read the full guide to wall surfaces and standoffs
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* ─────────────────────── COMPARISON ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="backlit-compare">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <p className="detail-eyebrow">Compare</p>
            <h2 id="backlit-compare" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Backlit sign vs front-lit, LED neon and lightbox
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--dt-muted)">
              Choose backlit when the logo should look like metal first and light second. Choose one of the others when
              the sign has to be read from far away, be colorful, or show a picture.
            </p>
            <div className="detail-table-wrap mt-7">
              <table className="detail-table min-w-[820px]">
                <caption>Backlit signs compared with front-lit channel letters, LED neon signs and lightboxes</caption>
                <thead>
                  <tr>
                    <th scope="col">Sign type</th>
                    <th scope="col">Where the light comes from</th>
                    <th scope="col">Look</th>
                    <th scope="col">Best for</th>
                    <th scope="col">Watch out for</th>
                  </tr>
                </thead>
                <tbody>
                  {BACKLIT_COMPARISON.map((row) => (
                    <tr key={row.type} data-current={row.href ? undefined : "true"}>
                      <th scope="row">
                        {row.href ? (
                          <Link href={row.href} className="detail-link">
                            {row.type}
                          </Link>
                        ) : (
                          row.type
                        )}
                      </th>
                      <td>{row.light}</td>
                      <td>{row.look}</td>
                      <td>{row.bestFor}</td>
                      <td>{row.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─────────────────────── HOW TO ORDER ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="backlit-order">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Ordering</p>
              <h2 id="backlit-order" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                How to order a custom backlit sign
              </h2>
              <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
                Six steps, and the first two cost nothing. Every backlit sign is quoted for its own logo and size, so the
                price on an Etsy listing is a placeholder, not your final price.
              </p>
            </div>

            {/* A numbered list because the order is real: each step waits on the one before. */}
            <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {BACKLIT_STEPS.map((step, index) => (
                <li key={step.name} className="border-t-2 border-(--dt-ink) pt-4">
                  <p className="text-sm font-extrabold text-(--dt-accent-ink)">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-extrabold tracking-tight">{step.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--dt-muted)">{step.text}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 max-w-xl">
              <DetailCtaPair subject="custom backlit sign" etsyUrl={BACKLIT_ETSY_URL} source="backlit-order" />
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-(--dt-muted)">
              We make and ship the sign; we do not install it. A local installer mounts it, and a licensed electrician
              makes any hard-wired connection.{" "}
              <Link href="/shipping" className="detail-link">
                Delivery times
              </Link>{" "}
              and the{" "}
              <Link href="/returns" className="detail-link">
                {WARRANTY.term}
              </Link>{" "}
              are set out in full on their own pages.
            </p>
          </div>
        </section>

        {/* ─────────────────────── FAQ ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="backlit-faq">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="detail-eyebrow">Questions</p>
            <h2 id="backlit-faq" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Backlit sign FAQs
            </h2>
            <div className="mt-8 grid gap-3">
              {BACKLIT_FAQS.map((faq, index) => (
                <details
                  key={faq.q}
                  // The first answer starts open: it is the definition, and a
                  // collapsed FAQ gives a skimming visitor nothing to read.
                  open={index === 0}
                  className="group rounded-2xl border border-(--dt-line) bg-white open:border-(--dt-accent-ink)"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left text-base font-bold text-(--dt-ink) [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-bold">{faq.q}</h3>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-(--dt-accent-ink) transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-relaxed text-(--dt-muted)">{faq.a}</p>
                </details>
              ))}
            </div>
            {ETSY_SHOP_URL ? (
              <p className="mt-6 text-sm text-(--dt-muted)">
                Customer reviews are on our{" "}
                <a
                  className="detail-link"
                  href={ETSY_SHOP_URL}
                  target="_blank"
                  rel="noopener"
                  data-meta-source="backlit-faq-etsy-reviews"
                >
                  Etsy shop
                </a>
                , where each one is tied to a real purchase.
              </p>
            ) : null}
          </div>
        </section>

        {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
        <section className="detail-hero py-16 sm:py-20">
          <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Send your logo. See it <span className="backlit-word">lit</span> within 24 hours.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
              The mockup is free and so are the revisions. If you like it, you get a quote for that exact sign, with{" "}
              {DELIVERY.clause} and a {WARRANTY.term}.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <DetailCtaPair subject="custom backlit sign" etsyUrl={BACKLIT_ETSY_URL} source="backlit-closing" />
            </div>
          </div>
        </section>

        {/* ─────────────────────── FURTHER READING ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-white py-14 sm:py-16" aria-labelledby="backlit-reading">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <h2 id="backlit-reading" className="text-2xl font-extrabold tracking-tight">
              Before you decide
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {READING.map((item) => (
                <li key={item.href} className="border-t border-(--dt-line) pt-4">
                  <Link href={item.href} className="detail-link text-base">
                    {item.title}
                  </Link>
                  <p className="mt-1.5 text-sm leading-relaxed text-(--dt-muted)">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
      <DetailStickyCta
        whatsappUrl={generalWhatsapp}
        etsyUrl={BACKLIT_ETSY_URL}
        source="backlit"
      />
    </>
  );
}
