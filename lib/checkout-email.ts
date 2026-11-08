import { Resend } from "resend";
import { cartProduct, type CheckoutPayload } from "@/lib/cart";
import { SITE_URL, ETSY_SHOP_URL } from "@/lib/site";

export function checkoutConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
    process.env.RESEND_FROM_EMAIL &&
    process.env.CHECKOUT_OWNER_EMAIL,
  );
}
export function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}
export function checkoutEmail(
  payload: CheckoutPayload,
  reference: string,
  owner: boolean,
) {
  const { customer, items } = payload;
  const lines = items.map((item) => {
    const product = cartProduct(item);
    return `${product.name} × ${item.quantity}\n${item.signType}\nColour: ${item.color}\nSize: ${item.size}\nUse: ${item.usageLocation}\nText / idea: ${item.signText || "Same as reference design"}\nDesign details: ${item.details || "None"}`;
  });
  const delivery = [
    `Name: ${customer.name}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone || "Not supplied"}`,
    `Delivery: ${customer.city}, ${customer.country}`,
    `Postal code: ${customer.postalCode || "Not supplied"}`,
    `Budget: ${customer.budget || "Not specified"}`,
    `Timeline: ${customer.timeline || "Not specified"}`,
    `Notes: ${customer.notes || "None"}`,
  ].join("\n");
  const heading = owner
    ? "New custom sign quote request"
    : "Your design request is with us";
  const next = owner
    ? "Review these designs and reply to the customer with a quote and next steps."
    : "Our team will review your designs and follow up with a custom quote and next steps. Reply to this email to share artwork or ask a question.";
  const text = `${heading}\nReference: ${reference}\n\n${lines.join("\n\n")}\n\n${delivery}\n\n${next}\nContinue on Etsy: ${ETSY_SHOP_URL}\nPlease include your request reference in your Etsy message so we can match your designs.\nThis is a quote request, not a paid order. No payment has been taken.\nThe Glownique — ${SITE_URL}`;
  const cards = items
    .map((item) => {
      const product = cartProduct(item);
      const image = product.image
        ? `<img src="${escapeHtml(SITE_URL + product.image)}" alt="${escapeHtml(product.name)}" width="120" style="display:block;border-radius:10px;margin-bottom:12px;max-width:100%" />`
        : "";
      return `<div style="border-top:1px solid #e8dce1;padding:20px 0">${image}<h2 style="font-size:18px;margin:0 0 12px">${escapeHtml(product.name)} × ${item.quantity}</h2><div style="white-space:pre-wrap;line-height:1.8">${escapeHtml(`${item.signType}\nColour: ${item.color}\nSize: ${item.size}\nUse: ${item.usageLocation}\nText / idea: ${item.signText || "Same as reference design"}\nDesign details: ${item.details || "None"}`)}</div></div>`;
    })
    .join("");
  const html = `<!doctype html><html lang="en"><body style="margin:0;background:#fff5f8;font-family:Arial,sans-serif;color:#241c24"><div style="max-width:600px;margin:24px auto;padding:32px;background:#fff;border-radius:16px"><p style="color:#a30542;letter-spacing:2px;font-size:12px;font-weight:bold">THE GLOWNIQUE</p><h1 style="font-size:28px;line-height:1.2">${heading}</h1><p>Reference: <strong>${escapeHtml(reference)}</strong></p>${cards}<h2 style="font-size:18px">Contact &amp; delivery</h2><p style="white-space:pre-wrap;line-height:1.8">${escapeHtml(delivery)}</p><p style="line-height:1.8">${next}</p><p><a href="${escapeHtml(ETSY_SHOP_URL)}" style="display:inline-block;padding:14px 22px;background:#a30542;color:#fff;border-radius:8px;text-decoration:none">Continue on Etsy</a></p><p style="font-size:13px;line-height:1.7">Include your request reference in your Etsy message so we can match your designs.</p><p style="font-size:12px;color:#655960">This is a quote request, not a paid order. No payment has been taken.</p><a href="${SITE_URL}" style="color:#a30542">theglownique.com</a></div></body></html>`;
  return {
    text,
    html,
    subject: owner
      ? `New quote request ${reference} | The Glownique`
      : `Your design request ${reference} | The Glownique`,
  };
}

export async function sendCheckoutEmail(
  payload: CheckoutPayload,
  reference: string,
  recipient: "owner" | "customer",
) {
  if (!checkoutConfigured())
    throw new Error("Email checkout is not configured");
  const owner = recipient === "owner";
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = await resend.emails.send(
    {
      from: process.env.RESEND_FROM_EMAIL!,
      to: owner ? process.env.CHECKOUT_OWNER_EMAIL! : payload.customer.email,
      replyTo: owner
        ? payload.customer.email
        : process.env.CHECKOUT_REPLY_TO_EMAIL ||
          process.env.CHECKOUT_OWNER_EMAIL!,
      ...checkoutEmail(payload, reference, owner),
      tags: [
        { name: "source", value: "website-checkout" },
        { name: "recipient", value: recipient },
      ],
    },
    { idempotencyKey: `checkout/${payload.submissionId}/${recipient}` },
  );
  if (result.error || !result.data?.id)
    throw new Error(`Resend ${recipient} email failed`);
  return result.data.id;
}
