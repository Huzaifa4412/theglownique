import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { HAS_ADVERTISING_TRACKING, TRACKING_TOOLS } from "@/lib/claims";
import { HAS_ADDRESS, HAS_EMAIL, LEGAL } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How The Glownique handles your personal data: exactly which third-party tools run on this site, what each one stores — including the advertising cookies the Meta Pixel sets — and what we keep when you send an enquiry.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Privacy Policy | The Glownique",
    description:
      "How The Glownique handles your data — every third-party tool we run, what each one stores, and what we keep from an enquiry.",
    url: "/privacy",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique Privacy Policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | The Glownique",
    description:
      "How The Glownique handles your data — every third-party tool we run, what each one stores, and what we keep from an enquiry.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your data"
      title="Privacy Policy"
      intro="A short, honest policy. It names every third-party tool running on this site and what each one stores — including the advertising cookies our Meta Pixel sets — and explains exactly what we keep when you send us an enquiry."
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

      <h2>Third-party tools on this site</h2>
      <p>
        This is the complete list. It is generated from the same record the site code uses, so a
        tool cannot be added to the site without appearing here.
      </p>
      <ul>
        {TRACKING_TOOLS.map((tool) => (
          <li key={tool.name}>
            <strong>{tool.name}.</strong> We use it to {tool.purpose}. It stores {tool.storage}.
          </li>
        ))}
      </ul>
      {HAS_ADVERTISING_TRACKING && (
        <>
          <h2>Advertising and the Meta Pixel</h2>
          <p>
            We advertise on Facebook and Instagram, and the Meta Pixel is how we measure whether
            those adverts actually lead to quote requests. It is an advertising technology: it sets
            cookies in your browser and shares events — pages viewed, a quote form completed — with
            Meta, who can match them to your Meta account. That makes Meta a separate controller of
            that data under its own terms.
          </p>
          <p>
            We do not send Meta your name, email address, phone number or the text of your design
            brief. We do not sell your personal data.
          </p>
          <p>
            To stop it: use your browser&apos;s cookie controls or a tracking blocker, or your
            operating system&apos;s app-tracking setting, and adjust what Meta may use at{" "}
            <a
              href="https://www.facebook.com/adpreferences"
              rel="nofollow noopener"
              target="_blank"
            >
              Meta ad preferences
            </a>
            . Blocking it does not affect anything you can do on this site. See the{" "}
            <a
              href="https://www.facebook.com/privacy/policy"
              rel="nofollow noopener"
              target="_blank"
            >
              Meta Privacy Policy
            </a>
            .
          </p>
          <div className="legal-note">
            We do not currently show a cookie-consent banner. If you are visiting from the UK or
            EU and would rather these tools were gated behind consent, tell us and we will treat
            that as a request to switch them off for you.
          </div>
        </>
      )}

      <h2>What we do not do</h2>
      <ul>
        <li>
          <strong>No account required.</strong> There&apos;s nothing to sign up for, so there&apos;s
          no password or profile for us to hold.
        </li>
        <li>
          <strong>No profiling or scoring.</strong> We keep your enquiry so we can answer it (see
          below), but we don&apos;t build a behavioural profile from it or score you as a lead.
        </li>
        <li>
          <strong>No selling your data.</strong> We don&apos;t sell or rent your personal data.
        </li>
      </ul>

      <h2>Live chat</h2>
      <p>
        Before the chat opens we ask for your <strong>name, email address and phone number</strong>
        on a short form of our own. That is so a question does not go unanswered if you close the tab
        before we reply — not so we can add you to a marketing list.
      </p>
      <p>
        Those answers are also saved in your browser&apos;s local storage, purely so you are not
        asked the same three questions again on a later visit. Clearing your browser data removes
        them.
      </p>
      <p>
        Those details and the message history are stored by Tawk.to, who run the chat service on
        our behalf. See the{" "}
        <a href="https://www.tawk.to/privacy-policy/" rel="nofollow noopener" target="_blank">
          Tawk.to Privacy Policy
        </a>
        . We also keep a copy in our own enquiry records so a chat that ends without a reply can
        still be followed up. We use them to answer you and to follow up on that enquiry. If you
        would rather not give them, don&apos;t use the chat — WhatsApp and our{" "}
        <Link href="/contact">contact page</Link> reach the same people.
      </p>

      <h2>Newsletter</h2>
      <p>
        If you sign up for the 10% welcome code we keep your email address in the same enquiry
        records, so we can send the code and the occasional product email. Nothing else is asked
        for, and you can ask us to remove you at any time.
      </p>

      <h2>Quote requests</h2>
      <p>
        When you request a quote, the form asks for your name, email address, phone number, your
        design details (text, size, indoor or outdoor use) and optionally a reference file.
      </p>
      <p>
        Two things happen when you submit it. The details are assembled into a message{" "}
        <strong>inside your own browser</strong> and handed to WhatsApp for you to send — and a copy
        of the same details is saved to our own enquiry records, so we can reply even if you close
        WhatsApp without sending, or the message goes astray.
      </p>
      <p>
        That copy is stored in Sanity, the content platform this site runs on, and is visible only
        to us. See the{" "}
        <a href="https://www.sanity.io/legal/privacy" rel="nofollow noopener" target="_blank">
          Sanity Privacy Policy
        </a>
        . We use it to prepare your quote and follow up on that enquiry, and for nothing else — no
        newsletter, no advertising audiences, no sharing with third parties. Ask us and we will
        delete it.
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
