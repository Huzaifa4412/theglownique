import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { finalize, p, h2, h3, ul, ol, callout, table, cta, image, a, b } from "./blog-seed/portable-text.mjs";
import { loadEditorialPost } from "./blog-seed/load-editorial-post.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ASSETS = {
  "christmas-star": "image-e5796bada374541894ccbe69d75c5087496e3ab0-1672x941-webp",
  "coffee-bar": "image-03a71dc76ca2c8da5529383de1722353ed7ce2c3-1672x941-webp",
  "ghost-photo-backdrop": "image-2c8662d6d21e33893f8ec128670abe00ee0506dd-1672x941-webp",
  "pumpkin-coffee-corner": "image-1519d7625fc6d92fb36c7b08f7175e22a8930a68-1672x941-webp",
};

const AUTHOR_ID = "author.workshop-lead";
const CATEGORY_ID = "category.ideas-and-inspiration";

const LINK_CUSTOM_NEON = {
  kind: "commercial",
  label: "Custom LED neon signs",
  description: "Explore sizes, custom colors, acrylic backboard cuts and get a free design proof.",
  href: "/products/custom-neon-signs",
};

const LINK_COST_GUIDE = {
  kind: "guide",
  label: "What a custom business sign costs",
  description: "The complete cost breakdown behind bespoke illuminated signs and acrylic fabrication.",
  href: "/guides/custom-business-sign-cost",
};

const LINK_LIGHTING_GUIDE = {
  kind: "guide",
  label: "Front-lit vs halo-lit vs dual-lit",
  description: "How different illuminated letter styles project light and suit diverse interior walls.",
  href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
};

const LINK_BUSINESS_HUB = {
  kind: "commercial",
  label: "Business signs & commercial lighting",
  description: "Architectural 3D signs, slim lightboxes, and commercial brand neon for retail spaces.",
  href: "/business-signs",
};

function imageRef(assetId) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
  };
}

// ── 1. Halloween Neon Sign Ideas ─────────────────────────────────────────────
const halloweenImageFiles = {
  "pumpkin-coffee-corner": "public/blog/halloween-neon-sign-ideas/pumpkin-coffee-corner.webp",
  "ghost-photo-backdrop": "public/blog/halloween-neon-sign-ideas/ghost-photo-backdrop.webp",
};

const baseHalloween = loadEditorialPost({
  slug: "halloween-neon-sign-ideas",
  id: "post-halloween-neon-sign-ideas",
  publishedAt: "2026-09-15T09:00:00Z",
  readingMinutes: 7,
  imageFiles: halloweenImageFiles,
});

const halloweenBody = finalize(baseHalloween.body).map((node) => {
  if (node._type !== "blogImage") return node;
  const assetId = ASSETS[node.__image];
  const { __image, ...rest } = node;
  return { ...rest, ...imageRef(assetId), _type: "blogImage" };
});

const halloweenPost = {
  _id: "post-halloween-neon-sign-ideas",
  _type: "post",
  title: baseHalloween.title,
  slug: { _type: "slug", current: baseHalloween.slug },
  summary: baseHalloween.summary,
  coverImage: {
    ...imageRef(ASSETS["pumpkin-coffee-corner"]),
    alt: baseHalloween.coverAlt,
    caption: baseHalloween.coverCaption,
  },
  category: { _type: "reference", _ref: CATEGORY_ID },
  keyTakeaways: baseHalloween.keyTakeaways,
  body: halloweenBody,
  faqs: baseHalloween.faqs.map((faq, i) => ({ _type: "faq", _key: `faq${i}`, ...faq })),
  author: { _type: "reference", _ref: AUTHOR_ID },
  publishedAt: baseHalloween.publishedAt,
  readingMinutes: baseHalloween.readingMinutes,
  featured: false,
  seoTitle: baseHalloween.seoTitle,
  seoDescription: baseHalloween.seoDescription,
  primaryKeyword: baseHalloween.primaryKeyword,
  secondaryKeywords: baseHalloween.secondaryKeywords,
  indexable: true,
  relatedLinks: baseHalloween.relatedLinks.map((l, i) => ({ _type: "relatedLink", _key: `link${i}`, ...l })),
  relatedPosts: [
    { _type: "reference", _key: "rp0", _ref: "deb00bb2-d36b-4710-ac02-76e06543e53c" },
    { _type: "reference", _key: "rp1", _ref: "post-how-to-choose-the-right-neon-color-for-your-sign" },
  ],
  sources: baseHalloween.sources.map((s, i) => ({ _type: "source", _key: `src${i}`, ...s })),
};

// ── 2. Coffee Bar Neon Sign Ideas ────────────────────────────────────────────
const coffeeRawBody = [
  p(
    "A dedicated coffee corner—whether an intimate espresso nook in a home kitchen or the primary service station in an independent café—is built on ritual. It is the spot where mornings begin, where steam rises against tile, and where people naturally pause. Adding an LED neon sign to that wall is not just about illumination; it establishes a deliberate aesthetic boundary between an ordinary counter and a crafted café experience."
  ),
  p(
    "Because kitchen walls and commercial coffee stations feature high-density cabinetry, reflective backsplashes, and heat-generating appliances, designing a coffee neon sign requires specific considerations. Here is the workshop guide to choosing warmth, calculating steam clearance, routing cords cleanly, and dialling in dimming controls."
  ),

  h2("Color Temperature: Why Kelvin Warms the Room"),
  p(
    "The single most frequent mistake we see with coffee station lighting is selecting an ultra-cool white (6500K). On screen, bright white looks modern, but against espresso beans, ceramic mugs, and warm wood shelving, high-Kelvin light casts an institutional, clinical glare."
  ),
  p(
    "Instead, coffee signage thrives in warmer spectra that enhance the caramel tones of roasted coffee and softened milk. We recommend testing four distinct palette choices depending on your wall backdrop:"
  ),
  table(
    "Illuminated Color Spectrum for Coffee Stations",
    ["Color / Tone", "Kelvin / Wavelength", "Best Wall Surface", "Visual Impact"],
    [
      ["Warm White", "2700K – 3000K", "Subway tile, white oak, brick", "Cozy, organic coffeehouse glow"],
      ["Golden Amber", "590nm deep amber", "Dark grey plaster, slate, matte black", "Rich late-night espresso bar mood"],
      ["Crisp Neutral White", "4000K balanced", "Stainless steel, terrazzo, marble", "Clean Scandinavian specialty café look"],
      ["Pastel Terracotta / Rose", "Soft warm tone", "Plaster, olive green, cream paint", "Trendy boutique brunch aesthetic"],
    ],
    "Warm white at 2700K remains our most requested spec for domestic kitchen espresso bars."
  ),

  h2("Moisture, Steam, and Cable Clearance"),
  p(
    "An espresso machine generates pressurized steam, ambient heat, and fine coffee mist. While LED neon flex is sealed in silicone and runs on safe 12V direct current, the electrical connection points and the cut acrylic backboard require smart placement."
  ),
  ul([
    "Vertical Steam Clearance: Mount the lower edge of the acrylic backboard at least 16 to 18 inches above the top cup warmer or steam wand of your espresso machine. Direct, repeated exhaust from a steam purge can cloud untreated acrylic over several years.",
    "Cord Concealment: Every sign needs a DC power feed. Route the transparent tail wire along backsplash silicone beads or tile grout lines rather than draping it across prep counters.",
    "Water Separation: Never mount power bricks (drivers) beneath counter sinks or beside plumbed water lines. Keep the transformer dry and ventilated behind cabinets or in an adjacent utility recess.",
  ]),
  callout(
    "tip",
    "Keep the power switch accessible",
    "Do not plug your coffee sign behind heavy espresso equipment where you have to reach across boiling boilers to turn it off. Specify a wireless touch dimmer or an automated smart plug so your sign wakes up automatically with your morning grinder."
  ),

  h2("Three Design Directions That Never Look Cluttered"),
  p(
    "Kitchen and cafe walls usually have limited clear area between floating shelves, grinder hoppers, and wall-mounted portafilters. Before choosing an intricate slogan, consider how the sign reads from three feet away:"
  ),
  h3("1. The Minimalist Cup or Bean Silhouette"),
  p(
    "A clean outline of an espresso cup with stylized steam, or an organic coffee branch with beans, communicates instantly without requiring guests to read text. It preserves visual calm in compact kitchens."
  ),
  h3("2. The Short Script Statement"),
  p(
    "Two or three words bent in flowing script—such as “Perk Up”, “But First, Coffee”, or “Daily Brew”—anchor the counter without consuming excess horizontal width. Script neon utilizes a single continuous run of flex, keeping solder joints minimal and power draw low."
  ),
  h3("3. The Personalized Family or Roastery Monogram"),
  p(
    "For home baristas who roast their own beans or entertain frequently, an illuminated surname or crest (e.g., “The Miller Roastery” or “Corner Espresso”) turns a standard kitchen countertop into a personalized centerpiece."
  ),

  h2("Why a Remote Dimmer is Essential in a Kitchen"),
  p(
    "At 6:30 AM when you walk into a dim kitchen for your first pour-over, a neon sign running at 100% full brightness can be blinding. By mid-afternoon with ambient sunlight streaming across the kitchen, that same sign needs maximum output to remain punchy and vibrant."
  ),
  p(
    "Every sign we craft includes or pairs with an RF (radio-frequency) dimmer controller. This allows you to dial output down to 15–20% for morning tranquility, and bring it up to 80% when hosting evening dinner parties."
  ),

  cta(
    "Designing a custom coffee station sign?",
    "Send us your kitchen or café wall dimensions and font ideas. Our workshop team will generate a precision scaled proof within 24 hours.",
    "Request a Free Custom Proof",
    "/products/custom-neon-signs"
  ),
];

const coffeeBody = finalize(coffeeRawBody);

const coffeePost = {
  _id: "post-coffee-bar-neon-sign-ideas",
  _type: "post",
  title: "Coffee Bar Neon Sign Ideas: Styling Your Kitchen Nook or Commercial Café",
  slug: { _type: "slug", current: "coffee-bar-neon-sign-ideas" },
  summary:
    "A coffee bar neon sign adds warmth and character to kitchen counters and café corners alike. Here is practical workshop advice on choosing the right Kelvin warmth, positioning away from steam wands, managing power cords, and dialing in brightness with remote dimmers.",
  coverImage: {
    ...imageRef(ASSETS["coffee-bar"]),
    alt: "Warm amber and golden coffee cup LED neon sign mounted above a cozy kitchen espresso counter",
    caption: "Warm white and amber LED illumination creates an inviting morning ritual without clinical kitchen glare.",
  },
  category: { _type: "reference", _ref: CATEGORY_ID },
  keyTakeaways: [
    "Choose warm white (2700K–3000K) or warm amber to complement roasted coffee tones and avoid sterile kitchen lighting.",
    "Mount the sign at least 16–18 inches above or to the side of espresso steam wands to prevent moisture buildup on acrylic joints.",
    "Always install an inline dimmer—morning espresso demands a softer glow, while evening dinner parties benefit from higher presence.",
    "Plan cord routing along tile grout lines or behind backsplash trim before installing wall anchors.",
  ],
  body: coffeeBody,
  faqs: [
    {
      _type: "faq",
      _key: "faq0",
      q: "Is an LED neon sign safe to hang directly above an espresso machine?",
      a: "Yes, provided there is adequate vertical clearance. We advise mounting the sign at least 16 to 18 inches above the cup warmer or steam wand. LED neon flex operates on 12V DC power with sealed silicone casing, so normal ambient kitchen humidity is harmless, but direct concentrated steam exhaust should be avoided.",
    },
    {
      _type: "faq",
      _key: "faq1",
      q: "What size neon sign is best for a home kitchen coffee nook?",
      a: "For standard residential kitchen setups between upper cabinets or over floating shelves, widths between 20 inches and 28 inches (50–70 cm) work best. Anything larger tends to crowd shelf mugs and grinder hoppers; anything smaller than 18 inches can lose stroke clarity on script lettering.",
    },
    {
      _type: "faq",
      _key: "faq2",
      q: "Can a coffee neon sign stay turned on all day?",
      a: "Yes. High-efficiency commercial-grade LED neon draws very little power—typically 20W to 45W depending on size. The 12V driver runs cool, and modern LED chips are rated for 50,000 hours of continuous operation. Adding a timer or smart plug makes scheduled operation effortless.",
    },
    {
      _type: "faq",
      _key: "faq3",
      q: "What color neon light looks best against white subway tile?",
      a: "Warm white (2700K) and golden amber offer the highest visual contrast without feeling harsh. Warm tones reflect gently off glazed ceramic tiles, creating diffuse halo warmth rather than sharp, distracting specular hotspots.",
    },
  ],
  author: { _type: "reference", _ref: AUTHOR_ID },
  publishedAt: "2026-09-16T10:00:00Z",
  readingMinutes: 6,
  featured: false,
  seoTitle: "Coffee Bar Neon Sign Ideas: Kitchen & Café Styling",
  seoDescription:
    "Discover practical coffee bar neon sign ideas for home espresso stations and cafes. Workshop advice on lighting warmth, steam clearance, sizing, and dimmers.",
  primaryKeyword: "coffee neon sign",
  secondaryKeywords: ["coffee bar neon sign", "coffee station sign", "coffee neon light", "kitchen coffee bar decor"],
  indexable: true,
  relatedLinks: [
    { _type: "relatedLink", _key: "link0", ...LINK_CUSTOM_NEON },
    { _type: "relatedLink", _key: "link1", ...LINK_COST_GUIDE },
    { _type: "relatedLink", _key: "link2", ...LINK_BUSINESS_HUB },
  ],
  relatedPosts: [
    { _type: "reference", _key: "rp0", _ref: "deb00bb2-d36b-4710-ac02-76e06543e53c" },
    { _type: "reference", _key: "rp1", _ref: "post-how-to-choose-the-right-neon-color-for-your-sign" },
  ],
  sources: [
    {
      _type: "source",
      _key: "src0",
      label: "Illumination Engineering Society: Residential Task Lighting Guidelines",
      publisher: "IESNA",
      url: "https://www.ies.org",
      accessed: "2026-09-16",
    },
  ],
};

// ── 3. Christmas Neon Sign Ideas ─────────────────────────────────────────────
const christmasRawBody = [
  p(
    "Holiday decorating has evolved far beyond untangling old incandescent string lights and replacing burnt-out miniature bulbs. Modern LED neon signs bring crisp architectural lines, vibrant seasonal colors, and uniform glow to Christmas displays, storefront window promotions, and cozy winter living rooms."
  ),
  p(
    "Unlike traditional glass neon—which runs on high-voltage transformers and presents severe breakage hazards during seasonal pack-down—LED neon flex is cold to the touch, shatter-resistant, and light enough to mount with non-invasive clear standoffs or suspended micro-cables."
  ),

  h2("Window Displays Without Double-Pane Glass Glare"),
  p(
    "Storefront retail windows and residential bay windows are the natural homes for holiday neon. But hanging an illuminated sign against glass introduces optical challenges: internal reflection and double-pane bounce can create confusing ghost images from the sidewalk."
  ),
  p(
    "To achieve a razor-sharp Christmas display visible from outside both day and night, follow these workshop mounting guidelines:"
  ),
  table(
    "Holiday Window Hanging Methods Compared",
    ["Mounting Method", "Installation Speed", "Removal / Storage", "Glare Reduction"],
    [
      ["Ceiling Cable Suspension", "15 minutes", "Unhook in seconds, no wall damage", "Excellent (space from glass prevents bounce)"],
      ["Clear Acrylic Table Stand", "Instant", "Packs flat in shipping box", "Good (sit on window sill facing outward)"],
      ["Heavy-Duty Suction Standoffs", "5 minutes", "Pulls off glass without residue", "Moderate (keep 1–2 inches off pane)"],
      ["Direct Glass Adhesive Strips", "10 minutes", "Requires careful solvent removal", "Poor (direct contact causes double-image glare)"],
    ],
    "We recommend suspending window signs 2 to 4 inches back from the glass surface to eliminate reflection artifacts."
  ),

  h2("Four Holiday Concepts That Capture the Season"),
  p(
    "Whether your focus is an intimate family Christmas morning or an eye-catching commercial holiday shopping window, here are four timeless directions:"
  ),
  h3("1. The Architectural Holiday Star"),
  p(
    "A geometric multi-pointed star in warm white or golden champagne light offers classic winter elegance. Unlike date-specific wording, a glowing star can stay displayed from late November through the end of January as general winter celebration decor."
  ),
  h3("2. Traditional 'Merry Christmas' Script"),
  p(
    "Flowing calligraphic script in festive ruby red or pine green establishes an immediate welcoming focal point. For retail environments, pairing red lettering with a secondary halo-glow in soft white creates distinct visual separation against evening streetscapes."
  ),
  h3("3. Fireplace Mantel Accents"),
  p(
    "Placing an LED sign on a mantel alongside fresh pine boughs and candles is completely safe because LED neon generates negligible heat. There are no exposed filaments or fragile glass tubes that could ignite dried evergreen needles."
  ),
  h3("4. Holiday Party Photo Backdrops"),
  p(
    "For seasonal office parties, winter weddings, or New Year’s celebrations, a high-impact sign mounted on a dark velvet or faux-boxwood backdrop creates an irresistible photo station for attendees."
  ),

  h2("Storage and Packing: Protecting Your Investment in January"),
  p(
    "A holiday neon sign is a seasonal investment you will unpack year after year. The primary risk of damage is not during use, but during hurried January teardown and unpadded attic storage."
  ),
  ul([
    "Preserve Original Foam Inserts: Keep the precision die-cut high-density foam carton your sign arrived in. It prevents bending strain on the acrylic backplate during storage.",
    "Loosely Coil the Power Cord: Never wrap the thin DC wire tightly around the acrylic corners. Coil it in loose 6-inch loops and secure with a Velcro tie to avoid internal copper fatigue.",
    "Store Vertically or Flat Without Weights: Never stack heavy ornament crates on top of an acrylic sign box. Store it standing on edge between wardrobe panels or flat on an upper shelf.",
  ]),

  callout(
    "tip",
    "Label your transformer",
    "If you own multiple 12V electronics, use a piece of painter's tape to label the included power adapter 'Christmas Neon'. Using an incorrect higher-voltage brick (like a 24V laptop supply) will permanently fry 12V LED chips."
  ),

  cta(
    "Planning a custom Christmas sign or holiday window display?",
    "Our workshop fabricates and tests every sign with tracked worldwide delivery. Order early in the season to ensure timely holiday arrival.",
    "Explore Custom Neon Signs",
    "/products/custom-neon-signs"
  ),
];

const christmasBody = finalize(christmasRawBody);

const christmasPost = {
  _id: "post-christmas-neon-sign-ideas",
  _type: "post",
  title: "Christmas Neon Sign Ideas: Festive Window Displays, Warm Accents & Holiday Glow",
  slug: { _type: "slug", current: "christmas-neon-sign-ideas" },
  summary:
    "Holiday neon creates instant winter warmth without fragile glass or bulky bulbs. Here are practical Christmas neon sign ideas for storefront windows, living room mantels, and holiday gatherings—along with workshop advice on glare-free window mounting, storage, and power.",
  coverImage: {
    ...imageRef(ASSETS["christmas-star"]),
    alt: "Warm glowing star and festive holiday LED neon sign displayed in a cozy winter window setting",
    caption: "A precision-bent LED holiday star creates timeless winter ambiance without fragile glass or high-voltage buzzing.",
  },
  category: { _type: "reference", _ref: CATEGORY_ID },
  keyTakeaways: [
    "Warm white stars, festive greens, and ruby reds create instant holiday warmth without cluttering floors or surfaces.",
    "For storefront or home window displays, suspend signs with micro-steel cables or clear suction standoffs to avoid double-pane glass reflections.",
    "Use remote dimmers to tune the glow between daylight visibility and cozy evening ambient light.",
    "Save the custom high-density foam shipping carton to store your holiday sign safely between seasons.",
  ],
  body: christmasBody,
  faqs: [
    {
      _type: "faq",
      _key: "faq0",
      q: "How do I hang a Christmas neon sign in a window without drilling holes?",
      a: "The cleanest method is ceiling-mounted or curtain-rod micro-cable suspension. Adjustable transparent steel cables drop down to the pre-drilled acrylic holes, holding the sign steadily in front of the glass. Alternatively, heavy-duty clear silicone suction standoffs can adhere directly to the glass pane without tools.",
    },
    {
      _type: "faq",
      _key: "faq1",
      q: "Can Christmas LED neon signs be mounted outdoors in freezing winter conditions?",
      a: "Standard signs are engineered for indoor use. For exterior porches, entry arches, or open storefront eaves exposed to sub-zero temperatures, snow, or rain, specify an outdoor IP67 waterproof build during design review so all wiring channels and silicone joints are hermetically sealed.",
    },
    {
      _type: "faq",
      _key: "faq2",
      q: "How much electricity does an LED holiday neon sign use?",
      a: "Surprisingly little. An average holiday sign running 6 hours every evening will consume only 0.15 to 0.25 kWh per day—costing just pennies per month compared to traditional multi-string incandescent holiday lighting.",
    },
    {
      _type: "faq",
      _key: "faq3",
      q: "How do I store my neon sign safely after the holidays?",
      a: "Always save the original shipping carton and fitted foam. Coil the 12V adapter cord in loose loops, wipe the acrylic clean with a dry microfiber cloth before boxing, and store the carton flat or on edge in a dry closet away from heavy crush loads.",
    },
  ],
  author: { _type: "reference", _ref: AUTHOR_ID },
  publishedAt: "2026-09-17T10:00:00Z",
  readingMinutes: 6,
  featured: false,
  seoTitle: "Christmas Neon Sign Ideas: Window & Holiday Displays",
  seoDescription:
    "Explore creative Christmas neon sign ideas for festive windows, holiday parties, and winter decor. Workshop tips on hanging, dimming, and seasonal storage.",
  primaryKeyword: "christmas neon sign",
  secondaryKeywords: ["merry christmas neon sign", "holiday neon signs", "christmas window neon", "holiday party neon backdrop"],
  indexable: true,
  relatedLinks: [
    { _type: "relatedLink", _key: "link0", ...LINK_CUSTOM_NEON },
    { _type: "relatedLink", _key: "link1", ...LINK_COST_GUIDE },
    { _type: "relatedLink", _key: "link2", ...LINK_BUSINESS_HUB },
  ],
  relatedPosts: [
    { _type: "reference", _key: "rp0", _ref: "post-how-to-choose-the-right-neon-color-for-your-sign" },
    { _type: "reference", _key: "rp1", _ref: "deb00bb2-d36b-4710-ac02-76e06543e53c" },
  ],
  sources: [
    {
      _type: "source",
      _key: "src0",
      label: "Energy Star Guidelines on Solid State Lighting Efficiency",
      publisher: "US EPA / DOE",
      url: "https://www.energystar.gov",
      accessed: "2026-09-17",
    },
  ],
};

async function main() {
  const payload = [
    { type: "post", content: halloweenPost },
    { type: "post", content: coffeePost },
    { type: "post", content: christmasPost },
  ];

  await mkdir(path.resolve(ROOT, "scratch"), { recursive: true });
  await writeFile(
    path.resolve(ROOT, "scratch/new-posts-payload.json"),
    JSON.stringify(payload, null, 2),
    "utf8"
  );
  console.log("Successfully generated scratch/new-posts-payload.json with 3 posts!");
}

main().catch((err) => {
  console.error("Error generating posts payload:", err);
  process.exit(1);
});
