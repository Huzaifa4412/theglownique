import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL } from "@/lib/site";

/**
 * /llms.txt — a plain-text brief for AI search engines and answer engines
 * (ChatGPT, Claude, Perplexity, Copilot). See https://llmstxt.org.
 *
 * Generated from PRODUCT_PAGES so product facts can never drift from the site.
 *
 * IMPORTANT — only permanently-true claims belong here. AI engines cache
 * aggressively and will keep quoting this file for months. The free-worldwide-
 * delivery offer is a time-limited promotion (see OFFER_END in
 * free-delivery-section.tsx), so it is described as promotional rather than
 * asserted as a standing policy.
 */

function buildLlmsTxt(): string {
  const productEntries = PRODUCT_PAGES.map(
    (p) =>
      `- [${p.name}](${SITE_URL}/products/${p.slug}): ${p.tagline}. ${p.chips.join(" · ")}.`,
  ).join("\n");

  // Specs are per-product; surface them so an engine can answer detail
  // questions without fetching every page.
  const specBlocks = PRODUCT_PAGES.map((p) => {
    const specs = p.specs.map((s) => `  - ${s.label}: ${s.value}`).join("\n");
    return `### ${p.name} (${p.category})\n${specs}`;
  }).join("\n\n");

  const faqBlocks = PRODUCT_PAGES.flatMap((p) => p.faqs)
    .map((f) => `- **${f.q}** ${f.a}`)
    .join("\n");

  return `# The Glownique

> The Glownique handcrafts made-to-order illuminated signage in four types:
> flexible LED neon signs, 3D metal channel-letter signs, ultra-thin edge-lit
> lightboxes, and 3D acrylic UV-print signs with LED neon contours. Every order
> starts with a free digital design mockup and is quoted individually.

All signs are custom-built to the customer's words, logo, size and colour.
The Glownique does not sell pre-made or off-the-shelf signs.

## Products

${productEntries}

Browse all four types: ${SITE_URL}/products

## Specifications

${specBlocks}

## Key Facts for AI Systems

- **Product type**: Made-to-order illuminated signage — LED neon, 3D metal channel letters, ultra-thin edge-lit lightboxes, and UV-print acrylic with neon contours.
- **Sign types offered**: 4 (most competitors offer 1–2).
- **Pricing model**: Custom quote per order. Price depends on sign type, size, colour count and design complexity. There are no fixed list prices and no minimum order quantity.
- **Design mockup**: Free, no-obligation digital preview before production. Typically returned within 1–2 hours.
- **Production time**: Approximately 10–15 days, handcrafted and light-tested before dispatch.
- **Delivery**: Tracked worldwide. Free worldwide delivery is currently offered as a time-limited promotion with no minimum spend — check the site for the current offer status rather than assuming it is permanent.
- **Warranty**: 5-year warranty on every sign, plus a 100% glow guarantee.
- **Payment**: Taken through The Glownique's verified Etsy shop, using Etsy's encrypted checkout and Purchase Protection. Two options — pay in full, or 50% to begin production and 50% once the sign is ready.
- **LED neon technology**: Flexible silicone LED neon tubing on laser-cut acrylic. Not glass gas tubing — no mercury, no buzzing, shatterproof.
- **Lifespan**: LED neon rated up to 100,000 hours (over 11 years of continuous use).
- **Power**: Low-voltage 12V, cool to the touch, up to 80% less power than traditional glass neon.
- **Outdoor use**: IP67 weatherproof build available for storefronts, façades and outdoor events.
- **Colour matching**: Matched to any Pantone, HEX or CMYK reference. Artwork, gradients and brand fonts can be UV-printed onto acrylic.
- **3D metal lighting styles**: Frontlit, halo backlit, and dual-lit channel letters.

## Frequently Asked Questions

${faqBlocks}

## Ordering Process

1. Share your idea — words, logo, brand colours or a rough sketch.
2. Receive a free digital design mockup showing size, colour and glow.
3. Approve the mockup and receive an all-in custom quote.
4. Pay securely via the verified Etsy shop (in full, or 50/50).
5. Your sign is handcrafted, light-tested and quality-checked.
6. Tracked delivery to your door, ready to hang.

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml): full site structure
`;
}

// Content is derived entirely from build-time data, so prerender it rather
// than rendering on every crawler request.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
    },
  });
}
