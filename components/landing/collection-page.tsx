import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { MetaViewContent } from "@/components/analytics/meta-view-trackers";
import { Reveal } from "@/components/landing/reveal";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { landingPath, type CollectionPage } from "@/lib/landing-pages";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/**
 * The renderer behind every consumer collection under /custom-signage.
 *
 * It deliberately does NOT share a template with the B2B industry pages in
 * components/landing/landing-page.tsx. Those pages sell a specification to a
 * facilities buyer and lead with which sign type fits; these sell an occasion
 * to a person, who decides from photographs of rooms like theirs. So the
 * anatomy here is image-first — a dark hero the sign glows against, then the
 * gallery, then the buying guidance — and each page carries the accent colour
 * its own signs tend to be, so a wedding page reads warm and a gaming page
 * reads violet without either touching the brand pink.
 *
 * ── Written to be quoted ────────────────────────────────────────────────────
 *
 * Search and answer engines lift passages, not pages. So the page opens with
 * a direct answer under the H1 that stands alone if extracted, every H2 is
 * composed from the page's own head term the way people phrase the query, the
 * FAQs are real questions with complete answers, and a visible "updated" date
 * sits next to the breadcrumb. None of that is written for machines; it is
 * the order a person wants the information in, which is why it works.
 *
 * Every photograph is a 600 × 600 shop listing image. That fixes two layout
 * choices: tiles stay square, and the hero frame is capped so the image is
 * never upscaled past about 1.1×.
 *
 * Claims: only what lib/landing-pages.ts permits — 5-year warranty, free
 * mockup, 12V silicone construction, Pantone/HEX matching. No prices, lead
 * times, delivery costs or ratings.
 */

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export function CollectionPageView({
  page,
  siblings,
}: {
  page: CollectionPage;
  siblings: readonly CollectionPage[];
}) {
  const pageUrl = `${SITE_URL}${landingPath(page)}`;
  const accentStyle = { "--accent": page.accent, "--accent-ink": page.accentInk } as CSSProperties;
  const [featured, ...tiles] = page.gallery;
  const others = siblings.filter((sibling) => sibling.slug !== page.slug);
  const Plural = capitalise(page.keywordPlural);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.h1,
        headline: page.h1,
        description: page.answer,
        dateModified: page.updatedOn,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        about: { "@type": "Thing", name: capitalise(page.keyword) },
        keywords: [page.keyword, page.keywordPlural, page.name.toLowerCase()],
        primaryImageOfPage: `${SITE_URL}${page.heroImage}`,
        image: page.gallery.map((item) => ({
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${item.src}`,
          caption: item.caption ?? item.alt,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#signtypes`,
        name: `Sign types for ${page.keywordPlural}`,
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
      <MetaViewContent contentId={page.slug} contentName={page.name} contentCategory="Custom signage" />
      <AnnouncementBar />
      <ProductTopBar productName={page.quoteProductName} />

      <main id="main-content" className="collection" style={accentStyle}>
        {/* ── Hero: the sign on a dark wall, the way it will actually be seen ── */}
        <section className="collection-hero">
          <div className="collection-hero__glow collection-hero__glow--a" aria-hidden="true" />
          <div className="collection-hero__glow collection-hero__glow--b" aria-hidden="true" />

          <div className="collection-hero__inner">
            <div className="collection-hero__copy">
              <div className="collection-hero__meta">
                <nav className="collection-crumbs" aria-label="Breadcrumb">
                  <Link href="/">Home</Link>
                  <span aria-hidden="true">/</span>
                  <Link href={page.parent.href}>{page.parent.label}</Link>
                  <span aria-hidden="true">/</span>
                  <span aria-current="page">{page.name}</span>
                </nav>
                <p className="collection-updated">
                  Updated <time dateTime={page.updatedOn}>{formatDate(page.updatedOn)}</time>
                </p>
              </div>

              <p className="collection-kicker">
                <span className="collection-kicker__dot" aria-hidden="true" />
                {page.kicker}
              </p>
              <h1 className="collection-h1">{page.h1}</h1>
              <p className="collection-tagline">{page.tagline}</p>
              <p className="collection-answer">{page.answer}</p>
              <p className="collection-intro">{page.intro}</p>

              <ul className="collection-trust" aria-label="What every sign includes">
                <li>Free design mockup before we build</li>
                <li>Flexible 12V silicone, no glass</li>
                <li>5-year warranty</li>
              </ul>

              <div className="collection-hero__actions">
                <CustomQuoteButton
                  className="button button--whatsapp text-base px-7 py-3.5 font-bold"
                  label={page.quoteLabel}
                  productName={page.quoteProductName}
                />
                <a href="#gallery" className="collection-hero__secondary">
                  See the designs
                </a>
              </div>
            </div>

            <figure className="collection-hero__figure">
              <div className="collection-hero__frame">
                <Image
                  src={page.heroImage}
                  alt={page.heroAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, (min-width: 640px) 80vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="collection-hero__caption">
                <span>Lights on</span> {page.heroCaption}
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Gallery: what people actually order for this occasion ── */}
        <section id="gallery" className="collection-gallery" aria-labelledby="gallery-heading">
          <div className="collection-shell">
            <Reveal>
              <header className="collection-section-head collection-section-head--dark">
                <p className="collection-eyebrow">From the shop</p>
                <h2 id="gallery-heading">{Plural} people have ordered</h2>
                <p>
                  Real listing photographs of {page.keywordPlural} we made, not renders. Every one
                  started as a name, a phrase or a sketch sent to us — send yours and it goes on
                  your own wall in a free mockup.
                </p>
              </header>
            </Reveal>

            <ul className="collection-grid">
              {featured ? (
                <li className="collection-tile collection-tile--featured">
                  <Reveal className="collection-tile__inner">
                    <div className="collection-tile__frame">
                      <Image
                        src={featured.src}
                        alt={featured.alt}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {featured.caption ? <p className="collection-tile__caption">{featured.caption}</p> : null}
                  </Reveal>
                </li>
              ) : null}
              {tiles.map((item, index) => (
                <li key={item.src} className="collection-tile">
                  <Reveal className="collection-tile__inner" delay={Math.min(index * 0.05, 0.3)}>
                    <div className="collection-tile__frame">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        loading="lazy"
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    {item.caption ? <p className="collection-tile__caption">{item.caption}</p> : null}
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Wording: the part people get stuck on ── */}
        <section className="collection-phrases" aria-labelledby="phrases-heading">
          <div className="collection-shell collection-phrases__inner">
            <Reveal>
              <header className="collection-section-head">
                <p className="collection-eyebrow">Wording ideas</p>
                <h2 id="phrases-heading">What to write on a {page.keyword}</h2>
                <p>
                  The wording is the decision people stall on. These are the lines this occasion
                  actually gets ordered with — use one, change one, or send your own.
                </p>
              </header>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="collection-phrase-list">
                {page.phrases.map((phrase) => (
                  <li key={phrase} className="collection-phrase">
                    {phrase}
                  </li>
                ))}
                <li className="collection-phrase collection-phrase--own">
                  <CustomQuoteButton
                    className="collection-phrase__button"
                    label="Your own words →"
                    productName={page.quoteProductName}
                  />
                </li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ── Which sign type suits this occasion ── */}
        <section className="collection-materials" aria-labelledby="materials-heading">
          <div className="collection-shell">
            <Reveal>
              <header className="collection-section-head">
                <p className="collection-eyebrow">Which sign type fits</p>
                <h2 id="materials-heading">Which type of {page.keyword} to choose</h2>
                <p>
                  We make four sign types and they are not interchangeable. These are the three that
                  suit this occasion, and why.
                </p>
              </header>
            </Reveal>
            <ul className="collection-material-list">
              {page.materials.map((material, index) => (
                <li key={material.href}>
                  <Reveal delay={index * 0.08} className="h-full">
                    <Link href={material.href} className="collection-material">
                      <span className="collection-material__name">{material.name}</span>
                      <span className="collection-material__why">{material.why}</span>
                      <span className="collection-material__go" aria-hidden="true">
                        Explore →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The decisions that are expensive to change afterwards ── */}
        <section className="collection-considerations" aria-labelledby="considerations-heading">
          <div className="collection-shell">
            <Reveal>
              <header className="collection-section-head">
                <p className="collection-eyebrow">Before we fabricate</p>
                <h2 id="considerations-heading">Before you order a {page.keyword}</h2>
                <p>
                  Each of these is cheap to settle at the mockup stage and expensive or impossible to
                  change once the sign is built.
                </p>
              </header>
            </Reveal>
            <div className="collection-consideration-grid">
              {page.considerations.map((item, index) => (
                <Reveal key={item.title} delay={index * 0.06}>
                  <article className="collection-consideration">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Where these go ── */}
        <section className="collection-applications" aria-labelledby="applications-heading">
          <div className="collection-shell">
            <Reveal>
              <header className="collection-section-head">
                <p className="collection-eyebrow">Placement</p>
                <h2 id="applications-heading">Where to hang a {page.keyword}</h2>
              </header>
            </Reveal>
            <ul className="collection-application-list">
              {page.applications.map((application, index) => (
                <li key={application.name}>
                  <Reveal delay={index * 0.05} className="h-full">
                    <div className="collection-application">
                      <h3>{application.name}</h3>
                      <p>{application.text}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section className="collection-faqs" aria-labelledby="faq-heading">
          <div className="collection-shell collection-faqs__inner">
            <Reveal>
              <header className="collection-section-head">
                <p className="collection-eyebrow">Questions</p>
                <h2 id="faq-heading">{Plural}: your questions answered</h2>
              </header>
            </Reveal>
            <dl className="collection-faq-list">
              {page.faqs.map((faq, index) => (
                <Reveal key={faq.q} delay={index * 0.04}>
                  <div className="collection-faq">
                    <dt>{faq.q}</dt>
                    <dd>{faq.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Keep reading: the cluster this page belongs to ── */}
        <section className="collection-reading" aria-labelledby="reading-heading">
          <div className="collection-shell">
            <Reveal>
              <header className="collection-section-head collection-section-head--tight">
                <p className="collection-eyebrow">Keep reading</p>
                <h2 id="reading-heading">Guides that go deeper on {page.keywordPlural}</h2>
              </header>
            </Reveal>
            <ul className="collection-reading-list">
              {page.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="collection-reading-card">
                    <span className="collection-reading-card__label">{item.label}</span>
                    <span className="collection-reading-card__text">{item.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Closing CTA on the dark wall ── */}
        <section className="collection-cta">
          <div className="collection-cta__line" aria-hidden="true" />
          <div className="collection-cta__glow" aria-hidden="true" />
          <div className="collection-shell collection-cta__inner">
            <Reveal>
              <p className="collection-eyebrow collection-eyebrow--light">Free mockup</p>
              <h2>Get a free {page.keyword} mockup</h2>
              <p>
                A photo of the space, the wording and a rough size is enough. We come back with your
                sign placed on your own wall, in your colours, before anything is built — and every
                sign carries a 5-year warranty.
              </p>
              <div className="collection-cta__actions">
                <CustomQuoteButton
                  className="button button--whatsapp text-base px-7 py-3.5 font-bold"
                  label={page.quoteLabel}
                  productName={page.quoteProductName}
                />
                <Link href={page.footerLink.href} className="collection-cta__secondary">
                  {page.footerLink.label}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── The rest of the family, so no page is a dead end ── */}
        {others.length > 0 ? (
          <section className="collection-more" aria-labelledby="more-heading">
            <div className="collection-shell">
              <header className="collection-section-head collection-section-head--tight">
                <p className="collection-eyebrow">More occasions</p>
                <h2 id="more-heading">Custom neon signs for other rooms and days</h2>
              </header>
              <ul className="collection-more-list">
                {others.map((sibling) => (
                  <li key={sibling.slug}>
                    <Link
                      href={landingPath(sibling)}
                      className="collection-more-card"
                      style={{ "--accent": sibling.accent } as CSSProperties}
                    >
                      <span className="collection-more-card__frame">
                        <Image
                          src={sibling.heroImage}
                          alt={sibling.heroAlt}
                          fill
                          loading="lazy"
                          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                          className="object-cover"
                        />
                      </span>
                      <span className="collection-more-card__name">{sibling.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
    </>
  );
}
