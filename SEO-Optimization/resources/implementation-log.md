# Implementation Log

Records what actually shipped, against the backlog in
[07-technical-seo-plan.md](../07-technical-seo-plan.md). Documents 06–12 are
instructions; this file is the evidence. Append releases, never rewrite them.

---

## Release 2026-08-19 — claims reconciliation and crawler correctness

Owner decisions taken into this release:

1. The free-worldwide-delivery promotion **has ended**. Withdraw the claim.
2. **Keep** the Meta Pixel, Vercel Analytics and Tawk.to; fix the disclosure.

### Shipped

| ID | Change | Evidence |
|---|---|---|
| TECH-06 | `lib/claims.ts` added — commercial claims as release data. Every surface resolves one value; the register CSV is the paper half, this is the runtime half. | `lib/claims.ts` |
| TECH-06 / CLM-001 | Expired free-delivery promotion withdrawn from 15 files: root metadata (description, OG, Twitter), announcement bar, footer, homepage FAQ, comparison section, product trust bars, all four product meta descriptions, the six-step process cards, `/products`, `/shipping`, `/contact` FAQ and `llms.txt`. The homepage countdown section was deleted outright — its entire subject was the retired promotion. | `npm run seo:audit` fails if it reappears |
| TECH-03 / CLM-015 / CLM-016 | Privacy notice rewritten. It previously stated "no advertising cookies or tracking pixels" while the Meta Pixel was live and setting `_fbp`/`_fbc`. The tool list is now generated from `TRACKING_TOOLS`, plus a dedicated Meta Pixel section naming the cookies, what is and is not shared, and opt-out routes. | `/privacy` |
| TECH-13 / CLM-012 / CLM-011 | `llms.txt`: delivery corrected and explicitly marked ended; unverified "5.0 out of 5 from 8 reviews" withdrawn; unsourced competitor comparison removed; privacy line corrected. | `/llms.txt` |
| TECH-11 | `robots.ts` rebuilt from the crawler matrix. Legacy `anthropic-ai` removed; `Claude-SearchBot`, `Claude-User`, `Perplexity-User` added; search, training/grounding and user-triggered agents separated into three documented groups; the incorrect "Google-Extended controls AI Overviews" comment removed. | `/robots.txt` |
| TECH-02 | `/studio` now serves `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex` **and was removed from the robots.txt disallow**. The previous config could never de-index it: a crawler blocked from fetching the page never sees the noindex. | `curl -I /studio` |
| TECH-05 | `lib/routes.ts` route manifest with hand-entered material modification dates; `sitemap.ts` reads it. An unchanged rebuild no longer advances any date. Verified: changed routes carry 2026-08-19, untouched routes still carry 2026-08-11. | `/sitemap.xml` |
| TECH-04 | Removed the `keywords` meta tag (Google ignores it, AUD-11). Trimmed the one title exceeding the truncation threshold. | audit passes |
| TECH-14 | IndexNow key hosted at `/b2e9695668d33bad83be011d34e0e804.txt`; `npm run indexnow -- --all \| <paths>` submits change notifications. | `scripts/indexnow-submit.mjs` |
| TECH-20 | `npm run seo:audit` — route/metadata/schema regression suite over all 21 routes. | passes, 0 failures |
| TECH-17 (partial) | Lighthouse lab baseline captured. See below. | this file |
| CLM-018 | Accessibility page corrected twice: it claimed 100/100 with zero failures, re-measurement found 94 with three real failures, those were fixed, and it now publishes 100/100 with the measurement date and the twelve-page coverage behind it. | `/accessibility` |
| TECH-19 | **Accessibility defects found and fixed.** The WhatsApp button green was 1.98:1 behind white text — and that button is every quote CTA on the site. Brand accents were used as both fills and text, failing 2.2–4.1:1 in both directions. The Etsy button's decorative "E" was a text node, so at mobile widths its visible text read `"E Etsy"`, which its accessible name did not contain. Tawk.to's frames had no titles. | Lighthouse, table below |

### Regression suite

`scripts/seo-audit.mjs` fails CI on: non-200 routes, missing or cross-route
canonicals, `og:url` inherited from the homepage (AUD-08), missing OG/Twitter
fields, a `keywords` tag, zero or multiple `<h1>`, JSON-LD that does not parse or
contains an unescaped `<` (TECH-07), a non-indexable route missing its noindex or
appearing in the sitemap, sitemap dates that all equal today, and **any retired
claim reappearing** on a page or in `llms.txt`.

The retired-claim guard was verified to actually fire against the previous copy
rather than passing vacuously.

### Measurement baseline — Lighthouse, 2026-08-19

Lab data from a local production build (`next build` + `next start`), Chrome,
mobile emulation. **Not field data.** GSC Core Web Vitals and PageSpeed Insights
still required for TECH-17 sign-off, and both need owner access.

First pass (before fixes) and after, per template:

| Route | Template | A11y before | A11y after |
|---|---|---:|---:|
| `/` | home | 94 | **100** |
| `/products` | catalog hub | 96 | **100** |
| `/products/custom-neon-signs` | product (pink) | 93 | **100** |
| `/products/3d-metal-neon-signs` | product (gold) | 96 | **100** |
| `/products/ultra-thin-lightbox` | product (green) | — | **100** |
| `/products/uv-print-acrylic-signs` | product (violet) | — | **100** |
| `/business-signs` | B2B hub | 96 | **100** |
| `/business-signs/custom-logo-neon-signs` | B2B product | — | **100** |
| `/guides` | guides hub | — | **100** |
| `/guides/custom-business-sign-cost` | guide | — | **100** |
| `/contact` | contact | 97 | **100** |
| `/shipping` | policy | — | **100** |

Best Practices sits at 73 on every page. All three failures are expected and
none is a defect to fix here:

- `third-party-cookies` and `inspector-issues` — the Meta Pixel's `_fbp`/`_fbc`.
  Disclosed on `/privacy` rather than denied. Removing the finding means
  removing the pixel, which is a business decision already taken the other way.
- `errors-in-console` — `/_vercel/insights/script.js` 404s on localhost because
  Vercel Analytics only exists on Vercel. Not reproducible in production.

Performance (LCP/INP/CLS) was **not** captured; the Lighthouse tool used here
excludes it. It needs a separate trace and, for anything reportable, field data.

### Not shipped — blocked on owner input

| Item | Blocked on |
|---|---|
| TECH-01, TECH-15, TECH-16 | Search Console, Bing Webmaster Tools and analytics access. No index-coverage claim can be made without them; `site:` is not evidence. |
| TECH-10 | The canonical Etsy **shop/profile** URL. `ETSY_SHOP_URL` is still a single *listing* URL, which is also what `Organization.sameAs` carries. |
| CLM-002 | Production vs transit lead times. "10–15 days" still means arrival on `/shipping` and production in `/terms` and `llms.txt`. Splitting them needs an approved transit figure per region — deliberately not invented here. |
| CLM-004 – CLM-010 | Supplier and test evidence for warranty scope, 100,000-hour life, 80% energy saving, IP67, 12V safety and colour matching. |
| CLM-014 | Whether the 50/50 payment split is an Etsy-compliant workflow. |
| TECH-02 (full) | Whether Studio is authenticated or removed from the public frontend. The noindex is a mitigation, not access control. |
| Consent gating | No cookie banner. Relevant if EU/UK traffic matters; the privacy page currently says so in plain terms. |

### Not shipped — needs first-party evidence, not engineering

The IA in [06-information-architecture.md](../06-information-architecture.md)
calls for six industry pages, seven more guides, a projects hub, a process page
and a QC/warranty page. The hub, four B2B product pages and two guides exist.

The remainder is deliberately not generated. Every one of those page types is
defined by evidence this repository does not contain — real projects, named
expertise, permissioned customer outcomes, supplier data. The program's own
operating rules forbid "invented expertise" and "thin query permutations", and
publishing fourteen pages of plausible-sounding filler would breach the strategy
far more damagingly than shipping nothing. Case-study interviews and the expert
intake (weeks 1–3 of the roadmap) are the actual prerequisite.

---

## Release 2026-08-19b — visual revert of the contrast work

Owner reviewed the contrast release and asked for the brand appearance back.
Four decisions, applied as follows.

| Ask | What shipped | Accessibility effect |
|---|---|---|
| WhatsApp buttons looked off-brand | Restored WhatsApp's exact green (`#25d366`) and changed the **ink** instead: dark `#1e1a22` on the brand green is 8.64:1, versus 1.98:1 for the white text that was there originally. Icons and the floating button match. | **No loss.** Brand colour and AA, both kept. |
| Homepage lost a section | Added `OrderIncludesSection` — "What every order includes": free mockup, made to order, tracked delivery, 5-year warranty, Etsy payment, design help. Every line is a standing commitment with no expiry, so nothing here can go stale like the countdown did. Delivery copy reads from `lib/claims.ts`. | Scores 100. |
| Pink text was duller sitewide | Reverted only where the bright pink is legitimately compliant: five non-text icons (3:1 floor under WCAG 1.4.11, and `#f40b68` is 4.12:1) and one 20px bold hover state that clears the large-text threshold. **The other 28 were left dark** — they are 12–14px text where 4.12:1 genuinely fails 4.5:1. | No loss. |
| Revert the product accent work | Reverted in full. `accentText`/`accentOnDark` removed; product pages, the product hub and the business-signs hub badges use the single bright `accent` again. | **Cost 4 points on three templates.** |

### Accessibility after the revert

| Template | Before this release | After |
|---|---:|---:|
| Home, contact, guides, B2B detail, policy pages | 100 | **100** |
| Product detail (×4) | 100 | **96** |
| Product hub | 100 | **96** |
| Business-signs hub | 100 | **96** |

The four points are one audit, `color-contrast`, and these are the exact
measurements behind it:

- `#f40b68` on the dark product hero glow — 2.72:1 and 3.03:1
- white on `#f40b68` badge — 4.12:1; `#f40b68` on white — 4.12:1
- white on `#e0a23c` badge — 2.23:1; `#e0a23c` on white — 2.23:1
- white on `#0e9f6e` badge — 3.38:1; white on `#d97706` — 3.18:1
- breadcrumb `text-white/50` on the hero — 3.58:1

All are small text or badge labels, so 4.5:1 applies; none reaches it. Restoring
compliance without dulling the palette is still possible — larger or heavier
badge text would drop the requirement to 3:1, and a solid dark chip behind the
accent label would fix the hero — but both change the design, so they are worth
a deliberate pass rather than a silent one.

`/accessibility` was updated in the same release to publish 96 for those three
templates, name the cause, and say plainly that it was a deliberate trade.
Leaving the page claiming 100 would have recreated exactly the stale-claim
problem this program was set up to fix.

---

## Release 2026-08-19c — navigation, visibility fix, chat disclosure

| Change | Detail |
|---|---|
| Contact in navigation | Added to both live navbars. `site-header.tsx` drives its desktop and mobile lists from one array, so a single entry covers both; `product-top-bar.tsx` (used by product, B2B, guide, policy and contact pages) got an explicit link and its `aria-label` corrected from "Product pages" to "Primary navigation". `navbar-menu.tsx` and `floating-navbar.tsx` are dead code and were not touched. |
| Invisible CTA fixed | "Start an enquiry" on `/contact` rendered `#1e1a22` on `#1e1a22`. Cause: `globals.css` sets `a { color: inherit }` **outside any cascade layer**, and unlayered CSS beats layered CSS regardless of specificity — so Tailwind's `text-white` utility lost. Fixed with the important modifier (`text-white!`); now 17.13:1. Worth knowing: `text-white` on any `<a>` in this codebase is inert for the same reason. |
| Retired claim leak | `/contact` still read "Tracked delivery, **free worldwide**". The audit guard missed it because its pattern only matched *free … delivery* in that order. Copy fixed, and a second pattern added for the reversed order, checked against seven cases including three that must NOT match (e.g. "tracked delivery and a free design mockup"). |
| Live-chat data disclosure | Owner is enabling Tawk's built-in Pre-Chat Form (dashboard: Administration → Chat Widget → Content → Pre-Chat Form), which collects name, email and phone. `TRACKING_TOOLS` and a new "Live chat" section on `/privacy` now say what is collected, why, that Tawk holds it, and that WhatsApp and the contact page are alternatives. |

The chat disclosure ships slightly ahead of the dashboard toggle. That is the
safe direction of error: describing a collection a day early is a far smaller
problem than collecting a day before disclosing.

---

## Release 2026-08-19d — custom pre-chat gate and lead capture to Sanity

Owner changed direction twice here, and both changes are reflected: Tawk's
built-in Pre-Chat Form is **not** used, and captured data is now persisted.

### Live-chat pre-chat gate

Tawk's own bubble is hidden on load via `Tawk_API.onLoad` in the inline script —
set before the embed loads, because a React effect cannot reliably beat it. Our
own launcher takes its place, collects name/email/phone in site styling, attaches
them with `Tawk_API.setAttributes`, then reveals and opens the real widget. A
returning visitor is not asked twice (localStorage), and the same key is read in
the inline script so the widget never flashes.

`lib/tawk.ts` wraps the API. Every call waits for the widget to report ready with
a bounded retry, because the embed is `lazyOnload` — `Tawk_API` exists as a bare
object before then, and `setAttributes` would throw at exactly the wrong moment.

Written with `useSyncExternalStore` rather than `useEffect` + `setState`:
localStorage is an external store, and the effect version is a lint error in this
project (`react-hooks/set-state-in-effect`) for good reason.

### Lead capture

| Piece | Detail |
|---|---|
| `sanity/schemaTypes/lead.ts` | `lead` document type. Captured fields are **read-only in the Studio** — the record is evidence of what a customer said, not a document to edit. `status` and `internalNotes` are the editable ones. |
| `sanity/structure.ts` | Leads get explicit panes ("New", "All"), newest first, because a lead list is a worklist, not a content library. |
| `app/api/leads/route.ts` | The only holder of the write token. Whitelists field names, coerces to string, caps lengths, validates source and email. |
| `sanity/lib/write-client.ts` | Server-only. `SANITY_API_WRITE_TOKEN` has no `NEXT_PUBLIC_` prefix on purpose — that token can delete the whole dataset. |
| `lib/leads.ts` | `archiveLead()` — fire-and-forget with `keepalive`, so a failed archive can never stop someone reaching WhatsApp, and the request survives the tab navigating away. |

Wired into all three forms: the contact page, the pre-chat gate, and the
newsletter.

Verified against the running route: valid payloads accepted, and 400s for a
missing name on a named source, a malformed email, an unknown source and invalid
JSON. With no token configured the route returns `202 {"archived":false}` and
logs a warning rather than 500-ing at a customer.

### Two claims this falsified, corrected in the same release

1. **"No quote database … your quote details are not stored on our servers at
   all."** That was the whole point of the old design and it is now untrue. The
   privacy notice, its metadata, its intro, `llms.txt` and the contact form's own
   "nothing reaches us until you tap send" all corrected. `/privacy` now names
   Sanity as the store, says what it is used for, and says we will delete it on
   request.
2. **The newsletter told people "your welcome code is on its way"** while
   discarding the email entirely — nothing was stored and nothing was ever sent.
   The address is now archived, and the message says "we'll email your 10% code
   shortly", which is a commitment that can actually be kept from the Studio. The
   pixel helper's doc comment was updated too; it still fires a custom event
   rather than `CompleteRegistration`, because sending is manual.

### End-to-end verification, 2026-08-19

`SANITY_API_WRITE_TOKEN` was supplied by the owner and the pipeline was verified
against the live `production` dataset, one clearly-marked record per source,
each deleted immediately afterwards:

| Source | Route response | Stored correctly | Cleaned up |
|---|---|---|---|
| `contact-form` (all 13 fields) | `201 {"archived":true}` | yes | yes |
| `newsletter` (no name) | `201 {"archived":true}` | yes, `name` absent as designed | yes |
| `pre-chat` | `201 {"archived":true}` | yes | yes |

Also checked: no unexpected field names reached the document, so the whitelist in
the route handler is doing its job; `status` defaulted to `new`; `submittedAt` was
server-stamped. `count(*[_type=="lead"])` is back to **0** — the dataset was left
exactly as found.

Leads are now visible in the Studio at `/studio` under **Leads → New**.

### Still outstanding

- `SANITY_API_WRITE_TOKEN` must also be set in the Vercel project settings, or
  production will accept enquiries and silently not archive them (202 + a logged
  warning, by design).
- No rate limiting on `/api/leads`. It is spammable. A real fix needs a KV store
  or Vercel's WAF; a per-instance in-memory counter would be theatre on
  serverless.

---

## Release 2026-08-20 — merged and deployed to production

PR [#1](https://github.com/Huzaifa4412/theglownique/pull/1) merged to `master` as
`e142de8`. Production deployment **Ready**.

### Production had been broken for 14 days

The last successful production deploy before this was **2026-08-05**, even though
the Sanity and Meta Pixel commits were both on `origin/master`. Cause, confirmed
from the failed preview build log:

```
Error: Missing environment variable: NEXT_PUBLIC_SANITY_DATASET
```

`sanity/env.ts` calls `assertValue`, which throws at build time, and Vercel had
only `NEXT_PUBLIC_WHATSAPP_NUMBER` configured. Every build after the Sanity commit
failed. `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` were added
to Production, and this is the first green production build since 5 August.

Consequence worth recording: the Meta Pixel was committed on 2026-08-14 but never
reached production, so the "no tracking pixels" privacy claim was wrong in the
repository rather than on the live site. It was still wrong and still had to go —
but the exposure was smaller than first stated.

Note that `/api/leads` widened this dependency: previously only `/studio` needed
the Sanity vars, now the route handler does too. Any environment that builds this
app must have them.

### Verified against https://www.theglownique.com

`scripts/seo-audit.mjs --base https://www.theglownique.com` → **21 routes, 0
failures, 0 warnings**. Plus:

| Check | Result |
|---|---|
| `/studio` response header | `X-Robots-Tag: noindex, nofollow, noarchive, noimageindex` |
| Legacy `anthropic-ai` in robots.txt | gone |
| `Claude-SearchBot` in robots.txt | present |
| "Free worldwide delivery" on homepage | 0 occurrences |
| "Tracked worldwide delivery" | 12 occurrences |
| `/contact` links in homepage nav | 3 (desktop, mobile, footer) |
| IndexNow key file | 200 |
| `llms.txt` marks the promo ended | yes |
| `/privacy` names the Meta Pixel | yes |
| Distinct sitemap `lastmod` values | 2 — dates are not build-stamped |

### Still open

- **Preview scope for the two `NEXT_PUBLIC_SANITY_*` vars.** Vercel CLI 54.9.1
  returns `action_required: git_branch_required` even for its own documented
  `--yes` form, so this needs the dashboard. Until then every PR preview build
  fails the same way.
- **`SANITY_API_WRITE_TOKEN` is set for Preview as well as Production.** That was
  not the recommendation: a preview deploy now writes real `lead` documents into
  the production dataset, so testing a form on a preview URL creates a real lead.
  Remove the Preview scope unless that is wanted.
- **No rate limiting on `/api/leads`**, which is now live and publicly postable.
- IndexNow has **not** been pinged for this release; run `npm run indexnow -- --all`
  if you want Bing notified of the changed URLs.

---

## Release 2026-08-24 — the journal (/blog), CMS-managed

### What shipped

A blog section managed in Sanity, at `/blog`, `/blog/{slug}` and
`/blog/category/{slug}`, with eight launch articles seeded as drafts.

| Piece | Where |
|---|---|
| Content model | `sanity/schemaTypes/blog/` — `post`, `author`, `category`, `blogSettings`, plus body blocks |
| Studio panes | `sanity/structure.ts` — Blog group, "Hidden from search" pane, pinned hub singleton |
| Queries | `sanity/lib/queries.ts` |
| Data layer | `lib/blog.ts` — typed reads, cache tags, TOC builder, date helpers |
| Routes | `app/blog/`, plus `app/api/revalidate/route.ts` |
| Styling | `app/blog/blog.css`, imported per-route so it does not ship to the storefront |
| Seed | `scripts/seed-blog.mjs` + `scripts/blog-seed/` (`npm run blog:seed`) |

### Positioning decision (cannibalization)

`06-information-architecture.md` gives `/guides` the decision questions and
`/business-signs` the commercial ones, and has no `/blog` in it. Adding one is a
cannibalization risk, so the boundary is enforced in three places rather than
assumed:

- `/blog` owns **awareness and care** — ideas, colour, maintenance, trends.
- `/guides` keeps **decisions** — cost, comparisons, sizing, installation.
- `/business-signs` keeps **commercial** intent.

The boundary is written into `lib/blog.ts`, into the `primaryKeyword` field
description on the post schema (where an editor is standing when they are about
to break it), and into the `positioning` field on the blog hub singleton. None
of the eight launch topics overlaps a planned guide; every post carries required
`relatedLinks` with at least one commercial and one guide destination.

### Competitor basis for the topic and format choices

Reviewed August 2026: shineneon.com, ahaneon.com, neonchamp.com, yellowpop.com,
neonsignsdepot.com. The same topic cluster ranks across all of them (cleaning,
lifespan, LED vs glass, colour choice, wedding ideas). The same weaknesses recur:
no named author or reviewer, no dates on cards, no sources behind any claim, and
in two of five, category filters leading to empty pages. The launch set takes
those topics and differentiates on identity, dates, sourced claims, key
takeaways, real comparison tables and working category archives.

### Claim reconciliation

`app/llms.txt/route.ts` states LED neon is "rated up to 100,000 hours". The
lifespan article was drafted against a conservative 30,000–50,000 hour figure
and has been rewritten to present both as a range, consistent with the published
claim. A comment in `scripts/blog-seed/content.mjs` ties the two together so the
article is revised in the same release if the llms.txt claim ever changes.

**Open**: the "up to 100,000 hours" claim has no row in
`claims-and-proof-register.csv` and no supplier datasheet behind it in the repo.
It should be validated or softened — it is now stated on two surfaces, not one.

### Sitemap

`app/sitemap.ts` is now async. Static routes still come from `lib/routes.ts`
(only `/blog` was added there); posts and category archives are appended from
Sanity, filtered by the post's `indexable` flag — the same flag that drives the
page's `noindex`, so the two cannot disagree. `scripts/seo-audit.mjs` asserts
that manifest routes are present, not that nothing else is, so the appended URLs
pass through cleanly.

### Also changed

- Header nav: "Inspiration" pointed at `#shop`, the same anchor as "Shop" — two
  labels, one destination. Replaced with "Journal" → `/blog`.
- `ProductTopBar` and the footer Company column gained a Journal link.
- `next.config.ts`: `images.remotePatterns` scoped to `cdn.sanity.io/images/**`.
- `llms.txt` gained a Journal section pointing at the index and the sitemap
  rather than enumerating articles that change.
- `lib/blog.ts` reads drafts on `next dev` when a write token is present, so
  drafts can be reviewed on localhost. Triple-guarded against production.

### Still open

- **The eight posts are DRAFTS and the author is a placeholder.** `--publish`
  refuses to run until a real byline is supplied. A fabricated expert with
  fabricated credentials is the same class of problem as an invented review, so
  this is a hard gate rather than a default.
- **The workshop claims in the drafts have not been fact-checked by anyone who
  builds the signs.** e.g. "the power adapter is what usually fails first".
- **`SANITY_REVALIDATE_SECRET` is not set and the webhook is not created**, so
  publishing takes up to five minutes to appear rather than being instant.
- **The blog subscribe form promises "one email when a new article goes up".**
  Sending is manual, from the Studio. That is a promise someone has to keep.
- IndexNow has not been pinged; run `npm run indexnow -- --all` once posts are
  live.

---

## Release 2026-08-24b — outbound click tracking, rate limiting, and a lead that was never archived

### The gap that mattered most

The product configurator dialog (`components/storefront/product-dialog.tsx`)
collects a name, email, phone, sign type, size, usage location, delivery
country, budget and timeline — then fired a Meta Pixel event and handed the
visitor to WhatsApp, **keeping none of it**. If someone completed that form and
did not press send in WhatsApp, the most complete enquiry on the site was gone.

The contact form has archived to Sanity since it shipped. This was simply
missed. It now calls `archiveLead()` with a new `quote-dialog` source, before
the `window.open` handoff (`keepalive` carries it through the navigation).
Added to `LeadSource`, to `VALID_SOURCES` in `/api/leads`, and to the `source`
options and preview on the `lead` schema.

### Outbound click tracking (WhatsApp + Etsy)

| Piece | Where |
|---|---|
| Document type | `sanity/schemaTypes/outbound-click.ts` — read-only capture, `channel` field |
| Endpoint | `app/api/outbound-click/route.ts` |
| Browser helper | `lib/outbound-click.ts` |
| Hook point | `components/analytics/meta-pixel-events.tsx` (existing delegated listener) |
| Studio panes | Recent / WhatsApp / Etsy / by CTA / by page / unlabelled links |
| Rate limiter | `lib/rate-limit.ts` (new, shared — now used by both endpoints) |

Hooked into the document-level outbound-link listener that already existed for
the Pixel, so every current WhatsApp and Etsy CTA is covered and so is every
future one, with no per-component churn.

One document type with a `channel` field rather than two types, because every
other field is identical and the question people actually ask is comparative:
on this page, did visitors take the WhatsApp route or the Etsy one.

**What it is not.** A row means somebody opened WhatsApp or Etsy, never that
they sent a message or bought anything — once the visitor leaves, this site
sees nothing. Said in the schema docblock and the route docblock, because the
number will otherwise be read as an enquiry count.

### Privacy

`/privacy` promises "no profiling or scoring", so the design has **no cookie,
no visitor id and no IP retained**. Repeat clicks are deduplicated in page
memory (a module-level Set in `lib/outbound-click.ts`) specifically so no
identifier has to exist to do it. The IP is read to rate limit and discarded;
country comes from the CDN edge header and is two letters.

`pagePath` is stripped of its query string server-side — verified: a posted
`/blog/x?utm_source=leak` was stored as `/blog/x`. Query strings can carry an
email from a pasted link or a token from another system.

The privacy page said its tool list was "complete", and that list is
third-party only. Added `SITE_MEASUREMENT` to `lib/claims.ts` and a "What we
count ourselves" section to `/privacy` rendered from it — same one-record-
rendered discipline as `TRACKING_TOOLS`.

### Verified

- Click endpoint, both channels: 201 + document written; iPhone UA read as
  `mobile` and a desktop UA as `desktop`; `?secret=leak` stripped from
  `pagePath`; unknown channel and absolute `pagePath` rejected 400.
- `quote-dialog` lead: 201, all fields land, `status: new` so it lands in the
  New leads worklist. Unknown source still rejected 400.
- Test documents deleted; both collections back to 0 seeded rows.
- Lint clean, `next build` passes.

Incidental: one build run hit `EAI_AGAIN` on Sanity's CDN. The `fetchBlog`
fallback in `lib/blog.ts` did its job — logged loudly, build completed rather
than the whole deploy failing on a DNS blip. Re-ran clean.

### Rate limiting

`lib/rate-limit.ts` is a shared in-memory limiter, now used by both public
write endpoints:

| Endpoint | Limit | Reasoning |
|---|---|---|
| `/api/outbound-click` | 30 / minute | Repeats within a page are already suppressed client-side |
| `/api/leads` | 10 / 10 minutes | Deliberately generous — see below |

The leads limit is loose on purpose: the two failure modes are not symmetric.
Junk in the dataset is an afternoon of cleanup; a real customer silently
blocked is a lost sale, and this endpoint is reached from shared office and
mobile-carrier NAT addresses more often than from a single household. A
rejection never blocks the customer either way — every caller is
fire-and-forget, so a 429 costs the archive copy and not the conversation.

Verified: eleventh and twelfth rapid POSTs to `/api/leads` from one address
returned 429 after ten 201s.

**It is per serverless instance.** It stops a retry loop and a curl script, not
a distributed attacker. Anything more needs a WAF rule or a shared store, and
`lib/rate-limit.ts` says so at the top rather than implying more than it does.

### Still open

- Counting is by document. For totals, the GROQ snippets in the schema docblock
  paste straight into Vision — including a clicks-vs-leads pair that is the
  closest thing to a conversion rate this site can honestly produce.
- Nothing links a click to the lead it may have produced, and nothing should
  without an identifier — which is the thing the privacy stance rules out.

---

## Release 2026-08-28 — the eight /business-signs industry landing pages

The B2B industry cluster from Section 6C of
[13-news-editorial-and-new-pages-blueprint.md](../13-news-editorial-and-new-pages-blueprint.md),
built and live. The consumer `/custom-signage/*` collection pages in the same
blueprint were **not** built: that hub is a positioning decision, not a slug
decision, and it is still open.

### The slug rename that came first

The three planning documents disagreed with each other before any code was
written, and doc 13 disagreed with itself — its Section 4A table used
`offices-reception` and `restaurants-bars` while its own Section 6C had already
replaced them. Reconciled across all three, on the rule that a slug matches the
head term it is meant to rank for rather than an internal category label:

| Was | Now | Why |
|---|---|---|
| `restaurants-bars` | `bar-signs` **+** `restaurant-signs` | Two head terms (4,400 and 2,900), two intents, and the competitor ranks two separate pages. |
| `offices-reception` | `office-signs` | `office signs` is 2,900/mo at $9.82 CPC. "offices-reception" matches no query. |
| `gyms-fitness-studios` | `gym-fitness-signs` | `gym neon sign`, 590/mo at SD 23 — the lowest difficulty on the map. |
| `salons-spas` | `salon-spa-signs` | Matches `salon neon sign`. |
| `events-trade-shows` | `trade-show-signs` | Renamed, and deliberately kept in the B2B cluster. |
| — | `open-signs` | New. `neon open sign`, 3,600/mo; the competitor's equivalent earns 3,342 visits/mo. |
| `retail-storefronts` | unchanged | No head-term data yet, so not renamed on guesswork. |

Section 6C had folded trade shows into a consumer `/custom-signage/event-signs`
page alongside birthdays and parties. Exhibitor intent is commercial and buys
differently; one page serving both ranks for neither, so trade shows stayed in
`/business-signs` and the consumer event page was left to the unbuilt hub.

### Shipped

| ID | Change | Evidence |
|---|---|---|
| — | `lib/industry-pages.ts` — all eight pages as data: metadata, copy, materials, considerations, applications and five FAQs each. One source for the slugs, which lib/routes.ts and the audit both read. | `lib/industry-pages.ts` |
| — | `components/business-signs/industry-page.tsx` — the single renderer behind all eight, so they cannot drift in structure or schema the way the four hand-copied sign-type pages already have. | 8 route files, 12 lines each |
| TECH-05 | Eight routes registered in `lib/routes.ts`, spread from `INDUSTRY_PAGES` rather than hand-listed, at `lastModified: 2026-08-28`. All eight prerender static and appear in the sitemap. | `/sitemap.xml` |
| TECH-20 | `scripts/seo-audit.mjs` manifest parser generalised. It special-cased the `PRODUCT_PAGES` spread by reading that one catalog; a second spread would have been silently skipped by every check. Both catalogs now expand through one loop. | audit covers 50 routes, was 42 |
| TECH-04 | Eight titles, all under the 60-char ceiling once the ` | The Glownique` template is applied — 45 to 55 rendered. | `npm run seo:audit` |
| — | Schema per page: `CollectionPage` + `ItemList` of the sign types that suit the industry + `BreadcrumbList` + `FAQPage`. Not `Product` — these sell a category to an industry, not one purchasable item. No `AggregateRating` anywhere: the brand cannot mark up its own reviews. | JSON-LD parsed on every page |
| — | Internal linking closed both ways. The hub's industry cards were static text; they now render from `INDUSTRY_PAGES` as links, and each industry page links back to all four sign-type pages. | hub → 12 children, each child → 4 |

### Claims

Copy on these pages restates only claims already carrying evidence in
[claims-and-proof-register.csv](claims-and-proof-register.csv): the 5-year
warranty (CLM-004), the free design mockup (CLM-003), IP67 outdoor
construction (CLM-008), 12V shatterproof silicone (CLM-009) and Pantone/HEX
matching (CLM-010).

No page states a price, a lead time, a delivery cost, a customer count or a
rating. CLM-002 (lead time) is still an open conflict and CLM-001 (free
delivery) is retired, which the audit enforces. Where a page would naturally
have reached for proof we do not have — customer photos, template galleries
with prices, testimonials — it says nothing instead.

Each page also states plainly that we do not install: national supply,
customer-arranged local contractor for mounting, electrical connection, permits
and landlord consent.

### Still open

- **The consumer hub is undecided.** `wedding signs` is 14,800/mo at SD 39 —
  the largest volume on the whole map — but it is consumer intent at $1.88 CPC
  against `office signs` at $9.82, and `/custom-signage` currently exists as
  the broad product catalog, not an occasion hub. Building it changes what that
  page means. The rows are mapped and marked `POSITIONING DECISION PENDING`.
- **Two pages have no volume data.** `retail-storefronts` and
  `trade-show-signs` shipped on the strength of the cluster rather than their
  own numbers. Validate before investing further in them.
- **No first-party proof on any of the eight.** Every page would convert better
  with real project photography from that industry. `/projects` does not exist
  yet, and these pages are its most obvious consumer.
- **IndexNow not submitted.** `npm run indexnow` should be run against the
  eight new paths once this is deployed to production.

---

## Release 2026-08-28b — the /custom-signage collection pages, and one shared renderer

The three consumer collection pages the previous release deliberately held
back. The positioning question it left open — whether a B2B commercial supplier
should also chase consumer occasion search — was answered: build it.

### The refactor that came first

The previous release shipped eight pages through one renderer that had
`/business-signs` and "Business Signs" hardcoded in its breadcrumb, its schema
trail and both CTAs. Three more pages under a different hub would have meant
either a second 250-line copy of it or a hub-shaped hole in the first one.

So the shape moved out ahead of the content:

| File | Holds |
|---|---|
| `lib/landing-pages.ts` | The `LandingPage` shape, the claims policy, `landingMetadata()`, `landingPath()`, `requireLandingPage()`, and `SIGN_TYPE_HREF` — the four sign-type destinations every landing page routes toward. |
| `lib/industry-pages.ts` | The eight B2B entries. Content only now. |
| `lib/collection-pages.ts` | The three consumer entries. |
| `components/landing/landing-page.tsx` | The renderer, moved from `components/business-signs/` and made parent-aware. |

Each catalog attaches its own hub once for the whole family rather than
repeating it on every entry:

```ts
export const COLLECTION_PAGES: readonly LandingPage[] = COLLECTION_CONTENT.map((page) => ({
  ...page,
  parent: { href: "/custom-signage", label: "Custom Signage" },
  footerLink: { href: "/custom-signage", label: "Browse All Sign Types" },
}));
```

Verified after the move that the eight B2B pages still render "Business Signs"
in the breadcrumb and the schema trail — the refactor was meant to be invisible
to them and is.

### Shipped

| ID | Change | Evidence |
|---|---|---|
| — | `/custom-signage/wedding-signs` — `wedding signs`, 14,800/mo at SD 39, the largest volume on the keyword map. `wedding neon sign` (2,900) is a supporting term on the same page, not a second page. | route renders, in sitemap |
| — | `/custom-signage/home-decor-signs` and `/custom-signage/event-signs`. Both ship on competitor traffic proof rather than their own head-term data, and are marked P2 accordingly. | keyword map SIG-EVENT, SIG-HOMEDECOR |
| TECH-05 | Three routes spread from `COLLECTION_PAGES` into `lib/routes.ts` at `lastModified: 2026-08-28`. `/custom-signage` itself moved to that date and to priority 0.85: its content materially changed when it gained an occasion section. | `/sitemap.xml` |
| TECH-20 | `scripts/seo-audit.mjs` gained a third catalog line. Audit now covers 53 routes, up from 50. | `npm run seo:audit` |
| — | `/custom-signage` is now a hub as well as a catalog: a "Shop by Occasion" section links the three collections, and an `ItemList` in its schema names them. It previously had no route into any child. | hub → 3 children |
| — | Same schema per page as the B2B set: `CollectionPage` + `ItemList` + `BreadcrumbList` + `FAQPage`, no `AggregateRating`. | JSON-LD parsed on all three |

### Two content decisions worth recording

**No channel letters in the consumer catalog.** `SIGN_TYPE_HREF.channel` is
deliberately unused in `lib/collection-pages.ts` — fabricated exterior metal
lettering is a storefront product and none of these three audiences buys one.
Listing all four everywhere would have padded the choice rather than helped it.

**`event-signs` is consumer only.** Section 6C of the blueprint originally
folded trade-show signage in with birthdays and parties. Exhibitor intent is
commercial and buys differently, so trade shows stayed at
`/business-signs/trade-show-signs` and this page covers parties and
celebrations. Two pages, two intents, no cannibalisation.

### Claims

Unchanged from the previous release, and the consumer pages are the ones where
this bites hardest. Wedding and party buyers ask about price and delivery
timing first, and both are things we cannot state: CLM-002 (lead time) is an
open conflict and CLM-001 (delivery) is retired. Every page answers what it can
— battery versus plug, mounting, colour temperature, how it photographs — and
says nothing where the evidence does not exist.

The blueprint's Section 6D anatomy asks for a "curated template showcase with
starting prices". That section is not built, because there are no approved
prices and no template catalog. It is the largest remaining gap on these three
pages.

### Still open

- **Prices are the conversion blocker here, not the copy.** A consumer buying a
  wedding sign compares on price and lead time before anything else. Until
  CLM-002 is resolved and a price basis is approved, these pages send everyone
  to a WhatsApp quote for a question the competition answers on the page.
- **No real customer photography.** Every image on these three is a product
  shot. Wedding and party collections convert on real customer photos more than
  any other category, and the competitor pages that outrank us lead with them.
- **`home-decor-signs` and `event-signs` have no validated head terms.**
  Validate before investing further; `wedding-signs` is the one with evidence.
- **IndexNow still not submitted.** `npm run indexnow` covers all eleven new
  paths from both releases once this is deployed.

## 2026-09-14 — Pillar post prepared: backlit signs vs ultra-thin light boxes (NOT YET LIVE)

Written and validated, not published. `scripts/blog-posts/backlit-signage-vs-light-box-signs.mjs`
holds the post (3,700 words, 8 sections, 3 tables, 8 FAQs, 5 sources, Sign Basics). Slug and
keywords realigned 2026-09-14 to Ubersuggest volume: `backlit signage` (1,900/mo, SD 28,
unowned) and `light box sign` (1,300/mo, SD 26) lead; secondary terms are recorded in the
new planning-only `secondaryKeywords` field on the post schema,
and `scripts/publish-blog-post.mjs` is a new single-post runner that validates the
schema rules offline and writes through the API or exports NDJSON.

Angle: halo BACKLIT signs specifically, interior/covered spaces, the wall as an
optical component, edge-lit light-guide mechanics, driver placement, the ADA
§307.2 4-inch protrusion rule, and hybrid placement. Deliberately distinct from
the reserved storefront guide `/guides/lightbox-vs-channel-letters` (GUIDE-LIGHTBOX-VS-CHANNEL).
No prices, no shipping cost, no lead time; VALIDATION_REQUIRED component claims
(100k hours, 80 % power, blanket IP67, cool-to-touch) are not repeated.

### Blocked

- `SANITY_API_WRITE_TOKEN` is a **viewer** robot token (`/users/me` → role read);
  every mutation and asset upload fails with `permission "create" required`.
- The Sanity CLI is logged in to a different account (only project `ebwfqvlr`).
- Once either is fixed: `node scripts/publish-blog-post.mjs scripts/blog-posts/backlit-signage-vs-light-box-signs.mjs --write --publish`
  or export with `--ndjson tmp/<slug>.ndjson` and `npx sanity dataset import tmp/<slug>.ndjson production --replace`,
  then `npm run indexnow`.

### Also found

- The 7 seeded launch posts in `scripts/blog-seed/content.mjs` were never written;
  the 8 live posts have different slugs. Body links now target live slugs only.
- Latent bug in `seed-blog.mjs`: body images were spread with `_type: "image"`,
  which the renderer skips as unknown. Fixed to keep `_type: "blogImage"`.
