import type { Metadata } from "next";
import Link from "next/link";

import "./blog.css";

import { MetaViewCategory } from "@/components/analytics/meta-view-trackers";
import { BlogNewsletter } from "@/components/blog/blog-newsletter";
import { CategoryNav } from "@/components/blog/category-nav";
import { PostCard } from "@/components/blog/post-card";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import {
  BLOG_SETTINGS_FALLBACK,
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
  },
  {
    href: "/business-signs",
    title: "Business signage",
    text: "Channel letters, lightboxes, acrylic logos and logo neon for storefronts and interiors.",
  },
  {
    href: "/custom-signage",
    title: "All sign types",
    text: "The full catalogue of what we build, with specifications for each.",
  },
] as const;

export default async function BlogHubPage() {
  const [settings, categories, posts] = await Promise.all([
    getBlogSettings(),
    getCategories(),
    getPosts(),
  ]);

  const copy = settings ?? BLOG_SETTINGS_FALLBACK;
  const pageUrl = `${SITE_URL}/blog`;

  // The hero slot goes to the newest post flagged `featured`. If nobody has
  // flagged one, the newest post takes it — an empty hero would be worse, and
  // a hub whose top slot depends on an editor remembering a toggle is a hub
  // that will one day look broken.
  const featured = posts.find((post) => post.featured) ?? posts[0] ?? null;
  const rest = featured ? posts.filter((post) => post._id !== featured._id) : posts;

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
          { "@type": "ListItem", position: 2, name: "Blog & Journal", item: pageUrl },
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

      <main id="main-content" className="bg-white">
        <section className="blog-hero">
          <div className="blog-hero__inner">
            <nav className="blog-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">Blog & Journal</span>
            </nav>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 className="blog-hero__title">{copy.heading}</h1>
            <p className="blog-hero__intro">{copy.intro}</p>
          </div>
        </section>

        <div className="blog-shell">
          <CategoryNav categories={categories} />

          {posts.length === 0 ? (
            <p className="blog-empty">
              The first articles are being written. In the meantime, the{" "}
              <Link href="/guides">buying guides</Link> cover costs, lighting comparisons and
              sizing.
            </p>
          ) : (
            <>
              {featured ? (
                <section aria-label="Featured article" className="blog-featured">
                  <PostCard post={featured} variant="feature" priority />
                </section>
              ) : null}

              {rest.length > 0 ? (
                <section aria-labelledby="blog-latest-heading" className="blog-section">
                  <h2 className="blog-section__heading" id="blog-latest-heading">
                    Latest articles
                  </h2>
                  <div className="blog-grid">
                    {rest.map((post) => (
                      <PostCard key={post._id} post={post} headingLevel="h3" />
                    ))}
                  </div>
                </section>
              ) : null}
            </>
          )}

          <section aria-labelledby="blog-next-heading" className="blog-section">
            <h2 className="blog-section__heading" id="blog-next-heading">
              Ready to decide, not just read?
            </h2>
            <div className="blog-next">
              {NEXT_STEPS.map((step) => (
                <Link key={step.href} href={step.href} className="blog-next__card">
                  <span className="blog-next__title">{step.title}</span>
                  <span className="blog-next__text">{step.text}</span>
                </Link>
              ))}
            </div>
          </section>

          <BlogNewsletter heading={copy.newsletterHeading} text={copy.newsletterText} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
