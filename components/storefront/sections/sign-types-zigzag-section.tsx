import Link from "next/link";
import type { CSSProperties } from "react";

import { ZigzagMedia, type ZigzagImage } from "@/components/storefront/sections/zigzag-media";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { BACKLIT_PATH } from "@/lib/backlit-signs";
import { requireProductPage, type ProductPage } from "@/lib/product-catalog";

import "./signage-sections.css";

/**
 * The three sign types beyond neon, in an alternating image / text layout,
 * directly after the neon hero and its use-case band.
 *
 * Each row summarises one sign type in a few sentences written only for this
 * page, then links to the one canonical page that owns it. The "what is a …?"
 * definition deliberately lives on the product page alone: when the homepage
 * repeated it word for word, two pages competed to answer the same query.
 *
 * Head terms (growth-system/KEYWORD-MAP.csv): channel letter signs (3,600),
 * acrylic signs / custom acrylic signs (2,900), LED lightbox signs, LED signs
 * for business (2,400).
 *
 * Specs, paths and use-case links are read from lib/product-catalog.ts, so
 * this section cannot contradict a product page. The summary, the "best for"
 * list and the photos are the only copy that lives here.
 *
 * Server component; the quote buttons are the only client islands.
 */

type Row = {
  slug: string;
  eyebrow: string;
  heading: string;
  /** A summary written for the homepage only. The product page owns the definition. */
  summary: string;
  bestFor: readonly string[];
  /** Spec labels to show, in this order, from the catalog's spec table. */
  specLabels: readonly string[];
  /** Rotated in order; the first is the one shown before JavaScript runs. */
  images: readonly ZigzagImage[];
  /** Short caption on the main photo, for photos with no label of their own. */
  caption: string;
  /** A detail page that is not one of the four catalog sign types but belongs
      to this row, e.g. backlit signs under channel letters. */
  related?: { lead: string; label: string; href: string };
};

// Channel-letter lighting styles, worded as what you can see in the photo.
const FRONT_LIT = "Front-lit: the letter faces glow";
const HALO_LIT = "Halo-lit (backlit): glow behind the letters";
const DUAL_LIT = "Dual-lit: lit faces + halo behind";

const ROWS: readonly Row[] = [
  {
    slug: "3d-metal-neon-signs",
    eyebrow: "For storefronts & reception walls",
    heading: "3D metal channel letter signs",
    summary:
      "Individual 3D letters in stainless steel, lit from inside with LEDs, for the name on a façade or a logo on a reception wall. Choose front-lit for the loudest read, halo-lit for a softer architectural glow, or both. These make excellent custom business signs outdoor.",
    bestFor: [
      "The business name on a façade, read from across the street",
      "Halo-lit logos on reception and lobby walls",
      "Restaurant, salon and retail frontage, day and night",
    ],
    specLabels: ["Lighting styles", "Finishes", "Use"],
    // Each photo names the lighting style it actually shows, so the caption
    // changes with the slide instead of listing all three over every photo.
    // "Halo-lit" and "backlit" are the same construction; buyers search both,
    // so the label carries both words.
    images: [
      { src: "/3d-metallic-neon-sign/frontlit/image.webp", label: FRONT_LIT, alt: "Frontlit 3D metal channel letters spelling Food Opera, the script faces glowing bright orange against a plain wall" },
      { src: "/3d-metallic-neon-sign/duallit/1.webp", label: DUAL_LIT, alt: "Dual-lit channel letters with glowing white faces and dark green returns, the halo spilling onto the floor" },
      { src: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp", label: HALO_LIT, alt: "Halo-lit STUDIO.S channel letters on a corporate reception wall, the light spilling onto the plaster behind them" },
      { src: "/3d-metallic-neon-sign/frontlit/2.webp", label: FRONT_LIT, alt: "Front-lit stainless steel channel letter R with a glowing white acrylic face, on a workshop bench" },
      { src: "/3d-metallic-neon-sign/duallit/2.webp", label: DUAL_LIT, alt: "Dual-lit 3D metal letters spelling AMERICA, with glowing white faces and a halo of light spilling onto the floor behind" },
      // .png: this photo has no .webp on disk, and the .webp path 404'd.
      { src: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png", label: HALO_LIT, alt: "Halo-lit 3D metal logo sign glowing softly onto a corporate reception wall" },
    ],
    caption: "Front-lit, halo-lit or dual-lit",
    // Backlit has its own detail page (the landing page for the backlit ads)
    // but is not a catalog sign type, so nothing on the homepage linked to it
    // except one banner slide.
    related: { lead: "Only want the halo glow?", label: "See backlit signs →", href: BACKLIT_PATH },
  },
  {
    slug: "ultra-thin-lightbox",
    eyebrow: "For menus, windows & promotions",
    heading: "Ultra-thin LED lightbox signs",
    summary:
      "A lit display frame under an inch deep, for menus, windows and promotions whose message changes. The printed face swaps without tools, so a new menu costs a print, not a new sign.",
    bestFor: [
      "Menu boards and specials that change with the season",
      "Shop windows and in-store promotions",
      "Shaped logo lightboxes for bars, studios and trade stands",
    ],
    specLabels: ["Profile", "Graphic change", "Mounting"],
    images: [
      { src: "/ultra-thin-slim-lightbox/IMG-20260803-WA0008.webp", alt: "Shaped LED lightbox sign of the Flying Fish beer logo, lit in blue and yellow against a brick wall" },
      { src: "/ultra-thin-slim-lightbox/IMG-20260803-WA0010.webp", alt: "Backlit LED lightbox sign of a blue Charlotte Hornets Dell Curry number 30 jersey" },
      { src: "/ultra-thin-slim-lightbox/IMG-20260803-WA0004.jpg", alt: "Shaped LED lightbox sign reading Sinners Tattoo in white letters with a red cross, lit against a white wall" },
      { src: "/ultra-thin-slim-lightbox/retail-displays.jpg", alt: "Three slim LED lightbox posters for coffee, a burger and a fashion sale on a shop wall" },
      { src: "/ultra-thin-slim-lightbox/menu-boards.jpg", alt: "Two illuminated slim lightbox menu boards on a restaurant wall" },
    ],
    caption: "Under an inch deep, lit edge to edge",
  },
  {
    slug: "uv-print-acrylic-signs",
    eyebrow: "For full-colour logos & brand walls",
    heading: "Custom acrylic logo signs",
    summary:
      "Your full-colour logo printed straight onto acrylic and traced with LED neon, for artwork neon alone cannot draw: gradients, photos and fine type. Built single-layer or layered for 3D depth, these make stunning acrylic business signs.",
    bestFor: [
      "Full-colour logos, gradients and fine text neon cannot trace",
      "Reception walls and office branding",
      "Salon, café and retail logo walls",
    ],
    specLabels: ["Print", "Base", "Depth"],
    images: [
      { src: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.webp", alt: "Layered 3D acrylic UV-print logo sign reading Ciseaux Salon & Spa, lit on a dark reception wall" },
      { src: "/3d-arcylic/custom-acrylic-logo-sign-uv-printed.webp", alt: "3D acrylic UV-print sign reading Sabroso with a glowing contour outline on a restaurant wall" },
    ],
    caption: "Printed detail, traced in neon",
  },
];

function pickSpecs(product: ProductPage, labels: readonly string[]) {
  return labels.flatMap((label) => {
    const spec = product.specs.find((candidate) => candidate.label === label);
    if (!spec) throw new Error(`${product.slug} has no "${label}" spec.`);
    return [spec];
  });
}

/** Industry and occasion pages the catalog already links this sign type to. */
function getUseCaseLinks(product: ProductPage) {
  const seen = new Set<string>();
  return product.useCases.flatMap((useCase) => {
    if (!useCase.href || !useCase.linkLabel || seen.has(useCase.href)) return [];
    seen.add(useCase.href);
    return [{ href: useCase.href, label: useCase.linkLabel }];
  });
}

export function SignTypesZigzagSection() {
  const rows = ROWS.map((row) => {
    const product = requireProductPage(row.slug);
    return {
      ...row,
      product,
      specs: pickSpecs(product, row.specLabels),
      links: getUseCaseLinks(product),
    };
  });

  return (
    <section className="zigzag" aria-labelledby="zigzag-heading">
      <div className="signage-shell">
        <div className="zigzag__head">
          <p className="signage-eyebrow">Beyond neon</p>
          <h2 id="zigzag-heading" className="signage-h2">
            Three more ways to <em>light up a business</em>
          </h2>
          <p className="signage-lead">
            Neon is one of four sign types we make. For a façade, a changing menu or a full-colour
            logo, one of these usually does the job better. Every one is made to order after a
            free design mockup.
          </p>
        </div>

        <div className="zigzag__rows">
          {rows.map((row, index) => (
            <article
              key={row.slug}
              className={`zigzag-row${index % 2 === 1 ? " zigzag-row--flip" : ""}`}
              style={{ "--row-accent": row.product.accent } as CSSProperties}
              aria-labelledby={`zigzag-${row.slug}`}
            >
              <ZigzagMedia
                label={row.heading}
                images={row.images}
                caption={row.caption}
                offsetMs={index * 1600}
              />

              <div className="zigzag-row__copy">
                <p className="zigzag-row__eyebrow">{row.eyebrow}</p>
                <h3 id={`zigzag-${row.slug}`} className="zigzag-row__title">
                  <Link href={row.product.path}>{row.heading}</Link>
                </h3>

                <p className="zigzag-row__answer">{row.summary}</p>

                <p className="zigzag-row__label">Best for</p>
                <ul className="zigzag-row__best">
                  {row.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <dl className="zigzag-row__specs">
                  {row.specs.map((spec) => (
                    <div key={spec.label}>
                      <dt>{spec.label}</dt>
                      <dd>{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                {row.links.length > 0 ? (
                  <p className="zigzag-row__uses">
                    <span>Popular for</span>
                    {row.links.map((link) => (
                      <Link key={link.href} href={link.href}>
                        {link.label}
                      </Link>
                    ))}
                  </p>
                ) : null}

                {row.related ? (
                  <p className="zigzag-row__uses">
                    <span>{row.related.lead}</span>
                    <Link href={row.related.href}>{row.related.label}</Link>
                  </p>
                ) : null}

                <div className="zigzag-row__actions">
                  <Link href={row.product.path} className="button button--primary">
                    Explore {row.product.category.toLowerCase()}
                  </Link>
                  <CustomQuoteButton
                    className="zigzag-row__quote"
                    label="Get a free mockup"
                    productName={row.product.singular}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
