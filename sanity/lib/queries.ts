import { defineQuery } from "next-sanity";

/**
 * GROQ for the blog.
 *
 * Two rules hold across every query here.
 *
 * `publishedAt <= now()` appears in every listing and lookup, so setting a
 * future publish date genuinely schedules a post instead of publishing it
 * immediately with a date that lies. It is in the single-post query too — a
 * scheduled post must 404 rather than sit on a guessable URL.
 *
 * Image assets are dereferenced to their `metadata` here rather than in the
 * component, because the LQIP blur and the intrinsic dimensions have to be
 * known during server render: without them next/image cannot reserve the box
 * and every card shifts as the photo lands.
 */

const IMAGE_FIELDS = `
  "url": asset->url,
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt,
  caption
`;

/** Everything a card needs, and nothing a card doesn't. */
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  summary,
  publishedAt,
  updatedAt,
  readingMinutes,
  featured,
  indexable,
  coverImage{${IMAGE_FIELDS}},
  category->{ title, "slug": slug.current, description },
  author->{ name, role }
`;

const AUTHOR_FIELDS = `
  name,
  "slug": slug.current,
  role,
  expertise,
  image{${IMAGE_FIELDS}},
  links[]{ label, url }
`;

/** Published posts, newest first. Used by the hub and by the RSS feed. */
export const postsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc)
    { ${CARD_FIELDS} }
`);

/** Published posts in one category, newest first. */
export const postsByCategoryQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()
    && category->slug.current == $category]
    | order(publishedAt desc)
    { ${CARD_FIELDS} }
`);

/**
 * One post, in full.
 *
 * `relatedPosts` falls back to the newest others in the same category when an
 * editor has not picked any — an empty "keep reading" rail is worse than an
 * automatic one, and a post with no onward link is an orphan in the making.
 */
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug && publishedAt <= now()][0]{
    ${CARD_FIELDS},
    body[]{
      ...,
      _type == "blogImage" => { ${IMAGE_FIELDS} },
      markDefs[]{ ... }
    },
    keyTakeaways,
    faqs[]{ q, a },
    seoTitle,
    seoDescription,
    primaryKeyword,
    relatedLinks[]{ kind, label, description, href },
    sources[]{ label, publisher, url, accessed },
    author->{ ${AUTHOR_FIELDS} },
    reviewer->{ ${AUTHOR_FIELDS} },
    "related": select(
      count(relatedPosts) > 0 => relatedPosts[]->{ ${CARD_FIELDS} },
      *[_type == "post" && defined(slug.current) && publishedAt <= now()
        && category._ref == ^.category._ref && _id != ^._id]
        | order(publishedAt desc)[0...3]{ ${CARD_FIELDS} }
    )
  }
`);

/** Categories that actually have a published post behind them. */
export const categoriesQuery = defineQuery(`
  *[_type == "category" && count(*[_type == "post" && references(^._id) && publishedAt <= now()]) > 0]
    | order(order asc, title asc)
    {
      title,
      "slug": slug.current,
      description,
      intro,
      "count": count(*[_type == "post" && references(^._id) && publishedAt <= now()])
    }
`);

export const categoryBySlugQuery = defineQuery(`
  *[_type == "category" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    description,
    intro
  }
`);

export const blogSettingsQuery = defineQuery(`
  *[_type == "blogSettings"][0]{
    eyebrow,
    heading,
    intro,
    seoTitle,
    seoDescription,
    newsletterHeading,
    newsletterText
  }
`);

/**
 * Slugs and dates for generateStaticParams and the sitemap.
 *
 * `indexable` rides along so the sitemap can drop a post that has been pulled
 * from search without the page itself disappearing. See lib/blog.ts.
 */
export const postRoutesQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && publishedAt <= now()]
    | order(publishedAt desc)
    {
      "slug": slug.current,
      publishedAt,
      updatedAt,
      indexable
    }
`);

export const categoryRoutesQuery = defineQuery(`
  *[_type == "category" && count(*[_type == "post" && references(^._id) && publishedAt <= now()]) > 0]
    { "slug": slug.current }
`);
