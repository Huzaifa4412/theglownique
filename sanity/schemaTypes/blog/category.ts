import { defineField, defineType } from "sanity";

/**
 * A blog category.
 *
 * Each one gets its own indexable archive at /blog/category/{slug}, which is
 * the reason `description` and `intro` are required rather than optional: an
 * archive whose only content is a list of cards it shares with /blog is a
 * near-duplicate, and the cannibalization controls in
 * SEO-Optimization/06-information-architecture.md exist to stop exactly that.
 * The intro is what makes the archive its own page.
 *
 * Categories are also the guard rail against colliding with /guides. A category
 * should describe an AWARENESS or CARE topic — ideas, colour, maintenance,
 * trends. The moment a category starts meaning "how to choose and what it
 * costs", the content belongs in /guides instead.
 */
export const category = defineType({
  name: "category",
  title: "Blog category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Card description",
      type: "text",
      rows: 2,
      description: "One line, shown on the category chip row and in the archive's meta description.",
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "intro",
      title: "Archive intro",
      type: "text",
      rows: 4,
      description:
        "Two or three sentences that only make sense on this archive. This is what stops /blog/category/{slug} being a duplicate of /blog.",
      validation: (rule) => rule.required().min(80),
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first in the filter row.",
      initialValue: 50,
    }),
  ],
  orderings: [
    { title: "Filter order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
