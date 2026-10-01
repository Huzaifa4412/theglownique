import type { DetailImage } from "@/components/detail/detail-gallery";
import { DELIVERY, LEAD_TIME, WARRANTY } from "@/lib/claims";

/**
 * Content for /business-signs/backlit-signs — the backlit sign detail page and
 * the landing page for the backlit Meta campaigns.
 *
 * Everything the page states lives here so the visible copy, the JSON-LD and
 * llms.txt read the same sentences. Claims follow lib/claims.ts and the owner
 * answers in SEO-Optimization/growth-system/OWNER-QUESTIONS.md: free mockup
 * within 24 hours, unlimited revisions, production counted from mockup
 * approval, free worldwide delivery, 5-year warranty, "stainless steel" with no
 * grade. No price, rating, review count, dimmer or remote is stated: none of
 * those has an approved basis for this sign type.
 *
 * ── Photographs ─────────────────────────────────────────────────────────────
 * public/backlit-signs/ holds the shop's own Etsy listing images (fetched
 * 2026-10-01 from etsy.com/shop/TheGlownique) and the two listing videos. The
 * stills are design previews showing sample logos, so every alt says "design
 * preview" and the page carries a visible note; the videos are close-ups of
 * fabricated letters. Swap a preview for a customer photo when one exists.
 *
 * ── Etsy links ──────────────────────────────────────────────────────────────
 * Each space links the listing whose first photo is the one shown above the
 * button, so the visitor lands on the picture they tapped. Canonical listing
 * URLs, no tracking parameters. Listings verified live on 2026-10-01; a
 * deactivated listing 404s on Etsy, so re-check these when the shop is edited.
 */

export const BACKLIT_PATH = "/business-signs/backlit-signs";

/** ISO date of the last material change. Mirrors lib/routes.ts. */
export const BACKLIT_UPDATED_ON = "2026-10-01";
export const BACKLIT_UPDATED_LABEL = "October 1, 2026";

const IMG = "/backlit-signs";
const etsyListing = (id: string, slug: string) => `https://www.etsy.com/listing/${id}/${slug}`;

/** The general backlit listing: the hero and closing "Order on Etsy" buttons. */
export const BACKLIT_ETSY_URL = etsyListing("4550548165", "custom-led-signs-salon-business-sign");

export type BacklitImage = DetailImage;

// ── Direct answer ───────────────────────────────────────────────────────────

/** The quotable definition: under the H1, in Product.description and llms.txt. */
export const BACKLIT_ANSWER =
  "A backlit sign is a set of solid metal letters or a logo with LEDs hidden inside, mounted a short distance off the wall. The light leaves the back of each letter and reflects off the wall, so the logo appears to float in a soft halo. It is also called a halo-lit or reverse-lit sign.";

/** Under the H1. The second sentence is dropped on phones to keep the buttons in view. */
export const BACKLIT_LEDE = {
  lead: "Your logo in stainless steel, lit from behind.",
  rest: "Made to order for hair salons, nail salons, beauty studios, lobbies and offices.",
} as const;

// ── Hero gallery ────────────────────────────────────────────────────────────

export const BACKLIT_HERO_IMAGES: readonly BacklitImage[] = [
  {
    src: `${IMG}/backlit-hair-salon-logo-sign-gold-scissors.webp`,
    alt: "Design preview of a backlit hair salon sign: a gold scissors logo and lettering glowing warm white on a plaster wall above a marble desk",
    label: "Hair salon",
  },
  {
    src: `${IMG}/backlit-nail-salon-logo-sign-reception.webp`,
    alt: "Design preview of a backlit nail salon sign in mirror gold, lit warm white above a white reception desk",
    label: "Nail salon",
  },
  {
    src: `${IMG}/backlit-beauty-salon-logo-sign-gold.webp`,
    alt: "Design preview of a backlit beauty salon sign: a gold profile logo with a pink flower and script lettering, halo-lit on a cream wall",
    label: "Beauty salon",
  },
  {
    src: `${IMG}/backlit-lobby-sign-reception-desk-wood-wall.webp`,
    alt: "Design preview of a backlit lobby sign in rose gold, glowing on a dark wood wall behind a reception desk",
    label: "Lobby",
  },
  {
    src: `${IMG}/backlit-office-sign-reception-wall.webp`,
    alt: "Design preview of a backlit office sign in mirror gold on a white reception wall, with a meeting room behind glass",
    label: "Office",
    position: "50% 38%",
  },
];

// ── Spaces ──────────────────────────────────────────────────────────────────

export type BacklitSpace = {
  /** Anchor id — an ad can land on /business-signs/backlit-signs#nail-salon. */
  id: string;
  /** Short name for the jump links and the WhatsApp message. */
  name: string;
  heading: string;
  /** Answer-first paragraph for this space. */
  answer: string;
  /** What we would choose here, and why. */
  picks: readonly { label: string; value: string }[];
  images: readonly BacklitImage[];
  etsyUrl: string;
  /** Deeper page for this kind of premises, where one exists. */
  more?: { href: string; label: string };
};

export const BACKLIT_SPACES: readonly BacklitSpace[] = [
  {
    id: "hair-salon",
    name: "Hair salon",
    heading: "Backlit signs for hair salons",
    answer:
      "A backlit hair salon sign puts your name or logo in solid metal on the wall behind the front desk, or on the wall clients face from the chair. Because the light is indirect, there is no bright lit face in the mirror: clients see a crisp metal logo with a soft glow around it.",
    picks: [
      { label: "Where", value: "Behind the front desk, or the wall facing the styling chairs" },
      { label: "Finish", value: "Mirror or brushed titanium gold on light plaster; black titanium on white" },
      { label: "Glow", value: "Warm white, which sits well with salon lighting" },
      { label: "Size", value: "About half to three-quarters of the desk width" },
    ],
    images: [
      {
        src: `${IMG}/backlit-hair-salon-sign-monogram-scissors.webp`,
        alt: "Design preview of a backlit hair salon monogram: a black letter K crossed with scissors, halo-lit on a plaster wall beside styling stations",
        label: "Monogram",
      },
      {
        src: `${IMG}/backlit-hair-studio-sign-mirror-gold.webp`,
        alt: "Design preview of a backlit hair studio sign in mirror gold letters, lit warm white above a dark marble desk",
        label: "Mirror gold",
      },
      {
        src: `${IMG}/backlit-hair-salon-sign-mirror-gold-letters.webp`,
        alt: "Design preview of backlit hair salon lettering in mirror gold, serif capitals over a script line, glowing on a beige wall",
        label: "Serif and script",
      },
    ],
    etsyUrl: etsyListing("4550557282", "custom-led-signs-salon-business-sign"),
    more: { href: "/business-signs/salon-spa-signs", label: "All salon and spa signs" },
  },
  {
    id: "nail-salon",
    name: "Nail salon",
    heading: "Backlit signs for nail salons",
    answer:
      "A backlit nail salon sign is read up close and for a long time, by clients sitting at the manicure tables. Cut metal holds the detail a nail brand usually has, such as a polish bottle, a hand or a fine line of text, and one painted accent color can carry your brand shade.",
    picks: [
      { label: "Where", value: "The wall behind the front desk, in view of the manicure tables" },
      { label: "Finish", value: "Mirror gold or rose gold; matte black on a pale wall" },
      { label: "Glow", value: "Warm white, or a custom color to match your brand" },
      { label: "Detail", value: "Small taglines can be flat cut metal while the main logo lights" },
    ],
    images: [
      {
        src: `${IMG}/backlit-nail-salon-sign-dark-wall.webp`,
        alt: "Design preview of a backlit nail salon sign on a dark panel wall: gold letters with a red nail polish drip, glowing amber",
        label: "Dark wall",
      },
      {
        src: `${IMG}/backlit-nail-salon-logo-sign-reception.webp`,
        alt: "Design preview of a backlit nail salon logo in mirror gold, a hand and lips above the salon name, over a white reception desk",
        label: "Gold logo",
      },
      {
        src: `${IMG}/backlit-nail-studio-sign-front-desk.webp`,
        alt: "Design preview of a backlit nail studio sign in brushed gold on white wall panelling behind a marble front desk",
        label: "Front desk",
      },
    ],
    etsyUrl: etsyListing("4584459985", "reception-sign-custom-lobby-logo-backlit"),
    more: { href: "/business-signs/salon-spa-signs", label: "All salon and spa signs" },
  },
  {
    id: "beauty-salon",
    name: "Beauty salon",
    heading: "Backlit signs for beauty salons, spas and lash studios",
    answer:
      "A backlit beauty salon sign suits the logos beauty brands tend to have: a face in profile, flowing hair, a flower, a script name. Each shape is cut from metal and lit from behind, and colored elements such as a pink flower or red lips can be added to the metal finish.",
    picks: [
      { label: "Where", value: "Reception wall, or the photo wall clients stand against" },
      { label: "Finish", value: "Mirror gold or champagne gold; rose gold for softer palettes" },
      { label: "Glow", value: "Warm white, or pink and other custom colors" },
      { label: "Shape", value: "Square logos work as well as wide ones: sized to the wall" },
    ],
    images: [
      {
        src: `${IMG}/backlit-beauty-salon-logo-sign-gold.webp`,
        alt: "Design preview of a backlit beauty salon logo in mirror gold with a pink flower, halo-lit above a marble counter",
        label: "Gold and pink",
      },
      {
        src: `${IMG}/backlit-beauty-salon-spa-sign-black-gold.webp`,
        alt: "Design preview of a backlit salon and spa sign: black flowing hair logo with gold script lettering, glowing on a cream wall",
        label: "Black and gold",
      },
      {
        src: `${IMG}/backlit-beauty-salon-sign-pink-glow.webp`,
        alt: "Design preview of a backlit beauty salon sign in rose gold letters with a pink glow, on a blush wall above a pink reception desk",
        label: "Pink glow",
      },
    ],
    etsyUrl: etsyListing("4575229153", "backlit-business-logo-led-metal-wall-art"),
    more: { href: "/business-signs/salon-spa-signs", label: "All salon and spa signs" },
  },
  {
    id: "lobby-sign",
    name: "Lobby",
    heading: "Backlit lobby signs",
    answer:
      "A backlit lobby sign is the logo a visitor sees from the door, centered on the wall behind the reception desk. Lit from behind, it reads as metal by day and gains a halo as the room dims, which is why it is the usual choice for reception walls in hotels, clinics and studios.",
    picks: [
      { label: "Where", value: "Centered behind the reception desk, at eye level from the door" },
      { label: "Finish", value: "Brushed finishes for stone and wood; mirror for plain plaster" },
      { label: "Glow", value: "Matched to the room: warm white for warm lighting, cool white for bright white interiors" },
      { label: "Wall", value: "Matte walls glow evenly; gloss, glass and mirror need a backer panel" },
    ],
    images: [
      {
        src: `${IMG}/backlit-lobby-sign-reception-desk-wood-wall.webp`,
        alt: "Design preview of a backlit lobby sign in rose gold on a dark timber wall behind a wooden reception desk",
        label: "Wood wall",
      },
      {
        src: `${IMG}/backlit-reception-sign-monogram-gold.webp`,
        alt: "Design preview of a backlit reception sign: large mirror-gold initials with a script name across them, glowing on a plaster wall",
        label: "Monogram",
      },
      {
        src: `${IMG}/backlit-lobby-logo-sign-arched-wall.webp`,
        alt: "Design preview of a backlit lobby logo in champagne gold, initials with a butterfly outline, lit on a warm plaster wall",
        label: "Line logo",
      },
    ],
    etsyUrl: etsyListing("4584462169", "reception-sign-custom-lobby-logo-backlit"),
    more: { href: "/business-signs/backlit-lobby-signs", label: "Backlit lobby sign guide: sizing, leases and mounting" },
  },
  {
    id: "office-sign",
    name: "Office",
    heading: "Backlit office signs",
    answer:
      "A backlit office sign puts the company name on the reception wall, a boardroom wall or the corridor outside the suite. It is made from your logo file in your brand finish, and the halo keeps a plain wordmark from looking flat on a large empty wall.",
    picks: [
      { label: "Where", value: "Reception wall, boardroom, or the corridor outside your suite" },
      { label: "Finish", value: "Matte black or brushed silver for a quiet look; mirror gold to stand out" },
      { label: "Glow", value: "Warm white on plaster and wood; cool white on white or gray walls" },
      { label: "Logo", value: "Send AI, PDF or SVG so the letterforms match your brand exactly" },
    ],
    images: [
      {
        src: `${IMG}/backlit-office-sign-reception-wall.webp`,
        alt: "Design preview of a backlit office sign in mirror gold lettering on a white wall above a reception desk",
        label: "Reception wall",
        position: "50% 38%",
      },
      {
        src: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.webp",
        alt: "Design preview of a backlit office sign in matte black capitals with an amber halo on a gray plaster wall",
        label: "Matte black",
      },
      {
        src: "/3d-metallic-neon-sign/corporte/custom-3d-metal-channel-letter-sign-office.webp",
        alt: "Design preview of a backlit office wordmark in black lowercase letters, halo-lit on a dark textured wall",
        label: "Dark wall",
      },
    ],
    etsyUrl: etsyListing("4575898470", "custom-led-sign-3d-metal-logo-backlit"),
    more: { href: "/business-signs/office-signs", label: "All office and reception signs" },
  },
];

// ── How it is built ─────────────────────────────────────────────────────────

export const BACKLIT_ANATOMY = [
  {
    part: "The face",
    text: "Each letter and logo shape is cut from stainless steel and finished in mirror, brushed or antique metal. The face is solid, so it stays unlit and reads as metal in daylight.",
  },
  {
    part: "The sides",
    text: "Metal sides, called returns, give each letter its depth, from 0.8 in to 3.5 in and beyond. Deeper letters look heavier and cast a wider shadow by day.",
  },
  {
    part: "The LEDs",
    text: "Low-voltage 12V LED modules sit inside the hollow letter and face the wall. You choose warm white, cool white, RGB color-changing or a custom color.",
  },
  {
    part: "The gap",
    text: "Standoffs hold the letters off the wall, usually 0.6 to 1.5 in. A small gap gives a tight outline of light; a larger one gives a wider, softer halo.",
  },
] as const;

export const BACKLIT_FINISH_GROUPS = [
  { group: "Mirror", finishes: "Silver, titanium gold, rose gold, champagne gold, black titanium, copper" },
  { group: "Brushed", finishes: "Silver, titanium gold, rose gold, champagne gold, black titanium, copper" },
  { group: "Antique", finishes: "Brass, silver, copper" },
  { group: "Painted", finishes: "Matte black, or a brand color matched to a Pantone, HEX or CMYK reference" },
] as const;

export const BACKLIT_LIGHT_OPTIONS = [
  { name: "Warm white", text: "A soft golden white. The usual choice for salons, spas and rooms with warm lighting." },
  { name: "Cool white", text: "A clean, bright white. Suits white walls, gray stone and modern offices." },
  { name: "RGB color-changing", text: "One sign, many colors. Useful when the glow should change with a season or an event." },
  { name: "Custom color", text: "A fixed glow in your brand color, such as pink, blue or amber." },
  { name: "No light", text: "The same metal letters without LEDs, where a wall has no power." },
] as const;

export const BACKLIT_SPECS = [
  { label: "Construction", value: "Fabricated stainless-steel letters and logo shapes, hollow, with LEDs inside" },
  { label: "Lighting", value: "Halo (backlit): light leaves the back of each letter and reflects off the wall" },
  { label: "Light colors", value: "Warm white, cool white, RGB color-changing, custom color, or unlit" },
  { label: "Metal finishes", value: "Mirror, brushed and antique finishes in gold, rose gold, champagne gold, silver, copper, brass and black titanium; painted colors on request" },
  { label: "Letter depth", value: "0.8 in to 3.5 in and beyond, custom" },
  { label: "Gap from the wall", value: "Usually 0.6 to 1.5 in (15 to 40 mm), set for your wall on the mockup" },
  { label: "LEDs", value: "Low-voltage 12V modules" },
  { label: "Size", value: "Made to your logo and wall; no standard sizes" },
  { label: "Mounting", value: "On standoffs, direct to the wall or on a backer panel" },
  { label: "Where it goes", value: "Built for interiors. Outdoor builds on request" },
  { label: "Artwork we need", value: "AI, PDF, SVG or a high-resolution PNG of your logo" },
  { label: "Mockup", value: "Free, within 24 hours, with unlimited revisions" },
  { label: "Production", value: `${LEAD_TIME.otherProductionDays.replace("-", " to ")} from mockup approval` },
  { label: "Delivery", value: `${DELIVERY.short}, tracked, ${LEAD_TIME.transit.replace("-", " to ")}` },
  { label: "Warranty", value: WARRANTY.term },
] as const;

// ── Tables ──────────────────────────────────────────────────────────────────

export const BACKLIT_SIZE_ROWS = [
  { desk: "Small desk, 4 to 5 ft", sign: "28 to 36 in wide", note: "Center it at eye level behind the desk" },
  { desk: "Standard desk, 6 to 8 ft", sign: "42 to 58 in wide", note: "Center the logo about 60 to 66 in from the floor" },
  { desk: "Long desk, 10 to 12 ft", sign: "60 to 84 in wide", note: "Suits wide or double-height lobbies" },
  { desk: "Feature wall, no desk", sign: "40% to 60% of the wall width", note: "Boardrooms, corridors and photo walls" },
] as const;

export const BACKLIT_WALL_ROWS = [
  { wall: "Matte painted drywall, light", glow: "Wide, even halo. The best surface for a backlit sign", mount: "Direct to the wall on standoffs" },
  { wall: "Wood panel or slat wall", glow: "Warm glow; slats add a soft striped shadow", mount: "Fixed into the solid timber behind" },
  { wall: "Dark matte paint", glow: "A tight, dramatic outline: dark walls absorb light", mount: "A smaller gap, or a lighter backer panel" },
  { wall: "Brick or textured stone", glow: "An uneven, rustic glow that follows the texture", mount: "A larger gap, or a backer panel" },
  { wall: "Gloss paint, glass, mirror, polished tile", glow: "Reflects the LEDs as bright dots", mount: "Always on a matte backer panel" },
] as const;

export type BacklitComparisonRow = {
  type: string;
  href?: string;
  light: string;
  look: string;
  bestFor: string;
  watch: string;
};

export const BACKLIT_COMPARISON: readonly BacklitComparisonRow[] = [
  {
    type: "Backlit (halo-lit) metal letters",
    light: "From the back of each letter, onto the wall",
    look: "Solid metal logo in a soft halo",
    bestFor: "Reception walls, salons, lobbies, offices",
    watch: "Needs a matte wall; glossy walls need a backer panel",
  },
  {
    type: "Front-lit channel letters",
    href: "/business-signs/channel-letter-signs",
    light: "Through the face of each letter",
    look: "Bright, colored letters",
    bestFor: "Storefronts read from across a street",
    watch: "Can feel too bright in a small room",
  },
  {
    type: "LED neon sign",
    href: "/products/custom-neon-signs",
    light: "A glowing line of silicone LED neon",
    look: "Colorful and playful",
    bestFor: "Photo walls, quotes, bars, events",
    watch: "Fine logo detail is simplified into lines",
  },
  {
    type: "Slim lightbox",
    href: "/business-signs/lightbox-signs",
    light: "A whole printed panel, lit evenly",
    look: "A flat, glowing graphic",
    bestFor: "Menus, photos and artwork that changes",
    watch: "Reads as a panel, not as separate letters",
  },
];

// ── Ordering ────────────────────────────────────────────────────────────────

export const BACKLIT_STEPS = [
  { name: "Send your logo", text: "Message us on WhatsApp or Etsy with your logo or business name, the wall width, and a photo of the wall if you have one." },
  { name: "Get a free mockup", text: "Within 24 hours you receive a mockup showing size, finish and glow on your wall. Revisions are free and unlimited." },
  { name: "Approve and get your quote", text: "The quote is for your exact sign: its size, number of letters, finish and lighting. Nothing is charged before you approve." },
  { name: "Pay through Etsy", text: "Payment runs through Etsy's checkout, in full or split 50/50." },
  { name: "We build it", text: `Your sign is fabricated and light-tested in ${LEAD_TIME.otherProductionDays.replace("-", " to ")}, counted from mockup approval. Rush orders cost nothing extra: tell us your date.` },
  { name: "Delivered to your door", text: `${DELIVERY.short}, tracked, in ${LEAD_TIME.transit.replace("-", " to ")}.` },
] as const;

// ── FAQs ────────────────────────────────────────────────────────────────────

export const BACKLIT_FAQS = [
  {
    q: "What is a backlit sign?",
    a: BACKLIT_ANSWER,
  },
  {
    q: "Is a backlit sign the same as a halo-lit sign?",
    a: "Yes. Backlit, halo-lit, reverse-lit and reverse channel letters all describe solid letters that throw light backward onto the wall. The word backlit is also used for lightboxes, where a printed panel is lit from behind. That is a different sign: a lightbox glows as one flat panel, while backlit letters are separate metal shapes.",
  },
  {
    q: "How much does a custom backlit sign cost?",
    a: "There is no list price, because every backlit sign is made to one logo. The quote depends on the overall size, the number of letters and shapes, the metal finish and the lighting. Send your logo and wall width and you get a free mockup within 24 hours, then a quote for that exact sign. The price shown on an Etsy listing is a placeholder, not your final price.",
  },
  {
    q: "How long does a backlit sign take to make and deliver?",
    a: `The free mockup comes back within 24 hours. After you approve it, the sign takes ${LEAD_TIME.otherProductionDays.replace("-", " to ")} to make and ${LEAD_TIME.transit.replace("-", " to ")} to deliver, free and tracked. Rush orders cost nothing extra: give us your opening date when you ask for the mockup.`,
  },
  {
    q: "What size should a backlit sign be?",
    a: "Size it to the wall and the furniture, not to reading distance. Behind a reception desk, a sign about half to three-quarters of the desk width looks balanced: 42 to 58 inches for a 6 to 8 foot desk. On a wall with no desk, aim for 40% to 60% of the wall width. Send a photo and the mockup shows the sign at scale.",
  },
  {
    q: "Which walls work best for a backlit sign?",
    a: "Matte walls in a light or mid tone give the widest, most even halo: painted drywall, plaster, matte stone and wood. Dark walls absorb light, so the glow becomes a tight outline. Gloss paint, glass, mirror and polished tile reflect the LEDs as bright dots, so on those the letters go on a matte backer panel.",
  },
  {
    q: "Can my logo be made as a backlit sign?",
    a: "Most logos can. Each letter is a hollow metal shape with LEDs inside, so very thin strokes and small text may be thickened slightly or made as flat, unlit metal beside the lit logo. Brand colors can be added as painted elements. Your mockup shows exactly which parts light up before anything is made.",
  },
  {
    q: "Which metal finishes and light colors can I choose?",
    a: "Finishes include mirror, brushed and antique metals in gold, rose gold, champagne gold, silver, copper, brass and black titanium, plus matte black and painted brand colors. Light options are warm white, cool white, RGB color-changing, a custom color, or no light at all.",
  },
  {
    q: "Do you install the sign?",
    a: "No. We make the sign and ship it prepared for the mounting method shown on your mockup: on standoffs direct to the wall, or on a backer panel. A local sign installer or contractor mounts it, and a licensed electrician makes any hard-wired electrical connection.",
  },
  {
    q: "Can a backlit sign go outdoors?",
    a: "Yes, as an outdoor build. Backlit signs are made for interiors by default. An exterior sign uses IP67-rated LED modules and an outdoor power supply, and an indoor sign should not be moved outside. Tell us the sign is going outdoors and the quote covers the outdoor build.",
  },
  {
    q: "Does a backlit sign show up in a bright room?",
    a: "Yes, but differently. In a bright room the sign reads as raised metal letters and the halo is subtle. As the room dims, in the evening or under softer lighting, the glow becomes the main effect. A front-lit sign is the better choice if the logo must look bright in full daylight.",
  },
  {
    q: "Should I order on Etsy or on WhatsApp?",
    a: "Either. Both lead to the same free mockup and the same quote, and payment runs through Etsy's checkout in both cases. WhatsApp is the faster way to send a logo and a wall photo and talk through options. Etsy suits buyers who prefer to keep the whole conversation and order inside Etsy.",
  },
  {
    q: "What warranty comes with a backlit sign?",
    a: "Every backlit sign carries a 5-year warranty. The Returns and Warranty page sets out what it covers and the exclusions.",
  },
] as const;

/** Every photograph the page renders, hero first, for the image sitemap. */
export const BACKLIT_ROUTE_IMAGES: readonly string[] = [
  ...new Set([
    ...BACKLIT_HERO_IMAGES.map((image) => image.src),
    ...BACKLIT_SPACES.flatMap((space) => space.images.map((image) => image.src)),
    `${IMG}/backlit-sign-standoff-halo-close-up.webp`,
    `${IMG}/backlit-sign-metal-finish-chart.webp`,
  ]),
];
