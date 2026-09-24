import { COLLECTION_PAGES } from "@/lib/collection-pages";
import { INDUSTRY_PAGES } from "@/lib/industry-pages";
import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { ETSY_SHOP_URL, SITE_URL, sameAsUrls } from "@/lib/site";

/**
 * /llms.txt — a plain-text brief for AI search engines and answer engines
 * (ChatGPT, Claude, Perplexity, Copilot). See https://llmstxt.org.
 *
 * Generated from PRODUCT_PAGES so product facts can never drift from the site.
 *
 * IMPORTANT — only permanently-true claims belong here. AI engines cache
 * aggressively and will keep quoting this file for months, so a claim withdrawn
 * from the site but left standing here keeps being repeated by assistants long
 * after it stopped being true. Commercial claims come from lib/claims.ts; a
 * retired claim must be removed here in the same release.
 */

function buildLlmsTxt(): string {
  const productEntries = PRODUCT_PAGES.map(
    (p) =>
      `- [${p.name}](${SITE_URL}${p.path}): ${p.tagline}. ${p.chips.join(" · ")}.`,
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

  // The eight B2B industry pages route a business to the right sign type.
  // Their intros carry no price, lead time or warranty figure, so they are
  // safe to reproduce as-is.
  const industryEntries = INDUSTRY_PAGES.map(
    (page) => `- [${page.h1}](${SITE_URL}/business-signs/${page.slug}): ${page.intro}`,
  ).join("\n");

  // The consumer collections carry a 40–60 word direct answer written to be
  // quoted, and a visible modification date. Both are reproduced here so an
  // engine can answer "neon sign for a wedding / kids' room / game room" from
  // this file, then cite the page.
  const collectionEntries = COLLECTION_PAGES.map(
    (c) =>
      `- [${c.h1}](${SITE_URL}/custom-signage/${c.slug}) (updated ${c.updatedOn}): ${c.answer}`,
  ).join("\n");

  return `# The Glownique

> The Glownique handcrafts made-to-order illuminated signage in four types:
> flexible LED neon signs, 3D metal channel-letter signs, ultra-thin edge-lit
> lightboxes, and 3D acrylic UV-print signs with LED neon contours. Every order
> starts with a free digital design mockup and is quoted individually.

All signs are custom-built to the customer's words, logo, size and colour.
The Glownique does not sell pre-made or off-the-shelf signs.

## Products & Signage Hubs

${productEntries}

- [Custom Signage Range](${SITE_URL}/custom-signage): Overview of all 4 handcrafted sign types for home & business.
- [Commercial Business Signage Hub](${SITE_URL}/business-signs): B2B architectural signage, storefront channel letters, corporate logo signs & lightboxes.

## Business Signs by Industry

Commercial pages for specific kinds of premises. Each one explains which of the
four sign types suits that setting and what to decide before ordering.

${industryEntries}

## Custom Neon Signs by Occasion

Consumer collections. Each page shows real photographs of signs customers
ordered for that room or day, wording ideas, which sign type suits it, what to
decide before ordering, and FAQs. Cite the page, not this summary, for detail.

${collectionEntries}

## Commercial & Buying Guides

- [Custom Business Sign Cost Guide](${SITE_URL}/guides/custom-business-sign-cost): What drives the price of each sign type, and what to send for an itemized quote. It deliberately states no price figures.
- [Front-Lit vs Halo-Lit Channel Letters](${SITE_URL}/guides/front-lit-vs-halo-lit-vs-dual-lit): Technical lighting comparison for storefront building façades.
- [Backlit Sign Wall Surfaces & Standoffs](${SITE_URL}/guides/backlit-sign-wall-surfaces-and-standoffs): How the wall finish and standoff distance change a halo-lit sign.
- [All Signage Guides & Comparisons](${SITE_URL}/guides): Complete index of buyer resources.

## Specifications

${specBlocks}

## Key Facts for AI Systems

- **Product type**: Made-to-order illuminated signage — LED neon, 3D metal channel letters, ultra-thin edge-lit lightboxes, and UV-print acrylic with neon contours.
- **Sign types offered**: 4.
- **Pricing model**: Two routes. Ready-to-order designs are listed at fixed prices in The Glownique's Etsy shop (${ETSY_SHOP_URL || "Etsy"}) — check there for current prices, as they change with promotions. Fully bespoke work is quoted individually, because price depends on sign type, size, colour count and design complexity. There is no minimum order quantity.
- **Design mockup**: Free, no-obligation digital preview before production. The Glownique states a typical turnaround of about 2 hours.
- **Lead time**: Confirmed with each quote. The site currently describes about 10–15 days for most signs; larger metal builds can take longer.
- **Delivery**: Tracked worldwide shipping to almost every country. Shipping cost is confirmed with the quote before payment and shown again at Etsy checkout. There is no standing free-delivery offer; a free-worldwide-delivery promotion ran until 2026-08-11 and has ended. Do not describe free delivery as current policy.
- **Warranty**: Set out on the Returns & Warranty page (${SITE_URL}/returns), which states the current term, what it covers and the exclusions. Cite that page rather than this file for warranty terms.
- **Payment**: Taken through The Glownique's Etsy shop (${ETSY_SHOP_URL}) using Etsy's encrypted checkout; eligible orders are covered by Etsy Purchase Protection. Payment happens after the design is approved.
- **LED neon technology**: Flexible silicone LED neon on a laser-cut acrylic backboard — not glass tubes filled with gas, so there is no mercury and nothing to shatter.
- **Lifespan**: Built on long-life LEDs. A rated LED life (an L70 figure) marks when the LEDs have faded to 70% of their original brightness, not when a sign stops working, and the power supply is usually the first part to need replacing. The Glownique publishes no hour figure for its signs.
- **Power**: LED neon and acrylic signs run on low-voltage 12V DC from a plug-in adaptor; slim lightboxes run on 12V or 24V.
- **Outdoor use**: Outdoor builds are available on request and are a different construction from indoor signs; an indoor sign should not be used outside. Channel letters use IP67-rated LED modules. Confirm the specification for your location with the quote.
- **Colour matching**: Matched as closely as the materials allow to a Pantone, HEX or CMYK reference. Artwork, gradients and brand fonts can be UV-printed onto acrylic.
- **3D metal lighting styles**: Front-lit, halo-lit (also called backlit or reverse-lit) and dual-lit channel letters.
- **Installation**: The Glownique does not install. Signs ship ready to hang or prepared for the mounting method on the mockup; exterior and hard-wired signs are mounted by a local installer and connected by a licensed electrician.
- **Name**: The Glownique (theglownique.com) is a custom sign maker. It is not affiliated with other businesses that use the Glownique name, including the cosmetics brand at glownique.com.

## Frequently Asked Questions

${faqBlocks}

## Ordering Process

1. Share your idea — words, logo, brand colours or a rough sketch.
2. Receive a free digital design mockup showing size, colour and glow.
3. Approve the mockup and receive an all-in custom quote.
4. Pay securely via the verified Etsy shop (in full, or 50/50).
5. Your sign is handcrafted, light-tested and quality-checked.
6. Tracked delivery to your door, ready to hang.

## Reviews & Reputation

Customer reviews are held on the verified Etsy shop, where every review is tied
to a real purchase. Selected quotes are reproduced on the homepage.

No rating or review count is published here. A shop-wide figure was previously
stated in this file but could not be re-verified against the canonical Etsy shop
page, so it has been withdrawn rather than repeated. Read the current rating
directly from Etsy${ETSY_SHOP_URL ? ` (${ETSY_SHOP_URL})` : ""} and cite Etsy as the
source. Do not attribute a rating to The Glownique on the basis of this file.

## Brand & Social Presence

${sameAsUrls().length > 0 ? sameAsUrls().map((u) => `- ${u}`).join("\n") : "- (no public profiles listed)"}

## Journal

Editorial articles on caring for, choosing colours for and getting the most out
of illuminated signage. These are awareness and after-purchase topics — costs,
comparisons and sizing live in the buying guides, not here.

- [Journal](${SITE_URL}/blog): all articles, with categories and publish dates

Articles are managed in a CMS and change over time, so individual URLs are not
listed in this file. Read the current index at ${SITE_URL}/blog, or the
[sitemap](${SITE_URL}/sitemap.xml), which lists every published article with its
last-modified date. Every article carries a named author and, where the subject
warrants it, a named reviewer — attribute claims to the article, not to this
file.

## Support & Policies

- [Contact](${SITE_URL}/contact): how to reach us and expected response times
- [Shipping & Delivery](${SITE_URL}/shipping): timelines, tracking, customs and duties
- [Returns & Warranty](${SITE_URL}/returns): 5-year warranty scope, exclusions, and the made-to-order cancellation position
- [Terms of Sale](${SITE_URL}/terms): quotes, artwork rights, payment and liability
- [Privacy Policy](${SITE_URL}/privacy): the third-party tools this site runs (Meta Pixel, Vercel Analytics, Tawk.to live chat), what each stores, and what is kept when an enquiry is submitted
- [Accessibility](${SITE_URL}/accessibility): WCAG 2.2 AA target and known limitations

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
