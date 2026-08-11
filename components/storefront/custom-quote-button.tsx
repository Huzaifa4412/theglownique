"use client";

import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { useOptionalStorefront } from "@/components/storefront/storefront-context";
import { whatsappQuoteUrl } from "@/lib/site";
import { products } from "@/lib/store-data";

type CustomQuoteButtonProps = {
  className?: string;
  label?: string;
};

export function CustomQuoteButton({
  className = "button button--whatsapp text-sm py-3 px-5 font-bold",
  label = "Request a custom quote",
}: CustomQuoteButtonProps) {
  // Optional, because the colour studio embeds this button and now renders on
  // the LED neon product page too — and those routes sit outside
  // StorefrontShell, where the strict hook would throw during prerender.
  const storefront = useOptionalStorefront();
  const product = products[products.length - 1];

  // No shell means no product dialog to open, so fall back to the WhatsApp
  // quote — the same route every other CTA on the product pages takes.
  if (!storefront) {
    return (
      <a
        className={className}
        href={whatsappQuoteUrl(product.name)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{label}</span>
        <WhatsappIcon className="w-5 h-5 shrink-0" />
      </a>
    );
  }

  return (
    <button
      className={className}
      type="button"
      onClick={() => storefront.openProduct(product)}
    >
      <span>{label}</span>
      <WhatsappIcon className="w-5 h-5 shrink-0" />
    </button>
  );
}
