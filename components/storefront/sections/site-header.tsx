"use client";

import {
  List,
  MagnifyingGlass,
  User,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";

import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";

const navigationLinks = [
  ["Shop", "#shop"],
  ["Custom neon", "#custom"],
  ["Collections", "#categories"],
  ["Inspiration", "#inspiration"],
  ["About", "#about"],
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

        <a className="brand" href="#" aria-label="The Glownique home">
          <span className="brand__mark" aria-hidden="true" />
          THE GLOWNIQUE
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigationLinks.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
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
          <button
            className="icon-button account-button"
            type="button"
            aria-label="Account"
            onClick={() =>
              showToast(
                "Account sign-in will be available with the full store backend.",
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
        inert={!menuOpen}
      >
        {navigationLinks.map(([label, href]) => (
          <a
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
