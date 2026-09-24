import type { Guide } from "@/lib/guides/types";

export const guide: Guide = {
  slug: "indoor-vs-outdoor-illuminated-signs",
  metaTitle: "Are LED Neon Signs Waterproof? IP65 vs IP67",
  metaDescription:
    "Can LED neon signs go outdoors? What IP65, IP66, IP67 and IP68 mean, why a strip's rating is not the sign's, and what US rules ask of an outdoor sign.",
  h1: "Can LED Neon Signs Be Used Outdoors?",
  kicker: "Indoor vs outdoor signs",
  answer:
    "Yes, but only a sign built for outdoor use; an indoor LED neon sign should stay indoors. An IP65 or IP67 rating is not proof that a sign is waterproof, because it usually rates the LED strip, not the finished sign. Outdoors, the weakest part decides how a sign copes — typically the power supply, a connection or a cut end — and whether it hangs under cover matters too.",
  publishedOn: "2026-09-24",
  updatedOn: "2026-09-24",
  primaryKeyword: "are LED neon signs waterproof",
  secondaryKeywords: [
    "can LED neon signs be used outdoors",
    "indoor vs outdoor signs",
    "IP65 vs IP67",
    "outdoor neon sign",
    "what does IP67 mean",
  ],
  image: {
    src: "/ultra-thin-slim-lightbox/Storefront windows.webp",
    alt: "Round sign with a glowing white ring reading Cielo cocina fusión, mounted on metal brackets on an exterior wall at night",
    width: 1200,
    height: 1600,
  },
  showHeroImage: true,
  sections: [
    {
      id: "what-is-an-ip-rating",
      heading: "What does an IP rating mean?",
      blocks: [
        {
          type: "p",
          text: "An IP (ingress protection) code comes from the international standard IEC 60529. It grades how well an **enclosure** keeps out solid objects and dust, shown by the **first digit** (0 to 6), and water, shown by the **second digit** (0 to 9).[^iec-ip] In IP67, the 6 is the solids rating and the 7 is the water rating.",
        },
        {
          type: "p",
          text: "A first digit of **6 means dust-tight**: no dust gets in. A 5 means dust-protected, which allows limited ingress.[^wikipedia-ip-code] That is all the code covers. NEMA, the US National Electrical Manufacturers Association, notes that IP codes consider only solids and water, while its own enclosure types add criteria for icing, corrosion and construction.[^nema-enclosures] An IP code says nothing about sunlight, heat or cold.",
        },
      ],
    },
    {
      id: "ip65-ip66-ip67-ip68",
      heading: "IP65, IP66, IP67 or IP68: what does each code mean?",
      blocks: [
        {
          type: "p",
          text: "All four start with 6, so all four are dust-tight. The second digit is where they differ, and it changes the kind of water test, not just its severity:",
        },
        {
          type: "table",
          caption: "The water test behind the second digit of IP65, IP66, IP67, IP68 and the dual code IP66/IP67",
          columns: ["Code", "Water protection", "What the test involves"],
          rows: [
            [
              "IP65",
              "Water jets",
              "A 6.3 mm nozzle delivering 12.5 litres a minute from about 2.5–3 m, aimed from every practicable direction",
            ],
            ["IP66", "Powerful water jets", "A 12.5 mm nozzle delivering 100 litres a minute"],
            [
              "IP67",
              "Temporary immersion",
              "About 30 minutes under water, the lowest point 1 m below the surface (the top 150 mm below it for enclosures 850 mm or taller)",
            ],
            [
              "IP68",
              "Continuous immersion",
              "Conditions agreed between manufacturer and user, and more severe than the IP67 test",
            ],
            [
              "IP66/IP67",
              "Powerful jets and temporary immersion",
              "Meets both the powerful-jet and the temporary-immersion tests",
            ],
          ],
          note: "Test conditions as summarised by a test laboratory and a secondary source; the IEC refers readers to the standard itself for the full conditions.[^iec-ip][^wikipedia-ip-code][^castle-jets][^castle-immersion]",
        },
        {
          type: "callout",
          title: "A higher number is not a better score",
          text: "Above 6, the water tests switch from jets to immersion, so the digits stop adding up. An IP67 or IP68 product is not automatically suitable for water jets unless it is dual-coded, such as IP66/IP67, and IP67 does not imply IP65 or IP66 performance.[^wikipedia-ip-code][^castle-jets][^castle-immersion] IP68 does not beat IP66 against a hose.",
        },
      ],
    },
    {
      id: "strip-or-sign",
      heading: "Are LED neon signs waterproof if the strip is rated IP67?",
      blocks: [
        {
          type: "p",
          text: "Not on that evidence alone, because the rating usually belongs to the strip, not the sign. LED neon is a line of LEDs inside a flexible silicone or PVC jacket, usually run on low-voltage DC from a separate power supply that converts mains AC.[^current-contour][^sloanled-street-wrap] A finished sign adds more parts: a Glownique LED neon sign, for example, has an acrylic backboard, concealed wiring, a 12V plug-in adaptor and wall standoffs or a hanging kit. The IP code on a spec sheet usually rates the strip alone, and suppliers attach conditions to it.[^glls-12v]",
        },
        {
          type: "list",
          items: [
            "One maker rates its 12V LED neon IP68 only “with appropriately rated accessories”.[^glls-12v]",
            "Another ships its IP67 strip with silicone end caps and adhesive for sealing.[^sloanled-street-wrap]",
            "A third rates some LED modules IP66, yet they are recognised by UL for dry or damp locations only.[^current-catalog]",
          ],
        },
        {
          type: "p",
          text: "The certifications printed on such spec sheets are component or low-voltage-system certifications, not a listing for a finished sign.[^current-contour][^sloanled-street-wrap][^glls-12v] NEMA adds that an IP rating may apply to a partially completed installation.[^nema-enclosures] An IP67 strip does not make an IP67 sign.",
        },
      ],
    },
    {
      id: "weakest-part",
      heading: "Which part decides how a sign copes outdoors?",
      blocks: [
        {
          type: "p",
          text: "The weakest one. NEMA notes that a field assembly is limited by its least-rated component,[^nema-enclosures] and on an illuminated sign these are the parts to check as closely as the strip:",
        },
        {
          type: "defs",
          items: [
            {
              term: "The power supply",
              detail: "It converts mains AC into the low-voltage DC the LEDs run on, and it is a separate unit with its own rating.[^current-contour] Wet-location-rated LED supplies exist,[^sloanled-flexibrite] so check what a supply is rated for rather than assume. Power and driver components also top the most-observed failures in a member survey by an LED reliability consortium working with the US Department of Energy.[^lsrc-lifetime]",
            },
            {
              term: "Connections and cable",
              detail: "Every join is a possible way in for water, and water can also travel inside a cable's jacket into an enclosure, which is why test labs test with the actual cabling attached.[^castle-immersion] One New York neon shop reports water getting into the wire connections of rope-style LEDs during winter thaws.[^sott-neon-led]",
            },
            {
              term: "Cut ends",
              detail: "LED neon can be cut only at the maker's marked points, and every cut end has to be sealed, typically with a silicone end cap and silicone adhesive.[^sloanled-street-wrap][^current-catalog]",
            },
            {
              term: "Clips and fixings",
              detail: "Even mounting hardware has limits: one LED neon maker does not cover its transparent polycarbonate clips under warranty for outdoor use.[^sloanled-street-wrap]",
            },
          ],
        },
        {
          type: "p",
          text: "The Glownique's advice for its LED neon signs is to keep the power supply dry and ventilated. Outdoors, ask the same of every part above: how is it protected, and what is it rated for?",
        },
      ],
    },
    {
      id: "us-approval",
      heading: "How are outdoor signs approved in the US?",
      blocks: [
        {
          type: "p",
          text: "Not by IP code. **UL 48** covers the safety of a sign as a product, and **Article 600** of the National Electrical Code (NEC) covers its installation.[^isa-ul48] Citing NEC 110.28, NEMA states that IP ratings are not a substitute for US enclosure type ratings.[^nema-enclosures] Signs must be listed whatever their voltage, and a listed power adapter does not make the sign listed.[^isa-nec][^ul-listed-signs]",
        },
        {
          type: "p",
          text: "A listed sign is marked for where it may be used — “Dry Locations Only”, “Suitable for Damp Locations” or “Suitable for Wet Locations” — after the applicable testing.[^ul-listed-signs][^ul-markings] Wet locations bring extra requirements, such as wet-rated Class 2 cable for LED signs,[^ul-markings] and sign rules call for drain holes at a sign's low points.[^isa-nec] Which category applies depends on exactly where the sign hangs, so confirm it with your electrician.",
        },
        {
          type: "list",
          items: [
            "**Portable signs.** A portable sign — under about 50 lb, with a removable mounting — used in a damp or wet location needs **factory-installed GFCI** protection.[^isa-nec] It has to come from the manufacturer, so plugging an indoor sign into an outdoor extension cord does not meet the rule.",
            "**Hard-wired signs.** These should be connected by a licensed electrician, and the rules are set locally: in New York City, for example, any electrical connection needs a separate electrical work permit, filed by a licensed electrician.[^nyc-sign-permit]",
            "**Low voltage.** 12V DC is well under the 60V DC limit for Class 2 circuits, which limit fire risk and give acceptable shock protection.[^ul-class2][^puls-class2] The power supply still connects to mains wiring, though, and low voltage does not exempt a sign from listing.[^isa-nec][^puls-class2]",
          ],
        },
        {
          type: "p",
          text: "Most communities also require a permit for a new sign.[^isa-permits] The rules are set locally, so check with your city's building or zoning office before you order.",
        },
      ],
    },
    {
      id: "covered-or-exposed",
      heading: "Covered or exposed: does the position matter?",
      blocks: [
        {
          type: "p",
          text: "Yes. A sign under a deep canopy and one on an open fascia face different conditions, so The Glownique specifies outdoor builds by position: the acrylic logo sign's outdoor build, for example, is made for covered outdoor spaces and [events](/custom-signage/event-signs).",
        },
        {
          type: "p",
          text: "Then there is sunlight. Under light, PVC loses hydrogen chloride and discolours.[^pvc-photodegradation] Silicone jackets on sign-industry LED neon are marketed as UV-stable or UV-resistant,[^sloanled-street-wrap][^sloanled-flexibrite] but that is each supplier's claim for its own product, so ask what a jacket is made of and whether UV test data exists.",
        },
        {
          type: "p",
          text: "Heat matters too. Most of the power an LED uses becomes heat that has to be conducted away, and heat reduces output, shifts colour and shortens life.[^lsrc-lifetime][^doe-thermal] A rule of thumb from LED reliability research: electronics last roughly twice as long for every 10 °C cooler they run.[^lsrc-lifetime] For the full temperature range, three sign-industry LED neon datasheets list operation from −40 °C up to between 50 °C and 65 °C.[^current-contour][^sloanled-street-wrap][^glls-12v]",
        },
      ],
    },
    {
      id: "sign-types",
      heading: "Which Glownique signs can go outside?",
      blocks: [
        {
          type: "p",
          text: "Each sign type starts from a different place. An outdoor LED neon sign, for example, is a different construction from the indoor sign, not the same sign moved outside. Tell us where yours will hang, and the quote specifies the build.",
        },
        {
          type: "table",
          caption: "Indoor and outdoor options for each Glownique sign type",
          columns: ["Sign type", "As standard", "Outdoors"],
          rows: [
            [
              "[LED neon signs](/products/custom-neon-signs)",
              "Indoor",
              "Outdoor build available: a different construction from the indoor sign",
            ],
            [
              "[Channel letters](/business-signs/channel-letter-signs)",
              "Exterior façades or interiors",
              "IP67-rated LED modules sealed inside stainless-steel channels",
            ],
            [
              "[Slim LED lightboxes](/business-signs/lightbox-signs)",
              "Indoor",
              "Outdoor-rated options for covered or exterior positions",
            ],
            [
              "[Acrylic logo signs](/business-signs/acrylic-logo-signs)",
              "Indoor",
              "Outdoor build for covered outdoor spaces and events",
            ],
          ],
        },
        {
          type: "p",
          text: "**Channel letters.** The IP67 figure belongs to the LED modules, not the finished letters; for an exterior sign in the US, what an inspector looks for is the listing mark.[^ul-listed-signs] For sites within about 50 miles of the ocean, one metal-letter fabricator recommends 316 stainless steel or anodised aluminium,[^gemini-halo] so mention a coastal site when you ask for a quote. A local sign installer mounts the letters, and a licensed electrician makes the electrical connection.",
        },
        {
          type: "p",
          text: "**Slim lightboxes.** These are edge-lit: LEDs around the frame light a panel from its edge. Water droplets disrupt the light in an edge-lit panel, as fingerprints and scratches do.[^acrylite-edge-lit]",
        },
        {
          type: "p",
          text: "**Acrylic logo signs.** The printed face needs care outdoors. The “UV” in UV printing describes how the ink cures, not resistance to sunlight.[^mimaki-uv-ink] One ink maker says hard UV inks have very little weather resistance and that rain can get under them and lift them;[^mimaki-uv-weather] another quotes up to about two years outdoors for its ink with a gloss finish.[^roland-eco-uv]",
        },
      ],
    },
    {
      id: "before-you-order",
      heading: "What should you tell us before you order?",
      blocks: [
        {
          type: "p",
          text: "Every Glownique sign is made to order, so where it will live is settled before anything is built. When you ask for a quote on WhatsApp, tell us:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Where it will hang:** indoors, or outdoors on which wall or structure. A photo of the spot helps.",
            "**Covered or exposed:** under a canopy or roof, or open to rain and direct sun.",
            "**What power is available:** a socket for a plug-in sign, or a supply your electrician will connect, and where the power supply can sit.",
            "**Anything unusual about the site:** a coastal location, landlord sign criteria or a permit condition.",
          ],
        },
        {
          type: "p",
          text: "A free design mockup comes before you order, and the quote specifies the build. Payment goes through The Glownique's Etsy shop, where eligible orders are covered by Etsy Purchase Protection, and [delivery is tracked worldwide](/shipping), with the shipping cost confirmed in the quote. The Glownique does not install: a local installer mounts the sign, and a licensed electrician connects a hard-wired one.",
        },
        {
          type: "callout",
          title: "Never move an indoor sign outside",
          text: "Not even for one evening. An outdoor build is a different construction, not the same sign in a new spot, so if a sign might ever go outdoors, say so before you order.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "Is IP65 enough for an outdoor sign?",
      a: "The code alone cannot tell you. IP65 means dust-tight and protected against water jets; IP67 means dust-tight and protected against temporary immersion, which is a different test rather than a stricter one. Either figure usually describes a component, and in the US an outdoor sign is judged by its listing's dry, damp or wet location marking rather than an IP code.",
    },
    {
      q: "Can I use an LED neon sign at an outdoor wedding or event?",
      a: "Yes, if it is ordered as an outdoor build. An indoor sign should not be moved outside, even for one evening, so say the event is outdoors when you ask for a quote, and whether the sign will be under cover or in the open. In the US, a portable sign used in a damp or wet location needs factory-installed GFCI protection.",
    },
    {
      q: "Can I seal an indoor sign myself to make it waterproof?",
      a: "Not reliably. Sealing what you can see leaves what you cannot: water can travel inside a cable's jacket, and the power supply and connectors keep whatever rating they had. Sealant cannot add the location marking US rules look for, or the factory-installed GFCI protection a portable sign needs in a damp or wet location. An outdoor build is a different construction, specified when you order.",
    },
    {
      q: "Can an LED neon sign stay outside all year?",
      a: "Only one built for outdoor use, and only within the limits of its parts. Three sign-industry LED neon datasheets list operation from −40 °C up to between 50 °C and 65 °C, so check the range for the product fitted. Over a year, the other risks are water at the connections, which one New York sign shop has seen in rope-style LEDs during winter thaws, and sunlight, which discolours PVC jackets.",
    },
    {
      q: "Do I need a permit for an outdoor illuminated sign?",
      a: "Often. Most communities require a permit for a new sign, and an illuminated one brings electrical rules as well: in New York City, any electrical connection needs its own electrical work permit, filed by a licensed electrician. Most landlords also require approval before a permanent exterior sign goes up. Check with your city's building or zoning office before you order; your mockup shows the dimensions an application will ask for.",
    },
    {
      q: "What is the best material for an outdoor sign?",
      a: "There is no single answer; it depends on the part. For LED neon, look at the jacket: PVC discolours in sunlight, while silicone jackets are marketed as UV-stable. For metal letters within about 50 miles of the ocean, one fabricator recommends 316 stainless steel or anodised aluminium. For printed acrylic, look at the ink: one maker says hard UV inks have very little weather resistance.",
    },
  ],
  sources: [
    {
      id: "iec-ip",
      title: "Ingress Protection (IP) ratings",
      publisher: "IEC (checked via an archived snapshot, 14 August 2026)",
      url: "https://www.iec.ch/ip-ratings",
    },
    {
      id: "wikipedia-ip-code",
      title: "IP code",
      publisher: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/IP_code",
    },
    {
      id: "nema-enclosures",
      title: "NEMA FAQs: Enclosures",
      publisher: "NEMA (2021)",
      url: "https://www.nema.org/docs/default-source/standards-document-library/faq-enclosures.pdf?sfvrsn=56e20547_6",
    },
    {
      id: "castle-jets",
      title: "IPX5 & IPX6 Water Jet Testing",
      publisher: "Castle Compliance (test laboratory)",
      url: "https://castle-compliance.com/ipx5-ipx6-water-jet-testing/",
    },
    {
      id: "castle-immersion",
      title: "IPX7 & IPX8 Immersion Testing",
      publisher: "Castle Compliance (test laboratory)",
      url: "https://castle-compliance.com/ipx7-ipx8-immersion-testing/",
    },
    {
      id: "current-contour",
      title: "Tetra Contour Gen 2 Spec Sheet (SIGN309, Rev 11/07/24)",
      publisher: "Current Lighting Solutions",
      url: "https://cdn.currentlighting.com/site/specsheet/SIGN309-Tetra-Contour-Gen2-Spec-Sheet.pdf",
    },
    {
      id: "sloanled-street-wrap",
      title: "Street Wrap Flex Side-Bend Spec Sheet (Rev B, 2025-10-01)",
      publisher: "SloanLED",
      url: "https://sloanled.com/downloads/street-wrap-flex-side-bend-spec-sheet-global.pdf",
    },
    {
      id: "glls-12v",
      title: "Vivid Contour Silicone 12V Static spec (v6.0, 04/15/2022)",
      publisher: "GLLS",
      url: "https://assets-global.website-files.com/6526c8266f9d6acac8ef145f/654d279ad1a1e45a2d6af395_Vivid-Contour-Silicone-12V-Static.pdf",
    },
    {
      id: "current-catalog",
      title: "Tetra LED Signage Lighting Systems Catalog 2024 (SIGN120)",
      publisher: "Current Lighting Solutions",
      url: "https://cdn.currentlighting.com/site/brochure/SIGN120-Signage-Catalog.pdf",
    },
    {
      id: "sloanled-flexibrite",
      title: "FlexiBRITE (discontinued) product page and product list",
      publisher: "SloanLED",
      url: "https://sloanled.com/collection/signage/border-tubing-accent-signage/flexibrite-signage/",
    },
    {
      id: "lsrc-lifetime",
      title: "LED Luminaire Lifetime: Recommendations for Testing and Reporting, 3rd ed.",
      publisher: "NGLIA LED Systems Reliability Consortium / U.S. Department of Energy (2014)",
      url: "https://www.energy.gov/sites/prod/files/2015/01/f19/led_luminaire_lifetime_guide_sept2014.pdf",
    },
    {
      id: "sott-neon-led",
      title: "Neon vs. LED: Which Is Better Where?",
      publisher: "Signs of the Times (2023)",
      url: "https://signsofthetimes.com/neon-vs-led-which-is-better-where/",
    },
    {
      id: "isa-ul48",
      title: "UL 48 Standard for Electric Signs",
      publisher: "International Sign Association",
      url: "https://signs.org/codes-regulations/technical-codes-and-standards/ul-48-standard-for-electric-signs/",
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
      publisher: "UL (2014)",
      url: "https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/UL-TCAEC-2014-Fall-v3.pdf",
    },
    {
      id: "ul-markings",
      title: "Listed Signs: Markings and Installation Instructions (The Code Authority)",
      publisher: "UL (2012)",
      url: "https://code-authorities.ul.com/wp-content/uploads/sites/40/2015/02/Electrical-Connections-Issue-3-2012.pdf",
    },
    {
      id: "nyc-sign-permit",
      title: "Sign Permit Requirements",
      publisher: "NYC Department of Buildings",
      url: "https://www.nyc.gov/site/buildings/safety/sign-permit-reqs.page",
    },
    {
      id: "ul-class2",
      title: "Protection from Electrical Hazards (FAQ)",
      publisher: "UL Solutions",
      url: "https://www.ul.com/resources/protection-electrical-hazards",
    },
    {
      id: "puls-class2",
      title: "The PULS Advantage, Issue 11: NEC Class 2 Power Supplies",
      publisher: "PULS North America (2025)",
      url: "https://www.pulspower.com/wp-content/uploads/2023/10/The-PULS-Advantage-Issue-11-NEC-Class-2-Power-Supplies-Aug-2025.pdf",
    },
    {
      id: "isa-permits",
      title: "Permitting Resources",
      publisher: "International Sign Association",
      url: "https://signs.org/codes-regulations/expert-assistance/permit/",
    },
    {
      id: "pvc-photodegradation",
      title: "Polyphosphates as Inhibitors for Poly(vinyl Chloride) Photodegradation",
      publisher: "Molecules (2017), via PubMed Central",
      url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6150225/",
    },
    {
      id: "doe-thermal",
      title: "Thermal Management of White LEDs (fact sheet)",
      publisher: "U.S. Department of Energy (2007)",
      url: "https://www1.eere.energy.gov/buildings/publications/pdfs/ssl/thermal_led_feb07_2.pdf",
    },
    {
      id: "gemini-halo",
      title: "Lit Fabricated Metal Halo Lit: Specifications, Mounting, and Installation",
      publisher: "Gemini Product Guide",
      url: "https://hub.geminimade.com/knowledge/fabricated-metal-halo-lit-product-specifications",
    },
    {
      id: "acrylite-edge-lit",
      title: "ACRYLITE LED light guiding edge lit, Technical Information 3735D (09/24)",
      publisher: "ACRYLITE (Röhm/POLYVANTIS)",
      url: "https://www.acrylite.co/files/content/acrylite.co/documents/product-information/ACRYLITE-LED-light-guiding-edge-lit-Technical-Information.pdf",
    },
    {
      id: "mimaki-uv-ink",
      title: "UV-curable ink",
      publisher: "Mimaki",
      url: "https://mimaki.com/supply/ink/uv-curable.html",
    },
    {
      id: "mimaki-uv-weather",
      title: "How about the weather resistance for UV ink? (FAQ)",
      publisher: "Mimaki",
      url: "https://mimaki.com/support/faq/ink/entry-58452.html",
    },
    {
      id: "roland-eco-uv",
      title: "ECO-UV Ink Features",
      publisher: "Roland DG (Europe)",
      url: "https://www.rolanddg.eu/en/products/inks/eco-uv-inks/features",
    },
  ],
  sourcesAccessedOn: "2026-09-24",
  related: [
    {
      href: "/business-signs/channel-letter-signs",
      label: "Channel letter signs",
      description: "Stainless-steel letters, front-lit, halo-lit or dual-lit, for exterior façades or interiors, with IP67-rated LED modules.",
    },
    {
      href: "/business-signs/lightbox-signs",
      label: "Slim LED lightbox signs",
      description: "Edge-lit lightboxes under an inch deep: indoor as standard, with outdoor-rated options.",
    },
    {
      href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
      label: "Front-lit vs halo-lit vs dual-lit",
      description: "How channel letter lighting styles differ, and what the wall behind them needs.",
    },
    {
      href: "/guides/custom-business-sign-cost",
      label: "What drives the cost of a business sign",
      description: "What moves a quote, from size and lighting style to an indoor or outdoor build.",
    },
  ],
  cta: {
    heading: "Tell us where your sign will hang",
    text: "Send your design, a photo of the spot and whether it is covered or exposed. Your free mockup and WhatsApp quote come back with the right build specified.",
    label: "Get a Free Mockup and Quote",
    productName: "outdoor LED neon sign",
    secondary: { href: "/products/custom-neon-signs", label: "Custom LED neon signs" },
  },
  hub: {
    category: "Outdoor & weather",
    summary: "What IP65, IP66, IP67 and IP68 mean, why a strip's rating is not the sign's, and what US rules ask of an outdoor sign.",
  },
};
