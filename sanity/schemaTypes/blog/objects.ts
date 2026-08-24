import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Building blocks for the blog body.
 *
 * These exist as named objects rather than inline definitions so the Studio
 * shows a real block name in the "Add item" menu, and so the renderer in
 * components/blog/portable-text.tsx can key off a stable `_type`. Renaming any
 * `name` below silently drops that block from every published post — it becomes
 * an unknown type the renderer skips — so treat them as part of the content
 * contract, not as labels.
 */

/** A photo inside the body. Alt text is required because these are content. */
export const blogImage = defineType({
  name: "blogImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "What the image shows, for screen readers and image search. Describe the sign — material, lighting style, where it is mounted — not 'neon sign'.",
      validation: (rule) =>
        rule
          .required()
          .min(8)
          .error("Alt text is required. A body image is content, never decoration."),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description:
        "Shown under the image. Say what the photo PROVES — the material, the size, the install context — not what it is.",
    }),
  ],
  preview: {
    select: { media: "asset", title: "alt", subtitle: "caption" },
  },
});

/**
 * A pulled-out note. Three tones, and the tone is not cosmetic: `warning` is
 * reserved for things that cost money or break a sign if ignored, so it keeps
 * its weight only while it stays rare.
 */
export const blogCallout = defineType({
  name: "blogCallout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      initialValue: "note",
      options: {
        list: [
          { title: "Note — useful context", value: "note" },
          { title: "Tip — do this and it goes better", value: "tip" },
          { title: "Warning — ignore this and it costs you", value: "warning" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "text", tone: "tone" },
    prepare: ({ title, subtitle, tone }) => ({
      title: title || subtitle?.slice(0, 60) || "Callout",
      subtitle: `${String(tone ?? "note").toUpperCase()} callout`,
    }),
  },
});

/**
 * A comparison table.
 *
 * Deliberately a fixed header row plus string cells rather than a rich-text
 * grid: comparison tables are the single most extractable thing on a decision
 * page, and they only stay extractable while every cell is plain text with the
 * same number of columns in every row.
 */
export const blogTable = defineType({
  name: "blogTable",
  title: "Comparison table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "What the table compares. Shown above the table and used as its accessible name.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      title: "Column headings",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(2).max(5),
    }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "row",
          fields: [
            defineField({
              name: "cells",
              title: "Cells",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              validation: (rule) => rule.required().min(2).max(5),
            }),
          ],
          preview: {
            select: { cells: "cells" },
            prepare: ({ cells }) => ({
              title: Array.isArray(cells) ? cells.join("  ·  ") : "Row",
            }),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "note",
      title: "Footnote",
      type: "string",
      description:
        "Scope, units, date or method. Required in spirit whenever a number appears — a figure without its basis is not evidence.",
    }),
  ],
  preview: {
    select: { title: "caption", rows: "rows" },
    prepare: ({ title, rows }) => ({
      title: title || "Comparison table",
      subtitle: `${Array.isArray(rows) ? rows.length : 0} rows`,
    }),
  },
});

/** A pull quote. Attribution is optional but a quote without it carries less. */
export const blogQuote = defineType({
  name: "blogQuote",
  title: "Pull quote",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "attribution", title: "Who said it", type: "string" }),
  ],
  preview: {
    select: { title: "text", subtitle: "attribution" },
  },
});

/**
 * An inline conversion block.
 *
 * `href` is a plain path so a post can point at the page that actually answers
 * the reader's next question — a product, a guide, the contact form. Leave it
 * empty to fall back to the WhatsApp quote flow, which is the site's primary
 * conversion action.
 */
export const blogCta = defineType({
  name: "blogCta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "text", title: "Supporting line", type: "text", rows: 2 }),
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      description: "Say what happens next — 'Get a free mockup', not 'Learn more'.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Destination",
      type: "string",
      description:
        "A path on this site, e.g. /business-signs/channel-letter-signs. Leave empty to open a WhatsApp quote instead.",
      validation: (rule) =>
        rule.custom((value) =>
          !value || value.startsWith("/")
            ? true
            : "Use a path starting with / — external CTAs belong in body links, not in the conversion block.",
        ),
    }),
  ],
  preview: {
    select: { title: "heading", subtitle: "label" },
  },
});

/**
 * The body itself.
 *
 * H1 is absent from `styles` on purpose: the page renders the post title as the
 * only H1, and a second one in the body breaks the document outline that both
 * screen readers and extractive search rely on.
 */
export const blogBody = defineType({
  name: "blogBody",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Section heading (H2)", value: "h2" },
        { title: "Sub-heading (H3)", value: "h3" },
        { title: "Minor heading (H4)", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bulleted", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL or path",
                type: "string",
                description:
                  "A path like /guides/custom-business-sign-cost for internal links, or a full https:// URL for a source.",
                validation: (rule) =>
                  rule
                    .required()
                    .custom((value) =>
                      typeof value === "string" &&
                      (value.startsWith("/") || value.startsWith("https://") || value.startsWith("mailto:"))
                        ? true
                        : "Use a / path, an https:// URL or a mailto: address.",
                    ),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "blogImage" }),
    defineArrayMember({ type: "blogCallout" }),
    defineArrayMember({ type: "blogTable" }),
    defineArrayMember({ type: "blogQuote" }),
    defineArrayMember({ type: "blogCta" }),
  ],
});
