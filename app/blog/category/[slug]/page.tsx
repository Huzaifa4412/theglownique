import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import "../../blog.css";

import { CategoryNav } from "@/components/blog/category-nav";
import { PostCard } from "@/components/blog/post-card";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import {
  getCategories,
  getCategory,
  getCategoryRoutes,
  getPostsByCategory,
  isoDate,
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

  const [category, posts, categories] = await Promise.all([
    getCategory(slug),
    getPostsByCategory(slug),
    getCategories(),
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />

      <main id="main-content" className="bg-white">
        <section className="blog-hero">
          <div className="blog-hero__inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link href="/blog">Journal</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{category.title}</span>
            </nav>
            <p className="eyebrow">
              {posts.length} article{posts.length === 1 ? "" : "s"}
              {latestYear ? ` · latest ${latestYear}` : ""}
            </p>
            <h1 className="blog-hero__title">{category.title}</h1>
            <p className="blog-hero__intro">{intro}</p>
          </div>
        </section>

        <div className="blog-shell">
          <CategoryNav categories={categories} activeSlug={category.slug} />

          <section aria-label={`${category.title} articles`} className="blog-section">
            <div className="blog-grid">
              {posts.map((post, index) => (
                <PostCard key={post._id} post={post} priority={index === 0} />
              ))}
            </div>
          </section>

          <p className="blog-backlink">
            <Link href="/blog">← All articles</Link>
          </p>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
