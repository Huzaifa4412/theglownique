/**
 * The consumer collection pages under /custom-signage.
 *
 * Six occasions, one dynamic route (app/custom-signage/[slug]/page.tsx), one
 * renderer (components/landing/collection-page.tsx). Shape lives in
 * lib/landing-pages.ts; this file is only the content.
 *
 * ── Why these six ───────────────────────────────────────────────────────────
 *
 * Each page exists because two things are true at once: there is a keyword
 * with volume in the Ubersuggest export (resources/ubersuggest-keyword-map),
 * and there are enough real photographs in public/neon-sign to fill a gallery
 * without renders. The 2026-09-14 image review (five parallel passes over all
 * 130 files) decided the second half:
 *
 *   wedding-signs        wedding signs 14,800 · wedding neon signs 3,600     · 5 gallery + hero
 *   kids-room-neon-signs neon name sign 2,900 (no kids-specific volume yet)    · 9 gallery + hero
 *   gaming-neon-signs    gaming neon signs 590 · game room signage 480         · 5 gallery + hero
 *   home-decor-signs     neon lights for bedroom 2,400 · bedroom neon signs 1,600 · 5 gallery + hero
 *   bar-neon-signs       personalized neon bar signs 33,100 · man cave 480     · 5 gallery + hero
 *   event-signs          happy birthday neon sign 1,000 · party neon signs 170 · 5 gallery + hero
 *
 * What did NOT become a page, and why: the "boys room" folder holds no boys'
 * bedroom at all (fifteen adult family-name and bar photos), so girls', boys'
 * and kids' merge into one kids page; couples (one usable photo) folds into the
 * wedding page's wording; gym is a B2B page already; "custom name" has one
 * hand-held photo. Cafe and coffee-shop terms the map grouped with bar are
 * commercial intent and stay with /business-signs.
 *
 * ── Live URLs never change ──────────────────────────────────────────────────
 *
 * wedding-signs, home-decor-signs and event-signs were live before this
 * release, so they keep their slugs even where the keyword map had pencilled
 * in a different one. New pages take the map's planned slug.
 *
 * ── Gallery counts ──────────────────────────────────────────────────────────
 *
 * The gallery grid is four columns on desktop with the first photo spanning
 * 2 × 2. That fills its rows exactly with 5 or 9 tiles after the featured one,
 * so every page carries hero + 5 (kids, with the most usable photographs,
 * carries hero + 9). Add or remove in fours.
 *
 * ── Photographs ─────────────────────────────────────────────────────────────
 *
 * Every image is a 600 × 600 shop listing photograph of a customer's sign.
 * The review excluded anything with an identifiable face as the subject, a
 * sign still in packaging, third-party trademarks, profanity, or text cut off
 * by the crop. Captions say what the sign reads, because that is what a
 * visitor is deciding.
 *
 * ── Claims ──────────────────────────────────────────────────────────────────
 *
 * As lib/landing-pages.ts: warranty, free mockup, 12V silicone, colour
 * matching. No prices, lead times, delivery costs, counts or ratings.
 */

import type { CollectionPage, GalleryImage } from "@/lib/landing-pages";

type CollectionContent = Omit<CollectionPage, "parent" | "footerLink">;

// Consumer pages send people to the product pages, not the B2B sign-type pages.
const NEON = "/products/custom-neon-signs";
const ACRYLIC = "/products/uv-print-acrylic-signs";
const LIGHTBOX = "/products/ultra-thin-lightbox";

const img = (src: string, alt: string, caption?: string): GalleryImage => ({
  src,
  alt,
  ...(caption ? { caption } : {}),
});

const COLLECTION_CONTENT: readonly CollectionContent[] = [
  // ── Wedding ─────────────────────────────────────────────────────────────
  {
    slug: "wedding-signs",
    name: "Wedding Signs",
    kicker: "Weddings, proposals & receptions",
    h1: "Custom Wedding Neon Signs",
    tagline: "Your names, lit the way the room will remember them.",
    metaTitle: "Custom Wedding Neon Signs & Wall Decor",
    metaDescription:
      "Custom wedding neon signs — surnames, first names, Mr & Mrs and vows — in warm white or your palette. Battery or plug, free design mockup, 5-year warranty.",
    intro:
      "A custom wedding neon sign is in every photograph from the first dance to the last. Ours are built around the two things that decide whether it works: how it mounts on the day, and how it reads through a camera.",
    heroImage: "/neon-sign/wedding/iap_600x600.7378705048_ipwhq76b.webp",
    heroAlt:
      "White 'Chloé Adelina' neon sign hanging on a blush pink draped backdrop between two peach floral arrangements",
    heroCaption: "a first-name sign on blush drapes, between two floral pillars.",
    accent: "#ffd39a",
    accentInk: "#8a5514",
    quoteProductName: "custom wedding neon sign",
    quoteLabel: "Get a wedding sign mockup",
    keyword: "wedding neon sign",
    keywordPlural: "wedding neon signs",
    answer:
      "A custom wedding neon sign is your names, surname or a phrase hand-bent in flexible LED neon on a clear acrylic backboard. It runs at 12V from a plug or a battery pack, hangs on an arch, drape or flower wall in minutes, photographs without glare, and moves to a wall at home after the day.",
    updatedOn: "2026-09-14",
    related: [
      {
        label: "Wedding neon signs: sizing, backdrop hanging and photography",
        href: "/blog/custom-wedding-neon-signs-backdrop-guide",
        description: "How wide, how high and how to light it so the photographer gets the shot.",
      },
      {
        label: "How to choose the right neon colour",
        href: "/blog/how-to-choose-the-right-neon-color-for-your-sign",
        description: "Why warm white photographs best, and when a palette colour is worth it.",
      },
      {
        label: "What a custom sign costs",
        href: "/guides/custom-business-sign-cost",
        description: "The drivers behind every quote, and why two signs the same size can price differently.",
      },
    ],
    gallery: [
      img(
        "/neon-sign/wedding/iap_600x600.8065378054_3jboie8s.webp",
        "White 'The Durs' neon sign on a white rose flower wall above a bride flanked by two bridesmaids",
        "“The Durs” on a white rose wall — the surname sign, where the wedding party photos happen.",
      ),
      img(
        "/neon-sign/wedding/iap_600x600.7377205191_8inrc404.webp",
        "Red 'The Calverts' neon sign on a wooden wedding arch with white drapes, bride and groom beneath",
        "“The Calverts” in red on a wooden arch.",
      ),
      img(
        "/neon-sign/wedding/iap_600x600.7247906172_sxr7wzpt.webp",
        "Warm white 'The Burgesses' neon sign on a black backdrop with white tulle at a tented reception",
        "“The Burgesses” on black with tulle — a dark backdrop makes warm white glow hardest.",
      ),
      img(
        "/neon-sign/wedding/iap_600x600.7147068632_1mzv1c6r.webp",
        "White 'The Marks' neon sign hanging from a striped canopy as a couple dance beneath fairy lights outdoors",
        "“The Marks” hung from a canopy over the dance floor.",
      ),
      img(
        "/neon-sign/iap_600x600.7026575934_nbhjj205.webp",
        "Warm orange 'The McKenneys' neon sign on a rustic red barn-wood wall above a wooden cake stand",
        "“The McKenneys” over the cake table in a barn venue.",
      ),
    ],
    phrases: [
      "Mr & Mrs",
      "The [Surname]s",
      "Better Together",
      "Happily Ever After",
      "Till Death Do Us Party",
      "Let’s Party",
      "All You Need Is Love",
      "Will You Marry Me?",
      "Forever Starts Here",
      "Your first names, joined by a heart",
    ],
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
        text: "A sign on a floral arch in the middle of a lawn cannot trail a cable to a socket, and a battery pack changes the weight, the practical size and how long it stays lit. Tell us where it will stand when you ask for the mockup.",
      },
      {
        title: "Warm white photographs best",
        text: "Pure white can blow out on a phone camera and cool white reads clinical against flowers and skin. Warm white sits with candlelight and fairy lights. If you want colour, pick it from the palette, not the invitation font.",
      },
      {
        title: "Size it for the photo, not the wall",
        text: "The sign will be photographed with two people standing in front of it. Wider than their shoulders and mounted above head height is the rule; a sign that fits the backdrop perfectly with nobody in front of it usually disappears once they are.",
      },
      {
        title: "Think about the morning after",
        text: "A surname sign moves from the reception to the hallway at home; a date does not. If you want it to go on living, keep the wording to the names and let the stationery carry the date.",
      },
    ],
    applications: [
      { name: "Ceremony arch", text: "Hung from the arch or standing behind the couple. Battery power, warm white, wide enough to read past two people." },
      { name: "Photo backdrop", text: "Flower wall, drape or greenery. Dark or mid-tone backdrops give the strongest glow." },
      { name: "Sweetheart or cake table", text: "A smaller surname piece at eye level for seated guests." },
      { name: "Dance floor", text: "Mounted high and central — it is in every video of the first dance." },
    ],
    faqs: [
      {
        q: "How much does a custom wedding neon sign cost?",
        a: "It depends on the width, the number of letters, the number of colours and whether it needs a battery pack, which is why every sign is quoted individually rather than priced from a list. Send the wording and a rough width and you get a free mockup and an all-in quote before anything is made. The cost guide linked below explains what moves the price.",
      },
      {
        q: "Can a wedding neon sign run on battery?",
        a: "Yes. A battery pack suits arches, lawns and marquees where there is no socket nearby. It affects the weight and how long the sign stays lit, so tell us the venue when you ask for the mockup and we will size the pack to the day.",
      },
      {
        q: "What colour should a wedding sign be?",
        a: "Warm white is the safe choice: it sits naturally with flowers, candlelight and skin tones and photographs without harshness. Coloured signs work when they come from the wedding palette — we match Pantone, HEX or CMYK so it can be exact.",
      },
      {
        q: "How big should the sign be?",
        a: "Wider than the shoulders of two people standing in front of it, and mounted above head height. Send the backdrop dimensions and we will show the sign at scale on your own photo before anything is built.",
      },
      {
        q: "Can we use it at home afterwards?",
        a: "A surname or first-names sign does exactly that — reception wall on the day, hallway or bedroom for years afterwards. Every sign carries a 5-year warranty, so it is built for the second life as much as the first.",
      },
      {
        q: "Is it safe near guests, children and fabric drapes?",
        a: "Our LED neon is flexible silicone running at 12V, not glass at mains voltage. It stays cool to the touch and there is nothing to shatter, which is why it can hang on an arch or against sheer drapes without a second thought.",
      },
    ],
  },

  // ── Kids' room & nursery ────────────────────────────────────────────────
  {
    slug: "kids-room-neon-signs",
    name: "Kids’ Room Signs",
    kicker: "Nurseries, kids’ rooms & teen bedrooms",
    h1: "Kids’ Room Neon Signs & Nursery Name Signs",
    tagline: "Their name on the wall, in a glow soft enough to sleep under.",
    metaTitle: "Kids’ Room Neon Signs & Name Signs",
    metaDescription:
      "Kids’ room neon signs and neon name signs for nurseries, bedrooms and teen rooms. 12V silicone, no glass, dimmable, any colour. Free mockup, 5-year warranty.",
    intro:
      "A kids’ room neon sign is the one piece of a child’s room that is theirs alone, and it has to survive being lived under every night. These are built for that: low-voltage silicone with no glass, a glow that dims to a nightlight, and colours that still look right when they are twelve.",
    heroImage: "/neon-sign/kid room/iap_600x600.7831937493_bsa69vky.webp",
    heroAlt: "Blue 'TOBY' LED neon sign with a yellow star, mounted on a dark blue bedroom wall",
    heroCaption: "“TOBY” in blue with a yellow star, on a navy bedroom wall.",
    accent: "#ff7ac3",
    accentInk: "#b0186f",
    quoteProductName: "custom kids room neon name sign",
    quoteLabel: "Mock up their name for free",
    keyword: "kids’ room neon sign",
    keywordPlural: "kids’ room neon signs",
    answer:
      "A kids’ room neon sign is a child’s name or a short phrase in flexible LED neon on an acrylic backboard, with an optional star, heart or crown. It runs at 12V with no glass, stays cool to the touch, dims to a nightlight with the remote, and mounts high on the wall above a cot or bed.",
    updatedOn: "2026-09-14",
    related: [
      {
        label: "Neon signs for bedrooms: sizing, warmth and dimming",
        href: "/blog/custom-neon-signs-for-bedroom-and-home-decor",
        description: "How to size a sign to a bed, pick a warmth that sleeps well and set a dimmer.",
      },
      {
        label: "How to choose the right neon colour",
        href: "/blog/how-to-choose-the-right-neon-color-for-your-sign",
        description: "Which colours age well in a child’s room, and how lit colour differs from a screen.",
      },
      {
        label: "What a custom sign costs",
        href: "/guides/custom-business-sign-cost",
        description: "The drivers behind every quote — letters, size, colours, extras.",
      },
    ],
    gallery: [
      img(
        "/neon-sign/kid room/iap_600x600.7610949369_glo5mwm8.webp",
        "White 'Kaylee' script neon sign with a crown, glowing on a plain grey kids' bedroom wall",
        "“Kaylee” with a crown in white — the calmest colour for a room that has to sleep.",
      ),
      img(
        "/neon-sign/girls room/iap_600x600.7428460049_4rquio2q.webp",
        "Pink 'Charlotte' script neon sign glowing on a grey bedroom wall above a wooden loft bed, surrounded by silver butterfly decals",
        "“Charlotte” above a loft bed, with butterfly decals.",
      ),
      img(
        "/neon-sign/girls room/iap_600x600.5331151538_61m43otq.webp",
        "Pink 'Hello gorgeous' neon sign set into a pink and white flower wall above a child's white vanity with a mirror",
        "“Hello gorgeous” set into a flower wall over a vanity.",
      ),
      img(
        "/neon-sign/kid room/iap_600x600.7202214410_pbp3q0iv.webp",
        "Hot pink 'Priscilla' script neon name sign with two small hearts on a pink-lit bedroom wall",
        "“Priscilla” with two hearts, hot pink.",
      ),
      img(
        "/neon-sign/girls room/iap_600x600.7091793485_68nlf2xs.webp",
        "Bold pink 'CRUZ' neon sign above a boy's grey bed with sports-print bedding and framed photos",
        "“CRUZ” in bold capitals — block letters read older than script.",
      ),
      img(
        "/neon-sign/girls room/iap_600x600.7049639337_px5znda8.jpg",
        "'Daisy' neon name sign with a heart casting a pink glow over a bedroom wall decorated with fairy decals",
        "“Daisy” with a heart, and the pink wash it throws on the wall.",
      ),
      img(
        "/neon-sign/kid room/iap_600x600.7544802082_ko4q1p91.webp",
        "Pink 'Ffion' script neon sign with a green heart, hanging on a peach bedroom wall",
        "“Ffion” in pink with a green heart — two colours in one sign.",
      ),
      img(
        "/neon-sign/kid room/iap_600x600.7831938555_46tc4lp5.webp",
        "Pink 'Harriet' neon name sign with a teal heart on floral nursery wallpaper",
        "“Harriet” on floral nursery wallpaper.",
      ),
      img(
        "/neon-sign/kid room/iap_600x600.8459012118_4a3ltuu1.webp",
        "Red-pink 'Aurora' neon sign with a heart above a spindle cot in a pink-lit nursery",
        "“Aurora” above the cot — mounted well out of reach.",
      ),
    ],
    phrases: [
      "Their first name",
      "Name + a star, heart or crown",
      "Dream Big Little One",
      "Sweet Dreams",
      "Hello Sunshine",
      "You Are Loved",
      "Little Explorer",
      "Playroom",
      "Good Night Moon",
      "Their nickname, in their handwriting",
    ],
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "The one for a child’s room. Flexible 12V silicone with no glass, cool to the touch, and dimmable to a nightlight with the optional remote.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "When the design is a character, an illustration or a full-colour name rather than a single glowing line.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "A soft, even panel for a playroom or reading nook, with a graphic that can change as they grow.",
      },
    ],
    considerations: [
      {
        title: "Mount it out of reach, and plan the cable",
        text: "Above the cot, above the headboard, above a shelf they cannot climb. The cable runs down to a socket, so pick the wall with power on it and tell us where the socket is — we cut the cable exit to suit and can supply a cover.",
      },
      {
        title: "Choose a colour they will still like",
        text: "Hot pink and electric blue are the ones children ask for and the ones parents replace at ten. Warm white, blush and soft mint age better and still throw a coloured wash on the wall. A dimmer solves most of the rest.",
      },
      {
        title: "Script for little ones, block letters for older kids",
        text: "Rounded script reads as nursery. Uppercase block letters read as a teenager’s room. Pick the style for the age they will be in five years, not the age they are now.",
      },
      {
        title: "Decide if it doubles as the nightlight",
        text: "With the remote, a name sign dims low enough to leave on all night. If that is the plan, choose a warm colour and mount it where it will not shine straight at the pillow.",
      },
    ],
    applications: [
      { name: "Above the cot", text: "Small, warm, high on the wall and dimmable. The first thing on the nursery wall and the last thing to leave it." },
      { name: "Over the bed", text: "Centred above the headboard, wider than the pillow. The classic placement." },
      { name: "Playroom or reading corner", text: "A phrase rather than a name — Play, Dream Big, Little Explorer." },
      { name: "Teen bedroom", text: "Block capitals or a nickname, in a single strong colour." },
    ],
    faqs: [
      {
        q: "How much does a kids’ neon name sign cost?",
        a: "The name length, the width, the number of colours and any added shape or dimmer decide it, so each sign is quoted individually rather than priced from a list. Send the name and the wall width and you get a free mockup and an all-in quote before anything is made. The cost guide below explains what moves the price.",
      },
      {
        q: "Are neon name signs safe in a child’s bedroom?",
        a: "Our LED neon is flexible silicone on an acrylic backboard, running at 12V from a plug-in adapter. There is no glass, no gas and no mains voltage at the sign, and it stays cool to the touch. Mount it out of reach and keep the cable tidy and it is as safe as a bedside lamp.",
      },
      {
        q: "Can it be dimmed for night time?",
        a: "Yes. Add the optional wireless remote and the sign dims from full brightness down to a soft nightlight, and switches off from the doorway.",
      },
      {
        q: "What size should a kids’ name sign be?",
        a: "For a name above a cot or single bed, most people choose a sign a little wider than the pillow. Send a photo of the wall and the width you have in mind and we will show it at scale in a free mockup.",
      },
      {
        q: "Which colours work best in a nursery?",
        a: "Warm white, blush pink, soft mint and pale blue are gentle enough to leave on. Stronger colours look wonderful in photographs but throw a strong wash on the walls at night, so pair them with a dimmer.",
      },
      {
        q: "Can I add a heart, star or crown to the name?",
        a: "Yes — a shape can be part of the same sign, in the same or a second colour. Send the name and the shape you have in mind and the mockup shows the exact layout before we build it.",
      },
    ],
  },

  // ── Game room ───────────────────────────────────────────────────────────
  {
    slug: "gaming-neon-signs",
    name: "Game Room Signs",
    kicker: "Gaming setups, game rooms & streaming corners",
    h1: "Gaming Neon Signs for Game Rooms & Setups",
    tagline: "The glow behind the monitors that makes the room yours.",
    metaTitle: "Gaming Neon Signs for Game Rooms",
    metaDescription:
      "Custom gaming neon signs for game rooms, stream setups & arcades — gamertags & logos. Dimmable 12V LED silicone with free mockup & 5-year warranty.",
    intro:
      "Gaming rooms already glow. A gaming neon sign has to win against RGB strips, monitor light and a camera pointed at your face — which changes the colour you pick, where it hangs and how bright it runs.",
    heroImage: "/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp",
    heroAlt: "Green 'Game On' LED neon sign above two kids playing on dual monitors in a framed-art gaming den",
    heroCaption: "“GAME ON” in green over a two-screen den.",
    accent: "#8b5cf6",
    accentInk: "#5b21b6",
    quoteProductName: "custom gaming neon sign",
    quoteLabel: "Mock up your gamertag for free",
    keyword: "gaming neon sign",
    keywordPlural: "gaming neon signs",
    answer:
      "A gaming neon sign is a gamertag, phrase or controller outline in flexible LED neon, made to hang behind a desk, TV or arcade wall. It runs at 12V from a socket on your power strip, dims with a remote so it reads cleanly on a webcam, and comes in one fixed colour that RGB strips cannot wash out.",
    updatedOn: "2026-09-14",
    related: [
      {
        label: "Gaming neon signs: streaming setup, camera glare and sizing",
        href: "/blog/custom-gaming-neon-signs-streaming-setup-guide",
        description: "Where the sign sits in the webcam frame, how bright to run it and how big to go.",
      },
      {
        label: "How to choose the right neon colour",
        href: "/blog/how-to-choose-the-right-neon-color-for-your-sign",
        description: "Picking one colour that holds up against RGB lighting and a dark wall.",
      },
      {
        label: "What a custom sign costs",
        href: "/guides/custom-business-sign-cost",
        description: "The drivers behind every quote, from letter count to a logo outline.",
      },
    ],
    gallery: [
      img(
        "/neon-sign/Game Room/iap_600x600.6774958613_qsmg2a6o.webp",
        "Yellow 'Brendan's Game Room' neon script on an olive wall surrounded by framed posters, above a grey gaming chair and desk",
        "“Brendan’s Game Room” in yellow — a name on the sign makes the room a place, not a setup.",
      ),
      img(
        "/neon-sign/Game Room/iap_600x600.6275164826_eec7v021.webp",
        "Blue 'Game Room' LED neon sign lighting a basement arcade with a pop-a-shot hoop and arcade cabinets",
        "“GAME ROOM” in blue over a basement arcade.",
      ),
      img(
        "/neon-sign/Game Room/iap_600x600.6797006150_53a29lmm.webp",
        "Purple neon script sign glowing over an L-shaped gaming desk with an ultrawide monitor and electric guitar",
        "A gamertag in purple above an ultrawide battle station.",
      ),
      img(
        "/neon-sign/Game Room/iap_600x600.5652477588_eapvcera.webp",
        "Hot-pink neon script sign above a music-production desk with monitor, studio speakers and MIDI keyboard",
        "A channel name in pink over a production desk — the streaming crossover.",
      ),
      img(
        "/neon-sign/iap_600x600.8171132106_tw1ledca.webp",
        "Red 'Rock On' neon sign on a black bedroom wall between band posters, with a guitar and dresser below",
        "“Rock On” in red on a black wall — the darkest wall gives the sharpest glow.",
      ),
    ],
    phrases: [
      "Your gamertag",
      "Game On",
      "Game Room",
      "Player One",
      "Insert Coin",
      "Level Up",
      "Streaming Live",
      "Do Not Disturb",
      "Loading…",
      "A controller or headset outline",
    ],
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Gamertags, phrases and outlines in one saturated colour. Dimmable with the remote, so it drops to camera level when you stream.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "A full-colour logo or channel mascot printed onto acrylic, with neon tracing the outline — the way to light a multi-colour brand.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "A slim backlit panel for artwork or a poster behind the desk, with a graphic you can swap.",
      },
    ],
    considerations: [
      {
        title: "Pick one colour the RGB strips are not already doing",
        text: "If the desk is cycling through every hue, a sign in the same rainbow disappears. A single fixed colour — purple, white, red — anchors the room and reads on camera. Match it to the game, the team or the brand, not the strips.",
      },
      {
        title: "Put it where the camera sees it, not where you do",
        text: "For streaming, the sign belongs in the frame behind your shoulder, about level with your head. Hung above the monitors it lights the ceiling and shows up as a glow, not a sign.",
      },
      {
        title: "Plan for brightness you can turn down",
        text: "A sign that looks right with the lights on will bloom on a webcam with them off. The remote dims from full to a low glow, which is the setting most streamers actually use.",
      },
      {
        title: "Check the wall behind the desk for power",
        text: "Most setups already have a power strip; the sign’s 12V adapter takes one socket on it. Tell us which side it sits on and we set the cable exit so it drops straight down behind the desk.",
      },
    ],
    applications: [
      { name: "Behind the desk", text: "Gamertag or phrase, level with your head in the webcam frame." },
      { name: "Basement or den", text: "Game Room over the door or the arcade wall, bright, in a colour the room does not already have." },
      { name: "Console corner", text: "A short phrase above the TV — Player One, Game On." },
      { name: "Kids’ gaming nook", text: "Their name plus a controller outline, dimmable for after lights-out." },
    ],
    faqs: [
      {
        q: "How much does a gaming neon sign cost?",
        a: "The letter count, the width, the number of colours and whether it is text or a logo outline decide it, so every sign is quoted individually rather than priced from a list. Send the gamertag or file and a rough width and you get a free mockup and an all-in quote before anything is made. The cost guide below explains what moves the price.",
      },
      {
        q: "Can you make my gamertag or channel logo as a neon sign?",
        a: "Yes. A gamertag or phrase becomes LED neon in any font and colour. A full-colour logo or mascot is better as a UV-print acrylic sign with a neon outline, so the detail stays sharp. Send the file and we will show it both ways in a free mockup.",
      },
      {
        q: "Will a neon sign look good on stream?",
        a: "Yes, as long as it is dimmable and in the frame. Cameras expose for the brightest thing they see, so a sign at full power blooms. With the remote you drop it to a glow that reads cleanly, and mounting it behind your shoulder rather than above the monitors keeps it in shot.",
      },
      {
        q: "What colour is best for a gaming setup?",
        a: "One fixed colour that the RGB lighting is not already cycling through. Purple, cool white and red are the most ordered. We match Pantone, HEX and CMYK, so a team or brand colour can be exact.",
      },
      {
        q: "Does it need its own socket?",
        a: "It plugs into a standard 12V adapter that takes one socket on the power strip you already have behind the desk. Nothing is hard-wired.",
      },
      {
        q: "Is it safe left on for long sessions?",
        a: "LED neon runs cool and draws little power, so leaving it on through a long session or overnight is normal use. Every sign carries a 5-year warranty.",
      },
    ],
  },

  // ── Bedroom & home decor ────────────────────────────────────────────────
  {
    slug: "home-decor-signs",
    name: "Home Decor Signs",
    kicker: "Bedrooms, living rooms & neon wall art",
    h1: "Custom Neon Signs for Home Decor, Aesthetic Neon Signs & Neon Signs for Bedroom",
    tagline: "A phrase you chose, in light, on the wall you look at most.",
    metaTitle: "Custom Neon Signs for Home Decor & Bedroom Wall Art",
    metaDescription:
      "Cool neon signs, custom neon signs for home decor, bedrooms, living rooms and hallways — quotes, names & wall art. Dimmable 12V LED with free mockup & 5-year warranty.",
    intro:
      "A bedroom neon sign is lived with, not visited. The wording has to still feel like yours in five years, the colour has to sit with the paint, and custom neon signs for home decor have to dim to something you can sleep beside on a Tuesday night.",
    heroImage: "/neon-sign/room/iap_600x600.8069307682_6sin2ngi.webp",
    heroAlt: "Warm white 'The Dohertys' neon script on a charcoal wall above a taupe sofa with olive cushions",
    heroCaption: "“The Dohertys” in warm white, over the sofa on a charcoal wall.",
    accent: "#7dd3fc",
    accentInk: "#0369a1",
    quoteProductName: "custom home decor neon sign",
    quoteLabel: "Get a home sign mockup",
    keyword: "custom neon signs for home decor",
    keywordPlural: "bedroom neon signs",
    answer:
      "A bedroom neon sign is a name, quote or shape in flexible LED neon on an acrylic backboard, made to hang above a bed, a sofa or a hallway wall. It runs at 12V, stays cool, dims with a remote for night, and is colour-matched to your paint from a Pantone, HEX or CMYK reference before it is built.",
    updatedOn: "2026-09-14",
    related: [
      {
        label: "Neon signs for bedrooms and home decor: sizing, warmth and dimming",
        href: "/blog/custom-neon-signs-for-bedroom-and-home-decor",
        description: "How to size a sign to the bed, choose a warmth you can sleep beside and set the dimmer.",
      },
      {
        label: "How to choose the right neon colour",
        href: "/blog/how-to-choose-the-right-neon-color-for-your-sign",
        description: "Why lit colour on a wall differs from a screen, and how wall colour changes the glow.",
      },
      {
        label: "What a custom sign costs",
        href: "/guides/custom-business-sign-cost",
        description: "The drivers behind every quote, and why two signs the same size can price differently.",
      },
    ],
    gallery: [
      img(
        "/neon-sign/room/iap_600x600.5808904777_nqlt9tbx.webp",
        "Purple 'You're so weird, don't change' neon sign on a dark green living room wall beside a window and sofa",
        "“You’re so weird, don’t change” in purple on a dark green wall.",
      ),
      img(
        "/neon-sign/room/iap_600x600.8413483402_inne2nmp.webp",
        "Warm yellow 'Keep Smiling' neon script above a gold-framed colourful city painting on a lilac wall",
        "“Keep Smiling” in warm yellow over framed art.",
      ),
      img(
        "/neon-sign/iap_600x600.8263279757_9dde3xmx.webp",
        "Blue 'Lake Life' neon sign with a yellow sun icon glowing on dark wood panelling above cream cushions",
        "“Lake Life” with a yellow sun — two colours on dark panelling.",
      ),
      img(
        "/neon-sign/iap_600x600.8171132106_tw1ledca.webp",
        "Red 'Rock On' neon sign on a black bedroom wall between band posters, with a guitar and dresser below",
        "“Rock On” in red on a black bedroom wall.",
      ),
      img(
        "/neon-sign/iap_600x600.7022009815_pukhti28.webp",
        "Warm yellow 'Madeleine' neon name sign mounted on a plain grey-blue wall",
        "“Madeleine” in warm yellow on a plain wall — a name sign is the simplest neon wall art.",
      ),
    ],
    phrases: [
      "The [Surname]s",
      "Good Vibes Only",
      "Keep Smiling",
      "Home Sweet Home",
      "Stay Wild",
      "But First, Coffee",
      "Dream Big",
      "You’re So Weird, Don’t Change",
      "Lake Life",
      "A line from your favourite song",
    ],
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Quotes, names and outlines in a single glowing line. Dimmable with the remote, cool to the touch, and light enough to hang on standard fixings.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour artwork on acrylic with neon accents — for a piece that is closer to a print than to lettering.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "A slim backlit panel for a photograph or artwork, with a graphic you can change with the season.",
      },
    ],
    considerations: [
      {
        title: "Test the wording on yourself for a week",
        text: "Write it on paper and tape it where the sign will go. If it still feels like you after seven days of walking past it, order it. Most regret is wording, not colour or size.",
      },
      {
        title: "Match the colour to the wall, not the screen",
        text: "A colour looks different lit on a wall than on a phone. Dark and mid-tone walls make any colour glow harder; white walls soften warm tones and can make cool ones look clinical. Send the wall photo and the mockup shows the real pairing.",
      },
      {
        title: "Decide where the cable goes before you fall for a spot",
        text: "The sign needs a socket. Above a sofa or bed the cable usually drops behind the furniture; on an open wall it needs a cover or a chased channel. Tell us which side the socket is and we set the exit to suit.",
      },
      {
        title: "Size to the furniture underneath it",
        text: "Over a sofa, roughly two-thirds of the sofa’s width. Over a bed, wider than the pillows. A sign sized to the wall alone almost always ends up too small once the room is furnished.",
      },
    ],
    applications: [
      { name: "Above the bed", text: "A name, a phrase or a shape, centred on the headboard and dimmable for night." },
      { name: "Living room feature wall", text: "Family surname or a line you love, sized to the sofa beneath it." },
      { name: "Hallway or entrance", text: "Home Sweet Home, the surname, or a welcome — the first thing seen and the last." },
      { name: "Home office or studio", text: "A motto or your own name, behind the desk and in the video-call frame." },
    ],
    faqs: [
      {
        q: "How much does a bedroom neon sign cost?",
        a: "The width, the number of letters, the number of colours and extras like a dimmer or a coloured backboard decide it, so every sign is quoted individually rather than priced from a list. Send the wording and the wall width and you get a free mockup and an all-in quote before anything is made. The cost guide below explains what moves the price.",
      },
      {
        q: "What size neon sign for a bedroom wall?",
        a: "Wider than the pillows if it goes above the bed; about two-thirds of the width of the furniture beneath it anywhere else. Send a photo of the wall and a rough width and we will place the sign at scale in a free mockup.",
      },
      {
        q: "Can I dim it or leave it on at night?",
        a: "Yes. With the optional remote it dims from full brightness to a low glow and switches off from bed. LED neon runs cool and draws little power, so leaving it on is normal use.",
      },
      {
        q: "Will the colour look the same as on my phone?",
        a: "Not exactly — lit colour on a wall behaves differently from a screen. We match Pantone, HEX and CMYK as closely as the materials allow, and the mockup on your own wall photo is the honest preview. Dark walls make every colour glow harder.",
      },
      {
        q: "How does it hang?",
        a: "The acrylic backboard mounts on wall standoffs or a hanging kit, both supplied. It is light enough for standard fixings in plasterboard, and the cable drops to a plug-in 12V adapter.",
      },
      {
        q: "Can I get a quote or song lyric?",
        a: "Yes, any wording in any font. Send the line and a font you like, or a sketch, and the mockup shows the exact layout before we build it. It carries a 5-year warranty like every sign we make.",
      },
    ],
  },

  // ── Home bar & man cave ─────────────────────────────────────────────────
  {
    slug: "bar-neon-signs",
    name: "Home Bar Signs",
    kicker: "Home bars, man caves, kitchens & garages",
    // US spelling on the head term: "personalized neon bar signs" carries the
    // volume (33,100/mo); the British "personalised" barely registers.
    h1: "Personalized Neon Bar Signs for Home Bars & Man Caves",
    tagline: "Name the bar, and the corner becomes a place.",
    metaTitle: "Personalized Neon Bar Signs & Pub Signs",
    metaDescription:
      "Personalized neon bar signs for home bars, man caves, kitchens and garages — your bar name or quote. Dimmable 12V LED neon, free mockup & 5-year warranty.",
    intro:
      "A home bar becomes a bar the moment its name is lit above it. A personalized neon bar sign is built for the rooms it actually goes in — dark corners, garages, kitchens — where the glow does the work the decor cannot.",
    heroImage: "/neon-sign/iap_600x600.7488149925_lgq4qo2u.webp",
    heroAlt: "Yellow 'Tequila' neon script on red backing casting a red glow across a plain wall",
    heroCaption: "“Tequila” in yellow on a red backboard, and the red wash it leaves on the wall.",
    accent: "#ffb347",
    accentInk: "#9a4f00",
    quoteProductName: "personalised neon bar sign",
    quoteLabel: "Mock up your bar sign for free",
    keyword: "personalized neon bar sign",
    keywordPlural: "personalized neon bar signs",
    answer:
      "A personalized neon bar sign is your bar’s name, a drink or a line in flexible LED neon on a clear or coloured acrylic backboard, made to hang above a home bar, kitchen counter, man cave or garage wall. It runs at 12V, dims for late nights, and can be built for damp or unheated spaces.",
    updatedOn: "2026-09-14",
    related: [
      {
        label: "Neon signs for bars and cafés: sizing, lighting and durability",
        href: "/blog/custom-neon-signs-for-bars-and-cafes",
        description: "What holds up behind a bar — height, colour temperature and what to do about splashes.",
      },
      {
        label: "How to choose the right neon colour",
        href: "/blog/how-to-choose-the-right-neon-color-for-your-sign",
        description: "Warm tones for wood and glass, one strong colour for a den — and why.",
      },
      {
        label: "What a custom sign costs",
        href: "/guides/custom-business-sign-cost",
        description: "The drivers behind every quote, including coloured backboards and outdoor builds.",
      },
    ],
    gallery: [
      img(
        "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
        "Round pink LED neon 'BAR' sign glowing on a pallet-wood home bar with stools and string lights",
        "“BAR” in a pink ring over a pallet-wood garden bar — a shape reads from across the garden.",
      ),
      img(
        "/neon-sign/kitchen/iap_600x600.7801459368_73puxafi.webp",
        "White neon 'The Hoffers' sign above a fluted tile backsplash and cocktail tools on a kitchen counter",
        "“The Hoffers” over the kitchen cocktail corner.",
      ),
      img(
        "/neon-sign/Bar/iap_600x600.6150049023_ex7fujh3.webp",
        "Warm white neon sign reading 'por que no los dos' above a black bar cart stocked with spirits",
        "“por que no los dos” above a bar cart — a joke your guests are meant to read.",
      ),
      img(
        "/neon-sign/boys room/iap_600x600.7073193802_knt4iemy.webp",
        "Warm yellow 'You Betcha!' script neon sign on a beige wall above a framed beer-mug print",
        "“You Betcha!” in warm yellow over the beer art.",
      ),
      img(
        "/neon-sign/boys room/iap_600x600.7657103033_ecuovjxr.webp",
        "Red 'Rust Up Buttercup' neon sign glowing in a metal workshop with a chain hoist and scrap steel",
        "“Rust Up Buttercup” in a workshop — the garage and man cave end of the range.",
      ),
    ],
    phrases: [
      "[Your Name]’s Bar",
      "The [Surname] Tavern",
      "Cheers",
      "It’s 5 O’Clock Somewhere",
      "Cocktails & Dreams",
      "Open Late",
      "Tequila",
      "Cold Beer Here",
      "Man Cave",
      "Dad’s Garage",
    ],
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "The bar sign. A name, a drink or a line in one saturated colour, on a clear or coloured backboard, dimmable for late nights.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "A full-colour crest, a label design or a mascot printed on acrylic with neon tracing the outline.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "A slim backlit menu or artwork panel behind the bar, with a print you can change.",
      },
    ],
    considerations: [
      {
        title: "Pick the backboard colour as carefully as the tube",
        text: "A coloured acrylic backboard — red, black, smoked — changes the whole sign when it is off and doubles the glow when it is on. Clear disappears into the wall; coloured becomes part of the decor. The Tequila sign above is yellow tube on red board.",
      },
      {
        title: "Garages and outdoor bars need the right build",
        text: "A garden bar or an unheated garage is not an indoor room. Tell us the space and we will specify the build for damp and temperature swings rather than assume a warm living room.",
      },
      {
        title: "Mount it above bottle height and behind the pour",
        text: "Above the back bar and above the tallest bottle, so it is in the photo when someone is pouring. On a bar cart, on the wall directly above — never resting on the cart, where it gets knocked.",
      },
      {
        title: "Warm tones for a bar, one strong colour for a cave",
        text: "Warm white and amber flatter wood, glass and whisky. A garage, workshop or games den takes a single saturated colour — red, blue, green — and looks better the darker the room is.",
      },
    ],
    applications: [
      { name: "Home bar", text: "The bar’s name over the back bar, above bottle height, warm white or amber." },
      { name: "Kitchen", text: "A surname or a coffee line over the counter — smaller, and in a colour that suits daylight." },
      { name: "Man cave or den", text: "One saturated colour on a dark wall, sized to be read from the sofa." },
      { name: "Garage or workshop", text: "Built for the space. A line with attitude in red or blue." },
    ],
    faqs: [
      {
        q: "How much does a personalized neon bar sign cost?",
        a: "The width, the number of letters, the number of colours, a coloured backboard and an outdoor-rated build all move it, so every sign is quoted individually rather than priced from a list. Send the bar name and a photo of the wall and you get a free mockup and an all-in quote before anything is made. The cost guide below explains what moves the price.",
      },
      {
        q: "Can I put my own bar name on a neon sign?",
        a: "Yes — a first name, a surname, a pub-style name or a joke. Send the wording and a font you like, or a sketch, and the free mockup shows it at scale on a photo of your bar before anything is built.",
      },
      {
        q: "Can a neon bar sign go in a garage or garden bar?",
        a: "Yes, with the right build for the space. Tell us whether it is heated, covered or exposed and we will specify the sign for damp and temperature swings rather than treat it as an indoor room.",
      },
      {
        q: "What colour is best for a home bar?",
        a: "Warm white and amber suit wood, glass and bottles and photograph well in low light. For a man cave or den, a single saturated colour on a dark wall gives the strongest glow. Coloured acrylic backboards add a second colour without a second tube.",
      },
      {
        q: "How big should a bar sign be?",
        a: "Wider than the back bar shelf it sits above, and above the tallest bottle. Send the shelf width and a photo and the mockup shows the sign at scale.",
      },
      {
        q: "Is it safe near drinks and a crowded room?",
        a: "Our LED neon is flexible 12V silicone with no glass, so a knock or a splash is not the end of it. It stays cool to the touch and carries a 5-year warranty.",
      },
    ],
  },

  // ── Party & birthday ────────────────────────────────────────────────────
  {
    slug: "event-signs",
    name: "Party & Event Signs",
    kicker: "Birthdays, parties, showers & proposals",
    h1: "Custom Party & Happy Birthday Neon Signs",
    tagline: "One night in light, and a wall at home afterwards.",
    metaTitle: "Party & Happy Birthday Neon Signs",
    metaDescription:
      "Custom party neon signs & happy birthday neon signs for birthdays, showers and events. Battery or plug-in, reusable, with free mockup & 5-year warranty.",
    intro:
      "A party neon sign has one job on the night — be in every photograph — and one job afterwards: go on a wall and keep working. Choosing wording that does both is most of the decision.",
    heroImage: "/neon-sign/event/iap_600x600.6103087465_ikaxjhp9.webp",
    heroAlt: "Yellow neon 'paletas' sign on a vintage white ice-cream cart under a ruffled parasol on a lawn",
    heroCaption: "“paletas” in yellow on an ice-cream cart, under a parasol on the lawn.",
    accent: "#ff5fb0",
    accentInk: "#b4106a",
    quoteProductName: "custom party neon sign",
    quoteLabel: "Get a party sign mockup",
    keyword: "party neon sign",
    keywordPlural: "party and birthday neon signs",
    answer:
      "A party neon sign is Happy Birthday, a name, an age or a phrase in flexible LED neon on an acrylic backboard, made to hang above a balloon arch, dessert table or photo backdrop. It runs from a plug or a battery pack, hangs in minutes, reads in every photo, and goes on a wall at home afterwards.",
    updatedOn: "2026-09-14",
    related: [
      {
        label: "Hanging a neon sign on a backdrop: sizing, height and photography",
        href: "/blog/custom-wedding-neon-signs-backdrop-guide",
        description: "Written for weddings, and every rule about arches, height and cameras applies to a party.",
      },
      {
        label: "How to choose the right neon colour",
        href: "/blog/how-to-choose-the-right-neon-color-for-your-sign",
        description: "Picking a colour that contrasts with the balloons instead of vanishing into them.",
      },
      {
        label: "What a custom sign costs",
        href: "/guides/custom-business-sign-cost",
        description: "The drivers behind every quote, including a battery pack.",
      },
    ],
    gallery: [
      img(
        "/neon-sign/event/iap_600x600.6125652432_j15ml24x.webp",
        "Hot-pink neon 'Jewels of July' sign over a birthday dessert table with flamingos and a balloon arch",
        "“Jewels of July” in hot pink over the dessert table — the dark backdrop makes the pink hit.",
      ),
      img(
        "/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp",
        "White 'Will You Marry Me?' neon sign inside a gold hoop arch with white drapes and red roses",
        "“Will You Marry Me?” inside a hoop arch of roses.",
      ),
      img(
        "/neon-sign/wedding/iap_600x600.8128407110_dlwocp0z.webp",
        "Warm white 'The DeVitos' neon sign on a sheer curtain under a tent, with sage and gold balloon garland and candles on logs",
        "A surname sign on sheer curtain with a balloon garland — the tent set for a celebration.",
      ),
      img(
        "/neon-sign/iap_600x600.6948226050_8nvu8lwp.webp",
        "Ice-blue neon script sign on a boxwood-hedge bar cart with a slushie machine and an orchid",
        "A party-bar sign in ice blue on a hedge-wall drinks cart.",
      ),
      img(
        "/neon-sign/wedding/iap_600x600.7147068632_1mzv1c6r.webp",
        "White 'The Marks' neon sign hanging from a striped canopy as a couple dance beneath fairy lights outdoors",
        "A surname sign over the dance floor, under a canopy of fairy lights.",
      ),
    ],
    phrases: [
      "Happy Birthday",
      "Their name + age",
      "Cheers to 30",
      "Let’s Party",
      "Oh Baby",
      "Hello Little One",
      "Will You Marry Me?",
      "Bride to Be",
      "Let’s Get Fizzical",
      "The party’s hashtag",
    ],
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Light, battery-capable and hangs in minutes. Names, ages and phrases that go on a wall at home after the night.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour welcome boards, table plans and backdrops where the artwork is print rather than lettering.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "A backlit panel for a larger entrance display, with a graphic you can swap for the next event.",
      },
    ],
    considerations: [
      {
        title: "Wording that survives the date",
        text: "A number has one evening; a name or a phrase goes on a bedroom wall the next day and comes out again next year. If you want both, put the age on the cake and the name on the sign.",
      },
      {
        title: "Battery if the socket is more than a cable away",
        text: "Gardens, marquees and hired halls rarely have power where the backdrop is. A battery pack solves it and changes the practical size and run time — tell us where it will stand when you ask for the mockup.",
      },
      {
        title: "Higher than feels necessary",
        text: "A room fills with people and anything at head height disappears behind them. Height does more for a photo backdrop than size does, and it keeps the sign clear of drinks and elbows.",
      },
      {
        title: "Pick a colour the balloons are not",
        text: "A pink sign in front of pink balloons is invisible. Contrast with the backdrop — white on colour, colour on dark — is what makes the sign read in the photos.",
      },
    ],
    applications: [
      { name: "Birthday backdrop", text: "Name or Happy Birthday above the balloon arch, mounted high, in a contrasting colour." },
      { name: "Baby shower", text: "Oh Baby or the name-to-be, warm white — it goes straight to the nursery afterwards." },
      { name: "Proposal", text: "Will You Marry Me? on battery, wherever the question is asked." },
      { name: "Bar or dessert table", text: "A short line above the drinks or the cake, where every phone points." },
    ],
    faqs: [
      {
        q: "How much does a happy birthday neon sign cost?",
        a: "The wording length, the width, the number of colours and whether it needs a battery pack decide it, so every sign is quoted individually rather than priced from a list. Send the wording and where it will hang and you get a free mockup and an all-in quote before anything is made. The cost guide below explains what moves the price.",
      },
      {
        q: "Can a party sign run without a socket?",
        a: "Yes, with a battery pack — useful in a marquee or a garden where the nearest socket is nowhere near the backdrop. It changes the practical size and how long it stays lit, so tell us where it is going when you ask for the mockup.",
      },
      {
        q: "Will we get any use out of it after the party?",
        a: "That depends on the wording, which is worth deciding deliberately. A name or a phrase goes on a wall afterwards and comes back out for the next occasion; a specific number has one evening. It carries a 5-year warranty either way.",
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
export const COLLECTION_PAGES: readonly CollectionPage[] = COLLECTION_CONTENT.map((page) => ({
  ...page,
  parent: { href: "/custom-signage", label: "Custom Signage" },
  footerLink: { href: "/custom-signage", label: "Browse all sign types" },
}));

export function getCollectionPage(slug: string): CollectionPage | undefined {
  return COLLECTION_PAGES.find((page) => page.slug === slug);
}
