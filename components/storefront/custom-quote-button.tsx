"use client";

import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { useCart } from "@/components/cart/cart-provider";
import { products } from "@/lib/store-data";

type CustomQuoteButtonProps = {
  className?: string;
  label?: string;
  productName?: string;
};

export function CustomQuoteButton({
  className = "button button--whatsapp text-sm py-3 px-5 font-bold",
  label = "Request a custom quote",
  productName,
}: CustomQuoteButtonProps) {
  const cart = useCart();
  const product = products[products.length - 1];
  const targetProduct = products.find((entry) => entry.name === productName) ?? product;

  return (
    <button
      className={className}
      type="button"
      onClick={() => cart.openProduct(targetProduct)}
    >
      <span>{label}</span>
      <WhatsappIcon className="w-5 h-5 shrink-0" />
    </button>
  );
}
