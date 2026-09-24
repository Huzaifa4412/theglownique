import type { Guide } from "@/lib/guides/types";

/**
 * Channel letters vs lightbox (cabinet) signs.
 *
 * The Q6/Q6b comparison from the 2026-09-24 SERP study. The page is scoped to
 * what The Glownique makes — 3D metal channel letters and slim edge-lit
 * lightboxes — and says plainly that it does not make large exterior cabinet
 * signs. Technical statements cite technical-fact-base.md; product details
 * restate lib/product-catalog.ts and go no further.
 */
export const guide: Guide = {
  slug: "lightbox-vs-channel-letters",
  metaTitle: "Channel Letters vs Lightbox Signs Compared",
  metaDescription:
    "Channel letters vs a lightbox sign: how they differ in look, graphic changes, mounting, landlord criteria and installation, and which suits your site.",
  h1: "Channel Letters vs. Lightbox Signs: Which Should You Choose?",
  kicker: "Sign type comparison",
  answer:
    "Channel letters vs a lightbox sign comes down to construction. Channel letters are individually fabricated 3D letters, lit or unlit; a lightbox is one illuminated box with a translucent or printed face. Choose letters for permanent wording on a façade or feature wall, and a lightbox when the graphic will change, as menus and promotions do. In a leased unit, read the sign criteria first.",
  publishedOn: "2026-09-24",
  updatedOn: "2026-09-24",
  primaryKeyword: "channel letters vs lightbox sign",
  secondaryKeywords: [
    "channel letters vs cabinet sign",
    "what is a cabinet sign",
    "light box sign",
    "which sign is better for a storefront",
  ],
  image: {
    src: "/3d-metallic-neon-sign/frontlit/image.webp",
    alt: "Front-lit channel letters spelling Food Opera in script, with glowing orange faces and dark returns, fixed to a pale wall",
    width: 736,
    height: 981,
    caption: "Channel letters: separate lit letters, with the wall as the background.",
  },
  showHeroImage: true,
  sections: [
    {
      id: "what-are-channel-letters",
      heading: "What are channel letters?",
      blocks: [
        {
          type: "p",
          text: "A **channel letter** is a dimensional letter built from individual plastic or metal parts, and it can be lit or unlit.[^gemini-letters] Each letter has sides called **returns**, a face and a back; a lit set adds LED modules inside the letters, a low-profile power supply, and pass-throughs that take the wiring into the wall.[^glantz-channel-letters] In a typical build the returns are pre-painted aluminium and the faces cast acrylic, while fabricated metal letters have welded or soldered metal faces and returns.[^glantz-channel-letters][^gemini-letters]",
        },
        {
          type: "p",
          text: "Lit letters are **front-lit**, with a glowing face; **halo-lit** or reverse-lit, throwing their light back onto the wall; or **dual-lit** (combination), which does both.[^gemini-letters][^gp-halo] Our [guide to front-lit, halo-lit and dual-lit letters](/guides/front-lit-vs-halo-lit-vs-dual-lit) compares the three.",
        },
      ],
    },
    {
      id: "what-is-a-lightbox-sign",
      heading: "What is a lightbox or cabinet sign?",
      blocks: [
        {
          type: "p",
          text: "A **lightbox sign**, also written light box, is one illuminated box that carries the whole design on its face, lit through from behind or within. That is what **backlit** means in lightbox work,[^swingframe-lightboxes] whereas channel-letter makers often use back-lit to mean halo-lit, so check which one a quote means.[^gemini-letters][^gp-halo] The US Sign Council sidesteps the clash by calling both internally illuminated: the light source sits inside the cabinet or the letter.[^ussc-standards]",
        },
        { type: "p", text: "Lightboxes come in two families:" },
        {
          type: "defs",
          items: [
            {
              term: "Cabinet signs (direct-lit)",
              detail:
                "The deeper family, with the LEDs behind the face. That position takes depth: one maker's backlit boxes come 3¾ or 5 inches deep, against edge-lit boxes from about 1¾ inches.[^swingframe-lightboxes] An LED maker sells edge-mounted strips for what it calls shallow cabinets, 3 to 6 inches deep.[^current-catalog]",
            },
            {
              term: "Slim edge-lit panels (snap-frame or SEG)",
              detail:
                "LEDs along the edge feed light into an acrylic light-guide sheet made to release it through its face, with a white reflector behind.[^acrylite-edge-lit] The graphic loads from the front. A **snap frame** has hinged aluminium rails that open for a poster or backlit film;[^swingframe-lightboxes] an **SEG** (silicone edge graphic) frame takes printed fabric with a silicone strip sewn round its edge, pressed into a groove and pulled taut.[^frameplus-seg] Product examples run from about ¾ inch deep for an edge-lit snap frame to about 3 inches for an SEG box.[^testrite-snap-frame][^testrite-seg]",
            },
          ],
        },
      ],
    },
    {
      id: "side-by-side",
      heading: "Channel letters vs lightbox sign: side by side",
      blocks: [
        {
          type: "p",
          text: "The table compares the three constructions qualitatively. For budgets, see [what drives the cost of a business sign](/guides/custom-business-sign-cost).",
        },
        {
          type: "table",
          caption:
            "Channel letters, direct-lit cabinet signs and slim edge-lit lightboxes compared on look, graphic changes, mounting, location, landlord criteria, build and installation",
          columns: ["", "Channel letters", "Cabinet sign (direct-lit)", "Slim edge-lit lightbox"],
          rows: [
            [
              "Look and legibility",
              "Separate letters with the wall as background: a lit face, a halo on the wall, or both.[^gemini-letters]",
              "One lit panel. Sign-legibility guidance keeps at least 60% of a panel sign's area as open background.[^ussc-rules]",
              "A printed graphic on backlit film or fabric, lit through the face.[^testrite-snap-frame][^frameplus-seg]",
            ],
            [
              "How the graphic changes",
              "It doesn't: the letters are the message, so new wording means new letters.",
              "The design is on the translucent face,[^swingframe-lightboxes] so a new design means changing the face.",
              "From the front: a snap frame opens on hinged rails, and SEG fabric presses into a groove.[^swingframe-lightboxes][^frameplus-seg]",
            ],
            [
              "Where it mounts",
              "A wall or fascia: flush on studs, on a raceway, on a backer panel, or on standoffs.[^gp-raceway][^gemini-mounting]",
              "Fixed as one box. One LED maker calls a 3–6-inch cabinet shallow.[^current-catalog]",
              "Close to the wall: about ¾ inch to 3 inches deep in product examples.[^testrite-snap-frame][^testrite-seg]",
            ],
            [
              "Indoor or outdoor",
              "Built for the location: a listed US sign is marked for dry, damp or wet locations.[^ul-sign-markings]",
              "The same: built, and marked, for the location.[^ul-sign-markings]",
              "Mainly interiors: makers list menu boards, retail displays, airports, banks, hospitals and trade shows.[^acrylite-edge-lit][^testrite-seg][^frameplus-seg]",
            ],
            [
              "Landlord criteria",
              "Can dictate the build: one shopping centre's criteria require raceway mounting in a colour matching the fascia.[^vestar-criteria]",
              "Criteria can rule sign types out,[^vestar-criteria] so confirm a cabinet is allowed before designing one.",
              "Ask whether the criteria also cover window displays.",
            ],
            [
              "Build complexity",
              "Grows with the letter count, because each letter is built and lit separately.[^glantz-channel-letters]",
              "One box and one face, however long the wording.",
              "A frame, a light guide and a print,[^acrylite-edge-lit] and only the print changes.",
            ],
            [
              "Installation",
              "Flush letters each need fixings and a wire hole; a raceway carries the wiring through fewer holes.[^gp-raceway][^gemini-mounting]",
              "A single unit to fix and wire.",
              "A slim frame to fix and a power supply to connect; one snap-frame example runs on 24 V.[^testrite-snap-frame]",
            ],
          ],
          note: "Depths are examples from makers' product lines, not a standard.",
        },
      ],
    },
    {
      id: "storefront",
      heading: "Which sign is better for a storefront?",
      blocks: [
        {
          type: "p",
          text: "**A façade read from the road.** Legibility starts with letter height, whichever sign carries the letters. The US Sign Council's average is 1 inch of capital-letter height for every 30 feet of viewing distance, and a wall sign parallel to the road needs letters about three times larger.[^ussc-rules][^ussc-standards] With channel letters, the letters are the whole sign. On a cabinet, the Council's advice to keep at least 60% of a panel sign's area as open background means the box must be considerably larger than its wording.[^ussc-rules] Our [sign size and viewing distance guide](/guides/sign-size-viewing-distance) works through the numbers.",
        },
        {
          type: "p",
          text: "**A leased unit with sign criteria.** Read the criteria before you choose a type, because they may choose it for you. One shopping centre's criteria, for example, require written landlord approval of shop drawings before the permit application, landlord-approved and insured vendors, UL-labelled components and raceway mounting, and they ban exposed neon.[^vestar-criteria] Leases also commonly require you to remove the sign and repair the façade when you leave, according to one real-estate law firm.[^hollander-leases]",
        },
      ],
    },
    {
      id: "menus-and-receptions",
      heading: "What about menus, promotions and reception walls?",
      blocks: [
        {
          type: "p",
          text: "**A menu or promotions that change.** Choose a lightbox, because the print is the only part you replace. A snap frame opens from the front,[^swingframe-lightboxes] and an SEG graphic is lightweight fabric that folds for shipping.[^frameplus-seg] Channel letters belong to wording that will not change.",
        },
        {
          type: "image",
          image: {
            src: "/ultra-thin-slim-lightbox/Menu boards.jpg",
            alt: "Two slim illuminated menu boards on a blue-grey wall, thin glowing frames around printed menus of burgers, pizza and drinks",
            width: 1199,
            height: 1066,
            caption: "Lightbox menu boards: a slim lit frame, with the menu as a printed graphic.",
          },
        },
        {
          type: "p",
          text: "**A reception wall.** A permanent logo suits channel letters. If you want them halo-lit, look at the wall first: dark or rough surfaces, and steep viewing angles, make halo-lit letters harder to read,[^gp-halo] as our [wall surfaces and standoffs guide](/guides/backlit-sign-wall-surfaces-and-standoffs) explains. A slim lightbox earns its place where the reception also shows changing content, such as a welcome message or campaign artwork.",
        },
        {
          type: "p",
          text: "In a corridor or lobby, check depth as well. Under the ADA Standards, anything wall-mounted with its leading edge between 27 and 80 inches above the floor may protrude no more than 4 inches into a circulation path,[^ada-ch3] so measure the sign with its fixings.",
        },
      ],
    },
    {
      id: "installation",
      heading: "What does installation involve?",
      blocks: [
        {
          type: "p",
          text: "In the US, the National Electrical Code requires a sign to be listed whatever its voltage,[^isa-nec] and a UL listing mark can only be applied at the manufacturer's facility.[^ul-listed-signs] Most communities also require a permit for a new sign,[^isa-permits] and local rules decide who may connect it: in New York City, any electrical connection needs its own electrical work permit, filed by a licensed electrician.[^nyc-sign-permits] Check your city's requirements before you apply.",
        },
        {
          type: "p",
          text: "The Glownique makes and ships its signs; it does not install them. A local installer mounts the sign, and a licensed electrician connects any hard-wired sign. For what changes when a sign goes outside, see [indoor vs outdoor illuminated signs](/guides/indoor-vs-outdoor-illuminated-signs).",
        },
      ],
    },
    {
      id: "what-we-make",
      heading: "What does The Glownique make in each family?",
      blocks: [
        {
          type: "p",
          text: "Two of the three constructions: channel letters and slim edge-lit lightboxes. Every sign is made to order, and a free design mockup comes before you order. Quotes go through WhatsApp, payment is through The Glownique's Etsy shop, where eligible orders are covered by Etsy Purchase Protection, and delivery is tracked worldwide, with the shipping cost confirmed in your quote.",
        },
        {
          type: "defs",
          items: [
            {
              term: "3D metal channel letters",
              detail:
                "Stainless-steel letters and logo shapes fabricated to your artwork, front-lit, halo-lit or dual-lit, with IP67-rated LED modules sealed inside. Depths run from 0.8 inch to 3.5 inches and beyond, in brushed, mirrored or matte gold, rose gold, brass, silver or black, mounted flush, on standoffs, on a raceway or on a backing panel. For exterior façades or interiors: see [3D metal channel letter signs](/business-signs/channel-letter-signs).",
            },
            {
              term: "Slim edge-lit LED lightboxes",
              detail:
                "An anodised-aluminium frame under an inch (about 25 mm) deep, with edge-mounted SMD LEDs, a light-guide panel and a diffused acrylic or tempered display face. The magnetic or snap-frame face lets menus, posters and promotions change in seconds, without tools. Low-voltage (12 V or 24 V) with long-life LEDs, and wall-mounted, hanging (including double-sided), freestanding or flush. Indoor as standard, with outdoor-rated options: see [slim LED lightbox signs](/business-signs/lightbox-signs).",
            },
          ],
        },
        {
          type: "p",
          text: "The Glownique does not make large exterior cabinet signs. If your site needs one, the checklist below is what to ask of whoever builds it.",
        },
      ],
    },
    {
      id: "cabinet-sign-checklist",
      heading: "Need a large exterior cabinet sign? What to look for",
      blocks: [
        {
          type: "list",
          items: [
            "**A listing on the finished sign.** A listed power supply does not make the sign listed.[^ul-listed-signs] Labs other than UL, including Intertek (ETL), CSA and TÜV, also list signs to UL 48.[^isa-nrtl]",
            "**A wet-location marking.** A listed sign states whether it suits dry, damp or wet locations, and outdoor signs are marked “Suitable for Wet Locations”.[^ul-sign-markings]",
            "**Drain holes** at the cabinet's low points.[^isa-nec]",
            "**A face suited to the site.** Polycarbonate has much higher impact strength than acrylic,[^glantz-channel-letters] but it absorbs UV and yellows unless protected by a UV cap layer, which should face the sun.[^palram-uv] A plastic face that also forms the enclosure must be listed for that purpose.[^isa-nec]",
            "**Instructions and a licensed installer.** UL 48 requires installation instructions with a permanently connected sign,[^ul-sign-markings] and licensing is local: in California, the C-45 sign contractor licence covers fabricating, installing and wiring electric signs.[^cslb-c45]",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Are channel letters always illuminated?",
      a: "No. The term describes how the sign is built, as separate three-dimensional letters, and a set can be left unlit. Lit sets are front-lit, halo-lit or dual-lit, and The Glownique makes its 3D metal channel letters in all three styles.",
    },
    {
      q: "Is a lightbox sign cheaper than channel letters?",
      a: "It depends on the design. With channel letters the work grows with the number of letters, because each is built and lit separately; a lightbox is one frame or box with one printed face, however long the wording. Every Glownique sign is made to order and quoted through WhatsApp, with the shipping cost confirmed in the quote.",
    },
    {
      q: "For a lightbox, which is better: backlit or edge-lit?",
      a: "It depends on the depth you can allow. Backlit boxes put the LEDs behind the face, so they are deeper; edge-lit panels light an acrylic light guide from its edges, so they can be far slimmer, from about three-quarters of an inch in product examples. The Glownique's lightboxes are edge-lit and under an inch deep.",
    },
    {
      q: "Which suits a detailed, full-colour logo?",
      a: "If the logo relies on colour and fine detail, a lightbox is the safer route, because its face is a printed graphic. Channel letters translate a logo into fabricated shapes with real depth: The Glownique cuts each letter or logo element from sheet stainless steel to your artwork and forms it into a channel. The free design mockup, which comes before you order, is where you judge how your logo translates.",
    },
    {
      q: "Can a slim lightbox go in a shop window or outdoors?",
      a: "In a shop window, yes: The Glownique's standard slim lightbox is built for indoor use, which includes shop windows, menu walls, lobbies and exhibition stands. Outdoor-rated builds are available for covered or exterior positions. Tell us where the sign will hang, and the mockup will specify the right build.",
    },
    {
      q: "Who installs a sign I order online?",
      a: "A local installer, not The Glownique. Every sign is made to order and shipped with tracked delivery; a local installer mounts it, and a licensed electrician connects any hard-wired sign. For channel letters, agree the mounting method with your installer before you order: flush, on standoffs, on a raceway or on a backing panel.",
    },
  ],
  sources: [
    {
      id: "gemini-letters",
      title: "What are Channel Letters? And What's the Difference Between Gemini's Fabricated Metal Letters?",
      publisher: "Gemini Product Guide (page dated Sept 9, 2026)",
      url: "https://hub.geminimade.com/knowledge/channel-letters-vs-fabricated-metal-letters",
    },
    {
      id: "glantz-channel-letters",
      title: "Channel Letter Resource Guide",
      publisher: "N. Glantz & Son",
      url: "https://online.nglantz.com/view/97657225",
    },
    {
      id: "gp-halo",
      title: "Hello Halo: A Deeper Look at Halo-Lit Channel Letters",
      publisher: "GRAPHICS PRO (May 24, 2019)",
      url: "https://graphics-pro.com/feature/hello-halo-a-deeper-look-at-halo-lit-channel-letters/",
    },
    {
      id: "swingframe-lightboxes",
      title: "Snap Frame Lightboxes: LED Edgelit and Backlit",
      publisher: "Swingframe",
      url: "https://www.swingframe.com/swingsnap_lightboxes.htm",
    },
    {
      id: "ussc-standards",
      title: "Best Practice Standards for On-Premise Signs",
      publisher: "USSC Foundation, Bertucci & Crawford (2018 PDF)",
      url: "https://usscfoundation.org/wp-content/uploads/2018/03/USSC-Guideline-Standards-for-On-Premise-Signs-2018.pdf",
    },
    {
      id: "current-catalog",
      title: "Tetra LED Signage Lighting Systems Catalog 2024 (SIGN120)",
      publisher: "Current Lighting Solutions",
      url: "https://cdn.currentlighting.com/site/brochure/SIGN120-Signage-Catalog.pdf",
    },
    {
      id: "acrylite-edge-lit",
      title: "ACRYLITE LED light guiding edge lit, Technical Information 3735D (09/24)",
      publisher: "ACRYLITE (Röhm/POLYVANTIS)",
      url: "https://www.acrylite.co/files/content/acrylite.co/documents/product-information/ACRYLITE-LED-light-guiding-edge-lit-Technical-Information.pdf",
    },
    {
      id: "frameplus-seg",
      title: "What is an SEG Lightbox?",
      publisher: "FramePlus Display",
      url: "https://www.frame-plus.com/blogs/guide/what-is-an-seg-lightbox",
    },
    {
      id: "testrite-snap-frame",
      title: "SupraSlim LED SnapFrame Light Boxes",
      publisher: "Testrite Visual",
      url: "https://www.testrite.com/products/aluminum-snap-frames/wall-mount-hanging/supraslim-light-boxes/supraslim-led-snapframe-light-boxes/",
    },
    {
      id: "testrite-seg",
      title: "Charisma SEG/LED Slim Profile Light Boxes",
      publisher: "Testrite Visual",
      url: "https://www.testrite.com/products/hanging-graphic-hardware/frames/charisma-segled-slim-profile-light-boxes/charisma-segled-slim-profile-light-boxes/",
    },
    {
      id: "ussc-rules",
      title: "Sign Legibility Rules of Thumb",
      publisher: "United States Sign Council, A. Bertucci (2006)",
      url: "https://files.secure.website/wscfus/7691102/uploads/USSC_Sign_Legibility_Rules_of_Thumb.pdf",
    },
    {
      id: "gp-raceway",
      title: "Behind the Letter: Raceways' Roles in Channel Letter Projects",
      publisher: "GRAPHICS PRO (Jan 27, 2020)",
      url: "https://graphics-pro.com/feature/behind-the-letter-raceways-roles-in-channel-letter-projects/",
    },
    {
      id: "gemini-mounting",
      title: "Mounting Hardware: The Foundation Behind Every Sign",
      publisher: "Gemini Product Guide",
      url: "https://hub.geminimade.com/knowledge/mounting-hardware-the-foundation-behind-every-sign",
    },
    {
      id: "ul-sign-markings",
      title: "Listed Signs: Markings and Installation Instructions (The Code Authority)",
      publisher: "UL (July 2012)",
      url: "https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/Electrical-Connections-Issue-3-2012.pdf",
    },
    {
      id: "vestar-criteria",
      title: "Exhibit B: General Sign Criteria for Shopping Center",
      publisher: "Vestar (document 2012; posted 2021)",
      url: "https://vestartenantservices.com/wp-content/uploads/2021/01/Sign-Approval-Criteria.pdf",
    },
    {
      id: "hollander-leases",
      title: "Signage Provisions in Commercial Leases",
      publisher: "Hollander Real Estate Law (Aug 2024)",
      url: "https://hollanderpllc.com/2024/08/signage-provisions-in-commercial-leases/",
    },
    {
      id: "ada-ch3",
      title: "ADA Standards, Ch. 3 Building Blocks (§307)",
      publisher: "U.S. Access Board",
      url: "https://www.access-board.gov/ada/chapter/ch03/",
    },
    {
      id: "isa-nec",
      title: "Guidelines for Application of 2011 NEC Changes in Electric Sign Requirements",
      publisher: "International Sign Association (2012)",
      url: "http://nxt-live-books.s3.amazonaws.com/pub/nxtbooks/csg/isa_2011nec_guidelines/offline/csg_isa_2011nec_guidelines.pdf",
    },
    {
      id: "ul-listed-signs",
      title: "Listed Signs: Identifying UL Certification and Proper Use",
      publisher: "UL (Fall 2014)",
      url: "https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/UL-TCAEC-2014-Fall-v3.pdf",
    },
    {
      id: "isa-permits",
      title: "Permitting Resources",
      publisher: "International Sign Association",
      url: "https://signs.org/codes-regulations/expert-assistance/permit/",
    },
    {
      id: "nyc-sign-permits",
      title: "Sign Permit Requirements",
      publisher: "NYC Dept. of Buildings",
      url: "https://www.nyc.gov/site/buildings/safety/sign-permit-reqs.page",
    },
    {
      id: "isa-nrtl",
      title: "Nationally Recognized Testing Laboratories",
      publisher: "International Sign Association",
      url: "https://signs.org/codes-regulations/technical-codes-and-standards/nationally-recognized-testing-laboratories/",
    },
    {
      id: "palram-uv",
      title: "Polycarbonate and Protection from UV Radiation",
      publisher: "Palram (Aug 5, 2021)",
      url: "https://www.palram.com/blog/construction-architecture/polycarbonate-and-protection-from-uv-radiation/",
    },
    {
      id: "cslb-c45",
      title: "C-45 Sign Contractor classification",
      publisher: "California CSLB",
      url: "https://www.cslb.ca.gov/about_us/library/licensing_classifications/Licensing_Classifications_Detail.aspx?Class=C45",
    },
  ],
  sourcesAccessedOn: "2026-09-24",
  related: [
    {
      href: "/business-signs/lightbox-signs",
      label: "Slim LED lightbox signs",
      description: "Edge-lit lightboxes under an inch deep, with a magnetic or snap-frame face for quick graphic changes.",
    },
    {
      href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
      label: "Front-lit vs halo-lit vs dual-lit letters",
      description: "How the three channel-letter lighting styles differ, and what each asks of the wall.",
    },
    {
      href: "/guides/sign-size-viewing-distance",
      label: "Sign size and viewing distance",
      description: "How tall letters need to be for the distance your sign is read from.",
    },
    {
      href: "/guides/indoor-vs-outdoor-illuminated-signs",
      label: "Indoor vs outdoor illuminated signs",
      description: "What changes when an illuminated sign has to work outside.",
    },
  ],
  cta: {
    heading: "Not sure which suits your site?",
    text: "Send your logo and a photo of the wall or window on WhatsApp. Every sign is made to order, and a free design mockup comes before you order.",
    label: "Get a Free Design Mockup",
    productName: "business sign",
    secondary: { href: "/business-signs/channel-letter-signs", label: "3D metal channel letter signs" },
  },
  hub: {
    category: "Choosing a sign type",
    summary:
      "Channel letters, cabinet signs and slim edge-lit lightboxes compared: look, graphic changes, landlord criteria, installation and which suits your site.",
  },
};
