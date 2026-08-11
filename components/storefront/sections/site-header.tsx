"use client";

import { useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { IconBox } from "@/components/icon-box";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { EtsyButton } from "@/components/storefront/etsy-button";

const navigationLinks = [
  ["Shop", "#shop"],
  ["Custom Neon", "#color-studio"],
  ["Products", "/products"],
  ["Inspiration", "#shop"],
  ["FAQs", "#faq"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" id="site-header">
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
          <span className="brand__mark" aria-hidden="true" />
          THE GLOWNIQUE
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigationLinks.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link href={href} key={href}>
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
        <div className="flex flex-col space-y-2.5 text-sm font-bold text-[#1e1a22] pb-3">
          {navigationLinks.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
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
