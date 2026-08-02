"use client";

import { useState } from "react";
import {
  List,
  MagnifyingGlass,
  User,
  X,
  Sparkle,
  ShoppingBag,
  MagicWand,
  Handshake,
  ImageSquare,
} from "@phosphor-icons/react";
import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import {
  Menu,
  MenuItem,
  HoveredLink,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";

export function SiteHeader() {
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { search, changeSearch, showToast } = useStorefront();

  return (
    <header className="site-header" id="site-header">
      <div className="shell header__inner">
        {/* Brand & Mobile Menu Trigger */}
        <div className="flex items-center gap-3">
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
        </div>

        {/* Desktop Interactive Menu */}
        <nav className="desktop-nav justify-center" aria-label="Primary navigation">
          <Menu setActive={setActive}>
            {/* Shop Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Shop">
              <div className="flex flex-col space-y-2 text-xs font-semibold p-1 min-w-[220px]">
                <div className="text-[10px] uppercase font-bold text-[#f40b68] tracking-widest px-2 pb-1 border-b border-[#eadfe4]">
                  Browse Collections
                </div>
                <HoveredLink
                  href="#shop"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors flex items-center gap-2.5"
                >
                  <ShoppingBag className="w-4 h-4 text-[#f40b68]" />
                  <span>All Neon Signs</span>
                </HoveredLink>
                <HoveredLink
                  href="#shop"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors flex items-center gap-2.5"
                >
                  <Sparkle className="w-4 h-4 text-[#f40b68]" />
                  <span>Bestseller Collection</span>
                </HoveredLink>
                <HoveredLink
                  href="#shop"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors flex items-center gap-2.5"
                >
                  <Handshake className="w-4 h-4 text-[#f40b68]" />
                  <span>Wedding & Event Signs</span>
                </HoveredLink>
              </div>
            </MenuItem>

            {/* Custom Neon Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Custom Neon">
              <div className="grid grid-cols-2 gap-3 p-1 min-w-[360px]">
                <ProductItem
                  title="Custom Text Design"
                  description="Type your custom quote, select fonts & colors."
                  href="#concept-to-glow"
                  src="/before-after/after.png"
                />
                <ProductItem
                  title="Business Logo Sign"
                  description="Upload your official logo for commercial neon craft."
                  href="#why-us"
                  src="/before-after/before.png"
                />
              </div>
            </MenuItem>

            {/* Collections Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Collections">
              <div className="flex flex-col space-y-1.5 text-xs font-semibold p-1 min-w-[200px]">
                <HoveredLink
                  href="#categories"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors"
                >
                  Salon & Beauty Aesthetic
                </HoveredLink>
                <HoveredLink
                  href="#categories"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors"
                >
                  Cafe & Restaurant Hospitality
                </HoveredLink>
                <HoveredLink
                  href="#categories"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors"
                >
                  Gaming & RGB Lounge Setup
                </HoveredLink>
                <HoveredLink
                  href="#categories"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors"
                >
                  Home & Bedroom Decor
                </HoveredLink>
              </div>
            </MenuItem>

            {/* Inspiration Dropdown */}
            <MenuItem setActive={setActive} active={active} item="Inspiration">
              <div className="flex flex-col space-y-2 text-xs font-semibold p-1 min-w-[220px]">
                <HoveredLink
                  href="#inspiration"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors flex items-center gap-2.5"
                >
                  <ImageSquare className="w-4 h-4 text-[#f40b68]" />
                  <span>Real Customer Gallery</span>
                </HoveredLink>
                <HoveredLink
                  href="#why-us"
                  className="hover:text-[#f40b68] px-2.5 py-1.5 rounded-lg hover:bg-[#fff0f5] transition-colors flex items-center gap-2.5"
                >
                  <MagicWand className="w-4 h-4 text-[#f40b68]" />
                  <span>Before / After Transformation</span>
                </HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </nav>

        {/* Header Actions */}
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
            label="Design Sign"
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

      {/* Mobile Drawer Navigation */}
      <nav
        className={`mobile-nav${menuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <div className="flex flex-col space-y-3 text-sm font-bold text-[#1e1a22] pb-4">
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            Shop All Signs
          </a>
          <a href="#concept-to-glow" onClick={() => setMenuOpen(false)}>
            Custom Neon Customizer
          </a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>
            Collections
          </a>
          <a href="#inspiration" onClick={() => setMenuOpen(false)}>
            Customer Gallery
          </a>
          <a href="#why-us" onClick={() => setMenuOpen(false)}>
            Why Choose Us
          </a>
        </div>
        <CustomQuoteButton
          className="button button--primary text-xs w-full py-3 rounded-full text-center"
          label="Start Your Custom Design"
        />
      </nav>
    </header>
  );
}
