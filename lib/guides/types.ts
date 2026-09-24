/**
 * Buying guides as data.
 *
 * Every guide under /guides/<slug> that is not a hand-built page is one object
 * of this shape, rendered by components/guides/guide-article.tsx. One renderer
 * means every guide gets the same answer-first opening, the same visible
 * sources and the same Article + BreadcrumbList + FAQPage structured data —
 * a guide cannot ship without its citations or with a heading hierarchy that
 * drifts from the others.
 *
 * ── Inline text ─────────────────────────────────────────────────────────────
 *
 * Paragraphs, list items, table cells and callouts accept three inline marks:
 *
 *   **bold**                     → <strong>
 *   [label](/internal/path)      → a Next <Link>; https:// URLs become <a>
 *   [^source-id]                 → a numbered citation linking to the source
 *
 * FAQ questions and answers are plain text: they are copied verbatim into
 * FAQPage structured data, where markup would show up as literal characters.
 *
 * ── Claims ──────────────────────────────────────────────────────────────────
 *
 * The rules in lib/landing-pages.ts apply, plus the 2026-09-24 fact check:
 * no price, lead time, rating, customer count or certification; no hour
 * figure for LED life; no "80% less power"; IP67 only at component level; no
 * "cool to the touch" or "shatterproof". Every technical statement carries a
 * [^source] from SEO-Optimization/growth-system/research/technical-fact-base.md
 * or restates The Glownique's own specification from lib/product-catalog.ts.
 */

export type GuideSource = {
  /** Referenced inline as [^id]. Lowercase, hyphenated. */
  id: string;
  title: string;
  publisher: string;
  url: string;
};

export type GuideImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

export type GuideBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | {
      type: "table";
      /** Read by screen readers; say what the table compares. */
      caption: string;
      columns: string[];
      /** First cell of each row is rendered as the row header. */
      rows: string[][];
      note?: string;
    }
  | { type: "callout"; title?: string; text: string }
  | { type: "defs"; items: { term: string; detail: string }[] }
  | { type: "image"; image: GuideImage };

export type GuideSection = {
  /** Anchor id, lowercase and hyphenated. */
  id: string;
  /** Write it as the question a buyer asks, where that reads naturally. */
  heading: string;
  blocks: GuideBlock[];
};

export type Guide = {
  slug: string;
  /**
   * Rendered as "<metaTitle> | The Glownique" against a 60-character ceiling
   * (scripts/seo-audit.mjs), so 44 characters at most.
   */
  metaTitle: string;
  /** 120–160 characters. Says what the reader gets, truthfully. */
  metaDescription: string;
  h1: string;
  /** Eyebrow above the H1. */
  kicker: string;
  /**
   * The direct answer to the page's main question, 40–70 words, rendered
   * under the H1 and reproduced in llms.txt. Must stand alone if quoted.
   * Plain text.
   */
  answer: string;
  publishedOn: string;
  /** ISO date of the last change a reader would notice. Rendered as "Last reviewed". */
  updatedOn: string;
  /** Planning only — never rendered as a meta keywords tag. */
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Social card and, if `showHeroImage`, the figure beside the answer. */
  image: GuideImage;
  showHeroImage?: boolean;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  sources: GuideSource[];
  /** When the sources were last opened and checked — not the same as `updatedOn`. */
  sourcesAccessedOn: string;
  /** Where to go next — the sign types and guides this one feeds. */
  related: { href: string; label: string; description: string }[];
  cta: {
    heading: string;
    text: string;
    label: string;
    /** Passed to the WhatsApp quote message. */
    productName: string;
    secondary?: { href: string; label: string };
  };
  /** Card on the /guides hub. */
  hub: { category: string; summary: string };
};
