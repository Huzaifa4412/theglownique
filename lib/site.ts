// Central site config. Update WHATSAPP_NUMBER and SITE_URL to your real values.
export const WHATSAPP_NUMBER = "15551234567";
export const SITE_URL = "https://www.theglownique.com";

/** Build a WhatsApp quote link with a product-specific prefilled message. */
export function whatsappQuoteUrl(productName: string): string {
  const message = `Hi The Glownique! I'd like a free quote and mockup for a ${productName}. Here's my idea: `;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
