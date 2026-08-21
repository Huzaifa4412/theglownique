import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact/contact-form";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { StoreIcon } from "@/components/storefront/store-icon";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { HAS_ADDRESS, HAS_EMAIL, HAS_PHONE, LEGAL } from "@/lib/legal";
import {
  ETSY_SHOP_URL,
  HAS_WHATSAPP,
  SITE_URL,
  WHATSAPP_NUMBER,
  formatWhatsappDisplayNumber,
  whatsappQuoteUrl,
} from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

export const metadata: Metadata = {
  // Kept short: the root layout appends " | The Glownique", and the pair has to
  // survive SERP truncation.
  title: "Contact Us — Custom Sign Quotes & Support",
  description:
    "Contact The Glownique about a custom LED neon or business sign quote, an existing Etsy order, or a 5-year warranty claim. Free mockups, replies within one working day, 7 days a week.",
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Contact The Glownique | Custom Sign Quotes & Support",
    description:
      "Send your idea, logo or sketch and get a free mockup and a no-obligation quote. Order help and 5-year warranty claims handled here too.",
    url: "/contact",
    locale: "en_US",
    images: [
      {
        url: "/hero/neon-sign-hero.png",
        width: 1200,
        height: 630,
        alt: "Contact The Glownique about a custom LED neon sign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact The Glownique | Custom Sign Quotes & Support",
    description:
      "Free mockups and no-obligation quotes on custom LED neon and business signage. Replies within one working day.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

const pageUrl = `${SITE_URL}/contact`;

/**
 * Contact-specific questions, not a duplicate of the homepage FAQ. These answer
 * "how do I reach them / what happens next", which is the intent behind a
 * contact-page query and the shape an AI assistant can quote directly.
 */
const contactFaqs = [
  {
    q: "How do I get a quote for a custom sign?",
    a: "Send your words, logo or a rough sketch through the enquiry form on this page, or message us on WhatsApp. We reply with a free colour-matched digital mockup and a no-obligation quote — there is no charge and no commitment until you approve the design.",
  },
  {
    q: "How quickly does The Glownique reply?",
    a: "We aim to answer every enquiry within one working day, and support runs 7 days a week. Mockups usually come back within a couple of hours during our support window. If you are working to a deadline, say so in your first message and we will tell you honestly whether it is achievable.",
  },
  {
    q: "What is the fastest way to contact The Glownique?",
    a: "WhatsApp. It lets you send photos, sketches and voice notes in one thread, and it is where our design team works, so a mockup can come straight back into the same conversation.",
  },
  {
    q: "Where do I check the status of an existing order?",
    a: "Orders are paid and tracked through our verified Etsy shop, so your order status and tracking number live in your Etsy account and confirmation emails. For anything Etsy cannot answer, message us with your order number and we will check production for you.",
  },
  {
    q: "How do I make a warranty claim?",
    a: "Choose the warranty option in the enquiry form and send your Etsy order number with a photo or short video of the fault. Every sign carries a 5-year warranty and our 100% glow guarantee — see the returns and warranty page for what is covered.",
  },
  {
    q: "Do you work with businesses outside your home country?",
    a: "Yes. We ship worldwide with tracked delivery and regularly work with cafés, salons, gyms, studios and event companies internationally. Tell us your delivery country in the form so we can confirm power fitting and lead time for your region.",
  },
  {
    q: "Can I send you my logo or artwork?",
    a: "Yes, and it helps. A browser cannot attach a file to a WhatsApp message for you, so submit the form first and then drop your logo, artwork or reference photo straight into the chat that opens. Vector files are ideal, but a phone photo of a sketch is enough to start.",
  },
];

/** Routing table, rendered on the page and reused as its own summary. */
const routes = [
  {
    need: "A new sign or a price",
    channel: "Enquiry form → WhatsApp",
    detail: "Free mockup and a no-obligation quote",
  },
  {
    need: "An order already placed",
    channel: "Etsy account, then us",
    detail: "Tracking lives in Etsy; we check production",
  },
  {
    need: "A fault or warranty claim",
    channel: "Enquiry form → WhatsApp",
    detail: "Order number plus a photo or short video",
  },
  {
    need: "Trade, bulk or multi-site",
    channel: "Enquiry form → WhatsApp",
    detail: "Quantities and locations get you trade pricing",
  },
];

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${pageUrl}#contactpage`,
        url: pageUrl,
        name: "Contact The Glownique",
        description:
          "Contact The Glownique about a custom LED neon or business sign quote, an existing order, or a 5-year warranty claim.",
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: `${SITE_URL}/hero/neon-sign-hero.png`,
      },
      // Same @id as the Organization declared in the root layout, so consumers
      // merge these contact properties into that one entity rather than reading
      // a second, competing organisation.
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        url: SITE_URL,
        // Only channels that actually exist are published. An invented phone
        // number or support email in structured data is worse than none.
        contactPoint: [
          ...(HAS_WHATSAPP
            ? [
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: `+${WHATSAPP_NUMBER}`,
                  url: pageUrl,
                  areaServed: "Worldwide",
                  availableLanguage: ["English"],
                },
              ]
            : []),
          ...(HAS_EMAIL
            ? [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: LEGAL.email,
                  url: pageUrl,
                  areaServed: "Worldwide",
                  availableLanguage: ["English"],
                },
              ]
            : []),
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: contactFaqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
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
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />

      <main id="main-content" className="bg-white">
        {/* Hero */}
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <nav
              className="mb-4 text-xs font-semibold text-[#5e5862]"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:underline">
                Home
              </Link>{" "}
              &gt; <span className="text-[#ce0754]">Contact</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Talk to a human
            </p>
            <h1 className="mt-2 max-w-3xl text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Contact The Glownique
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Whether you&apos;re sizing up an idea, chasing an order or making a
              warranty claim, we&apos;d rather you asked than guessed. Send the
              details below and we&apos;ll come back with a free mockup, a real
              price and an honest lead time.
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                ["Response time", "Within 1 working day"],
                ["Support", LEGAL.supportHours],
                ["Quotes & mockups", "Free, no obligation"],
              ].map(([term, value]) => (
                <div
                  key={term}
                  className="rounded-2xl border border-[#eadfe4] bg-white px-4 py-3"
                >
                  <dt className="text-[11px] font-extrabold uppercase tracking-widest text-[#6b6570]">
                    {term}
                  </dt>
                  <dd className="mt-1 text-sm font-bold text-[#1e1a22]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1e1a22] px-6 py-3.5 text-sm font-bold text-white! transition-colors hover:bg-[#000]"
                // text-white needs the important modifier here. globals.css sets
                // `a { color: inherit }` OUTSIDE any cascade layer, and unlayered CSS
                // beats layered CSS whatever the specificity — so a plain `text-white`
                // utility loses and this button renders #1e1a22 on #1e1a22, invisible.
              >
                Start an enquiry ↓
              </a>
              {HAS_WHATSAPP && (
                <a
                  href={whatsappQuoteUrl("custom sign")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-meta-source="contact-page-hero-whatsapp"
                  className="button button--whatsapp inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold"
                >
                  <StoreIcon name="WhatsappLogo" />
                  Message us on WhatsApp
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Channels */}
        <section className="border-b border-[#f2e7ec] py-14 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1e1a22] sm:text-3xl">
              How to reach us
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5e5862]">
              Every channel below reaches the same small team. WhatsApp is the
              fastest because designs, photos and mockups all live in one thread.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {HAS_WHATSAPP && (
                <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                  <h3 className="text-lg font-extrabold text-[#1e1a22]">
                    WhatsApp — fastest
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
                    Send words, a logo or even a rough sketch. Whatever you have
                    is enough to start, and the mockup comes back in the same
                    chat.
                  </p>
                  <p className="mt-3 text-sm font-bold text-[#1e1a22]">
                    {formatWhatsappDisplayNumber()}
                  </p>
                  <a
                    href={whatsappQuoteUrl("custom sign")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-meta-source="contact-page-channel-whatsapp"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ce0754] hover:underline"
                  >
                    Open a chat →
                  </a>
                </div>
              )}

              {ETSY_SHOP_URL && (
                <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                  <h3 className="text-lg font-extrabold text-[#1e1a22]">
                    Etsy — orders, tracking & reviews
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
                    Payments run through our verified Etsy shop, so order status,
                    tracking numbers and buyer reviews all live there. Etsy
                    messages reach us too.
                  </p>
                  <a
                    href={ETSY_SHOP_URL}
                    target="_blank"
                    rel="noopener"
                    data-meta-source="contact-page-channel-etsy"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#ce0754] hover:underline"
                  >
                    Visit The Glownique on Etsy →
                  </a>
                </div>
              )}

              {HAS_EMAIL && (
                <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                  <h3 className="text-lg font-extrabold text-[#1e1a22]">
                    Email
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
                    Best for purchase orders, invoices and anything that needs a
                    paper trail.
                  </p>
                  <a
                    href={`mailto:${LEGAL.email}`}
                    className="mt-4 inline-flex text-sm font-bold text-[#ce0754] hover:underline"
                  >
                    {LEGAL.email}
                  </a>
                </div>
              )}

              {HAS_PHONE && (
                <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                  <h3 className="text-lg font-extrabold text-[#1e1a22]">
                    Phone
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
                    Available {LEGAL.supportHours.toLowerCase()}.
                  </p>
                  <a
                    href={`tel:${LEGAL.phone.replace(/\s+/g, "")}`}
                    className="mt-4 inline-flex text-sm font-bold text-[#ce0754] hover:underline"
                  >
                    {LEGAL.phone}
                  </a>
                </div>
              )}

              {HAS_ADDRESS && (
                <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                  <h3 className="text-lg font-extrabold text-[#1e1a22]">
                    Address
                  </h3>
                  <address
                    className="mt-2 text-sm not-italic leading-relaxed text-[#5e5862]"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {LEGAL.address}
                  </address>
                </div>
              )}
            </div>

            {/* Routing table — answers "who do I ask about what" in one glance */}
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Which contact route to use for each kind of enquiry
                </caption>
                <thead>
                  <tr className="border-b border-[#eadfe4]">
                    <th scope="col" className="py-3 pr-4 font-extrabold text-[#1e1a22]">
                      What you need
                    </th>
                    <th scope="col" className="py-3 pr-4 font-extrabold text-[#1e1a22]">
                      Best route
                    </th>
                    <th scope="col" className="py-3 font-extrabold text-[#1e1a22]">
                      What to send
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((row) => (
                    <tr key={row.need} className="border-b border-[#f2e7ec]">
                      <th
                        scope="row"
                        className="py-3 pr-4 font-bold text-[#1e1a22]"
                      >
                        {row.need}
                      </th>
                      <td className="py-3 pr-4 text-[#5e5862]">{row.channel}</td>
                      <td className="py-3 text-[#5e5862]">{row.detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Form + guidance */}
        <section className="bg-[#fbf8f9] py-14 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start">
            <ContactForm />

            <aside className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                <h2 className="text-lg font-extrabold text-[#1e1a22]">
                  What to include
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
                  You don&apos;t need all of it — but each one removes a
                  round-trip and gets your quote back faster.
                </p>
                <ul className="mt-4 space-y-3 text-sm text-[#5e5862]">
                  {[
                    "The exact wording, or your logo file",
                    "Rough width in inches or centimetres",
                    "Indoor or outdoor, and what the wall is made of",
                    "A colour, brand HEX or Pantone if you have one",
                    "The date you need it by",
                    "A photo of the space, if you have one handy",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span aria-hidden="true" className="font-bold text-[#ce0754]">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                <h2 className="text-lg font-extrabold text-[#1e1a22]">
                  What happens next
                </h2>
                <ol className="mt-4 space-y-4 text-sm text-[#5e5862]">
                  {[
                    [
                      "We read it and ask anything missing",
                      "Usually within one working day.",
                    ],
                    [
                      "You get a free mockup and a quote",
                      "Colour-matched, with no obligation to proceed.",
                    ],
                    [
                      "You approve, then we build",
                      "Most signs are handcrafted in around 10–15 days.",
                    ],
                    [
                      "Tracked delivery to your door",
                      "Backed by a 5-year warranty and our glow guarantee.",
                    ],
                  ].map(([title, detail], index) => (
                    <li key={title} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fff0f5] text-xs font-extrabold text-[#ce0754]"
                      >
                        {index + 1}
                      </span>
                      <span>
                        <strong className="block font-bold text-[#1e1a22]">
                          {title}
                        </strong>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6">
                <h2 className="text-lg font-extrabold text-[#1e1a22]">
                  Before you write
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-[#5e5862]">
                  <li>
                    <Link
                      href="/guides/custom-business-sign-cost"
                      className="font-semibold text-[#ce0754] hover:underline"
                    >
                      What a custom business sign costs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/shipping"
                      className="font-semibold text-[#ce0754] hover:underline"
                    >
                      Delivery times and shipping
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/returns"
                      className="font-semibold text-[#ce0754] hover:underline"
                    >
                      Returns and the 5-year warranty
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/custom-signage"
                      className="font-semibold text-[#ce0754] hover:underline"
                    >
                      Browse sign types and specs
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        {/* FAQs — the visible copy behind the FAQPage markup above */}
        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#1e1a22] sm:text-3xl">
              Contact questions, answered
            </h2>
            <div className="mt-8 divide-y divide-[#f2e7ec] border-y border-[#f2e7ec]">
              {contactFaqs.map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-bold text-[#1e1a22]">
                    <h3 className="inline">{item.q}</h3>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-[#5e5862]">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-10 text-sm leading-relaxed text-[#5e5862]">
              Still not sure what you need? Say so in the form — describing the
              problem is enough. We&apos;ve turned napkin sketches, phone photos
              and half-finished ideas into signs plenty of times.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
