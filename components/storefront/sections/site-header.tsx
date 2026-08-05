"use client";

import { useState } from "react";
import Link from "next/link";
import { List, MagnifyingGlass, User, X } from "@phosphor-icons/react";
import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";

const navigationLinks = [
  ["Shop", "#shop"],
  ["Custom Neon", "#color-studio"],
  ["Products", "/products"],
  ["Inspiration", "#inspiration"],
  ["FAQs", "#faq"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { search, changeSearch, showToast } = useStorefront();

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

        <a className="brand" href="/" aria-label="The Glownique home">
          <span className="brand__mark" aria-hidden="true" />
          THE GLOWNIQUE
        </a>

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

        <div className="header-actions">
          <label className="header-search">
            <span className="sr-only">Search neon signs</span>
            <input
              type="search"
              value={search}
              placeholder="Search neon signs..."
              autoComplete="off"
              onChange={(event) =>
                changeSearch(event.currentTarget.value, true)
              }
            />
            <IconBox icon={MagnifyingGlass} />
          </label>

          <CustomQuoteButton
            className="button button--primary text-xs px-4 py-2 rounded-full hidden sm:inline-flex"
            label="Design Your Sign"
          />

          <button
            className="icon-button account-button"
            type="button"
            aria-label="Account"
            onClick={() =>
              showToast(
                "Account sign-in will be available with the full store backend."
              )
            }
          >
            <IconBox icon={User} />
          </button>
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
          className="button button--primary text-xs w-full py-3 rounded-full text-center"
          label="Start Your Custom Design"
        />
      </nav>
    </header>
  );
}
