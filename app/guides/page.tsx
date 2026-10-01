import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { GUIDE_SUMMARIES, type GuideSummary } from "@/lib/guides";
import { productHref } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

import "./guides-hub.css";

const TITLE = "LED Neon & Business Sign Buying Guides";
const DESCRIPTION =
  "Guides to choosing an illuminated sign: cost, letter size, halo-lit vs front-lit, lightbox vs channel letters, LED vs glass neon and outdoor use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    url: "/guides",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "Custom LED neon signs glowing on a dark wall" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | The Glownique`,
    description: DESCRIPTION,
    images: ["/hero/neon-sign-hero.png"],
  },
};

/** `position` sets the crop point; `contain` shows a wide image whole on the dark ground. */
type Photo = { src: string; alt: string; position?: string; contain?: boolean };

/** The four sign types, each shown by a photo of that type, lit. */
const SIGN_TYPES: readonly { label: string; href: string; accent: string; photo: Photo }[] = [
  {
    label: "LED neon",
    href: productHref("custom-neon-signs"),
    accent: "#f40b68",
    photo: {
      src: "/blog/how-to-choose-a-custom-neon-sign/wedding-backdrop-name-sign.webp",
      alt: "Pink script neon name sign on a peach drape, framed by two flower arrangements",
    },
  },
  {
    label: "Channel letters",
    href: productHref("3d-metal-neon-signs"),
    accent: "#7c4dff",
    photo: {
      src: "/3d-metallic-neon-sign/duallit/1.webp",
      alt: "White 3D channel letters lit on their faces, with light spilling onto the dark wall behind",
    },
  },
  {
    label: "Lightboxes",
    href: productHref("ultra-thin-lightbox"),
    accent: "#ffb547",
    photo: {
      src: "/ultra-thin-slim-lightbox/lobbies-and-branding.jpg",
      alt: "Round lit lightbox sign reading Barb's Coffee House",
    },
  },
  {
    label: "Acrylic logo signs",
    href: productHref("uv-print-acrylic-signs"),
    accent: "#2fd4ff",
    photo: {
      src: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.webp",
      alt: "Layered acrylic logo sign reading Ciseaux Salon & Spa, lit on a dark reception wall",
    },
  },
];

/**
 * One photo per guide, chosen to show the thing the guide explains. A
 * comparison guide gets two, split on a diagonal. A guide missing here falls
 * back to the hero photo, so a new guide never renders without an image.
 */
const GUIDE_PHOTOS: Record<string, readonly Photo[]> = {
  "custom-business-sign-cost": [
    {
      src: "/3d-metallic-neon-sign/frontlit/1.jpeg",
      alt: "Maswan Sandi logo sign lit in orange and yellow with a glowing red outline",
    },
  ],
  "sign-size-viewing-distance": [
    {
      src: "/blog/how-to-choose-a-custom-neon-sign/handheld-name-sign-scale.webp",
      alt: "Woman holding a warm white neon sign reading Savannah, showing its size against a person",
      position: "center 80%",
    },
  ],
  "lightbox-vs-channel-letters": [
    {
      src: "/3d-metallic-neon-sign/frontlit/image.webp",
      alt: "Food Opera logo in orange 3D letters mounted on a wall",
    },
    {
      src: "/ultra-thin-slim-lightbox/lobbies-and-branding.jpg",
      alt: "Round lit lightbox sign reading Barb's Coffee House",
    },
  ],
  "front-lit-vs-halo-lit-vs-dual-lit": [
    {
      src: "/3d-metallic-neon-sign/duallit/2.webp",
      alt: "White 3D letters spelling AMERICA, lit so the glow falls on the surface around them",
    },
  ],
  "backlit-sign-wall-surfaces-and-standoffs": [
    {
      src: "/3d-metallic-neon-sign/frontlit/2.webp",
      alt: "A single white 3D letter R lit from behind, its glow pooling on the surface beneath it",
    },
  ],
  "indoor-vs-outdoor-illuminated-signs": [
    {
      src: "/ultra-thin-slim-lightbox/storefront-windows.webp",
      alt: "Round lit sign reading Cielo mounted on an outdoor wall beside a shop shutter",
    },
  ],
  "led-neon-vs-glass-neon": [
    {
      src: "/hero/neon-sign-hero.webp",
      alt: "White script LED neon sign reading Olivia with a pink heart, held up against a grey wall",
    },
  ],
  "how-led-neon-signs-are-made": [
    {
      src: "/neon-sign/allshape.webp",
      alt: "The same neon word shown with three backboard cuts: cut to square, cut to shape and cut to letter",
      contain: true,
    },
  ],
};

const FALLBACK_PHOTO: Photo = GUIDE_PHOTOS["led-neon-vs-glass-neon"][0];

/**
 * The hub groups guides by the question a buyer is at, not by format. A guide
 * missing from this map still appears, in the last group, so adding one to
 * lib/guides can never make it vanish from the hub.
 */
const GROUPS: readonly {
  id: string;
  heading: string;
  eyebrow: string;
  intro: string;
  accent: string;
  accentInk: string;
  slugs: readonly string[];
}[] = [
  {
    id: "plan",
    eyebrow: "Before you ask for a quote",
    heading: "Plan your sign",
    intro: "Start with budget, size and the type of sign that suits the space.",
    accent: "#f40b68",
    accentInk: "#ce0754",
    slugs: ["custom-business-sign-cost", "sign-size-viewing-distance", "lightbox-vs-channel-letters"],
  },
  {
    id: "specify",
    eyebrow: "Lighting, mounting and weather",
    heading: "Choose the lighting and the build",
    intro: "How the sign is lit, what it mounts to, and what changes when it goes outside.",
    accent: "#7c4dff",
    accentInk: "#5a2fd6",
    slugs: [
      "front-lit-vs-halo-lit-vs-dual-lit",
      "backlit-sign-wall-surfaces-and-standoffs",
      "indoor-vs-outdoor-illuminated-signs",
    ],
  },
  {
    id: "neon",
    eyebrow: "The technology",
    heading: "Understand LED neon",
    intro: "What LED neon is, how it compares with glass neon, and how a custom piece is made.",
    accent: "#ffb547",
    accentInk: "#a15c00",
    slugs: ["led-neon-vs-glass-neon", "how-led-neon-signs-are-made"],
  },
];

function groupGuides() {
  const bySlug = new Map(GUIDE_SUMMARIES.map((guide) => [guide.slug, guide]));
  const placed = new Set<string>();
  const groups = GROUPS.map((group) => {
    const guides: GuideSummary[] = group.slugs.flatMap((slug) => {
      const guide = bySlug.get(slug);
      if (!guide) return [];
      placed.add(slug);
      return [guide];
    });
    return { ...group, guides };
  });
  const unplaced = GUIDE_SUMMARIES.filter((guide) => !placed.has(guide.slug));
  if (unplaced.length > 0) groups[groups.length - 1].guides.push(...unplaced);
  return groups.filter((group) => group.guides.length > 0);
}

function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function accentStyle(accent: string, accentInk?: string): CSSProperties {
  return { "--accent": accent, ...(accentInk ? { "--accent-ink": accentInk } : {}) } as CSSProperties;
}

function photoProps(photo: Photo) {
  return {
    className: photo.contain ? "object-contain" : "object-cover",
    style: photo.position ? { objectPosition: photo.position } : undefined,
  };
}

function GuideCard({
  guide,
  feature,
  flip,
}: {
  guide: GuideSummary;
  feature: boolean;
  flip: boolean;
}) {
  const photos = GUIDE_PHOTOS[guide.slug] ?? [FALLBACK_PHOTO];
  const split = photos.length > 1;
  const sizes = feature ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 45vw, 100vw";
  const className = ["ghub-card", feature && "ghub-card--feature", feature && flip && "ghub-card--flip"]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className}>
      <div className={`ghub-photo${split ? " ghub-photo--split" : ""}`}>
        {split ? (
          <>
            {photos.slice(0, 2).map((photo, index) => (
              <div key={photo.src} className={`ghub-photo__half ghub-photo__half--${index === 0 ? "a" : "b"}`}>
                <Image src={photo.src} alt={photo.alt} fill sizes={sizes} {...photoProps(photo)} />
              </div>
            ))}
            <span className="ghub-photo__vs" aria-hidden="true">
              vs
            </span>
          </>
        ) : (
          <Image src={photos[0].src} alt={photos[0].alt} fill sizes={sizes} {...photoProps(photos[0])} />
        )}
        <span className="ghub-chip">
          <span className="ghub-dot" aria-hidden="true" />
          {guide.category}
        </span>
      </div>
      <div className="ghub-card__body">
        <h3>
          <Link href={guide.href}>{guide.title}</Link>
        </h3>
        <p className="ghub-card__summary">{guide.summary}</p>
        <div className="ghub-card__foot">
          <span>Last reviewed {formatDate(guide.updatedOn)}</span>
          <span className="ghub-card__read" aria-hidden="true">
            Read guide →
          </span>
        </div>
      </div>
    </article>
  );
}

export default function GuidesHubPage() {
  const pageUrl = `${SITE_URL}/guides`;
  const groups = groupGuides();
  const ordered = groups.flatMap((group) => group.guides);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#guides`,
        name: "Sign buying guides",
        itemListElement: ordered.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          url: `${SITE_URL}${guide.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Guides", item: pageUrl },
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
      <main id="main-content" className="ghub">
        <section className="ghub-hero" aria-labelledby="guides-heading">
          <div className="ghub-hero__glow ghub-hero__glow--pink" aria-hidden="true" />
          <div className="ghub-hero__glow ghub-hero__glow--violet" aria-hidden="true" />
          <div className="ghub-shell ghub-hero__inner">
            <div>
              <nav aria-label="Breadcrumb">
                <ol className="ghub-crumbs">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">Guides</li>
                </ol>
              </nav>
              <p className="ghub-eyebrow">Sign buying guides</p>
              <h1 id="guides-heading" className="ghub-h1">
                Guides to choosing, sizing and specifying{" "}
                <span className="ghub-h1__lit">illuminated signs</span>
              </h1>
              <p className="ghub-lede">
                Plain-English answers to the questions buyers ask before ordering a custom LED neon sign,
                channel letters, a lightbox or an acrylic logo sign. Technical points link to the standard
                or manufacturer they come from, and every guide shows when it was last reviewed.
              </p>
              <nav aria-label="Guide sections" className="ghub-jump">
                {groups.map((group) => (
                  <a key={group.id} href={`#${group.id}`} style={accentStyle(group.accent)}>
                    <span className="ghub-dot" aria-hidden="true" />
                    {group.heading}
                  </a>
                ))}
              </nav>
              <ul className="ghub-facts">
                <li>
                  <strong>{ordered.length}</strong> guides
                </li>
                <li>
                  <strong>Sources</strong> linked in every guide
                </li>
                <li>
                  <strong>Review date</strong> on every page
                </li>
              </ul>
            </div>

            <ul className="ghub-mosaic" aria-label="Sign types">
              {SIGN_TYPES.map((type, index) => (
                <li key={type.label}>
                  <Link href={type.href} className="ghub-tile" style={accentStyle(type.accent)}>
                    <Image
                      src={type.photo.src}
                      alt={type.photo.alt}
                      fill
                      preload={index < 2}
                      sizes="(min-width: 1024px) 280px, 50vw"
                      className="object-cover"
                    />
                    <span className="ghub-tile__label">
                      <span>{type.label}</span>
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {groups.map((group, groupIndex) => (
          <section
            key={group.id}
            aria-labelledby={group.id}
            className={`ghub-group${groupIndex % 2 === 1 ? " ghub-group--tint" : ""}`}
            style={accentStyle(group.accent, group.accentInk)}
          >
            <div className="ghub-shell">
              <header className="ghub-group__head" id={`${group.id}-head`}>
                <p className="ghub-group__eyebrow">
                  <span className="ghub-dot" aria-hidden="true" />
                  {group.eyebrow}
                </p>
                <h2 id={group.id}>{group.heading}</h2>
                <p>{group.intro}</p>
              </header>
              <div className="ghub-grid">
                {group.guides.map((guide, index) => (
                  <GuideCard
                    key={guide.slug}
                    guide={guide}
                    feature={index === 0 && group.guides.length % 2 === 1}
                    flip={groupIndex % 2 === 1}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="ghub-cta" aria-labelledby="guides-cta">
          <div className="ghub-shell ghub-cta__inner">
            <div>
              <p className="ghub-eyebrow">Free design mockup</p>
              <h2 id="guides-cta">Ready to see your design?</h2>
              <p>
                Send your logo or wording on WhatsApp for a free design mockup and a quote. You only pay
                once you have approved the design.
              </p>
              <div className="ghub-cta__actions">
                <Link href="/contact" className="ghub-btn">
                  Get a free mockup <span aria-hidden="true">→</span>
                </Link>
                <Link href="/business-signs" className="ghub-link">
                  Business signs
                </Link>
                <Link href={productHref("custom-neon-signs")} className="ghub-link">
                  Custom LED neon signs
                </Link>
              </div>
            </div>
            <div className="ghub-cta__photo">
              <Image
                src="/blog/how-to-choose-a-custom-neon-sign/living-room-family-name-sign.webp"
                alt="Warm white script neon sign reading The Dohertys on a dark wall above a sofa"
                fill
                sizes="(min-width: 1024px) 480px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
