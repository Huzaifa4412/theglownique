/**
 * Pillar post: halo backlit signs vs ultra-thin light boxes.
 *
 * Published with `node scripts/publish-blog-post.mjs scripts/blog-posts/<this file>`.
 *
 * ── Why this angle ──────────────────────────────────────────────────────────
 *
 * The keyword map reserves /guides/lightbox-vs-channel-letters for the
 * storefront question (cost, wind load, zoning, readability at distance). This
 * post deliberately takes the other half of the intent: halo BACKLIT signs
 * specifically, interior and covered spaces, the wall as an optical component,
 * and how one venue combines both formats. Competitor comparison pages
 * (reviewed 2026-09-14: aoos.com, signliteled.com, texasprintsigns.com,
 * led3dsigns.com) all compare front-lit cabinets against front-lit letters and
 * none of them covers standoffs, wall finish, driver placement, edge-lit optics
 * or hybrid placement — which is the gap this article fills.
 *
 * ── Claims discipline ───────────────────────────────────────────────────────
 *
 * No prices, no shipping cost, no lead time (CLM-001/002). Component-level
 * claims still marked VALIDATION_REQUIRED in the claims register — 100,000
 * hours, 80 % less power, blanket IP67, "cool to touch" — are not repeated
 * here. Where a figure is general trade guidance rather than our own
 * measurement it is attributed in `sources`.
 */

import {
  a,
  b,
  callout,
  cta,
  h2,
  h3,
  image,
  ol,
  p,
  pullquote,
  table,
  ul,
} from "../blog-seed/portable-text.mjs";

/** Images the runner uploads before writing the document. */
export const imageFiles = {
  "halo-salon": "public/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.webp",
  "lightbox-round": "public/ultra-thin-slim-lightbox/Lobbies & branding.jpg",
  "lightbox-menu": "public/ultra-thin-slim-lightbox/Menu boards.jpg",
};

/**
 * Slug and keywords come from the Ubersuggest export in
 * SEO-Optimization/resources/ubersuggest-keywords-before-cleanup-2026-08-21.csv:
 *
 *   backlit signage          1,900/mo  SD 28   (dropped in cleanup: no page owned it — this post does)
 *   light box sign(age)      1,300/mo  SD 26   (two words out-searches "lightbox signs", 720 at SD 49)
 *   custom backlit sign        590/mo  SD 35
 *   led backlit signage        480/mo  SD 34
 *   backlit letters            260/mo  SD 13
 *   halo lit letters           210/mo  SD 31
 *   edge lit signs             210/mo  SD 23
 *   led light box sign         170/mo  SD 19
 *   reverse channel letter signs 140/mo SD 11
 *
 * "backlit neon sign" and "ultra thin light box" have no volume data, so they
 * stay in the copy as descriptive phrases but no longer carry the slug or H1.
 * Product pages keep the commercial variants (custom lightbox signs, led light
 * box sign); this post owns the informational comparison.
 */
const slug = "backlit-signage-vs-light-box-signs";

export const post = {
  _id: `post-${slug}`,
  slug,
  title: "Backlit Signage vs Light Box Signs: Which Illuminated Sign Belongs on Which Wall",
  categorySlug: "sign-basics",
  cover: "halo-salon",
  coverAlt:
    "Backlit signage in a salon reception: halo lit brushed-gold metal letters on a matte plaster wall, with a soft ring of warm light spilling onto the wall behind each letter",
  coverCaption:
    "Backlit signage never shows you its light source. The face stays solid, and the wall behind it does the glowing — which is why the wall is part of the specification.",
  readingMinutes: 15,
  publishedAt: "2026-09-14T09:00:00Z",
  featured: true,
  primaryKeyword: "backlit signage vs light box signs",
  secondaryKeywords: [
    "backlit signage",
    "light box sign",
    "led light box sign",
    "custom backlit sign",
    "led backlit signage",
    "backlit letters",
    "halo lit letters",
    "reverse channel letter signs",
    "edge lit signs",
    "ultra thin light box",
    "backlit lobby signs",
  ],
  seoTitle: "Backlit Signage vs Light Box Signs: Which to Choose",
  seoDescription:
    "Backlit signage or an LED light box sign? How halo lit letters and ultra-thin edge-lit light boxes work, which wall suits each, and when a business needs both.",
  summary:
    "Backlit signage borrows the wall to make its glow, so it is permanent, sculptural and only as good as the surface behind it. A light box sign carries its own light and its own message, and the message can change next week. Here is how to tell which one your space needs — and why most well-planned fit-outs end up with both.",
  keyTakeaways: [
    "Backlit signage is indirect light. The face of each letter is solid, the LEDs fire backwards, and the wall does the glowing — so the wall's colour, finish and texture are part of the design, not a backdrop to it.",
    "An ultra-thin LED light box sign is a sealed optical system around 25 mm deep. The wall behind it is irrelevant, and the graphic inside it swaps in under a minute without tools.",
    "Choose halo for the thing that will not change: the name on the reception wall. Choose the light box for anything that will: menus, prices, campaigns, seasonal offers.",
    "Standoff distance, wall finish and where the driver lives decide whether a halo sign looks expensive or looks like a row of dots. All three are decided before anything is built.",
    "Most good venues do not pick one. They put a single halo sign where the brand lives and light boxes where the messages change, and the two formats stop competing.",
  ],

  body: [
    p(
      "Almost every business that searches for backlit signage — or for a “backlit neon sign” — is not, in the end, buying anything with neon in it. They are buying one of two LED products that behave completely differently in a room: ",
      b("halo backlit letters"),
      ", where the letters are solid and the wall glows behind them, or an ",
      b("LED light box sign"),
      ", where a slim aluminium frame lights a printed graphic from edge to edge. Both are low-voltage LED. Both photograph well. That is roughly where the similarities end.",
    ),
    p(
      "Most comparison articles online are still fighting the last war — glass neon against LED, or a fat fluorescent cabinet against channel letters on a storefront. If you are fitting out a reception, a salon, a clinic, a café or a shop interior, that is not the choice in front of you. This guide is about the choice that is: sculptural indirect light versus a flat, changeable illuminated panel, and how the two share a space.",
    ),

    h2("What is backlit signage, and what is a light box sign?"),
    p(
      "Backlit signage is any sign lit from behind rather than through its face. In practice, for a business interior, it means one of two things — and buying the wrong one usually starts with the wrong word. Three definitions, so we are talking about the same objects:",
    ),
    ul([
      [
        b("Halo backlit letters (also “reverse channel letters”, “halo lit letters”, “reverse-lit”). "),
        "Each letter or logo element is a shallow metal or acrylic channel with an opaque face and a translucent or open back. LEDs inside fire backwards onto the wall. The letters sit on short standoffs, so the light escapes around them as a soft ring — the halo. The face itself is never lit. This is what most people mean by a custom backlit sign for a lobby or reception. Our version is fabricated in stainless steel; see ",
        a("3D metal backlit letters", "/business-signs/channel-letter-signs"),
        ".",
      ],
      [
        b("Ultra-thin LED light box sign (also “slim light box”, “edge lit sign”). "),
        "A rigid aluminium frame under about an inch deep, with LEDs along the edges firing sideways into a clear acrylic light guide plate. The plate turns edge light into an even glow across the whole face, which illuminates a printed film held under a snap frame or magnetic cover. Ours is described on the ",
        a("ultra-thin lightbox page", "/business-signs/lightbox-signs"),
        ".",
      ],
      [
        b("Cabinet light box. "),
        "The traditional storefront box: a deep enclosure, 100 mm or more, with lamps or LED modules behind a translucent face. It is a different product with different rules, and it is not what this article — or our catalogue — means by “light box”.",
      ],
    ]),
    callout(
      "note",
      "Where the neon went",
      "“Neon” now describes a look rather than a gas. LED neon flex — the bendable glowing tube on an acrylic backboard — is a third product again, and it is the right answer for a script word or a phrase, not for a solid logo or a menu. This article stays with halo signs and light boxes; the custom neon sign page covers the tube.",
    ),

    h2("How halo lit backlit letters make their light"),
    p(
      "The whole character of backlit letters comes from one decision: the light never travels towards you. It leaves the back of the letter, hits the wall, and only reaches your eye after bouncing off plaster, paint, timber or stone. Three things follow from that, and each one is a specification you have to make before we cut any metal.",
    ),

    h3("The wall is part of the sign"),
    p(
      "Because the wall is doing the reflecting, the wall decides what the halo looks like. The trade has known this for decades, and the guidance is consistent: halo letters want a ",
      b("matte, mid-to-light surface"),
      ". Painted plaster, limewash, stucco, smooth render and light timber all produce a broad, even wash. Dark matte walls absorb most of the light and give you a tight, moody outline rather than a glow — sometimes exactly what a cocktail bar wants, rarely what a clinic wants. Deep-textured brick or stone scatters the light and breaks the halo into patches.",
    ),
    p(
      "Gloss is the one surface that fails outright. A glossy or mirror-finish wall reflects the individual LED modules, so instead of a halo you see a row of bright dots and the mounting hardware behind the letters. The standard fix for both gloss and rough masonry is a ",
      b("backer panel"),
      " — a thin matte plate, usually painted metal or white polycarbonate, mounted first, with the letters standing off from that. It costs a little depth and gives you back control of the surface.",
    ),
    table(
      "How common wall finishes change a halo",
      ["Wall finish", "What the halo does", "What to specify"],
      [
        ["Matte white or off-white plaster", "Broad, soft, even wash", "Nothing extra — the ideal case"],
        ["Mid-tone matte paint, light timber", "Slightly tighter wash, warmer tone", "Choose LED colour temperature to suit the wall"],
        ["Dark matte paint, charcoal, deep green", "Tight, dramatic outline; little spread", "Shorter standoffs, or a lighter backer panel if you want more glow"],
        ["Smooth brick, rendered block", "Even enough; texture adds character", "Check joint depth — deep mortar lines create shadow bands"],
        ["Rough brick, split-face stone, timber cladding", "Patchy, broken halo", "Backer panel behind the letters"],
        ["Gloss paint, tile, polished stone, mirror", "Visible LED dots and hardware", "Backer panel, always"],
      ],
      "General trade guidance for reverse-lit channel letters; see sources. Your mockup shows the effect on your actual wall photo.",
    ),

    h3("Standoff distance"),
    p(
      "Standoffs are the short posts that hold each letter off the wall, and their length sets the shape of the halo. Too close and the light has nowhere to spread: you get a hot, hard ring right at the letter edge. Too far and the wash spreads so wide that the letter loses definition and the halo dims. The trade’s traditional figure was about 38 mm (1.5 in), a holdover from the days when a neon tube sat inside the channel. With small, wide-angle LED modules most fabricators now sit closer, around 20 to 25 mm (0.75 to 1 in), and treat 40 mm as the top of the range rather than the default.",
    ),
    p(
      "The right number for your sign depends on the letter size, the wall and how much glow you want. Larger letters and lighter walls tolerate longer standoffs; small letters and dark walls want them short. This is one of the things a mockup on your own wall photo settles quickly.",
    ),
    callout(
      "tip",
      "Photograph the wall twice",
      "Send us the wall in daylight and again at night with the room lit the way it normally is. Halo signs live or die on that second photo — the ambient light level decides how bright the halo needs to be and whether a warm or cool white will sit right against the paint.",
    ),

    h3("Why it photographs so well"),
    p(
      "A phone camera struggles with any bare light source in frame: the sensor exposes for the bright point and the rest of the picture goes dark. A halo sign has no bare light source facing the lens. What the camera sees is a lit wall and a solid metal letter in silhouette, both within a range it can handle, so the brand name reads cleanly in customer photos and reels without the blown-out glare of a front-lit face. For any business that expects to be photographed — salons, cafés, boutique hotels, clinics with a reception selfie wall — this is a real commercial argument, not an aesthetic footnote.",
    ),

    h2("How an ultra-thin LED light box sign makes its light"),
    p(
      "An edge lit sign solves the opposite problem: how to light a large flat area evenly from a frame with almost no depth. Instead of putting the light source behind the face, it puts it beside the face.",
    ),
    h3("Edge light, turned forwards"),
    p(
      "High-density LEDs run along the inside of the aluminium frame and fire sideways into the edge of a clear acrylic sheet — the ",
      b("light guide plate"),
      ". Light travels through the sheet by total internal reflection, the same effect that keeps light inside an optical fibre. The back of the plate carries a printed or laser-etched pattern of tiny dots. Each dot interrupts the reflection and scatters light forwards, and the pattern gets denser further from the LEDs to compensate for the light that has already escaped. A white reflector behind the plate sends stray light back, and a diffuser sheet in front smooths whatever unevenness is left. The result is a face that glows at the same brightness in the centre as at the edges, with no hotspots and no visible lamps, inside a frame around 25 mm deep.",
    ),
    image(
      "lightbox-round",
      "Round ultra-thin LED light box sign for a coffee house mounted on a warm-toned interior wall, with the printed graphic evenly edge-lit from edge to edge and a slim rim of light visible around the frame",
      "Edge-lit and around an inch deep: the graphic is uniformly bright across the whole face, and the wall behind has no effect on the result.",
    ),
    h3("Independent of the wall"),
    p(
      "Everything that made the wall matter for a halo sign is irrelevant here. The light is generated, guided and diffused inside the box; the wall behind it can be gloss tile, dark timber or raw concrete and the graphic looks identical. That is why light boxes are the safe choice in spaces you do not control — a shopping-centre unit with a landlord’s wall finish, a rented clinic room, a pop-up.",
    ),
    h3("The graphic is the product"),
    p(
      "The frame, the plate and the wiring are fixed. The message is not. The printed film — a translucent backlit polyester, printed with dense colour so blacks stay black when lit — sits under a hinged snap frame or a magnetic front cover. Open it, slide the old print out, slide the new one in, close it. No tools, no ladder for a wall-height unit, no electrician. A restaurant changes its menu, a retailer rotates a campaign, a clinic updates its price list — the same box does all of it. The ",
      a("light box page for businesses", "/business-signs/lightbox-signs"),
      " covers single-sided wall units and double-sided window-hung versions.",
    ),
    image(
      "lightbox-menu",
      "Two slim LED light box signs mounted side by side on a restaurant wall as illuminated menu boards, with printed menu graphics, prices and food photography evenly backlit inside thin dark aluminium frames",
      "Menu boards are the light box's natural job: small type, prices and food photography, all of which change — and none of which a halo sign can carry.",
    ),
    callout(
      "note",
      "What a light box cannot do",
      "It is flat. However good the print, a light box has no depth, no shadow and no material presence in daylight. Walk into a reception with the lights off and a halo sign is still a piece of brushed metal on the wall; a light box is a white rectangle. That difference is the whole reason the two formats coexist.",
    ),

    h2("Backlit signage vs light box signs, side by side"),
    table(
      "Halo backlit letters and ultra-thin LED light box signs compared",
      ["", "Halo backlit sign", "Ultra-thin light box"],
      [
        ["Light path", "Indirect — bounces off the wall", "Direct — edge-lit through a light guide plate"],
        ["Depth off the wall", "Letter depth plus standoff; typically 40–90 mm overall", "About 25 mm, flush-mounted"],
        ["Depends on wall finish?", "Yes — matte and mid-to-light is best", "No"],
        ["What it can show", "Letterforms, logo shapes, one or two colours", "Photographs, fine type, gradients, tables of prices"],
        ["Changing the message", "Re-fabrication", "Swap the print, under a minute, no tools"],
        ["Daytime presence", "Strong — solid metal with real shadow", "Neutral — a framed graphic"],
        ["Best distance", "Close to mid-range, where the material reads", "Any, provided the type is sized for it"],
        ["Routine care", "Dust the tops of letters and standoffs", "Wipe the face; change the print"],
        ["Cost shape", "Higher fabrication, no recurring cost", "Lower to start; a print each time it changes"],
        ["Feels like", "Architecture", "Communication"],
      ],
      "Depth figures are typical for the builds we quote; exact dimensions depend on letter height and mounting. No prices are stated here — the cost guide explains why quotes vary.",
    ),
    p(
      "The last row is the useful one. A halo sign is a piece of the building. A light box is a piece of the conversation the business is having with its customers this month. Once you frame it that way, most placement decisions make themselves.",
    ),

    h2("Which illuminated sign for which wall"),
    table(
      "A decision shortcut",
      ["If this is true", "Choose"],
      [
        ["It is the brand name or logo, and it will not change for years", "Halo backlit"],
        ["It will be in the background of customer photos", "Halo backlit"],
        ["The wall is matte plaster, paint, render or smooth timber", "Halo backlit"],
        ["The content includes prices, a menu, small type or a photograph", "Ultra-thin light box"],
        ["The message changes seasonally, monthly or weekly", "Ultra-thin light box"],
        ["You do not control the wall finish, or it is gloss or tile", "Ultra-thin light box, or halo with a backer panel"],
        ["It has to hang in a window and be read from both sides", "Double-sided light box"],
        ["It must read from across a car park or down a street", "Front-lit or dual-lit letters — see the lighting guide"],
        ["The logo has five colours and fine illustration", "UV-print acrylic sign, not either of these"],
        ["It is a single script word for a feature wall", "LED neon flex"],
      ],
    ),
    p(
      "The last three rows matter. A halo sign is not the strongest storefront format: at distance and in daylight a lit face wins, which is what the ",
      a("front-lit vs halo-lit vs dual-lit guide", "/guides/front-lit-vs-halo-lit-vs-dual-lit"),
      " is for. A busy multicolour mark is better served by ",
      a("UV print on acrylic with neon accents", "/business-signs/acrylic-logo-signs"),
      " than by either format here. We make all of these, so there is no reason for us to steer you towards the wrong one — and a mockup in the wrong format is a cheap way to find out before production.",
    ),

    h2("The hybrid framework: most good spaces use both"),
    p(
      "Walk through a well-designed café, clinic or boutique and you will usually find backlit lobby signs and light box signs already working together, whether or not anyone planned it. The pattern is consistent enough to write down.",
    ),
    ul([
      [
        b("One backlit sign where the brand lives. "),
        "The reception wall, the back bar, the wall behind the till — wherever a customer's eye settles first and where photographs get taken. One sign, the name or the mark, and nothing else on that wall competing with it.",
      ],
      [
        b("Light boxes where the messages change. "),
        "Menus above the counter, a price list in the treatment corridor, a campaign panel at the entrance, a double-sided unit in the window. These carry the information the halo sign cannot, and they can be updated without touching the brand wall.",
      ],
      [
        b("Nothing that does both jobs badly. "),
        "The classic mistake is a single front-lit box with the logo and the offers on one face. It changes too often to feel permanent and too rarely to be current, and it photographs like an airport.",
      ],
    ]),
    p("Three layouts we are asked about most often:"),
    ol([
      [
        b("Café or restaurant. "),
        "Halo wordmark on the wall behind the counter, at eye level for a standing customer. Two or three slim light boxes as menu boards above the counter, same frame size, same colour temperature. A double-sided light box in the window if the frontage is glass. See the ",
        a("restaurant signage page", "/business-signs/restaurant-signs"),
        ".",
      ],
      [
        b("Clinic, practice or office reception. "),
        "Halo logo on the wall behind the desk, sized so it clears the top of the receptionist's head in the standard photo. One light box in the waiting area for services or pricing, one in each treatment corridor if wayfinding is needed. Warm white for the halo if the fit-out is timber and plaster; neutral white if it is cool and clinical. The ",
        a("office signage page", "/business-signs/office-signs"),
        " has more on finishes.",
      ],
      [
        b("Salon, spa or boutique. "),
        "Halo wordmark as the feature wall — often in brushed gold or black against plaster, as in the photograph at the top of this article. Light boxes only where there is a genuine changing message: a seasonal treatment menu, a product promotion. Resist adding a second lit brand element; the halo does that job alone. The ",
        a("salon and spa page", "/business-signs/salon-spa-signs"),
        " shows how this plays out.",
      ],
    ]),
    pullquote(
      "Put the permanent thing in metal and light and the changing thing behind glass. The moment you mix them up, both start to look wrong.",
    ),

    h2("The installation questions nobody puts on the product page"),
    p(
      "This is the part that stops businesses ordering online. A photograph of a finished sign says nothing about where the cable went, what the wall was made of or how the installer knew where to drill. Here is what actually happens.",
    ),
    h3("Where does the driver live?"),
    p(
      "Both formats run on low-voltage direct current from a driver — a power supply that plugs into an ordinary socket and converts mains to 12 V or 24 V. The sign never carries mains voltage. That gives you freedom about where the driver goes, with three constraints: it needs a socket, it needs some air around it, and someone needs to be able to reach it in five years when it is the part that fails. Common homes for it are a cupboard behind the reception desk, a shelf inside the back bar, a ceiling void with an access panel, or a small ventilated box on the wall below the sign line.",
    ),
    p(
      "The low-voltage cable from driver to sign is what gets hidden. Through a stud wall it drops behind the plasterboard to the socket below. On a solid wall it runs in a shallow chase that is plastered over, or in a slim surface trunking painted to match. One rule from the trade that is worth repeating: never bury a splice inside the wall. Make the cable long enough to reach the driver, and put every joint where a hand can get to it. Local electrical rules still apply to the mains side — if you need a new socket where the driver will sit, that is an electrician's job, and it is worth having it done before the sign arrives rather than after.",
    ),
    h3("Templates, anchors and the wall you actually have"),
    p(
      "A halo sign with individual letters arrives with a full-size paper template: every letter outline, every standoff position and every cable exit marked, with a level line to align it. Tape it up, check it with a level and a tape measure from a fixed reference — a door frame, not the floor — drill through the marks, and take it down. A light box is simpler: a single bracket or a pair of keyhole fixings, marked from the frame itself.",
    ),
    p("What goes into the holes depends on the wall:"),
    ul([
      [
        b("Plasterboard or drywall. "),
        "Fix into the timber or metal studs wherever a standoff lands on one, and use proper hollow-wall anchors rated for the load elsewhere. A halo letter is light; a run of them on standoffs is not.",
      ],
      [
        b("Brick or block. "),
        "Drill into the brick, not the mortar joint, with a masonry bit and use sleeve or expanding anchors. If a standoff lands on a joint, the template can usually be shifted a few millimetres as a whole.",
      ],
      [
        b("Marble, tile or polished stone. "),
        "Diamond core bits, low speed, water to keep the bit cool, and never within a couple of centimetres of an edge or grout line. This is the one wall where we would suggest a professional installer rather than a handy owner, because a cracked slab is expensive and a backer panel with concealed fixings is often the cleaner answer anyway.",
      ],
      [
        b("Timber panelling or cladding. "),
        "Screws straight into solid timber are fine. On thin cladding, find the battens behind it.",
      ],
    ]),
    p(
      "The ",
      a("acrylic office sign guide", "/blog/custom-acrylic-signs-office-wall-guide"),
      " walks through standoff barrels and levelling step by step; the principles are the same for a metal letter as for an acrylic panel.",
    ),
    h3("Protrusion into walkways"),
    p(
      "One rule catches people out in corridors and narrow dining rooms. In the United States, the ADA Standards limit wall-mounted objects along a circulation path to a ",
      b("4 in (about 100 mm) projection"),
      " when their leading edge sits between 27 in and 80 in above the floor — the band a person using a cane will not detect. Other countries have equivalent building rules. An ultra-thin light box at about 25 mm is comfortably inside that limit; halo letters on standoffs usually are too, but a deep letter on a long standoff in a tight corridor can approach it. If the sign is going anywhere people walk past rather than towards, tell us the corridor width and we will keep the build inside the limit.",
    ),
    h3("Outdoors, windows and wet rooms"),
    p(
      "Both formats can be built for covered exterior and damp locations, but the phrase to be careful with is “waterproof”. An ingress-protection rating such as IP65 or IP67 is a test result for a component — an LED module, a driver, a sealed housing. An installed sign is that component plus a cable entry, fixings and the wall behind it, and the installation as a whole is only as protected as its weakest joint. So the useful question is not “is it waterproof” but ",
      b("“what is rated, and how is the cable entry sealed?”"),
      " Tell us the exposure — a covered entrance, an open façade, a window in full sun, a spa treatment room with steam — and we will specify the build and the seal for it, or tell you honestly that a different format suits that location better.",
    ),
    callout(
      "warning",
      "The one that costs a remake",
      "Halo letters on a gloss or tiled wall with no backer panel. Every LED module reflects in the surface, the halo never forms, and the only fixes are to add a panel after the fact or to change the wall. It is entirely avoidable — it is why we ask for a wall photo before quoting.",
    ),

    h2("What to send us for a mockup"),
    p(
      "We build a free digital mockup before any production starts, and the quality of the mockup depends on what we get. For either format, six things:",
    ),
    ol([
      "Your logo or wordmark as a vector file (AI, EPS, SVG or PDF). A PNG works for a first look but not for fabrication.",
      "A photo of the wall, straight on, in daylight and again with the room lit at night.",
      "The wall's width and height, and what it is made of — plaster, brick, tile, timber.",
      "Where the nearest socket is, and whether there is a cupboard, counter or ceiling void nearby for the driver.",
      "The typical viewing distance — across a desk, across a room, from the street.",
      "For a light box: what will go in it, how often it will change, and whether it needs to be read from both sides.",
    ]),
    p(
      "We come back with the sign placed on your own wall photo, at scale, in the finish and lighting style you asked for — and if we think you have asked for the wrong format, we will say so and show you the alternative next to it. Once you approve, payment goes through our verified Etsy shop, with Etsy Purchase Protection on eligible orders, and every sign carries our 5-year warranty.",
    ),

    cta(
      "Planning a reception wall, a menu run or both?",
      "Send the wall photo and your logo. We will mock up a halo sign, a light box or the pair together on your actual wall, free, before you commit to anything.",
      "Get a free mockup on your wall",
    ),
  ],

  faqs: [
    {
      q: "What is backlit signage?",
      a: "Backlit signage is any sign lit from behind rather than through its face. For business interiors it usually means halo lit letters — solid metal or acrylic letters with LEDs inside that fire backwards onto the wall, producing a soft ring of light around each letter — or an LED light box sign, where a printed graphic is lit evenly from behind by a slim edge-lit panel. Both run on low-voltage LED.",
    },
    {
      q: "Is a backlit neon sign actually neon?",
      a: "Almost never. What businesses call a backlit neon sign is usually a set of halo backlit letters: solid metal or acrylic letters with LEDs inside that fire backwards onto the wall. There is no gas and no glass tube. LED neon flex — the bendable glowing tube — is a separate product suited to script words and phrases rather than solid logos.",
    },
    {
      q: "How far should halo lit letters sit off the wall?",
      a: "Trade guidance puts standoffs between roughly 20 and 40 mm (0.75 to 1.5 in). Shorter standoffs give a tighter, brighter ring; longer ones give a broader, softer wash that eventually loses definition. With modern wide-angle LED modules, 20 to 25 mm is a common starting point, adjusted for letter size and wall colour. The mockup on your own wall photo is the quickest way to settle it.",
    },
    {
      q: "Can a halo backlit sign go on a dark or glossy wall?",
      a: "Dark matte walls work but change the effect: the wall absorbs most of the light, so you get a tight, dramatic outline rather than a broad glow. Glossy, tiled or mirror-finish walls do not work without help, because the individual LED modules reflect in the surface. The fix in both cases is a thin matte backer panel behind the letters, which gives the light a controlled surface to bounce off.",
    },
    {
      q: "How thin is an ultra-thin LED light box sign?",
      a: "Our slim light box signs are under an inch deep — around 25 mm — including the frame. That is possible because the LEDs sit along the edges and fire sideways into an acrylic light guide plate, rather than sitting behind the face as they do in a traditional cabinet light box that is typically 100 mm or more deep.",
    },
    {
      q: "Can an ultra-thin light box be used outdoors or in a shop window?",
      a: "In a window, yes — including double-sided ceiling-hung versions read from both inside and out. For covered exterior or damp locations, both light boxes and halo signs can be built with appropriately rated components, but ask what is rated and how the cable entry is sealed rather than accepting the word 'waterproof'. Tell us the exposure and we will specify the build for it, or recommend a different format if that location does not suit.",
    },
    {
      q: "Should a business choose backlit signage or a light box sign?",
      a: "Usually both, in different places. Backlit letters for the permanent brand identity — the name on the reception wall or behind the counter — because it has material presence in daylight and photographs without glare. Light boxes for anything that changes: menus, prices, campaigns, seasonal offers, wayfinding. A single lit box carrying both the logo and the offers tends to do neither job well.",
    },
    {
      q: "Where does the power supply for a backlit sign go?",
      a: "Both formats run on low-voltage 12 V or 24 V from a driver that plugs into a normal socket, so the sign itself never carries mains voltage. The driver needs a socket, some airflow and access for future replacement — typically a cupboard behind the desk, a shelf inside a counter or a ceiling void with an access panel. The low-voltage cable runs hidden inside the wall or in slim trunking. Never bury a cable joint inside the wall; every splice should be reachable.",
    },
  ],

  relatedLinks: [
    {
      kind: "commercial",
      label: "3D metal backlit letters",
      description: "Fabricated stainless-steel letters and logos — halo lit, front-lit or dual-lit — with finishes and mounting options.",
      href: "/business-signs/channel-letter-signs",
    },
    {
      kind: "commercial",
      label: "Ultra-thin LED light box signs",
      description: "Edge-lit slim aluminium lightboxes with snap-frame or magnetic faces for menus, displays and windows.",
      href: "/business-signs/lightbox-signs",
    },
    {
      kind: "guide",
      label: "Front-lit vs halo-lit vs dual-lit",
      description: "How the three channel-letter lighting styles read at distance, and what each wall needs.",
      href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    },
    {
      kind: "guide",
      label: "What a custom business sign costs",
      description: "The cost drivers behind illuminated signage, and why quotes vary so much.",
      href: "/guides/custom-business-sign-cost",
    },
    {
      kind: "commercial",
      label: "Custom lightbox signs for business",
      description: "Single-sided wall units and double-sided window-hung light box signs for retail, hospitality and clinics.",
      href: "/business-signs/lightbox-signs",
    },
  ],

  /**
   * Live post ids (checked 2026-09-14). The storefront piece owns the exterior
   * half of this question and has its own hybrid section; the acrylic guide is
   * the standoff install walkthrough the body links to.
   */
  relatedPosts: ["77b79853-aa7a-457b-990d-333f0affb2ea", "custom-acrylic-signs-office-wall-guide"],

  sources: [
    {
      label: "Halo-lit standoff distance (traditional 1.5 in), matte wall requirement, backer panels, colour temperature and the rule against buried splices",
      publisher: "Graphics Pro, “Hello, Halo: A Deeper Look at Halo-Lit Channel Letters” (Tony Kindelspire, 2019)",
      url: "https://graphics-pro.com/feature/hello-halo-a-deeper-look-at-halo-lit-channel-letters/",
      accessed: "2026-09-14",
    },
    {
      label: "Modern LED practice of shorter (about 1 in) standoffs and the effect of standoff length on halo spread",
      publisher: "ChannelLetter.com, “Front Lit vs Halo Lit Channel Letters”",
      url: "https://www.channelletter.com/news/front-lit-vs-halo-lit-channel-letters/",
      accessed: "2026-09-14",
    },
    {
      label: "Edge-lit light guide plate principle: total internal reflection, graded dot pattern, reflector and diffuser layers",
      publisher: "Optical Engineering, “Dot-pattern design of a light guide in an edge-lit backlight using a regional partition approach”",
      url: "https://www.researchgate.net/publication/241715350_Dot-pattern_design_of_a_light_guide_in_an_edge-lit_backlight_using_a_regional_partition_approach",
      accessed: "2026-09-14",
    },
    {
      label: "4 in maximum protrusion for wall-mounted objects with leading edges between 27 in and 80 in above the floor (§307.2)",
      publisher: "U.S. Access Board, ADA Standards Guide, Chapter 3: Protruding Objects",
      url: "https://www.access-board.gov/ada/guides/chapter-3-protruding-objects/",
      accessed: "2026-09-14",
    },
    {
      label: "IP rating definitions apply to a tested enclosure or component under stated conditions",
      publisher: "IEC 60529, Degrees of protection provided by enclosures (IP Code)",
      accessed: "2026-09-14",
    },
  ],
};

export default post;
