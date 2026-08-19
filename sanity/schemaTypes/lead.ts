import { defineField, defineType } from "sanity";

/**
 * A captured enquiry.
 *
 * Every form on the site that collects contact details writes one of these, so
 * there is a single place to work leads from regardless of which form produced
 * them. Written server-side only (app/api/leads/route.ts) — the browser never
 * holds a Sanity write token.
 *
 * The captured fields are read-only in the Studio on purpose. This document is
 * evidence of what a customer actually told us, and an editable record of that
 * is worth much less: if the phone number is wrong, the useful action is to ask
 * them, not to quietly rewrite history. `status` and `internalNotes` are the two
 * fields the team is meant to change.
 */
export const lead = defineType({
  name: "lead",
  title: "Lead",
  type: "document",
  // Read-only capture + editable workflow, so the groups keep the two apart.
  groups: [
    { name: "workflow", title: "Follow-up", default: true },
    { name: "contact", title: "Contact details" },
    { name: "enquiry", title: "What they asked for" },
    { name: "meta", title: "Where it came from" },
  ],
  fields: [
    // ── Follow-up ───────────────────────────────────────────────────────────
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "workflow",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Quoted", value: "quoted" },
          { title: "Won", value: "won" },
          { title: "Lost", value: "lost" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes",
      type: "text",
      rows: 4,
      group: "workflow",
      description:
        "Not visible to the customer. Record what was quoted, what they said, what to chase.",
    }),

    // ── Contact details ─────────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "contact",
      readOnly: true,
      description:
        "Absent for newsletter signups, which only ask for an email address.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contact",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone / WhatsApp",
      type: "string",
      group: "contact",
      readOnly: true,
    }),
    defineField({
      name: "country",
      title: "Delivery country",
      type: "string",
      group: "contact",
      readOnly: true,
    }),

    // ── What they asked for ─────────────────────────────────────────────────
    defineField({
      name: "topic",
      title: "Enquiry type",
      type: "string",
      group: "enquiry",
      readOnly: true,
      description:
        "Quote, existing order, warranty claim, trade, or a live-chat start.",
    }),
    defineField({
      name: "message",
      title: "Their message",
      type: "text",
      rows: 5,
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "signType",
      title: "Sign type",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "size",
      title: "Approximate size",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "quantity",
      title: "Quantity",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "usageLocation",
      title: "Indoor / outdoor",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "budget",
      title: "Working budget",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "timeline",
      title: "Timeline",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),
    defineField({
      name: "orderNumber",
      title: "Etsy order number",
      type: "string",
      group: "enquiry",
      readOnly: true,
    }),

    // ── Provenance ──────────────────────────────────────────────────────────
    defineField({
      name: "source",
      title: "Source form",
      type: "string",
      group: "meta",
      readOnly: true,
      options: {
        list: [
          { title: "Contact page form", value: "contact-form" },
          { title: "Live chat pre-chat form", value: "pre-chat" },
          { title: "Newsletter signup", value: "newsletter" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pagePath",
      title: "Page it was sent from",
      type: "string",
      group: "meta",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted",
      type: "datetime",
      group: "meta",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "consent",
      title: "Consent given",
      type: "boolean",
      group: "meta",
      readOnly: true,
      description:
        "The visitor ticked the consent box before submitting. Kept as a record that they did.",
    }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [
        { field: "status", direction: "asc" },
        { field: "submittedAt", direction: "desc" },
      ],
    },
  ],

  preview: {
    select: {
      title: "name",
      email: "email",
      status: "status",
      source: "source",
      submittedAt: "submittedAt",
    },
    prepare({ title, email, status, source, submittedAt }) {
      const when = submittedAt
        ? new Date(submittedAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })
        : "";
      const channel =
        source === "pre-chat"
          ? "chat"
          : source === "newsletter"
            ? "newsletter"
            : "contact form";
      return {
        title: title || email || "Unnamed lead",
        subtitle: [status?.toUpperCase(), channel, when]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
