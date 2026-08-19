/**
 * WhatsApp click-to-chat handoff.
 *
 * This site has no server-side messaging: every enquiry leaves the browser as a
 * user-initiated `wa.me` deep link with a prefilled message. That is deliberate
 * — the WhatsApp Business Platform would need Meta credentials, a webhook and a
 * backend to send a message the visitor can already send themselves in one tap.
 *
 * Everything here is pure and side-effect free so the message format can be
 * reasoned about (and tested) without a DOM. Components import these helpers;
 * nothing builds a wa.me URL by hand.
 */

/** Longest a WhatsApp prefill can be before clients start truncating it. */
const MAX_MESSAGE_LENGTH = 1800;

/**
 * Strip everything that isn't a digit, and drop a leading international access
 * prefix. A configured number may be written "+1 (305) 555-0198" or
 * "0044 7700 900123"; wa.me accepts neither — it wants bare digits in full
 * international format.
 */
export function normalizeWhatsappNumber(raw: string): string {
  const digits = (raw ?? "").replace(/\D/g, "");
  // "00" is the ITU international access code, not part of the number.
  return digits.startsWith("00") ? digits.slice(2) : digits;
}

/**
 * E.164 allows 15 digits including the country code; the shortest real
 * national numbers with a country code land around 8. Anything outside that is
 * a misconfigured environment variable, not a phone number.
 */
export function isValidWhatsappNumber(raw: string): boolean {
  const digits = normalizeWhatsappNumber(raw);
  return digits.length >= 8 && digits.length <= 15;
}

/**
 * Build a click-to-chat URL. Returns "" when the number is missing or invalid,
 * so callers disable the CTA rather than opening a dead chat with a made-up
 * recipient.
 */
export function buildWhatsappUrl(message: string, rawNumber: string): string {
  if (!isValidWhatsappNumber(rawNumber)) return "";
  const digits = normalizeWhatsappNumber(rawNumber);
  // Encoded once, as a whole, so newlines survive as %0A.
  return `https://wa.me/${digits}?text=${encodeURIComponent(trimMessage(message))}`;
}

/** Keep the prefill inside what WhatsApp clients reliably carry. */
function trimMessage(message: string): string {
  if (message.length <= MAX_MESSAGE_LENGTH) return message;
  return `${message.slice(0, MAX_MESSAGE_LENGTH - 1).trimEnd()}…`;
}

// ── Contact-page enquiry ────────────────────────────────────────────────────

export type EnquiryTopic =
  | "New quote & free mockup"
  | "Existing order"
  | "Warranty claim"
  | "Trade, bulk & reseller"
  | "Something else";

export type ContactEnquiry = {
  topic: EnquiryTopic;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  /** Quote-shaping fields. Absent for order/warranty enquiries. */
  signType?: string;
  size?: string;
  quantity?: string;
  usageLocation?: string;
  budget?: string;
  timeline?: string;
  /** Order/warranty enquiries only. */
  orderNumber?: string;
  message: string;
};

type MessageLine = [label: string, value: string | undefined];

/** Drop blank rows so the message never shows "Budget: undefined". */
function section(title: string, lines: MessageLine[]): string[] {
  const filled = lines
    .filter((line): line is [string, string] => Boolean(line[1]?.trim()))
    .map(([label, value]) => `• ${label}: ${value.trim()}`);

  return filled.length > 0 ? [title, ...filled, ""] : [];
}

/**
 * Turn a completed contact form into the message body the visitor sends.
 *
 * Pure: same input, same string. The contact form renders this straight back to
 * the visitor as a preview before anything opens, so what they read here is
 * exactly what lands in the chat.
 */
export function buildContactMessage(enquiry: ContactEnquiry): string {
  const lines: string[] = [
    "Hello The Glownique! I'm getting in touch via your contact page.",
    "",
    `📌 Enquiry: ${enquiry.topic}`,
    "",
    ...section("👤 My details", [
      ["Name", enquiry.fullName],
      ["Email", enquiry.email],
      ["Phone", enquiry.phone],
      ["Country", enquiry.country],
    ]),
    ...section("✨ Sign details", [
      ["Sign type", enquiry.signType],
      ["Size", enquiry.size],
      ["Quantity", enquiry.quantity],
      ["Where it goes", enquiry.usageLocation],
      ["Working budget", enquiry.budget],
      ["Timeline", enquiry.timeline],
    ]),
    ...section("📦 Order reference", [["Order number", enquiry.orderNumber]]),
    ...section("📝 What I need", [["Details", enquiry.message]]),
    "Thanks — I'll attach any artwork or photos here in the chat.",
  ];

  // Collapse the runs of blank lines the omitted sections leave behind.
  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
