import type { PortableTextBlock } from "next-sanity";

import { client } from "@/sanity/lib/client";
import {
  blogSettingsQuery,
  categoriesQuery,
  categoryBySlugQuery,
  categoryRoutesQuery,
  postBySlugQuery,
  postRoutesQuery,
  postsByCategoryQuery,
  postsQuery,
} from "@/sanity/lib/queries";

/**
 * The blog's data layer.
 *
 * ── Why the blog lives in Sanity and /guides does not ───────────────────────
 *
 * /guides pages are hand-built routes because each one is a bespoke layout with
 * its own tables and diagrams, and there are nine of them planned, forever.
 * Blog posts are the opposite: one layout, unbounded count, published by
 * whoever has something to say. Putting them in the CMS is what stops the
 * fifteenth post from being a pull request.
 *
 * ── Editorial boundary (read this before adding a post) ─────────────────────
 *
 * SEO-Optimization/06-information-architecture.md has cannibalization controls,
 * and a blog is the classic way to violate them. The split this codebase holds:
 *
 *   /business-signs  commercial intent — "I want to buy this"
 *   /guides          decision intent   — "which one, what does it cost, how big"
 *   /blog            awareness & care  — ideas, colour, maintenance, trends
 *
 * A post that answers "which sign should I buy" or "what does it cost" is a
 * guide wearing a blog's clothes. It will compete with the guide for the same
 * query and both will rank worse. The `primaryKeyword` field on the post schema
 * carries this warning too, because that is where someone will be standing when
 * they are about to get it wrong.
 *
 * ── Caching ─────────────────────────────────────────────────────────────────
 *
 * Reads are cached by Next and tagged, so publishing in the Studio can push a
 * post live within `REVALIDATE_SECONDS` without a redeploy — or instantly, if
 * the Sanity webhook at /api/revalidate is wired up (see that route).
 */

/** Cache tag covering every blog read. The revalidate webhook busts this one. */
export const BLOG_CACHE_TAG = "blog";

/**
 * Five minutes. Long enough that the CDN does the work on a normal day, short
 * enough that a missing webhook is an annoyance rather than a broken CMS.
 */
export const REVALIDATE_SECONDS = 300;

// ── Types ───────────────────────────────────────────────────────────────────

export type BlogImage = {
  url: string | null;
  lqip: string | null;
  width: number | null;
  height: number | null;
  alt: string | null;
  caption?: string | null;
};

export type BlogCategoryRef = {
  title: string;
  slug: string;
  description: string;
};

export type BlogCategory = BlogCategoryRef & {
  intro: string;
  count: number;
};

export type BlogAuthor = {
  name: string;
  slug: string;
  role: string;
  expertise: string;
  image: BlogImage | null;
  links: { label: string; url: string }[] | null;
};

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  updatedAt: string | null;
  readingMinutes: number;
  featured: boolean | null;
  indexable: boolean | null;
  coverImage: BlogImage | null;
  category: BlogCategoryRef | null;
  author: { name: string; role: string } | null;
};

export type BlogRelatedLink = {
  kind: "commercial" | "guide" | "proof";
  label: string;
  description: string;
  href: string;
};

export type BlogSource = {
  label: string;
  publisher: string | null;
  url: string | null;
  accessed: string | null;
};

export type BlogPost = BlogPostCard & {
  body: PortableTextBlock[];
  keyTakeaways: string[] | null;
  faqs: { q: string; a: string }[] | null;
  seoTitle: string | null;
  seoDescription: string;
  primaryKeyword: string | null;
  relatedLinks: BlogRelatedLink[] | null;
  sources: BlogSource[] | null;
  author: BlogAuthor & { name: string; role: string };
  reviewer: BlogAuthor | null;
  related: BlogPostCard[] | null;
};

export type BlogSettings = {
  eyebrow: string;
  heading: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  newsletterHeading: string | null;
  newsletterText: string | null;
};

export type BlogPostRoute = {
  slug: string;
  publishedAt: string;
  updatedAt: string | null;
  indexable: boolean | null;
};

// ── Fetching ────────────────────────────────────────────────────────────────

/**
 * One place where a Sanity read can fail.
 *
 * It returns the fallback instead of throwing, and that is a deliberate,
 * uncomfortable trade: a dataset outage during `next build` would otherwise
 * fail the whole deploy — including the product and contact pages, which have
 * nothing to do with the blog. An empty blog is recoverable; a blocked deploy
 * of a storefront is not.
 *
 * The cost is that a silent failure ships an empty /blog, so the error is
 * logged at `error` level with the query name attached. If /blog is ever
 * mysteriously empty in production, the build log is the first place to look.
 */
/**
 * Draft preview, development only.
 *
 * Unpublished posts are invisible to every query above, which is correct in
 * production and unhelpful when you are trying to read a draft before
 * approving it. On `next dev`, with a write token already present for the
 * leads route, reads switch to the `drafts` perspective so localhost shows
 * exactly what the published page will look like.
 *
 * Three guards, because this must never be a way to leak unpublished content:
 *
 * - `NODE_ENV !== "production"` — a production build cannot take this branch
 *   even if a token is somehow present in the environment.
 * - the token is required, so a dev machine without one behaves like production.
 * - the preview client sets `useCdn: false` and the fetch is uncached, so a
 *   draft can never be written into a shared cache entry.
 *
 * `SANITY_API_WRITE_TOKEN` has no NEXT_PUBLIC_ prefix and every caller here is
 * a Server Component, so it stays server-side.
 */
const PREVIEW_DRAFTS =
  process.env.NODE_ENV !== "production" && Boolean(process.env.SANITY_API_WRITE_TOKEN);

const previewClient = PREVIEW_DRAFTS
  ? client.withConfig({
      token: process.env.SANITY_API_WRITE_TOKEN,
      perspective: "drafts",
      useCdn: false,
    })
  : null;

async function fetchBlog<T>(
  label: string,
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  try {
    if (previewClient) {
      return await previewClient.fetch<T>(query, params, { cache: "no-store" });
    }
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [BLOG_CACHE_TAG] },
    });
  } catch (error) {
    console.error(`[blog] Sanity read failed (${label}):`, error);
    return fallback;
  }
}

export function getPosts(): Promise<BlogPostCard[]> {
  return fetchBlog<BlogPostCard[]>("posts", postsQuery, {}, []);
}

export function getPostsByCategory(category: string): Promise<BlogPostCard[]> {
  return fetchBlog<BlogPostCard[]>("postsByCategory", postsByCategoryQuery, { category }, []);
}

export function getPost(slug: string): Promise<BlogPost | null> {
  return fetchBlog<BlogPost | null>("post", postBySlugQuery, { slug }, null);
}

export function getCategories(): Promise<BlogCategory[]> {
  return fetchBlog<BlogCategory[]>("categories", categoriesQuery, {}, []);
}

export function getCategory(slug: string): Promise<BlogCategoryRef | null> {
  return fetchBlog<BlogCategoryRef | null>("category", categoryBySlugQuery, { slug }, null);
}

export function getBlogSettings(): Promise<BlogSettings | null> {
  return fetchBlog<BlogSettings | null>("blogSettings", blogSettingsQuery, {}, null);
}

export function getPostRoutes(): Promise<BlogPostRoute[]> {
  return fetchBlog<BlogPostRoute[]>("postRoutes", postRoutesQuery, {}, []);
}

export function getCategoryRoutes(): Promise<{ slug: string }[]> {
  return fetchBlog<{ slug: string }[]>("categoryRoutes", categoryRoutesQuery, {}, []);
}

// ── Presentation helpers ────────────────────────────────────────────────────

/** Copy the hub falls back to before anyone has filled in the singleton. */
export const BLOG_SETTINGS_FALLBACK: BlogSettings = {
  eyebrow: "The Glownique Blog & Journal",
  heading: "Ideas, Colour & Care for Illuminated Signs",
  intro:
    "Notes from the workshop on designing, choosing and looking after custom signage — what actually holds up on a wall, how colour behaves once it is lit, and the details worth deciding before a sign is built.",
  seoTitle: "Custom Neon & Signage Blog | Ideas & Insights",
  seoDescription:
    "Explore The Glownique's custom neon and signage blog. Practical tips, colour theory, care advice and illuminated sign design trends from our workshop.",
  newsletterHeading: "New sign ideas, once a month",
  newsletterText:
    "One email a month with new work, colour ideas and practical advice. No promotions you did not ask for.",
};

/**
 * A stable heading id.
 *
 * Both the table of contents and any inbound deep link depend on this, so it
 * must be a pure function of the heading text — regenerate ids from position
 * and every shared link breaks the next time a section is inserted.
 */
export function headingId(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60) || "section"
  );
}

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/**
 * Build the table of contents from the body's H2s and H3s.
 *
 * H4s are excluded: they exist for detail inside a subsection, and a contents
 * list three levels deep stops being a map and becomes a second copy of the
 * article.
 */
export function buildToc(body: PortableTextBlock[] | undefined | null): TocEntry[] {
  if (!Array.isArray(body)) return [];

  const entries: TocEntry[] = [];
  const seen = new Map<string, number>();

  for (const block of body) {
    if (block?._type !== "block") continue;
    const style = (block as { style?: string }).style;
    if (style !== "h2" && style !== "h3") continue;

    const text = portableTextToPlain([block]).trim();
    if (!text) continue;

    // Two sections legitimately called "Cost" would otherwise share an id and
    // the second link would scroll to the first.
    const base = headingId(text);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);

    entries.push({
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      level: style === "h2" ? 2 : 3,
    });
  }

  return entries;
}

/** Flatten portable text spans to plain text — for TOC labels and word counts. */
export function portableTextToPlain(body: PortableTextBlock[] | undefined | null): string {
  if (!Array.isArray(body)) return "";
  return body
    .filter((block) => block?._type === "block")
    .map((block) =>
      ((block as { children?: { text?: string }[] }).children ?? [])
        .map((child) => child.text ?? "")
        .join(""),
    )
    .join("\n\n");
}

/**
 * Dates as `22 August 2026`.
 *
 * en-GB is pinned rather than left to the runtime locale so the server-rendered
 * string and the client hydration always match — a date formatted with the
 * visitor's locale is a hydration mismatch waiting to happen.
 */
export function formatPostDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

/** ISO date (YYYY-MM-DD) for <time datetime> and structured data. */
export function isoDate(value: string | null | undefined): string {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

/** The freshest meaningful date on a post — what the byline should show. */
export function displayDate(post: { publishedAt: string; updatedAt?: string | null }): {
  label: string;
  iso: string;
  wasUpdated: boolean;
} {
  const updated = post.updatedAt && post.updatedAt !== post.publishedAt ? post.updatedAt : null;
  const value = updated ?? post.publishedAt;
  return { label: formatPostDate(value), iso: isoDate(value), wasUpdated: Boolean(updated) };
}
