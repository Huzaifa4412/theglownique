/**
 * The consumer collection landing pages under /custom-signage.
 *
 * Defined in Section 6C of
 * SEO-Optimization/13-news-editorial-and-new-pages-blueprint.md and mapped in
 * 05-keyword-and-intent-map.csv. Shape, claims policy and the metadata builder
 * live in lib/landing-pages.ts; this file is only the content.
 *
 * ── Why these sit apart from /business-signs ────────────────────────────────
 *
 * The eight pages under /business-signs sell to a business: the buyer is
 * specifying a fixture for a commercial premises, cares about permits and
 * installation, and is spending the company's money. These three sell to a
 * person buying for an occasion or a room. Same four sign types, different
 * question, different vocabulary — and mixing the two would leave both hubs
 * ranking for neither audience.
 *
 * The clearest case is trade shows. Section 6C originally folded exhibition
 * signage in with birthdays and parties under a single `event-signs` page.
 * Exhibitor intent is commercial and buys differently, so it stayed in
 * /business-signs/trade-show-signs and `event-signs` below is consumer only.
 *
 * ── Evidence ────────────────────────────────────────────────────────────────
 *
 * `wedding signs` is the largest single volume on the keyword map at 14,800/mo
 * (peaking 18.1k) and only SD 39. The other two ship on competitor traffic
 * proof rather than their own validated head terms — see the notes on
 * SIG-EVENT and SIG-HOMEDECOR in the keyword map — so they are secondary until
 * their own numbers exist.
 */

import {
  SIGN_TYPE_HREF,
  type LandingContent,
  type LandingPage,
} from "@/lib/landing-pages";

// No channel letters here. Fabricated exterior metal lettering is a storefront
// product; none of these three audiences is buying one, so recommending it
// would pad the list rather than help anyone choose.
const { neon: NEON, lightbox: LIGHTBOX, acrylic: ACRYLIC } = SIGN_TYPE_HREF;

const COLLECTION_CONTENT: readonly LandingContent[] = [
  {
    slug: "wedding-signs",
    name: "Wedding Signs",
    kicker: "Wedding & Ceremony Signage",
    h1: "Custom Wedding Neon & Acrylic Signs",
    metaTitle: "Custom Wedding Neon & Acrylic Signs",
    metaDescription:
      "Custom wedding neon signs, acrylic welcome signs and personalised ceremony lettering. Battery or plug options, your colours, free design mockup and 5-year warranty.",
    intro:
      "Welcome signs, surname pieces and dance-floor lettering — designed around the two things that actually decide a wedding sign: how it mounts, and how it photographs.",
    heroImage: "/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp",
    heroAlt: "Personalised neon wedding sign on a ceremony backdrop",
    quoteProductName: "custom wedding neon sign",
    quoteLabel: "Get a Wedding Sign Mockup",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "The wedding standard. Flexible silicone at 12V, so it is light enough to hang on an arch and there is no glass anywhere near your guests.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Welcome boards, seating plans and order-of-day panels where the artwork is print rather than lettering.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Backlit panels for larger welcome displays and venue entrances that need to read across a room.",
      },
    ],
    considerations: [
      {
        title: "Decide battery or plug before anything else",
        text: "This is the decision that constrains everything after it. A sign on a floral arch in the middle of a lawn cannot trail a cable to a socket, and a battery pack changes the weight, the size that is practical and how long it stays lit. Tell us where it will stand at the point you ask for the mockup.",
      },
      {
        title: "How it mounts is not an afterthought",
        text: "An acrylic backer can be cut to shape with pre-drilled holes for cable ties onto an arch or stand, drilled for standoffs on a wall, or left as a clear rectangle to lean. Each is a different fabrication, so the venue and the stand want deciding before we build rather than on the morning.",
      },
      {
        title: "Warm white photographs better than cool",
        text: "The sign is in the background of your photographs whether you planned that or not, and colour temperature changes how skin reads on camera. Warm tones are forgiving; cold whites and blues push everything toward grey and no amount of editing fully undoes it.",
      },
      {
        title: "Check the venue's rules early",
        text: "Many venues restrict what can be fixed to a wall, what may be suspended and whether anything can be plugged in near a dance floor. Ask the coordinator before the design is fixed — it is a five-minute conversation that occasionally changes the whole specification.",
      },
    ],
    applications: [
      { name: "Welcome & Entrance Signs", text: "The first thing guests see, sized to read from across a courtyard or foyer." },
      { name: "Surname & Monogram Pieces", text: "Personalised lettering for the ceremony backdrop and the head table." },
      { name: "Arch & Backdrop Signs", text: "Lightweight builds designed to hang from a floral arch or a freestanding frame." },
      { name: "Dance Floor & Bar Lettering", text: "Evening pieces that carry the room once the lights go down." },
    ],
    faqs: [
      {
        q: "Can a wedding neon sign run on batteries?",
        a: "Yes, and it is the first thing to decide rather than the last. A battery pack frees you from a socket, which matters for an arch on a lawn, but it changes the practical size and weight and how long the sign stays lit. Tell us where the sign will stand when you ask for the mockup and we will specify for that.",
      },
      {
        q: "How does the sign attach to an arch or stand?",
        a: "The acrylic backer is cut for the job: pre-drilled holes for cable ties onto an arch or frame, standoffs for a wall, or a clear panel to lean or sit in a stand. They are different fabrications, so the venue and the mount want settling before we build.",
      },
      {
        q: "What colour works best in wedding photographs?",
        a: "Warm white and warm tones. Colour temperature changes how skin reads on camera, and cool whites and blues push a photograph toward grey in a way editing does not fully fix. If the sign will be behind you in the ceremony shots, warm is almost always the right answer.",
      },
      {
        q: "Can you use our own handwriting or a specific font?",
        a: "Yes. Send the artwork, a photograph of the handwriting, or the font name, and we will map it onto the tubing and show you the result on the mockup before anything is fabricated. We also match Pantone, HEX and CMYK if the sign has to sit against a specific palette.",
      },
      {
        q: "Can we keep the sign after the wedding?",
        a: "That is the usual reason people choose one over a rented board — it goes on a wall at home afterwards. It carries the same 5-year warranty as everything else we make. If you know it will end up indoors on a wall, say so and we will make sure the backer and fixings suit both uses.",
      },
    ],
  },
  {
    slug: "home-decor-signs",
    name: "Home Decor Signs",
    kicker: "Home, Bedroom & Games Room Signage",
    h1: "Custom Home Decor & Bedroom Neon Signs",
    metaTitle: "Custom Home Decor Neon Signs",
    metaDescription:
      "Custom home decor neon signs for bedrooms, games rooms, bars and man caves. Personalised lettering in your colours, with free design mockup and 5-year warranty.",
    intro:
      "Bedroom, games room and home bar pieces — where the design question is not visibility but living with the thing in a small room every evening.",
    heroImage: "/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp",
    heroAlt: "Custom neon sign mounted on a games room wall",
    quoteProductName: "custom home decor neon sign",
    quoteLabel: "Get a Home Sign Mockup",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "What almost every home piece is. Low voltage, cool to touch and dimmable, which matters more indoors than anywhere else.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour artwork, prints and layered pieces for a feature wall rather than lettering alone.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Backlit panels for home bars and cinema rooms where the graphic should look like a real venue sign.",
      },
    ],
    considerations: [
      {
        title: "Specify a dimmer for any room you sit in",
        text: "This is the single most common regret. A sign chosen at full output looks right in a photograph and is too much in a small bedroom at night. A dimmable driver costs little and has to be specified before fabrication, because adding one later means changing the driver.",
      },
      {
        title: "Size against the wall, not the screen",
        text: "Signs almost always look larger on a wall than they do in a mockup on a phone. Measure the actual wall space, mark the width out with tape before you confirm, and remember a sign wants clear space around it rather than filling the gap exactly.",
      },
      {
        title: "Plan where the cable goes",
        text: "A trailing cable is what makes a home sign look temporary. Decide before mounting whether it drops to a socket behind furniture, runs in trunking, or goes into the wall — and if it is going into the wall, do that before the sign is hung.",
      },
      {
        title: "Colour behaves differently in a small room",
        text: "In a bedroom or a games room the sign is not just an object, it lights the whole space and tints everything in it. Warm colours read cosy at night; strong blues and greens colour the walls more than most people expect from a swatch on a screen.",
      },
    ],
    applications: [
      { name: "Bedroom & Nursery Signs", text: "Names, words and shapes at a brightness that suits a room you sleep in." },
      { name: "Games & Media Rooms", text: "Gaming, cinema and console-room lettering for the wall behind the setup." },
      { name: "Home Bars & Man Caves", text: "Bar-style pieces and backlit panels that make a home bar read like a real one." },
      { name: "Living Spaces & Studios", text: "Feature-wall lettering, quotes and monograms for the rooms guests see." },
    ],
    faqs: [
      {
        q: "Is a neon sign too bright for a bedroom?",
        a: "At full output, often yes — and it is the most common thing people wish they had changed. Ask for a dimmable driver, which lets the same sign photograph well and still sit comfortably in a dark room. It has to be specified before fabrication, so raise it at mockup stage.",
      },
      {
        q: "How big should a sign be for a bedroom wall?",
        a: "Smaller than the mockup on your phone suggests. Measure the wall, mark the width out in tape and live with it for an evening before confirming — and leave clear space around the sign rather than filling the gap. We will size it against your measurements if you send them.",
      },
      {
        q: "Are they safe to leave on, and what do they cost to run?",
        a: "Our LED neon runs at 12V, stays cool to touch and has no glass, which is why it suits a bedroom or a child's room in a way traditional glass neon never did. We do not publish a running cost, because it depends entirely on the size and how long you leave it on.",
      },
      {
        q: "How is it mounted, and can we hide the cable?",
        a: "The acrylic backer is drilled for standoffs or screws, or supplied clear to lean or stand. Hiding the cable is a decision to make before you hang it: down behind furniture to a socket, into trunking, or into the wall — the last one is much easier before the sign goes up.",
      },
      {
        q: "Can we have our own words or design?",
        a: "That is the whole idea. Send the wording, a font, a sketch or your own handwriting and we will show it on a free mockup before anything is made. We match Pantone, HEX and CMYK, and every sign carries a 5-year warranty.",
      },
    ],
  },
  {
    slug: "event-signs",
    name: "Event & Party Signs",
    kicker: "Party, Birthday & Celebration Signage",
    h1: "Custom Party & Birthday Neon Signs",
    metaTitle: "Custom Party & Birthday Neon Signs",
    metaDescription:
      "Custom party neon signs, birthday lettering and celebration backdrops. Portable builds with battery or plug options, free design mockup and 5-year warranty.",
    intro:
      "Birthday lettering, photo-wall pieces and celebration backdrops — built to move between rooms and be used again, not to survive one evening.",
    heroImage: "/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp",
    heroAlt: "Personalised custom name neon sign at a celebration",
    quoteProductName: "custom party neon sign",
    quoteLabel: "Get a Party Sign Mockup",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Light, shatterproof and running at 12V, which is what you want in a crowded room full of people who are not being careful.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour backdrop panels, photo-wall pieces and printed artwork rather than lettering alone.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Backlit panels with a graphic you can reprint for the next occasion without replacing the sign.",
      },
    ],
    considerations: [
      {
        title: "Buy it to be used again",
        text: "A sign made for one evening is a poor purchase. Wording that is not tied to a single date or age gets hung on a wall afterwards and reused; a specific number does not. It is worth a minute's thought before the artwork is fixed.",
      },
      {
        title: "Portability decides the build",
        text: "If the sign moves between a hallway, a marquee and a friend's house, that changes the size, the backer and whether it runs on a battery. Tell us how it will travel and we will specify for it rather than for a permanent wall.",
      },
      {
        title: "Height beats size in a crowded room",
        text: "A party fills with people and anything at head height disappears behind them. Mounting higher does more for a photo backdrop than making the sign larger, and it keeps it away from drinks and elbows.",
      },
      {
        title: "It is a photo backdrop, so light it as one",
        text: "Most party signs end up behind someone in a photograph. Warm colours flatter skin; strong blues and greens do not. And a sign that is the only light source will silhouette people rather than light them — leave some ambient light in the room.",
      },
    ],
    applications: [
      { name: "Birthday & Milestone Signs", text: "Names, ages and messages for the party wall and the cake table." },
      { name: "Photo Walls & Backdrops", text: "Backdrop lettering designed for the shot rather than the room." },
      { name: "Baby Showers & Engagements", text: "Celebration pieces that keep working as decor once the day is done." },
      { name: "Home & Marquee Parties", text: "Portable builds with battery options for spaces without a convenient socket." },
    ],
    faqs: [
      {
        q: "Can a party sign run without a socket?",
        a: "Yes, with a battery pack — useful in a marquee or a garden where the nearest socket is nowhere near where the sign needs to be. It changes the practical size and how long it stays lit, so tell us where it is going when you ask for the mockup.",
      },
      {
        q: "Will we get any use out of it after the party?",
        a: "That depends on what it says, which is worth deciding deliberately. Wording that is not tied to one date or age goes on a wall afterwards and comes back out for the next occasion; a specific number has one evening. It carries a 5-year warranty either way.",
      },
      {
        q: "How high should a party sign be hung?",
        a: "Higher than feels necessary. A room fills with people and anything at head height vanishes behind them, so height does more for a photo backdrop than size does — and it keeps the sign clear of drinks and elbows.",
      },
      {
        q: "Are they safe around children and a crowded room?",
        a: "Our LED neon is flexible silicone running at 12V rather than glass at mains voltage. It stays cool to touch and there is nothing to shatter, which is exactly why it suits a room full of people who are not paying attention to the decor.",
      },
      {
        q: "Can we have a name or a specific message?",
        a: "Yes — send the wording, a font or a sketch and we will show it on a free mockup before anything is fabricated. We match Pantone, HEX and CMYK if it needs to sit against a particular colour scheme.",
      },
    ],
  },
];

/** Attaches the hub every one of these pages sits under. */
export const COLLECTION_PAGES: readonly LandingPage[] = COLLECTION_CONTENT.map((page) => ({
  ...page,
  parent: { href: "/custom-signage", label: "Custom Signage" },
  footerLink: { href: "/custom-signage", label: "Browse All Sign Types" },
}));
