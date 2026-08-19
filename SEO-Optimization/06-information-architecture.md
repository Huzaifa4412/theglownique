# US B2B Information Architecture

## Architectural decision

Keep the current `/products` catalog as the broad product reference. Add `/business-signs` as the B2B commercial hub. Its child product pages target explicit business/logo/storefront intent and must link to—not duplicate—the corresponding product-detail specifications.

```text
/
├── products/                         existing broad catalog
│   ├── custom-neon-signs
│   ├── 3d-metal-neon-signs
│   ├── ultra-thin-lightbox
│   └── uv-print-acrylic-signs
├── business-signs/                   future B2B commercial hub
│   ├── custom-logo-neon-signs
│   ├── channel-letter-signs
│   ├── lightbox-signs
│   ├── acrylic-logo-signs
│   ├── restaurants-bars
│   ├── retail-storefronts
│   ├── salons-spas
│   ├── offices-reception
│   ├── gyms-fitness-studios
│   └── events-trade-shows
├── guides/
│   ├── custom-business-sign-cost
│   ├── channel-letter-sign-cost
│   ├── front-lit-vs-halo-lit-vs-dual-lit
│   ├── lightbox-vs-channel-letters
│   ├── indoor-vs-outdoor-illuminated-signs
│   ├── sign-size-viewing-distance
│   ├── sign-installation-electrical-permits
│   ├── choose-business-sign-type
│   └── illuminated-sign-materials-lighting
├── projects/
│   └── {descriptive-project-slug}
├── how-we-make-illuminated-signs
├── quality-control-warranty
└── existing trust/policy routes
```

The existing `/shipping`, `/returns`, `/terms`, `/privacy`, `/accessibility` and `/contact` routes remain. `/studio` is not part of the public information architecture.

## Page responsibilities

| Layer | Must answer | Must link to | Must not do |
|---|---|---|---|
| B2B hub | Which of four illuminated sign types fits the buyer's context? | Four B2B products, six industries, three priority guides, proof hub | Become a thin list or repeat every product page |
| B2B product | Why this sign type, specifications, constraints, cost drivers and process | Matching current product page, relevant industries, comparisons, projects, quote | Reuse the current product page verbatim |
| Industry | What changes for this business environment? | Two or three relevant products, installation/sizing guide, real projects | Swap only industry nouns or fabricate local relevance |
| Guide | Help a buyer make one decision with balanced evidence | Commercial destinations and proof | Hide the answer to force a quote |
| Case study | Show the real problem, constraints, solution and outcome | Product, industry, related guide, quote | Invent outcomes, quote customers without permission or publish a photo gallery without analysis |
| Trust/process | Prove identity, manufacturing, QC, policy and expertise | Products, projects, contact/policy pages | Claim certifications, locations or tests without evidence |

## Internal-link contract

Every indexable B2B page must have:

- at least one parent/hub breadcrumb link;
- one contextual link to a commercial destination;
- one decision-support link to a guide;
- one proof link to a relevant project/process asset once available;
- one clearly labeled conversion action;
- no generic `click here` anchor;
- no orphan status at launch.

Required flows:

```text
Industry → relevant products → comparison/pricing guide → case study → free mockup
Guide → compared products → proof → free mockup
Case study → product + industry + constraint guide → replicate-project quote
Product → industries + guides + projects → free mockup
```

Breadcrumb contract for a B2B product:

`Home → Business Signs → Channel Letter Signs`

Existing product breadcrumb repair:

`Home → Products → {Product Name}`

## Cannibalization controls

Before creating a route, the SEO lead must compare its intended query, title, H1 and unique proof with every existing row in the keyword map. If two pages satisfy the same primary intent, choose one of:

1. merge into the stronger canonical page;
2. narrow one page to a distinct audience/task;
3. keep one non-indexable until it has unique purpose;
4. redirect a retired URL after preserving useful content.

The B2B product pages should use business-specific problems, proof and conversion language. The existing product pages should remain broader technical/product references.

## Geographic policy

- Do not create US city, state, “near me” or local-installation pages without a real, verifiable operational presence and content unique to that market.
- A permissioned case study may mention its true project location when material.
- Use national fulfillment language only when shipping/support capabilities are verified.
- Do not add `LocalBusiness` schema without an eligible location.

## Structured content contract

The documentation phase does not change Sanity. Future content models must support these fields without forcing unsupported schema:

### Common page fields

| Field | Type/rule |
|---|---|
| `internalTitle` | Required; editorial only |
| `slug` | Required, lowercase hyphenated, immutable after launch unless redirect approved |
| `canonicalUrl` | Derived from route, unique |
| `primaryKeyword` | Required planning label; not output as a meta-keywords tag |
| `intent` | Enum: navigational, informational, comparison, commercial investigation, transactional |
| `audience` | Required B2B role/use case |
| `funnelStage` | awareness, consideration or decision |
| `seoTitle` / `metaDescription` | Required, unique, previewed but not governed by arbitrary character guarantees |
| `summary` | Direct human-readable answer/value proposition |
| `author` / `reviewer` | Referenced person records with relevant expertise |
| `publishedAt` / `modifiedAt` / `reviewDueAt` | ISO timestamps; modification only for material change |
| `sources` | Repeating URL, title, publisher, access date, claim supported |
| `proofAssets` | Media, caption, alt text, rights status, project/customer reference |
| `internalLinks` | Target, relationship, suggested anchor |
| `conversionAction` | Enum plus destination/event name |
| `schemaEligibility` | Derived flags; editorial users cannot force markup |
| `status` | draft, expert review, legal/claims review, scheduled, published, refresh, retired |

### Product/service facts

`productType`, `specifications`, `materials`, `lightingMethod`, `sizeRange`, `indoorOutdoor`, `priceFrom`, `priceBasis`, `currency`, `purchasableAtPrice`, `availability`, `leadTimeProduction`, `leadTimeTransit`, `warranty`, `fulfillmentGeography`, `installationIncluded`, `claimEvidence`, `factVerifiedAt`.

### Case-study facts

`customerType`, `customerNamePermission`, `locationPermission`, `challenge`, `constraints`, `solution`, `materials`, `dimensions`, `lightingMethod`, `timeline`, `outcome`, `outcomeEvidence`, `testimonial`, `testimonialPermission`, `mediaRights`, `relatedProduct`, `relatedIndustry`.

## Schema-eligibility rules

- `Offer` requires a visible, genuinely obtainable price/price basis, currency, availability and destination URL.
- `AggregateRating` requires an eligible property and ratings gathered/displayed in compliance with Google rules; do not aggregate Etsy ratings on the Glownique site.
- `Product` versus `Service` is decided from the page's actual commercial model, not preference.
- `HowTo` is used only when the visible page presents a complete task and current search support merits it.
- FAQ content remains visible for users; FAQ markup is optional maintenance data and not a Google rich-result target.
- `LocalBusiness` requires a genuine eligible location.
- All JSON-LD text must match visible facts and be sanitized before rendering.

## Navigation rollout

Do not add empty menu destinations. Launch order:

1. B2B hub plus at least two product pages and two proof assets;
2. remaining product pages;
3. industry pages as each has real proof;
4. guides and project hub;
5. utility/tool assets.

Temporary links can live contextually from products while a full navigation update waits for a coherent cluster.
