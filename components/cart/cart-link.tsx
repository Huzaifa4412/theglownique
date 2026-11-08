"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "./cart-provider";
export function CartLink() {
  const { items, ready } = useCart();
  const count = ready
    ? items.reduce((total, item) => total + item.quantity, 0)
    : 0;
  return (
    <Link
      href="/cart"
      className="cart-link"
      aria-label={`Cart, ${count} items`}
    >
      <ShoppingBag size={20} aria-hidden="true" />
      <span className="cart-link__label">Cart</span>
      <span className="cart-link__count">{count}</span>
    </Link>
  );
}
