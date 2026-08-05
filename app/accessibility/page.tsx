import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/legal/legal-page";
import { formattedLastUpdated } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "The Glownique aims for WCAG 2.2 Level AA. Our homepage currently scores 100/100 on Lighthouse accessibility. Keyboard support, reduced-motion support, and known limitations.",
  alternates: { canonical: "/accessibility" },
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
        As of {formattedLastUpdated()}, our homepage scores <strong>100/100</strong> for
        accessibility in Google Lighthouse (mobile), with zero failed audits. Specifically:
      </p>
      <ul>
        <li>
          <strong>Colour contrast.</strong> Body and interface text meets the 4.5:1 minimum. We use
          a deeper tone of our brand pink for text and buttons, because the brighter version
          didn&apos;t pass.
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
        <li>
          <strong>Labels.</strong> Controls have accessible names that match their visible text, so
          voice-control users can activate what they can read.
        </li>
      </ul>

      <h2>Known limitations</h2>
      <p>Being honest about the gaps is more useful than claiming perfection:</p>
      <ul>
        <li>
          <strong>Automated testing has limits.</strong> A 100/100 Lighthouse score checks what a
          machine can check. It is not the same as a full manual audit with assistive-technology
          users, which we have not yet commissioned.
        </li>
        <li>
          <strong>Motion-heavy pages.</strong> Even with reduced-motion support, our homepage is
          visually busy. The <Link href="/products">product pages</Link> are calmer if you find that
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
