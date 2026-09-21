import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  Clock,
  Palette,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sun,
  Eye,
} from "lucide-react";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { Reveal } from "@/components/landing/reveal";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { HeroTypewriter } from "@/components/storefront/studio-interactions";
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";
import styles from "./products.module.css";

/*
 * /products — the sign-type (material and technology) hub.
 *
 * This route owns the broad catalog for "custom illuminated sign types" and
 * comparison queries — "neon vs channel letters vs lightbox" — while
 * /custom-signage maintains occasion intent and /business-signs maintains
 * commercial intent.
 *
 * All four sign types are crafted in-house with distinct fabrication
 * methods, lighting styles, and specifications.
 */

const title = "Custom Sign Types: Neon, Metal & Lightboxes";
const description =
  "Compare the four custom sign types we make — LED neon, 3D metal channel letters, ultra-thin lightboxes and UV-printed acrylic — with materials, lighting and finishes side by side.";

const answer =
  "The Glownique makes four custom sign types. LED neon bends flexible silicone tubing into names, phrases and line art. 3D metal channel letters are fabricated in stainless steel and lit frontlit, halo backlit or dual-lit. Ultra-thin lightboxes are edge-lit aluminium cabinets under an inch deep for menus and retail graphics. UV-printed acrylic signs carry full-colour artwork traced with glowing neon contours.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: `${title} | The Glownique`,
    description,
    url: "/products",
    images: [
      {
        url: "/hero/neon-sign-hero.webp",
        alt: "Custom LED neon sign glowing on a dark wall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | The Glownique`,
    description,
    images: ["/hero/neon-sign-hero.webp"],
  },
};

const typePhrases = [
  "LED neon.",
  "channel letters.",
  "a slim lightbox.",
  "printed acrylic.",
] as const;

const COMPARISON = [
  {
    label: "Best for",
    values: [
      "Names, phrases, signatures and line-art logos",
      "Storefronts, architectural façades and corporate lobbies",
      "Menus, retail graphic displays and directory boards",
      "Full-colour brand logos, illustrations and detailed artwork",
    ],
  },
  {
    label: "Built from",
    values: [
      "Flexible LED silicone tubing on laser-cut cast acrylic",
      "Fabricated 316 stainless-steel channels with acrylic faces",
      "Anodized aluminium cabinet, under 1 inch (~25 mm) deep",
      "UV direct-printed acrylic traced with hand-bent neon contours",
    ],
  },
  {
    label: "Lighting style",
    values: [
      "Continuous silicone glow (13 solid colours + RGB)",
      "Frontlit, halo backlit (rear glow) or dual-lit (both)",
      "Edge-lit SMD matrix LED — 100% uniform & shadow-free",
      "Vivid printed artwork accentuated by glowing neon outlines",
    ],
  },
  {
    label: "Colour match",
    values: [
      "13 curated neon hues + dynamic RGB colour changing",
      "Custom RGB / HEX / CMYK or brushed / mirrored metallic finishes",
      "Custom anodized / painted aluminium frame finishes",
      "Precise Pantone, HEX and CMYK full-gamut matching",
    ],
  },
  {
    label: "Outdoor use",
    values: [
      "IP67 outdoor weatherproof build available",
      "IP67 weatherproof sealed construction standard",
      "Confirmed with quote (indoor standard, exterior options)",
      "Confirmed with quote (weather-sealed options available)",
    ],
  },
  {
    label: "Power & rating",
    values: [
      "Low-voltage 12V • Up to 100,000 hrs lifespan",
      "Commercial LED modules • Up to 80,000 hrs lifespan",
      "Low-voltage 12V/24V • Up to 70,000 hrs lifespan",
      "Safe low-voltage 12V • Up to 90,000 hrs lifespan",
    ],
  },
] as const;

// Curated spec highlights for each product's editorial row
const ROW_SPECS = [
  {
    bestFor: "Names, script, phrases & line logos",
    lighting: "13 solid hues or RGB colour-change",
    materials: "Silicone tubing on cast acrylic",
    rating: "Safe 12V • Indoor & IP67 outdoor",
    badge: "STUDIO FLAGSHIP",
  },
  {
    bestFor: "Commercial storefronts, lobbies & façades",
    lighting: "Frontlit, halo backlit or dual-lit",
    materials: "Fabricated 316 stainless steel",
    rating: "IP67 weatherproof commercial build",
    badge: "ARCHITECTURAL",
  },
  {
    bestFor: "Menus, retail displays & promotional art",
    lighting: "100% uniform edge-lit LED matrix",
    materials: "Anodized aluminium, under 1\" slim",
    rating: "Tool-free magnetic / snap swap",
    badge: "ULTRA-SLIM 25MM",
  },
  {
    bestFor: "Multi-colour corporate logos & artwork",
    lighting: "Printed artwork with neon contours",
    materials: "UV flatbed cured ink on acrylic",
    rating: "Exact Pantone / HEX / CMYK match",
    badge: "FULL-COLOUR UV",
  },
] as const;

export default function SignTypesPage() {
  const pageUrl = `${SITE_URL}/products`;
  const [neon, metal, lightbox, acrylic] = PRODUCT_PAGES;

  const pairs = [
    { product: neon, inset: neon.gallery[2] ?? neon.gallery[1] },
    { product: metal, inset: metal.gallery[1] },
    { product: lightbox, inset: lightbox.gallery[2] ?? lightbox.gallery[1] },
    { product: acrylic, inset: acrylic.gallery[1] },
  ];

  const strip = [
    { ...neon.gallery[1], type: "Neon Sign" },
    { ...metal.gallery[2], type: "3D Metal" },
    { ...lightbox.gallery[1], type: "Slim Lightbox" },
    { ...acrylic.gallery[0], type: "Acrylic Neon" },
    { ...neon.gallery[3], type: "Neon Sign" },
    { ...metal.gallery[3], type: "3D Metal" },
    { ...lightbox.gallery[3], type: "Slim Lightbox" },
    { ...lightbox.gallery[4], type: "Slim Lightbox" },
  ].filter((p) => Boolean(p.src));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: answer,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#signtypes`,
        name: "Custom illuminated sign types",
        itemListElement: PRODUCT_PAGES.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${SITE_URL}/products/${product.slug}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Sign Types", item: pageUrl },
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
      <MetaViewCategory category="All sign types" />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className={styles.types}>
        {/* ── Hero: Editorial copy + sculpted architectural mosaic ─────── */}
        <section className={styles.hero} aria-labelledby="types-heading">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              <span className={styles.kickerDot} />
              Four sign types • In-house fabrication
            </p>
            <h1 id="types-heading">
              <span className={styles.heroLine}>
                <span>One idea.</span>
              </span>
              <span className={styles.heroLine}>
                <span>
                  Lit as{" "}
                  <span className="sr-only">{typePhrases[0]}</span>
                  <em className={styles.heroTypeLine}>
                    <HeroTypewriter phrases={typePhrases} startDelayMs={1800} />
                  </em>
                </span>
              </span>
            </h1>
            <p className={styles.heroDescription}>
              The same logo or phrase, fabricated four distinct ways. Explore
              flexible silicone neon, architectural 3D metal letters, ultra-slim
              lightboxes and UV-printed contour acrylic below.
            </p>

            <div className={styles.heroActions}>
              <CustomQuoteButton
                className={styles.primary}
                label="Start my free mockup"
              />
              <a className={styles.textLink} href="#compare">
                Compare all specs <span>↘</span>
              </a>
            </div>

            {/* Studio quick specification metrics bar */}
            <div className={styles.heroQuickSpecs}>
              <div className={styles.quickSpecItem}>
                <div className={styles.quickSpecIconWrap}>
                  <Clock className={styles.quickSpecIcon} size={15} />
                </div>
                <div>
                  <strong className={styles.quickSpecValue}>100,000 Hrs</strong>
                  <span className={styles.quickSpecLabel}>
                    Commercial LEDs
                  </span>
                </div>
              </div>
              <div className={styles.quickSpecDivider} />
              <div className={styles.quickSpecItem}>
                <div className={styles.quickSpecIconWrap}>
                  <ShieldCheck className={styles.quickSpecIcon} size={15} />
                </div>
                <div>
                  <strong className={styles.quickSpecValue}>IP67 Rated</strong>
                  <span className={styles.quickSpecLabel}>
                    Weatherproof builds
                  </span>
                </div>
              </div>
              <div className={styles.quickSpecDivider} />
              <div className={styles.quickSpecItem}>
                <div className={styles.quickSpecIconWrap}>
                  <Sparkles className={styles.quickSpecIcon} size={15} />
                </div>
                <div>
                  <strong className={styles.quickSpecValue}>Free Mockup</strong>
                  <span className={styles.quickSpecLabel}>
                    1:1 vector preview
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sculpted Architectural 4-Product Mosaic ────────────────── */}
          <div className={styles.heroMosaicContainer}>
            <div className={styles.heroMosaicGlow} aria-hidden="true" />

            {/* Studio drafting registration marks */}
            <span
              className={`${styles.cornerMark} ${styles.cornerTL}`}
              aria-hidden="true"
            >
              +
            </span>
            <span
              className={`${styles.cornerMark} ${styles.cornerTR}`}
              aria-hidden="true"
            >
              +
            </span>
            <span
              className={`${styles.cornerMark} ${styles.cornerBL}`}
              aria-hidden="true"
            >
              +
            </span>
            <span
              className={`${styles.cornerMark} ${styles.cornerBR}`}
              aria-hidden="true"
            >
              +
            </span>

            <div className={styles.heroMosaicGrid}>
              {PRODUCT_PAGES.map((product, index) => {
                const shapeClass =
                  index === 0
                    ? styles.heroTileArchTopLeft
                    : index === 1
                      ? styles.heroTileArchTopRight
                      : index === 2
                        ? styles.heroTileCurveBottomLeft
                        : styles.heroTileCurveBottomRight;

                const badgeText =
                  index === 0
                    ? "FLAGSHIP NEON"
                    : index === 1
                      ? "3D CHANNEL METAL"
                      : index === 2
                        ? "SLIM LIGHTBOX"
                        : "UV PRINT ACRYLIC";

                return (
                  <Link
                    key={product.slug}
                    className={`${styles.heroMosaicTile} ${shapeClass}`}
                    href={`/products/${product.slug}`}
                    style={
                      {
                        "--tile-accent": product.accent,
                      } as React.CSSProperties
                    }
                    aria-label={`Explore ${product.name}`}
                  >
                    <Image
                      src={product.heroImage}
                      alt={`${product.name} — ${product.tagline}`}
                      fill
                      priority={index < 2}
                      sizes="(max-width: 900px) 46vw, 22vw"
                      className={styles.heroMosaicImg}
                    />
                    <div className={styles.heroMosaicOverlay} />

                    <div className={styles.heroTileHeader}>
                      <span className={styles.heroTileIndex}>
                        0{index + 1}
                      </span>
                      <span className={styles.heroTileBadge}>{badgeText}</span>
                    </div>

                    <div className={styles.heroTileFooter}>
                      <span className={styles.heroTileTag}>
                        <span
                          className={styles.dot}
                          style={{ background: product.accent }}
                          aria-hidden="true"
                        />
                        <span className={styles.heroTileTagName}>
                          {product.category}
                        </span>
                      </span>
                      <span className={styles.heroTileArrow} aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  </Link>
                );
              })}

              {/* Central Studio Crest Medallion */}
              <div className={styles.heroMosaicCenter} aria-hidden="true">
                <div className={styles.heroCenterPill}>
                  <div className={styles.heroCenterDots}>
                    {PRODUCT_PAGES.map((p) => (
                      <span
                        key={p.slug}
                        className={styles.heroCenterDot}
                        style={{ background: p.accent }}
                      />
                    ))}
                  </div>
                  <span className={styles.heroCenterText}>
                    STUDIO CATALOGUE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Studio Material Primer Card (AEO + Quick Navigation) ────── */}
        <section className={styles.primerCard} aria-labelledby="types-answer">
          <div className={styles.primerInner}>
            <div className={styles.primerHeader}>
              <span className={styles.kicker}>
                <span className={styles.kickerDot} />
                Material Primer • At a Glance
              </span>
              <h2 className={styles.primerQuestion} id="types-answer">
                What are the four custom sign types?
              </h2>
            </div>
            <p className={styles.primerText}>{answer}</p>
            <div className={styles.primerNav}>
              {PRODUCT_PAGES.map((product) => (
                <a
                  key={product.slug}
                  className={styles.primerTab}
                  href={`#type-${product.slug}`}
                >
                  <span
                    className={styles.dot}
                    style={{ background: product.accent }}
                    aria-hidden="true"
                  />
                  <span>{product.category}</span>
                  <span className={styles.primerTabArrow}>↓</span>
                </a>
              ))}
              <a className={styles.primerTabCompare} href="#compare">
                <span>Side-by-Side Matrix</span>
                <span className={styles.primerTabArrow}>↘</span>
              </a>
            </div>
          </div>
        </section>

        {/* ── The four types, as rich editorial feature rows ───────────── */}
        <section
          className={styles.section}
          id="types"
          aria-labelledby="catalogue-heading"
        >
          <Reveal>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>
                  <span className={styles.kickerDot} />
                  The Studio Catalogue
                </p>
                <h2 id="catalogue-heading">
                  Four materials. <em>One studio.</em>
                </h2>
              </div>
              <div className={styles.headingAction}>
                <Link className={styles.textLink} href="/custom-signage">
                  Shop by occasion instead ↗
                </Link>
              </div>
            </div>
          </Reveal>

          <div className={styles.rows}>
            {pairs.map(({ product, inset }, index) => {
              const rowSpec = ROW_SPECS[index];
              const isEven = index % 2 === 1;

              return (
                <Reveal key={product.slug}>
                  <article
                    className={`${styles.row} ${
                      isEven ? styles.rowReversed : ""
                    }`}
                    id={`type-${product.slug}`}
                    style={
                      { "--accent": product.accent } as React.CSSProperties
                    }
                  >
                    {/* Visual Photography Column */}
                    <div className={styles.rowPhotos}>
                      <Link
                        className={styles.rowMain}
                        href={`/products/${product.slug}`}
                        aria-label={product.name}
                      >
                        <Image
                          src={product.heroImage}
                          alt={`${product.name} — ${product.tagline}`}
                          fill
                          sizes="(max-width: 900px) 100vw, 42vw"
                        />
                        <span className={styles.photoCraftBadge}>
                          {rowSpec.badge}
                        </span>
                      </Link>

                      {inset && (
                        <span className={styles.rowInset}>
                          <Image
                            src={inset.src}
                            alt={inset.alt}
                            fill
                            loading="lazy"
                            sizes="(max-width: 900px) 44vw, 18vw"
                          />
                          <span className={styles.insetTag}>REAL WORK</span>
                        </span>
                      )}
                    </div>

                    {/* Editorial Specification Column */}
                    <div className={styles.rowCopy}>
                      <div className={styles.rowMeta}>
                        <span className={styles.rowIndex}>
                          0{index + 1} / 04
                        </span>
                        <span
                          className={styles.rowCategoryBadge}
                          style={{ borderColor: `${product.accent}40` }}
                        >
                          <span
                            className={styles.dot}
                            style={{ background: product.accent }}
                            aria-hidden="true"
                          />
                          {product.category}
                        </span>
                      </div>

                      <h3 className={styles.rowTitle}>
                        <Link href={`/products/${product.slug}`}>
                          {product.name}
                        </Link>
                      </h3>

                      <p className={styles.rowTagline}>{product.tagline}</p>

                      <p className={styles.rowIntro}>{product.intro}</p>

                      {/* Structured 4-cell micro-spec matrix */}
                      <div className={styles.rowSpecsGrid}>
                        <div className={styles.specCell}>
                          <span className={styles.specLabel}>Ideal for</span>
                          <span className={styles.specVal}>
                            {rowSpec.bestFor}
                          </span>
                        </div>
                        <div className={styles.specCell}>
                          <span className={styles.specLabel}>Lighting</span>
                          <span className={styles.specVal}>
                            {rowSpec.lighting}
                          </span>
                        </div>
                        <div className={styles.specCell}>
                          <span className={styles.specLabel}>Materials</span>
                          <span className={styles.specVal}>
                            {rowSpec.materials}
                          </span>
                        </div>
                        <div className={styles.specCell}>
                          <span className={styles.specLabel}>Durability</span>
                          <span className={styles.specVal}>
                            {rowSpec.rating}
                          </span>
                        </div>
                      </div>

                      {/* Feature Chips */}
                      <ul className={styles.chips}>
                        {product.chips.slice(0, 4).map((chip) => (
                          <li key={chip}>
                            <CheckCircle2
                              size={12}
                              className={styles.chipCheck}
                            />
                            {chip}
                          </li>
                        ))}
                      </ul>

                      {/* Row Action Buttons */}
                      <div className={styles.rowActions}>
                        <Link
                          className={styles.rowPrimaryLink}
                          href={`/products/${product.slug}`}
                        >
                          <span>Explore {product.category} specs</span>
                          <ArrowRight size={14} />
                        </Link>
                        <CustomQuoteButton
                          className={styles.rowQuoteBtn}
                          label="Get mockup"
                        />
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Side-by-side comparison table ───────────────────────────── */}
        <section
          className={styles.section}
          id="compare"
          aria-labelledby="compare-heading"
        >
          <Reveal>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.kicker}>
                  <span className={styles.kickerDot} />
                  Side by Side Specification
                </p>
                <h2 id="compare-heading">
                  Neon, metal, lightbox <em>or acrylic?</em>
                </h2>
              </div>
              <div className={styles.headingAction}>
                <Link className={styles.textLink} href="/guides">
                  Read all buying guides ↗
                </Link>
              </div>
            </div>
          </Reveal>

          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="sr-only">
                Custom sign types compared by use, material, lighting, colour
                matching and outdoor rating
              </caption>
              <thead>
                <tr>
                  <th scope="col" className={styles.tableSpecColHeader}>
                    <span>Specification</span>
                  </th>
                  {PRODUCT_PAGES.map((product) => (
                    <th scope="col" key={product.slug}>
                      <Link
                        className={styles.tableProductHead}
                        href={`/products/${product.slug}`}
                      >
                        <div className={styles.tableThumbWrap}>
                          <Image
                            src={product.heroImage}
                            alt=""
                            fill
                            sizes="48px"
                            className={styles.tableThumb}
                          />
                        </div>
                        <div className={styles.tableHeadInfo}>
                          <span className={styles.tableHeadName}>
                            <span
                              className={styles.dot}
                              style={{ background: product.accent }}
                              aria-hidden="true"
                            />
                            {product.category}
                          </span>
                          <span className={styles.tableHeadLink}>
                            Specs ↗
                          </span>
                        </div>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((spec) => (
                  <tr key={spec.label}>
                    <th scope="row" className={styles.tableRowLabel}>
                      {spec.label}
                    </th>
                    {spec.values.map((value, i) => (
                      <td key={`${spec.label}-${i}`} className={styles.tableCell}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Consultation / Mockup Assistance Card */}
          <div className={styles.consultCard}>
            <div className={styles.consultCopy}>
              <span className={styles.consultKicker}>
                ✳ Expert Material Guidance
              </span>
              <h3 className={styles.consultHeading}>
                Need help deciding on materials for your space?
              </h3>
              <p className={styles.consultText}>
                Send your logo, typography, or sketch and our design team will
                provide a side-by-side 3D digital mockup in neon and 3D metal
                letters with transparent pricing.
              </p>
            </div>
            <div className={styles.consultAction}>
              <CustomQuoteButton
                className={styles.primary}
                label="Get free side-by-side mockup"
              />
              <span className={styles.consultNote}>
                100% Free • No commitment • Within 24 hours
              </span>
            </div>
          </div>
        </section>

        {/* ── Strip: real work across all four materials ──────────────── */}
        <section className={styles.stripSection} aria-label="Recent work">
          <div className={styles.stripHeader}>
            <p className={styles.stripLabel}>
              <span className={styles.pulse} aria-hidden="true" />
              Recent Commissions • All 4 Materials
            </p>
            <span className={styles.stripSubtext}>
              Every sign handcrafted and bench-tested in our studio
            </span>
          </div>

          <div className={styles.strip}>
            <div className={styles.stripTrack}>
              {[0, 1].map((pass) => (
                <div
                  className={styles.stripGroup}
                  key={pass}
                  aria-hidden={pass === 1}
                >
                  {strip.map((photo, i) => (
                    <span className={styles.stripItem} key={`${pass}-${i}`}>
                      <Image
                        src={photo.src}
                        alt={pass === 0 ? photo.alt : ""}
                        fill
                        loading="lazy"
                        sizes="220px"
                      />
                      <span className={styles.stripItemTag}>{photo.type}</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Studio Confidence & Guarantee Pillars ──────────────────── */}
        <section className={styles.assuranceSection}>
          <div className={styles.assuranceGrid}>
            <div className={styles.assuranceCard}>
              <div className={styles.assuranceIconWrap}>
                <ShieldCheck size={20} />
              </div>
              <h4>5-Year Studio Warranty</h4>
              <p>
                Commercial-grade construction built to stay bright and stable
                for years.
              </p>
            </div>
            <div className={styles.assuranceCard}>
              <div className={styles.assuranceIconWrap}>
                <Zap size={20} />
              </div>
              <h4>Safe Low-Voltage 12V</h4>
              <p>
                Shatterproof silicone and cool-to-touch LEDs safe for any room
                or venue.
              </p>
            </div>
            <div className={styles.assuranceCard}>
              <div className={styles.assuranceIconWrap}>
                <Sparkles size={20} />
              </div>
              <h4>Free Vector Mockups</h4>
              <p>
                Exact dimensions, lighting styles and colour match proofs
                before fabrication.
              </p>
            </div>
            <div className={styles.assuranceCard}>
              <div className={styles.assuranceIconWrap}>
                <Layers size={20} />
              </div>
              <h4>Tracked Worldwide Freight</h4>
              <p>
                Armoured reinforced packaging with tracked delivery straight to
                your door.
              </p>
            </div>
          </div>
        </section>

        {/* ── Two-up hand-off to the other hubs ───────────────────────── */}
        <Reveal>
          <div className={styles.handoff}>
            <Link className={styles.handoffCard} href="/custom-signage">
              <Image
                src={neon.gallery[1].src}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className={styles.handoffInner}>
                <span className={styles.kickerLight}>For your occasion</span>
                <span className={styles.handoffTitle}>
                  Weddings, kids&rsquo; rooms, game rooms & celebrations
                </span>
                <span className={styles.handoffGo} aria-hidden="true">
                  Browse by occasion →
                </span>
              </span>
            </Link>
            <Link className={styles.handoffCard} href="/business-signs">
              <Image
                src={metal.gallery[2].src}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <span className={styles.handoffInner}>
                <span className={styles.kickerLight}>For your business</span>
                <span className={styles.handoffTitle}>
                  Storefronts, corporate offices, bars & salons
                </span>
                <span className={styles.handoffGo} aria-hidden="true">
                  Explore business signage →
                </span>
              </span>
            </Link>
          </div>
        </Reveal>
      </main>
      <SiteFooter />
    </>
  );
}
