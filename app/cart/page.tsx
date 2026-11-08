import type { Metadata } from "next";
import Link from "next/link";
import { CartPage } from "@/components/cart/cart-page";
import { ProductTopBar } from "@/components/product/product-top-bar";
import "@/components/cart/commerce.css";

export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your custom sign designs and quantities before requesting a quote.",
  alternates: { canonical: "/cart" },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    title: "Your Cart | The Glownique",
    description: "Review your custom sign designs.",
    url: "/cart",
  },
};
export default function Page() {
  return (
    <>
      <ProductTopBar productName="custom signs" />
      <main id="main-content" className="commerce-page ph-no-capture">
        <nav className="commerce-breadcrumb" aria-label="Checkout progress">
          <span aria-current="step">1. Cart</span>
          <span>2. Checkout</span>
          <span>3. Request sent</span>
        </nav>
        <div className="commerce-heading">
          <p className="eyebrow">A little closer to your glow</p>
          <h1>Your cart</h1>
          <p>
            Your ideas, ready to take shape. Review each design before
            requesting your quote.
          </p>
        </div>
        <CartPage />
        <Link href="/contact" className="commerce-help">
          Need a hand with your design? Contact us.
        </Link>
      </main>
    </>
  );
}
