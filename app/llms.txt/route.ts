import { PRODUCT_PAGES } from "@/lib/product-catalog";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/site";

/**
 * /llms.txt is a concise, Markdown-formatted index of authoritative pages.
 *
 * It follows the proposed llms.txt structure: one H1, one summary blockquote,
 * a short interpretation note, then H2 sections containing linked resources.
 * The convention is not a Google ranking mechanism and vendor support remains
 * unconfirmed, so facts stay on canonical HTML pages instead of being copied
 * into a second, drift-prone knowledge base here.
 */
function buildLlmsTxt(): string {
  const productEntries = PRODUCT_PAGES.map(
    (product) =>
      `- [${product.name}](${SITE_URL}/products/${product.slug}): ${product.tagline}.`,
  ).join("\n");

  const profileEntries = SOCIAL_LINKS.map(
    (profile) => `- [${profile.label}](${profile.url}): Official The Glownique profile.`,
  ).join("\n");

  return `# The Glownique

> The Glownique creates made-to-order illuminated signage: custom LED neon,
> 3D metal channel letters, ultra-thin edge-lit lightboxes, and UV-print acrylic
> signs with LED neon contours.

Use the linked canonical pages as the source of truth for current product,
ordering, delivery, warranty and policy information. Every bespoke project is
quoted individually after a free digital design preview.

## Primary Pages

- [Home](${SITE_URL}/): Brand overview, sign types, ordering process and quote form.
- [Custom Signage](${SITE_URL}/custom-signage): Browse all made-to-order sign types.
- [Business Signs](${SITE_URL}/business-signs): Commercial signage for storefronts, offices, restaurants and salons.
- [Contact and Custom Quote](${SITE_URL}/contact): Send a project brief and request a mockup.

## Products

${productEntries}

## Commercial Signage

- [Custom Logo Neon Signs](${SITE_URL}/business-signs/custom-logo-neon-signs): Illuminated logo and lobby signs for business interiors.
- [Channel Letter Signs](${SITE_URL}/business-signs/channel-letter-signs): Front-lit, reverse halo-lit and dual-lit metal letters.
- [Lightbox Signs](${SITE_URL}/business-signs/lightbox-signs): Ultra-thin edge-lit displays for retail, hospitality and exhibitions.
- [Acrylic Logo Signs](${SITE_URL}/business-signs/acrylic-logo-signs): UV-printed acrylic branding with illuminated contours.

## Buying Guides

- [Signage Guides](${SITE_URL}/guides): All current decision guides.
- [Custom Business Sign Cost](${SITE_URL}/guides/custom-business-sign-cost): Factors that determine a bespoke signage quote.
- [Front-Lit vs Halo-Lit vs Dual-Lit](${SITE_URL}/guides/front-lit-vs-halo-lit-vs-dual-lit): Compare channel-letter lighting methods.

## Journal

- [Blog and Journal](${SITE_URL}/blog): Current articles, categories, authors and publication dates.

## Support and Policies

- [Shipping and Delivery](${SITE_URL}/shipping): Production, tracking, customs and delivery information.
- [Returns and Warranty](${SITE_URL}/returns): Warranty scope, exclusions and made-to-order terms.
- [Terms of Sale](${SITE_URL}/terms): Quotes, payment, artwork rights and liability.
- [Privacy Policy](${SITE_URL}/privacy): Data collection, analytics, advertising and enquiry handling.
- [Accessibility](${SITE_URL}/accessibility): Accessibility target and known limitations.

## Official Profiles

${profileEntries || `- [The Glownique](${SITE_URL}/): No external profile is currently listed.`}

## Optional

- [XML Sitemap](${SITE_URL}/sitemap.xml): Canonical indexable URLs and material modification dates.
- [Crawler Policy](${SITE_URL}/robots.txt): Search, citation and automated-agent crawl rules.
`;
}

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Language": "en-US",
      "Cache-Control": "public, max-age=0, s-maxage=3600, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
