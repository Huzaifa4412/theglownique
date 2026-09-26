# How to choose a custom neon sign: research, ranking and link-building brief

Research date: 26 September 2026. Market: United States, English. Status: local editorial draft, validated offline by `scripts/publish-blog-post.mjs`; **not uploaded to Sanity or published**.

## 1. Editorial decision

The brief asked for an article on **"neon and signs"** (40,500/mo, SD 32) with three suggested titles. None of the three was used, because each would compete with a page the site already has:

| Suggested title | Would compete with |
|---|---|
| How to Choose Between LED Neon and Traditional Neon | `/guides/led-neon-vs-glass-neon` **and** `/blog/led-neon-vs-glass-neon`, which already compete with each other |
| Neon and Signs Buyer's Guide: Materials, Costs, and Where to Order | `/guides/custom-business-sign-cost` and the homepage; "costs" also cannot be answered without an approved price basis (CLM-024) |
| Creative Neon and Sign Ideas for Stores, Weddings, and Home Bars | `/blog/storefront-signage-ideas-small-businesses`, `/blog/neon-sign-ideas-for-weddings-and-events`, `/blog/custom-neon-signs-for-bars-and-cafes`, `/blog/coffee-bar-neon-sign-ideas` |

The keyword itself is also a trap. "neon and signs" reports exactly the volume of **"neon signs"** (40,500), which `growth-system/KEYWORD-MAP.csv` assigns to `/`. It is the same head term with a stop word, and Google treats it as such. An article written to it would compete with the homepage for the site's biggest query. It is therefore used once, naturally, and not targeted.

**Chosen angle: "How to Choose a Custom Neon Sign: Size, Font, Colour and Placement."** It keeps the brief's substance (sign-type differences, sizing, colour, mounting, maintenance, retail/wedding/home examples, The Glownique's mockup, warranty and delivery) under an intent nothing on the site owns: the informational buyer's guide. It is built as the **pillar of the sign-basics cluster**. Each section summarises one decision in a few paragraphs and links to the page that owns the detail, so it strengthens those pages instead of competing with them.

## 2. SERP evidence

Web search for "how to choose a custom neon sign buying guide size font colour" (26 Sept 2026) returned buyer-guide pages from direct competitors ranking for this intent, alongside product configurators:

- [Custom Neon Sign Guide: Fonts, Colors, and Lighting Choices](https://www.echoneon.com/custom-led-neon-signs/), from echoneon.com, cited in the Neon Sign SEO Strategy with DA 49 and 39.7k Pinterest shares
- [Custom Neon Sign Ideas & Buying Guide (2025)](https://neonsignlife.com/blogs/neoner-blog/custom-neon-sign-ideas-buying-guide-2025), from neonsignlife.com
- [Font and Size Guide](https://www.mkneon.com/pages/customizer-guide), from MK Neon
- [Don't Buy Custom LED Neon Signs Without This Checklist](https://www.mommyenterprises.com/custom-led-neon-signs-checklist.htm), a third-party checklist

What they share: size bands by room, font advice, colour-mood advice, "approve the preview first". What they mostly lack, and this article adds: a **decision order**, a **viewing-distance rule with a primary source** (US Sign Council), the **taped-outline test**, **backboard cut** as an explicit choice, **power and cable planning**, and a **comparison with non-neon sign types**. That is the information-gain case for ranking.

A second search ("neon signs guide LED neon vs glass neon vs lightbox vs channel letters") returned manufacturer comparisons, for example [Channel Letters vs Neon vs Light Box](https://skyseensign.com/channel-letters-vs-neon-vs-light-box/) and [Neon Signs vs Lightboxes vs Channel Letters](https://neondesigns.shop/blogs/neon-guides/neon-signs-vs-lightboxes-vs-channel-letters). This supports including the five-type comparison table, which this site can uniquely link to a canonical page per type.

Volumes for the long-tail phrases were **not measured**: the Ubersuggest daily quota and the web-search MCP balance were both exhausted on 26 Sept. Measure `how to choose a neon sign`, `neon sign size`, `neon sign font` and `custom neon sign buying guide` before judging the result, and do not invent numbers in the meantime.

## 3. On-page specification

| Element | Value |
|---|---|
| URL | `/blog/how-to-choose-a-custom-neon-sign` |
| Category | Sign basics |
| H1 | How to Choose a Custom Neon Sign: Size, Font, Colour and Placement |
| SEO title | How to Choose a Custom Neon Sign: 2026 Buyer's Guide (52 chars) |
| Meta description | 153 chars, answer-first |
| Direct answer | First paragraph, 64 words, stands alone if an answer engine lifts it |
| Structure | 7 numbered decisions as H2s, a five-type comparison table, three setting examples as H3s, an ordering list, 5 FAQs (FAQPage via the post template) |
| Images | 4 real order photographs, not AI renders, each with descriptive alt text and a caption saying so |
| Sources | US Sign Council, US National Park Service, US Department of Energy, IEC, all already verified in the site's guides |
| Claims | Only register-approved claims: free mockup, 5-year warranty, 12V, 13 colours + RGB, Pantone/HEX "as closely as the materials allow", tracked delivery with shipping confirmed at quote, Etsy Purchase Protection for eligible orders. No prices, lead times, lifespans in hours, "cool to the touch" or "shatterproof" |

**Internal links out (22):** the neon product page; the four other sign-type pages; the size, LED-vs-glass and outdoor guides; the colour, hanging, lifespan and cleaning posts; wedding, home bar, venue bar, open-sign and retail pages.

**FAQs are deliberately different from the product page's.** Lifespan and safety are owned by `/products/custom-neon-signs`'s FAQPage and are not repeated as FAQs here. This post asks about size, font, logos, electricians and seeing the sign before paying.

## 4. Internal links to add after publishing

Do these only once the post is live, or they will be dead links:

1. **Homepage "More neon sign ideas" strip** (`components/storefront/sections/neon-use-cases-section.tsx`, `NEON_IDEAS`): add "How to choose a neon sign" pointing at the post.
2. **In Sanity**, add a contextual link to the post from `/blog/how-to-choose-the-right-neon-color-for-your-sign`, `/blog/how-to-hang-a-neon-sign` and `/blog/custom-neon-signs-for-bedroom-and-home-decor`. Put it in body copy, not only "related posts".
3. **`/guides` hub:** it lists guides only. If blog pillars are to appear there, add a "Start here" link.
4. **`llms.txt`:** add the post under the blog section with its first paragraph as the answer.

## 5. Domain authority and backlinks

Domain authority is not something a page can be optimised into. It follows from other sites linking to this one. The site is about seven weeks old with almost no referring domains, which is the main reason good pages do not rank yet. The article is written to be **linkable**. These are the realistic ways to earn links to it, in order of expected return for this business.

### 5.1 Pinterest (highest leverage for this niche)

The Neon Sign SEO Strategy notes competitors with 7.5k–39.7k Pinterest shares. Pinterest pins are nofollow, but they drive real traffic and discovery, and Pinterest itself ranks in Google Images for neon queries.

1. Create boards: "Neon name signs", "Wedding neon signs", "Home bar neon", "Neon sign size guide".
2. Pin each of the article's four real photos with a keyword-led title ("Wedding neon sign above the backdrop: how to size it") linking to the article.
3. Make one tall "7 decisions before you order a neon sign" graphic (1000 × 1500) from the numbered list. This is the most shareable asset in the article.

### 5.2 A free, linkable tool: the printable size template

The taped-outline test is the article's most practical idea. Turn it into a downloadable **printable neon sign size template** (a PDF with a 10 cm grid and common script and block word lengths). Tools and templates earn links from wedding, décor and small-business blogs far more readily than articles do. Host it on the article and pitch it in 5.3.

### 5.3 Outreach to people who write for your buyers

Target sites that already write about wedding backdrops, home bars, nursery décor and small-shop windows, and whose readers ask "what size neon sign should I get?":

| Target type | How to find them | What to offer |
|---|---|---|
| Wedding blogs and planners | `"neon sign" wedding backdrop ideas`, `intitle:"wedding signage" guide` | The size template, and a real photo with credit |
| Home décor and DIY blogs | `"neon sign" bedroom ideas`, `"home bar ideas" neon` | Sizing and colour advice; quotes for their article |
| Small-business and retail blogs | `storefront window ideas small business`, `"open sign" tips` | The shop-window section and the sign-type comparison table |
| Resource and link roundups | `"neon sign" "resources"`, `"helpful links" wedding planning` | A one-line description and the template |

Send short, specific emails: one sentence on the page they wrote, one on what you are offering, the link. No templates that read as templates, no link exchanges, no paid links.

### 5.4 Expert-quote platforms (digital PR)

Answer journalist requests on **Qwoted**, **Featured.com** and **Help a B2B Writer** for queries about weddings, home décor, small-business signage and lighting. A credited quote from a named sign maker earns links from publications with real authority. This needs the named author with real experience the content plan already calls for (see `OWNER-QUESTIONS.md`); it cannot be done under a placeholder byline.

### 5.5 Links the business is already entitled to

- **Etsy shop:** make sure the shop's About section and every listing link to the site. Etsy is the highest-authority profile the brand owns.
- **Instagram and Facebook:** link the article in bio and posts; these also support entity disambiguation.
- **Suppliers and partners:** wedding venues, planners or bars that have bought a sign may list suppliers. Ask them for a credit link. Only ask real customers.
- **Business directories** relevant to the owner's actual location, once `CLM-020` (the shipping origin) is confirmed. Do not create listings for a location that is not real.

### 5.6 What not to do

Do not buy links, join link exchanges or private blog networks, mass-post comments, or fabricate "as featured in" logos. Each is a Google spam-policy violation that can suppress the whole domain. On a new domain that risk outweighs any gain.

### 5.7 How to measure

Measure the article on its own long-tail queries, not "neon signs", which belongs to the homepage. Log it in `growth-system/SEO-EXPERIMENTS.md` on publish:

- **Search Console:** impressions and average position for `how to choose a neon sign`, `neon sign size`, `neon sign font` and `custom neon sign buying guide` over 8 weeks.
- **Referring domains** to the article and site-wide, monthly, from Search Console's Links report and Bing Webmaster Tools.
- **Assisted conversions:** clicks from the article to `/products/custom-neon-signs` and to the WhatsApp quote button (PostHog).

## 6. Existing cannibalization found during research

**`/blog/led-neon-vs-glass-neon` and `/guides/led-neon-vs-glass-neon` target the same query** ("led neon vs glass neon", 1,600/mo). The guide is the fuller, sourced version. The recommended fix is to 301-redirect the blog post to the guide (in `next.config.ts`) and unpublish or noindex the Sanity post, so all signals go to one URL. This removes a live URL, so it is left as an owner decision and has not been changed. The new article links to the guide only.

The two colour posts (`how-to-choose-the-right-neon-color-for-your-sign` and `choosing-neon-sign-colours-for-your-brand`) have different intents, home and brand, and can stay separate. The new article links to both, labelled by audience.

## 7. Publishing

```bash
node scripts/publish-blog-post.mjs scripts/blog-posts/how-to-choose-a-custom-neon-sign.mjs             # dry run (passes)
node scripts/publish-blog-post.mjs scripts/blog-posts/how-to-choose-a-custom-neon-sign.mjs --write     # create as a Sanity DRAFT
```

Read the draft in `/studio`, confirm the byline is a real person, then publish from the Studio or with `--write --publish`.
