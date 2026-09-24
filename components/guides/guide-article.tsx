import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { MetaGuideView } from "@/components/analytics/meta-view-trackers";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import type { Guide, GuideBlock } from "@/lib/guides/types";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

const INLINE = /(\*\*[^*]+\*\*|\[\^[a-z0-9-]+\]|\[[^\]]+\]\([^)\s]+\))/g;

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Renders the three inline marks described in lib/guides/types.ts. An unknown
 * citation id throws, so a guide with a broken reference fails the build
 * instead of shipping a claim with no source behind it.
 */
function inline(text: string, guide: Guide): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (!part) return null;
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-bold text-[#1e1a22]">{part.slice(2, -2)}</strong>;
    }
    const cite = part.match(/^\[\^([a-z0-9-]+)\]$/);
    if (cite) {
      const position = guide.sources.findIndex((source) => source.id === cite[1]);
      if (position === -1) throw new Error(`Guide "${guide.slug}" cites unknown source "${cite[1]}".`);
      return (
        <sup key={index} className="ml-0.5 text-[0.7em] font-bold">
          <a href={`#source-${cite[1]}`} className="text-[#ce0754] no-underline hover:underline" aria-label={`Source ${position + 1}`}>
            [{position + 1}]
          </a>
        </sup>
      );
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className = "font-bold text-[#ce0754] underline-offset-2 hover:underline";
      return href.startsWith("/") ? (
        <Link key={index} href={href} className={className}>{label}</Link>
      ) : (
        <a key={index} href={href} rel="noopener" className={className}>{label}</a>
      );
    }
    return part;
  });
}

function Block({ block, guide }: { block: GuideBlock; guide: Guide }) {
  switch (block.type) {
    case "p":
      return <p className="mt-4 leading-relaxed text-[#5e5862]">{inline(block.text, guide)}</p>;
    case "list": {
      const items = block.items.map((item) => (
        <li key={item} className="leading-relaxed">{inline(item, guide)}</li>
      ));
      return block.ordered ? (
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-[#5e5862]">{items}</ol>
      ) : (
        <ul className="mt-4 list-disc space-y-2 pl-5 text-[#5e5862]">{items}</ul>
      );
    }
    case "table":
      return (
        <div className="mt-6">
          <div className="overflow-x-auto rounded-2xl border border-[#eadfe4] shadow-sm">
            <table className="w-full min-w-[560px] text-left text-sm text-[#1e1a22]">
              <caption className="sr-only">{block.caption}</caption>
              <thead className="bg-[#faf7f8] text-xs font-extrabold uppercase tracking-wide">
                <tr>
                  {block.columns.map((column, index) => (
                    <th key={column || index} scope="col" className="border-b border-[#eadfe4] p-4">
                      {column || <span className="sr-only">Item</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfe4]">
                {block.rows.map((row) => (
                  <tr key={row[0]} className="align-top">
                    {row.map((cell, index) =>
                      index === 0 ? (
                        <th key={index} scope="row" className="bg-[#fdfafb] p-4 font-bold">{inline(cell, guide)}</th>
                      ) : (
                        <td key={index} className="p-4 text-[#5e5862]">{inline(cell, guide)}</td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note ? <p className="mt-3 text-xs text-[#5e5862]">{inline(block.note, guide)}</p> : null}
        </div>
      );
    case "callout":
      return (
        <div className="mt-6 rounded-2xl border border-[#eadfe4] bg-[#fdf7f9] p-5">
          {block.title ? <p className="font-bold text-[#1e1a22]">{block.title}</p> : null}
          <p className={`${block.title ? "mt-1" : ""} text-sm leading-relaxed text-[#5e5862]`}>{inline(block.text, guide)}</p>
        </div>
      );
    case "defs":
      return (
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.term} className="rounded-2xl border border-[#eadfe4] bg-white p-5">
              <dt className="font-bold text-[#1e1a22]">{item.term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[#5e5862]">{inline(item.detail, guide)}</dd>
            </div>
          ))}
        </dl>
      );
    case "image":
      return (
        <figure className="mt-6 overflow-hidden rounded-2xl border border-[#eadfe4] bg-[#0b0910]">
          <Image
            src={block.image.src}
            alt={block.image.alt}
            width={block.image.width}
            height={block.image.height}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full"
          />
          {block.image.caption ? (
            <figcaption className="bg-white p-3 text-xs text-[#5e5862]">{block.image.caption}</figcaption>
          ) : null}
        </figure>
      );
  }
}

export function guideJsonLd(guide: Guide) {
  const pageUrl = `${SITE_URL}/guides/${guide.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: guide.h1,
        description: guide.metaDescription,
        datePublished: guide.publishedOn,
        dateModified: guide.updatedOn,
        image: `${SITE_URL}${guide.image.src}`,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: pageUrl,
        ...(guide.sources.length > 0 ? { citation: guide.sources.map((source) => source.url) } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
          { "@type": "ListItem", position: 3, name: guide.h1, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: guide.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };
}

export function GuideArticle({ guide }: { guide: Guide }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(guideJsonLd(guide)) }}
      />
      <MetaGuideView guideName={guide.h1} />
      <AnnouncementBar />
      <ProductTopBar productName={guide.primaryKeyword} />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-14 sm:py-20">
          <div className={`mx-auto max-w-4xl px-4 sm:px-6 ${guide.showHeroImage ? "md:grid md:grid-cols-[1fr_260px] md:gap-8 md:items-center" : ""}`}>
            <div>
              <nav className="mb-4 text-xs font-semibold text-[#5e5862]" aria-label="Breadcrumb">
                <Link href="/" className="hover:underline">Home</Link> &gt;{" "}
                <Link href="/guides" className="hover:underline">Guides</Link> &gt;{" "}
                <span className="text-[#ce0754]" aria-current="page">{guide.hub.category}</span>
              </nav>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">{guide.kicker}</p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">{guide.h1}</h1>
              <p className="mt-5 text-lg leading-relaxed text-[#1e1a22]">{guide.answer}</p>
              <p className="mt-4 text-xs font-semibold text-[#5e5862]">
                Last reviewed {formatDate(guide.updatedOn)}
                {guide.sources.length > 0 ? " · Sources listed at the end of the page" : ""}
              </p>
            </div>
            {guide.showHeroImage ? (
              <figure className="mt-8 overflow-hidden rounded-2xl border border-[#eadfe4] bg-[#0b0910] md:mt-0">
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  width={guide.image.width}
                  height={guide.image.height}
                  sizes="(max-width: 768px) 100vw, 260px"
                  preload
                  className="h-auto w-full"
                />
                {guide.image.caption ? (
                  <figcaption className="bg-white p-3 text-xs text-[#5e5862]">{guide.image.caption}</figcaption>
                ) : null}
              </figure>
            ) : null}
          </div>
        </section>

        <article className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
          {guide.sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id} className="mt-14 first:mt-0">
              <h2 id={section.id} className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">{section.heading}</h2>
              {section.blocks.map((block, index) => (
                <Block key={`${section.id}-${index}`} block={block} guide={guide} />
              ))}
            </section>
          ))}

          {guide.faqs.length > 0 ? (
            <section aria-labelledby="faqs" className="mt-16">
              <h2 id="faqs" className="text-2xl font-extrabold text-[#1e1a22] sm:text-3xl">Common questions</h2>
              <div className="mt-6 space-y-4">
                {guide.faqs.map((faq) => (
                  <div key={faq.q} className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6">
                    <h3 className="text-base font-extrabold text-[#1e1a22]">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-16 rounded-3xl border border-[#eadfe4] bg-[#fff0f5] p-8 text-center">
            <h2 className="text-2xl font-extrabold text-[#1e1a22]">{guide.cta.heading}</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#5e5862]">{guide.cta.text}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <CustomQuoteButton
                className="button button--whatsapp px-8 py-3.5 text-base"
                label={guide.cta.label}
                productName={guide.cta.productName}
              />
              {guide.cta.secondary ? (
                <Link
                  href={guide.cta.secondary.href}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#eadfe4] bg-white px-6 py-3 text-sm font-bold text-[#1e1a22] hover:border-[#f40b68]"
                >
                  {guide.cta.secondary.label} →
                </Link>
              ) : null}
            </div>
          </section>

          {guide.related.length > 0 ? (
            <section aria-labelledby="related" className="mt-16">
              <h2 id="related" className="text-xl font-extrabold text-[#1e1a22]">Keep reading</h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {guide.related.map((item) => (
                  <li key={item.href} className="rounded-2xl border border-[#eadfe4] bg-white p-5">
                    <Link href={item.href} className="font-bold text-[#ce0754] hover:underline">{item.label}</Link>
                    <p className="mt-1 text-sm leading-relaxed text-[#5e5862]">{item.description}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {guide.sources.length > 0 ? (
            <section aria-labelledby="sources-heading" className="mt-16 border-t border-[#eadfe4] pt-8">
              <h2 id="sources-heading" className="text-lg font-extrabold text-[#1e1a22]">Sources</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-xs leading-relaxed text-[#5e5862]">
                {guide.sources.map((source) => (
                  <li key={source.id} id={`source-${source.id}`}>
                    <a href={source.url} rel="noopener" className="text-[#1e1a22] underline-offset-2 hover:underline">
                      {source.title}
                    </a>{" "}
                    — {source.publisher}. Accessed {formatDate(guide.sourcesAccessedOn)}.
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
