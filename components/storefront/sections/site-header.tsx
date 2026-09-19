"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import styles from "../studio-chrome.module.css";

const links = [
  ["Sign types", "/products"],
  ["For business", "/business-signs"],
  ["For your space", "/custom-signage"],
  ["Journal", "/blog"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (!menuOpen) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node))
        setMenuOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [menuOpen]);
  return (
    <header className={styles.header} id="site-header" ref={headerRef}>
      <div className={styles.headerInner}>
        <Link className={styles.brand} href="/" aria-label="The Glownique home">
          <Image src="/brand/logo-mark.png" width={66} height={40} alt="" />
          <span>
            THE GLOWNIQUE<small>THE CUSTOM SIGN STUDIO</small>
          </span>
        </Link>
        <nav className={styles.desktopNav} aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                pathname === href || pathname.startsWith(`${href}/`)
                  ? "page"
                  : undefined
              }
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className={styles.headerActions}>
          <CustomQuoteButton
            className={styles.quote}
            label="Create your sign"
          />
          <button
            ref={menuButton}
            className={styles.menuButton}
            aria-controls="studio-mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            type="button"
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      <nav
        className={styles.mobileNav}
        id="studio-mobile-menu"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            aria-current={
              pathname === href || pathname.startsWith(`${href}/`)
                ? "page"
                : undefined
            }
          >
            {label}
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
        <Link href="/#shop" onClick={() => setMenuOpen(false)}>
          Browse all designs <span>↗</span>
        </Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>
          Contact the studio <span>↗</span>
        </Link>
      </nav>
    </header>
  );
}
