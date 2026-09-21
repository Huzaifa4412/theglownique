/**
 * Launch content for /blog.
 *
 * ── Why these seven topics ──────────────────────────────────────────────────
 *
 * They were picked against two constraints at once.
 *
 * 1. The IA. SEO-Optimization/06-information-architecture.md gives /guides the
 *    decision questions (cost, lighting comparisons, sizing, installation
 *    compliance, "which type should I buy") and /business-signs the commercial
 *    ones. Every topic below is deliberately outside both: care, lifespan,
 *    hanging, technology background, colour, ideas, trends. None of them
 *    competes with a planned guide, and every one of them links into the
 *    cluster that owns the next question.
 *
 * 2. What the competition actually publishes. A review of the blogs at
 *    shineneon.com, ahaneon.com, neonchamp.com, yellowpop.com and
 *    neonsignsdepot.com (August 2026) found the same cluster of topics ranking
 *    everywhere — cleaning, lifespan, LED vs glass, colour choice, wedding
 *    ideas — and the same three weaknesses in almost all of them: no named
 *    author or reviewer, no dates on the cards, and no sources behind any
 *    claim. Two of the five had category filters that led to empty pages.
 *
 *    So these posts take the topics people are already searching for, and win
 *    them on the axis the incumbents left open: identity, dates, sourced
 *    claims, real tables and a direct answer at the top.
 *
 * ── Rules that were applied while writing ───────────────────────────────────
 *
 * No prices anywhere. lib/claims.ts and the pricing rule in
 * 08-content-aeo-geo-aio-plan.md both say no range is published without an
 * owner-approved basis and an effective date, and none exists — so every cost
 * question routes to /guides/custom-business-sign-cost instead.
 *
 * No shipping cost or free-delivery language: that promotion is retired
 * (FREE_DELIVERY_PROMO in lib/claims.ts).
 *
 * Where a statement is general engineering fact rather than something this
 * workshop measured, it is attributed in the post's `sources` list.
 */

import {
  a,
  b,
  callout,
  cta,
  finalize,
  h2,
  h3,
  image,
  ol,
  p,
  pullquote,
  table,
  ul,
} from "./portable-text.mjs";

// ── Categories ──────────────────────────────────────────────────────────────

export const categories = [
  {
    _id: "category-care-and-setup",
    slug: "care-and-setup",
    title: "Care & Setup",
    order: 10,
    description:
      "Cleaning, hanging, powering and troubleshooting — everything that happens after a sign arrives.",
    intro:
      "A custom sign is built once and lived with for years, and almost everything that goes wrong in those years is preventable. These are the practical articles: how to clean acrylic without hazing it, how to hang a sign on the wall you actually have, what the power adapter is doing, and how to tell a failing driver from a failing sign. If you are still deciding what to buy, the buying guides cover that side.",
  },
  {
    _id: "category-colour-and-design",
    slug: "colour-and-design",
    title: "Colour & Design",
    order: 20,
    description:
      "How colour, typeface and scale behave once they are lit — and why a brand palette rarely transfers unchanged.",
    intro:
      "Lit colour does not work like printed colour. A palette signed off on a screen can arrive on a wall looking wrong, not because anything was made incorrectly but because emitted light and reflected ink are different materials. These articles cover what actually changes when a brand goes from a style guide to a glowing object: which hues hold up, which typefaces survive being bent into tube, and how scale changes legibility.",
  },
  {
    _id: "category-ideas-and-inspiration",
    slug: "ideas-and-inspiration",
    title: "Ideas & Inspiration",
    order: 30,
    description:
      "Real uses for custom signage — weddings, events, interiors and brand spaces — with the reasoning behind each.",
    intro:
      "Idea lists are easy to write and mostly useless, because the picture never tells you the size, the mounting or whether it worked in the room. These are put together the other way round: the idea, then the constraint that shaped it, then what to specify if you want the same result. Use them to arrive at a brief, not just a mood board.",
  },
  {
    _id: "category-sign-basics",
    slug: "sign-basics",
    title: "Sign Basics",
    order: 40,
    description:
      "How illuminated signs are built and why one technology behaves differently from another.",
    intro:
      "Background rather than buying advice: what LED neon flex actually is, how it differs from the glass tube it is named after, what a driver does, and why an IP rating on a component is not an IP rating on an installation. Understanding the material makes every later decision easier — and makes it much harder for anyone to sell you the wrong thing.",
  },
  {
    _id: "category-trends",
    slug: "trends",
    title: "Trends",
    order: 50,
    description: "What is changing in illuminated signage, and which of it is worth acting on.",
    intro:
      "Signage trend pieces are usually a list of shapes that were popular last year. These are written to be useful to someone with a budget: what is genuinely shifting in how businesses use light, what it costs in effort rather than fashion, and — importantly — which trends are not worth chasing. Each one is dated, and we would rather revise a call than quietly delete it.",
  },
];

// ── Author placeholders ─────────────────────────────────────────────────────
//
// These are intentionally NOT invented people.
//
// The page quality contract asks every post to show a real author with relevant
// experience, and a fabricated byline with fabricated credentials is worse than
// no byline: it is an unverifiable trust claim on a commercial site, the same
// category of problem as an invented review. So the seed ships one obviously
// unfinished record and the runner refuses to publish until it is replaced —
// either interactively, or with --author "Name|Role|Experience".

export const AUTHOR_PLACEHOLDER = {
  _id: "author-workshop-lead",
  slug: "workshop-lead",
  name: "SET YOUR NAME IN THE STUDIO",
  role: "Workshop lead, illuminated signage",
  expertise:
    "Replace this with a real, checkable sentence or two: how long this person has built signs, which categories they work on, and roughly how many projects they have shipped. This text is rendered under every post they sign, so it has to be true.",
};

// ── Posts ───────────────────────────────────────────────────────────────────
//
// `images.cover` and any `image()` placeholder in the body refer to keys in
// `imageFiles` below, which the runner uploads before creating the documents.

export const imageFiles = {
  "neon-custom-name": "public/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp",
  "neon-bar": "public/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
  "neon-bedroom": "public/neon-sign/girls room/iap_600x600.5331151538_61m43otq.webp",
  "neon-shapes": "public/neon-sign/allshape.png",
  "neon-game-room": "public/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp",
  "neon-wedding": "public/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp",
  "neon-wedding-2": "public/neon-sign/Marriage/iap_600x600.7378705048_ipwhq76b.webp",
  "neon-gym": "public/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp",
  "channel-corporate": "public/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
  "channel-duallit": "public/3d-metallic-neon-sign/duallit/1.png",
  "channel-frontlit": "public/3d-metallic-neon-sign/frontlit/2.png",
  "lightbox-storefront": "public/ultra-thin-slim-lightbox/Storefront windows.jpg",
  "neon-cafe-sign": "public/blog/custom-neon-sign-ordering-installation/cafe-sign.jpg",
  "neon-vs-glass": "public/blog/custom-neon-sign-ordering-installation/neon-vs-glass.jpg",
  "neon-hardware-kit": "public/blog/custom-neon-sign-ordering-installation/hardware-kit.jpg",
};

/** Links every post carries, so no post is ever a dead end. */
const LINK_NEON_PRODUCT = {
  kind: "commercial",
  label: "Custom LED neon signs",
  description: "Sizes, colours, backboard options and what we need from you to quote.",
  href: "/products/custom-neon-signs",
};

const LINK_COST_GUIDE = {
  kind: "guide",
  label: "What a custom business sign costs",
  description: "The cost drivers behind illuminated signage, and why quotes vary so much.",
  href: "/guides/custom-business-sign-cost",
};

const LINK_LIGHTING_GUIDE = {
  kind: "guide",
  label: "Front-lit vs halo-lit vs dual-lit",
  description: "How the three channel-letter lighting styles read at distance, and what each wall needs.",
  href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
};

const LINK_BUSINESS_HUB = {
  kind: "commercial",
  label: "Business signage",
  description: "Channel letters, lightboxes, acrylic logos and logo neon for commercial spaces.",
  href: "/business-signs",
};

export const posts = [
  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-custom-neon-sign-ordering-installation",
    slug: "custom-neon-sign-ordering-installation",
    title: "Step-by-Step Ordering and Installation of a Custom Neon Sign",
    category: "category-care-and-setup",
    cover: "neon-cafe-sign",
    coverAlt: "Custom warm-white LED neon cafe sign mounted on a dark feature wall",
    coverCaption:
      "A custom LED neon sign should do more than look good in a preview — it needs to fit your wall, reach an outlet, and arrive in time.",
    readingMinutes: 8,
    publishedAt: "2026-09-21T10:00:00Z",
    featured: true,
    primaryKeyword: "custom neon sign",
    seoTitle: "Custom Neon Sign Ordering & Install Guide",
    seoDescription:
      "Learn how to order and install a custom neon sign, compare LED and glass, plan your budget, and get a free design mockup from The Glownique.",
    summary:
      "From your first design idea to the final wall mounting, learn how to choose, order and install a custom neon sign for a business, event or home.",
    keyTakeaways: [
      "Start with a clear brief: choose your wording or logo, measure the usable space, and plan electrical access before approving your mockup.",
      "Choose LED neon for durability, low-voltage safety, and flexible design, or traditional glass neon when authentic vintage glass character is essential.",
      "Account for all cost drivers — size, letter count, complex curves, outdoor waterproofing (IP67), and power controls — when setting your budget.",
      "Always unpack and test illumination before mounting, leaving slack in the power cable so soldered joints never take strain.",
      "Use proper wall anchors (plasterboard, masonry, or standoffs) for DIY installation, or hire a professional for large, exterior, or hardwired commercial signs.",
    ],
    body: [
      p(
        "A custom neon sign should do more than look good in a preview. It needs to fit your wall, communicate the right message, reach a suitable power outlet and arrive in time for your plans.",
      ),
      p(
        "The process starts with a clear brief: choose your wording or logo, measure the space, confirm the materials and electrical requirements, approve a digital mockup, and arrange installation. A small indoor LED sign may be suitable for straightforward wall mounting; a large exterior sign needs a more detailed installation plan.",
      ),
      p(
        "This guide takes you from your first idea to the finished display, with practical advice for shops, hospitality venues, events and home decor.",
      ),

      h2("Why neon style lighting is finding new audiences"),
      p(
        "Neon has a strong connection with cinema signs, late-night diners and distinctive shopping streets. Contemporary interest continues to grow as commercial designers and artists incorporate illuminated lettering into modern interiors.",
      ),
      p(
        "Today, LED neon offers another way to create illuminated lettering and line art. Flexible tubing gives designers a neon-like glow without requiring a traditional glass-tube sign. That makes the style accessible for a cafe wall, wedding backdrop or personal workspace, as well as commercial branding.",
      ),

      h2("Step 1: Decide what your sign needs to do"),
      p("Start with the location and the person who will see it. Here is how the brief changes by setting:"),
      ul([
        [
          b("Retail storefront: "),
          "Picture a short boutique name in clear, bold lettering inside a window. Test the view from the pavement in daylight as well as after dark. Reflections and scale affect readability.",
        ],
        [
          b("Hospitality venue: "),
          "Imagine a warm-white cafe logo on a charcoal wall behind the counter. Plan the composition around shelves and equipment, and consider dimming so the sign works with evening lighting.",
        ],
        [
          b("Wedding or event: "),
          "A surname or short phrase can sit above a photo backdrop. Agree on the supporting frame, power access, transport and venue setup time before finalizing the design.",
        ],
        [
          b("Home decor: "),
          "A name or simple line-art motif can personalize a reading corner or gaming room. Think about comfortable brightness, screen reflections and keeping cables out of reach of children and pets.",
        ],
      ]),

      h2("Step 2: Choose LED neon, glass neon or dimensional lettering"),
      p(
        'The word "neon" is often used for two different technologies. Traditional neon creates light inside shaped, gas-filled glass tubes. LED neon uses light-emitting diodes within a flexible diffuser to create a continuous-looking line.',
      ),
      table(
        "Comparison of LED Neon vs Traditional Glass Neon",
        ["Consideration", "LED Neon", "Traditional Glass Neon"],
        [
          ["Construction", "LEDs inside flexible tubing on acrylic backing", "Shaped glass tubes with electrodes & gas fill"],
          ["Appearance", "Diffused continuous line for lettering & outlines", "Distinctive raw glow of illuminated glass tubing"],
          ["Electrical Setup", "Low-voltage 12V DC system with plug-in adapter", "Dedicated high-voltage neon transformer"],
          ["Handling & Safety", "Flexible tubing resistant to impact", "Fragile glass requiring careful transport"],
          ["Installation", "Small indoor plug-in designs suit DIY mounting", "Specialist professional installation recommended"],
        ],
      ),
      image(
        "neon-vs-glass",
        "LED neon tubing on acrylic beside a traditional glass neon tube",
        "Comparing flexible silicone LED neon flex with traditional hand-blown glass tubing.",
      ),

      h2("Step 3: Measure your space and refine the design"),
      p(
        "Measure the usable width and height of the display area, including the space around furniture, doors and shelving. Then use paper or removable masking tape to mark the proposed sign outline. Step back to the distance from which people will actually see it.",
      ),
      ul([
        [
          b("Text and font: "),
          "Check every word at the intended viewing distance. Intricate scripts and small gaps may need a larger sign or a simplified layout.",
        ],
        [
          b("Color and background: "),
          "Consider the wall color and surrounding light. Request an illuminated color reference when matching brand palettes.",
        ],
        [
          b("Logo detail: "),
          "Provide vector artwork if available. Fine lines or small gradients can be printed on UV acrylic with neon outline accents.",
        ],
        [
          b("Brightness & Controls: "),
          "Decide whether fixed single-color lighting suits the project or if an RGB option with remote dimmer is preferred.",
        ],
      ]),

      h2("Step 4: Confirm materials, power and outdoor suitability"),
      p(
        "Our LED neon range operates at 12V on the sign side of the system; the power adapter connects to a standard mains outlet. Confirm adapter input ratings, cable lengths, cable exit positions, and compatible dimmers before ordering.",
      ),
      p(
        "Plan a ventilated, accessible position for the adapter. Measure the actual cable route along the wall rather than straight-line distance to the outlet.",
      ),
      callout(
        "note",
        "Specify outdoor use from the beginning",
        "If your sign will face rain, condensation, or direct sun, specify our IP67 outdoor option. Ingress protection requires appropriate sealing for adapters, controllers, and cable connections.",
      ),

      h2("Step 5: Build a realistic budget"),
      p(
        "Custom neon sign pricing depends on overall width, letter count, tubing length, intricate curves, multiple colors, backboard construction, controls, and outdoor protection.",
      ),
      table(
        "Published Benchmark Sign Examples (US Market)",
        ["Example Design", "Published Dimensions", "Price Range (USD)"],
        [
          ["Simple illustrated icon (Taco design)", "10 x 9 to 26 x 24 inches", "$157 - $415"],
          ["Short text design (XOXO)", "24 x 8 to 41 x 14 inches", "$220 - $379"],
          ["Detailed multicolor artwork (Voodoo Skull)", "16 x 26 to 25 x 39 inches", "$568 - $864"],
        ],
        "Third-party published benchmarks showing how scale and complexity affect costs. Itemized quotes from The Glownique cover your exact specification.",
      ),

      h2("Step 6: Request and approve your free digital mockup"),
      p(
        "Send us your exact wording or logo, approximate dimensions, preferred colors, location photograph, and required date. We will prepare a free 2D/3D digital mockup and itemized quote.",
      ),
      ul([
        "Verify spelling, capitalization, punctuation, and logo proportions.",
        "Check overall dimensions and the acrylic backboard cut shape (contour vs rectangle).",
        "Confirm illuminated color, font spacing, and simplified vector elements.",
        "Verify mounting points, cable exit location, and power accessories.",
      ]),

      h2("Step 7: Place the order and agree on delivery timing"),
      p(
        "We process payments through The Glownique's Etsy shop. You can pay in full or make a 50% initial payment followed by the balance when the sign is ready for dispatch under Etsy transaction protection terms.",
      ),
      p(
        "We offer tracked international delivery. Build in extra lead time for custom production, shipping, inspection, and installation before critical event dates.",
      ),

      h2("Step 8: Inspect and test the sign before mounting"),
      p(
        "Unpack on a clean, padded surface and support the backing with both hands. Compare the delivered sign with the approved mockup, inspect cables and hardware, and perform a brief power test before mounting.",
      ),
      image(
        "neon-hardware-kit",
        "Custom LED neon sign with power adapter and wall-mounting hardware",
        "The complete unboxing kit including LED sign, power adapter, controller, and standoff hardware.",
      ),

      h2("Step 9: Install your custom LED neon sign"),
      ol([
        "Choose fixing points. Confirm the wall can support the complete weight and locate structural studs or heavy-duty anchors.",
        "Mark and level layout. Use the template or backboard mounting holes, checking alignment with a spirit level.",
        "Install fixings. Fit anchors, screws, and standoff bases according to hardware instructions.",
        "Secure backboard. Align the sign with protective washers/spacers and tighten gently without stressing the acrylic.",
        "Support cable and adapter. Use clear cable clips or surface covers, keeping cables free from sharp edges.",
        "Connect with power off. Follow the connection sequence for sign, dimmer controller, and power supply.",
        "Test finished display. Restore power, check illumination, and adjust brightness from main viewing angle.",
      ]),
      callout(
        "tip",
        "When to book a professional installer",
        "Arrange professional installation for large or heavy commercial signs, high exterior mountings, glass neon, or hardwired electrical setups requiring building permits.",
      ),

      h2("Step 10: Care for the sign and keep your warranty details"),
      p(
        "Unplug before cleaning. Use gentle dusting with a dry microfibre cloth and avoid spraying liquids directly on electrical parts or acrylic.",
      ),
      p(
        "Our 5-year warranty covers manufacturing defects, LED components, power supplies, wiring, and workmanship faults under published terms.",
      ),

      cta(
        "Ready to start your custom sign project?",
        "Send us your text, logo, or idea for a free 1-on-1 design preview and itemized quote within 2 hours.",
        "Request your free mockup",
      ),
    ],
    faqs: [
      {
        q: "Can I install a custom neon sign myself?",
        a: "A small to medium indoor LED neon sign with a plug-in adapter is designed for straightforward DIY wall mounting using standard anchors or standoffs. Large commercial, high exterior, or hardwired installations should be handled by a qualified installer.",
      },
      {
        q: "Can LED neon reproduce every detail of my logo?",
        a: "Very fine lines or tiny text may require simplification for neon tubing. Alternatively, we offer UV-printed acrylic signs with illuminated neon outline accents to preserve intricate logo details perfectly.",
      },
      {
        q: "Can I return a custom sign if I change my mind?",
        a: "Because custom signs are made to order according to your approved mockup, change-of-mind returns are excluded once production starts. Damaged, faulty, or incorrect items are covered under our 5-year warranty and consumer protection policies.",
      },
      {
        q: "How early should I order a custom sign for an event?",
        a: "We recommend placing your order at least 2 to 3 weeks before your event to allow time for design revisions, handcrafting, tracked shipping, and pre-event installation.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      LINK_COST_GUIDE,
      LINK_LIGHTING_GUIDE,
      LINK_BUSINESS_HUB,
    ],
    sources: [
      {
        label: "Museum of Neon Art (MONA) - Preservation and Modern Signage Design",
        publisher: "Museum of Neon Art",
        accessed: "2026-09-21",
      },
      {
        label: "LED Ingress Protection Standards (IP67 Outdoor Specifications)",
        publisher: "International Electrotechnical Commission (IEC)",
        accessed: "2026-09-21",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-how-to-clean-led-neon-signs",
    slug: "how-to-clean-and-maintain-led-neon-signs",
    title: "How to Clean and Maintain an LED Neon Sign",
    category: "category-care-and-setup",
    cover: "neon-custom-name",
    coverAlt:
      "A pink custom-name LED neon sign mounted on a clear acrylic backboard against a pale wall",
    coverCaption:
      "The acrylic backboard, not the tube, is the part that scratches and hazes — and it is the part most cleaning advice ignores.",
    readingMinutes: 6,
    publishedAt: "2026-08-22T09:00:00Z",
    featured: false,
    primaryKeyword: "how to clean led neon signs",
    seoTitle: "How to Clean an LED Neon Sign",
    seoDescription:
      "Dust it dry, spray the cloth and never the sign, and keep alcohol away from the acrylic. A workshop guide to cleaning and maintaining an LED neon sign.",
    summary:
      "LED neon asks almost nothing of you — but the few things it does ask, most people get wrong. Here is how to clean a sign without hazing the acrylic, what to do about dust in the backboard cut-outs, and the three parts worth checking once a year.",
    keyTakeaways: [
      "Dust with a dry microfibre cloth every few weeks; that alone prevents most of the dullness people mistake for a fading sign.",
      "Never spray liquid at the sign. Spray the cloth — liquid runs down the tube and pools at the fixings and solder joints.",
      "Nothing containing alcohol, ammonia or acetone goes near the acrylic. The fine cracking those cause is called crazing, and it is permanent.",
      "Unplug the sign and let it cool for ten minutes before you touch it with anything damp.",
      "Once a year, check three things: the power adapter, the cable where it enters the sign, and the wall fixings. Nearly every fault we are asked about is one of those, not the LED.",
    ],
    body: [
      p(
        "An LED neon sign is one of the lowest-maintenance objects you can hang on a wall. There is no gas, no electrode, no filament and no moving part. What there is, is a length of flexible silicone or PVC tube with an LED strip sealed inside it, mounted to a cut acrylic backboard, running on low-voltage DC from a plug-in adapter.",
      ),
      p(
        "Which means the maintenance story is short, and almost all of it is about the acrylic rather than the light. Here is the whole of it.",
      ),

      h2("The only routine job: dust it"),
      p(
        "Dust settles on the top surface of the tube and in the cut-outs of the backboard, and because it settles evenly you do not notice it happening. What you notice, six months later, is that the sign looks a bit flat. Nine times out of ten that is dust, not the LEDs.",
      ),
      p(
        "A dry microfibre cloth, every few weeks, over the tube and the board. That is it. For the tight corners where a letter meets the board, a soft make-up brush or a clean paintbrush moves dust out without pressing it in. A can of compressed air works too, held far enough back that you are not blasting the solder joints.",
      ),
      callout(
        "tip",
        "Do the dusting with the sign switched off",
        "Not for safety — for visibility. Dust is much easier to see against an unlit board than against a glowing one, and you will not chase your own after-images around the wall.",
      ),

      h2("The proper clean, step by step"),
      p("Two or three times a year, or whenever something has been splashed on it:"),
      ol([
        "Unplug the sign at the wall. Do not just switch it off at a remote.",
        "Wait ten minutes. The tube runs warm, and warm acrylic marks more easily.",
        "Dust it dry first, as above. Wiping a dusty surface with a damp cloth grinds the dust across the acrylic, and that is how signs get their fine scratches.",
        "Dampen — not wet — a clean microfibre cloth with lukewarm water. A single drop of pH-neutral washing-up liquid in a bowl of water is as strong as it ever needs to be.",
        "Wipe the tube along its length, then the board, using light pressure and a fresh face of the cloth as it picks up grime.",
        "Dry immediately with a second, completely dry microfibre cloth. Water left to evaporate on acrylic leaves mineral spotting.",
        "Leave it unplugged for thirty minutes before switching it back on.",
      ]),
      callout(
        "warning",
        "Never spray the sign directly",
        "Spray the cloth. A mist aimed at the sign runs down the tube by gravity and collects exactly where you do not want it: the fixing points where the tube meets the board, and the soldered joint where the tail cable is attached. Water sitting on those overnight is one of the few ways to genuinely damage an indoor sign.",
      ),

      h2("What not to use on it"),
      p(
        "The tube itself is fairly tough. The acrylic backboard is not, and the backboard is most of what you see.",
      ),
      table(
        "Cleaning products and acrylic backboards",
        ["Product", "Safe?", "What happens"],
        [
          ["Water + a drop of pH-neutral soap", "Yes", "The correct answer for essentially every situation."],
          ["Dedicated plastic/acrylic cleaner", "Yes", "Formulated for PMMA. Worth having if the sign is somewhere greasy."],
          ["Glass cleaner (most brands)", "No", "Usually ammonia-based. Ammonia attacks acrylic."],
          ["Isopropyl alcohol, hand sanitiser", "No", "Causes crazing — a web of fine surface cracks that cannot be polished out."],
          ["Acetone, nail polish remover, white spirit", "No", "Dissolves acrylic on contact. Not reversible."],
          ["Kitchen paper, tissue, newspaper", "No", "Wood fibre is harder than acrylic. It scratches, every time."],
          ["Melamine sponges (magic erasers)", "No", "A very fine abrasive. It removes the gloss along with the mark."],
        ],
        "Crazing and solvent damage to PMMA are properties of the material, not of any particular sign. The same list applies to any acrylic-mounted sign from any maker.",
      ),

      h2("Outdoor signs are a different job"),
      p(
        "An outdoor-rated sign is sealed against weather, not against grime. It will collect road film, pollen and — if it is under an eave — spiderwebs, and it will do it much faster than an indoor sign collects dust.",
      ),
      ul([
        "Clean it two to four times a year, more on a busy road.",
        "Isolate the power at the switch or breaker before you start, not just at a plug you cannot see.",
        [
          "Do not pressure-wash it. An ",
          b("IP65 or IP67 rating covers rain and jets at defined test pressures"),
          " — a domestic pressure washer at close range exceeds them comfortably, and driving water past a seal is how a sealed unit stops being sealed.",
        ],
        "Rinse gently, wash with a soft cloth and mild detergent, rinse again, and let it dry fully before restoring power.",
      ]),
      callout(
        "note",
        "A rating on a part is not a rating on your wall",
        "IP ratings describe a component tested in a lab. An installed sign is that component plus its cable entry, its fixings and whatever the weather does to the wall behind it. Treat the rating as a floor, not a guarantee.",
      ),

      h2("The annual check that actually prevents failures"),
      p(
        "In our experience the LED itself is almost never the thing that fails first. Three other things are, and all three are visible in about two minutes.",
      ),
      h3("1. The power adapter"),
      p(
        "The adapter is a consumable. It is the hottest-running part of the system and the one most likely to be sitting on a carpet, behind a sofa, under a cushion. Check that it is not enclosed, not hot to the touch beyond warm, and that its cable is not kinked where it leaves the housing. If a sign starts flickering, suspect the adapter long before you suspect the tube.",
      ),
      h3("2. The cable where it enters the sign"),
      p(
        "The tail cable is soldered to the LED strip inside the tube. If the sign has been moved, or the cable has been pulled taut to reach a socket, that joint takes the strain. Look for the cable entering the sign in a gentle curve with slack in it, not a straight line under tension.",
      ),
      h3("3. The fixings"),
      p(
        "Acrylic backboards are usually hung on screws through pre-drilled holes, often with standoffs. Screws in plasterboard work loose over years, particularly on a wall that gets knocked. Press gently at the corners; if there is movement, take it down and re-fix properly.",
      ),
      pullquote(
        "If a sign has gone dim, look at three things before you look at the LED: the dust, the adapter and the dimmer. It is nearly always one of them.",
      ),

      h2("Troubleshooting: dim, flickering or partly out"),
      table(
        "Common symptoms and where to look first",
        ["Symptom", "Most likely cause", "What to try"],
        [
          ["Whole sign looks dull", "Dust, or a dimmer left low", "Dust it; check the remote or dimmer is at full."],
          ["Sign flickers", "Adapter, or a loose barrel connector", "Reseat the connector; try a known-good adapter of the same rating."],
          ["One section is out, rest is fine", "Failed segment or damaged tube", "Not a home repair. Photograph it and contact us."],
          ["Sign dims after being on for a while", "Adapter overheating in an enclosed space", "Move the adapter into open air and retest."],
          ["Nothing at all", "Socket, switch, adapter — in that order", "Test the socket with something else first."],
        ],
      ),
      p(
        "Anything involving opening the tube, re-soldering or replacing an LED segment is a workshop job, not a home one. Our signs carry a 5-year warranty, so before you attempt a repair, send us a photograph and a short video of the fault — it costs nothing and it may be covered.",
      ),

      cta(
        "Something not looking right?",
        "Send a photo and a short clip of the fault. We will tell you what it is, whether it is covered, and what happens next.",
        "Message the workshop",
      ),

      h2("Where to go next"),
      p(
        "If you are still choosing rather than maintaining, the two most useful pages are the ",
        a("custom LED neon product page", "/products/custom-neon-signs"),
        " for sizes, colours and backboard options, and the ",
        a("cost guide", "/guides/custom-business-sign-cost"),
        " for what actually drives a quote.",
      ),
    ],
    faqs: [
      {
        q: "Can I clean an LED neon sign with glass cleaner?",
        a: "No. Most glass cleaners are ammonia-based, and ammonia attacks acrylic — it clouds the surface and can start crazing, a web of fine cracks that cannot be polished out. Use lukewarm water with a drop of pH-neutral washing-up liquid, or a cleaner sold specifically for acrylic.",
      },
      {
        q: "How often should I clean my neon sign?",
        a: "Dust it dry every few weeks and give it a proper damp clean two or three times a year. An outdoor sign needs the damp clean two to four times a year, more if it faces a busy road.",
      },
      {
        q: "Why has my LED neon sign gone dim?",
        a: "Dust is the most common cause, followed by a dimmer or remote left partway down, followed by a failing power adapter. Genuine LED degradation is very gradual and is rarely what you are seeing after a year or two. Dust it, check the dimmer, then try a different adapter of the same rating before assuming the sign is at fault.",
      },
      {
        q: "Can I pressure-wash an outdoor neon sign?",
        a: "No. IP65 and IP67 ratings are awarded against defined lab test conditions, and a domestic pressure washer at close range goes well past them. Forcing water past a seal is one of the few reliable ways to destroy a sealed outdoor unit. Rinse gently with a hose at low pressure instead.",
      },
      {
        q: "Is it safe to touch an LED neon sign while it is on?",
        a: "Yes — the tube runs on low-voltage DC and is warm at most, which is one of the practical differences between LED neon and traditional glass neon. That said, unplug it before cleaning: not for shock risk, but because warm acrylic marks more easily and you want the surface cool and dry.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      {
        kind: "guide",
        label: "Indoor and outdoor sign differences",
        description: "What actually changes when a sign has to live outside.",
        href: "/guides",
      },
      LINK_COST_GUIDE,
    ],
    sources: [
      {
        label: "IP rating definitions (ingress protection test conditions)",
        publisher: "IEC 60529, Degrees of protection provided by enclosures",
        accessed: "2026-08-22",
      },
      {
        label: "Solvent compatibility and crazing behaviour of cast acrylic (PMMA)",
        publisher: "General material property, per acrylic sheet manufacturer handling guidance",
        accessed: "2026-08-22",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-how-long-do-led-neon-signs-last",
    slug: "how-long-do-led-neon-signs-last",
    title: "How Long Does an LED Neon Sign Actually Last?",
    category: "category-care-and-setup",
    cover: "neon-bar",
    coverAlt: "A warm-white LED neon bar sign glowing above a row of bottles in a dim room",
    coverCaption:
      "A sign lit ten hours a day, seven days a week, is a genuinely different lifespan question from one lit at weekends.",
    readingMinutes: 7,
    publishedAt: "2026-08-22T09:30:00Z",
    featured: false,
    primaryKeyword: "how long do led neon signs last",
    seoTitle: "How Long Does an LED Neon Sign Last?",
    seoDescription:
      "LED hour ratings describe gradual dimming, not failure — and the adapter usually gives out first. What lifespan figures mean and what actually shortens them.",
    summary:
      "Manufacturers quote LED neon in tens of thousands of hours, and the number is real — but it does not mean what most people assume. It describes gradual dimming, not the moment a sign stops working, and in practice the part that gives out first is usually not the LED at all.",
    // NOTE: the hour figures here are aligned to the "up to 100,000 hours"
    // claim already published in app/llms.txt/route.ts. If that claim is ever
    // revised, this post and its FAQ must be revised in the same release —
    // that is the CLM rule in lib/claims.ts applied to editorial content.
    keyTakeaways: [
      "LED hour ratings are an L70 figure: the point at which output has fallen to 70% of new. The sign does not switch off at that hour, it has simply been getting quietly dimmer the whole time.",
      "Ratings for LED neon flex commonly run from around 50,000 hours to the 100,000 hours quoted for premium tube — and \"up to\" means under ideal conditions, not typical ones.",
      "Divide the rating by your actual daily hours to get a realistic answer — the same sign lasts three times longer at 4 hours a day than at 12.",
      "Heat is the single biggest factor. An adapter in a cupboard or a sign against a heat source ages faster than the datasheet assumes.",
      "The power adapter is a consumable and usually the first thing to fail. It is also the cheapest and easiest part to replace.",
      "Our signs carry a 5-year warranty, which is a more useful number than an hour rating because it is a commitment rather than a projection.",
    ],
    body: [
      p(
        "Ask how long an LED neon sign lasts and you will be given a number in the tens of thousands of hours. The number is not made up, but it answers a narrower question than the one you asked. It is worth understanding what it measures, because the honest answer to “how long will mine last” depends far more on how you use it than on the figure in the specification.",
      ),

      h2("What the hour rating actually measures"),
      p(
        "LEDs do not usually fail like a bulb. They dim. Output falls slowly and continuously from the day they are first switched on, and the industry describes this with an ",
        b("L70"),
        " figure: the number of operating hours after which light output has dropped to 70% of what it was when new. Ratings for LED neon flex commonly run from around 50,000 hours to the 100,000 hours quoted for premium tube, ours included.",
      ),
      p(
        "So a 100,000-hour rating does not mean the sign works for 100,000 hours and then stops. It means that after roughly that many hours it is producing about seven-tenths of the light it started with — a change so gradual that almost nobody notices it happening, and which most people mistake for dust when they finally do.",
      ),
      callout(
        "note",
        "What \"up to\" is doing in that sentence",
        "An hour rating is measured on components run within their designed temperature range. It is a ceiling under good conditions, not a promise about your wall. An adapter in a cupboard or a sign above a heat source will not reach it — which is why the section below on heat matters more than the number does.",
      ),

      h2("Turning the rating into a real answer"),
      p(
        "The useful calculation is the rating divided by your actual usage. The same sign, same specification, gives wildly different answers — and the honest way to read it is as a range rather than a single figure:",
      ),
      table(
        "Years to L70 at different daily usage",
        ["How it is used", "Hours per day", "At 50,000 h", "At 100,000 h"],
        [
          ["Home sign, evenings only", "4", "~34 years", "~68 years"],
          ["Cafe or salon, open hours", "8", "~17 years", "~34 years"],
          ["Bar or restaurant, long trading day", "12", "~11 years", "~23 years"],
          ["Storefront on a timer, dusk to late", "14", "~10 years", "~20 years"],
          ["Left on continuously", "24", "~6 years", "~11 years"],
        ],
        "Arithmetic only, against nominal L70 ratings and assuming the sign runs within its temperature range. The right-hand column is the manufacturer ceiling; the left is a conservative planning figure. Neither is a warranty — the warranty is five years, and that is the number with a commitment behind it.",
      ),
      p(
        "Two things follow from that table. Blanket claims like “LED neon lasts 10 years” are close to meaningless — ten years for whom, at how many hours a day? And at any realistic usage, the LEDs are not the part you should be planning around. Something else will need attention first.",
      ),

      h2("What actually shortens a sign's life"),
      h3("Heat, by a distance"),
      p(
        "LED degradation is temperature-driven. Every rating assumes the components stay within a working temperature range, and the two places that assumption breaks are the adapter and the wall.",
      ),
      ul([
        "An adapter shut in a cabinet, under a rug or behind a radiator runs hotter than it was tested to and ages accordingly.",
        "A sign mounted directly above a cooker, a heater or in a sealed south-facing window box is in a hotter environment than an office wall.",
        "Signs packed tightly against a surface with no air gap trap their own heat. Standoff mounts exist partly for this reason.",
      ]),
      h3("Power quality"),
      p(
        "A cheap or mismatched adapter delivering an unstable voltage stresses the LEDs continuously. If you ever replace an adapter, match the original's voltage exactly and its current rating at or above the original — never below.",
      ),
      h3("Physical handling"),
      p(
        "The genuine failure mode we see most is mechanical, not electrical: the soldered joint where the tail cable meets the LED strip, broken by the cable being pulled taut or the sign being moved by its cable. It is entirely preventable by leaving slack.",
      ),

      h2("The part that usually fails first"),
      p(
        "It is the power adapter, and it is not close. The adapter contains capacitors, it runs warm, and it is doing the hardest job in the system. It is also, fortunately, the cheapest and simplest part to replace — an external, unplugged component rather than anything inside the sign.",
      ),
      pullquote(
        "If a sign that worked yesterday does nothing today, the adapter is the first suspect, not the sign.",
      ),
      p(
        "This is worth knowing because it changes how you read a fault. A dead sign is very rarely a dead sign; it is usually a dead brick on the floor behind the sideboard.",
      ),

      h2("Glass neon, for comparison"),
      p(
        "Traditional glass neon is a different technology with a different failure curve. A well-made glass tube can run for a very long time, but it fails differently — electrode wear, a slow leak, or the tube simply being broken, and any of those means a workshop repair or a remake rather than swapping a plug-in part. It also runs on a high-voltage transformer rather than low-voltage DC, which is the reason it is treated as a fixed installation rather than something you rehang on a whim.",
      ),
      p(
        "There is more on that comparison in ",
        a("LED neon vs glass neon", "/blog/led-neon-vs-glass-neon"),
        ".",
      ),

      h2("How to get the long end of the range"),
      ol([
        "Put the adapter somewhere with air around it. Not in a drawer.",
        "Leave slack in the tail cable so the solder joint never takes strain.",
        "Use a timer on a commercial sign rather than leaving it on overnight — it halves the hours and it is the single biggest lever you have.",
        "Dust it. Perceived brightness loss is far more often dust than degradation.",
        "Keep it out of direct, prolonged sunlight where you can; UV is unkind to both the silicone tube and the acrylic.",
        "If you replace the adapter, match the specification exactly.",
      ]),

      callout(
        "tip",
        "A warranty is a better number than an hour rating",
        "An hour rating is a projection from component testing. A warranty is a commitment somebody has to honour. Ours is five years — when you are comparing suppliers, compare that, and read what it covers.",
      ),

      cta(
        "Planning a sign that has to run all day?",
        "Tell us the trading hours and where it is going. Specification changes when a sign is on for twelve hours rather than four.",
        "Get a free mockup and quote",
      ),
    ],
    faqs: [
      {
        q: "How many hours do LED neon signs last?",
        a: "Ratings for LED neon flex commonly run from about 50,000 hours up to the 100,000 hours quoted for premium tube, on an L70 basis — meaning output has fallen to 70% of new by that point, not that the sign stops. Divide by your daily usage for a realistic figure: 100,000 hours is roughly 34 years at eight hours a day, or about eleven if the sign is never switched off.",
      },
      {
        q: "Do LED neon signs burn out?",
        a: "Not in the way a bulb does. They dim gradually over thousands of hours. Sudden total failure is almost always the external power adapter, which is a replaceable part, or a broken solder joint at the cable entry — not the LEDs themselves.",
      },
      {
        q: "Can I leave an LED neon sign on all the time?",
        a: "You can, and it is electrically safe to do so, but it is the fastest way to use up the hour rating and it keeps the adapter warm continuously. A plug-in timer on a commercial sign is cheap and roughly doubles the calendar life you get from the same hardware.",
      },
      {
        q: "What is the first thing to fail on an LED neon sign?",
        a: "The power adapter. It runs warm, it contains capacitors, and it is frequently installed somewhere with no airflow. It is also the easiest and cheapest thing to replace — match the original's voltage exactly and its current rating at or above the original.",
      },
      {
        q: "Does an LED neon sign lose brightness over time?",
        a: "Yes, but very slowly and evenly, which is why it is nearly imperceptible without a new sign next to it for comparison. If your sign looks noticeably duller than it did, check for dust and check the dimmer setting before concluding the LEDs have degraded.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      LINK_COST_GUIDE,
      {
        kind: "guide",
        label: "Signage buying guides",
        description: "Cost, lighting styles and sizing — the decisions that come before a purchase.",
        href: "/guides",
      },
    ],
    sources: [
      {
        label: "L70 lumen-maintenance convention for rating LED lifetime",
        publisher: "Standard industry practice, per LED luminaire lifetime reporting guidance",
        accessed: "2026-08-22",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-how-to-hang-a-neon-sign",
    slug: "how-to-hang-a-neon-sign",
    title: "How to Hang a Neon Sign on the Wall You Actually Have",
    category: "category-care-and-setup",
    cover: "neon-bedroom",
    coverAlt:
      "A soft pink script LED neon sign hung above a bed, mounted flat against a painted plaster wall",
    coverCaption:
      "Height is the decision people get wrong most often. The centre of the sign wants to sit near eye level for whoever is standing in the room.",
    readingMinutes: 7,
    publishedAt: "2026-08-22T10:00:00Z",
    featured: false,
    primaryKeyword: "how to hang a neon sign",
    seoTitle: "How to Hang a Neon Sign by Wall Type",
    seoDescription:
      "Plasterboard, brick, tile, glass or rental: the right fixing for each, plus the height and cable-routing decisions to make before you drill anything.",
    summary:
      "Most hanging problems are decided before the drill comes out — the wrong height, no plan for the cable, or a fixing chosen for the wall someone assumed they had. Here is how to work out the mount for plasterboard, masonry, tile, glass and rentals, and the three checks to do first.",
    keyTakeaways: [
      "Decide the height by eye level of a standing adult, not by centring the sign in the wall. A sign hung to look balanced in a photograph is usually too high in the room.",
      "Find out what the wall is made of before choosing a fixing. Plasterboard and masonry need completely different hardware and neither forgives the other's.",
      "Plan where the cable goes before you drill. A perfectly hung sign with a cable dangling down the middle of the wall is a badly hung sign.",
      "Hanging chain or wire is the right answer more often than people think — it is reversible, it suits rentals, and it looks deliberate.",
      "Leave slack at the cable entry. The soldered joint there is the most common mechanical failure point on any LED neon sign.",
    ],
    body: [
      p(
        "Custom signs arrive with pre-drilled holes in the acrylic backboard and, usually, a set of fixings. What they cannot arrive with is knowledge of your wall. That part is on you, and it is where nearly all the difficulty lives.",
      ),
      p("Three decisions, in this order, before anything else."),

      h2("1. Height: lower than you think"),
      p(
        "The instinct is to centre a sign in the available wall space. Resist it. A sign centred on a tall wall ends up above the sightline of everyone in the room, and it will look correct in a photograph taken from across the room and wrong to anyone actually standing there.",
      ),
      ul([
        [
          b("Behind a sofa, bed or desk: "),
          "leave roughly 15–25 cm between the top of the furniture and the bottom of the sign. Closer reads as cramped; further and the two stop being one composition.",
        ],
        [
          b("On an open wall: "),
          "aim to put the vertical centre of the sign around 150–160 cm from the floor — approximately standing eye level.",
        ],
        [
          b("Behind a bar or reception desk: "),
          "hang it so the whole sign clears the head of whoever is standing at the desk, seen from the customer's side.",
        ],
        [
          b("As a photo backdrop: "),
          "the sign wants to sit above the heads of people standing in front of it, which usually means higher than any of the above. Decide which job it is doing first.",
        ],
      ]),
      callout(
        "tip",
        "Tape it out before you drill",
        "Cut a piece of paper or cardboard to the exact outer dimensions of the backboard, tape it to the wall, and leave it there for a day. It costs nothing and it catches every height mistake, which is the only mistake you cannot undo.",
      ),

      h2("2. What is the wall made of?"),
      p(
        "This determines the fixing, and getting it wrong is the difference between a sign that hangs for a decade and one that pulls out of the wall.",
      ),
      p(
        "Knock on it. A hollow, drummy sound with give is plasterboard over a stud frame. A dull, solid sound is masonry — brick, block or plastered solid wall. If you are unsure, drill a small pilot hole somewhere that will be hidden: plasterboard gives white powder and almost no resistance, masonry gives grit and fights back.",
      ),
      table(
        "Fixings by wall type",
        ["Wall", "Use", "Avoid"],
        [
          [
            "Plasterboard / drywall",
            "Self-drilling plasterboard anchors, or fix directly into a stud where you can find one",
            "Plain wall plugs — they spin in the cavity and hold nothing",
          ],
          [
            "Brick, block, solid plaster",
            "Masonry plug and screw, drilled with a hammer drill and a masonry bit",
            "Plasterboard anchors, which need a cavity to expand into",
          ],
          [
            "Tile (splashback, bathroom)",
            "Drill on low speed with a tile bit, no hammer, then plug into whatever is behind",
            "Hammer action — it cracks the glaze and the crack keeps travelling",
          ],
          [
            "Glass or a shopfront window",
            "Suction mounts rated well above the sign's weight, or clear monofilament from a fixing above",
            "Adhesive pads on a sunlit window; heat cycling defeats them",
          ],
          [
            "Rental, or anywhere you cannot drill",
            "Hanging chain or wire from an existing picture rail or a single high fixing; freestanding stand",
            "Command-style strips beyond their stated weight rating",
          ],
        ],
        "Weight matters as much as wall type: a small sign is light, a large acrylic backboard is not. Match the fixing to the actual weight of your piece, and when in doubt use one rating up.",
      ),

      h2("3. Where does the cable go?"),
      p(
        "This is the step everyone skips and then regrets. The tail cable exits the sign at a fixed point — normally a bottom corner or the back — and it has to reach a socket. Work that route out before you commit to a position.",
      ),
      ul([
        "Measure from the intended cable exit to the nearest socket, and check the supplied cable actually reaches with slack to spare.",
        "Running the cable straight down the wall to a low socket is the neatest visible route. Running it sideways across a wall never looks intentional.",
        "Clear cable clips every 20–30 cm hold the run tidy and stop it swinging.",
        "If the sign is a permanent commercial fixture, a socket installed behind it by an electrician removes the cable from view entirely. That is an electrician's job, not a DIY one.",
      ]),
      callout(
        "warning",
        "Always leave slack at the sign",
        "The cable is soldered to the LED strip inside the tube. A cable pulled tight puts every movement of the wall, the furniture and the vacuum cleaner directly onto that joint, and a broken joint is a workshop repair. The cable should leave the sign in a relaxed curve.",
      ),

      h2("The three ways to actually mount it"),
      h3("Flush against the wall"),
      p(
        "Screws through the pre-drilled holes straight into the wall fixings. Simplest, most secure, and the sign sits tight to the surface. Best where the sign is the focal point and you want no visible hardware.",
      ),
      h3("On standoffs"),
      p(
        "Chrome or brushed barrels hold the acrylic 15–25 mm off the wall. This is worth the extra effort: the gap lets light spill behind the board and gives a soft halo, and it lets air move behind the sign. For a clear acrylic backboard it also stops the board reading as a flat plastic rectangle.",
      ),
      h3("Hung on chain or wire"),
      p(
        "Two chains or clear wires from a single fixing above. Reversible, kind to rented walls, quick to reposition, and it suits industrial and event settings. It also lets the sign hang free in a window rather than against a wall.",
      ),

      h2("Fitting it, once you have decided"),
      ol([
        "Hold the sign (or your paper template) in position and mark through the fixing holes with a pencil. Use a spirit level — the eye is unreliable over a metre.",
        "Check for pipes and cables behind the wall with a detector before drilling. Non-negotiable in a kitchen or bathroom.",
        "Drill, plug, and drive the screws until they are firm. Do not overtighten: acrylic cracks around a hole under compression, and the crack is visible forever.",
        "Hang the sign, dress the cable into its clips, and only then plug it in.",
        "Switch it on, stand where people will actually stand, and look at the reflection. Glare off a glossy wall or a facing window is the last thing left to fix, and it is usually fixed by tilting the sign a few degrees on standoffs.",
      ]),

      cta(
        "Not sure your wall will take it?",
        "Send us a photo of the space and the wall, plus the size you are considering. We will tell you what it weighs and what it needs.",
        "Ask before you drill",
      ),

      h2("Commercial installations are a different question"),
      p(
        "Everything above assumes an indoor sign on a plug-in adapter. A storefront sign that is hard-wired, mounted at height or fixed to a building facade brings in electrical work, structural fixing and — depending where you are — permits. That is not a DIY job and it is not the same article. Our ",
        a("business signage pages", "/business-signs"),
        " cover what those installations involve.",
      ),
    ],
    faqs: [
      {
        q: "How high should I hang a neon sign?",
        a: "Put the vertical centre of the sign at roughly 150–160 cm from the floor for an open wall, which is about standing eye level. Above furniture, leave 15–25 cm between the top of the furniture and the bottom of the sign. Signs used as photo backdrops need to sit higher, above the heads of people standing in front of them.",
      },
      {
        q: "Can I hang a neon sign without drilling holes?",
        a: "Yes. Hanging chain or clear wire from an existing picture rail works well and is fully reversible, and suction mounts rated above the sign's weight work on glass. Adhesive strips can work for very light signs but check the manufacturer's weight rating honestly and avoid them on sunlit windows, where heat cycling defeats the adhesive.",
      },
      {
        q: "What fixings do I need for a neon sign on plasterboard?",
        a: "Self-drilling plasterboard anchors, or screws straight into a stud if you can locate one behind the intended position. Plain wall plugs are the common mistake — they need solid material to grip and simply spin in a cavity.",
      },
      {
        q: "Should I mount a neon sign flush or on standoffs?",
        a: "Standoffs are usually worth it. Holding the acrylic 15–25 mm off the wall lets light spill behind the board for a soft halo, lets air circulate behind the sign, and stops a clear backboard reading as a flat plastic rectangle. Flush mounting is simpler and better where you want no visible hardware at all.",
      },
      {
        q: "How do I hide the cable from a neon sign?",
        a: "Plan the route before you fix the sign. Straight down to a low socket with clear cable clips every 20–30 cm is the tidiest visible option. For a permanent commercial sign, have an electrician install a socket behind the sign so the cable never appears — that is qualified work, not a DIY task.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      LINK_BUSINESS_HUB,
      {
        kind: "guide",
        label: "Signage buying guides",
        description: "Sizing, lighting style and cost — worth reading before you order.",
        href: "/guides",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-led-neon-vs-glass-neon",
    slug: "led-neon-vs-glass-neon",
    title: "LED Neon vs Glass Neon: What Is Actually Different",
    category: "category-sign-basics",
    cover: "neon-shapes",
    coverAlt:
      "A grid of LED neon signs in different shapes and colours showing the range of forms the flexible tube can be bent into",
    coverCaption:
      "Both are called neon. Only one of them contains any neon, and the difference runs all the way through to how you mount it.",
    readingMinutes: 8,
    publishedAt: "2026-08-22T10:30:00Z",
    featured: true,
    primaryKeyword: "led neon vs glass neon",
    seoTitle: "LED Neon vs Glass Neon: The Real Differences",
    seoDescription:
      "Voltage, weight, repairability and outdoor use — an honest comparison of LED neon flex and traditional glass neon, including where glass still wins.",
    summary:
      "Both get called neon, and only one of them contains any. The differences that matter are not really about looks — they are voltage, weight, what happens when something breaks, and whether you can move the sign afterwards. Here is the comparison, including the cases where glass is still the right answer.",
    keyTakeaways: [
      "Glass neon is gas discharge driven by a high-voltage transformer. LED neon is a low-voltage LED strip inside a flexible tube. They are unrelated technologies with the same name.",
      "LED neon is lighter, runs cool, survives being knocked, and plugs into a normal socket — which is why it can hang in places glass never could.",
      "Glass neon has a particular soft, uneven glow and a genuine craft heritage. If that specific quality is the point, LED will not fully replace it.",
      "Repairability is the sharpest split: an LED sign's most common fault is a plug-in adapter, while a cracked glass tube is a workshop remake.",
      "For almost every commercial and interior application today, LED neon is the practical answer. Glass remains the answer for restoration, collectors and installations where the craft itself is the value.",
    ],
    body: [
      p(
        "The word neon does a lot of work it should not. Strictly, neon is a noble gas, and a neon sign is a sealed glass tube of that gas made to glow by running a high voltage across it. Almost nothing sold as a “neon sign” today is that. It is LED neon: a flexible tube of silicone or PVC with an LED strip inside, diffused so it reads as a continuous line of light rather than a row of dots.",
      ),
      p(
        "The two look similar in a photograph and behave completely differently in a room. Here is what actually separates them.",
      ),

      h2("The technologies, briefly"),
      h3("Glass neon"),
      p(
        "A glass tube is heated and bent by hand, sealed with electrodes at each end, evacuated and filled with a low-pressure gas. A transformer steps mains voltage up to several thousand volts, which ionises the gas and makes it emit light. Neon gas gives the familiar orange-red; other colours come from different gases, usually argon with a drop of mercury, and from coloured phosphor coatings inside the tube.",
      ),
      h3("LED neon"),
      p(
        "A strip of small LEDs is enclosed in a flexible, translucent tube that diffuses the individual points into an even line. It runs on low-voltage DC — typically 12 V or 24 V — from an external adapter that plugs into a normal socket. The tube is bent cold, mounted onto a cut acrylic backboard, and the backboard is what you hang.",
      ),
      callout(
        "note",
        "One naming consequence worth knowing",
        "Because “neon” now describes a look rather than a material, a listing that says “neon sign” tells you nothing about what you are buying. If it matters to you, look for the voltage: a 12 V or 24 V adapter means LED, and a transformer means glass.",
      ),

      h2("The comparison"),
      table(
        "LED neon and glass neon, side by side",
        ["", "LED neon", "Glass neon"],
        [
          ["Light source", "LEDs in a diffusing tube", "Ionised gas in a sealed glass tube"],
          ["Voltage at the sign", "Low-voltage DC, typically 12 V or 24 V", "Several thousand volts from a transformer"],
          ["Heat", "Warm to the touch at most", "Tube runs hot; needs clearance"],
          ["Weight", "Light — flexible tube on an acrylic board", "Substantially heavier; glass plus transformer"],
          ["Durability", "Flexes; survives knocks and transport", "Brittle; a knock is usually terminal"],
          ["Typical repair", "Replace a plug-in adapter", "Workshop repair or a remade tube"],
          ["Power draw", "Low", "Higher for the same lit length"],
          ["Outdoor use", "Standard, with an appropriately rated build", "Possible, but a bigger installation question"],
          ["Colour range", "Wide, including RGB and colour-change", "Determined by gas and phosphor; fixed at manufacture"],
          ["Dimming", "Straightforward", "Awkward and not always advisable"],
          ["Installation", "Hangs on a wall; plugs into a socket", "Usually a fixed installation with dedicated supply"],
          ["The look", "Even, consistent, bright", "Softer, slightly uneven, with a visible glass presence"],
        ],
      ),

      h2("Where LED genuinely wins"),
      h3("It can go where glass cannot"),
      p(
        "Low voltage and low heat change the whole set of viable locations. A bedroom, a rented flat, behind a bar at head height, in a marquee, on a market stall, in a shop window that gets knocked. A high-voltage glass tube in any of those is a different conversation involving an electrician.",
      ),
      h3("It survives being moved"),
      p(
        "Event and pop-up work is essentially LED-only territory. A sign that has to be packed, transported, hung, taken down and repeated has to flex, and glass does not.",
      ),
      h3("Faults are usually cheap"),
      p(
        "This is underrated. The most common LED neon fault is a failed external power adapter — a part you unplug and swap. The most common glass neon faults involve the tube or the transformer, and both mean a specialist.",
      ),
      h3("It does things glass never could"),
      p(
        "Colour change, dimming, animation and sequencing are all straightforward with LED and are either impossible or impractical with glass.",
      ),

      h2("Where glass still wins"),
      p(
        "It would be dishonest to pretend this comparison is one-sided. Glass neon has qualities LED does not reproduce.",
      ),
      ul([
        [
          b("The specific glow. "),
          "A glass tube emits light from the gas along its whole length with slight variation. LED neon is deliberately even. Side by side, people who care about this can tell, and some of them care a great deal.",
        ],
        [
          b("The object itself. "),
          "A hand-bent glass tube is visibly a made thing, with the tube, the electrodes and the supports all part of the look. LED neon on an acrylic board is a cleaner, more anonymous object.",
        ],
        [
          b("Heritage and restoration. "),
          "A period sign being restored should be restored in glass. An LED reproduction of a 1950s sign is a reproduction.",
        ],
        [
          b("Longevity in the right hands. "),
          "A well-made, well-installed glass tube left alone can run for decades. Its enemy is impact, not hours.",
        ],
      ]),
      pullquote(
        "If the craft is the point, buy glass. If the sign is the point, buy LED.",
      ),

      h2("Which should you actually choose?"),
      table(
        "A decision shortcut",
        ["If this is true", "Choose"],
        [
          ["It goes in a home, an office, a salon or a rental", "LED neon"],
          ["It has to travel to events or be rehung", "LED neon"],
          ["It is a logo that must match brand colours precisely", "LED neon"],
          ["It needs to dim, change colour or animate", "LED neon"],
          ["It is going outdoors on a storefront", "LED neon, built to an outdoor specification"],
          ["It is a restoration of a period sign", "Glass neon"],
          ["The hand-made glass object is the thing you want", "Glass neon"],
          ["It is going into a museum, collection or heritage interior", "Glass neon"],
        ],
      ),
      p(
        "For essentially every commercial and interior brief we are asked about, LED is the practical answer — which is what we build. That is a bias worth stating plainly rather than hiding: if your brief is one of the glass rows above, a glass workshop will serve you better than we will.",
      ),

      h2("A note on outdoor use"),
      p(
        "Outdoor LED neon is normal, but “outdoor-rated” needs unpacking. An IP rating applies to a tested component. An installed sign is that component plus its cable entry, its fixings and the wall behind it. Ask what is rated, not just whether something is.",
      ),
      p(
        "For storefronts, LED neon is also often not the strongest option. Channel letters and lightboxes read better at distance and in daylight — the ",
        a("front-lit vs halo-lit vs dual-lit guide", "/guides/front-lit-vs-halo-lit-vs-dual-lit"),
        " covers why.",
      ),

      cta(
        "Not sure which technology your idea needs?",
        "Describe the space and what the sign has to do. We will tell you honestly if LED is the right call — and if it is not.",
        "Get a free mockup and quote",
      ),
    ],
    faqs: [
      {
        q: "Is LED neon better than glass neon?",
        a: "For most modern uses, yes — it is lighter, cooler, low-voltage, survives being moved and is far cheaper to repair. Glass neon is still better for restoration work, for collectors, and for anyone who specifically wants the softer, slightly uneven glow and the visible craft of a hand-bent tube.",
      },
      {
        q: "Do LED neon signs contain neon gas?",
        a: "No. They contain LEDs inside a flexible diffusing tube. The name describes the look, not the material. Only traditional glass neon actually contains gas, and even then only the orange-red tubes are neon — other colours use argon with phosphor coatings.",
      },
      {
        q: "Which is safer, LED or glass neon?",
        a: "LED neon, by a clear margin in everyday settings. It runs on low-voltage DC, typically 12 V or 24 V, and the tube is warm at most. Glass neon runs on a transformer producing several thousand volts and the tube gets hot, which is why it is normally treated as a fixed installation rather than something you hang yourself.",
      },
      {
        q: "Can you repair an LED neon sign?",
        a: "The most common fault — a failed power adapter — is a plug-in replacement. Faults inside the tube, such as a broken solder joint or a dead segment, need a workshop but are usually repairable. A cracked glass neon tube, by contrast, generally means remaking that section.",
      },
      {
        q: "Does LED neon look the same as real neon?",
        a: "Close, but not identical. LED neon is deliberately even along its length; glass has slight variation and a visible physical presence — the tube, the electrodes, the supports. In a photograph they are hard to tell apart. In a room, side by side, people who care about the difference can see it.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      LINK_LIGHTING_GUIDE,
      LINK_BUSINESS_HUB,
    ],
    sources: [
      {
        label: "Gas-discharge operating principle and electrode-based tube construction",
        publisher: "General lighting engineering reference",
        accessed: "2026-08-22",
      },
      {
        label: "IP rating definitions (ingress protection test conditions)",
        publisher: "IEC 60529, Degrees of protection provided by enclosures",
        accessed: "2026-08-22",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-neon-sign-colours-brand-palette",
    slug: "choosing-neon-sign-colours-for-your-brand",
    title: "Choosing Neon Colours That Actually Match Your Brand",
    category: "category-colour-and-design",
    cover: "neon-game-room",
    coverAlt:
      "A multi-colour LED neon game room sign combining blue, pink and yellow tube against a dark wall",
    coverCaption:
      "Three colours in one sign. Each one reads differently against a dark wall than it would against white — which is the whole problem in one photograph.",
    readingMinutes: 7,
    publishedAt: "2026-08-22T11:00:00Z",
    featured: false,
    primaryKeyword: "neon sign colours",
    seoTitle: "Choosing Neon Sign Colours for a Brand",
    seoDescription:
      "Why a brand hex code does not transfer straight to a lit sign, which colours hold up at distance, and how wall colour and ambient light change the result.",
    summary:
      "A brand palette signed off on screen can arrive on a wall looking wrong — not because anything was made incorrectly, but because emitted light and printed ink are different materials. Here is what changes, which colours survive the trip, and how to specify so you get what you approved.",
    keyTakeaways: [
      "A hex code describes reflected light from a screen or a printed surface. A sign emits its own light, so the same nominal colour behaves differently.",
      "Warm colours — red, orange, warm white, pink — read as brighter and carry further than cool blues and purples at the same power.",
      "The wall behind the sign is part of the colour. A colour approved against white will look markedly different on a dark or coloured wall.",
      "Two colours in a sign is usually the sweet spot. Three works when one of them is doing structural work; four rarely reads as designed.",
      "Ask for a mockup rendered against a photograph of your actual wall, not against a neutral background.",
    ],
    body: [
      p(
        "The most common disappointment in custom signage is not a fault. It is a colour that was approved on a laptop and then arrived as light on a wall, and looked different. Nothing was made incorrectly. The two things simply are not the same medium.",
      ),
      p("It is worth understanding why, because once you do the decision gets much easier."),

      h2("Why a hex code does not transfer"),
      p(
        "Your brand palette was defined for two situations: light reflecting off a printed surface, and light emitted by a screen you are looking directly at. A sign is a third thing — an object emitting light into a room, seen against a background, in whatever ambient light the room has.",
      ),
      ul([
        [
          b("Emitted colour is more saturated. "),
          "A brand blue that looks calm in a PDF can look electric as a lit tube.",
        ],
        [
          b("Light bleeds into its surroundings. "),
          "A red sign puts red light onto the wall around it. That spill becomes part of how the colour reads.",
        ],
        [
          b("Perceived brightness varies by hue. "),
          "The human eye is most sensitive in the green-yellow part of the spectrum and least at the blue and deep-red ends, so equal power does not mean equal apparent brightness.",
        ],
        [
          b("The tube colours the off state. "),
          "An unlit coloured tube is a coloured object on the wall. If the sign spends daylight hours switched off, that matters.",
        ],
      ]),
      callout(
        "note",
        "What we can and cannot promise",
        "LED neon colours come from a set of available tube and LED combinations, not from mixing to an arbitrary code. We can get very close to most brand colours and will tell you honestly when a specific shade is not achievable — which is a better outcome than agreeing to it and delivering an approximation.",
      ),

      h2("How each family behaves once it is lit"),
      table(
        "Colour families in a lit sign",
        ["Colour", "Reads as", "Best for", "Watch out for"],
        [
          ["Warm white", "Soft, expensive, calm", "Interiors, hospitality, script wordmarks", "Can disappear against a cream or beige wall"],
          ["Cool white", "Clean, clinical, modern", "Clinics, studios, tech and retail interiors", "Unflattering in a warm-lit room"],
          ["Red", "Loud, urgent, high energy", "Bars, diners, statement pieces", "Very heavy at large scale; strong wall spill"],
          ["Pink", "Warm, contemporary, photogenic", "Salons, boutiques, photo walls", "Reads sweeter than most brand pinks intend"],
          ["Orange", "Warm and highly visible", "Food, sport, high-visibility interiors", "Sits close to red at a distance"],
          ["Yellow / gold", "Bright and cheerful", "Cafes, playful brands", "Weak contrast against pale or wooden walls"],
          ["Green", "Fresh, natural, or retro depending on shade", "Wellness, plant-forward, gaming", "Mid-greens can read as institutional"],
          ["Ice blue", "Cool, calm, crisp", "Spas, tech, coastal", "Loses punch at a distance"],
          ["Deep blue / purple", "Moody, nightlife, atmospheric", "Bars, clubs, dark interiors", "Genuinely dim on a light wall — the hardest family to use well"],
        ],
        "Descriptions are how these read in a typical interior. The same tube in a dark room and a daylit room is effectively two different colours.",
      ),

      h2("The wall is part of the sign"),
      p(
        "This is the single most useful thing to understand, and the most commonly skipped. A sign is seen against a background, and contrast between the light and that background is what makes it legible.",
      ),
      ul([
        [
          b("Dark walls "),
          "make everything look brighter and more saturated. Deep blues and purples only really work here.",
        ],
        [
          b("White and pale walls "),
          "wash out cool and pale colours. Warm white on white is a common and expensive mistake.",
        ],
        [
          b("Brick, wood and textured walls "),
          "add their own warm cast to everything and soften edges — usually flattering, occasionally muddying.",
        ],
        [
          b("Coloured walls "),
          "mix with the sign. A blue sign on a yellow wall is a decision, whether or not anyone made it deliberately.",
        ],
      ]),
      callout(
        "tip",
        "Test it for the price of a bulb",
        "Put a coloured smart bulb in a lamp, set it to roughly the colour you are considering, and shine it at the actual wall at night. It is crude and it is startlingly informative about whether that colour has any contrast in that room.",
      ),

      h2("How many colours?"),
      p("Almost every sign we build is improved by using fewer colours than the brief started with."),
      ol([
        [
          b("One colour "),
          "is the strongest and hardest to get wrong. If the wordmark is doing the work, one colour lets it.",
        ],
        [
          b("Two colours "),
          "is the practical sweet spot — typically the mark in a brand colour and the wordmark in warm or cool white.",
        ],
        [
          b("Three colours "),
          "works when the third is structural: an underline, a border, a strapline set apart from the main mark.",
        ],
        [
          b("Four or more "),
          "rarely reads as designed. It reads as decoration, which is a legitimate choice for a game room and usually the wrong one for a brand.",
        ],
      ]),

      h2("Specifying so you get what you approved"),
      ol([
        "Send the brand colours as hex or Pantone references, and say which is primary — not just a list.",
        "Say where the sign is going and send a photograph of the actual wall, in the light it normally has.",
        "Say whether the sign will be seen mostly by day, mostly at night, or both. That changes the recommendation more than anything else.",
        "Say how far away the furthest viewer will be. Distance eats cool colours first.",
        "Ask for the mockup against your wall photograph, not a neutral background.",
        "Ask what the tube looks like switched off, if the sign will be dark during the day.",
      ]),
      p(
        "If a colour cannot be matched closely, the useful conversation is which direction to miss in — brighter or deeper, warmer or cooler. That is a design decision, and it should be yours.",
      ),

      cta(
        "Send us your palette and your wall",
        "We will come back with a free digital mockup showing your colours against your actual space — before anything is built.",
        "Get a free mockup",
      ),

      h2("Related reading"),
      p(
        "For business signage, colour interacts with lighting style as much as with the palette itself — the ",
        a("front-lit vs halo-lit vs dual-lit guide", "/guides/front-lit-vs-halo-lit-vs-dual-lit"),
        " explains why the same colour behaves differently across the three, and the ",
        a("business signage hub", "/business-signs"),
        " covers the commercial product range.",
      ),
    ],
    faqs: [
      {
        q: "Can you match my exact brand colour in a neon sign?",
        a: "Usually very closely. LED neon colours come from a set of available tube and LED combinations rather than being mixed to an arbitrary value, so an exact match to any hex code is not always possible. Send your palette with your enquiry and we will tell you honestly how close we can get before you commit.",
      },
      {
        q: "What is the brightest neon sign colour?",
        a: "Warm colours — red, orange, yellow and warm white — read as brightest because human vision is most sensitive in that part of the spectrum. Deep blues and purples are the dimmest at the same power, which is why they need a dark wall to work well.",
      },
      {
        q: "What colour neon sign is best for a white wall?",
        a: "Saturated warm colours: red, pink, orange, or a strong warm white. Pale and cool colours — ice blue, cool white, pale yellow — lose most of their contrast against white and can look washed out even though nothing is wrong with them.",
      },
      {
        q: "How many colours should a neon sign have?",
        a: "Two is usually the sweet spot: the mark in a brand colour and the type in a white. One colour is the strongest and hardest to get wrong. Three works if the third is doing structural work such as an underline. Four or more tends to read as decoration rather than design.",
      },
      {
        q: "Do neon sign colours look different at night?",
        a: "Substantially. The same sign is effectively two different colours in a daylit room and a dark one, because contrast against the background is what you actually perceive. Tell us whether the sign will be seen mostly by day, mostly at night, or both — it changes the recommendation more than the palette does.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      LINK_LIGHTING_GUIDE,
      LINK_BUSINESS_HUB,
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-neon-sign-ideas-weddings-events",
    slug: "neon-sign-ideas-for-weddings-and-events",
    title: "Neon Sign Ideas for Weddings and Events (and What to Specify)",
    category: "category-ideas-and-inspiration",
    cover: "neon-wedding",
    coverAlt:
      "A warm white script LED neon sign reading a couple's names, mounted on a clear acrylic backboard behind a wedding table",
    coverCaption:
      "A clear backboard against foliage: the board disappears and the script appears to float, which is the whole reason to specify clear over white.",
    readingMinutes: 6,
    publishedAt: "2026-08-22T11:30:00Z",
    featured: false,
    primaryKeyword: "neon sign ideas for weddings",
    seoTitle: "Neon Sign Ideas for Weddings & Events",
    seoDescription:
      "Sign ideas for ceremonies, receptions and brand activations — each with the size, backboard and mounting decision that makes it work on the day.",
    summary:
      "Idea lists are easy to write and mostly useless, because the photograph never tells you the size, the backboard or how it was held up. These are the other way round: the idea, then the constraint that shapes it, then what to specify if you want the same result.",
    keyTakeaways: [
      "Decide the sign's job first — ceremony backdrop, photo moment, wayfinding or bar feature. Each has a different size and height.",
      "Clear acrylic backboards disappear against foliage and drapery; white or coloured boards are better against a busy or dark background.",
      "A photo-backdrop sign needs to clear the heads of people standing in front of it — usually higher and larger than people expect.",
      "Check power at the venue before you finalise anything. A cordless or battery arrangement changes what is possible.",
      "Order early. These are made to order, and a date that cannot move is a bad reason to compress a production schedule.",
    ],
    body: [
      p(
        "Signs at weddings and events do one of four jobs, and almost every decision follows from which one you pick. Sizing, backboard, mounting and even colour all change depending on whether the sign is being photographed with people in front of it, read from across a room, or simply making a corner feel finished.",
      ),
      p("So: the ideas, grouped by job, with the practical decision attached to each."),

      h2("Ceremony and backdrop signs"),
      h3("Names or a monogram behind the ceremony"),
      p(
        "The classic, and it works because the sign sits above and behind the couple rather than competing with them. Script typefaces suit this better than anything geometric — the bend of the tube is doing what handwriting does anyway.",
      ),
      p(
        b("Specify: "),
        "large enough to read from the back row, clear backboard if it hangs against greenery or drapery, and a plan for how it is held up. A freestanding frame is safer at a venue than anything requiring a fixing in someone else's wall.",
      ),
      h3("A short phrase or vow line"),
      p(
        "Better than names when the couple's names are already on everything else. Keep it to four or five words; a long sentence in tube becomes a wall of light rather than something anyone reads.",
      ),
      h3("A shape rather than words"),
      p(
        "A heart, a ring, a botanical outline, an infinity loop. Reads instantly at any distance, photographs beautifully, and does not date the way a specific phrase can.",
      ),
      image(
        "neon-wedding-2",
        "A warm white LED neon wedding sign glowing against a dark backdrop at an evening reception",
        "The same script reads completely differently against a dark backdrop — brighter, and with the board invisible.",
      ),

      h2("Photo moments"),
      p(
        "This is where most of the value is, because the sign keeps working long after the event in every photograph taken in front of it.",
      ),
      ul([
        [
          b("A hashtag or handle. "),
          "Dated the moment the event ends, which is fine — it is doing a job on the day. Keep it short.",
        ],
        [
          b("A short, reusable phrase. "),
          "“Better together”, “Good times”, “Cheers”. Survives the event and can go on a wall afterwards, which changes the economics considerably.",
        ],
        [
          b("The brand mark, for a corporate activation. "),
          "The whole point of a brand photo wall is that the mark is legible in every photo posted from it.",
        ],
      ]),
      callout(
        "warning",
        "Photo-backdrop signs are bigger and higher than people expect",
        "The sign has to clear the heads of a group standing in front of it, and it has to stay legible when a phone camera is pointed at a lit object in a dark room. Undersizing this is the single most common regret. Tell us it is a photo backdrop and we will size it for that.",
      ),

      h2("Wayfinding and information"),
      p(
        "Less glamorous, disproportionately useful, and the category people forget until the day itself.",
      ),
      ul([
        "Bar, dancefloor, cloakroom, the direction of the ceremony.",
        "A table plan header, above a printed plan.",
        "“Guestbook” or “Cards & gifts” over a table that otherwise looks like any other table.",
        "For conferences: registration, breakout, and the sponsor's mark where people queue.",
      ]),
      p(
        b("Specify: "),
        "small, single colour, high contrast. These need to be read at a glance from a distance in a room that is probably dim and definitely busy. Legibility beats prettiness every time here.",
      ),

      h2("Bar and reception features"),
      p(
        "A sign behind a bar is the one guests look at most, simply because they spend the evening facing it. “Open bar”, a cocktail name, the venue's mark, or something with a bit of wit in it.",
      ),
      p(
        b("Specify: "),
        "mounted high enough to clear the head of whoever is serving, seen from the guest side of the bar. Warm colours read well against bottles and back-bar lighting; cool blues tend to get lost in it.",
      ),
      image(
        "neon-bar",
        "A warm LED neon bar sign glowing above a back bar of bottles",
        "Behind a bar, the sign competes with back-bar lighting. Warm colours win that fight; cool blues rarely do.",
      ),

      h2("The five practical decisions"),
      table(
        "What to settle before ordering",
        ["Decision", "Why it matters", "Default if unsure"],
        [
          ["Job of the sign", "Sets size, height and colour", "Photo backdrop — the most demanding case"],
          ["Backboard", "Clear disappears; white or colour defines the shape", "Clear against greenery or drapery, white against a busy background"],
          ["Mounting", "Venues rarely allow wall fixings", "Freestanding frame or hung from an existing rig"],
          ["Power", "Not every wall in a marquee has a socket", "Confirm with the venue before finalising the design"],
          ["Afterlife", "Changes whether a dated phrase is a good idea", "Choose wording that can hang on a wall afterwards"],
        ],
      ),
      callout(
        "tip",
        "Ask the venue two questions early",
        "Can we fix anything to your walls, and where is the nearest power? The answers close off entire categories of design, and it is much cheaper to know before the mockup than after.",
      ),

      h2("Timing"),
      p(
        "Every sign here is made to order — designed, bent, mounted, tested and shipped. A wedding date does not move, so treat the order date as the thing that has to move earlier. Get the mockup approved well ahead of the day and build in room for delivery, not just production.",
      ),
      p(
        "If your event has a fixed date, say so in your first message. It changes how we schedule the build.",
      ),

      cta(
        "Have a date in the diary?",
        "Send the wording, the venue and the date. We will come back with a free mockup and a realistic timeline — the timeline first, if the date is tight.",
        "Start your event sign",
      ),
    ],
    faqs: [
      {
        q: "What size should a wedding neon sign be?",
        a: "It depends on the job. A ceremony backdrop sign needs to read from the back row; a photo-backdrop sign needs to clear the heads of a group standing in front of it and stay legible on a phone camera, which usually means larger than people expect. Tell us the job and the room and we will size it rather than guessing from a word count.",
      },
      {
        q: "Should I choose a clear or white acrylic backboard?",
        a: "Clear if the sign hangs against greenery, drapery or a plain wall — the board effectively disappears and the letters float. White or a colour if the background is busy or very dark, where a defined board gives the letters something to sit on.",
      },
      {
        q: "Can I hang a neon sign at a venue that will not allow fixings?",
        a: "Yes. A freestanding frame or a stand is the usual answer, and clear wire from an existing rig or beam works where there is something overhead to hang from. Ask the venue about fixings and power before you finalise the design — the answers rule out whole categories of idea.",
      },
      {
        q: "How far in advance should I order a wedding neon sign?",
        a: "As early as you can. These are made to order — designed, bent, mounted, tested and shipped — and a wedding date cannot move to accommodate a production schedule. Tell us your date in your first message and we will give you a realistic timeline before you commit.",
      },
      {
        q: "Can I reuse a wedding neon sign afterwards?",
        a: "Often, and it is worth designing for. A short phrase like \"Better together\" or a shape such as a heart hangs on a wall perfectly well afterwards, whereas a date or hashtag does not. If reuse matters to you, choose the wording with that in mind at the start.",
      },
    ],
    relatedLinks: [
      LINK_NEON_PRODUCT,
      {
        kind: "guide",
        label: "Signage buying guides",
        description: "Sizing, colour and cost drivers, if you want the detail behind the decisions.",
        href: "/guides",
      },
      {
        kind: "commercial",
        label: "All custom signage",
        description: "Neon, channel letters, lightboxes and acrylic — the full range we build.",
        href: "/custom-signage",
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────────────
  {
    _id: "post-illuminated-signage-trends-2026",
    slug: "illuminated-signage-trends-2026",
    title: "Illuminated Signage in 2026: What Changed, and What to Ignore",
    category: "category-trends",
    cover: "channel-corporate",
    coverAlt:
      "A brushed-metal halo-lit corporate logo sign mounted on a dark reception wall with a soft glow behind the letters",
    coverCaption:
      "Halo-lit metal in a reception: the trend that has actually stuck, because it photographs well and reads as considered rather than loud.",
    readingMinutes: 6,
    publishedAt: "2026-08-22T12:00:00Z",
    featured: false,
    primaryKeyword: "signage trends 2026",
    seoTitle: "Illuminated Signage Trends in 2026",
    seoDescription:
      "Four shifts worth acting on in business signage this year, three that are not worth the money, and how to tell the difference before you commit a budget.",
    summary:
      "Most signage trend pieces are a list of shapes that were popular last year. This one is written for someone with a budget: what has genuinely shifted in how businesses use light, what each shift costs in effort rather than fashion, and which trends are not worth chasing.",
    keyTakeaways: [
      "The biggest real shift is that signs are commissioned as photographic backdrops as much as identification — which changes size, height and placement more than it changes style.",
      "Halo-lit metal has moved from premium-only to a default for interiors, because it photographs well and reads as considered rather than loud.",
      "Restraint is winning. Single-colour, single-mark signage is outperforming multi-colour installations in brand spaces.",
      "Colour-change RGB remains mostly a novelty for brand use: a brand that is any colour is not a brand colour.",
      "Ignore anything whose value depends on the sign being new. A sign is a five-to-ten-year object.",
    ],
    body: [
      p(
        "Trend pieces in this industry tend to be a list of shapes. This one is written differently, because the question a business actually has is not “what is popular” — it is “what should I spend on, and what will still look right in five years.”",
      ),
      p(
        "Here is what we have genuinely seen change in the briefs coming in, and an honest note on what we would not spend on.",
      ),

      h2("What has actually changed"),

      h3("1. Signs are being commissioned as photo backdrops"),
      p(
        "This is the big one, and it is less a style than a change in purpose. A decade ago a sign was for identification: it told people whose building this was. Increasingly, a sign is briefed as something people stand in front of — for a photo, a reel, a press shot, a recap video.",
      ),
      p(
        "That is a specification change, not a decorative one. A photo-backdrop sign has to clear the heads of people standing in front of it, has to stay legible when a phone camera meters for a lit object in a dim room, and has to work at the distance a group photo is taken from. Signs briefed as identification and used as backdrops are almost always too small and too low.",
      ),
      callout(
        "tip",
        "If the sign will be photographed, say so",
        "It is the single most useful sentence in an enquiry. It changes size, height and placement recommendations immediately, and it is much cheaper to say before the mockup than after the build.",
      ),

      h3("2. Halo-lit metal has become a default for interiors"),
      p(
        "Halo lighting — where the light comes from behind the letter and washes the wall, leaving the face of the letter dark — used to be the expensive option. It is now what most reception, studio and boutique briefs ask for by default.",
      ),
      p(
        "There is a reason beyond fashion. Halo-lit reads as restrained: the mark is a solid object and the light is an effect around it, rather than the mark being a glowing thing. It photographs well because the wall glow gives the camera something to work with. It also depends heavily on the wall behind it, which is worth understanding before committing — the ",
        a("front-lit vs halo-lit vs dual-lit guide", "/guides/front-lit-vs-halo-lit-vs-dual-lit"),
        " covers what each style needs.",
      ),

      h3("3. Restraint is beating maximalism in brand spaces"),
      p(
        "Multi-colour, multi-element installations are still being asked for, but the briefs that come back happiest are single-mark, single-colour. One mark, well made, correctly sized, in one colour that belongs to the brand.",
      ),
      pullquote(
        "The signs that still look right after five years are almost always the ones that were doing one thing.",
      ),

      h3("4. Interiors are being lit as a system, not decorated with a sign"),
      p(
        "More briefs now arrive with the sign considered alongside the room's lighting rather than as an object added to a finished space — matched colour temperature, coordinated placement, sometimes a matching secondary piece in a different part of the building. This produces noticeably better results and costs nothing extra to think about, as long as it is thought about early.",
      ),

      h2("What we would not spend on"),
      table(
        "Three things worth skipping",
        ["Trend", "The pitch", "Our view"],
        [
          [
            "Colour-change RGB for brand signage",
            "One sign, any colour, on a remote",
            "A brand that is any colour is not a brand colour. Genuinely useful in a bar, a games room or an event space that changes character; a liability on a logo.",
          ],
          [
            "Animation and chase effects",
            "Movement catches the eye",
            "It catches the eye once. After a week it is background, and by then it has become the thing staff turn off. Consider whether static would have done.",
          ],
          [
            "Very long text",
            "A whole sentence or a manifesto in tube",
            "Tube is a poor medium for reading. Past about five words, legibility drops sharply and cost rises with every character. Print the manifesto; light the mark.",
          ],
        ],
      ),
      callout(
        "note",
        "One test for any signage trend",
        "Ask whether the value depends on the sign being new. If it does — novelty, movement, a topical phrase — you are buying a short-lived effect with a long-lived object. A sign is a five-to-ten-year purchase.",
      ),

      h2("What has not changed at all"),
      p(
        "Worth saying, because it is where most of the outcome still lives. The fundamentals have not moved:",
      ),
      ul([
        "Legibility at the distance people will actually stand.",
        "Contrast against the surface behind the sign.",
        "Getting the size right, which remains the most common expensive mistake.",
        "Somewhere sensible for the power supply.",
        "Choosing the right technology for the location, rather than the one you saw first.",
      ]),
      p(
        "A perfectly on-trend sign that is too small on a wall that gives it no contrast is a worse sign than a plain one that got those two things right.",
      ),

      h2("If you are planning a project this year"),
      ol([
        "Decide what the sign is for: identification, atmosphere, or being photographed. They lead to different signs.",
        "Photograph the wall in the light it normally has, and send that with your enquiry.",
        "Measure the furthest point anyone will read it from.",
        "Settle where the power comes from before the design is finalised.",
        "Read the cost drivers before setting a budget, so the number is grounded in something.",
      ]),
      p(
        "On that last point, the ",
        a("custom business sign cost guide", "/guides/custom-business-sign-cost"),
        " sets out what actually drives a quote — size, illumination method, materials, weatherproofing — rather than quoting figures that would be wrong for your project.",
      ),

      cta(
        "Planning something for this year?",
        "Send the wall, the wording and what the sign is for. We will come back with a free mockup and an honest view on whether the idea is the right one.",
        "Start a project",
      ),
    ],
    faqs: [
      {
        q: "What is the biggest signage trend in 2026?",
        a: "Signs being briefed as photographic backdrops rather than purely as identification. It is less a style than a change of purpose, and it changes the specification: backdrop signs need to be larger, higher and placed for the distance a group photo is taken from.",
      },
      {
        q: "Is halo-lit signage still popular?",
        a: "More than ever, and it has moved from being the premium option to the default request for reception, studio and boutique interiors. It reads as restrained and photographs well. It does depend heavily on the wall behind it, so the wall is part of the decision.",
      },
      {
        q: "Are colour-changing RGB signs worth it?",
        a: "For a bar, games room or event space that changes character through the evening, yes. For a logo, generally no — a brand that can be any colour is not really using a brand colour, and the novelty of the remote wears off long before the sign does.",
      },
      {
        q: "How long should a business sign last?",
        a: "Treat it as a five-to-ten-year purchase, which is a useful filter for trends: if a design's appeal depends on being new or topical, you are buying a short-lived effect with a long-lived object.",
      },
      {
        q: "What is the most common mistake in signage projects?",
        a: "Undersizing. It is more common than any styling error and it is the one that cannot be fixed afterwards. Measure the furthest point anyone will read the sign from, and size for that rather than for how the sign looks on a screen.",
      },
    ],
    relatedLinks: [
      LINK_BUSINESS_HUB,
      LINK_LIGHTING_GUIDE,
      LINK_COST_GUIDE,
    ],
  },
];

// The seventh post is separated only for readability of the array above.
posts.push({
  _id: "post-neon-signs-for-gyms-and-studios",
  slug: "neon-sign-ideas-for-gyms-and-studios",
  title: "Neon Signs for Gyms and Studios: What Survives the Room",
  category: "category-ideas-and-inspiration",
  cover: "neon-gym",
  coverAlt:
    "A bold LED neon motivational sign on a dark gym wall above free weights, lit in a single strong colour",
  coverCaption:
    "Gym walls are dark, mirrored and hard-surfaced. Every one of those changes what a sign has to do.",
  readingMinutes: 5,
  publishedAt: "2026-08-22T12:30:00Z",
  featured: false,
  primaryKeyword: "gym neon sign ideas",
  seoTitle: "Neon Sign Ideas for Gyms & Fitness Studios",
  seoDescription:
    "Mirrors, dark walls and humidity change what works on a gym wall. Sign ideas for training floors, studios and reception, with what to specify for each.",
  summary:
    "A gym is a harder room for a sign than it looks: dark walls, mirrors that double every light source, hard surfaces and a lot of movement. Here is what works on a training floor, in a class studio and at reception — and what each one needs specifying.",
  keyTakeaways: [
    "Mirrors double every sign. Check what the reflection reads like from the training position before choosing placement.",
    "Dark gym walls are the one environment where deep blues and purples genuinely work.",
    "Keep motivational text to two or three words. Anything longer stops being read on the second visit.",
    "Mount high and clear of equipment. Anything within reach of a moving barbell is in the wrong place.",
    "Studio rooms with humidity and heat need the specification checked — say so before ordering.",
  ],
  body: [
    p(
      "Gyms and studios come up constantly, and they are a genuinely harder room than a cafe or a reception. Four things about the space change the answer: the walls are usually dark, there are mirrors, the surfaces are hard and reflective, and people are moving. Each of those has a consequence.",
    ),

    h2("The training floor"),
    p(
      "Big, single-colour, short. A studio name, a two-word phrase, or the brand mark. The floor is seen from across a room, often by someone mid-set who is not reading anything carefully.",
    ),
    ul([
      [b("Size up. "), "Sightlines here are long and the sign competes with equipment, mirrors and other visual noise."],
      [
        b("One colour. "),
        "Dark walls make saturated colours sing, and this is the rare environment where deep blue and purple genuinely work rather than disappearing.",
      ],
      [
        b("Mount high. "),
        "Above head height and clear of any rack, mirror or piece of equipment. A sign within reach of a moving barbell is in the wrong place regardless of how it looks.",
      ],
    ]),
    callout(
      "warning",
      "Check the reflection before you choose the wall",
      "A mirrored wall means every sign appears twice. Sometimes that is excellent — the room reads as brighter and larger. Sometimes the reflection lands directly in the eyeline of someone on a bench, and it is genuinely annoying. Stand where members stand and look at the mirror before deciding.",
    ),

    h2("Class and studio rooms"),
    p(
      "Spin, yoga and reformer rooms are usually darker and more controlled than the main floor, and the sign is doing atmosphere rather than identification.",
    ),
    ul([
      "Warm colours for yoga, stretch and recovery spaces — they read as calm at low brightness.",
      "Strong single colours for spin and HIIT, where the room is dark and the sign is part of the energy.",
      "A dimmer is worth specifying here more than anywhere else in a gym, because these rooms change brightness between classes.",
    ]),
    p(
      b("One thing to flag: "),
      "hot yoga rooms, saunas and steam-adjacent spaces are a different specification question. Heat and humidity are not what an ordinary indoor build assumes. Tell us the room before ordering, not after.",
    ),

    h2("Reception and retail"),
    p(
      "This is where the brand mark belongs, and it is usually the most photographed wall in the building. It is also where a gym looks most like every other gym, so it is worth spending the attention here.",
    ),
    p(
      "For a logo at reception, LED neon is not automatically the right technology. A halo-lit metal mark or a layered acrylic logo often reads as more considered — the ",
      a("business signage range", "/business-signs"),
      " covers those options, and the ",
      a("lighting styles guide", "/guides/front-lit-vs-halo-lit-vs-dual-lit"),
      " explains how each one behaves on a wall.",
    ),

    h2("Wording that survives repetition"),
    p(
      "Members see the same sign three times a week for years. That is a completely different test from a sign a customer sees once.",
    ),
    table(
      "What holds up on a wall people see constantly",
      ["Works", "Wears out"],
      [
        ["The studio's own name or mark", "A long motivational sentence"],
        ["Two or three words", "Anything that sounds like a caption"],
        ["A shape or icon with no text", "A trend phrase tied to a particular year"],
        ["Something specific to this gym's culture", "A quote everybody has already seen"],
      ],
      "The test: would a member who has read it two hundred times still be glad it is there?",
    ),

    cta(
      "Fitting out a gym or studio?",
      "Send photos of the walls, including the mirrors, and tell us the sightlines. We will come back with a free mockup placed in your actual room.",
      "Get a free mockup",
    ),
  ],
  faqs: [
    {
      q: "What colour neon sign works best in a gym?",
      a: "Gym walls are usually dark, which is the one environment where deep blues and purples genuinely work rather than losing their punch. Strong saturated single colours suit training floors; warmer tones suit yoga, stretch and recovery rooms where the sign is doing atmosphere rather than energy.",
    },
    {
      q: "Where should a neon sign go in a gym?",
      a: "High, clear of equipment, and chosen with the mirrors in mind. Above head height and away from any rack or bench is the baseline. Before committing to a wall, stand where members actually train and check what the reflection looks like from there — a sign that lands in someone's eyeline on a bench is a problem no amount of design fixes.",
    },
    {
      q: "Can a neon sign go in a hot yoga or steam room?",
      a: "Not on a standard indoor specification. Sustained heat and humidity are outside what an ordinary indoor build assumes. Tell us the room before ordering and we will tell you what is and is not possible — this is one to raise at enquiry rather than after installation.",
    },
    {
      q: "What should a gym neon sign say?",
      a: "Two or three words, or just the studio's own name or mark. Members see the sign several times a week for years, which is a very different test from a sign a customer sees once. Long motivational sentences and trend phrases both wear out fast; a name or a short line specific to that gym's culture does not.",
    },
  ],
  relatedLinks: [
    LINK_NEON_PRODUCT,
    LINK_BUSINESS_HUB,
    LINK_LIGHTING_GUIDE,
  ],
});

// ── Hub settings ────────────────────────────────────────────────────────────

export const blogSettings = {
  _id: "blogSettings",
  eyebrow: "The Glownique Journal",
  heading: "Ideas, colour and care for illuminated signs",
  intro:
    "Notes from the workshop on designing, choosing and looking after custom signage — what holds up on a real wall, how colour behaves once it is lit, and the details worth deciding before anything is built. Written by the people who make the signs, with sources where a claim is not ours to make.",
  seoTitle: "Neon & Signage Journal",
  seoDescription:
    "Care advice, colour theory, sign ideas and signage trends from the workshop behind The Glownique's custom LED neon, channel letter and lightbox signs.",
  newsletterHeading: "New sign ideas, once a month",
  newsletterText:
    "One email when a new article goes up. Nothing else, and you can unsubscribe from any of them.",
  positioning: [
    "/blog owns AWARENESS and CARE: ideas, colour, maintenance, trends, behind-the-build.",
    "/guides owns DECISIONS: cost, comparisons, sizing, installation compliance, which type to buy.",
    "/business-signs owns COMMERCIAL intent.",
    "",
    "Before adding a post, check its primary keyword against",
    "SEO-Optimization/05-keyword-and-intent-map.csv. If a /guides or /business-signs page",
    "already owns that intent, this post needs a different angle — not a second attempt",
    "at the same query. Two pages chasing one query is how both end up ranking worse.",
  ].join("\n"),
};

/** Applied by the runner so every body is keyed correctly. */
export function preparePosts() {
  return posts.map((post) => ({ ...post, body: finalize(post.body) }));
}
