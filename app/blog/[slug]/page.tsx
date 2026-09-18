import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import "../blog.css";

import { MetaGuideView } from "@/components/analytics/meta-view-trackers";
import { AuthorCard } from "@/components/blog/author-card";
import { BlogNewsletter } from "@/components/blog/blog-newsletter";
import { BlogPortableText } from "@/components/blog/portable-text";
import { PostCard } from "@/components/blog/post-card";
import { SanityImage } from "@/components/blog/sanity-image";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import {
  buildToc,
  displayDate,
  formatPostDate,
  getPost,
  getPostRoutes,
  isoDate,
} from "@/lib/blog";
import { SITE_URL, whatsappQuoteUrl } from "@/lib/site";
import { serializeJsonLd } from "@/lib/utils";

/** Must be a static literal — see the note in app/blog/page.tsx. */
export const revalidate = 300;

/**
 * Slugs known at build time are prerendered; anything published afterwards is
 * rendered on first request and then cached. `dynamicParams` is left at its
 * default of true for that reason — setting it false, as the product route
 * does, would mean every new post 404s until the next deploy, which defeats
 * the point of putting the blog in a CMS.
 */
export async function generateStaticParams() {
  const routes = await getPostRoutes();
  return routes.map((route) => ({ slug: route.slug }));
}

type Params = { params: Promise<{ slug: string }> };

const LINK_KIND_LABEL = {
  commercial: "Product",
  guide: "Guide",
  proof: "Project",
} as const;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const image = post.coverImage?.url ?? "/hero/neon-sign-hero.png";
  const description =
    post.slug === "turn-business-logo-into-custom-neon-sign"
      ? "Learn how to turn your business logo into a custom LED neon sign: essential workshop rules for stroke width, letter height, Pantone colors & backboard styles."
      : post.slug === "led-neon-vs-glass-neon"
        ? "Voltage, weight, repairability and outdoor use — an honest comparison of LED neon flex and traditional glass neon, including where glass still wins."
        : post.seoDescription;

  return {
    title,
    description,
    alternates: { canonical: url },
    // `indexable: false` is how a post is pulled from search without being
    // deleted — see the field's description in the schema. The sitemap honours
    // the same flag, so the two can never disagree.
    robots: post.indexable === false ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      siteName: "The Glownique",
      title: `${title} | The Glownique`,
      description,
      url,
      publishedTime: isoDate(post.publishedAt),
      modifiedTime: isoDate(post.updatedAt ?? post.publishedAt),
      authors: [post.author?.name].filter(Boolean) as string[],
      images: [{ url: image, alt: post.coverImage?.alt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | The Glownique`,
      description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const toc = buildToc(post.body);
  const byline = displayDate(post);
  const related = post.related ?? [];
  const faqs = post.faqs ?? [];

  const authorNode = post.author
    ? {
        "@type": "Person",
        name: post.author.name,
        jobTitle: post.author.role,
        description: post.author.expertise,
        ...(post.author.links?.length
          ? { sameAs: post.author.links.map((link) => link.url) }
          : {}),
      }
    : { "@id": `${SITE_URL}/#organization` };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        headline: post.title,
        description: post.summary,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        datePublished: isoDate(post.publishedAt),
        dateModified: isoDate(post.updatedAt ?? post.publishedAt),
        articleSection: post.category?.title,
        author: authorNode,
        // Only claim a reviewer when a different person actually reviewed it.
        ...(post.reviewer && post.reviewer.name !== post.author?.name
          ? {
              reviewedBy: {
                "@type": "Person",
                name: post.reviewer.name,
                jobTitle: post.reviewer.role,
              },
            }
          : {}),
        publisher: { "@id": `${SITE_URL}/#organization` },
        ...(post.coverImage?.url
          ? {
              image: {
                "@type": "ImageObject",
                url: post.coverImage.url,
                width: post.coverImage.width ?? undefined,
                height: post.coverImage.height ?? undefined,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          ...(post.category
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: post.category.title,
                  item: `${SITE_URL}/blog/category/${post.category.slug}`,
                },
              ]
            : []),
          {
            "@type": "ListItem",
            position: post.category ? 4 : 3,
            name: post.title,
            item: pageUrl,
          },
        ],
      },
      // FAQPage only when the page really shows those questions and answers.
      // Emitting it for a post with no FAQ block is the exact schema/content
      // mismatch the content plan lists as a hard stop.
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <MetaGuideView guideName={post.title} />
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />

      <main id="main-content" className="bg-white">
        <article>
          <header className="blog-post__header">
            <div className="blog-post__header-inner">
              <nav className="blog-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">›</span>
                <Link href="/blog">Journal</Link>
                {post.category ? (
                  <>
                    <span aria-hidden="true">›</span>
                    <Link href={`/blog/category/${post.category.slug}`}>{post.category.title}</Link>
                  </>
                ) : null}
              </nav>

              <h1 className="blog-post__title">{post.title}</h1>
              <p className="blog-post__summary">{post.summary}</p>

              <div className="blog-post__byline">
                {post.author ? (
                  <>
                    <span>
                      By <strong>{post.author.name}</strong>, {post.author.role}
                    </span>
                    <span aria-hidden="true">·</span>
                  </>
                ) : null}
                <time dateTime={byline.iso}>
                  {byline.wasUpdated ? "Updated " : ""}
                  {byline.label}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
                {post.reviewer && post.reviewer.name !== post.author?.name ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Reviewed by {post.reviewer.name}</span>
                  </>
                ) : null}
              </div>
            </div>
          </header>

          {post.coverImage?.url ? (
            <figure className="blog-post__cover">
              <SanityImage
                image={post.coverImage}
                sizes="(min-width: 1200px) 1100px, 100vw"
                priority
                className="w-full rounded-3xl border border-[#eadfe4]"
              />
              {post.coverImage.caption ? (
                <figcaption className="blog-prose__caption">{post.coverImage.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}

          <div className="blog-post__layout">
            {/* Sticky on desktop, inline above the article on mobile — the
                order in the DOM puts it before the body either way so it is
                reachable without scrolling past the thing it indexes. */}
            <aside className="blog-post__aside">
              <TableOfContents entries={toc} />
            </aside>

            <div className="blog-post__body">
              {post.keyTakeaways && post.keyTakeaways.length > 0 ? (
                <section className="blog-takeaways" aria-labelledby="key-takeaways">
                  <h2 className="blog-takeaways__heading" id="key-takeaways">
                    Key takeaways
                  </h2>
                  <ul>
                    {post.keyTakeaways.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <BlogPortableText value={post.body} />

              {faqs.length > 0 ? (
                <section className="blog-faq" aria-labelledby="blog-faq-heading">
                  <h2 className="blog-prose__h2" id="blog-faq-heading">
                    Frequently asked questions
                  </h2>
                  <dl>
                    {faqs.map((faq) => (
                      <div key={faq.q} className="blog-faq__item">
                        <dt>{faq.q}</dt>
                        <dd>{faq.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              ) : null}

              {post.sources && post.sources.length > 0 ? (
                <section className="blog-sources" aria-labelledby="blog-sources-heading">
                  <h2 className="blog-sources__heading" id="blog-sources-heading">
                    Sources
                  </h2>
                  <ol>
                    {post.sources.map((source) => (
                      <li key={`${source.label}-${source.url ?? ""}`}>
                        {source.url ? (
                          <a href={source.url} target="_blank" rel="noopener noreferrer nofollow">
                            {source.label}
                          </a>
                        ) : (
                          source.label
                        )}
                        {source.publisher ? ` — ${source.publisher}` : ""}
                        {source.accessed ? ` (accessed ${formatPostDate(source.accessed)})` : ""}
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {post.author ? <AuthorCard author={post.author} reviewer={post.reviewer} /> : null}

              <section className="blog-cta" aria-labelledby="blog-cta-heading">
                <div>
                  <h2 className="blog-cta__heading" id="blog-cta-heading">
                    Turn the idea into a sign
                  </h2>
                  <p className="blog-cta__text">
                    Send us your logo, words or a rough sketch and we&apos;ll come back with a free
                    digital mockup and a quote for your exact size — before anything is built.
                  </p>
                </div>
                <a
                  href={whatsappQuoteUrl("custom sign")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-meta-source="blog-post-cta"
                  className="button button--whatsapp shrink-0"
                >
                  <span>Get a free mockup</span>
                  <WhatsappIcon className="h-5 w-5 shrink-0" />
                </a>
              </section>
            </div>
          </div>
        </article>

        <div className="blog-shell">
          {post.relatedLinks && post.relatedLinks.length > 0 ? (
            <section aria-labelledby="blog-next-heading" className="blog-section">
              <h2 className="blog-section__heading" id="blog-next-heading">
                Where to go next
              </h2>
              <div className="blog-next">
                {post.relatedLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="blog-next__card">
                    <span className="blog-chip">{LINK_KIND_LABEL[link.kind] ?? "Read"}</span>
                    <span className="blog-next__title">{link.label}</span>
                    <span className="blog-next__text">{link.description}</span>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          {related.length > 0 ? (
            <section aria-labelledby="blog-related-heading" className="blog-section">
              <h2 className="blog-section__heading" id="blog-related-heading">
                Keep reading
              </h2>
              <div className="blog-grid blog-grid--compact">
                {related.map((item) => (
                  <PostCard key={item._id} post={item} variant="compact" headingLevel="h3" />
                ))}
              </div>
            </section>
          ) : null}

          <BlogNewsletter />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
