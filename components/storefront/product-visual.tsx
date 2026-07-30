import type { CSSProperties } from "react";

import type { Product } from "@/lib/store-data";

export function ProductVisual({ product }: { product: Product }) {
  return (
    <div
      className="product-visual"
      style={
        {
          "--neon": product.color,
          "--wall": product.background,
        } as CSSProperties
      }
    >
      <span className="neon-wire" aria-hidden="true" />
      <span className="neon-copy">{product.name}</span>
    </div>
  );
}
