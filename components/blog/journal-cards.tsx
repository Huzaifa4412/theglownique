import type { CSSProperties } from "react";
import Link from "next/link";

import { SanityImage } from "@/components/blog/sanity-image";
import { type BlogPostCard, displayDate } from "@/lib/blog";

/*
 * The journal's shared building blocks: the hub, the category archives and the
 * "keep reading" row on each article all draw from these, so a post looks the
 * same wherever it is listed. Styles live in app/blog/blog-hub.css (.bhub-*).
 */

/**
 * Each category glows in its own colour, so a reader learns the shelves by
 * colour as well as by name. An unknown category falls back to brand pink.
 */
const CATEGORY_ACCENTS: Record<string, string> = {
  "ideas-and-inspiration": "#ffb547",
  "colour-and-design": "#f40b68",
  "care-and-setup": "#2fd4ff",
  "sign-basics": "#7c4dff",
  trends: "#3ee08f",
};

export function accentFor(slug: string | undefined): string {
  return (slug && CATEGORY_ACCENTS[slug]) || "#f40b68";
}

export function accentStyle(accent: string): CSSProperties {
  return { "--accent": accent } as CSSProperties;
}

export function PostMeta({ post }: { post: BlogPostCard }) {
  const { label, iso, wasUpdated } = displayDate(post);
  return (
    <p className="bhub-meta">
      <time dateTime={iso}>
        {wasUpdated ? "Updated " : ""}
        {label}
      </time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

/** The cover story: the biggest image on the page, title set over it. */
export function CoverStory({
  post,
  label = "Cover story",
  showCategory = true,
}: {
  post: BlogPostCard;
  label?: string;
  /** Off on a category archive, where the category is the page itself. */
  showCategory?: boolean;
}) {
  return (
    <article className="bhub-cover" style={accentStyle(accentFor(post.category?.slug))}>
      <div className="bhub-cover__media">
        <SanityImage image={post.coverImage} sizes="(min-width: 1024px) 760px, 100vw" fill priority />
      </div>
      <div className="bhub-cover__body">
        <p className="bhub-chips">
          <span className="bhub-chip bhub-chip--solid">{label}</span>
          {showCategory && post.category ? (
            <span className="bhub-chip">{post.category.title}</span>
          ) : null}
        </p>
        <h2 className="bhub-cover__title">
          <Link href={`/blog/${post.slug}`} className="bhub-stretch">
            {post.title}
          </Link>
        </h2>
        <p className="bhub-cover__summary">{post.summary}</p>
        <PostMeta post={post} />
      </div>
    </article>
  );
}

/** A small row in the hero rail: thumbnail beside the title. */
export function RailStory({ post }: { post: BlogPostCard }) {
  return (
    <li>
      <article className="bhub-rail__item" style={accentStyle(accentFor(post.category?.slug))}>
        <div className="bhub-rail__thumb">
          <SanityImage image={post.coverImage} alt="" sizes="120px" fill />
        </div>
        <div>
          {post.category ? <p className="bhub-rail__cat">{post.category.title}</p> : null}
          <h3 className="bhub-rail__title">
            <Link href={`/blog/${post.slug}`} className="bhub-stretch">
              {post.title}
            </Link>
          </h3>
          <PostMeta post={post} />
        </div>
      </article>
    </li>
  );
}

/** A shelf card: the cover photo is the card, the title sits on it. */
export function ShelfCard({
  post,
  accent,
  showCategory = false,
}: {
  post: BlogPostCard;
  accent: string;
  /** On a mixed shelf the card has to say which category it belongs to. */
  showCategory?: boolean;
}) {
  return (
    <li className="bhub-shelf__item">
      <article className="bhub-card" style={accentStyle(accent)}>
        <div className="bhub-card__media">
          <SanityImage
            image={post.coverImage}
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 40vw, 78vw"
            fill
          />
        </div>
        <div className="bhub-card__body">
          {showCategory && post.category ? (
            <p className="bhub-card__cat">{post.category.title}</p>
          ) : null}
          <h3 className="bhub-card__title">
            <Link href={`/blog/${post.slug}`} className="bhub-stretch">
              {post.title}
            </Link>
          </h3>
          <PostMeta post={post} />
        </div>
      </article>
    </li>
  );
}
