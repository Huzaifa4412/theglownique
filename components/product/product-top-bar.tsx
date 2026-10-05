"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

import { BACKLIT_PATH } from "@/lib/backlit-signs";
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

        {/* Five sign-type links fit on one line from about 1150px; below that
            they may wrap to two. Guides and Contact join once there is room
            for seven. The journal link lives in the footer. */}
        <nav
          className="hidden items-center gap-3 text-xs font-bold uppercase tracking-wide text-(--glass-muted) lg:flex min-[1150px]:[&_a]:whitespace-nowrap min-[1340px]:gap-5"
          aria-label="Primary navigation"
        >
          {PRODUCT_PAGES.map((p) => (
            <Link
              key={p.slug}
              href={p.path}
              className="transition-colors hover:text-(--glass-accent)"
            >
              {p.category}
            </Link>
          ))}
          {/* Not a catalog sign type, so the loop above doesn't produce it; it
              is the landing page for the backlit ads and needs a header route. */}
          <Link href={BACKLIT_PATH} className="transition-colors hover:text-(--glass-accent)">
            Backlit Signs
          </Link>
          <Link href="/guides" className="transition-colors hover:text-(--glass-accent) max-[1339px]:hidden">
            Guides
          </Link>
          <Link href="/contact" className="transition-colors hover:text-(--glass-accent) max-[1339px]:hidden">
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
