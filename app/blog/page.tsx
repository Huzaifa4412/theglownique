import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "./blog.css";
import "./blog-hub.css";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { BlogNewsletter } from "@/components/blog/blog-newsletter";
import { SanityImage } from "@/components/blog/sanity-image";
import { ShelfScroller } from "@/components/blog/shelf-scroller";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import {
  BLOG_SETTINGS_FALLBACK,
  type BlogCategory,
  type BlogPostCard,
  displayDate,
  getBlogSettings,
  getCategories,
  getPosts,
  isoDate,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/**
 * /blog — the journal hub.
 *
 * Statically rendered and revalidated, so publishing in the Studio puts a post
 * live without a deploy. See lib/blog.ts for why five minutes, and
 * app/api/revalidate/route.ts for how to make it instant.
 *
 * The literal is deliberate. Next requires this export to be statically
 * analyzable — importing REVALIDATE_SECONDS here fails the build with "Invalid
 * segment configuration export" — so the number is repeated on each blog route
 * and lib/blog.ts stays the place the reasoning is written down.
 */
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = (await getBlogSettings()) ?? BLOG_SETTINGS_FALLBACK;

  return {
    title: settings.seoTitle,
    description: settings.seoDescription,
    alternates: { canonical: "/blog" },
    openGraph: {
      type: "website",
      siteName: "The Glownique",
      title: `${settings.seoTitle} | The Glownique`,
      description: settings.seoDescription,
      url: "/blog",
      images: [{ url: "/hero/neon-sign-hero.png", alt: "The Glownique journal" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${settings.seoTitle} | The Glownique`,
      description: settings.seoDescription,
      images: ["/hero/neon-sign-hero.png"],
    },
  };
}

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

function accentFor(slug: string | undefined): string {
  return (slug && CATEGORY_ACCENTS[slug]) || "#f40b68";
}

function accentStyle(accent: string): CSSProperties {
  return { "--accent": accent } as CSSProperties;
}

/**
 * Where the hub sends people who came for ideas and left with a decision to
 * make. This is the internal-link contract at hub level: /blog owns awareness,
 * and it must hand off to the clusters that own everything downstream of it
 * rather than trying to answer buying questions itself.
 */
const NEXT_STEPS = [
  {
    href: "/guides",
    title: "Buying guides",
    text: "Costs, lighting comparisons and sizing — the decisions that come after the idea.",
    image: {
      src: "/3d-metallic-neon-sign/duallit/2.webp",
      alt: "White 3D letters spelling AMERICA, lit so the glow falls on the surface around them",
    },
  },
  {
    href: "/business-signs",
    title: "Business signage",
    text: "Channel letters, lightboxes, acrylic logos and logo neon for storefronts and interiors.",
    image: {
      src: "/ultra-thin-slim-lightbox/lobbies-and-branding.jpg",
      alt: "Round lit lightbox sign reading Barb's Coffee House",
    },
  },
  {
    href: "/custom-signage",
    title: "All sign types",
    text: "The full catalogue of what we build, with specifications for each.",
    image: {
      src: "/blog/how-to-choose-a-custom-neon-sign/wedding-backdrop-name-sign.webp",
      alt: "Pink script neon name sign on a peach drape, framed by two flower arrangements",
    },
  },
] as const;

function PostMeta({ post }: { post: BlogPostCard }) {
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
function CoverStory({ post }: { post: BlogPostCard }) {
  return (
    <article className="bhub-cover" style={accentStyle(accentFor(post.category?.slug))}>
      <div className="bhub-cover__media">
        <SanityImage image={post.coverImage} sizes="(min-width: 1024px) 760px, 100vw" fill priority />
      </div>
      <div className="bhub-cover__body">
        <p className="bhub-chips">
          <span className="bhub-chip bhub-chip--solid">Cover story</span>
          {post.category ? <span className="bhub-chip">{post.category.title}</span> : null}
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
function RailStory({ post }: { post: BlogPostCard }) {
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
function ShelfCard({ post, accent }: { post: BlogPostCard; accent: string }) {
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

/**
 * Every post appears on its category's shelf, newest first. Shelves are ordered
 * by how many posts they hold, so the fullest shelf leads. Posts with no
 * category get their own shelf at the end rather than disappearing.
 */
function buildShelves(categories: BlogCategory[], posts: BlogPostCard[]) {
  const shelves = categories
    .map((category) => ({
      category,
      posts: posts.filter((post) => post.category?.slug === category.slug),
    }))
    .filter((shelf) => shelf.posts.length > 0)
    .sort((a, b) => b.posts.length - a.posts.length);

  const uncategorised = posts.filter((post) => !post.category);
  return { shelves, uncategorised };
}

export default async function BlogHubPage() {
  const [settings, categories, posts] = await Promise.all([
    getBlogSettings(),
    getCategories(),
    getPosts(),
  ]);

  const copy = settings ?? BLOG_SETTINGS_FALLBACK;
  const pageUrl = `${SITE_URL}/blog`;

  // The cover goes to the newest post flagged `featured`. If nobody has
  // flagged one, the newest post takes it — an empty cover would be worse, and
  // a hub whose top slot depends on an editor remembering a toggle is a hub
  // that will one day look broken.
  const featured = posts.find((post) => post.featured) ?? posts[0] ?? null;
  const rail = posts.filter((post) => post._id !== featured?._id).slice(0, 3);
  const { shelves, uncategorised } = buildShelves(categories, posts);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${pageUrl}#blog`,
        url: pageUrl,
        name: copy.heading,
        description: copy.seoDescription,
        publisher: { "@id": `${SITE_URL}/#organization` },
        // Only posts that are actually allowed in search belong in the feed a
        // crawler reads off this page.
        blogPost: posts
          .filter((post) => post.indexable !== false)
          .slice(0, 20)
          .map((post) => ({
            "@type": "BlogPosting",
            "@id": `${SITE_URL}/blog/${post.slug}#article`,
            headline: post.title,
            description: post.summary,
            url: `${SITE_URL}/blog/${post.slug}`,
            datePublished: isoDate(post.publishedAt),
            dateModified: isoDate(post.updatedAt ?? post.publishedAt),
            author: post.author ? { "@type": "Person", name: post.author.name } : undefined,
          })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Journal", item: pageUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <MetaViewCategory category="Blog" />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />

      <main id="main-content" className="bhub">
        <section className="bhub-hero" aria-labelledby="blog-heading">
          <div className="bhub-hero__glow bhub-hero__glow--a" aria-hidden="true" />
          <div className="bhub-hero__glow bhub-hero__glow--b" aria-hidden="true" />
          <div className="bhub-shell">
            <div className="bhub-hero__head">
              <div>
                <nav aria-label="Breadcrumb">
                  <ol className="bhub-crumbs">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page">Journal</li>
                  </ol>
                </nav>
                <p className="bhub-eyebrow">{copy.eyebrow}</p>
                <h1 id="blog-heading" className="bhub-h1">
                  {copy.heading}
                </h1>
              </div>
              <p className="bhub-intro">{copy.intro}</p>
            </div>

            {categories.length > 0 ? (
              <nav className="bhub-cats" aria-label="Article categories">
                <Link href="/blog" className="bhub-cat" aria-current="page">
                  All articles
                  <span className="bhub-cat__count">{posts.length}</span>
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/blog/category/${category.slug}`}
                    className="bhub-cat"
                    style={accentStyle(accentFor(category.slug))}
                  >
                    <span className="bhub-dot" aria-hidden="true" />
                    {category.title}
                    <span className="bhub-cat__count">{category.count}</span>
                  </Link>
                ))}
              </nav>
            ) : null}

            {featured ? (
              <div className="bhub-front">
                <CoverStory post={featured} />
                {rail.length > 0 ? (
                  <section className="bhub-rail" aria-labelledby="blog-new-heading">
                    <h2 id="blog-new-heading" className="bhub-rail__heading">
                      Just published
                    </h2>
                    <ul>
                      {rail.map((post) => (
                        <RailStory key={post._id} post={post} />
                      ))}
                    </ul>
                  </section>
                ) : null}
              </div>
            ) : (
              <p className="bhub-empty">
                The first articles are being written. In the meantime, the{" "}
                <Link href="/guides">buying guides</Link> cover costs, lighting comparisons and sizing.
              </p>
            )}
          </div>
        </section>

        {shelves.map(({ category, posts: shelfPosts }, index) => {
          const accent = accentFor(category.slug);
          const headingId = `shelf-${category.slug}`;
          return (
            <section
              key={category.slug}
              className={`bhub-section${index % 2 === 1 ? " bhub-section--tint" : ""}`}
              aria-labelledby={headingId}
              style={accentStyle(accent)}
            >
              <div className="bhub-shell">
                <header className="bhub-section__head">
                  <div>
                    <p className="bhub-section__eyebrow">
                      <span className="bhub-dot" aria-hidden="true" />
                      {category.count} {category.count === 1 ? "article" : "articles"}
                    </p>
                    <h2 id={headingId}>{category.title}</h2>
                    {category.description ? <p>{category.description}</p> : null}
                  </div>
                  <Link href={`/blog/category/${category.slug}`} className="bhub-seeall">
                    See all <span className="sr-only">{category.title} articles</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </header>
                <ShelfScroller label={`${category.title} articles`}>
                  {shelfPosts.map((post) => (
                    <ShelfCard key={post._id} post={post} accent={accent} />
                  ))}
                </ShelfScroller>
              </div>
            </section>
          );
        })}

        {uncategorised.length > 0 ? (
          <section className="bhub-section" aria-labelledby="shelf-more">
            <div className="bhub-shell">
              <header className="bhub-section__head">
                <h2 id="shelf-more">More articles</h2>
              </header>
              <ShelfScroller label="More articles">
                {uncategorised.map((post) => (
                  <ShelfCard key={post._id} post={post} accent={accentFor(undefined)} />
                ))}
              </ShelfScroller>
            </div>
          </section>
        ) : null}

        <section className="bhub-next" aria-labelledby="blog-next-heading">
          <div className="bhub-shell">
            <header className="bhub-section__head">
              <div>
                <p className="bhub-section__eyebrow">
                  <span className="bhub-dot" aria-hidden="true" />
                  From ideas to an order
                </p>
                <h2 id="blog-next-heading">Ready to decide, not just read?</h2>
              </div>
            </header>
            <ul className="bhub-next__grid">
              {NEXT_STEPS.map((step) => (
                <li key={step.href}>
                  <Link href={step.href} className="bhub-next__card">
                    <span className="bhub-next__media">
                      <Image
                        src={step.image.src}
                        alt={step.image.alt}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </span>
                    <span className="bhub-next__title">
                      {step.title} <span aria-hidden="true">→</span>
                    </span>
                    <span className="bhub-next__text">{step.text}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="blog-shell bhub-newsletter">
          <BlogNewsletter heading={copy.newsletterHeading} text={copy.newsletterText} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
