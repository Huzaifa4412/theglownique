"use client";

import { ArrowRight } from "@phosphor-icons/react";

import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import { products } from "@/lib/store-data";

type CustomQuoteButtonProps = {
  className: string;
  label: string;
};

export function CustomQuoteButton({
  className,
  label,
}: CustomQuoteButtonProps) {
  const { openProduct } = useStorefront();

  return (
    <button
      className={className}
      type="button"
      onClick={() => openProduct(products[products.length - 1])}
    >
      {label} <IconBox icon={ArrowRight} />
    </button>
  );
}
