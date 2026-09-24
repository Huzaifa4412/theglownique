import type { Metadata } from "next";
import Link from "next/link";

import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { DELIVERY } from "@/lib/claims";
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { ETSY_SHOP_URL, SITE_URL, SOCIAL_LINKS } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/**
 * About page.
 *
 * Every statement here is one the rest of the site already evidences: what is
 * made (lib/product-catalog.ts), how ordering and payment work, delivery
 * (lib/claims.ts DELIVERY) and that installation is not offered. Who makes the
 * signs, where, and since when are deliberately absent until the owner
 * supplies them (OWNER-QUESTIONS.md) — an About page that invents a founding
 * story is worse for trust than one that does not tell it yet.
 */
// Absolute, so the brand is not repeated by the root title template.
const TITLE = "About The Glownique | Custom LED Neon & Business Signs";
const DESCRIPTION =
  "The Glownique makes custom LED neon signs, 3D metal channel letters, slim lightboxes and acrylic logo signs to order, with a free mockup before you pay.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: TITLE,
    description: DESCRIPTION,
    url: "/about",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom LED neon signs glowing on a dark wall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/hero/neon-sign-hero.png"],
  },
};

const STEPS = [
  {
    title: "Send your idea",
    body: "A logo file, the wording and font you like, or a rough sketch — with the wall or space it is for.",
  },
  {
    title: "Get a free design mockup",
    body: "We draw the sign to scale so you can see the size, colours and backing before anything is made.",
  },
  {
    title: "Agree the quote on WhatsApp",
    body: "The quote covers the sign and its shipping, so the cost is settled before you pay.",
  },
  {
    title: "Approve and pay through Etsy",
    body: "Payment runs through our Etsy shop's checkout; eligible orders are covered by Etsy Purchase Protection.",
  },
  {
    title: "Made to order, then shipped",
    body: `Each sign is built for that order and sent with ${DELIVERY.clause}.`,
  },
] as const;

export default function AboutPage() {
  const pageUrl = `${SITE_URL}/about`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        mainEntity: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "About", item: pageUrl },
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
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <span className="text-[#ce0754]" aria-current="page">About</span>
            </nav>
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">About us</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              About The Glownique
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-[#1e1a22]">
              The Glownique designs and makes custom illuminated signs to order: LED neon signs, 3D metal
              channel letters, slim LED lightboxes and UV-printed acrylic logo signs. Every order starts
              with a free design mockup, is quoted on WhatsApp and is paid through our Etsy shop once you
              have approved the design.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          <section aria-labelledby="what-we-make">
            <h2 id="what-we-make" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              What we make
            </h2>
            <p className="mt-3 leading-relaxed text-[#5e5862]">
              Four kinds of sign, each made to order in the size, colours and wording you choose. Our
              neon is LED neon, not glass.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {PRODUCT_PAGES.map((product) => (
                <li key={product.slug} className="rounded-2xl border border-[#eadfe4] bg-white p-5">
                  <Link href={product.path} className="font-bold text-[#ce0754] hover:underline">
                    {product.name}
                  </Link>
                  <p className="mt-1 text-sm leading-relaxed text-[#5e5862]">{product.tagline}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-[#5e5862]">
              Signs for businesses — storefronts, offices, bars, restaurants, salons and trade shows —
              are grouped under <Link href="/business-signs" className="font-bold text-[#ce0754] hover:underline">business signs</Link>;
              signs for homes, weddings and celebrations under{" "}
              <Link href="/custom-signage" className="font-bold text-[#ce0754] hover:underline">custom signage</Link>.
            </p>
          </section>

          <section aria-labelledby="how-ordering-works" className="mt-14">
            <h2 id="how-ordering-works" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              How ordering works
            </h2>
            <ol className="mt-6 space-y-4">
              {STEPS.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff0f5] font-extrabold text-[#ce0754]" aria-hidden="true">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-[#1e1a22]">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[#5e5862]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm leading-relaxed text-[#5e5862]">
              Timings, packaging and what happens if something arrives damaged are on the{" "}
              <Link href="/shipping" className="font-bold text-[#ce0754] hover:underline">shipping page</Link>; the
              warranty and returns terms are on the{" "}
              <Link href="/returns" className="font-bold text-[#ce0754] hover:underline">returns page</Link>.
            </p>
          </section>

          <section aria-labelledby="installation" className="mt-14">
            <h2 id="installation" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              Do you install signs?
            </h2>
            <p className="mt-3 leading-relaxed text-[#5e5862]">
              No. We make and ship the sign; we do not install it. Indoor signs arrive ready to hang,
              or prepared for the mounting method shown on the mockup. Exterior signs are mounted by a
              local installer, and hard-wired signs are connected by a licensed electrician. If you are
              planning a storefront sign, the{" "}
              <Link href="/guides/front-lit-vs-halo-lit-vs-dual-lit" className="font-bold text-[#ce0754] hover:underline">
                lighting and permits guide
              </Link>{" "}
              covers what a landlord or permit office usually asks for.
            </p>
          </section>

          <section aria-labelledby="find-us" className="mt-14">
            <h2 id="find-us" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              Where to find us
            </h2>
            <p className="mt-3 leading-relaxed text-[#5e5862]">
              We sell through this website and through our Etsy shop, where our customer reviews are
              kept. Our official profiles:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[#5e5862]">
              <li>
                Website: <Link href="/" className="font-bold text-[#ce0754] hover:underline">theglownique.com</Link>
              </li>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.url}>
                  {social.label}:{" "}
                  <a href={social.url} rel="noopener" target="_blank" className="font-bold text-[#ce0754] hover:underline">
                    {social.url === ETSY_SHOP_URL ? "etsy.com/shop/TheGlownique" : social.url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, "")}
                  </a>
                </li>
              ))}
              <li>
                Questions and quotes: <Link href="/contact" className="font-bold text-[#ce0754] hover:underline">contact page</Link>
              </li>
            </ul>
          </section>

          <section aria-labelledby="our-name" className="mt-14">
            <h2 id="our-name" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">
              Our name
            </h2>
            <p className="mt-3 leading-relaxed text-[#5e5862]">
              The Glownique at theglownique.com is a custom sign maker. We are not connected with other
              businesses that use the Glownique name, such as cosmetics, skincare or tanning brands.
            </p>
          </section>

          <section className="mt-16 rounded-3xl border border-[#eadfe4] bg-[#fff0f5] p-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#1e1a22]">Start with a free mockup</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5e5862]">
              Send your logo or wording and see your sign drawn to scale before you decide.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp px-8 py-3.5 text-base"
                label="Get a free mockup"
                productName="custom sign"
              />
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                Buying guides →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
