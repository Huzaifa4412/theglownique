import Image from "next/image";
import Link from "next/link";

import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { landingPath, type LandingPage } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/**
 * The one renderer behind every category landing page: the eight B2B pages
 * under /business-signs and the consumer collections under /custom-signage.
 *
 * The route files are deliberately thin — metadata plus a call to this — so the
 * pages cannot drift apart in structure or schema the way four hand-copied
 * sibling pages already have. Content lives in lib/industry-pages.ts and
 * lib/collection-pages.ts; the shape they share is in lib/landing-pages.ts.
 *
 * Schema is CollectionPage rather than Product: these pages sell a category to
 * an audience, they do not describe one purchasable item. The ItemList names
 * the sign types that suit that audience and points at the four product pages,
 * which is also the internal link structure the cluster needs to rank.
 */
export function LandingPageView({ page }: { page: LandingPage }) {
  const pageUrl = `${SITE_URL}${landingPath(page)}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.h1,
        description: page.metaDescription,
        publisher: { "@id": `${SITE_URL}/#organization` },
        primaryImageOfPage: `${SITE_URL}${page.heroImage}`,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#signtypes`,
        name: `Sign types for ${page.name.toLowerCase()}`,
        itemListElement: page.materials.map((material, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: material.name,
          url: `${SITE_URL}${material.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: page.parent.label, item: `${SITE_URL}${page.parent.href}` },
          { "@type": "ListItem", position: 3, name: page.name, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
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
        contentId={page.slug}
        contentName={page.name}
        contentCategory="Business signage"
      />
      <AnnouncementBar />
      <ProductTopBar productName={page.quoteProductName} />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#dcd6ce] bg-gradient-to-b from-[#efe9e0] to-white py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
              <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
              <Link href={page.parent.href} className="hover:underline">{page.parent.label}</Link> &gt;{" "}
              <span className="text-[#8f2347]">{page.name}</span>
            </nav>

            <p className="text-xs font-extrabold uppercase tracking-widest text-[#8f2347]">
              {page.kicker}
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-[#282421] sm:text-5xl">
              {page.h1}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862] sm:text-lg">
              {page.intro}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label={page.quoteLabel}
                productName={page.quoteProductName}
              />
              <Link
                href={page.parent.href}
                className="inline-flex items-center gap-2 rounded-xl border border-[#dcd6ce] bg-white px-6 py-3.5 text-sm font-bold text-[#282421] hover:border-[#a92d56]"
              >
                All {page.parent.label} →
              </Link>
            </div>
          </div>
        </section>

        {/* Which sign type suits this industry — and the links that build the cluster. */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/5 shadow-lg">
                <Image
                  src={page.heroImage}
                  alt={page.heroAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-[#282421]">
                  Which Sign Type Fits
                </h2>
                <p className="text-sm leading-relaxed text-[#5e5862]">
                  We make four sign types, and they are not interchangeable. These are the ones that
                  suit this environment, and why.
                </p>

                <ul className="space-y-4">
                  {page.materials.map((material) => (
                    <li key={material.href}>
                      <Link
                        href={material.href}
                        className="group block rounded-2xl border border-[#dcd6ce] bg-[#fdfafb] p-4 transition-colors hover:border-[#a92d56]"
                      >
                        <span className="text-sm font-extrabold text-[#282421] group-hover:text-[#8f2347]">
                          {material.name} →
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-[#5e5862]">
                          {material.why}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The environment-specific guidance that separates this page from the hub. */}
        <section className="border-t border-[#dcd6ce] bg-[#faf7f8] py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-3 text-center text-3xl font-semibold text-[#282421]">
              What Changes in This Environment
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-[#5e5862]">
              The specification decisions that are worth making before fabrication, because they are
              expensive or impossible to change afterwards.
            </p>
            <div className="grid gap-6 sm:grid-cols-2">
              {page.considerations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#dcd6ce] bg-white p-6 shadow-sm"
                >
                  <h3 className="text-base font-extrabold text-[#282421]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-3xl font-semibold text-[#282421]">
              Where These Signs Go
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {page.applications.map((application) => (
                <div
                  key={application.name}
                  className="rounded-2xl border border-[#dcd6ce] bg-white p-6 shadow-sm"
                >
                  <h3 className="font-extrabold text-[#282421]">{application.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#5e5862]">{application.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#dcd6ce] bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="mb-8 text-center text-3xl font-semibold text-[#282421]">
              {page.name} FAQs
            </h2>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[#dcd6ce] bg-[#fdfafb] p-6">
                  <h3 className="text-base font-extrabold text-[#282421]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#dcd6ce] bg-gradient-to-b from-white to-[#efe9e0] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-semibold text-[#282421]">
              Send Us the Wall
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#5e5862]">
              A photo of the space and a rough size is enough to start. We come back with a free
              design mockup, and every sign we make carries a 5-year warranty.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp text-base px-8 py-3.5"
                label={page.quoteLabel}
                productName={page.quoteProductName}
              />
              <Link
                href={page.footerLink.href}
                className="inline-flex items-center gap-2 rounded-xl border border-[#dcd6ce] bg-white px-6 py-3.5 text-sm font-bold text-[#282421] hover:border-[#a92d56]"
              >
                {page.footerLink.label} →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
