import Link from "next/link";

import { SanityImage } from "@/components/blog/sanity-image";
import { type BlogPostCard, displayDate } from "@/lib/blog";

/**
 * Card sizes.
 *
 * `feature` is the hero slot on the hub — one per page, image beside the text.
 * `standard` is the grid card. `compact` drops the image entirely and is used
 * by the "keep reading" rail, where three more photos would compete with the
 * post the reader is still in.
 */
type Variant = "feature" | "standard" | "compact";

type PostCardProps = {
  post: BlogPostCard;
  variant?: Variant;
  /** Only the hub's feature card should preload its image. */
  priority?: boolean;
  /** Rendered as an <h2> by default; the hub's feature card wants an <h2> too. */
  headingLevel?: "h2" | "h3";
};

function Meta({ post }: { post: BlogPostCard }) {
  const { label, iso, wasUpdated } = displayDate(post);
  return (
    <p className="blog-card__meta">
      <time dateTime={iso}>
        {wasUpdated ? "Updated " : ""}
        {label}
      </time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  );
}

export function PostCard({
  post,
  variant = "standard",
  priority = false,
  headingLevel = "h2",
}: PostCardProps) {
  const Heading = headingLevel;
  const href = `/blog/${post.slug}`;

  if (variant === "compact") {
    return (
      <article className="blog-card blog-card--compact">
        {post.category ? <span className="blog-chip">{post.category.title}</span> : null}
        <Heading className="blog-card__title">
          {/* The whole card is not a link: a card-sized hit area swallows the
              category chip and the "3 min read" text into one enormous link
              name, which is unusable with a screen reader. The title link is
              the link, and ::after in CSS extends its hit area to the card. */}
          <Link href={href} className="blog-card__link">
            {post.title}
          </Link>
        </Heading>
        <Meta post={post} />
      </article>
    );
  }

  if (variant === "feature") {
    return (
      <article className="blog-card blog-card--feature">
        <div className="blog-card__media blog-card__media--feature">
          <SanityImage
            image={post.coverImage}
            sizes="(min-width: 1024px) 620px, 100vw"
            fill
            priority={priority}
          />
        </div>
        <div className="blog-card__body">
          <div className="blog-card__chips">
            <span className="blog-chip blog-chip--accent">Featured</span>
            {post.category ? <span className="blog-chip">{post.category.title}</span> : null}
          </div>
          <Heading className="blog-card__title blog-card__title--feature">
            <Link href={href} className="blog-card__link">
              {post.title}
            </Link>
          </Heading>
          <p className="blog-card__summary">{post.summary}</p>
          <Meta post={post} />
          <span className="blog-card__cue" aria-hidden="true">
            Read the article →
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-card">
      <div className="blog-card__media">
        <SanityImage
          image={post.coverImage}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
          fill
          priority={priority}
        />
      </div>
      <div className="blog-card__body">
        {post.category ? <span className="blog-chip">{post.category.title}</span> : null}
        <Heading className="blog-card__title">
          <Link href={href} className="blog-card__link">
            {post.title}
          </Link>
        </Heading>
        <p className="blog-card__summary">{post.summary}</p>
        <Meta post={post} />
      </div>
    </article>
  );
}
