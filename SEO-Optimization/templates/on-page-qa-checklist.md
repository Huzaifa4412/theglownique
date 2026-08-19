# On-Page and Release QA Checklist

URL:  
Page ID:  
Reviewer/date:  
Template/release:

## Intent and content

- [ ] One primary intent matches the keyword map.
- [ ] Title, H1, opening and conversion match that intent without stuffing.
- [ ] Page adds first-party/expert value, not a generic summary.
- [ ] Important questions and trade-offs are answered.
- [ ] Facts, estimates, recommendations and customer claims are distinguishable.
- [ ] Sources and access dates are visible where useful and registered internally.
- [ ] Author/reviewer expertise, publish date and truthful modified date are present.
- [ ] No thin city/query permutation or duplicated section set.
- [ ] Spelling, product terminology and US audience language are consistent.

## Claims and commercial facts

- [ ] Every volatile/high-risk claim has a claims-register ID and owner.
- [ ] Price/range has basis, currency, scope and effective date—or is omitted.
- [ ] Production and transit times are separate.
- [ ] Promotion state and fallback were tested.
- [ ] Warranty, availability, fulfillment and installation wording match policies.
- [ ] Review/testimonial source, permission and disclosure are correct.
- [ ] Etsy destination is canonical and appropriate for context.

## Metadata

- [ ] Unique document title and meta description render in `<head>`.
- [ ] Self-referencing absolute canonical is correct.
- [ ] Robots/index intent matches route manifest.
- [ ] OG title, description, URL, type, image and image alt are page-specific.
- [ ] Twitter card/title/description/image are page-specific.
- [ ] Social image returns 200 and has appropriate dimensions/content.
- [ ] No `keywords` meta tag.
- [ ] Exactly one meaningful H1; heading hierarchy is understandable.

## Internal links and crawlability

- [ ] Breadcrumb is visible and matches hierarchy/schema.
- [ ] Parent/hub, commercial, guide, proof and conversion paths are present as applicable.
- [ ] Anchors are descriptive and natural.
- [ ] No broken, redirected or placeholder internal links.
- [ ] Page is linked from at least one approved indexable page before launch.
- [ ] Sitemap includes the canonical URL only if intended indexable.
- [ ] `lastmod` reflects material modification, not build time.
- [ ] HTTP status is 200; no soft-404 signals.

## Structured data

- [ ] JSON-LD script is parseable and sanitized (`<` cannot terminate script data).
- [ ] Types/properties match visible content.
- [ ] Product versus Service decision is recorded.
- [ ] `Offer` exists only for a genuinely visible purchasable price/configuration.
- [ ] Rating/review markup is eligible and not imported/aggregated improperly.
- [ ] Breadcrumb positions and absolute URLs are correct.
- [ ] FAQ markup, if retained, matches visible questions and has no forecast rich-result value.
- [ ] Schema.org Validator passes; representative eligible types pass Rich Results Test.

## Media, accessibility and agents

- [ ] Meaningful image filenames, alt text and captions describe evidence.
- [ ] Decorative media has empty alt and no redundant announcement.
- [ ] Image dimensions/sizes/formats and below-fold lazy loading are appropriate.
- [ ] Video has poster/description/transcript when meaningful and does not block LCP.
- [ ] Controls have accessible names, keyboard behavior and visible focus.
- [ ] Reduced-motion behavior works.
- [ ] Core specifications, price basis, delivery/policy and CTA are server-rendered.
- [ ] Mobile layouts have no overflow or unusable targets.

## Analytics and privacy

- [ ] Approved events fire once with correct page/cluster/CTA parameters.
- [ ] No name, email, phone, message, file name/content or card/order data is sent.
- [ ] Consent/privacy behavior matches the published policy.
- [ ] Quote and Etsy handoffs work with analytics blocked.
- [ ] Test traffic is excluded/labeled where applicable.

## Post-publish

- [ ] Live URL/head/content rechecked, not only preview.
- [ ] IndexNow notification sent when applicable; receipt logged separately from indexing.
- [ ] Sitemap/GSC release record updated.
- [ ] 7-day and 14-day index checks scheduled.
- [ ] 30/60/90-day performance review scheduled.
- [ ] Screenshots/report artifacts stored.

Decision: Pass / Pass with follow-up / Blocked  
Blocking defects and owners:
