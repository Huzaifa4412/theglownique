import { defineField, defineType } from "sanity";

/**
 * A click on an outbound conversion link — WhatsApp or Etsy.
 *
 * These are the two ways a visitor leaves this site in order to buy something,
 * so they are the two things worth counting. They share one document type
 * rather than two because every field except `channel` is identical, and
 * because the question people actually ask is comparative: did the WhatsApp
 * button or the Etsy button get used on this page.
 *
 * ── What this is, and what it is NOT ────────────────────────────────────────
 *
 * It records that somebody opened WhatsApp or Etsy. It does NOT record that
 * they messaged us or bought anything, and it cannot: once the visitor leaves,
 * this site sees nothing further. WhatsApp holds the only real conversation and
 * Etsy holds the only real order.
 *
 * That distinction is why this is separate from `lead`. A lead is somebody who
 * gave us their details and expects an answer. A click is a signal — useful for
 * "which CTA works", worthless as a to-do list. Mixing them would bury real
 * enquiries under dozens of non-actionable rows and make the lead count look
 * several times better than it is.
 *
 * ── What is deliberately not stored ─────────────────────────────────────────
 *
 * No cookie, no visitor id, no IP address, no full URL. The privacy policy
 * promises no profiling, and this stays inside that promise: every field below
 * is aggregate marketing measurement that cannot be tied back to a person.
 * Repeat clicks in one page session are suppressed in the browser rather than
 * deduplicated here, precisely so no identifier has to exist to do it.
 *
 * If you ever add a field that could identify somebody, it has to go into
 * SITE_MEASUREMENT in lib/claims.ts and onto /privacy in the same release —
 * the same rule the third-party tools follow.
 *
 * ── Reading the numbers ─────────────────────────────────────────────────────
 *
 * The Studio panes are fine for browsing. For counts, paste these into Vision
 * (the GROQ playground in the Studio sidebar):
 *
 *   // Totals by channel, last 30 days
 *   {
 *     "whatsapp": count(*[_type == "outboundClick" && channel == "whatsapp"
 *       && occurredAt > dateTime(now()) - 60*60*24*30]),
 *     "etsy": count(*[_type == "outboundClick" && channel == "etsy"
 *       && occurredAt > dateTime(now()) - 60*60*24*30])
 *   }
 *
 *   // Which CTA, last 30 days
 *   *[_type == "outboundClick" && occurredAt > dateTime(now()) - 60*60*24*30]
 *     { channel, source, pagePath, occurredAt } | order(occurredAt desc)
 *
 *   // Clicks against leads for the same period — the closest thing to a
 *   // conversion rate this site can honestly produce
 *   {
 *     "clicks": count(*[_type == "outboundClick"
 *       && occurredAt > dateTime(now()) - 60*60*24*30]),
 *     "leads": count(*[_type == "lead"
 *       && submittedAt > dateTime(now()) - 60*60*24*30])
 *   }
 */
export const outboundClick = defineType({
  name: "outboundClick",
  title: "Outbound click",
  type: "document",
  // Everything is captured, nothing is edited. This is evidence of what
  // happened, and an editable record of that is worth much less — the same
  // reasoning as the read-only capture fields on `lead`.
  fields: [
    defineField({
      name: "channel",
      title: "Channel",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Etsy", value: "etsy" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "occurredAt",
      title: "When",
      type: "datetime",
      readOnly: true,
      description: "Stamped on the server, not by the browser clock.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Which CTA",
      type: "string",
      readOnly: true,
      description:
        'The `data-meta-source` on the link that was clicked — e.g. "floating-whatsapp-button", "product-hero-cta". "unlabelled-link" means a link was added without one; worth fixing when you see it.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pagePath",
      title: "Page",
      type: "string",
      readOnly: true,
      description: "Path only — never the query string, which can carry personal data.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "device",
      title: "Device",
      type: "string",
      readOnly: true,
      options: {
        list: [
          { title: "Mobile", value: "mobile" },
          { title: "Desktop", value: "desktop" },
        ],
      },
      description:
        "Worth watching separately: on mobile a WhatsApp link opens the app, on desktop it opens WhatsApp Web and drops off far more often.",
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      readOnly: true,
      description: "Two-letter code from the CDN edge. Country only — never a city or an IP.",
    }),
    defineField({
      name: "referrerHost",
      title: "Came from",
      type: "string",
      readOnly: true,
      description: 'Hostname of the referring site only — "google.com", not the full URL.',
    }),
    defineField({ name: "utmSource", title: "utm_source", type: "string", readOnly: true }),
    defineField({ name: "utmMedium", title: "utm_medium", type: "string", readOnly: true }),
    defineField({ name: "utmCampaign", title: "utm_campaign", type: "string", readOnly: true }),
  ],

  orderings: [
    {
      title: "Newest first",
      name: "occurredAtDesc",
      by: [{ field: "occurredAt", direction: "desc" }],
    },
    {
      title: "By CTA",
      name: "sourceAsc",
      by: [
        { field: "source", direction: "asc" },
        { field: "occurredAt", direction: "desc" },
      ],
    },
    {
      title: "By page",
      name: "pageAsc",
      by: [
        { field: "pagePath", direction: "asc" },
        { field: "occurredAt", direction: "desc" },
      ],
    },
  ],

  preview: {
    select: {
      channel: "channel",
      source: "source",
      pagePath: "pagePath",
      occurredAt: "occurredAt",
      device: "device",
      country: "country",
    },
    prepare({ channel, source, pagePath, occurredAt, device, country }) {
      const when = occurredAt
        ? new Date(occurredAt).toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "";
      const label = channel === "etsy" ? "Etsy" : "WhatsApp";
      return {
        title: `${label} · ${source || "click"}`,
        subtitle: [pagePath, when, device, country].filter(Boolean).join(" · "),
      };
    },
  },
});
