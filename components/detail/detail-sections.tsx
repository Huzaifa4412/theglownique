import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

import { DetailCtaPair } from "@/components/detail/detail-cta-pair";
import { DetailGallery, type DetailImage } from "@/components/detail/detail-gallery";
import { DELIVERY, WARRANTY } from "@/lib/claims";

/**
 * The sections every hand-built detail page shares: hero, trust strip, FAQ and
 * closing band. Server Components; the only client part is the gallery.
 */

type Crumb = { href?: string; label: string };

type DetailHeroProps = {
  /** Home is added automatically; the last crumb is the current page. */
  crumbs: readonly Crumb[];
  eyebrow: string;
  /** The H1's content. */
  title: ReactNode;
  lede: string;
  /** Up to four short facts, shown beside the picture from tablet width up. */
  checks: readonly string[];
  images: readonly DetailImage[];
  galleryLabel: string;
  /** Completes "…a free quote and mockup for a …" in the WhatsApp message. */
  subject: string;
  etsyUrl: string;
  /** Tracking prefix; the hero buttons report as `${source}-hero-…`. */
  source: string;
};

export function DetailHero({
  crumbs,
  eyebrow,
  title,
  lede,
  checks,
  images,
  galleryLabel,
  subject,
  etsyUrl,
  source,
}: DetailHeroProps) {
  return (
    <section className="detail-hero">
      <div className="relative z-10 mx-auto grid max-w-[1320px] gap-6 px-4 pb-12 pt-6 sm:gap-8 sm:px-6 sm:pt-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:pb-20 lg:pt-16">
        <div>
          <nav className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.label} className="contents">
                <span aria-hidden="true">/</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="text-white/80 transition-colors hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <p className="detail-eyebrow detail-eyebrow--light">{eyebrow}</p>
          <h1 className="mt-2 text-[2.25rem] font-extrabold leading-[1.04] tracking-tight sm:mt-3 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:mt-5 sm:text-lg">{lede}</p>

          <ul className="mt-6 hidden max-w-xl gap-x-6 gap-y-2.5 text-sm font-semibold text-white/90 sm:grid sm:grid-cols-2">
            {checks.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-(--dt-accent)" aria-hidden="true" />
                <span className="first-letter:uppercase">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <DetailGallery images={images} sizes="(max-width: 1024px) 100vw, 660px" label={galleryLabel} preload>
            <div>
              <DetailCtaPair subject={subject} etsyUrl={etsyUrl} source={`${source}-hero`} />
              <p className="mt-2.5 text-center text-xs leading-relaxed text-white/70">
                Free mockup first. You pay nothing until you approve the design.
              </p>
            </div>
          </DetailGallery>
        </div>
      </div>
    </section>
  );
}

/** The four standing promises, from lib/claims.ts. */
export function DetailTrustStrip() {
  return (
    <section className="border-b border-(--dt-line) bg-white" aria-label="What every order includes">
      <ul className="mx-auto grid max-w-[1320px] grid-cols-2 gap-x-6 gap-y-3 px-4 py-5 text-sm font-semibold text-(--dt-muted) sm:px-6 lg:flex lg:flex-wrap lg:justify-center lg:gap-x-10">
        {["Free mockup within 24 hours", WARRANTY.term, DELIVERY.short, "Secure Etsy checkout"].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--dt-accent-ink)">
              <Check className="h-2.5 w-2.5 text-white" aria-hidden="true" />
            </span>
            <span className="first-letter:uppercase">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

type DetailFaqProps = {
  heading: string;
  faqs: readonly { q: string; a: string }[];
  /** Rendered under the list, e.g. a link to the Etsy reviews. */
  children?: ReactNode;
};

export function DetailFaq({ heading, faqs, children }: DetailFaqProps) {
  return (
    <section className="border-t border-(--dt-line) bg-white py-14 sm:py-20" aria-labelledby="detail-faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="detail-eyebrow">Questions</p>
        <h2 id="detail-faq" className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {heading}
        </h2>
        <div className="mt-8 grid gap-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.q}
              // The first answer starts open, so a skimming visitor has
              // something to read without tapping.
              open={index === 0}
              className="group rounded-2xl border border-(--dt-line) bg-white open:border-(--dt-accent-ink)"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-bold text-(--dt-ink)">{faq.q}</h3>
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-(--dt-accent-ink) transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-(--dt-muted)">{faq.a}</p>
            </details>
          ))}
        </div>
        {children}
      </div>
    </section>
  );
}

type DetailClosingProps = {
  heading: ReactNode;
  subject: string;
  etsyUrl: string;
  source: string;
};

export function DetailClosing({ heading, subject, etsyUrl, source }: DetailClosingProps) {
  return (
    <section className="detail-hero py-16 sm:py-20">
      <div className="relative z-10 mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/80">
          The mockup is free and so are the revisions. If you like it, you get a quote for that exact sign, with{" "}
          {DELIVERY.clause} and a {WARRANTY.term}.
        </p>
        <DetailCtaPair subject={subject} etsyUrl={etsyUrl} source={`${source}-closing`} className="mx-auto mt-8 max-w-md" />
      </div>
    </section>
  );
}
