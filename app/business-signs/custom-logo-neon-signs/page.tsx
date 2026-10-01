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
import { LEAD_TIME, WARRANTY } from "@/lib/claims";
import { requireProductPage } from "@/lib/product-catalog";
import { ETSY_SHOP_URL, SITE_URL, whatsappQuoteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

import "@/components/detail/detail.css";

/**
 * /business-signs/custom-logo-neon-signs — a business logo made in LED neon.
 *
 * The neon product page (/products/custom-neon-signs) covers the sign type:
 * colours, specs, backboards, the colour studio. This page answers the
 * narrower question a business owner has: can *my logo* be made in neon, what
 * happens to the parts that cannot, and what do I send. It reuses the neon
 * page's backboard data and links there for the rest.
 *
 * Rewritten 2026-10-01. The earlier copy itemised what the warranty covers
 * ("LEDs, power transformers, and craftsmanship"), called the sign
 * energy-efficient and promised "exact" colour matching; the owner has not
 * itemised the warranty and the other two had no evidence, so they are gone.
 */

const PATH = "/business-signs/custom-logo-neon-signs";
const UPDATED_ON = "2026-10-01";
const SOURCE = "logo-neon";
const SUBJECT = "custom logo neon sign";

const neon = requireProductPage("custom-neon-signs");
const ETSY_URL = neon.etsyUrl ?? ETSY_SHOP_URL;

const TITLE = "Custom Business Logo LED Neon Signs";
const DESCRIPTION =
  "Custom logo neon signs for business: your logo redrawn in LED neon, in 13 colors or RGB, on a cut acrylic backboard. Free mockup within 24 hours.";

const ANSWER =
  "A custom logo neon sign is a business logo redrawn as glowing lines of flexible LED neon, mounted on an acrylic backboard cut to its shape. The Glownique traces it from your logo file, shows which parts light up in a free mockup, and makes it in any of 13 colors or RGB.";

// Customer photographs from Etsy orders, not design previews.
const IMAGES: readonly DetailImage[] = [
  {
    src: "/neon-sign/Bar/custom-bar-neon-sign-cocktails.webp",
    alt: "Customer photo of a round pink neon bar logo mounted on the front of a blue-lit bar counter",
    label: "bar logo",
  },
  {
    src: "/neon-sign/Gym/custom-gym-neon-sign-motivational.webp",
    alt: "Customer photo of a green neon gym logo with a barbell outline around the name",
    label: "gym logo",
  },
  {
    src: "/neon-sign/Bar/iap_600x600.7058329985_cpckkkq7.webp",
    alt: "Customer photo of a yellow script neon bar name sign lit on a counter",
    label: "script name",
  },
  {
    src: "/neon-sign/Gym/iap_600x600.6953364134_pc0zxc98.webp",
    alt: "Customer photo of a blue script neon name sign on the wall above a rack of dumbbells",
    label: "wall wordmark",
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
    images: [{ url: OG_IMAGE.src, width: 600, height: 600, alt: OG_IMAGE.alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    images: [OG_IMAGE.src],
  },
};

const STEPS = [
  {
    name: "Send the logo file",
    text: "AI, PDF, SVG or a high-resolution PNG, plus the width you have in mind and where the sign will hang.",
  },
  {
    name: "We trace it into neon",
    text: "Each line of the logo becomes a run of LED neon. Where the logo has fills or fine detail, we show how it will be handled before you commit.",
  },
  {
    name: "You approve the mockup",
    text: "The free mockup comes back within 24 hours and shows size, colors and backboard. Revisions are free and unlimited.",
  },
] as const;

const TRANSLATION_ROWS = [
  {
    part: "Script names and line logos",
    neon: "Works best. One continuous glowing line, the way neon is meant to look.",
    alternative: "",
  },
  {
    part: "Bold block letters",
    neon: "Made as an outline or a double line, so the letter keeps its weight.",
    alternative: "",
  },
  {
    part: "Solid filled shapes",
    neon: "Become outlines: neon is a line, so it cannot fill an area.",
    alternative: "Print the fill on the acrylic and trace it in neon.",
    href: "/business-signs/acrylic-logo-signs",
    label: "Acrylic logo signs",
  },
  {
    part: "Gradients and photographs",
    neon: "Cannot be made in neon.",
    alternative: "UV-print the artwork on acrylic.",
    href: "/business-signs/acrylic-logo-signs",
    label: "Acrylic logo signs",
  },
  {
    part: "A logo that should look like metal",
    neon: "Neon reads as light, not as a material.",
    alternative: "Stainless-steel letters with a halo behind them.",
    href: "/business-signs/backlit-signs",
    label: "Backlit signs",
  },
  {
    part: "Small taglines",
    neon: "Enlarged until the letters can be formed, or left out.",
    alternative: "Print the tagline on the backboard.",
  },
] as const;

const USES = [
  {
    title: "Bars and restaurants",
    text: "The logo on the bar front or the back wall, in the color of the room. It ends up in every photo guests take.",
    image: IMAGES[0],
    href: "/business-signs/bar-signs",
    linkLabel: "Bar signs",
  },
  {
    title: "Gyms and studios",
    text: "A logo with an icon, such as a barbell around the name, holds up well as an outline and reads across a training floor.",
    image: IMAGES[1],
    href: "/business-signs/gym-fitness-signs",
    linkLabel: "Gym and fitness signs",
  },
  {
    title: "A name in script",
    text: "A script wordmark is the simplest logo to make in neon: one color, one line, on a backboard cut to the letters. It suits salons, shops and offices as well as bars.",
    image: IMAGES[2],
    href: "/business-signs/salon-spa-signs",
    linkLabel: "Salon and spa signs",
  },
] as const;

const FAQS = [
  { q: "What is a custom logo neon sign?", a: ANSWER },
  {
    q: "Can any logo be made into a neon sign?",
    a: "Most can, with one rule: neon is a line of light, so it draws outlines and cannot fill solid areas, gradients or photographs. Script names and line logos translate directly. Filled shapes become outlines, or are printed on the acrylic and traced in neon. The free mockup shows exactly how your logo will look before you pay.",
  },
  {
    q: "What file should I send for a logo neon sign?",
    a: "A vector file is best: AI, PDF or SVG. A high-resolution PNG also works. If you only have a photo or a screenshot of the logo, send it anyway and we will redraw it for the mockup.",
  },
  {
    q: "Can you match my brand colors?",
    a: "LED neon comes in 13 solid colors plus RGB color-changing, so the glow is matched to the nearest of those. Printed and acrylic parts are matched as closely as the materials allow to a Pantone, HEX or CMYK reference. Send your brand guide with the logo.",
  },
  {
    q: "Is LED neon suitable for a shop, salon or office?",
    a: "Yes. It runs on low-voltage 12V from a plug-in adaptor, has no glass tubes and comes with a remote that dims it. Indoor signs are the standard build; tell us if the sign is going outdoors, because that is a different build.",
  },
  {
    q: "How long does a logo neon sign take?",
    a: `The free mockup comes back within 24 hours. After you approve it, the sign takes ${LEAD_TIME.neonProductionDays.replace("-", " to ")} to make and ${LEAD_TIME.transit.replace("-", " to ")} to deliver, free and tracked. Rush orders cost nothing extra: tell us your opening date.`,
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
        name: "Custom Logo Neon Sign",
        alternateName: ["Business logo neon sign", "LED neon logo sign"],
        description: ANSWER,
        image: IMAGES.map((image) => absolute(image.src)),
        category: "Business signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        manufacturer: { "@id": `${SITE_URL}/#organization` },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Custom Logo Neon Signs", item: pageUrl },
        ],
      },
      {
        "@type": "HowTo",
        name: "How to turn a business logo into a neon sign",
        step: STEPS.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
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

export default function CustomLogoNeonSignsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <MetaViewContent contentId="custom-logo-neon-signs" contentName="Custom Logo Neon Signs" contentCategory="Business signage" />
      <AnnouncementBar />
      <ProductTopBar productName={SUBJECT} />

      <main id="main-content" className="detail-page" style={{ "--dt-accent": neon.accent } as CSSProperties}>
        <DetailHero
          crumbs={[{ href: "/business-signs", label: "Business Signs" }, { label: "Custom Logo Neon Signs" }]}
          eyebrow="Logo neon signs"
          title="Custom Logo Neon Signs for Business"
          lede="Your logo redrawn in LED neon and mounted on acrylic cut to its shape."
          checks={["13 colors plus RGB", "Dimmer remote included", WARRANTY.term, "Free mockup within 24 hours"]}
          images={IMAGES}
          galleryLabel="Logo neon sign pictures"
          subject={SUBJECT}
          etsyUrl={ETSY_URL}
          source={SOURCE}
        />
        <DetailTrustStrip />

        {/* ─────────────────────── DIRECT ANSWER ─────────────────────── */}
        <section className="bg-white py-14 sm:py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">What is a custom logo neon sign?</h2>
            <p className="mt-4 text-lg leading-relaxed text-(--dt-ink)">{ANSWER}</p>
            <p className="mt-4 text-base leading-relaxed text-(--dt-muted)">
              Colors, sizes and full specifications are on the{" "}
              <Link href={neon.path} className="detail-link">
                custom LED neon signs
              </Link>{" "}
              page. This page is about the logo: what translates into neon, what does not, and what to send.
            </p>
            <p className="mt-5 text-sm text-(--dt-muted)">
              Updated <time dateTime={UPDATED_ON}>October 1, 2026</time>. Pictures are customer photos of signs we made.
            </p>
          </div>
        </section>

        {/* ─────────────────────── STEPS ─────────────────────── */}
        <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="logo-steps">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">How it works</p>
              <h2 id="logo-steps" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                How a logo becomes a neon sign
              </h2>
            </div>
            {/* A numbered list because the order is real: each step waits on the one before. */}
            <ol className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <li key={step.name} className="border-t-2 border-(--dt-ink) pt-4">
                  <p className="text-sm font-extrabold text-(--dt-accent-ink)">Step {index + 1}</p>
                  <h3 className="mt-1 text-lg font-extrabold tracking-tight">{step.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-(--dt-muted)">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─────────────────────── WHAT TRANSLATES ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="logo-translate">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <p className="detail-eyebrow">Your logo</p>
            <h2 id="logo-translate" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Which parts of a logo work in neon?
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-(--dt-muted)">
              Neon is a line of light. Anything in your logo that is a line translates directly; anything that is a
              filled area, a gradient or very small needs a decision. This table shows what we do with each.
            </p>
            <div className="detail-table-wrap mt-7">
              <table className="detail-table min-w-[720px]">
                <caption>How each part of a logo is handled in LED neon</caption>
                <thead>
                  <tr>
                    <th scope="col">Part of the logo</th>
                    <th scope="col">In LED neon</th>
                    <th scope="col">A better option</th>
                  </tr>
                </thead>
                <tbody>
                  {TRANSLATION_ROWS.map((row) => (
                    <tr key={row.part}>
                      <th scope="row">{row.part}</th>
                      <td>{row.neon}</td>
                      <td>
                        {row.alternative || "None needed"}
                        {"href" in row ? (
                          <>
                            {" "}
                            <Link href={row.href} className="detail-link">
                              {row.label}
                            </Link>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─────────────────────── BACKBOARDS ───────────────────────
            The same three cuts, in the same words, as the neon product page:
            read from the catalog so the two cannot disagree. */}
        {neon.backings ? (
          <section className="border-t border-(--dt-line) bg-(--dt-blush) py-14 sm:py-20" aria-labelledby="logo-backboard">
            <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
              <div className="max-w-2xl">
                <p className="detail-eyebrow">The backboard</p>
                <h2 id="logo-backboard" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Three ways to cut the acrylic behind a logo
                </h2>
              </div>
              <div className="mt-8 overflow-x-auto rounded-[20px] border border-(--dt-line) bg-(--dt-night)">
                <Image
                  src={neon.backings.image}
                  alt={neon.backings.imageAlt}
                  width={1921}
                  height={819}
                  sizes="(max-width: 640px) 640px, (max-width: 1360px) 100vw, 1320px"
                  loading="lazy"
                  className="h-auto w-full min-w-[640px]"
                />
              </div>
              <ul className="mt-8 grid gap-x-8 gap-y-8 md:grid-cols-3">
                {neon.backings.items.map((backing) => (
                  <li key={backing.name} className="border-t-2 border-(--dt-ink) pt-5">
                    <h3 className="text-lg font-extrabold tracking-tight">{backing.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-(--dt-muted)">{backing.text}</p>
                    <p className="mt-3 text-sm font-semibold text-(--dt-ink)">
                      Best for: <span className="font-normal text-(--dt-muted)">{backing.bestFor}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {/* ─────────────────────── USES ─────────────────────── */}
        <section className="bg-white py-14 sm:py-20" aria-labelledby="logo-uses">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
            <div className="max-w-2xl">
              <p className="detail-eyebrow">Where it goes</p>
              <h2 id="logo-uses" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Logo neon signs by business
              </h2>
            </div>
            <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
              {USES.map((use) => (
                <article key={use.title} className="grid content-start gap-4">
                  <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[20px] bg-(--dt-night)">
                    <Image
                      src={use.image.src}
                      alt={use.image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 420px"
                      loading="lazy"
                      className="object-cover"
                    />
                  </div>
                  {/* Both ways to buy, directly under the picture. */}
                  <DetailCtaPair
                    subject={`${SUBJECT} for ${use.title.toLowerCase()}`}
                    etsyUrl={ETSY_URL}
                    source={`${SOURCE}-${use.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  />
                  <div>
                    <h3 className="text-xl font-extrabold tracking-tight">{use.title}</h3>
                    <p className="mt-2 text-base leading-relaxed text-(--dt-muted)">{use.text}</p>
                    <p className="mt-3 text-sm">
                      <Link href={use.href} className="detail-link">
                        {use.linkLabel}
                      </Link>
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <p className="mt-10 text-sm text-(--dt-muted)">
              Working out a budget?{" "}
              <Link href="/guides/custom-business-sign-cost" className="detail-link">
                What a custom business sign costs
              </Link>{" "}
              explains what drives the price of each sign type.
            </p>
          </div>
        </section>

        <DetailFaq heading="Logo neon sign FAQs" faqs={FAQS} />
        <DetailClosing heading="Send your logo. See it in neon within 24 hours." subject={SUBJECT} etsyUrl={ETSY_URL} source={SOURCE} />
      </main>

      <SiteFooter />
      <DetailStickyCta whatsappUrl={whatsappQuoteUrl(SUBJECT)} etsyUrl={ETSY_URL} source={SOURCE} />
    </>
  );
}
