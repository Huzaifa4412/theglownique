import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { HAS_ADDRESS, HAS_EMAIL, LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Glownique handles your personal data. We run no analytics, no tracking pixels and no advertising cookies, and we don't store your quote details on our own servers.",
  alternates: { canonical: "/privacy" },
};

// NOTE: this describes what the site ACTUALLY does today — no analytics, no
// tracking, no server-side storage of quote details. If you later add an email
// newsletter backend, an analytics tool, or a CRM, this page must be updated to
// disclose it.
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your data"
      title="Privacy Policy"
      intro="A short policy, because we collect very little. We run no analytics, no tracking pixels and no advertising cookies, and your quote details are never stored on our servers."
    >
      <h2>Who we are</h2>
      <p>
        {LEGAL.entityName} handcrafts made-to-order illuminated signage — LED neon signs, 3D
        metal channel letters, ultra-thin lightboxes and UV-print acrylic signs.
        {LEGAL.registeredName ? ` We trade as ${LEGAL.registeredName}` : ""}
        {LEGAL.companyNumber ? ` (company number ${LEGAL.companyNumber})` : ""}
        {LEGAL.registeredName ? "." : ""}
      </p>
      {HAS_ADDRESS && (
        <p style={{ whiteSpace: "pre-line" }}>{LEGAL.address}</p>
      )}

      <h2>What we don&apos;t do</h2>
      <p>Being specific about this is more useful than a long list of maybes:</p>
      <ul>
        <li>
          <strong>No analytics.</strong> We run no Google Analytics, no Meta Pixel and no
          third-party analytics or session-recording tools.
        </li>
        <li>
          <strong>No advertising cookies.</strong> We don&apos;t set marketing or profiling
          cookies, and we don&apos;t sell or share your data with advertisers.
        </li>
        <li>
          <strong>No account required.</strong> There&apos;s nothing to sign up for, so there&apos;s
          no password or profile for us to hold.
        </li>
        <li>
          <strong>No quote database.</strong> See below — your quote details are not stored on
          our servers at all.
        </li>
      </ul>

      <h2>Quote requests</h2>
      <p>
        When you request a quote, the form asks for your name, email address, phone number, your
        design details (text, size, indoor or outdoor use) and optionally a reference file.
      </p>
      <p>
        Those details are assembled into a message <strong>inside your own browser</strong> and
        handed to WhatsApp to send. They are not submitted to, processed by, or stored on any
        server of ours. In practice, the conversation lives in your WhatsApp and ours, exactly like
        any other message you send.
      </p>
      <p>
        That means WhatsApp&apos;s own privacy terms govern the message in transit. See the{" "}
        <a href="https://www.whatsapp.com/legal/privacy-policy" rel="nofollow noopener" target="_blank">
          WhatsApp Privacy Policy
        </a>
        . We keep the resulting conversation for as long as needed to prepare your quote, complete
        your order and honour the warranty on it.
      </p>
      <div className="legal-note">
        Please don&apos;t send payment card details, bank details or copies of identity documents
        over WhatsApp. We will never ask for them there. Payment is taken separately through Etsy.
      </div>

      <h2>Payments</h2>
      <p>
        We don&apos;t take payments on this website and we never see your card details. Orders are
        paid through our verified Etsy shop using Etsy&apos;s encrypted checkout, so Etsy acts as
        the payment processor and its policies apply to that transaction. See the{" "}
        <a href="https://www.etsy.com/legal/privacy" rel="nofollow noopener" target="_blank">
          Etsy Privacy Policy
        </a>
        .
      </p>

      <h2>Hosting and server logs</h2>
      <p>
        This site is hosted on Vercel. Like any web host, Vercel processes standard technical
        request data — IP address, browser user-agent, requested URL and timestamp — to serve pages
        and protect against abuse. We don&apos;t use this data to identify or profile individuals.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, you may have the right to ask for a copy of the personal data
        we hold about you, to have it corrected or deleted, to object to how we use it, or to
        complain to your local data protection authority. Because we hold so little — generally
        only a WhatsApp conversation and an Etsy order record — most requests are quick to answer.
      </p>
      <p>
        {HAS_EMAIL ? (
          <>
            To make a request, email <a href={`mailto:${LEGAL.email}`}>{LEGAL.email}</a>.
          </>
        ) : (
          <>
            To make a request, get in touch via our <Link href="/contact">contact page</Link>.
          </>
        )}{" "}
        For anything held by Etsy, you&apos;ll need to contact Etsy directly, as they control that
        data.
      </p>

      <h2>Children</h2>
      <p>
        This site isn&apos;t directed at children, and we don&apos;t knowingly collect personal
        data from anyone under 16.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If we start using any new tool that handles personal data, we&apos;ll update this page and
        change the date at the top before that tool goes live.
      </p>
    </LegalPage>
  );
}
