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
  title: "Custom Ultra-Thin Lightbox & LED Signs",
  description:
    "Custom edge-lit LED lightbox signs & slim backlit displays for retail storefronts, restaurant menus and events. Free mockup & 5-year warranty.",
  alternates: { canonical: "/business-signs/lightbox-signs" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Custom Ultra-Thin Lightbox & LED Signs | The Glownique",
    description:
      "Commercial edge-lit lightboxes for retail storefronts, restaurant menu boards and promotional backlit displays.",
    url: "/business-signs/lightbox-signs",
    images: [{ url: "/ultra-thin-slim-lightbox/main-hero.webp", alt: "Ultra-Thin Lightbox Sign" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Ultra-Thin Lightbox & LED Signs | The Glownique",
    description:
      "Commercial edge-lit lightboxes for retail displays, menu boards and promotional signage.",
    images: ["/ultra-thin-slim-lightbox/main-hero.webp"],
  },
};

const lightboxFaqs = [
  {
    q: "How thin is an ultra-thin LED lightbox sign?",
    a: "Our slim commercial lightboxes have an overall profile under 1 inch (~25mm) deep. They sit virtually flush against interior walls or suspend cleanly in storefront window displays without bulky enclosures.",
  },
  {
    q: "How does edge-lit LED illumination prevent hotspots?",
    a: "We mount high-density SMD LEDs along the precision-extruded aluminum frame, directing light into an optical-grade acrylic light-guide panel (LGP) with micro-laser etched dot matrices for 100% uniform, shadow-free backlighting.",
  },
  {
    q: "How do you change promotional graphics or restaurant menus?",
    a: "Our lightboxes feature tool-free front-loading snap frames or magnetic front covers. Simply flip open the four edges, insert a new backlit film poster, and snap the frame shut in under 60 seconds.",
  },
  {
    q: "Can lightbox signs be mounted double-sided in storefront windows?",
    a: "Yes. We offer both single-sided wall-mount models and double-sided ceiling-hung lightboxes equipped with aircraft cable suspension systems for dual-facing retail window visibility.",
  },
];

export default function LightboxSignsPage() {
  const pageUrl = `${SITE_URL}/business-signs/lightbox-signs`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: "Ultra-Thin Lightbox Signs",
        description:
          "Ultra-thin anodized aluminum lightbox signs featuring edge-lit LED illumination for vibrant, shadow-free commercial display graphics.",
        image: `${SITE_URL}/ultra-thin-slim-lightbox/main-hero.webp`,
        category: "Commercial Display Signage",
        brand: { "@type": "Brand", name: "The Glownique" },
        url: pageUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Business Signs", item: `${SITE_URL}/business-signs` },
          { "@type": "ListItem", position: 3, name: "Ultra-Thin Lightbox Signs", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: lightboxFaqs.map((faq) => ({
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
        contentId="lightbox-signs"
        contentName="Ultra-Thin Lightbox Signs"
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName="ultra-thin lightbox sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href="/business-signs" className="hover:underline">Business Signs</Link> &gt;{" "}
              <span className="text-[#ce0754]">Lightbox Signs</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              Retail &amp; Menu Display Signage
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Custom Lightbox Signs &amp; Ultra-Thin Displays
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              Sleek, tool-free graphic lightboxes designed for vibrant retail windows, restaurant menu displays, and trade show promotions.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label="Get a Lightbox Quote"
                productName="ultra-thin lightbox sign"
              />
              <Link
                href="/products/ultra-thin-lightbox"
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3.5 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
              >
                View Lightbox Catalog Specs →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src="/ultra-thin-slim-lightbox/main-hero.webp"
                  alt="Ultra-thin lightbox sign in beauty reception"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-extrabold text-[#1e1a22]">
                  Sleek Profile &amp; Easy Graphic Swaps
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  Traditional heavy cabinet lightboxes are bulky and cumbersome to update. Our slim edge-lit aluminum lightboxes combine architectural elegance with effortless maintenance.
                </p>

                <ul className="space-y-3 text-sm font-medium text-[#1e1a22]">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563eb]">✓</span>
                    <span><strong>Slim Anodized Aluminum Frame:</strong> Ultra-thin depth sits flush on walls or hangs in window displays.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563eb]">✓</span>
                    <span><strong>Uniform Edge-Lit Diffusion:</strong> High-density LEDs provide continuous, shadow-free backlighting.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563eb]">✓</span>
                    <span><strong>Snap-Frame Graphic Replacement:</strong> Swap promotional posters and seasonal menu graphics in under a minute.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Applications */}
        <section className="border-t border-[#eadfe4] bg-[#faf7f8] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-10">
              Commercial Lightbox Sign Applications
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Retail Windows</h3>
                <p className="mt-2 text-xs text-[#5e5862]">High-contrast window-hung backlit displays that capture pedestrian attention 24/7.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Menu Boards</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Evenly lit, easy-to-read overhead food and beverage menus with quick seasonal swaps.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Trade Shows</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Lightweight, ultra-portable illuminated graphic booths and modular display stands.</p>
              </div>
              <div className="rounded-2xl border border-[#eadfe4] bg-white p-6 shadow-sm">
                <h3 className="font-extrabold text-[#1e1a22]">Lobby Displays</h3>
                <p className="mt-2 text-xs text-[#5e5862]">Wayfinding directories, corporate partner walls and premium art feature frames.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="border-t border-[#eadfe4] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-extrabold text-center text-[#1e1a22] mb-8">
              Commercial Lightbox FAQs
            </h2>
            <div className="space-y-4">
              {lightboxFaqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6">
                  <h3 className="text-base font-extrabold text-[#1e1a22]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
