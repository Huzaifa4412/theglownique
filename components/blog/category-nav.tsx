import Link from "next/link";

import type { BlogCategory } from "@/lib/blog";

/**
 * The category filter row.
 *
 * These are real links to real archives, not a client-side filter. Two reasons:
 * a filtered view that only exists in JavaScript cannot be linked, shared or
 * indexed, and the archives are where the category `intro` copy lives — which
 * is the thing that makes them worth having as pages at all.
 *
 * `aria-current="page"` rather than a class alone, so the active filter is
 * announced and not merely coloured.
 */
export function CategoryNav({
  categories,
  activeSlug,
}: {
  categories: BlogCategory[];
  activeSlug?: string;
}) {
  if (categories.length === 0) return null;

  return (
    <nav className="blog-filter" aria-label="Article categories">
      <Link
        href="/blog"
        className="blog-filter__pill"
        aria-current={activeSlug ? undefined : "page"}
      >
        All articles
      </Link>
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/blog/category/${category.slug}`}
          className="blog-filter__pill"
          aria-current={activeSlug === category.slug ? "page" : undefined}
        >
          {category.title}
          <span className="blog-filter__count" aria-hidden="true">
            {category.count}
          </span>
        </Link>
      ))}
    </nav>
  );
}
