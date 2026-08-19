// Central site config.
//
// WHATSAPP_NUMBER comes from the environment so a placeholder can never ship
// again. Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local and in the Vercel
// project settings — digits only, full international format, no "+" or spaces
// (e.g. 447700900123).
import {
  buildWhatsappUrl,
  isValidWhatsappNumber,
  normalizeWhatsappNumber,
} from "@/lib/whatsapp";

export const WHATSAPP_NUMBER = normalizeWhatsappNumber(
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
);

export const SITE_URL = "https://www.theglownique.com";

/**
 * True as of 2026-08-05: `testimonials` in lib/store-data.ts now holds real
 * reviews transcribed verbatim from the public Etsy shop.
 *
 * Only keep this true while every entry is a genuine, attributable review.
 * Publishing invented testimonials or review counts breaches Google's spam
 * policies and the FTC's fake-review rule (16 CFR Part 465).
 */
export const HAS_VERIFIED_REVIEWS = true;

/**
 * True when a usable WhatsApp number is configured.
 *
 * Length-checked, not merely non-empty: a truncated or half-pasted value in the
 * environment would otherwise enable every CTA on the site and send visitors to
 * a chat with a stranger.
 */
export const HAS_WHATSAPP = isValidWhatsappNumber(WHATSAPP_NUMBER);

/**
 * Etsy shop URL. Every payment already runs through Etsy and it holds the only
 * real reviews this brand has, so linking it is both a trust signal and the
 * cheapest external authority available. Set it and the footer/contact page
 * pick it up. "" hides the link rather than shipping a dead one.
 */
// Canonical shop URL — the tracking params from a copied browser URL
// (?ref=shop_profile&listing_id=…) are deliberately stripped so the link and
// the Organization.sameAs entry stay stable and canonical.
export const ETSY_SHOP_URL = "https://www.etsy.com/listing/1878290703/custom-neon-sign-led-light-for-wedding";

/**
 * Public social profiles. ONLY add profiles that actually exist — each entry
 * renders a real link in the footer and should also be mirrored into
 * Organization.sameAs (see app/layout.tsx), which is the strongest available
 * signal for disambiguating this brand from the unrelated "Glownique" tanning
 * salon that currently dominates the name in Google's entity graph.
 *
 * `icon` must match a key in components/storefront/store-icon.tsx.
 */
export const SOCIAL_LINKS: ReadonlyArray<{
  label: string;
  url: string;
  icon: "InstagramLogo" | "TiktokLogo" | "PinterestLogo" | "FacebookLogo" | "Storefront";
}> = [
  { label: "Instagram", url: "https://www.instagram.com/theglownique/", icon: "InstagramLogo" },
  {
    label: "Facebook",
    url: "https://www.facebook.com/people/TheGlownique/61578567176081/",
    icon: "FacebookLogo",
  },
  { label: "Etsy shop", url: ETSY_SHOP_URL, icon: "Storefront" },
  // TikTok and Pinterest omitted — no profiles exist yet. Add them here when
  // they do; Pinterest is worth prioritising for neon/decor search intent.
];

/**
 * Every off-site profile we own, for Organization.sameAs. Deduplicated, since
 * the Etsy shop appears both as its own constant and as a SOCIAL_LINKS entry.
 */
export function sameAsUrls(): string[] {
  return [...new Set([...SOCIAL_LINKS.map((s) => s.url), ETSY_SHOP_URL])].filter(Boolean);
}

/**
 * Build a WhatsApp quote link with a product-specific prefilled message.
 *
 * Returns "" when no valid number is configured — callers must treat that as
 * "hide or disable this CTA", never as a link to render.
 */
export function whatsappQuoteUrl(productName: string): string {
  const message = `Hi The Glownique! I'd like a free quote and mockup for a ${productName}. Here's my idea: `;
  return buildWhatsappUrl(message, WHATSAPP_NUMBER);
}

/** Format raw international number string into a clean display phone number. */
export function formatWhatsappDisplayNumber(num: string = WHATSAPP_NUMBER): string {
  if (!num) return "";
  if (num.length === 11 && num.startsWith("1")) {
    return `+1 (${num.slice(1, 4)}) ${num.slice(4, 7)}-${num.slice(7, 11)}`;
  }
  return `+${num}`;
}
