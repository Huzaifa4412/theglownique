import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "How Glownique orders are made and shipped: handcrafted in around 10–15 days, then sent worldwide with tracked delivery. Shipping cost is confirmed with your quote. How customs and duties work.",
  alternates: { canonical: "/shipping" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Shipping & Delivery | The Glownique",
    description:
      "Handcrafted in around 10–15 days, then sent worldwide with tracked delivery. Shipping is confirmed with your quote.",
    url: "/shipping",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique Shipping and Delivery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Delivery | The Glownique",
    description:
      "Handcrafted in around 10–15 days, then sent worldwide with tracked delivery. Shipping is confirmed with your quote.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="Getting it to you"
      title="Shipping & Delivery"
      intro="How long your sign takes to make, how it travels, and what to do if something arrives damaged."
    >
      <h2>Where we ship and what it costs</h2>
      <p>
        We ship to almost every country with <strong>tracked delivery</strong>. Shipping is
        confirmed with your quote before you pay, and the exact figure is shown again at Etsy
        checkout — so the number you agree to is the number you pay.
      </p>
      <div className="legal-note">
        Our free-worldwide-delivery promotion ended on 11 August 2026. If you were quoted while it
        was running and haven&apos;t ordered yet, tell us — we&apos;ll honour what your quote said.
      </div>

      <h2>How long it takes</h2>
      <dl>
        <dt>Day 1 — Enquiry and quote</dt>
        <dd>You send your words, size and colour. We reply with a quote.</dd>

        <dt>Day 2 — Design confirmation</dt>
        <dd>
          You review and approve your free digital mockup. Production doesn&apos;t start until you
          do.
        </dd>

        <dt>Days 3–10 — Handcraft and packing</dt>
        <dd>Your sign is shaped, light-tested, quality-checked and packed.</dd>

        <dt>Days 10–15 — Shipping</dt>
        <dd>Tracked delivery to your door.</dd>
      </dl>
      <p>
        So roughly <strong>10–15 days from approval to arrival</strong> for most orders. Larger 3D
        metal signage and complex multi-colour work can take longer; we&apos;ll tell you the
        realistic timeline with your quote. If you have a hard deadline, say so before ordering and
        we&apos;ll give you an honest answer rather than an optimistic one.
      </p>

      <h2>Tracking your order</h2>
      <p>
        Because payment runs through our Etsy shop, your order and tracking number appear in your
        Etsy account and in Etsy&apos;s confirmation emails. You can also just message us on
        WhatsApp and we&apos;ll check for you.
      </p>

      <h2>Customs, duties and import taxes</h2>
      <div className="legal-note">
        Your shipping charge covers <strong>carriage only</strong>. It does not cover any import duties, customs
        charges or local sales tax your own country may apply — those are set by your government, not
        by us, and are the recipient&apos;s responsibility. If you&apos;re ordering from outside our
        dispatch country and want to know what to expect, ask us before you order.
      </div>

      <h2>Packaging</h2>
      <p>
        Signs are fragile in transit even though the LED neon itself is shatterproof silicone rather
        than glass. Everything is packed with protective layers and braced against movement. Please
        keep the packaging until you&apos;ve unpacked and powered on your sign — if you do need to
        make a claim, the original packaging matters.
      </p>

      <h2>If it arrives damaged</h2>
      <p>
        Tell us within <strong>48 hours</strong> of delivery and send photographs of the damage and
        the packaging. We&apos;ll arrange a repair or replacement. Full details on the{" "}
        <Link href="/returns">returns and warranty page</Link>.
      </p>

      <h2>Wrong address?</h2>
      <p>
        Let us know as soon as possible. Before dispatch we can usually change it without any
        trouble. After dispatch it depends on the courier, and a re-delivery charge may apply.
      </p>
    </LegalPage>
  );
}
