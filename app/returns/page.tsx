import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Returns & 5-Year Warranty",
  description:
    "Every Glownique sign carries a 5-year warranty and a 100% glow guarantee. How faults, transit damage and returns on made-to-order signs are handled.",
  alternates: { canonical: "/returns" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Returns & 5-Year Warranty | The Glownique",
    description:
      "Every Glownique sign carries a 5-year warranty and a 100% glow guarantee.",
    url: "/returns",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique 5-Year Warranty" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Returns & 5-Year Warranty | The Glownique",
    description:
      "Every Glownique sign carries a 5-year warranty and a 100% glow guarantee.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function ReturnsPage() {
  return (
    <LegalPage
      eyebrow="If something's wrong"
      title="Returns & Warranty"
      intro="Every sign is quality-checked and light-tested before it leaves us, and backed by a 5-year warranty. Here's exactly what's covered."
    >
      <h2>The 5-year warranty</h2>
      <p>
        Every sign we make is covered for <strong>five years</strong> against manufacturing defects
        — failed LEDs, failed transformers or power supplies, faulty wiring, and workmanship that
        gives way in normal use. Alongside it sits our <strong>100% glow guarantee</strong>: if your
        sign doesn&apos;t light correctly when it arrives, we put it right.
      </p>
      <p>
        If something fails within the warranty period, message us with your order details and a
        short video or photo showing the fault. We&apos;ll repair or replace the sign, or the failed
        component, at no cost to you.
      </p>

      <h3>What the warranty doesn&apos;t cover</h3>
      <ul>
        <li>Accidental damage, drops, or impact after delivery</li>
        <li>Damage from improper installation or hard-wiring by an unqualified installer</li>
        <li>Using an indoor sign outdoors, or exposing a non-IP67 sign to weather</li>
        <li>Using a power supply other than the one provided</li>
        <li>Normal, gradual dimming over many years of continuous use</li>
        <li>Unauthorised repairs or modifications</li>
      </ul>

      <h2>Damaged in transit</h2>
      <p>
        Tell us within <strong>48 hours</strong> of delivery, with photographs of both the sign and
        the packaging it arrived in. Keep the packaging until the claim is settled. We&apos;ll
        arrange a repair or a replacement — you won&apos;t be left with a broken sign.
      </p>

      <h2>Wrong or faulty item</h2>
      <p>
        If we&apos;ve made a mistake — the wrong text, the wrong colour, the wrong size against your
        approved mockup — that&apos;s on us. We&apos;ll remake it at no charge. The approved mockup
        is the reference we both work from, which is exactly why we ask you to check it carefully.
      </p>

      <h2>Changed your mind?</h2>
      <p>
        This is where custom work differs from off-the-shelf products, so we want to be straight
        with you rather than bury it.
      </p>
      <p>
        Every sign is made specifically to your specification — your words, your size, your colour.
        Under consumer law in the UK, EU and many other jurisdictions,{" "}
        <strong>
          bespoke and made-to-order goods are exempt from the usual change-of-mind cancellation
          right
        </strong>
        , because they can&apos;t be resold to anyone else. Once you&apos;ve approved your mockup and
        production has begun, we can&apos;t offer a change-of-mind refund.
      </p>
      <p>
        Before that point, you can cancel freely. If you&apos;ve paid a deposit and production
        hasn&apos;t started, tell us and we&apos;ll sort it out.
      </p>
      <p>
        Any non-custom item — a standard replacement power adapter, for example — can be returned
        within {LEGAL.returnsWindowDays} days in unused condition.
      </p>
      <div className="legal-note">
        None of this affects your statutory rights. If a sign is faulty, not as described, or not fit
        for purpose, you are entitled to a remedy regardless of anything on this page.
      </div>

      <h2>Etsy Purchase Protection</h2>
      <p>
        Because payment runs through our verified Etsy shop, your order is also covered by
        Etsy&apos;s Purchase Protection programme and its dispute process, in addition to everything
        above. That&apos;s deliberate — it means you&apos;re not relying solely on our word.
      </p>

      <h2>How to make a claim</h2>
      <p>
        Message us with your order number, a description of the problem, and a photo or short video.
        We aim to reply within one working day, and support is available{" "}
        {LEGAL.supportHours}. <Link href="/contact">Contact details are here</Link>.
      </p>
    </LegalPage>
  );
}
