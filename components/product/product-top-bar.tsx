"use client";

import Link from "next/link";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { whatsappQuoteUrl } from "@/lib/site";

export function ProductTopBar({ productName }: { productName: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfe4] bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="brand" aria-label="The Glownique home">
          <span className="brand__mark" aria-hidden="true" />
          THE GLOWNIQUE
        </Link>

        <nav
          className="hidden items-center gap-5 text-xs font-bold uppercase tracking-wide text-[#5e5862] lg:flex"
          aria-label="Primary navigation"
        >
          <Link href="/" className="transition-colors hover:text-[#ce0754]">
            Home
          </Link>
          {PRODUCT_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="transition-colors hover:text-[#ce0754]"
            >
              {p.category}
            </Link>
          ))}
          <Link href="/contact" className="transition-colors hover:text-[#ce0754]">
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
