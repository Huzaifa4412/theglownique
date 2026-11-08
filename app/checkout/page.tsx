import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutPage } from "@/components/cart/checkout-page";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { checkoutConfigured } from "@/lib/checkout-email";
import { HAS_SANITY_WRITE_ACCESS } from "@/sanity/lib/write-client";
import "@/components/cart/commerce.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Send your custom sign designs and delivery details for a personalised quote.",
  alternates: { canonical: "/checkout" },
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    title: "Checkout | The Glownique",
    description: "Request your personalised custom sign quote.",
    url: "/checkout",
  },
};
export default function Page() {
  return (
    <>
      <ProductTopBar productName="custom signs" />
      <main id="main-content" className="commerce-page ph-no-capture">
        <nav className="commerce-breadcrumb" aria-label="Checkout progress">
          <Link href="/cart">1. Cart</Link>
          <span aria-current="step">2. Checkout</span>
          <span>3. Request sent</span>
        </nav>
        <div className="commerce-heading">
          <p className="eyebrow">Let’s make it happen</p>
          <h1>Checkout</h1>
          <p>
            Tell us where your sign is going. We’ll prepare your custom quote
            and email the next steps.
          </p>
        </div>
        <CheckoutPage
          available={checkoutConfigured() && HAS_SANITY_WRITE_ACCESS}
        />
      </main>
    </>
  );
}
