import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * A blog post.
 *
 * The field list is longer than a default Sanity blog on purpose. Every extra
 * field here is a line item from the page quality contract in
 * SEO-Optimization/08-content-aeo-geo-aio-plan.md, moved from a checklist
 * nobody re-reads into a form that will not let you publish without it:
 *
 * - `summary` answers the central question near the beginning (contract #1);
 * - `author` / `reviewer` / `publishedAt` / `updatedAt` show identity and dates (#4);
 * - `relatedLinks` enforces the internal-link contract from the IA doc — every
 *   indexable page needs a commercial destination AND a decision-support link;
 * - `sources` keeps sourced general guidance distinguishable from our own
 *   claims (#3);
 * - `indexable` exists so a post can be unpublished from search without being
 *   deleted, which is what you actually want when a claim loses its evidence.
 *
 * `readingMinutes` is stored rather than computed at render time so the number
 * on the card matches the number on the post even after the body is edited by
 * someone who forgot to re-check it — and so an editor can override an estimate
 * that a table-heavy post gets wrong.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Byline & dates" },
    { name: "seo", title: "Search" },
    { name: "links", title: "Internal links & sources" },
  ],
  fields: [
    // ── Content ─────────────────────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      description: "The H1. Written for a reader, not for a keyword slot.",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: { source: "title", maxLength: 96 },
      description:
        "Immutable once the post is live. Changing it breaks every link and citation pointing at the old URL.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description:
        "The direct answer, in two or three sentences. Shown under the H1 and used on cards. Someone who reads only this should already have the gist.",
      validation: (rule) => rule.required().min(80).max(400),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required().min(8),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      group: "content",
      to: [{ type: "category" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key takeaways",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "string" })],
      description:
        "Three to five complete sentences a reader could act on without reading the body. Not a table of contents — the headings already do that.",
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blogBody",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      group: "content",
      description:
        "Questions customers actually ask about this topic. These render on the page AND become FAQPage schema, so an answer here must match the page — never add a question the body contradicts.",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "a", title: "Answer", type: "text", rows: 4, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "q", subtitle: "a" } },
        }),
      ],
    }),

    // ── Byline & dates ──────────────────────────────────────────────────────
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "reviewer",
      title: "Reviewed by",
      type: "reference",
      group: "meta",
      to: [{ type: "author" }],
      description:
        "Required in practice for anything touching electrical work, mounting, ratings or price. Optional for inspiration posts.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "datetime",
      group: "meta",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Last materially updated",
      type: "datetime",
      group: "meta",
      description:
        "Only bump this for a change a reader would notice. A typo fix is not a modification date — the same rule the sitemap follows in lib/routes.ts.",
    }),
    defineField({
      name: "readingMinutes",
      title: "Reading time (minutes)",
      type: "number",
      group: "meta",
      validation: (rule) => rule.required().min(1).max(60),
    }),
    defineField({
      name: "featured",
      title: "Feature on the blog hub",
      type: "boolean",
      group: "meta",
      initialValue: false,
      description: "The most recently published featured post takes the hero slot on /blog.",
    }),

    // ── Search ──────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "Search title",
      type: "string",
      group: "seo",
      description:
        "Overrides the title in <title> and Open Graph. The site template appends ' | The Glownique', so leave room for it.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      group: "seo",
      description: "Written to earn the click from the result, not to repeat the title.",
      validation: (rule) => rule.required().min(70).max(165),
    }),
    defineField({
      name: "primaryKeyword",
      title: "Primary keyword",
      type: "string",
      group: "seo",
      description:
        "Planning label only — never rendered. Before you fill this in, check it against SEO-Optimization/05-keyword-and-intent-map.csv: if an existing /guides or /business-signs page already owns this intent, this post needs a different angle, not a second try at the same query.",
    }),
    defineField({
      name: "indexable",
      title: "Allow in search results",
      type: "boolean",
      group: "seo",
      initialValue: true,
      description:
        "Turn off to serve a noindex and drop the post from the sitemap while leaving it published and linkable. Use this when a claim loses its evidence, instead of deleting the post.",
    }),

    // ── Internal links & sources ────────────────────────────────────────────
    defineField({
      name: "relatedLinks",
      title: "Where this post sends people next",
      type: "array",
      group: "links",
      description:
        "The internal-link contract: at least one commercial destination and one decision-support guide. No 'click here' labels.",
      of: [
        defineArrayMember({
          type: "object",
          name: "relatedLink",
          fields: [
            defineField({
              name: "kind",
              title: "Kind",
              type: "string",
              initialValue: "commercial",
              options: {
                list: [
                  { title: "Commercial destination (product / business sign)", value: "commercial" },
                  { title: "Decision support (guide)", value: "guide" },
                  { title: "Proof (project / process)", value: "proof" },
                ],
                layout: "radio",
              },
              validation: (r) => r.required(),
            }),
            defineField({ name: "label", title: "Link text", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "description",
              title: "Why go there",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "Path",
              type: "string",
              validation: (r) =>
                r
                  .required()
                  .custom((value) =>
                    typeof value === "string" && value.startsWith("/")
                      ? true
                      : "Internal paths only — this block is the internal-link contract.",
                  ),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
      validation: (rule) =>
        rule
          .required()
          .min(2)
          .custom((links) => {
            const kinds = new Set((links ?? []).map((l) => (l as { kind?: string }).kind));
            if (!kinds.has("commercial")) return "Add at least one commercial destination.";
            if (!kinds.has("guide")) return "Add at least one decision-support guide link.";
            return true;
          }),
    }),
    defineField({
      name: "relatedPosts",
      title: "Related posts",
      type: "array",
      group: "links",
      description: "Leave empty to fall back to the newest posts in the same category.",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      group: "links",
      description:
        "Anything in the post that is general guidance rather than our own measurement needs a source here. Rendered at the foot of the post.",
      of: [
        defineArrayMember({
          type: "object",
          name: "source",
          fields: [
            defineField({ name: "label", title: "What it supports", type: "string", validation: (r) => r.required() }),
            defineField({ name: "publisher", title: "Publisher", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
            defineField({ name: "accessed", title: "Accessed", type: "date" }),
          ],
          preview: { select: { title: "label", subtitle: "publisher" } },
        }),
      ],
    }),
  ],

  orderings: [
    { title: "Newest first", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Title", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],

  preview: {
    select: {
      title: "title",
      category: "category.title",
      publishedAt: "publishedAt",
      media: "coverImage",
      indexable: "indexable",
      featured: "featured",
    },
    prepare: ({ title, category, publishedAt, media, indexable, featured }) => {
      const when = publishedAt
        ? new Date(publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
        : "unpublished";
      return {
        title,
        media,
        subtitle: [category, when, featured ? "featured" : null, indexable === false ? "NOINDEX" : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
