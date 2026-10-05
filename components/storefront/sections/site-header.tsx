"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { IconBox } from "@/components/icon-box";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { EtsyButton } from "@/components/storefront/etsy-button";
import { BACKLIT_PATH } from "@/lib/backlit-signs";
import { useNavTone } from "@/lib/use-nav-tone";

// The desktop bar has room for six items at its narrowest (1181px), and only
// just — a seventh overflows it. So it carries the destinations a first-time
// visitor is choosing between: a business buyer had no header route to the
// business signs at all, and "Products" led only to the consumer collections.
// Backlit signs get their own slot because the backlit ads land on that page
// and nothing in the header led back to it. Homepage anchors, the journal and
// the occasion collections stay in the mobile menu and the footer.
const desktopLinks = [
  ["Shop", "#shop"],
  ["Neon Signs", "/products/custom-neon-signs"],
  ["Backlit Signs", BACKLIT_PATH],
  ["Business Signs", "/business-signs"],
  ["Guides", "/guides"],
  ["Contact", "/contact"],
] as const;

const mobileLinks = [
  ["Shop", "#shop"],
  ["Neon Signs", "/products/custom-neon-signs"],
  ["Backlit Signs", BACKLIT_PATH],
  ["Business Signs", "/business-signs"],
  ["Signs for Occasions", "/custom-signage"],
  ["Design Your Neon", "#color-studio"],
  ["Buying Guides", "/guides"],
  ["Journal", "/blog"],
  ["FAQs", "#faq"],
  ["Contact", "/contact"],
] as const;

// `overlay` floats the bar over the page's first block instead of reserving a
// strip above it. Only for pages that open on imagery (the homepage banner):
// over a text-first page it would cover the heading.
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // An overlay bar starts on the banner, so it renders dark from the server
  // and the first paint needs no correction.
  const tone = useNavTone(headerRef, overlay ? "dark" : "light");

  return (
    <header
      ref={headerRef}
      className={`site-header glass-nav${overlay ? " site-header--overlay" : ""}`}
      id="site-header"
      data-tone={tone}
    >
      <div className="shell header__inner">
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <IconBox icon={menuOpen ? X : List} />
        </button>

        <Link className="brand" href="/" aria-label="The Glownique home">
          {/* The GQ mark carries no brand name on its own, so the wordmark
              stays as text and the image is decorative. The link already has
              an accessible name from aria-label.

              eager rather than priority: Next preloads both, but priority also
              stamps fetchPriority="high", and 5KB of header chrome shouldn't
              outrank the hero for bandwidth. */}
          <Image
            className="brand__logo"
            src="/brand/logo-mark.png"
            alt=""
            aria-hidden="true"
            width={100}
            height={60}
            loading="eager"
          />
          THE GLOWNIQUE
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {desktopLinks.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link
                href={href}
                key={href}
                className={href === BACKLIT_PATH ? "nav-link--featured" : undefined}
              >
                {label}
              </Link>
            ) : (
              <a href={href} key={href}>
                {label}
              </a>
            ),
          )}
        </nav>

        {/* Header search and the account icon were removed: the shop section
            has its own search field, and the account button only ever fired a
            "coming soon" toast — a control that does nothing costs more trust
            than it buys. */}
        <div className="header-actions">
          {/* Sits left of the pink CTA: buying an existing design on Etsy is
              the secondary path, a custom quote is still the primary one.
              Same utility classes as the CTA so the pair matches exactly. */}
          <EtsyButton className="text-xs px-4 py-2 rounded-full" />

          <CustomQuoteButton
            className="button button--whatsapp text-xs px-4 py-2 rounded-full hidden sm:inline-flex"
            label="Design Your Sign"
          />
        </div>
      </div>

      <nav
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="flex flex-col space-y-2.5 text-sm font-bold pb-3">
          {mobileLinks.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link
                key={href}
                href={href}
                className={href === BACKLIT_PATH ? "nav-link--featured" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ) : (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ),
          )}
        </div>
        <CustomQuoteButton
          className="button button--whatsapp text-xs w-full py-3 rounded-full text-center"
          label="Start Your Custom Design"
        />
        <EtsyButton className="text-xs w-full py-3 rounded-full text-center mt-2.5" />
      </nav>
    </header>
  );
}
