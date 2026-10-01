"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { whatsappQuoteUrl } from "@/lib/site";
import { useNavTone } from "@/lib/use-nav-tone";

export function ProductTopBar({ productName }: { productName: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const tone = useNavTone(headerRef);

  return (
    <header ref={headerRef} className="glass-nav z-50" data-tone={tone}>
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="brand" aria-label="The Glownique home">
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

        <nav
          className="hidden items-center gap-5 text-xs font-bold uppercase tracking-wide text-(--glass-muted) lg:flex"
          aria-label="Primary navigation"
        >
          {/* The logo already links home; the slot goes to the buying guides,
              which inner pages had no header route to. */}
          {PRODUCT_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={p.path}
              className="transition-colors hover:text-(--glass-accent)"
            >
              {p.category}
            </Link>
          ))}
          <Link href="/guides" className="transition-colors hover:text-(--glass-accent)">
            Guides
          </Link>
          <Link href="/blog" className="transition-colors hover:text-(--glass-accent)">
            Journal
          </Link>
          <Link href="/contact" className="transition-colors hover:text-(--glass-accent)">
            Contact
          </Link>
        </nav>

        <a
          href={whatsappQuoteUrl(productName)}
          target="_blank"
          rel="noopener noreferrer"
          data-meta-source="product-top-bar"
          className="button button--whatsapp rounded-full px-4 py-2.5 text-sm font-bold flex items-center gap-2"
        >
          <span>Get a free quote</span>
          <WhatsappIcon className="h-4.5 w-4.5 shrink-0" />
        </a>
      </div>
    </header>
  );
}
