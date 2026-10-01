import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import "./blog.css";
import "./blog-hub.css";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { BlogNewsletter } from "@/components/blog/blog-newsletter";
import {
  CoverStory,
  RailStory,
  ShelfCard,
  accentFor,
  accentStyle,
} from "@/components/blog/journal-cards";
import { ShelfScroller } from "@/components/blog/shelf-scroller";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import {
  BLOG_SETTINGS_FALLBACK,
  type BlogCategory,
  type BlogPostCard,
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

/** A category needs this many posts to fill a shelf of its own. */
const MIN_SHELF = 3;

/** Desktop fits about this many cards before the row has to scroll. */
const CARDS_IN_VIEW = 4;

/**
 * Every post appears on exactly one shelf, newest first. A category with enough
 * posts gets its own shelf, fullest first. Smaller categories, and any post
 * whose category is missing, share a final mixed shelf, so a category with one
 * post never leaves a mostly empty row and no post can disappear.
 */
function buildShelves(categories: BlogCategory[], posts: BlogPostCard[]) {
  const withPosts = categories
    .map((category) => ({
      category,
      posts: posts.filter((post) => post.category?.slug === category.slug),
    }))
    .filter((shelf) => shelf.posts.length > 0);

  const shelves = withPosts
    .filter((shelf) => shelf.posts.length >= MIN_SHELF)
    .sort((a, b) => b.posts.length - a.posts.length);
  const onShelf = new Set(shelves.flatMap((shelf) => shelf.posts.map((post) => post._id)));

  const mixedCategories = withPosts
    .filter((shelf) => shelf.posts.length < MIN_SHELF)
    .map((shelf) => shelf.category);
  const mixed = posts.filter((post) => !onShelf.has(post._id));

  return { shelves, mixed, mixedCategories };
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
  const { shelves, mixed, mixedCategories } = buildShelves(categories, posts);

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
                <ShelfScroller
                  label={`${category.title} articles`}
                  controls={shelfPosts.length > CARDS_IN_VIEW}
                >
                  {shelfPosts.map((post) => (
                    <ShelfCard key={post._id} post={post} accent={accent} />
                  ))}
                </ShelfScroller>
              </div>
            </section>
          );
        })}

        {mixed.length > 0 ? (
          <section
            className={`bhub-section${shelves.length % 2 === 1 ? " bhub-section--tint" : ""}`}
            aria-labelledby="shelf-more"
          >
            <div className="bhub-shell">
              <header className="bhub-section__head">
                <div>
                  <p className="bhub-section__eyebrow">
                    <span className="bhub-dot" aria-hidden="true" />
                    {mixed.length} {mixed.length === 1 ? "article" : "articles"}
                  </p>
                  <h2 id="shelf-more">More from the journal</h2>
                </div>
                {mixedCategories.length > 0 ? (
                  <nav className="bhub-seeall-group" aria-label="More categories">
                    {mixedCategories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/blog/category/${category.slug}`}
                        className="bhub-seeall"
                        style={accentStyle(accentFor(category.slug))}
                      >
                        <span className="bhub-dot" aria-hidden="true" />
                        {category.title} <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </nav>
                ) : null}
              </header>
              <ShelfScroller label="More articles" controls={mixed.length > CARDS_IN_VIEW}>
                {mixed.map((post) => (
                  <ShelfCard
                    key={post._id}
                    post={post}
                    accent={accentFor(post.category?.slug)}
                    showCategory
                  />
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
