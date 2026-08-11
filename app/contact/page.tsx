import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { StoreIcon } from "@/components/storefront/store-icon";
import { HAS_ADDRESS, HAS_EMAIL, HAS_PHONE, LEGAL } from "@/lib/legal";
import { ETSY_SHOP_URL, HAS_WHATSAPP, whatsappQuoteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with The Glownique about a custom sign, a quote, an existing order or a warranty claim. Support available 7 days a week.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <LegalPage
      eyebrow="Talk to a human"
      title="Contact Us"
      intro="Whether you're sizing up an idea, chasing an order or making a warranty claim, we'd rather you asked than guessed."
      showLastUpdated={false}
    >
      <h2>Quotes and new enquiries</h2>
      <p>
        The fastest route is WhatsApp — send your words, a logo or even a rough sketch and
        we&apos;ll come back with a free mockup and a quote. Whatever you have is enough to start.
      </p>
      {HAS_WHATSAPP ? (
        <p className="mt-4">
          <a
            href={whatsappQuoteUrl("custom sign")}
            rel="noopener noreferrer"
            target="_blank"
            className="button button--whatsapp inline-flex items-center gap-2.5 px-6 py-3 rounded-lg text-base font-bold"
          >
            <StoreIcon name="WhatsappLogo" />
            Message us on WhatsApp
          </a>
        </p>
      ) : (
        <p>
          You can also start a request straight from any{" "}
          <Link href="/products">product page</Link> — the quote form walks you through size,
          colour and usage.
        </p>
      )}

      <h2>Existing orders</h2>
      <p>
        Orders are paid and tracked through our verified Etsy shop, so your order status and
        tracking number are in your Etsy account and confirmation emails. For anything Etsy
        can&apos;t answer, message us directly and we&apos;ll check.
      </p>
      {ETSY_SHOP_URL && (
        <p>
          <a href={ETSY_SHOP_URL} rel="noopener" target="_blank">
            Visit The Glownique on Etsy
          </a>{" "}
          — reviews, order history and tracking all live there.
        </p>
      )}

      <h2>Warranty claims</h2>
      <p>
        Send your order number with a photo or short video of the fault. Every sign carries a
        5-year warranty — see <Link href="/returns">returns and warranty</Link> for what&apos;s
        covered and how claims work.
      </p>

      <h2>How to reach us</h2>
      <dl>
        {HAS_EMAIL && (
          <>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>
            </dd>
          </>
        )}
        {HAS_PHONE && (
          <>
            <dt>Phone</dt>
            <dd>
              <a href={`tel:${LEGAL.phone.replace(/\s+/g, "")}`}>{LEGAL.phone}</a>
            </dd>
          </>
        )}
        <dt>Availability</dt>
        <dd>{LEGAL.supportHours}</dd>
        {HAS_ADDRESS && (
          <>
            <dt>Address</dt>
            <dd style={{ whiteSpace: "pre-line" }}>{LEGAL.address}</dd>
          </>
        )}
      </dl>

      <h2>Response times</h2>
      <p>
        We aim to answer within one working day, and mockups usually come back within a couple of
        hours during our support window. If you&apos;re working to a deadline, say so in your first
        message and we&apos;ll tell you honestly whether it&apos;s achievable rather than promise
        and disappoint.
      </p>

      <div className="legal-note">
        Please don&apos;t send card details, bank details or identity documents over chat. We will
        never ask for them. Payment is taken separately through Etsy&apos;s encrypted checkout.
      </div>
    </LegalPage>
  );
}
