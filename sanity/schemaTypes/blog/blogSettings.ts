import { defineField, defineType } from "sanity";

/**
 * Editable copy for the /blog hub — a singleton, pinned in the Studio structure
 * so nobody can create a second one and wonder which is live.
 *
 * The hub needs its own words for the same reason the category archives do: a
 * hub page whose entire content is a grid of cards it shares with five other
 * pages has nothing of its own to rank with, and nothing to tell a first-time
 * reader what this section is FOR. `intro` is required, and `positioning` is
 * the editorial guard rail rendered nowhere — it exists so the next person to
 * open this document reads what the blog is allowed to cover before they add a
 * post that should have been a guide.
 */
export const blogSettings = defineType({
  name: "blogSettings",
  title: "Blog hub",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "The Glownique Journal",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "heading",
      title: "Heading (H1)",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required().min(100).max(500),
    }),
    defineField({
      name: "seoTitle",
      title: "Search title",
      type: "string",
      validation: (rule) => rule.required().max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(70).max(165),
    }),
    defineField({
      name: "newsletterHeading",
      title: "Newsletter heading",
      type: "string",
      initialValue: "New sign ideas, once a month",
    }),
    defineField({
      name: "newsletterText",
      title: "Newsletter supporting line",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "positioning",
      title: "What this blog is for (internal note)",
      type: "text",
      rows: 6,
      description:
        "Never rendered. Read it before adding a post: /blog owns ideas, colour, care, trends and behind-the-build. /guides owns cost, comparisons, sizing and installation. /business-signs owns commercial intent. A post that would answer a buying question belongs in /guides.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Blog hub settings" }),
  },
});
