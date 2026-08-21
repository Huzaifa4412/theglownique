import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "The Glownique aims for WCAG 2.2 Level AA. Our latest homepage Lighthouse accessibility score, the specific checks currently failing, keyboard and reduced-motion support, and known limitations.",
  alternates: { canonical: "/accessibility" },
  openGraph: {
    type: "website",
    siteName: "The Glownique",
    title: "Accessibility Statement | The Glownique",
    description:
      "The Glownique accessibility statement, WCAG 2.2 Level AA targets, keyboard support and reduced-motion features.",
    url: "/accessibility",
    images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique Accessibility Statement" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Accessibility Statement | The Glownique",
    description:
      "The Glownique accessibility statement, WCAG 2.2 Level AA targets, keyboard support and reduced-motion features.",
    images: ["/hero/neon-sign-hero.png"],
  },
};

// Claims here are deliberately verifiable rather than aspirational. If the
// audited numbers change, update them or remove them — an out-of-date
// accessibility claim is worse than none.
export default function AccessibilityPage() {
  return (
    <LegalPage
      eyebrow="Everyone welcome"
      title="Accessibility Statement"
      intro="We want this site to work for everyone, including people using screen readers, keyboard navigation or reduced-motion settings. Here's where we actually stand — measured, not aspirational."
    >
      <h2>Our target</h2>
      <p>
        We aim to meet{" "}
        <a
          href="https://www.w3.org/WAI/WCAG22/quickref/"
          rel="nofollow noopener"
          target="_blank"
        >
          WCAG 2.2 Level AA
        </a>
        . We test with automated tooling on every significant change and fix what it finds.
      </p>

      <h2>Where we stand today</h2>
      <p>
        Measured on <strong>19 August 2026</strong> against a production build with Google
        Lighthouse (mobile). The homepage, contact page, guides, business-sign detail pages and
        policy pages score <strong>100/100</strong>. Three templates score <strong>96/100</strong>:
        the product hub, the individual product pages and the business-signs hub.
      </p>
      <p>
        The gap is honest and specific. Each sign type has a bright brand colour, and on those
        three templates the colour is used for small text and for badge labels where it measures
        between 2.2:1 and 4.1:1 against its background — short of the 4.5:1 that small text needs.
        We had darker versions of those colours in place and reverted them, because the muted
        palette lost the identity of the product range. That was a deliberate trade, not an
        oversight, and it is on our list to solve properly rather than by dulling the brand.
      </p>
      <p>
        In the meantime: none of the affected text is the only way to get information. Every badge
        repeats a heading next to it, and every accent-coloured label sits beside body text in full
        contrast. If any of it is hard to read, tell us and we will fix that page first.
      </p>
      <ul>
        <li>
          <strong>Colour contrast.</strong> Body text and interface text meet the 4.5:1 minimum.
          The exception is the per-product accent colour described above. Our WhatsApp buttons keep
          the real WhatsApp green — white text on it is only 1.98:1, so they use dark ink instead,
          which reads at 8.6:1 without giving up the colour people recognise.
        </li>
        <li>
          <strong>Labels match visible text.</strong> Every control&apos;s accessible name contains
          the words you can see on it, so voice-control users can activate what they read.
        </li>
        <li>
          <strong>Embedded frames are labelled.</strong> The live-chat widget&apos;s frames are
          given titles as they appear, so a screen reader announces them rather than reading out an
          unlabelled frame.
        </li>
        <li>
          <strong>Keyboard navigation.</strong> Interactive controls are reachable and operable by
          keyboard, with visible focus styles. The before/after comparison slider also responds to
          arrow keys, Home and End.
        </li>
        <li>
          <strong>Reduced motion.</strong> This site has a lot of animation. If your system is set
          to reduce motion, we honour that — carousels stop auto-advancing and transitions are
          shortened or removed.
        </li>
        <li>
          <strong>Images.</strong> Every image carries descriptive alternative text.
        </li>
        <li>
          <strong>Touch targets.</strong> Buttons and controls meet the 24×24px minimum spacing
          requirement.
        </li>
      </ul>

      <h2>Known limitations</h2>
      <p>Being honest about the gaps is more useful than claiming perfection:</p>
      <ul>
        <li>
          <strong>Automated testing has limits.</strong> A Lighthouse score checks what a machine
          can check. Even a perfect score is not the same as a full manual audit with
          assistive-technology users, which we have not yet commissioned.
        </li>
        <li>
          <strong>Motion-heavy pages.</strong> Even with reduced-motion support, our homepage is
          visually busy. The <Link href="/custom-signage">product pages</Link> are calmer if you find that
          difficult.
        </li>
        <li>
          <strong>Video.</strong> Our product videos are short, silent, decorative loops with no
          spoken content, so they have no captions. They aren&apos;t required to understand any page.
        </li>
        <li>
          <strong>Third-party checkout.</strong> Payment happens on Etsy, whose accessibility is
          outside our control.
        </li>
      </ul>

      <h2>Tell us if something doesn&apos;t work</h2>
      <p>
        If you hit a barrier on this site, please tell us what page you were on and what went wrong
        — that&apos;s genuinely the fastest way for us to fix it, and we&apos;d rather know.{" "}
        <Link href="/contact">Get in touch here</Link>.
      </p>
      <p>
        If you need information from this site in a different format, or you&apos;d rather discuss
        your sign over a channel that works better for you, just ask.
      </p>
    </LegalPage>
  );
}
