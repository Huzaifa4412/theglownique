/**
 * The eight B2B industry landing pages under /business-signs.
 *
 * Defined in Section 6C of
 * SEO-Optimization/13-news-editorial-and-new-pages-blueprint.md and mapped in
 * 05-keyword-and-intent-map.csv. Shape, claims policy and the metadata builder
 * live in lib/landing-pages.ts; this file is only the content.
 *
 * ── Slugs ───────────────────────────────────────────────────────────────────
 *
 * Every slug matches the head term the page is meant to rank for, not an
 * internal category label: `office-signs` and not `offices-reception`, because
 * `office signs` is the query with 2,900 monthly US searches and
 * "offices-reception" matches nothing. Changing a slug here means changing it
 * in the keyword map, the IA document and lib/routes.ts in the same edit.
 */

import {
  SIGN_TYPE_HREF,
  type LandingContent,
  type LandingPage,
} from "@/lib/landing-pages";

const { neon: NEON, channel: CHANNEL, lightbox: LIGHTBOX, acrylic: ACRYLIC } = SIGN_TYPE_HREF;

/**
 * Ordered by build priority, which is difficulty-ascending and not
 * volume-descending: gym-fitness-signs carries the lowest difficulty on the
 * whole keyword map (SD 23), so it ranks soonest and proves the template
 * before the harder pages are attempted.
 */
const INDUSTRY_CONTENT: readonly LandingContent[] = [
  {
    slug: "gym-fitness-signs",
    name: "Gym & Fitness Signs",
    kicker: "Gym & Fitness Studio Signage",
    h1: "Custom Gym Neon Signs & Fitness Studio Signage",
    metaTitle: "Custom Gym Neon Signs & Fitness Signage",
    metaDescription:
      "Custom gym neon signs & motivational fitness studio logo signage built for high-traffic training floors. Free design mockup & 5-year warranty.",
    answer:
      "For most gyms, flexible 12V LED neon suits motivational walls and studio logos inside, because there are no glass tubes to break near a lifting area. Use 3D metal channel letters for the studio name on a façade or tall entrance wall, and UV-printed acrylic for full-colour logos, timetables and zone markers. Each sign is made to order after a free design mockup.",
    intro:
      "Motivational wall signs, studio logos and class-room branding built to survive chalk dust, dropped plates and the vibration of a busy training floor.",
    heroImage: "/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp",
    heroAlt: "Motivational LED neon sign mounted on a gym wall",
    quoteProductName: "custom gym neon sign",
    quoteLabel: "Get a Gym Sign Quote",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Flexible 12V silicone LED neon is the right answer above a squat rack — there are no glass tubes to break.",
      },
      {
        name: "3D Metal Channel Letters",
        href: CHANNEL,
        why: "Fabricated metal letters for the studio name on an exterior façade or a double-height entrance wall.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Layered acrylic for class timetables, zone markers and reception logo walls where the artwork is full-colour.",
      },
    ],
    considerations: [
      {
        title: "Mount clear of the drop zone",
        text: "A sign over a platform or rack takes impact eventually. Specify the mounting height against the loaded-bar path rather than against head height, and keep standoffs off any wall panel a lifting frame is bolted through.",
      },
      {
        title: "Vibration is the real load",
        text: "Dropped deadlifts shake a wall continuously for years. Fixings want to land in studs or solid substrate rather than plasterboard anchors, and the backing plate should be sized for the sign's span rather than its weight.",
      },
      {
        title: "Brightness against gym lighting",
        text: "Training floors run high ambient light, so a sign that reads well in a showroom can wash out here. Larger stroke widths and stronger colour saturation hold up better than a thin script at the same wattage.",
      },
      {
        title: "Cleanability",
        text: "Sweat and chalk settle on any horizontal edge. Silicone neon and sealed acrylic wipe down with a damp cloth; open-backed constructions with exposed channels do not, and we do not specify them for gym floors.",
      },
    ],
    applications: [
      { name: "Motivational Wall Signs", text: "Slogan and mantra pieces sized for the main training floor and the free-weight wall." },
      { name: "Studio Logo Walls", text: "Reception and entrance branding that photographs well for member social posts." },
      { name: "Class & Zone Markers", text: "Spin, yoga, HIIT and recovery-zone identifiers that hold up under strip lighting." },
      { name: "Exterior Studio Signs", text: "Outdoor-built façade and entrance signage for street-level visibility after dark." },
    ],
    faqs: [
      {
        q: "Are gym neon signs safe to mount above weights?",
        a: "Our LED neon is flexible silicone tubing running at 12V, not glass tubes driven by a high-voltage transformer — there is no glass to shatter onto a lifting platform. We still recommend mounting clear of the loaded-bar path, and we will mark that height on the mockup if you send a photo of the wall.",
      },
      {
        q: "Will a wall sign survive the vibration from dropped weights?",
        a: "That depends far more on the fixing than on the sign. We size a backing plate to the sign's span and specify fixings into studs or solid substrate rather than plasterboard anchors. Tell us the wall construction when you request the mockup and we will spec the mount with it.",
      },
      {
        q: "How large should a motivational sign be for a big training floor?",
        a: "Work back from the furthest point you want it read from. The US Sign Council's average is about 30 feet of viewing distance per inch of capital-letter height, so a sign read from 60 feet across the floor needs capitals of at least 2 inches. Treat that as a minimum: it is an average for clear lettering. Send us the floor dimensions and we will size it on the mockup.",
      },
      {
        q: "Can you match our studio's brand colours?",
        a: "Yes. We match Pantone, HEX and CMYK references, so a sign lands on the same colour as your app, your kit and your signage elsewhere. Send the brand guide or the exact reference with your enquiry.",
      },
      {
        q: "Do gym signs come with a warranty?",
        a: "Every sign we make carries a 5-year warranty. If you are fitting out multiple sites, say so at quote stage so the pieces are built from one production batch and the colours match across locations.",
      },
    ],
  },
  {
    slug: "bar-signs",
    name: "Bar Signs",
    kicker: "Bar, Pub & Cocktail Lounge Signage",
    h1: "Custom Neon Bar Signs for Commercial Venues",
    metaTitle: "Custom Neon Bar Signs for Venues",
    metaDescription:
      "Custom neon bar signs & back-bar logo lighting for commercial venues. Dimmable, moisture-tolerant builds with free design mockup & 5-year warranty.",
    answer:
      "LED neon suits the back bar of most venues: it gives warm, saturated colour at low voltage in a deliberately dark room. Add a slim lightbox for menus and specials that change without replacing the sign, UV-printed acrylic for full-colour cocktail lists and logos, and 3D metal channel letters for the venue name outside. Every sign is made to order after a free design mockup.",
    intro:
      "Back-bar logos, cocktail-list lighting and venue branding specified for the one environment that is warm, damp, greasy and deliberately dark.",
    heroImage: "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
    heroAlt: "Custom neon sign glowing behind a commercial bar",
    quoteProductName: "custom neon bar sign",
    quoteLabel: "Get a Bar Sign Quote",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "The back-bar workhorse. Warm, saturated colour at low voltage, and dimmable so it can sit under service lighting at 6pm and carry the room at midnight.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour cocktail lists, brand marks and layered feature pieces where the artwork is more than lettering.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Backlit menu and specials panels you can change without changing the sign.",
      },
      {
        name: "3D Metal Channel Letters",
        href: CHANNEL,
        why: "Exterior venue name and street-facing façade signage, built for outdoor mounting.",
      },
    ],
    considerations: [
      {
        title: "Specify the dimmer at quote stage",
        text: "A back-bar sign has two jobs at two times of night, and the fix is a dimmer rather than a compromise on brightness. Retro-fitting one means changing the driver, so it is worth deciding before fabrication.",
      },
      {
        title: "Steam, spirits and grease",
        text: "Glass-washers and kitchen passes put moisture and grease into the air continuously. Sealed silicone neon and enclosed acrylic wipe clean; open channel constructions collect residue in a way no cleaning schedule solves.",
      },
      {
        title: "Mount out of the service path",
        text: "The wall behind a bar is also where bottles get restocked and glassware gets racked. Keep the sign above the top speed-rail and clear of the ice-well splash line, and put the driver somewhere reachable without emptying a shelf.",
      },
      {
        title: "Colour reads differently in a dark room",
        text: "A colour chosen on a bright screen behaves differently against dark timber or a mirrored back-bar. Warm colours hold their character at low ambient light; cool blues and whites go colder than most venues expect.",
      },
    ],
    applications: [
      { name: "Back-Bar Logo Signs", text: "The venue mark behind the spirits shelf — the shot that ends up on every customer photo." },
      { name: "Cocktail & Specials Lists", text: "Layered acrylic or backlit panels for drinks lists that change with the season." },
      { name: "Feature & Photo Walls", text: "Slogan and mural pieces sized for the seating area rather than the service side." },
      { name: "Exterior Venue Signs", text: "Street-facing name signage and channel letters rated for outdoor mounting." },
    ],
    faqs: [
      {
        q: "Can a neon bar sign be dimmed for evening service?",
        a: "Yes, and it is worth specifying up front. A dimmable driver lets one sign work as ambient light early and as the room's focal point later. Adding a dimmer after the fact means swapping the driver, so tell us at quote stage.",
      },
      {
        q: "Will a sign behind the bar survive steam and grease?",
        a: "Our LED neon is sealed silicone and our acrylic pieces are enclosed, so both wipe down with a damp cloth. What we would not specify for a back-bar is an open channel construction — residue settles into the channel and no cleaning schedule really fixes it.",
      },
      {
        q: "Can we put a neon sign outside the venue?",
        a: "Yes, with an outdoor build — that is a different specification from an interior sign, not the same sign mounted outdoors. Tell us it is going on an exterior wall and we will quote the outdoor construction.",
      },
      {
        q: "Can you match a brewery or brand logo exactly?",
        a: "We match Pantone, HEX and CMYK references. If the sign carries a third-party brand — a brewery, a spirits label — make sure you have that brand's permission to reproduce their mark, since we fabricate to the artwork you supply.",
      },
      {
        q: "How do we handle a multi-site rollout?",
        a: "Tell us the full site list at quote stage rather than ordering venue by venue. Signs built in one production batch match each other; signs ordered months apart can drift, and matching a colour to an existing installed sign is harder than building both together.",
      },
    ],
  },
  {
    slug: "open-signs",
    name: "Open Signs",
    kicker: "Storefront Open & Trading Signage",
    h1: "Custom Neon Open Signs for Storefronts",
    metaTitle: "Custom Neon Open Signs for Storefronts",
    metaDescription:
      "Custom LED neon open signs & illuminated trading signage for storefronts. Daylight-readable window builds with free design mockup & 5-year warranty.",
    answer:
      "A custom open sign is usually LED neon in your own typeface and colours, so it reads as your shop rather than a stock unit. In a bright, sun-facing window, an edge-lit slim lightbox stays readable and lets you change the message. UV-printed acrylic panels carry opening hours and service information beside it. Each sign is made to order after a free design mockup.",
    intro:
      "The one sign whose entire job is answering a question from across the street — and the reason a stock open sign in a bright window so often fails to.",
    heroImage: "/ultra-thin-slim-lightbox/Storefront windows.webp",
    heroAlt: "Illuminated storefront window signage seen from the street",
    quoteProductName: "custom neon open sign",
    quoteLabel: "Get an Open Sign Quote",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "The classic open sign, in your own typeface and colours rather than the same stock unit as every other shop on the street.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Edge-lit panels that stay readable in a south-facing window, and let you change the message without changing the sign.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Trading hours, delivery partners and service messaging alongside the open sign itself.",
      },
    ],
    considerations: [
      {
        title: "Daylight is the hard case, not night",
        text: "Almost any illuminated sign reads at night. The one that earns its place is legible at 2pm in a window with sun on it, and that is a question of contrast and stroke width far more than of raw brightness.",
      },
      {
        title: "Mount for the viewing angle you actually have",
        text: "Most footfall approaches along the pavement rather than head-on. A sign hung flat to the glass is edge-on to the people you want to reach; angling it toward the approach, or hanging it perpendicular, is usually worth more than making it bigger.",
      },
      {
        title: "Reflections and backlighting",
        text: "A window is a mirror from outside during the day. Signs sitting deep in an unlit window compete with the reflection of the street; bringing the sign forward toward the glass, or lighting the space behind it, resolves most of that.",
      },
      {
        title: "Switching and trading hours",
        text: "An open sign that is on when you are shut costs you more than no sign at all. Decide at quote stage whether it runs off a switched socket a staff member reaches on the way out, or a timer set to trading hours.",
      },
    ],
    applications: [
      { name: "Window Open Signs", text: "The core trading signal, in your own brand colours and typeface." },
      { name: "Trading Hours Panels", text: "Hours and service messaging that customers read before they try the door." },
      { name: "Drive-Through & Forecourt", text: "Larger-format open and service signage for approaches read from a vehicle." },
      { name: "Secondary Entrance Signs", text: "Side and rear entrance signalling for venues where the main door is not the only one." },
    ],
    faqs: [
      {
        q: "Will an LED open sign be readable in daylight?",
        a: "In a bright window it comes down to contrast and stroke width more than brightness. A heavier stroke in a saturated colour outperforms a thin script at the same power. Send us a photo of the window with sun on it and we will size and weight the design against that, not against a night shot.",
      },
      {
        q: "Should the sign face the street or along the pavement?",
        a: "Most of your footfall walks along the pavement rather than approaching head-on, so a sign flat to the glass is edge-on to them. Angling it toward the approach or hanging it perpendicular to the window usually buys more visibility than increasing the size.",
      },
      {
        q: "How is an open sign mounted in a window?",
        a: "Either suspended on clear cable from the head of the window, or on standoffs from the frame or a side wall. Suspension keeps the glass clear for display; standoffs are steadier where the door slams. Tell us the window construction and we will spec it on the mockup.",
      },
      {
        q: "Can the sign switch on and off automatically?",
        a: "Yes, on a timer set to your trading hours. It is worth deciding this before fabrication because it affects how the driver and supply are specified. A sign glowing when you are closed sends the wrong message to the exact person you want back tomorrow.",
      },
      {
        q: "Can we have something other than the word OPEN?",
        a: "That is the point of a custom build: your own wording, typeface and brand colours, rather than the same stock unit as the rest of the street. We match Pantone, HEX and CMYK, and every sign carries a 5-year warranty.",
      },
    ],
  },
  {
    slug: "restaurant-signs",
    name: "Restaurant Signs",
    kicker: "Restaurant & Café Signage",
    h1: "Custom Restaurant Signs & Café Signage",
    metaTitle: "Custom Restaurant Signs | Restaurant Neon Sign Ideas",
    metaDescription:
      "Custom restaurant neon signs, illuminated café branding & backlit menu displays for dining venues. Get mexican or chinese restaurant neon sign ideas today.",
    answer:
      "A restaurant usually needs two kinds of sign. Outside, 3D metal channel letters carry the name on the façade, front-lit, halo-lit or dual-lit and built for outdoor mounting. Inside, slim lightboxes suit menu boards that change with the season, a restaurant neon sign makes a feature wall guests photograph, and UV-printed acrylic carries full-colour menus and logos.",
    intro:
      "Storefront identity, interior branding and menu display for venues where the same wall has to look right in daylight service and at candlelit covers. Whether you need a mexican restaurant neon sign, a chinese restaurant neon sign, or general restaurant neon sign ideas, we custom build them all.",
    heroImage: "/3d-metallic-neon-sign/Resturants/generated/026ad950-fafb-4407-8420-c83be7f49365.webp",
    heroAlt: "Illuminated 3D metal restaurant sign on an interior wall",
    quoteProductName: "custom restaurant sign",
    quoteLabel: "Get a Restaurant Sign Quote",
    materials: [
      {
        name: "3D Metal Channel Letters",
        href: CHANNEL,
        why: "The restaurant name on the façade. Fabricated metal in frontlit, halo or dual-lit, and built for outdoor mounting.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Backlit menu boards and specials panels where the graphic changes with the season and the sign does not.",
      },
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Interior warmth — the slogan wall, the pass, the piece guests photograph and tag the venue in.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour menu panels, allergen boards and layered brand marks for the entrance and waiting area.",
      },
    ],
    considerations: [
      {
        title: "The kitchen pass is a different environment",
        text: "Anything within reach of a pass or a griddle line lives in airborne grease. Sealed constructions clean down; open channels do not. Tell us how close to the line a sign sits and we will specify accordingly.",
      },
      {
        title: "One room, two lighting states",
        text: "A dining room at midday lunch and at 9pm service are different rooms. A dimmable driver lets one sign work in both — and it has to be specified before fabrication, because retro-fitting means changing the driver.",
      },
      {
        title: "Menus change; signs should not have to",
        text: "If prices or dishes move seasonally, put them behind a changeable graphic rather than into the fabrication. A backlit panel takes a new print in a minute; a fabricated sign takes a new sign.",
      },
      {
        title: "Exterior signage has a landlord and a council",
        text: "A façade sign is usually the one piece that involves someone else's approval. We supply the sign and the specification to submit; consents, permits and any electrical connection at the building are arranged locally, because we are a national supplier and do not install.",
      },
    ],
    applications: [
      { name: "Façade & Storefront Signs", text: "Fabricated channel letters and illuminated venue names for street frontage." },
      { name: "Backlit Menu Boards", text: "Edge-lit panels for menus and specials that change without replacing the sign." },
      { name: "Interior Feature Walls", text: "Slogan and brand pieces sized for the dining room and the photo it generates." },
      { name: "Entrance & Waiting Areas", text: "Layered acrylic marks, hours panels and wayfinding for the front of house." },
    ],
    faqs: [
      {
        q: "Can a sign be mounted near the kitchen pass?",
        a: "Yes, with a sealed construction. Airborne grease is continuous near a line, and the difference between a sign that still looks right in a year and one that does not is whether residue can settle inside it. Sealed silicone neon and enclosed acrylic wipe down; open channel builds do not.",
      },
      {
        q: "Can one sign work for both lunch and evening service?",
        a: "With a dimmable driver, yes — that is the usual answer for a dining-room sign that has to hold a bright room at midday and set the tone at 9pm. Specify it at quote stage, because changing it later means changing the driver.",
      },
      {
        q: "How do we handle menu prices that change?",
        a: "Keep them out of the fabrication. A backlit lightbox panel takes a fresh print in under a minute, so a seasonal menu or a price change costs a graphic rather than a sign. Fabricate the things that do not change — the name, the mark — and print the things that do.",
      },
      {
        q: "Do you install exterior restaurant signs?",
        a: "No. We are a national supplier and manufacture to your specification, but consents, permits and electrical connection at the building are arranged locally with your own contractor. We provide the sign and the specification they will need.",
      },
      {
        q: "Can you match our existing brand and signage?",
        a: "We match Pantone, HEX and CMYK references. If you are matching signage that is already installed rather than a brand guide, send photos and any original artwork — matching to a printed reference is far more reliable than matching to a photograph of a lit sign.",
      },
    ],
  },
  {
    slug: "office-signs",
    name: "Office Signs",
    kicker: "Office, Lobby & Reception Signage",
    h1: "Custom Office Signs & Reception Logo Signage",
    metaTitle: "Custom Office Signs & Lobby Signage",
    metaDescription:
      "Custom office signs, reception logo signage & illuminated lobby branding in metal and acrylic. Halo-lit builds with free design mockup & 5-year warranty.",
    answer:
      "For a reception wall, the usual choice is 3D metal channel letters, often halo-lit so the wall glows behind solid-looking lettering. If the logo is full-colour or cannot be reduced to letters, UV-printed acrylic on standoffs carries the artwork in print. Slim lightboxes suit directories and wayfinding that change with tenants, and LED neon suits breakout spaces. Each sign is made to order after a free mockup.",
    intro:
      "Reception walls, lobby logos and meeting-room identity, in the finishes that read as considered rather than loud.",
    heroImage: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp",
    heroAlt: "Halo-lit 3D metal logo sign on a corporate reception wall",
    quoteProductName: "custom office reception sign",
    quoteLabel: "Get an Office Sign Quote",
    materials: [
      {
        name: "3D Metal Channel Letters",
        href: CHANNEL,
        why: "The reception standard. Fabricated metal letters, halo-lit so the wall glows and the lettering reads as solid.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour logos on layered acrylic with standoffs — the right answer when the mark is not reducible to letterforms.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Directories, wayfinding and partner walls where the content changes as the tenancy does.",
      },
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Breakout spaces, studio walls and the parts of an office that are allowed to have a personality.",
      },
    ],
    considerations: [
      {
        title: "Halo lighting needs the wall behind it",
        text: "A halo-lit sign works by throwing light onto the surface behind, so the wall is part of the sign. Flat, light, matte finishes glow evenly; dark, glossy or heavily textured surfaces eat the effect. Send a photo of the actual wall before the finish is chosen.",
      },
      {
        title: "Hide the supply before the wall is closed",
        text: "The difference between a clean reception sign and a compromised one is usually a cable. If the fit-out is still open, get the power drop placed behind the sign position now — chasing it in afterwards is disruptive and rarely invisible.",
      },
      {
        title: "Size against the whole wall, not the logo",
        text: "Reception signs are most often specified too small, because they are sized against the artwork rather than the space. Work from the viewing distance across the lobby and the width of the wall it sits on.",
      },
      {
        title: "Silent operation",
        text: "A reception is quiet, and anything with an audible driver becomes the thing people notice. We specify the driver for silent running and locate it away from the seating area rather than immediately behind the sign.",
      },
    ],
    applications: [
      { name: "Reception Logo Walls", text: "The primary brand mark behind the desk, in halo-lit metal or layered acrylic." },
      { name: "Lobby & Directory Signs", text: "Tenant directories and wayfinding for shared and multi-floor buildings." },
      { name: "Meeting Room Identity", text: "Room naming and floor marking that matches the reception finish." },
      { name: "Breakout & Studio Walls", text: "Interior pieces for the informal spaces, where a neon build fits the room." },
    ],
    faqs: [
      {
        q: "What finish works best for a reception logo sign?",
        a: "Brushed stainless and painted metal are the usual reception answers, halo-lit so the wall carries a soft glow behind solid lettering. Where the logo is full-colour or not reducible to letterforms, layered UV-print acrylic on standoffs does the same job without flattening the mark.",
      },
      {
        q: "Can you hide the wiring on a reception sign?",
        a: "Yes, if the power drop lands behind the sign position. The best time to arrange that is while the fit-out is still open — chasing a supply into a finished reception wall afterwards is disruptive and seldom ends up truly invisible. Send us the wall detail early and we will mark the drop position on the mockup.",
      },
      {
        q: "How big should a reception sign be?",
        a: "Size it against the wall and the viewing distance across the lobby, not against the logo file. The most common mistake we see is a sign specified from artwork proportions that then looks lost on a nine-metre reception wall. Send the wall dimensions and a photo and we will scale it on the mockup.",
      },
      {
        q: "Will a halo-lit sign work on a dark or textured wall?",
        a: "Less well, and it is worth knowing before the finish is signed off. Halo lighting works by reflecting off the surface behind, so flat matte light-coloured walls glow evenly while dark, glossy or heavily textured ones absorb or scatter it. On those, frontlit lettering or a standoff-mounted acrylic mark is the better specification.",
      },
      {
        q: "Can you match our corporate brand colours?",
        a: "Yes — Pantone, HEX and CMYK. For a multi-floor or multi-site rollout, order the pieces together rather than floor by floor: signs from one production batch match each other, and matching later to an already-installed sign is considerably harder.",
      },
    ],
  },
  {
    slug: "salon-spa-signs",
    name: "Salon & Spa Signs",
    kicker: "Salon, Spa & Studio Signage",
    h1: "Custom Salon Neon Signs & Spa Logo Signage",
    metaTitle: "Custom Salon Neon Sign | Spa & Beauty Studio Branding",
    metaDescription:
      "Looking for a custom hair salon neon sign? We build camera-ready salon neon signs, spa logo signage, and beauty studio branding in your brand colours.",
    answer:
      "A salon neon sign suits most studios and spas: warm, saturated colour that sits well behind a mirror wall and shows up clearly in clients' photos. For a full-colour logo at reception or a price board, UV-printed layered acrylic carries the artwork, and 3D metal channel letters carry the studio name on the street frontage. Every sign is made to order after a free design mockup.",
    intro:
      "From a classic hair salon neon sign to reception marks and treatment-room branding, we build signage for spaces where the sign ends up in every client's photo whether you planned for it or not.",
    heroImage: "/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.webp",
    heroAlt: "Illuminated salon logo sign on a treatment-room wall",
    quoteProductName: "custom salon neon sign",
    quoteLabel: "Get a Salon Sign Quote",
    materials: [
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "The salon standard — warm, saturated colour that sits behind a mirror wall and photographs the way clients expect.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Layered acrylic reception marks and price boards where the logo is full-colour rather than lettering.",
      },
      {
        name: "3D Metal Channel Letters",
        href: CHANNEL,
        why: "Exterior studio name and street frontage, built for outdoor mounting.",
      },
    ],
    considerations: [
      {
        title: "The sign is in the photograph",
        text: "A salon sign is behind the client in every mirror selfie that leaves the building, which makes it marketing rather than decor. Position it where it lands in the frame over the chair, not where it happens to fit on the wall.",
      },
      {
        title: "Warm light flatters; cool light does not",
        text: "Colour temperature changes how skin reads on camera. Warm tones are forgiving in a mirror shot; cold whites and blues are not, and no amount of filtering afterwards fully undoes it. Choose the colour against a photo of the actual chair position.",
      },
      {
        title: "Product mist and treatment chemicals",
        text: "Hairspray, acetone and lash adhesive are all in the air in a working salon. Sealed silicone and enclosed acrylic wipe clean; anything with an open channel accumulates a film that shows under the mirror lights.",
      },
      {
        title: "Mirror walls double everything",
        text: "A sign facing a mirror is really two signs, one of them reversed. That can be the effect you want or the one that ruins the shot — worth checking the reflected position on the mockup before the wall is chosen.",
      },
    ],
    applications: [
      { name: "Reception & Waiting Areas", text: "The studio mark clients see on arrival and photograph while they wait." },
      { name: "Mirror & Styling Walls", text: "The piece that sits behind the chair and lands in every client photo." },
      { name: "Treatment Room Branding", text: "Softer interior signage for lash, nail and facial rooms." },
      { name: "Exterior Studio Signs", text: "Street-facing name signage rated for outdoor mounting." },
    ],
    faqs: [
      {
        q: "Where should a salon neon sign go for client photos?",
        a: "Behind the chair, in the frame of the mirror your clients actually shoot into — not simply on the largest free wall. If you send a photo taken from the chair position, we will show the sign in that frame on the mockup so you can see what the client's camera will see.",
      },
      {
        q: "What colour is most flattering under salon lighting?",
        a: "Warmer tones. Colour temperature changes how skin reads on camera, and warm colours are forgiving in a mirror shot in a way cold whites and blues are not. Choose against a photograph of the actual chair position rather than against a swatch on a screen.",
      },
      {
        q: "Will hairspray and treatment products damage the sign?",
        a: "Not a sealed one. Our silicone LED neon and enclosed acrylic pieces wipe down with a damp cloth. What we would avoid in a working salon is an open channel construction — product mist settles into the channel and the film shows up under mirror lighting.",
      },
      {
        q: "Can we have the sign outside as well as inside?",
        a: "Yes, but it is a different build. An exterior studio sign needs an outdoor construction rather than the interior sign mounted outdoors. Quote both together if you want them to match, since they will then be fabricated in the same batch.",
      },
      {
        q: "Can you match our salon's brand colours exactly?",
        a: "Yes, from Pantone, HEX or CMYK references. Send the brand guide with your enquiry so the sign matches your booking site and printed materials rather than approximating them. Every sign carries a 5-year warranty.",
      },
    ],
  },
  {
    slug: "retail-storefronts",
    name: "Retail Storefront Signs",
    kicker: "Retail & Storefront Signage",
    h1: "Custom Retail Storefront Signs",
    metaTitle: "Custom Retail Storefront Signs",
    metaDescription:
      "Custom retail storefront signs, illuminated facade lettering & window signs for shops. Outdoor builds with free design mockup & 5-year warranty.",
    answer:
      "For a shopfront, 3D metal channel letters are the standard façade sign: front-lit, halo-lit or dual-lit, and built for exterior mounting. Slim lightboxes suit window and fascia panels whose promotions change, LED neon window pieces draw attention from the pavement after dark, and UV-printed acrylic carries full-colour logos and opening hours. Every sign is made to order after a free design mockup.",
    intro:
      "Façade lettering and window signage specified for the two problems every retail unit shares: reading in daylight, and looking deliberate after dark.",
    heroImage: "/3d-metallic-neon-sign/frontlit/image.webp",
    heroAlt: "Frontlit channel letter signage on a retail storefront",
    quoteProductName: "custom retail storefront sign",
    quoteLabel: "Get a Storefront Sign Quote",
    materials: [
      {
        name: "3D Metal Channel Letters",
        href: CHANNEL,
        why: "The façade standard. Frontlit, halo or dual-lit fabricated metal, built for exterior mounting.",
      },
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "Window and fascia panels for promotional messaging that changes more often than the shopfront does.",
      },
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Window pieces and interior branding that pull attention from the pavement after dark.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour brand marks, hours panels and entrance signage.",
      },
    ],
    considerations: [
      {
        title: "Daytime legibility is the harder problem",
        text: "A lit sign always reads at night. What separates a good shopfront from an expensive one is whether the lettering still holds against a bright sky at midday, which is a question of contrast against the fascia and stroke weight rather than of brightness.",
      },
      {
        title: "The lease usually has an opinion",
        text: "Fascia dimensions, projection, illumination and sometimes colour are commonly fixed by the lease or the landlord's shopfront policy, and in many locations by the local authority as well. Check those constraints before the design, not after the quote.",
      },
      {
        title: "Halo needs a fascia that reflects",
        text: "Halo-lit lettering throws light back onto the fascia behind it, so a dark or heavily textured shopfront kills the effect. On those, frontlit or dual-lit is the specification that actually works.",
      },
      {
        title: "Supply and installation are local",
        text: "We manufacture and ship nationally; we do not install. Exterior signage needs a local contractor for mounting and electrical connection, and any permit or landlord consent is arranged by you. We supply the specification they will need.",
      },
    ],
    applications: [
      { name: "Fascia & Façade Lettering", text: "The shop name in fabricated channel letters, sized to the fascia and the street." },
      { name: "Window Displays", text: "Illuminated window pieces that carry the unit after the interior lights go down." },
      { name: "Promotional Panels", text: "Backlit fascia and window panels for messaging that changes with the season." },
      { name: "Entrance & Hours Signage", text: "Trading hours, service and wayfinding panels at the door." },
    ],
    faqs: [
      {
        q: "Will a storefront sign be readable in daylight?",
        a: "That depends on contrast against the fascia and the weight of the lettering far more than on how bright the sign is. A heavy stroke in a colour that contrasts with the shopfront reads at midday; a thin script in a tonally similar colour does not, whatever its output. Send a daytime photo of the frontage and we will design against it.",
      },
      {
        q: "Do we need permission for a shopfront sign?",
        a: "Usually from two directions: the landlord or lease, which often fixes fascia size, projection and illumination, and the local authority, which may require consent for an illuminated exterior sign. Both are arranged by you locally — we supply the sign and the specification to submit with an application.",
      },
      {
        q: "Frontlit, halo-lit or dual-lit for a shopfront?",
        a: "Frontlit is the most legible from distance and the safest default for a retail fascia. Halo reads as more considered but needs a light, flat fascia behind it to work at all. Dual-lit does both and costs more. Our guide to front-lit, halo-lit and dual-lit channel letters covers the trade-offs in detail.",
      },
      {
        q: "Are exterior signs weatherproof?",
        a: "Exterior builds are a different construction from an interior sign rather than the same sign mounted outside. Tell us at quote stage that it is going on an external fascia so it is specified and fabricated correctly.",
      },
      {
        q: "Do you install storefront signage?",
        a: "No. We are a national supplier and manufacture to specification, but mounting and electrical connection need a local contractor. We provide the fixing detail and electrical specification your installer will work to, and every sign carries a 5-year warranty.",
      },
    ],
  },
  {
    slug: "trade-show-signs",
    name: "Trade Show Signs",
    kicker: "Exhibition & Trade Show Signage",
    h1: "Trade Show Booth Signs & Portable Displays",
    metaTitle: "Trade Show Booth Signs & Displays",
    metaDescription:
      "Custom trade show booth signs, portable illuminated displays & exhibition branding. Lightweight, road-ready builds with free mockup & 5-year warranty.",
    answer:
      "For a trade show booth, a slim LED lightbox is the workhorse: slim, light, and the printed graphic can change between shows without rebuilding the sign. LED neon adds a feature piece that draws people down the aisle, with flexible silicone and no glass to break in transit, and UV-printed acrylic carries full-colour logos and product panels. Each sign is made to order after a free mockup.",
    intro:
      "Booth branding specified around the constraint that defines exhibition signage: it has to go up in an hour, come down in twenty minutes, and survive the trip to the next show.",
    heroImage: "/ultra-thin-slim-lightbox/main-hero.webp",
    heroAlt: "Ultra-thin illuminated display panel on an exhibition stand",
    quoteProductName: "custom trade show booth sign",
    quoteLabel: "Get an Exhibition Sign Quote",
    materials: [
      {
        name: "Ultra-Thin Lightbox Signs",
        href: LIGHTBOX,
        why: "The exhibition workhorse. Slim, light, and the graphic changes between shows without rebuilding the sign.",
      },
      {
        name: "LED Neon Signs",
        href: NEON,
        why: "Flexible silicone at 12V — no glass to break in transit, and the piece that pulls attention down an aisle.",
      },
      {
        name: "UV-Print Acrylic Signs",
        href: ACRYLIC,
        why: "Full-colour brand marks and product panels for the stand walls.",
      },
    ],
    considerations: [
      {
        title: "Design for the case, not the wall",
        text: "The real constraint on booth signage is what fits in transit and what one person can assemble on site. A sign that splits into flat sections travels and survives; a single large rigid piece is the one that arrives damaged.",
      },
      {
        title: "The graphic should outlive the show",
        text: "If the messaging changes per event, put it behind a changeable panel rather than into the fabrication. A backlit lightbox takes a new print between shows; a fabricated sign has to be rebuilt.",
      },
      {
        title: "Confirm the venue's power and rigging rules",
        text: "Exhibition halls set their own rules on electrical supply, appliance testing and what may be suspended. Get the organiser's technical manual before the design is fixed, because it may constrain mounting and power more than your stand does.",
      },
      {
        title: "Read from the aisle",
        text: "A stand sign competes with the whole hall, and most people see it at an angle while walking. Height and contrast do more than size, and anything below shoulder height is behind a visitor by the time it is read.",
      },
    ],
    applications: [
      { name: "Booth Header Signs", text: "The stand name at height, sized to be read down the aisle rather than at the counter." },
      { name: "Backlit Graphic Panels", text: "Illuminated wall panels with prints that change between shows." },
      { name: "Product & Feature Displays", text: "Lit panels and marks for the demo area and product wall." },
      { name: "Portable Reception Signage", text: "Counter and welcome-desk branding that packs down with the stand." },
    ],
    faqs: [
      {
        q: "Will a trade show sign survive repeated transport?",
        a: "If it is designed to. The signage that lasts across a season splits into flat sections that pack into a case; the pieces that arrive damaged are single large rigid panels. Tell us the show schedule and how the stand travels and we will specify for that rather than for a permanent wall.",
      },
      {
        q: "Can the graphics change between shows?",
        a: "Keep anything that changes behind a changeable panel. A backlit lightbox takes a fresh print in under a minute, so a new event message costs a graphic. Fabricate the constant — the brand mark — and print the variable.",
      },
      {
        q: "How long does a booth sign take to assemble on site?",
        a: "That is a design decision, so it is worth stating your target at quote stage. If one person has to put it up during a build-up slot, we will specify for tool-free assembly and section weight accordingly rather than optimising purely for the finished look.",
      },
      {
        q: "What about venue power and rigging rules?",
        a: "Every hall has its own requirements for electrical supply, appliance testing and suspended items, and they can constrain the design more than your stand does. Get the organiser's technical manual before the design is fixed and send us anything relevant — we will build to it.",
      },
      {
        q: "How high should a booth sign be mounted?",
        a: "High enough to clear the crowd and be read from down the aisle. Most visitors see stand signage at an angle while walking, so height and contrast matter more than raw size, and anything below shoulder height is behind them before it registers.",
      },
    ],
  },
];

/** Attaches the hub every one of these pages sits under. */
export const INDUSTRY_PAGES: readonly LandingPage[] = INDUSTRY_CONTENT.map((page) => ({
  ...page,
  parent: { href: "/business-signs", label: "Business Signs" },
  footerLink: { href: "/guides", label: "Read the Buying Guides" },
}));
