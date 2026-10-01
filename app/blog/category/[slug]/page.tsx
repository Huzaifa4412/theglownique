import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import "../../blog.css";
import "../../blog-hub.css";

import { BlogNewsletter } from "@/components/blog/blog-newsletter";
import {
  CoverStory,
  ShelfCard,
  accentFor,
  accentStyle,
} from "@/components/blog/journal-cards";
import { SanityImage } from "@/components/blog/sanity-image";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import {
  getCategories,
  getCategory,
  getCategoryRoutes,
  getPosts,
  getPostsByCategory,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/**
 * /blog/category/{slug} — a real, indexable archive rather than a client-side
 * filter on the hub.
 *
 * It earns that status through the category's `intro`, which the schema makes
 * required: without copy of its own, an archive is a re-cut of /blog and the
 * cannibalization controls in the IA doc say to merge it away. With it, the
 * archive answers "what is this topic and why would I read it" — a question
 * the hub cannot answer for five topics at once.
 *
 * Only categories that actually have published posts get routes (see
 * `categoryRoutesQuery`), so an empty archive never gets built or linked.
 *
 * `revalidate` must be a static literal — see the note in app/blog/page.tsx.
 */
export const revalidate = 300;

export async function generateStaticParams() {
  const routes = await getCategoryRoutes();
  return routes.map((route) => ({ slug: route.slug }));
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};

  const url = `/blog/category/${category.slug}`;
  const title = `${category.title} — Sign Ideas & Advice`;

  return {
    title,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: "The Glownique",
      title: `${title} | The Glownique`,
      description: category.description,
      url,
      images: [{ url: "/hero/neon-sign-hero.png", alt: category.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | The Glownique`,
      description: category.description,
      images: ["/hero/neon-sign-hero.png"],
    },
  };
}

export default async function BlogCategoryPage({ params }: Params) {
  const { slug } = await params;

  const [category, posts, categories, allPosts] = await Promise.all([
    getCategory(slug),
    getPostsByCategory(slug),
    getCategories(),
    getPosts(),
  ]);

  if (!category) notFound();

  // A category whose last post was unpublished should not linger as an empty
  // page. It is dropped from `generateStaticParams` and from the filter row
  // already; 404 closes the last door.
  if (posts.length === 0) notFound();

  const pageUrl = `${SITE_URL}/blog/category/${category.slug}`;
  // The full intro lives in the CMS; the hub's own copy is not repeated here.
  const intro = categories.find((item) => item.slug === category.slug)?.intro ?? category.description;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: category.title,
        description: category.description,
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "ItemList",
        itemListElement: posts
          .filter((post) => post.indexable !== false)
          .map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${SITE_URL}/blog/${post.slug}`,
            name: post.title,
          })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: category.title, item: pageUrl },
        ],
      },
    ],
  };

  const newest = posts[0];
  const newestDate = newest?.publishedAt ? new Date(newest.publishedAt) : null;
  const latestYear =
    newestDate && !Number.isNaN(newestDate.getTime())
      ? newestDate.getFullYear()
      : null;

  const accent = accentFor(category.slug);
  const [lead, ...others] = posts;
  // Up to three covers from this category, fanned out in the hero.
  const fan = posts.filter((post) => post.coverImage?.url).slice(0, 3);
  // Every other topic, shown by the cover of its newest post, so even a
  // one-article archive ends with somewhere to go.
  const otherTopics = categories
    .filter((item) => item.slug !== category.slug)
    .map((item) => ({
      category: item,
      cover: allPosts.find((post) => post.category?.slug === item.slug && post.coverImage?.url),
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />

      <main id="main-content" className="bhub" style={accentStyle(accent)}>
        <section className="bhub-hero bhub-hero--archive" aria-labelledby="category-heading">
          <div className="bhub-hero__glow bhub-hero__glow--accent" aria-hidden="true" />
          <div className="bhub-hero__glow bhub-hero__glow--b" aria-hidden="true" />
          <div className="bhub-shell">
            <div className="bhub-archive">
              <div>
                <nav aria-label="Breadcrumb">
                  <ol className="bhub-crumbs">
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li>
                      <Link href="/blog">Journal</Link>
                    </li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page">{category.title}</li>
                  </ol>
                </nav>
                <p className="bhub-section__eyebrow bhub-section__eyebrow--light">
                  <span className="bhub-dot" aria-hidden="true" />
                  {posts.length} article{posts.length === 1 ? "" : "s"}
                  {latestYear ? ` · latest ${latestYear}` : ""}
                </p>
                <h1 id="category-heading" className="bhub-h1">
                  {category.title}
                </h1>
                <p className="bhub-intro bhub-intro--archive">{intro}</p>
              </div>

              {fan.length > 0 ? (
                <div className={`bhub-fan bhub-fan--${fan.length}`} aria-hidden="true">
                  {fan.map((post) => (
                    <div key={post._id} className="bhub-fan__card">
                      <SanityImage image={post.coverImage} alt="" sizes="280px" fill />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <nav className="bhub-cats" aria-label="Article categories">
              <Link href="/blog" className="bhub-cat">
                All articles
                <span className="bhub-cat__count">{allPosts.length}</span>
              </Link>
              {categories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/category/${item.slug}`}
                  className="bhub-cat"
                  aria-current={item.slug === category.slug ? "page" : undefined}
                  style={accentStyle(accentFor(item.slug))}
                >
                  <span className="bhub-dot" aria-hidden="true" />
                  {item.title}
                  <span className="bhub-cat__count">{item.count}</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="bhub-section" aria-label={`${category.title} articles`}>
          <div className="bhub-shell">
            {lead ? <CoverStory post={lead} label="Latest" showCategory={false} /> : null}
            {others.length > 0 ? (
              <ul className="bhub-cardgrid">
                {others.map((post) => (
                  <ShelfCard key={post._id} post={post} accent={accent} />
                ))}
              </ul>
            ) : null}
          </div>
        </section>

        {otherTopics.length > 0 ? (
          <section className="bhub-section bhub-section--tint" aria-labelledby="other-topics">
            <div className="bhub-shell">
              <header className="bhub-section__head">
                <div>
                  <p className="bhub-section__eyebrow">
                    <span className="bhub-dot" aria-hidden="true" />
                    Keep exploring
                  </p>
                  <h2 id="other-topics">Other topics in the journal</h2>
                </div>
                <Link href="/blog" className="bhub-seeall">
                  All articles <span aria-hidden="true">→</span>
                </Link>
              </header>
              <ul className="bhub-topics">
                {otherTopics.map(({ category: topic, cover }) => (
                  <li key={topic.slug}>
                    <Link
                      href={`/blog/category/${topic.slug}`}
                      className="bhub-topic"
                      style={accentStyle(accentFor(topic.slug))}
                    >
                      <span className="bhub-topic__media">
                        {cover ? (
                          <SanityImage
                            image={cover.coverImage}
                            alt=""
                            sizes="(min-width: 1024px) 300px, 50vw"
                            fill
                          />
                        ) : null}
                      </span>
                      <span className="bhub-topic__body">
                        <span className="bhub-topic__title">{topic.title}</span>
                        <span className="bhub-topic__count">
                          {topic.count} article{topic.count === 1 ? "" : "s"} →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <div className="blog-shell bhub-newsletter">
          <BlogNewsletter />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
