import type { Guide } from "@/lib/guides/types";

/**
 * What size sign do I need? Letter height, viewing distance and wall size.
 *
 * The 2026-09-24 SERP study (research/serp-decision.md, Q11) found sizing
 * results written almost entirely for weddings, with nothing for storefronts,
 * receptions or bars, and an AI Overview repeating a "1 inch per 10 feet"
 * rule that could not be traced to primary research. This guide works from
 * the US Sign Council's published legibility rules instead, and gives indoor
 * buyers a method rather than invented size rules.
 *
 * Every technical statement cites a source from
 * SEO-Optimization/growth-system/research/technical-fact-base.md (§4 for
 * legibility and halo-lit depth, §10 for the ADA). Figures marked "our
 * arithmetic" are derived from those sourced rules and say so on the page.
 * The Glownique's own details restate lib/product-catalog.ts: made to order,
 * LED neon from about 30 cm to several metres, channel letters from 0.8 in
 * deep, free mockup, WhatsApp quote, tracked delivery, no installation.
 */
export const guide: Guide = {
  slug: "sign-size-viewing-distance",
  metaTitle: "What Size Sign Do I Need? Letter Size Chart",
  metaDescription:
    "How tall should sign letters be? A letter height chart by viewing distance, the storefront fascia rule, and a tape-on-the-wall method for indoor signs.",
  h1: "What Size Sign Do I Need? Letter Height by Viewing Distance",
  kicker: "Sign sizing guide",
  answer:
    "What size sign you need depends on the viewing distance. For a sign facing the viewer, the US Sign Council's average is 1 inch of capital-letter height per 30 feet: 10-inch letters read at about 300 feet. All-capitals text needs letters about 15% taller; a fascia sign parallel to the road, about three times the height. Indoors, tape the outline on the wall first.",
  publishedOn: "2026-09-24",
  updatedOn: "2026-09-24",
  primaryKeyword: "what size sign do I need",
  secondaryKeywords: [
    "sign letter height chart",
    "how big should a neon sign be",
    "business sign size",
    "letter height for viewing distance",
    "how big should letters be on a storefront sign",
  ],
  image: {
    src: "/hero/neon-sign-hero.webp",
    alt: "A woman holds a white script LED neon sign reading Olivia, with small heart details and a pink neon heart, on clear acrylic cut to the outline of the word, against a plain grey wall.",
    width: 1448,
    height: 1086,
  },
  showHeroImage: true,
  sections: [
    {
      id: "letter-height-distance",
      heading: "How far away can sign letters be read?",
      blocks: [
        {
          type: "p",
          text: "The United States Sign Council (USSC) measures legibility with a **Legibility Index** (LI): the number of feet of viewing distance per inch of capital-letter height.[^ussc-rules][^ussc-standards] Its average LI is **30**, so 1-inch capitals read at about 30 feet and 10-inch capitals at about 300 feet.[^ussc-rules][^ussc-standards] The measure is the height of the capitals, not the overall size of the sign.",
        },
        {
          type: "p",
          text: "Thirty is an average, not a constant: the Council's figure for black Clarendon lettering on white is 31.[^ussc-rules][^ussc-standards] Use the chart as the starting point for any sign that faces the people reading it.",
        },
        {
          type: "table",
          caption:
            "Sign letter height chart: capital-letter height and the distance it reads at, using the USSC average Legibility Index of 30",
          columns: ["Capital-letter height", "Readable to about (sign facing the viewer)"],
          rows: [
            ["1 in (2.5 cm)", "30 ft (9 m)"],
            ["2 in (5 cm)", "60 ft (18 m)"],
            ["3 in (7.6 cm)", "90 ft (27 m)"],
            ["4 in (10 cm)", "120 ft (37 m)"],
            ["6 in (15 cm)", "180 ft (55 m)"],
            ["8 in (20 cm)", "240 ft (73 m)"],
            ["10 in (25 cm)", "300 ft (91 m)"],
            ["12 in (30 cm)", "360 ft (110 m)"],
            ["18 in (46 cm)", "540 ft (165 m)"],
            ["24 in (61 cm)", "720 ft (219 m)"],
            ["36 in (91 cm)", "1,080 ft (329 m)"],
          ],
          note: "Our arithmetic: capital-letter height in inches × 30 = distance in feet, so 6 in × 30 = 180 ft. The 30 is the USSC average Legibility Index; metric figures are rounded.[^ussc-rules][^ussc-standards]",
        },
      ],
    },
    {
      id: "viewing-distance",
      heading: "What viewing distance should you size for?",
      blocks: [
        {
          type: "p",
          text: "For a sign aimed at passing traffic, USSC starts from the driver: the **viewer reaction distance**, how far a driver travels in the time allowed to react, sets the letter height.[^ussc-rules][^ussc-standards]",
        },
        {
          type: "list",
          items: [
            "**Viewer reaction distance (ft)** = speed (mph) × reaction time (seconds) × 1.47",
            "**Capital-letter height (in)** = viewer reaction distance ÷ Legibility Index",
          ],
        },
        {
          type: "p",
          text: "The 1.47 converts mph into feet per second. For the reaction time, the Council's rules of thumb are about **8 seconds** on simple roads under 35 mph, about **10 seconds** on complex roads, and **11 to 12 seconds** on high-speed multi-lane roads.[^ussc-rules][^ussc-standards]",
        },
        {
          type: "callout",
          title: "Worked example at 35 mph",
          text: "On a complex road at 35 mph, allow 10 seconds: 35 × 10 × 1.47 ≈ 515 feet, and 515 ÷ 30 ≈ 17-inch capitals (our arithmetic). The Council's own figure for a sign facing traffic and read from 500 feet is about 17 inches.[^ussc-rules][^ussc-standards]",
        },
        {
          type: "table",
          caption:
            "Worked examples of viewer reaction distance and the capital-letter height it calls for at a Legibility Index of 30",
          columns: ["Traffic", "Reaction time", "Reaction distance", "Capital-letter height"],
          rows: [
            ["30 mph, simple road", "8 s", "about 350 ft (108 m)", "about 12 in (30 cm)"],
            ["35 mph, complex road", "10 s", "about 515 ft (157 m)", "about 17 in (44 cm)"],
            [
              "55 mph, high-speed multi-lane road",
              "11–12 s",
              "about 890–970 ft (271–296 m)",
              "about 30–32 in (75–82 cm)",
            ],
          ],
          note: "Our arithmetic from the USSC formulas, rounded. The speeds are examples: pick the reaction time that fits your road.[^ussc-rules][^ussc-standards]",
        },
        {
          type: "p",
          text: "For a sign read on foot or across a parking lot, measure the real distance instead.",
        },
      ],
    },
    {
      id: "bigger-letters",
      heading: "When do letters need to be bigger?",
      blocks: [
        {
          type: "p",
          text: "Two adjustments push the letter height up.",
        },
        {
          type: "defs",
          items: [
            {
              term: "All-capitals wording",
              detail:
                "Text set entirely in capitals needs letters about 15% taller to read at the same distance.[^ussc-rules][^ussc-standards] Lettering with 12-inch capitals in mixed case becomes about 14 inches in all caps (our arithmetic).",
            },
            {
              term: "Congestion",
              detail:
                "In congested conditions USSC lowers the index: × 0.83 for moderate congestion, taking 30 to about 25, and × 0.67 for high congestion, to about 20.[^ussc-rules][^ussc-standards] A lower index means taller letters: about 20% taller at 25 and 50% taller at 20 (our arithmetic).",
            },
          ],
        },
        {
          type: "p",
          text: "In the 35 mph example, that turns 17-inch capitals into about 21 inches in moderate congestion and about 26 inches in high congestion (our arithmetic: 515 ÷ 25 and 515 ÷ 20).",
        },
      ],
    },
    {
      id: "storefront-signs",
      heading: "How big should letters be on a storefront sign?",
      blocks: [
        {
          type: "p",
          text: "A fascia sign on the front of a building usually runs **parallel to the road**, so passing drivers see it side-on. USSC sizes these signs with a Legibility Index of about **10**, which means letters about three times the height of a sign that faces traffic.[^ussc-rules][^ussc-standards]",
        },
        {
          type: "p",
          text: "Its equation works from the road in front of the sign: **letter height (in) = (number of traffic lanes × 10 + setback from the road edge in feet) ÷ 5**.[^ussc-rules][^ussc-standards] The Council's example, two lanes and a 20-foot setback, gives 8-inch letters. A four-lane road with the sign 30 feet back gives (4 × 10 + 30) ÷ 5 = 14 inches (our arithmetic).",
        },
        {
          type: "p",
          text: "Reading distance is where parallel signs struggle. Read from 500 feet, a parallel sign needs capitals of about 50 inches, against about 17 inches for a sign facing traffic.[^ussc-rules][^ussc-standards] In the Council's field study, drivers missed 30% of parallel signs, even though those signs were two to three times larger.[^ussc-rules][^ussc-standards]",
        },
        {
          type: "p",
          text: "If drivers must read the fascia from their reaction distance, size it at the index of 10, about 51 inches at 35 mph on a complex road (our arithmetic), or add a sign that faces oncoming traffic. For people across the street, who see the fascia face-on, the index of 30 is the better guide.",
        },
        {
          type: "p",
          text: "Lighting matters too on [storefront signs](/business-signs/retail-storefronts): steep viewing angles, like dark or rough walls, reduce the legibility of halo-lit letters, and a face-and-halo combination is suggested in those cases.[^gp-halo][^gemini-halo] Compare [front-lit, halo-lit and dual-lit letters](/guides/front-lit-vs-halo-lit-vs-dual-lit).",
        },
      ],
    },
    {
      id: "negative-space",
      heading: "How much empty space should a sign have?",
      blocks: [
        {
          type: "p",
          text: "The Council's legibility guidance covers the space around the words as well as their height: keep **negative space at 60% or more** of a panel sign's area.[^ussc-rules][^ussc-standards] That leaves no more than about 40% for the words and graphics (our arithmetic). On a 4 × 2 ft panel, 8 square feet in all, that is about 3.2 square feet of copy.",
        },
        {
          type: "p",
          text: "If the letter height you need will not fit inside that 40%, cut words or enlarge the panel rather than squeeze the lettering. The rule is for panel signs, such as [lightbox signs](/business-signs/lightbox-signs) and printed acrylic panels.",
        },
      ],
    },
    {
      id: "indoor-signs",
      heading: "What size sign do I need indoors?",
      blocks: [
        {
          type: "p",
          text: "Indoor distances are short, so the arithmetic gives small numbers: at the USSC average of 30, half-inch capitals read from 15 feet and 1½-inch capitals from 45 feet (our arithmetic).[^ussc-rules][^ussc-standards] Treat that as a floor. For a neon name over a bed or a logo on a reception wall, the wall and the viewpoints decide the rest:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Decide where people will stand**: the two or three spots the sign must work from, such as the entrance, the queue, a table, the bed or the camera.",
            "**Work out the smallest letters.** Divide the longest distance in feet by 30 for the capital-letter height in inches; add about 15% for all capitals.[^ussc-rules][^ussc-standards]",
            "**Measure the wall**, and everything that interrupts it: doors, switches, shelves, a headboard, a back bar, the furniture below.",
            "**Mark the outline with tape** at the size and height you have in mind, then look at it from each spot on your list.",
            "**Check it in the free mockup**, which shows the design to scale before you order.",
          ],
        },
        {
          type: "defs",
          items: [
            {
              term: "Reception walls",
              detail:
                "Seen first from the entrance, then from the desk and the waiting seats, so measure from the door. See [office and reception signs](/business-signs/office-signs).",
            },
            {
              term: "Bar and café walls",
              detail:
                "Seen from the door, the queue and the far tables, and sometimes through the window; a sign read from outside needs the outdoor distances above. See [restaurant and café signs](/business-signs/restaurant-signs).",
            },
            {
              term: "Bedrooms",
              detail:
                "Seen from the bed and the doorway, a few feet away, so the bed, the headboard and the furniture below set the size. See [bedroom and home signs](/custom-signage/home-decor-signs).",
            },
            {
              term: "Wedding backdrops",
              detail:
                "Guests see it from their tables and the photographer frames it behind the couple, so mark it out with two people standing in front. See [wedding neon signs](/custom-signage/wedding-signs).",
            },
          ],
        },
      ],
    },
    {
      id: "mounting-height",
      heading: "How high should a sign hang where people walk?",
      blocks: [
        {
          type: "p",
          text: "In the US, where the ADA Standards apply, a wall-mounted object on a circulation path whose leading edge is more than 27 inches and not more than 80 inches above the floor may project no more than **4 inches (100 mm)** from the wall.[^ada-307][^ada-scoping] At 27 inches or lower, or above 80 inches, it can project any amount, as long as the route keeps its required clear width.[^ada-guide][^ada-307] The rule covers every circulation path, not only accessible routes.[^ada-scoping][^ada-guide] A sign hung overhead on a circulation path needs at least 80 inches of headroom beneath it.[^ada-307]",
        },
        {
          type: "p",
          text: "Logos are not exempt. Company names and logos fall outside the ADA's sign requirements in §216, but the protruding-object limit in §307 still applies to them.[^ada-scoping][^ada-307]",
        },
        {
          type: "callout",
          title: "Count the standoffs",
          text: "A halo-lit letter about 3.5 inches deep, on one maker's default standoff of about 1.5 inches, stands about 5 inches off the wall (our arithmetic): over the limit if its leading edge sits between 27 and 80 inches on a circulation path.[^gp-halo][^gemini-halo] Mount it with its leading edge above 80 inches, or keep the total depth within 4 inches.",
        },
        {
          type: "p",
          text: "The Glownique makes channel letters to a custom depth, from 0.8 inches, and does not install, so tell us the mounting height when you ask for a quote and pass these limits to whoever mounts the sign.",
        },
      ],
    },
    {
      id: "size-and-cost",
      heading: "How does sign size affect the cost?",
      blocks: [
        {
          type: "p",
          text: "Size is one of the main things a quote is built on: taller letters and longer wording mean more material, whether that is hand-bent LED neon and acrylic backboard, the stainless steel of channel letters, or the frame and face of a lightbox. Working out the letter height you need, rather than guessing large, keeps the budget in check.",
        },
        {
          type: "p",
          text: "Every sign is made to order and quoted individually, with a free design mockup before you commit, and the quote confirms the cost of tracked worldwide delivery. For the other cost drivers, from lighting style to mounting, see [what a custom business sign costs](/guides/custom-business-sign-cost).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is there a standard sign size?",
      a: "Not for a custom illuminated sign. Every sign The Glownique makes is made to order, so its size follows the wording, the wall and the viewing distance. LED neon signs can be anything from about 30 cm (12 in) to several metres; channel letters and lightboxes are sized to the logo and the space.",
    },
    {
      q: "Is it 1 inch of letter height for every 10 feet?",
      a: "Not for a sign that faces the viewer: the US Sign Council's average is 30 feet per inch of capital-letter height. About 10 feet per inch is its figure for wall signs parallel to the road, which drivers see side-on. We could not trace the popular 1-inch-per-10-feet charts to primary research.",
    },
    {
      q: "Does a longer phrase need a bigger sign?",
      a: "It does if it has to read from the same distance. The US Sign Council's legibility figures are based on capital-letter height, so at a fixed width every extra word makes the letters smaller. Work out the capital height you need first and let the width follow; the free mockup shows both.",
    },
    {
      q: "Do script fonts need bigger letters?",
      a: "This guide has no script-specific figure: the US Sign Council's index of 30 is an average, and the one typeface value quoted here is for Clarendon. So test a script instead of trusting a rule. Print the wording full size, tape it up and read it from the furthest spot, or see it to scale in your free mockup.",
    },
    {
      q: "What do you need from me to size a sign?",
      a: "The wording or logo, the width of the wall or space, where people will read it from and how far away, whether it goes indoors or outdoors, and a photo of the wall if you have one. Send them on WhatsApp with your quote request; the free mockup shows the design to scale before you order.",
    },
  ],
  sources: [
    {
      id: "ussc-rules",
      title: "Sign Legibility Rules of Thumb",
      publisher: "United States Sign Council, A. Bertucci (2006)",
      url: "https://files.secure.website/wscfus/7691102/uploads/USSC_Sign_Legibility_Rules_of_Thumb.pdf",
    },
    {
      id: "ussc-standards",
      title: "Best Practice Standards for On-Premise Signs",
      publisher: "USSC Foundation, Bertucci & Crawford (2018)",
      url: "https://usscfoundation.org/wp-content/uploads/2018/03/USSC-Guideline-Standards-for-On-Premise-Signs-2018.pdf",
    },
    {
      id: "gp-halo",
      title: "Hello Halo: A Deeper Look at Halo-Lit Channel Letters",
      publisher: "GRAPHICS PRO (2019)",
      url: "https://graphics-pro.com/feature/hello-halo-a-deeper-look-at-halo-lit-channel-letters/",
    },
    {
      id: "gemini-halo",
      title: "Lit Fabricated Metal Halo Lit: Specifications, Mounting, and Installation",
      publisher: "Gemini Product Guide",
      url: "https://hub.geminimade.com/knowledge/fabricated-metal-halo-lit-product-specifications",
    },
    {
      id: "ada-307",
      title: "ADA Standards, Ch. 3 Building Blocks (§307)",
      publisher: "U.S. Access Board",
      url: "https://www.access-board.gov/ada/chapter/ch03/",
    },
    {
      id: "ada-scoping",
      title: "ADA Standards, Ch. 2 Scoping (§204, §216)",
      publisher: "U.S. Access Board",
      url: "https://www.access-board.gov/ada/chapter/ch02/",
    },
    {
      id: "ada-guide",
      title: "Guide to the ADA Standards: Protruding Objects",
      publisher: "U.S. Access Board",
      url: "https://www.access-board.gov/files/ada/guides/protruding-objects.pdf",
    },
  ],
  sourcesAccessedOn: "2026-09-24",
  related: [
    {
      href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
      label: "Front-lit vs halo-lit vs dual-lit channel letters",
      description: "How each lighting style reads at a distance, and what the wall must do.",
    },
    {
      href: "/guides/custom-business-sign-cost",
      label: "Custom business sign cost guide",
      description: "What moves the price, from size and lighting to materials and mounting.",
    },
    {
      href: "/guides/backlit-sign-wall-surfaces-and-standoffs",
      label: "Wall surfaces and standoffs for backlit signs",
      description: "How the wall finish and the gap behind halo-lit letters shape the glow.",
    },
    {
      href: "/products/custom-neon-signs",
      label: "Custom LED neon signs",
      description: "Made to order from about 30 cm to several metres, with a free mockup first.",
    },
  ],
  cta: {
    heading: "See your sign to scale before you order",
    text: "Send your wording or logo, the wall width and where people will read it from. The free mockup shows the design to scale, and your quote comes back on WhatsApp.",
    label: "Get a free mockup",
    productName: "custom sign",
    secondary: { href: "/business-signs/channel-letter-signs", label: "3D metal channel letter signs" },
  },
  hub: {
    category: "Sizing & legibility",
    summary:
      "How tall sign letters need to be for the distance they are read from: a letter height chart, the storefront fascia rule and a tape-on-the-wall method for indoor signs.",
  },
};
