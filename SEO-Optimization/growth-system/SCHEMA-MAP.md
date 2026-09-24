# Structured Data Map

Rule: mark up only what the page visibly states and the business can evidence. Verified against Google's current documentation on 2026-09-24 (`research/search-docs-register.md`).

## What Google's documentation says (and why it shapes the choices below)

- **Product snippets** need one of `offers`, `review` or `aggregateRating`. A `Product` with none of them is simply ineligible — not penalised (DOC-01).
- **Merchant listings** need an `Offer` with a price on a page where the shopper can buy. Checkout here is on Etsy, so they are out of reach (DOC-01).
- **`MadeToOrder`** is valid schema.org but is not one of Google's accepted availability values (DOC-01).
- **`AggregateOffer`** is for product snippets only and not for a set of variants; it cannot stand in for "from $X" pricing (DOC-01).
- **Reviews** from another site (Etsy) must not be marked up as the business's own, and self-serving Organization ratings are ineligible (DOC-02).
- **FAQ rich results** stopped showing for all sites on 2026-05-07; HowTo was retired in 2023 (DOC-03). Visible FAQs still help people; the markup is kept only because it is cheap and machine-readable.

## Per template

| Template / URL | Types | Notes |
|---|---|---|
| All pages (root layout) | `Organization` (`@id #organization`), `WebSite` (`@id #website`) | Organization: name, `alternateName`, logo (512 px PNG), `sameAs` (Instagram, Facebook, **Etsy shop** — was a single listing), `description`, **`disambiguatingDescription`** (new), **`contactPoint` → /contact** (new), `knowsAbout`. No address, phone or rating: none is evidenced |
| `/` | `WebPage` + `ItemList` of the four sign types | **Changed**: the old `Service > OfferCatalog > Offer > Product` nest (price-less Offers, now-redirecting URLs) is gone |
| Sign-type pages (`/products/custom-neon-signs`, `/business-signs/{channel-letter-signs, lightbox-signs, acrylic-logo-signs}`) | `Product` (name, description = the visible definition-first intro, image, category, brand, url), `BreadcrumbList`, `FAQPage` | Built in `lib/product-seo.ts` for both route families. **No `offers`** — the WIP snapshot's `AggregateOffer $150–$5,000 InStock` was fabricated and is removed. Ineligible for product snippets until a real price basis exists |
| Industry pages (`/business-signs/*`, 8) | `CollectionPage`, `ItemList` (sign types), `BreadcrumbList`, `FAQPage` | Unchanged |
| Occasion collections (`/custom-signage/*`, 6) | `CollectionPage`, `ItemList`, `BreadcrumbList`, `FAQPage` with `dateModified`, `about`, `keywords` | Unchanged |
| Hubs (`/business-signs`, `/custom-signage`, `/guides`) | `CollectionPage`, `ItemList`, `BreadcrumbList` | Unchanged |
| Guides (`/guides/*`) | `Article`, `BreadcrumbList`, `FAQPage` | Cost guide `dateModified` → 2026-09-24. Recommendation: add `author` once a named expert exists (OWNER-QUESTIONS.md) |
| Journal (`/blog/*`) | `BlogPosting`, `BreadcrumbList`, `FAQPage` | CMS-driven |
| `/contact` | `ContactPage`, `Organization`, `BreadcrumbList`, `FAQPage` | Unchanged |
| Policies | root graph only | Appropriate |

## Guard rails in code

`scripts/seo-audit.mjs` fails the audit when any JSON-LD block contains `price`, `lowPrice`, `highPrice`, `aggregateRating`, `ratingValue` or `reviewCount`, when a block does not parse, or when a literal `<` appears (unsanitised).

## When to add more

| Addition | Trigger |
|---|---|
| `Offer` with `price` + `priceCurrency` (+ `priceValidUntil`) on sign-type pages | Owner approves a published "from" price per sign type that is genuinely obtainable, shown on the page |
| `OfferShippingDetails`, `MerchantReturnPolicy` | Only with the Offer above, and once lead time (CLM-002) and warranty (P0-7) are reconciled |
| `Review` on case-study pages | Only first-party testimonials collected on the site with consent — never Etsy reviews |
| `Person` author on guides | A named sign specialist with a real bio |
| `VideoObject` | If the product videos get their own landing context and transcripts |
| `LocalBusiness` | Not applicable — no staffed premises customers can visit |

## Validation

Parsed on every built page (valid JSON, no literal `<`). Before and after deploy, run representative URLs through the Rich Results Test and the Schema.org validator: one sign-type page, one industry page, one collection, one guide, one post.
