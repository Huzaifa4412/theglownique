import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms of Sale",
  description:
    "The terms covering custom sign quotes, artwork rights, payment through Etsy, production times, delivery and warranty at The Glownique.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The agreement"
      title="Terms of Sale"
      intro="What you can expect from us, and what we need from you, when ordering a made-to-order sign."
    >
      <h2>Quotes are estimates until confirmed</h2>
      <p>
        Every sign is individually priced, so the figure we give you depends on the sign type, size,
        number of colours and design complexity. A quote is an invitation to order, not a binding
        contract. A contract forms only when you accept the quote and your payment is confirmed
        through Etsy.
      </p>
      <p>
        If your design changes after you&apos;ve approved the mockup, the price and timeline may
        change too. We&apos;ll always tell you before doing any additional work.
      </p>

      <h2>Design mockups</h2>
      <p>
        We provide a free, no-obligation digital mockup before you commit to anything. Approving
        that mockup is what authorises us to begin production, so please check the spelling, size and
        colour carefully — once a sign is in production it is being made specifically for you and
        cannot be un-made.
      </p>
      <p>
        Mockups are a representation. Screens vary, and a glowing sign in a real room will never
        look pixel-identical to an image on your monitor. We colour-match to Pantone, HEX or CMYK
        references as closely as the materials allow.
      </p>

      <h2>Your artwork and our artwork</h2>
      <p>
        <strong>You are responsible for the rights to anything you send us.</strong> By submitting
        text, a logo, a photograph or artwork, you confirm you own it or have permission to have it
        reproduced. We can&apos;t verify this, and we may decline any request that appears to
        infringe someone else&apos;s trademark or copyright.
      </p>
      <p>
        You keep the rights to your own artwork. We keep the rights to the mockups, technical
        drawings and production files we create. We may show finished work in our portfolio or on
        social media — if you&apos;d rather we didn&apos;t, just tell us and we won&apos;t.
      </p>

      <h2>Payment</h2>
      <p>
        Payment is taken through our verified Etsy shop, using Etsy&apos;s encrypted checkout with
        Purchase Protection. Etsy&apos;s own terms apply to that transaction alongside these.
      </p>
      <p>There are two options:</p>
      <ul>
        <li>Pay in full up front, or</li>
        <li>
          Pay 50% to begin production and the remaining 50% once your sign is finished. Dispatch
          follows the final payment.
        </li>
      </ul>

      <h2>Production and delivery</h2>
      <p>
        Most signs are handcrafted, light-tested and quality-checked in around 10–15 days, then sent
        with tracked delivery. These are genuine estimates rather than guarantees — handmade work
        occasionally takes longer, and couriers are outside our control. If you&apos;re working to a
        deadline, tell us before you order and we&apos;ll say honestly whether it&apos;s achievable.
      </p>
      <p>
        Full details are on our <Link href="/shipping">shipping and delivery page</Link>.
      </p>

      <h2>Warranty, faults and returns</h2>
      <p>
        Every sign carries a 5-year warranty and our 100% glow guarantee. Because signs are made to
        your specification, change-of-mind returns generally don&apos;t apply — but faulty, damaged
        or incorrect items always do. See <Link href="/returns">returns and warranty</Link> for how
        that works and what your statutory rights are.
      </p>

      <h2>Electrical safety and installation</h2>
      <p>
        Our LED neon runs on low-voltage 12V and ships with a compatible power adapter and mounting
        hardware. Indoor signs are built for interior use; if you need a sign outdoors, order the
        IP67 weatherproof build and tell us the intended location.
      </p>
      <p>
        Installation is your responsibility. For large commercial signage, permanent outdoor
        mounting or anything requiring hard-wiring, please use a qualified electrician or installer.
        We can&apos;t accept liability for damage or injury caused by improper installation, or by
        using an indoor sign outdoors.
      </p>

      <h2>Limits on our liability</h2>
      <p>
        Our responsibility is limited to the value of your order. We aren&apos;t liable for indirect
        or consequential losses — for example lost business or the cost of rearranging an event —
        arising from a delay or fault. Nothing here limits liability that cannot lawfully be
        limited, including for death or personal injury caused by negligence, or for fraud. Your
        statutory consumer rights are unaffected.
      </p>

      {LEGAL.governingLaw ? (
        <>
          <h2>Governing law</h2>
          <p>
            These terms are governed by the law of {LEGAL.governingLaw}, and its courts have
            non-exclusive jurisdiction over any dispute.
          </p>
        </>
      ) : null}

      <h2>Questions</h2>
      <p>
        If anything here is unclear, ask before you order — we&apos;d much rather explain it up
        front. <Link href="/contact">Get in touch</Link>.
      </p>
    </LegalPage>
  );
}
