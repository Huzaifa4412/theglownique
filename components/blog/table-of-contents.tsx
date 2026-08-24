import type { TocEntry } from "@/lib/blog";

/**
 * On-page contents.
 *
 * Server-rendered plain anchors — no scroll-spy, no JavaScript. `html` already
 * sets `scroll-behavior: smooth` and `scroll-padding-top: 100px` in
 * globals.css, so a jump link lands below the sticky header on its own; adding
 * a scroll listener here would buy a highlighted current section at the cost of
 * a client bundle on every article.
 *
 * Hidden below three entries: a contents list for two sections is furniture.
 */
export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  if (entries.length < 3) return null;

  return (
    <nav className="blog-toc" aria-labelledby="blog-toc-heading">
      <p className="blog-toc__heading" id="blog-toc-heading">
        On this page
      </p>
      <ol className="blog-toc__list">
        {entries.map((entry) => (
          <li key={entry.id} className={entry.level === 3 ? "blog-toc__item--sub" : undefined}>
            <a href={`#${entry.id}`}>{entry.text}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
