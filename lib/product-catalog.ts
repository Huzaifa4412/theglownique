import {
  Zap,
  ShieldCheck,
  Palette,
  Sparkles,
  Sun,
  Building2,
  Layers,
  Lightbulb,
  RefreshCw,
  Eye,
  type LucideIcon,
} from "lucide-react";

export type ProductFeature = {
  icon: LucideIcon;
  title: string;
  text: string;
};


export type ProductUseCase = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

export type ProductGalleryItem = {
  src: string;
  alt: string;
};

export type ProductFaq = {
  q: string;
  a: string;
};

/**
 * Acrylic backboard cut options. Only the LED neon page carries these today —
 * the other three sign types are built differently and have no backboard
 * choice — so `backings` is optional and the section simply doesn't render.
 */
export type ProductBacking = {
  name: string;
  summary: string;
  text: string;
  bestFor: string;
};

/**
 * Which way the light leaves a fabricated channel letter. Only the 3D metal
 * page carries these — every other sign type is lit one way only — so
 * `lighting` is optional and the section drops out for them.
 *
 * Unlike `backings`, which compares its options in a single wide photo, each
 * style here has its own shot: the difference is the glow, and that doesn't
 * survive being shrunk into one strip.
 */
export type ProductLighting = {
  name: string;
  summary: string;
  text: string;
  bestFor: string;
  image: string;
  imageAlt: string;
};

export type ProductPage = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  accent: string;
  heroImage: string;
  heroVideo?: string;
  intro: string;
  chips: string[];
  features: ProductFeature[];
  craft: {
    heading: string;
    body: string;
    points: string[];
    image: string;
    imageAlt: string;
  };
  specs: { label: string; value: string }[];
  options: {
    heading: string;
    body: string;
    items: string[];
  };
  backings?: {
    heading: string;
    body: string;
    /** Wide comparison shot. `items` MUST stay in its left-to-right order. */
    image: string;
    imageAlt: string;
    items: ProductBacking[];
  };
  lighting?: {
    heading: string;
    body: string;
    items: ProductLighting[];
  };
  /**
   * Opts the page into the interactive colour studio (the same one on the
   * homepage). Only meaningful where the visitor actually picks a tube
   * colour, so today that's the LED neon page alone — the studio previews
   * silicone neon, not printed or metal faces.
   */
  colorStudio?: boolean;
  useCases: ProductUseCase[];
  gallery: ProductGalleryItem[];
  faqs: ProductFaq[];
  metaTitle: string;
  metaDescription: string;
};

export const PRODUCT_PAGES: ProductPage[] = [
  {
    slug: "custom-neon-signs",
    name: "Custom LED Neon Signs",
    category: "Neon Sign",
    tagline: "Flexible silicone LED neon, handcrafted to your words",
    accent: "#f40b68",
    heroImage: "/hero/neon-sign-hero.png",
    heroVideo: "/neon-sign/Videos/en-GB_1fa05acfc3a2cdf80c7787c5f585c30a.mp4",
    intro:
      "Turn a phrase, a name or a logo into a glowing centrepiece. Our custom LED neon signs are handcrafted from flexible, shatterproof silicone tubing mounted on clear, laser-cut acrylic — the safe, modern successor to fragile glass neon. Running cool on low 12V power, they're made for bedrooms, weddings, cafés, studios and storefronts alike.",
    chips: ["Up to 100,000 hrs", "Safe 12V", "13 colours + RGB", "Indoor & IP67 outdoor"],
    features: [
      {
        icon: Zap,
        title: "Ultra-efficient LED",
        text: "Sips up to 80% less power than glass neon and stays cool to the touch, so it's safe to leave glowing all day.",
      },
      {
        icon: ShieldCheck,
        title: "Shatterproof & safe",
        text: "Flexible silicone instead of breakable glass gas tubes — no mercury, no buzzing and nothing fragile to worry about.",
      },
      {
        icon: Palette,
        title: "Any colour, any font",
        text: "Choose from 13 neon colours, or RGB colour-change, in any font, script or hand-drawn shape you like.",
      },
      {
        icon: Sparkles,
        title: "Made to order",
        text: "Every sign is hand-bent and built to your exact words, size and colour — never mass-produced.",
      },
    ],
    craft: {
      heading: "How your neon sign is made",
      body: "We start with your artwork, map the tubing path, and hand-bend flexible LED silicone to trace every letter and curve. It's mounted on an optical-grade, laser-cut acrylic backboard, wired with concealed cabling, then bench-tested for an even, flicker-free glow before it's carefully packed.",
      points: [
        "Optical-grade, laser-cut clear acrylic backboard",
        "Hand-bent flexible LED silicone tubing",
        "Concealed, cable-managed wiring for a floating look",
        "Bench-tested for even, flicker-free brightness",
      ],
      image: "/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp",
      imageAlt: "Handcrafted personalised LED neon name sign",
    },
    specs: [
      { label: "Light source", value: "Flexible LED silicone neon tubing" },
      {
        label: "Backboard",
        value:
          "Clear, frosted or coloured cast acrylic — laser-cut to letter, to shape or to a square",
      },
      { label: "Power", value: "12V low-voltage plug-and-play adaptor" },
      { label: "Lifespan", value: "Up to 100,000 hours of glow" },
      { label: "Colours", value: "13 solid colours, plus RGB colour-changing" },
      { label: "Dimming", value: "Optional wireless RF remote (1–100%)" },
      { label: "Mounting", value: "Wall standoffs or hanging kit — ready to hang" },
      { label: "Use", value: "Indoor; IP67 waterproof option for outdoors" },
      { label: "Sizes", value: "Fully custom, from ~30 cm to several metres" },
    ],
    options: {
      heading: "13 neon colours, plus RGB",
      body: "From warm and cold white through the yellows, pinks and reds to ice blue, teal and purple — pick a single signature colour, or add an RGB controller to switch shades, dim, pulse or flash at the touch of a button.",
      // The real, complete range. Mirrors NEON_COLORS in
      // components/storefront/sections/neon-color-changer-section.tsx, which
      // drives the homepage swatch picker — keep the two in step, and don't
      // pad the list: this page previously claimed "18+" colours that the
      // workshop can't actually supply.
      items: [
        "Warm White",
        "Cold White",
        "Light Yellow",
        "Yellow",
        "Orange",
        "Dark Blue",
        "Ice Blue",
        "Green",
        "Light Pink",
        "Hot Pink",
        "Red",
        "Purple",
        "Teal",
        "RGB colour-change",
      ],
    },
    backings: {
      heading: "Cut to square, cut to shape or cut to letter",
      body: "Every sign sits on a laser-cut acrylic backboard, and how we cut it changes the whole character of the piece — from a clean panel that frames the glow to letters that look painted straight onto the wall. Not sure which suits your design? Send it over and we'll show you all three in your free mockup.",
      image: "/neon-sign/allshape.png",
      imageAlt:
        "The same script neon word shown three ways: on a rectangular acrylic panel (cut to square), on one panel following the word's outline (cut to shape), and with the acrylic cut around each letter (cut to letter).",
      // Order matches the comparison photo left-to-right, and reads as a
      // progression from most practical to most premium. Keep them in step.
      items: [
        {
          name: "Cut to square",
          summary: "The workhorse",
          text: "A clean rectangular panel behind the whole sign. It's the strongest build and the kindest on price, and in clear acrylic it reads as a faint edge once the neon is lit — pick frosted or a colour and it becomes part of the design.",
          bestFor: "Block fonts, big installs and tighter budgets",
        },
        {
          name: "Cut to shape",
          summary: "The best of both",
          text: "One continuous piece of acrylic follows the outline of the whole design. You keep most of the floating look, but the sign stays a single sturdy panel — easier to hang straight and far happier travelling to you in one piece.",
          bestFor: "Phrases, multi-word signs and larger pieces",
        },
        {
          name: "Cut to letter",
          summary: "The invisible one",
          text: "We cut the acrylic around every individual letter, leaving only a few millimetres of border. Step back and the backboard all but disappears — the words read as pure light on the wall. It's the most intricate cut and the most striking finish.",
          bestFor: "Script, signatures and logos",
        },
      ],
    },
    colorStudio: true,
    useCases: [
      {
        title: "Home & bedroom",
        text: "Set the mood with a name, quote or shape that makes a room feel like yours.",
        image: "/neon-sign/girls room/iap_600x600.5331151538_61m43otq.webp",
        alt: "Pink LED neon sign glowing in a styled bedroom",
      },
      {
        title: "Weddings & events",
        text: "A custom backdrop your guests will photograph all night — and you'll keep forever.",
        image: "/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp",
        alt: "Better Together wedding LED neon sign",
      },
      {
        title: "Bars & studios",
        text: "Give your space a signature glow that sets the tone the moment people walk in.",
        image: "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
        alt: "Cocktails LED neon sign in a bar",
      },
      {
        title: "Gaming & personal",
        text: "Icons, gamertags and callouts that turn a wall into a statement.",
        image: "/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp",
        alt: "Game On arcade LED neon sign in a games room",
      },
    ],
    gallery: [
      { src: "/hero/neon-sign-hero.png", alt: "Good Vibes custom LED neon sign glowing on a dark wall" },
      { src: "/neon-sign/Marriage/iap_600x600.7378705048_ipwhq76b.webp", alt: "Happily Ever After wedding neon sign" },
      { src: "/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp", alt: "No Pain No Gain gym LED neon sign" },
      { src: "/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp", alt: "Personalised custom name LED neon sign" },
    ],
    faqs: [
      {
        q: "How long do LED neon signs last?",
        a: "Our LED neon is rated for up to 100,000 hours of glow — over 11 years even if left on 24/7 — while using up to 80% less power than traditional glass neon.",
      },
      {
        q: "Are they safe to leave on and touch?",
        a: "Yes. They run on low 12V power, stay cool to the touch and use shatterproof silicone instead of glass, so they're safe in bedrooms, kids' rooms and busy venues.",
      },
      {
        q: "Can you make my logo or handwriting in neon?",
        a: "Absolutely. Send your logo, text or a sketch and we'll trace it into LED neon in your chosen colour and size, then show you a free mockup first.",
      },
      {
        q: "Can I dim it or change the colour?",
        a: "Yes — add a wireless RF remote for 1–100% dimming, or choose our RGB option to switch colours, pulse or flash whenever you like.",
      },
      {
        q: "Can I use it outdoors?",
        a: "Choose our IP67 weatherproof build and your sign is ready for storefronts, façades and outdoor events, rain or shine.",
      },
    ],
    metaTitle: "Custom LED Neon Signs — Made to Order",
    metaDescription:
      "Design custom LED neon signs handcrafted from flexible silicone on acrylic. 13 colours plus RGB, up to 100,000-hour glow, free mockup, 5-year warranty and tracked worldwide delivery.",
  },
  {
    slug: "3d-metal-neon-signs",
    name: "3D Metal Neon Signs",
    category: "3D Metal Neon Sign",
    tagline: "Fabricated stainless-steel channel letters — frontlit, halo backlit or dual-lit",
    accent: "#e0a23c",
    heroImage: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
    heroVideo: "/3d-metallic-neon-sign/videos/2.mp4",
    intro:
      "Give your brand a premium, architectural presence with 3D metal channel letters. Each letter is fabricated from stainless steel and lit from within by energy-efficient LED — choose bold frontlit faces, a soft halo backlit glow, or dual-lit for both. Engineered for commercial use, they command attention on storefronts, lobbies and façades, day and night.",
    chips: ["Frontlit / Backlit / Dual-lit", "Stainless steel", "IP67 outdoor", "Metallic finishes"],
    features: [
      {
        icon: Sun,
        title: "Day-and-night impact",
        text: "Sharp, solid lettering by day; a striking illuminated logo after dark — your brand reads clearly around the clock.",
      },
      {
        icon: Building2,
        title: "Architectural-grade build",
        text: "Fabricated stainless-steel channels engineered for real-world storefronts, façades and lobbies.",
      },
      {
        icon: Palette,
        title: "Premium metal finishes",
        text: "Brushed, mirrored or matte in gold, rose gold, brass, silver or black — colour-matched to your brand.",
      },
      {
        icon: ShieldCheck,
        title: "Weatherproof & lasting",
        text: "IP67-rated LEDs and durable metal stand up to rain, humidity and temperature swings outdoors.",
      },
    ],
    craft: {
      heading: "How your metal letters are made",
      body: "Every letter or logo element starts as sheet stainless steel, cut to your artwork and formed into a channel. We fit high-density LED inside, seal the housing to IP67, and finish the metal to your brand — brushed, mirrored or matte, anywhere from 0.8\" deep to 3.5\" and beyond. Each piece is then wired, bench-tested and prepared for the mount your wall needs.",
      points: [
        "Sheet stainless steel, cut and formed into channels",
        "High-density LED sealed inside to IP67",
        "Brushed, mirrored or matte metal finishing",
        "Flush, standoff, raceway or backing-panel mounts",
      ],
      image: "/3d-metallic-neon-sign/frontlit/2.png",
      imageAlt: "Fabricated stainless-steel channel letter R with a glowing white face and brushed metal returns",
    },
    specs: [
      { label: "Construction", value: "Fabricated stainless-steel channel letters" },
      { label: "Lighting styles", value: "Frontlit, halo backlit or dual-lit" },
      { label: "LED colours", value: "Cool, Daylight, Natural & Warm white, plus colours" },
      { label: "Finishes", value: "Brushed, mirrored or matte — gold, rose gold, brass, silver, black" },
      { label: "Depth", value: "0.8\" to 3.5\"+ (custom)" },
      { label: "Rating", value: "IP67 weatherproof for indoor & outdoor use" },
      { label: "Colour match", value: "Custom RGB / HEX / CMYK or metallic finish" },
      { label: "Mounting", value: "Flush, standoff, raceway or backing panel" },
      { label: "Sizes", value: "Fully custom to your logo and wall" },
    ],
    options: {
      heading: "Finishes & lighting styles",
      body: "Mix a metal finish with a lighting style to match your brand's personality — from a mirrored-gold halo-lit logo in a hotel lobby to a brushed-steel dual-lit sign on a storefront.",
      items: [
        "Frontlit faces",
        "Halo backlit glow",
        "Dual-lit (both)",
        "Brushed metal",
        "Mirrored metal",
        "Matte finish",
        "Gold / Rose gold / Brass",
        "Silver / Black",
      ],
    },
    lighting: {
      heading: "Frontlit, halo backlit or dual-lit",
      body: "The same fabricated letters give you three completely different moods, and it all comes down to which way the light leaves the channel. Frontlit reads loudest, halo reads most expensive, dual-lit does both at once. Not sure which suits your logo? Send it over and we'll mock it up in whichever you're leaning towards — free, before you commit.",
      // Ordered loudest → softest → both, so the third card reads as the
      // combination of the two above it.
      items: [
        {
          name: "Frontlit",
          summary: "The loudest",
          text: "The face of every letter is a lit panel, so the wordmark itself glows. It's the most readable option from across a street or in daylight, and the face carries your brand colour rather than the wall — tint or print it any shade you like.",
          bestFor: "Storefronts, roadside frontage and busy streets",
          image: "/3d-metallic-neon-sign/frontlit/image.png",
          imageAlt:
            "Frontlit 3D metal channel letters spelling Food Opera, the script faces glowing bright orange against a plain wall",
        },
        {
          name: "Halo backlit",
          summary: "The premium one",
          text: "The face stays solid metal and the LED throws backwards instead, ringing each letter in a soft halo on the wall. You read the shape rather than the glow, which is exactly why it's the default for reception walls — it reads expensive rather than loud.",
          bestFor: "Lobbies, receptions and interior feature walls",
          image: "/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.png",
          imageAlt:
            "Halo backlit 3D metal salon logo in brushed gold, glowing softly onto the reception wall behind it",
        },
        {
          name: "Dual-lit",
          summary: "The full effect",
          text: "Both at once — a lit face for readability, a halo behind it for depth. Add a baffle inside the channel and the two can run separate colours, so a crisp white face can sit over a coloured glow.",
          bestFor: "Flagship signage and anywhere impact matters most",
          image: "/3d-metallic-neon-sign/duallit/2.png",
          imageAlt:
            "Dual-lit 3D metal letters spelling AMERICA, with glowing white faces and a halo of light spilling onto the floor behind",
        },
      ],
    },
    useCases: [
      {
        title: "Storefronts & façades",
        text: "Pull customers in from across the street with a premium illuminated logo.",
        image: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
        alt: "Corporate 3D metal channel-letter storefront sign",
      },
      {
        title: "Corporate lobbies",
        text: "A refined halo-lit logo that makes reception areas feel established and premium.",
        image: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.png",
        alt: "Corporate reception 3D metal logo sign",
      },
      {
        title: "Restaurants & cafés",
        text: "Warm, inviting metal signage that photographs beautifully and lasts for years.",
        image: "/3d-metallic-neon-sign/Resturants/generated/026ad950-fafb-4407-8420-c83be7f49365.png",
        alt: "Restaurant 3D metal dual-lit sign",
      },
      {
        title: "Salons & studios",
        text: "A halo-lit wordmark that turns a feature wall into a signature brand moment.",
        image: "/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.png",
        alt: "Salon 3D metal halo backlit sign",
      },
    ],
    gallery: [
      { src: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png", alt: "Corporate 3D metal channel-letter sign" },
      { src: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.png", alt: "Illuminated 3D metal logo sign" },
      { src: "/3d-metallic-neon-sign/Resturants/generated/026ad950-fafb-4407-8420-c83be7f49365.png", alt: "Restaurant dual-lit metal sign" },
      { src: "/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.png", alt: "Salon halo backlit metal sign" },
    ],
    faqs: [
      {
        q: "What's the difference between frontlit, backlit and dual-lit?",
        a: "Frontlit letters glow from the face for bold readability. Halo (backlit) letters throw a soft glow onto the wall behind for a premium, floating look. Dual-lit combines both for maximum day-and-night impact.",
      },
      {
        q: "Can you match my exact brand colour and finish?",
        a: "Yes. Metal can be brushed, mirrored or matte in gold, rose gold, brass, silver or black, and faces or LEDs can be colour-matched to any RGB, HEX or CMYK value.",
      },
      {
        q: "Are they suitable for outdoor storefronts?",
        a: "Yes — our channel letters use IP67-rated LEDs and weather-resistant materials built for year-round indoor and outdoor use.",
      },
      {
        q: "How are they mounted?",
        a: "We offer flush, standoff (for halo effect), raceway or backing-panel mounting to suit your wall and installation. We'll advise the cleanest option for your site.",
      },
      {
        q: "Do you make full logos, not just text?",
        a: "Yes. Send your logo and we'll fabricate letters and shapes to match, then send a free mockup showing sizing, finish and lighting before production.",
      },
    ],
    metaTitle: "3D Metal Neon Signs — Channel Letters & Logos",
    metaDescription:
      "Custom 3D metal channel-letter signs — frontlit, halo backlit or dual-lit stainless steel with premium finishes. IP67 outdoor-rated, free mockup, 5-year warranty, tracked worldwide delivery.",
  },
  {
    slug: "ultra-thin-lightbox",
    name: "Ultra Thin Slim Lightboxes",
    category: "Ultra Thin Lightbox",
    tagline: "Slim aluminium lightbox with 100% even, edge-lit LED glow",
    accent: "#0e9f6e",
    heroImage: "/ultra-thin-slim-lightbox/main-hero.png",
    intro:
      "A modern illuminated display that's under an inch deep. Our ultra-thin slim lightboxes use edge-lit LED technology inside a sleek anodized-aluminium frame to deliver 100% even, shadow-free light across the entire face. Graphics slide out and swap in seconds — perfect for retail displays, menu boards, lobbies and modern storefronts.",
    chips: ["Under 1-inch slim", "Edge-lit, shadow-free", "Tool-free graphic swap", "Retail & commercial"],
    features: [
      {
        icon: Layers,
        title: "Ultra-slim profile",
        text: "Under an inch deep, it sits almost flush to the wall for a clean, contemporary look in any space.",
      },
      {
        icon: Lightbulb,
        title: "Even, shadow-free light",
        text: "Edge-lit LEDs and a light-guide panel spread illumination evenly — no hotspots, no dark corners.",
      },
      {
        icon: RefreshCw,
        title: "Tool-free graphic swap",
        text: "A magnetic or snap-frame face lets you change posters, menus and promos in seconds, without tools.",
      },
      {
        icon: ShieldCheck,
        title: "Durable aluminium build",
        text: "Lightweight anodized-aluminium frame with long-life LEDs built for high-traffic commercial use.",
      },
    ],
    craft: {
      heading: "How edge-lighting works",
      body: "Instead of bulky tubes behind the face, LEDs sit around the frame edge and fire into a precision light-guide panel. That panel redistributes light evenly across the whole surface, so your graphic looks crisp and bright from every angle — in a fraction of the depth of a traditional lightbox.",
      points: [
        "Anodized-aluminium frame under an inch deep",
        "Edge-mounted SMD LEDs with light-guide panel",
        "Uniform, glare-free brightness across the face",
        "Magnetic or snap-frame for fast graphic changes",
      ],
      image: "/ultra-thin-slim-lightbox/IMG-20260803-WA0006.jpg",
      imageAlt: "Ultra-thin slim edge-lit LED lightbox",
    },
    specs: [
      { label: "Frame", value: "Anodized aluminium (custom colours available)" },
      { label: "Profile", value: "Ultra-slim, under 1 inch (~25 mm)" },
      { label: "Lighting", value: "Edge-lit SMD LED with light-guide panel" },
      { label: "Face", value: "Diffused acrylic / tempered display face" },
      { label: "Illumination", value: "100% uniform, shadow-free" },
      { label: "Graphic change", value: "Magnetic front or snap frame — tool-free" },
      { label: "Power", value: "Low-voltage 12V / 24V, energy-efficient" },
      { label: "Mounting", value: "Wall, hanging, freestanding or flush" },
      { label: "Use", value: "Indoor (outdoor-rated options available)" },
    ],
    options: {
      heading: "Sizes, mounting & graphics",
      body: "Choose the size and mount that fits your space, and how you want to change graphics. Magnetic and snap-frame faces make seasonal updates effortless.",
      items: [
        "Wall-mounted",
        "Hanging / double-sided",
        "Freestanding",
        "Magnetic face",
        "Snap frame",
        "Custom sizes",
      ],
    },
    useCases: [
      {
        title: "Retail displays",
        text: "Showcase promotions and product launches with bright, space-saving signage.",
        image: "/ultra-thin-slim-lightbox/Retail displays.jpg",
        alt: "Retail ultra-thin slim LED lightbox display",
      },
      {
        title: "Menu boards",
        text: "Crisp, easy-to-read menus you can update in seconds as your offer changes.",
        image: "/ultra-thin-slim-lightbox/Menu boards.jpg",
        alt: "Illuminated slim lightbox menu board",
      },
      {
        title: "Lobbies & branding",
        text: "A modern, professional way to display branding and wayfinding indoors.",
        image: "/ultra-thin-slim-lightbox/Lobbies & branding.jpg",
        alt: "Corporate lobby slim lightbox branding sign",
      },
      {
        title: "Storefront windows",
        text: "High-contrast, eye-catching displays that draw foot traffic day and night.",
        image: "/ultra-thin-slim-lightbox/Storefront windows.jpg",
        alt: "Storefront window ultra-thin lightbox display",
      },
    ],
    gallery: [
      { src: "/ultra-thin-slim-lightbox/main-hero.png", alt: "Ultra-thin slim LED lightbox transformation" },
      { src: "/ultra-thin-slim-lightbox/Retail displays.jpg", alt: "Retail ultra-thin slim LED lightbox display" },
      { src: "/ultra-thin-slim-lightbox/Menu boards.jpg", alt: "Illuminated slim lightbox menu board" },
      { src: "/ultra-thin-slim-lightbox/Lobbies & branding.jpg", alt: "Corporate lobby slim lightbox branding sign" },
      { src: "/ultra-thin-slim-lightbox/Storefront windows.jpg", alt: "Storefront window ultra-thin lightbox display" },
    ],
    faqs: [
      {
        q: "How thin is an ultra-slim lightbox?",
        a: "Our slim lightboxes are under an inch deep (around 25 mm) — a fraction of a traditional lightbox — so they sit almost flush to the wall for a clean, modern look.",
      },
      {
        q: "Is the light really even across the whole face?",
        a: "Yes. Edge-lit LEDs fire into a precision light-guide panel that spreads light uniformly, so there are no hotspots or dark corners from any viewing angle.",
      },
      {
        q: "How do I change the graphic?",
        a: "Depending on the model, the face opens as a magnetic cover or snap frame — you simply lift it, slide in the new print and close it, with no tools required.",
      },
      {
        q: "Can it be double-sided or hung?",
        a: "Yes. We offer wall-mounted, freestanding, flush and hanging (including double-sided) options to suit retail, hospitality and lobby spaces.",
      },
      {
        q: "Are they energy-efficient?",
        a: "Very. They run on low-voltage 12V/24V LEDs that use far less power than fluorescent lightboxes and last for years with minimal maintenance.",
      },
    ],
    metaTitle: "Ultra Thin Slim LED Lightboxes — Edge-Lit Signage",
    metaDescription:
      "Ultra-thin edge-lit LED lightboxes in slim anodized-aluminium frames with 100% even, shadow-free light and tool-free graphic swaps. Free mockup, 5-year warranty, tracked worldwide delivery.",
  },
  {
    slug: "uv-print-acrylic-signs",
    name: "3D Acrylic Illuminated Neon Signs",
    category: "3D Acrylic Neon Sign",
    tagline: "Full-colour UV artwork on acrylic, traced with glowing LED neon",
    accent: "#7c3aed",
    heroImage: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
    heroVideo: "/3d-arcylic/videos/25763cbb2ca6866a574a4dde5853343c.mp4",
    intro:
      "When a logo needs more than one colour, this is the sign. High-definition UV printing lays sharp, full-colour artwork, gradients and brand fonts directly onto premium acrylic, and we trace it with glowing LED neon contours. The result is rich, photo-quality detail combined with the glow of neon — colour-matched to your exact brand. It's also the most cost-effective way to light up a detailed design: the print handles the intricate work that would otherwise take metres of hand-bent tubing, so more of your budget goes into the artwork and less into labour.",
    chips: ["Cost-effective", "Full-colour UV print", "Neon contours", "Pantone / HEX / CMYK", "Logos & brand art"],
    features: [
      {
        icon: Palette,
        title: "High-def full-colour print",
        text: "UV printing cures vivid ink directly onto acrylic — gradients, photos and fine detail that neon alone can't achieve.",
      },
      {
        icon: Sparkles,
        title: "Glowing neon contours",
        text: "We outline and accent your artwork with LED neon, so the piece reads as both a print and a light.",
      },
      {
        icon: Eye,
        title: "Exact colour match",
        text: "Give us a Pantone, HEX or CMYK value and we'll match your brand precisely — no limit on colours.",
      },
      {
        icon: Layers,
        title: "3D layered depth",
        text: "Optional layered acrylic adds real depth and dimension for a premium, tactile finish.",
      },
    ],
    craft: {
      heading: "UV print meets LED neon",
      body: "We print your artwork in full colour straight onto clear, white or mirrored acrylic using a UV flatbed, so the detail is sharp and durable. Then we hand-trace the design with flexible LED neon to light the contours and key elements. Together they turn a flat logo into a glowing, gallery-quality piece — and because the print carries the fine detail, we only bend neon where the glow actually counts. That's what keeps a busy, multi-colour design cost-effective instead of quoting metre after metre of tubing.",
      points: [
        "High-definition UV direct-to-acrylic printing",
        "Flexible LED neon contour accents",
        "Clear, white, mirrored or coloured acrylic base",
        "Optional multi-layer 3D build for depth",
        "Less hand-bent tubing per design — a lower build cost",
      ],
      image: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.png",
      imageAlt: "Layered 3D acrylic UV-print neon studio sign",
    },
    specs: [
      { label: "Print", value: "High-def UV direct-to-acrylic, full colour" },
      { label: "Base", value: "Clear, white, mirrored or coloured acrylic" },
      { label: "Neon", value: "Flexible LED silicone contour accents" },
      { label: "Colour match", value: "Any Pantone / HEX / CMYK, unlimited colours" },
      { label: "Detail", value: "Gradients, photos and fine text supported" },
      { label: "Depth", value: "Single-layer or multi-layer 3D build" },
      {
        label: "Value",
        value:
          "Cost-effective for detail-heavy and multi-colour work — print carries the detail, neon carries the glow",
      },
      { label: "Power", value: "12V low-voltage plug-and-play" },
      { label: "Mounting", value: "Standoffs or hanging kit — ready to hang" },
      { label: "Use", value: "Indoor; IP67 waterproof option available" },
    ],
    options: {
      heading: "Print + neon combinations",
      body: "Combine UV print and neon however your design needs — a fully printed backboard with neon outline, printed brand fonts with a neon icon, or layered acrylic for a 3D logo wall. Leaning on the print for the busy parts is the cost-effective route, so tell us your budget and we'll show you the mix that gets the most sign for it.",
      items: [
        "Printed backboard + neon outline",
        "Printed fonts + neon icon",
        "Photo / gradient artwork",
        "Mirrored acrylic base",
        "Multi-layer 3D build",
        "Custom shapes",
      ],
    },
    useCases: [
      {
        title: "Logo & brand walls",
        text: "A full-colour logo that glows — ideal for receptions, studios and offices.",
        image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
        alt: "3D acrylic UV-print neon logo brand wall",
      },
      {
        title: "Photo booths & events",
        text: "Photo-ready, on-brand backdrops that make every picture look premium.",
        image: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.png",
        alt: "Layered acrylic UV-print neon event sign",
      },
      {
        title: "Retail & hospitality",
        text: "Colour-rich signage that captures artwork neon alone simply can't.",
        image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
        alt: "Retail 3D acrylic UV-print neon sign",
      },
      {
        title: "Custom art pieces",
        text: "Bespoke wall art blending print and neon into a one-of-a-kind statement.",
        image: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.png",
        alt: "Custom UV-print neon acrylic wall art",
      },
    ],
    gallery: [
      { src: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png", alt: "3D acrylic UV-print neon contour sign" },
      { src: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.png", alt: "Layered 3D acrylic UV-print neon sign" },
    ],
    faqs: [
      {
        q: "What is a UV-print acrylic neon sign?",
        a: "It combines high-definition UV printing — vivid, full-colour artwork cured directly onto acrylic — with glowing LED neon contours, giving you rich detail and the glow of neon in one piece.",
      },
      {
        q: "Can you match my brand colours and print a photo or gradient?",
        a: "Yes. UV printing supports unlimited colours, gradients, photos and fine text, and we colour-match to any Pantone, HEX or CMYK value.",
      },
      {
        q: "Why choose UV print over neon-only?",
        a: "UV print captures detail, small text and multi-colour artwork that neon tubing can't, and it's often more economical for detail-heavy designs — while the neon adds the glow.",
      },
      {
        q: "Is a 3D acrylic sign cost-effective?",
        a: "For a detailed or multi-colour design, it's usually the best value of anything we make. Rendering a busy logo in neon alone means metres of hand-bent tubing and a join at every colour change, and that hand labour is what drives the price up. Here the UV print does all the intricate work in a single pass and we bend neon only for the contours that need to glow — so the whole design gets lit for less. Send us your artwork and we'll quote it both ways, free, so you can compare before you commit.",
      },
      {
        q: "Can it have real 3D depth?",
        a: "Yes. We can build multi-layer acrylic for a genuine three-dimensional, tactile logo, then accent it with neon.",
      },
      {
        q: "Is it suitable for outdoors?",
        a: "Choose our IP67 waterproof option and your UV-print neon sign is ready for covered outdoor and event use.",
      },
    ],
    metaTitle: "Custom Acrylic Logo Signs with LED Neon",
    metaDescription:
      "Cost-effective 3D acrylic signs pairing full-colour UV print with glowing LED neon contours — the affordable way to light a detailed, multi-colour logo. Free mockup, 5-year warranty, tracked worldwide delivery.",
  },
];

export function getProductPage(slug: string): ProductPage | undefined {
  return PRODUCT_PAGES.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string): ProductPage[] {
  return PRODUCT_PAGES.filter((p) => p.slug !== slug);
}
