"use client";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
import { products } from "@/lib/store-data";

export function ConfigureSignButton({ contentId }: { contentId: string }) {
  const { openProduct } = useCart();
  const productId =
    {
      "custom-neon-signs": 16,
      "3d-metal-neon-signs": 2,
      "ultra-thin-lightbox": 3,
      "uv-print-acrylic-signs": 4,
    }[contentId] ?? 16;
  const product = products.find((entry) => entry.id === productId)!;
  return (
    <button
      type="button"
      className="button button--primary w-full mt-3"
      onClick={() => openProduct(product)}
    >
      <ShoppingBag size={20} />
      Configure &amp; add to cart
    </button>
  );
}
