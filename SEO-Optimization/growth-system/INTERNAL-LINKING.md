# Internal Linking

Measured from the live crawl (2026-09-24, pre-change). "Contextual" means a link in body content, not in the header, nav or footer.

## Findings

- **No orphans**, but **15 pages had two or fewer contextual inbound links** — most of the eight industry pages had one, all from the B2B hub.
- The **B2B hub (`/business-signs`) and the guides hub (`/guides`) had no sitewide link** in the header or footer. The primary header nav is Shop, Custom Neon, Products, Journal, FAQs and Contact.
- The three `/products/*` sign-type pages received ~100 link instances each (footer, homepage sections, every collection page), while their `/business-signs/*` twins received 9–12. That is part of why the two competed rather than one leading.
- Footer defects: "Create your own" and "How it works" both pointed at `/#custom`; "About us" pointed at `/#about`, which is the footer's own id; "Case studies" pointed at a homepage gallery.
- CMS posts link to retired URLs in two places; the audit warns on each.

## Changes on the branch

| Change | Effect |
|---|---|
| One URL per sign type, all links built from `ProductPage.path` | Footer, homepage rail, video tabs, signage guide, collection pages, product top bar, related cards, `llms.txt` and homepage `ItemList` all point at the same page for each sign type |
| Footer "Explore" column | Sitewide links to `/business-signs`, `/custom-signage` and `/guides` |
| 15 contextual links from product use-case cards | Channel letters → retail, office, restaurant, salon pages; lightbox → retail, restaurant, office, open-sign pages; acrylic → office, trade-show, retail pages; neon → home-decor, wedding, bar, gaming pages. Anchor text names the destination ("Salon and spa signs"), not "Learn more" |
| Banner slides link to their product pages | Two image links with descriptive alt text as anchor |
| Footer "Case studies" → "Inspiration" | Label now matches the destination |

## Next

1. **Guides ↔ sign types.** Every guide should link to the sign type it helps choose, and every sign-type page should link its guides from a "Before you order" block. The rebuilt lighting guide (P1-5) is the first to do it.
2. **Industry pages ↔ guides.** Each industry page should link the cost guide and the lighting guide where relevant.
3. **Journal → commercial pages.** Journal posts are CMS content; an editor should add one contextual link from each post to its sign type or occasion page, using the anchors above.
4. **About us.** Replace `/#about` with a real `/about` page once it exists.
5. **Re-crawl after deploy** and regenerate `URL-INVENTORY.csv`; the target is no indexable page with fewer than three contextual inbound links.

## Anchor-text conventions

| Destination | Preferred anchors |
|---|---|
| `/business-signs/channel-letter-signs` | channel letter signs; 3D metal channel letters; front-lit, halo-lit or dual-lit letters |
| `/business-signs/lightbox-signs` | LED lightbox signs; slim edge-lit lightboxes |
| `/business-signs/acrylic-logo-signs` | acrylic logo signs; UV-printed acrylic signs |
| `/products/custom-neon-signs` | custom LED neon signs; custom neon signs |
| `/business-signs/custom-logo-neon-signs` | logo neon signs for business |
| `/business-signs/backlit-signs` | backlit signs; halo-lit signs |

Vary anchors naturally; do not repeat one exact-match phrase on every page.
