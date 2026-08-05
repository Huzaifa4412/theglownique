import Link from "next/link";

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
          aria-label="Product pages"
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
        </nav>

        <a
          href={whatsappQuoteUrl(productName)}
          target="_blank"
          rel="noopener noreferrer"
          className="button button--primary rounded-full px-4 py-2 text-xs"
        >
          Get a free quote
        </a>
      </div>
    </header>
  );
}
