import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { Reveal } from "@/components/landing/reveal";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { HeroTypewriter } from "@/components/storefront/studio-interactions";
import { COLLECTION_PAGES } from "@/lib/collection-pages";
import { occasionTypePhrases } from "@/lib/home-content";
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";
import businessImage from "@/app/assets/hero/business.webp";
import styles from "./hub.module.css";

/*
 * The consumer occasions hub — image-first. Per the keyword map (SIG-HUB)
 * this page owns the "custom neon signs" head term and routes occasion
 * intent down to the six collections.
 *
 * IMAGE SHAPE CONTRACT: every collection photograph is a 600×600 Etsy
 * product square. Tiles are therefore square (or 2×2 square for the featured
 * one) — a 2:1 tile threw away 72% of the picture and cut the sign out of
 * frame. Only the four product hero images are landscape, so the material
 * tiles are 4:3. Do not give a square photo a wide tile.
 */

// The layout's title template appends "| The Glownique".
const title = "Custom Neon Signs by Occasion";
const description =
  "Custom neon signs for weddings, kids' rooms, game rooms, home bars, parties and home decor — handcrafted to order with a free design mockup and tracked worldwide delivery.";

// The same quotable answer the page renders, reused in the structured data so
// visible copy and machine-readable copy never drift (AEO pattern).
const hubAnswer =
  "The Glownique makes custom LED neon signs for six kinds of occasion: weddings, kids' rooms, game rooms, home decor, home bars, and parties or events. Every sign is handcrafted to order in your wording and colours, starts with a free design mockup, and ships with tracked worldwide delivery.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/custom-signage" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: `${title} | The Glownique`,
    description,
    url: "/custom-signage",
    images: [
      {
        url: "/hero/neon-sign-hero.png",
        alt: "Custom white LED neon name sign glowing on a dark wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | The Glownique`,
    description,
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function CustomSignagePage() {
  const pageUrl = `${SITE_URL}/custom-signage`;
  const [wedding, kids, gaming, home, bar, events] = COLLECTION_PAGES;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: hubAnswer,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#collections`,
        name: "Custom neon signs by occasion",
        itemListElement: COLLECTION_PAGES.map((collection, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: collection.name,
          url: `${SITE_URL}/custom-signage/${collection.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Custom Signage",
            item: pageUrl,
          },
        ],
      },
    ],
  };

  // Mosaic: wedding leads as a 2×2 square (largest search volume), the rest
  // are 1×1 squares, and the CTA banner fills the final row completely.
  const mosaic = [
    { collection: wedding, featured: true },
    { collection: kids, featured: false },
    { collection: gaming, featured: false },
    { collection: home, featured: false },
    { collection: bar, featured: false },
    { collection: events, featured: false },
  ];

  // The ribbon: a continuous strip of real signs drawn from deeper in each
  // collection's gallery, so it never repeats a photo used in a tile above.
  const ribbon = [
    wedding.gallery[2],
    kids.gallery[3],
    gaming.gallery[2],
    home.gallery[2],
    bar.gallery[2],
    events.gallery[2],
    wedding.gallery[3],
    kids.gallery[4],
    gaming.gallery[3],
    home.gallery[3],
    bar.gallery[3],
    kids.gallery[5],
  ].filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <MetaViewCategory category="All sign types" />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className={styles.hub}>
        {/* ── Hero: typed statement + square photo collage ────────────── */}
        <section className={styles.hero} aria-labelledby="hub-heading">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Signs by occasion</p>
            <h1 id="hub-heading">
              <span className={styles.heroLine}>
                <span>Custom neon signs,</span>
              </span>
              <span className={styles.heroLine}>
                <span>
                  for{" "}
                  {/* The full phrase is rendered statically for crawlers and
                      screen readers; the typed copy is aria-hidden. */}
                  <span className="sr-only">{occasionTypePhrases[0]}</span>
                  <em className={styles.heroTypeLine}>
                    <HeroTypewriter
                      phrases={occasionTypePhrases}
                      startDelayMs={2200}
                    />
                  </em>
                </span>
              </span>
            </h1>
            <p>Six collections of made-to-order signs. Pick your reason.</p>
            <div className={styles.heroActions}>
              <CustomQuoteButton
                className={styles.primary}
                label="Start my free mockup"
              />
              <a className={styles.textLink} href="#occasions">
                Browse ↘
              </a>
            </div>
          </div>
          <div className={styles.heroCollage}>
            <Link
              className={`${styles.heroTile} ${styles.heroTileTall}`}
              href={`/custom-signage/${wedding.slug}`}
            >
              <Image
                src={wedding.gallery[0].src}
                alt={wedding.gallery[0].alt}
                fill
                priority
                sizes="(max-width: 900px) 62vw, 30vw"
              />
              <span className={styles.tileTag}>Weddings ↗</span>
            </Link>
            <Link
              className={styles.heroTile}
              href={`/custom-signage/${gaming.slug}`}
            >
              <Image
                src={gaming.gallery[0].src}
                alt={gaming.gallery[0].alt}
                fill
                sizes="(max-width: 900px) 34vw, 16vw"
              />
              <span className={styles.tileTag}>Game rooms ↗</span>
            </Link>
            <Link
              className={styles.heroTile}
              href={`/custom-signage/${bar.slug}`}
            >
              <Image
                src={bar.gallery[0].src}
                alt={bar.gallery[0].alt}
                fill
                sizes="(max-width: 900px) 34vw, 16vw"
              />
              <span className={styles.tileTag}>Home bars ↗</span>
            </Link>
          </div>
        </section>

        {/* ── The one-line answer (AEO), visually quiet ───────────────── */}
        <section className={styles.answer} aria-labelledby="hub-answer-heading">
          <h2 className={styles.answerQuestion} id="hub-answer-heading">
            Which custom neon sign suits your occasion?
          </h2>
          <p className={styles.answerText}>{hubAnswer}</p>
        </section>

        {/* ── The occasions mosaic ────────────────────────────────────── */}
        <section
          className={styles.section}
          id="occasions"
          aria-labelledby="occasions-heading"
        >
          <Reveal>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>The occasions index</p>
                <h2 id="occasions-heading">
                  Six collections. One is <em>your reason.</em>
                </h2>
              </div>
              <Link className={styles.textLink} href="/products">
                Compare sign materials ↗
              </Link>
            </div>
          </Reveal>
          <div className={styles.mosaic}>
            {mosaic.map(({ collection, featured }, index) => {
              const front = collection.gallery[0];
              // A second real photo from the same collection, revealed on
              // hover — two signs per tile instead of one.
              const back = collection.gallery[1] ?? front;
              return (
                <Link
                  key={collection.slug}
                  className={`${styles.tile}${
                    featured ? ` ${styles.tileFeatured}` : ""
                  }`}
                  href={`/custom-signage/${collection.slug}`}
                >
                  <Image
                    className={styles.tileFront}
                    src={front.src}
                    alt={front.alt}
                    fill
                    sizes={
                      featured
                        ? "(max-width: 700px) 100vw, 46vw"
                        : "(max-width: 700px) 46vw, 23vw"
                    }
                  />
                  <Image
                    className={styles.tileBack}
                    src={back.src}
                    alt=""
                    aria-hidden="true"
                    fill
                    loading="lazy"
                    sizes={
                      featured
                        ? "(max-width: 700px) 100vw, 46vw"
                        : "(max-width: 700px) 46vw, 23vw"
                    }
                  />
                  <span className={styles.tileIndex} aria-hidden="true">
                    0{index + 1}
                  </span>
                  {featured && (
                    <span className={styles.tileSticker} aria-hidden="true">
                      Most loved
                    </span>
                  )}
                  <span className={styles.tileCaption}>
                    <span>
                      {collection.name}
                      <small>{collection.kicker}</small>
                    </span>
                    <span className={styles.tileArrow} aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </Link>
              );
            })}
            <CustomQuoteButton
              className={styles.tileCta}
              label="Something else entirely? Start a free mockup"
            />
          </div>
        </section>

        {/* ── The ribbon: signs we've actually made, scrolling past ───── */}
        <section className={styles.ribbonSection} aria-label="Recent signs">
          <p className={styles.ribbonLabel}>
            <span className={styles.ribbonDot} aria-hidden="true" />
            Made in the studio
          </p>
          <div className={styles.ribbon}>
            <div className={styles.ribbonTrack}>
              {[0, 1].map((pass) => (
                <div className={styles.ribbonGroup} key={pass} aria-hidden={pass === 1}>
                  {ribbon.map((photo, i) => (
                    <span className={styles.ribbonItem} key={`${pass}-${i}`}>
                      <Image
                        src={photo.src}
                        alt={pass === 0 ? photo.alt : ""}
                        fill
                        loading="lazy"
                        sizes="180px"
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Materials as landscape image tiles ─────────────────────── */}
        <section className={styles.section} aria-labelledby="materials-heading">
          <Reveal>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>Four ways to build it</p>
                <h2 id="materials-heading">
                  Any occasion. <em>Any material.</em>
                </h2>
              </div>
            </div>
          </Reveal>
          <div className={styles.materialGrid}>
            {PRODUCT_PAGES.map((product) => (
              <Reveal key={product.slug}>
                <Link
                  className={styles.materialTile}
                  href={`/products/${product.slug}`}
                >
                  <Image
                    src={product.heroImage}
                    alt={`${product.name} — ${product.tagline}`}
                    fill
                    sizes="(max-width: 700px) 46vw, 25vw"
                  />
                  <span className={styles.tileCaption}>
                    <span>
                      {product.name}
                      <small>{product.tagline}</small>
                    </span>
                    <span className={styles.tileArrow} aria-hidden="true">
                      ↗
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Business hand-off over a real install photo ─────────────── */}
        <Reveal>
          <section className={styles.businessBand} aria-labelledby="biz-heading">
            <Image
              src={businessImage}
              alt=""
              fill
              placeholder="blur"
              sizes="100vw"
              className={styles.businessPhoto}
            />
            <div className={styles.businessInner}>
              <div>
                <p className={styles.kicker}>For your business</p>
                <h2 id="biz-heading">
                  Signing a storefront, not <em>a story?</em>
                </h2>
              </div>
              <div className={styles.businessLinks}>
                <Link className={styles.businessGhost} href="/business-signs">
                  Explore business signage <span aria-hidden="true">→</span>
                </Link>
                <Link
                  className={styles.textLink}
                  href="/business-signs/channel-letter-signs"
                >
                  Channel letter signs ↗
                </Link>
              </div>
            </div>
          </section>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
