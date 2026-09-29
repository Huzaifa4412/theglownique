import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";

const DESCRIPTION =
  "How long a custom sign takes, step by step: a free mockup within 24 hours, then 3–5 business days to make an LED neon sign and 3–8 to deliver it. Free worldwide delivery.";

export const metadata: Metadata = {
  title: "Shipping & Delivery Times for Custom Signs",
  description: DESCRIPTION,
  alternates: { canonical: "/shipping" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Shipping & Delivery Times for Custom Signs | The Glownique",
    description: DESCRIPTION,
    url: "/shipping",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique Shipping and Delivery" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shipping & Delivery Times for Custom Signs | The Glownique",
    description: DESCRIPTION,
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function ShippingPage() {
  return (
    <LegalPage
      eyebrow="Getting it to you"
      title="Shipping and delivery times"
      intro="How long your sign takes to make and deliver, how to plan around a date, and what to do if something arrives damaged."
      lastUpdated="2026-09-29"
    >
      <p>
        <strong>How long does a custom sign take?</strong> Once you approve your design mockup, an
        LED neon sign takes 3–5 business days to make and 3–8 business days to reach you: 6–13
        business days in total. Channel letters, lightboxes and acrylic signs take 3–10 business
        days to make, then the same 3–8 days in transit. Delivery is free to every country we ship
        to.
      </p>

      <h2>The timeline, step by step</h2>
      <dl>
        <dt>1. Send your idea</dt>
        <dd>Your wording or logo, the size you want and where the sign will go.</dd>

        <dt>2. Free mockup — within 24 hours, weekends included</dt>
        <dd>We draw the sign to scale. Revisions are free and unlimited.</dd>

        <dt>3. Approval — you decide</dt>
        <dd>Production starts only when you approve the mockup.</dd>

        <dt>4. Production — 3–5 business days for LED neon, 3–10 for other sign types</dt>
        <dd>The sign is made, light-tested and packed.</dd>

        <dt>5. Delivery — 3–8 business days</dt>
        <dd>Free tracked delivery to your door.</dd>
      </dl>
      <p>
        The production clock starts when you approve the design, not when you first message us. How
        quickly you settle on the design changes your date more than anything else.
      </p>

      <h2>Ordering for a wedding, event or opening</h2>
      <p>Count back from your date using the longest time for each step:</p>
      <ul>
        <li>
          <strong>LED neon:</strong> approve your mockup at least 13 business days before you need
          the sign.
        </li>
        <li>
          <strong>Channel letters, lightboxes and acrylic signs:</strong> approve at least 18
          business days before.
        </li>
      </ul>
      <p>
        Leave extra time for public holidays, and for customs if the sign is crossing a border. If
        your date is closer than that, ask about a rush order.
      </p>

      <h2>Rush orders</h2>
      <p>
        Rush orders cost nothing extra. Tell us your date in your first message. We&apos;ll give
        you a straight yes or no before you pay, so you can make other plans if needed.
      </p>

      <h2>Where we ship and what it costs</h2>
      <p>
        Delivery is <strong>free and tracked</strong> on every order, to almost every country.
      </p>
      <div className="legal-note">
        Free delivery covers transport only. Import duties, customs charges and local taxes are set
        by the destination country and paid by the recipient. If you&apos;re ordering from outside
        the US, ask us before you order and we&apos;ll tell you what to expect.
      </div>

      <h2>Tracking your order</h2>
      <p>
        Payment goes through our Etsy shop, so your order and tracking number appear in your Etsy
        account and confirmation emails. You can also message us on WhatsApp and we&apos;ll check
        for you.
      </p>

      <h2>Packaging</h2>
      <p>
        The LED neon is flexible silicone, not glass, but a sign can still be damaged in transit.
        Each one is wrapped in protective layers and braced so it can&apos;t shift. Keep the
        packaging until your sign is unpacked and switched on. If you need to make a claim, the
        original packaging matters.
      </p>

      <h2>If your sign arrives damaged</h2>
      <p>
        Tell us within <strong>48 hours</strong> of delivery and send photos of the damage and the
        packaging. We&apos;ll arrange a repair or replacement. The full terms are on the{" "}
        <Link href="/returns">returns and warranty page</Link>.
      </p>

      <h2>Wrong address?</h2>
      <p>
        Tell us as soon as you can. Before dispatch we can usually change it. After dispatch it
        depends on the courier, and a redelivery charge may apply.
      </p>

      <p>
        <strong>Have a date in mind?</strong> <Link href="/contact">Send us your idea</Link> with
        the date, and you&apos;ll have a free mockup and an honest timeline within 24 hours.
      </p>
    </LegalPage>
  );
}
