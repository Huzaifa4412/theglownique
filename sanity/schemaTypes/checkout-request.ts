import { defineField, defineType } from "sanity";

export const checkoutRequest = defineType({
  name: "checkoutRequest",
  title: "Checkout request",
  type: "document",
  fields: [
    defineField({
      name: "reference",
      title: "Reference",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Delivery status",
      type: "string",
      readOnly: true,
      options: {
        list: [
          {
            title: "Email delivery pending — needs attention",
            value: "pending_email",
          },
          { title: "Request received — emails sent", value: "received" },
        ],
      },
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "internalNotes",
      title: "Internal notes",
      type: "text",
    }),
    defineField({
      name: "payload",
      title: "Customer request",
      type: "object",
      readOnly: true,
      fields: [
        defineField({ name: "consent", type: "boolean" }),
        defineField({ name: "submissionId", type: "string" }),
        defineField({
          name: "customer",
          type: "object",
          fields: [
            ...[
              "name",
              "email",
              "phone",
              "country",
              "city",
              "postalCode",
              "budget",
              "timeline",
            ].map((name) => defineField({ name, type: "string" })),
            defineField({ name: "notes", type: "text" }),
          ],
        }),
        defineField({
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                ...[
                  "id",
                  "signType",
                  "color",
                  "size",
                  "signText",
                  "usageLocation",
                  "details",
                ].map((name) => defineField({ name, type: "string" })),
                defineField({ name: "productId", type: "number" }),
                defineField({ name: "quantity", type: "number" }),
              ],
              preview: { select: { title: "signType", subtitle: "size" } },
            },
          ],
        }),
      ],
    }),
    defineField({ name: "ownerEmailId", type: "string", readOnly: true }),
    defineField({ name: "customerEmailId", type: "string", readOnly: true }),
    defineField({
      name: "payloadHash",
      type: "string",
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: { title: "reference", subtitle: "payload.customer.name" },
  },
  orderings: [
    {
      title: "Newest first",
      name: "newest",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
});
