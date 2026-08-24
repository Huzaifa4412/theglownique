import { defineField, defineType } from "sanity";

/**
 * A named human who wrote or reviewed a post.
 *
 * This document exists because of the page quality contract in
 * SEO-Optimization/08-content-aeo-geo-aio-plan.md: every published page must
 * "show author/reviewer identity, relevant experience, publish/modified dates
 * and sources". A byline that reads "The Glownique Team" satisfies none of
 * that, so `role` and `expertise` are required — if nobody can say what makes
 * this person qualified to write about channel-letter mounting, the post does
 * not have an author yet.
 */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Job title as it appears in the byline, e.g. 'Production lead, illuminated signage'.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "expertise",
      title: "Why they are qualified",
      type: "text",
      rows: 3,
      description:
        "One or two sentences of real, checkable experience. Years on the floor, categories built, projects shipped. This is rendered on every post they sign.",
      validation: (rule) => rule.required().min(40),
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Leave empty — the photo sits beside the name, so it is decorative.",
        }),
      ],
    }),
    defineField({
      name: "links",
      title: "Profiles",
      type: "array",
      description: "Only real, public profiles. These become sameAs entries on the author's Person schema.",
      of: [
        {
          type: "object",
          name: "profile",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (r) => r.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image" },
  },
});
