// Central site config.
//
// WHATSAPP_NUMBER comes from the environment so a placeholder can never ship
// again. Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local and in the Vercel
// project settings — digits only, full international format, no "+" or spaces
// (e.g. 447700900123).
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const SITE_URL = "https://www.theglownique.com";

/**
 * Flip to true only when `testimonials` in lib/store-data.ts holds real,
 * attributable reviews (e.g. exported from the Etsy shop). Publishing invented
 * testimonials, star ratings or review counts breaches Google's spam policies
 * and the FTC's fake-review rule (16 CFR Part 465), and E-E-A-T is the exact
 * signal this niche is ranked on — it isn't worth faking.
 */
export const HAS_VERIFIED_REVIEWS = false;

/** True when a usable WhatsApp number is configured. */
export const HAS_WHATSAPP = WHATSAPP_NUMBER.length > 0;

/** Build a WhatsApp quote link with a product-specific prefilled message. */
export function whatsappQuoteUrl(productName: string): string {
  const message = `Hi The Glownique! I'd like a free quote and mockup for a ${productName}. Here's my idea: `;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
