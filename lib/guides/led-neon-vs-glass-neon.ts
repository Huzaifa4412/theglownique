import type { Guide } from "@/lib/guides/types";

/**
 * LED neon vs glass neon: the comparison page for "led neon vs glass neon".
 *
 * Every technical statement is cited to a source in
 * SEO-Optimization/growth-system/research/technical-fact-base.md; everything
 * said about The Glownique restates lib/product-catalog.ts or the approved
 * business model. Deliberately absent: a percentage energy saving, an hour
 * figure for LED life, a sign-level IP rating and any listing. The fact base
 * does not support them. Two points buyers expect, the "360-degree" glow of a
 * glass tube and claims about its warmer character, are also left out: the
 * fact base has no source for either.
 */
export const guide: Guide = {
  slug: "led-neon-vs-glass-neon",
  metaTitle: "LED Neon vs Glass Neon: Which Is Better?",
  metaDescription:
    "LED neon vs glass neon, compared honestly: how each makes light, voltage, published power figures, what LED life ratings mean, and where glass still wins.",
  h1: "LED Neon vs. Glass Neon: Where Each One Wins",
  kicker: "Neon comparison guide",
  answer:
    "LED neon vs glass neon comes down to the original versus a practical imitation. Glass neon is gas glowing inside a hand-bent glass tube, driven by a high-voltage transformer. LED neon is a line of LEDs in a flexible silicone or PVC jacket, usually on low-voltage DC. Choose glass for authentic light, heritage and repairability; choose LED for no glass tubes, no gas and easier installation.",
  publishedOn: "2026-09-24",
  updatedOn: "2026-09-24",
  primaryKeyword: "led neon vs glass neon",
  secondaryKeywords: [
    "glass neon vs LED neon",
    "is LED neon real neon",
    "which is better, LED or glass neon",
    "how glass neon works",
    "LED neon flex",
  ],
  image: {
    src: "/hero/neon-sign-hero.webp",
    alt: "A woman holds a white LED neon sign spelling Olivia in script, with small heart accents and a pink neon heart, on clear acrylic cut to the outline of the word",
    width: 1448,
    height: 1086,
    caption: "LED neon on clear acrylic, cut to the shape of the word.",
  },
  showHeroImage: true,
  sections: [
    {
      id: "at-a-glance",
      heading: "LED neon vs glass neon at a glance",
      blocks: [
        {
          type: "table",
          caption:
            "LED neon and glass neon compared by light source, power supply, power use, colour, gas, shaping, breakage, lifespan and repairs",
          columns: ["", "LED neon", "Glass neon"],
          rows: [
            [
              "Light source",
              "A line of LEDs inside a flexible silicone or PVC jacket that diffuses the light [^sloanled-street-wrap]",
              "Neon or argon gas glowing inside a sealed glass tube [^nps-brief-25]",
            ],
            [
              "Power supply",
              "Usually low-voltage DC, commonly 24V or 12V, from a separate driver [^current-contour-gen2][^glls-contour-12v]",
              "A transformer that typically delivers 1,000–15,000 volts [^iaei-neon-transformers]",
            ],
            [
              "Published power use",
              "About 1.6–3.7 W per foot [^current-contour-gen2][^sloanled-street-wrap]",
              "About 3.5–11 W per foot, depending on the transformer, colour and tube [^egl-neon-efficiency][^ecos-cpuc-2003]",
            ],
            [
              "Colour",
              "Coloured LEDs, or white LEDs behind a colour-matched jacket [^sloanled-street-wrap]",
              "The gas, the colour of the glass and phosphor coatings inside it [^nps-brief-25]",
            ],
            [
              "Gas and mercury",
              "No gas: it is LEDs in a polymer jacket [^sloanled-street-wrap]",
              "Neon or argon; most colours other than red also use mercury [^isa-mercury]",
            ],
            [
              "Shaping",
              "Cut only at marked points, and bent no tighter than a minimum radius [^sloanled-street-wrap]",
              "Hand-bent from hot glass by a skilled bender [^nps-brief-25]",
            ],
            [
              "If it breaks",
              "No glass tubes to break [^current-signage-catalog]",
              "Fragile glass; a broken tube on a live high-voltage circuit is a shock hazard [^sott-neon-vs-led-2023]",
            ],
            [
              "Lifespan",
              "Rated by when light output falls to 70% (L70); power supplies are a leading cause of failure [^doe-led-lifetime][^doe-lsrc-lifetime]",
              "20–25 years is typical, and some signs last 50 [^nps-brief-25]",
            ],
            [
              "Repairs",
              "Power supplies and connectors are often serviceable; it varies by product [^doe-led-lifetime]",
              "Specialist work: the gas doesn't wear out, and a tube can be re-pumped [^nps-brief-25]",
            ],
          ],
          note: "The Glownique's LED neon signs use flexible silicone LED neon on a 12V low-voltage adaptor, in 13 colours or RGB colour-change. They are built for indoors as standard, with an outdoor build available.",
        },
      ],
    },
    {
      id: "how-glass-neon-works",
      heading: "How does glass neon work?",
      blocks: [
        {
          type: "p",
          text: "A glass neon sign is a sealed glass tube with an electrode at each end, filled with neon or argon gas; in commercial signs, those are essentially the only two gases used. When high voltage drives a current through the tube, the gas glows [^nps-brief-25][^iaei-neon-transformers]. In the US, neon transformers typically deliver 1,000 to 15,000 volts at 20 to 60 milliamps to do it [^iaei-neon-transformers].",
        },
        {
          type: "p",
          text: "The gas gives the basic colour: neon glows red and mercury-argon glows blue. Other colours come from coloured glass and phosphor coatings inside the tube, so a green can be mercury-argon in yellow glass [^nps-brief-25][^isa-mercury].",
        },
        {
          type: "p",
          text: "Every tube is made by hand. A skilled glass bender shapes the hot tube, which is then purified by heating the glass and electrodes to burn off impurities, evacuated and filled with gas [^nps-brief-25].",
        },
      ],
    },
    {
      id: "is-led-neon-real-neon",
      heading: "Is LED neon real neon?",
      blocks: [
        {
          type: "p",
          text: "No. LED neon, often called LED neon flex, contains no neon gas. It is a continuous line of LEDs inside a flexible silicone or PVC jacket that diffuses their light to imitate a glass-neon line, and the sign industry markets it as a neon replacement, or faux neon [^sloanled-street-wrap][^sott-neon-vs-led-2023].",
        },
        {
          type: "p",
          text: "The LEDs sit on a flexible circuit and usually run on low-voltage DC from a separate power supply, or driver, that converts mains power [^current-contour-gen2][^current-signage-catalog]. Sign-industry lines commonly run on 24V and 12V lines exist [^current-contour-gen2][^glls-contour-12v], but some LED neon runs directly on 120V mains [^glls-s160-120v], so LED does not automatically mean low voltage. The Glownique's LED neon signs run on a 12V low-voltage adaptor.",
        },
        {
          type: "p",
          text: "For how a finished sign is built from it, see [how LED neon signs are made](/guides/how-led-neon-signs-are-made).",
        },
      ],
    },
    {
      id: "where-glass-neon-wins",
      heading: "Where does glass neon still win?",
      blocks: [
        {
          type: "p",
          text: "Glass neon is the original that LED neon imitates, and on four counts it is still ahead.",
        },
        {
          type: "defs",
          items: [
            {
              term: "It is the real thing",
              detail:
                "In glass neon, the light is the gas itself glowing inside the tube [^nps-brief-25]; LED neon diffuses a line of LEDs to look like it [^sloanled-street-wrap]. If the brief calls for authentic neon, only glass meets it.",
            },
            {
              term: "Light output per foot",
              detail:
                "A neon supplier gives about 150 lumens per foot for standard 15 mm white neon [^egl-neon-efficiency], and a recent white LED neon datasheet lists 123 [^current-contour-gen2]. The tests differ, so treat it as a rough guide, but some LED neon does put out less light per foot than glass.",
            },
            {
              term: "It can be repaired",
              detail:
                "The gas doesn't wear out; failures come from broken tubes, electrodes or transformers [^nps-brief-25]. Flicker can point to a failing transformer, or to gas pressure that needs the tube re-pumped, and repairs are work for a specialist, not an amateur [^nps-brief-25][^france-neon-transformers].",
            },
            {
              term: "Craft and heritage",
              detail:
                "Each tube is bent by hand, and the craft has a long history: the US National Park Service covers neon in its guidance on preserving historic signs [^nps-brief-25].",
            },
          ],
        },
      ],
    },
    {
      id: "where-led-neon-wins",
      heading: "Where does LED neon win?",
      blocks: [
        {
          type: "p",
          text: "LED neon's advantages are practical ones.",
        },
        {
          type: "defs",
          items: [
            {
              term: "Low voltage",
              detail:
                "Glass neon needs a transformer delivering thousands of volts [^iaei-neon-transformers]. LED neon usually runs on low-voltage DC [^current-contour-gen2], and The Glownique's LED neon signs run on a 12V low-voltage adaptor. The adaptor itself still plugs into a mains socket, so treat it like any other mains appliance.",
            },
            {
              term: "No glass tubes to break",
              detail:
                "Glass is fragile, and a broken tube on a live high-voltage circuit is a shock hazard, a liability concern raised for busy venues [^sott-neon-vs-led-2023]. LED neon has no glass tubes, and one sign-lighting maker markets its version as impact-resistant [^current-signage-catalog]. The acrylic backboard can still break: acrylic has 10 to 20 times the impact strength of ordinary plate glass, and if it does break, it cracks into large pieces with much less sharp edges [^acrylite-acrylic-vs-glass].",
            },
            {
              term: "No gas, no mercury",
              detail:
                "Most glass neon colours other than red contain mercury, and in the US, tubes containing mercury are regulated as universal waste [^isa-mercury]. LED neon has no gas at all [^sloanled-street-wrap], and The Glownique's LED neon contains no mercury.",
            },
            {
              term: "Colour-change and dimming",
              detail:
                "A glass tube's colour comes from its gas, its glass and its phosphor coating [^nps-brief-25]. An LED neon sign can switch colour: The Glownique makes [custom LED neon signs](/products/custom-neon-signs) in 13 colours or RGB colour-change, with optional dimming from 1 to 100% on a wireless remote.",
            },
            {
              term: "Cut and formed on site",
              detail:
                "Where glass needs a skilled bender working hot tube [^nps-brief-25], LED neon can be cut and formed in the field [^current-signage-catalog]. It has limits: it can be cut only at the maker's marked points, and every product has a minimum bend radius [^current-contour-gen2][^sloanled-street-wrap], which the design has to respect.",
            },
            {
              term: "Easier to install, and shipped to you",
              detail:
                "Sign shops report that LED neon is easier to install and service [^sott-neon-vs-led-2023]. The Glownique doesn't install; it makes every sign to order and sends it with [tracked worldwide delivery](/shipping), with the shipping cost confirmed in your quote.",
            },
          ],
        },
      ],
    },
    {
      id: "power-use",
      heading: "Does LED neon use less power than glass neon?",
      blocks: [
        {
          type: "p",
          text: "Usually, but the gap depends on which glass neon you compare it with. Published figures vary with the transformer, the colour and the tube [^egl-neon-efficiency][^ecos-cpuc-2003], so read them as ranges, not as a promise for any one sign.",
        },
        {
          type: "table",
          caption: "Published power figures for glass neon and LED neon, in watts per foot",
          columns: ["Source", "Watts per foot", "What was measured"],
          rows: [
            [
              "Glass neon: California energy-code analysis, 2007",
              "8.5 [^pge-case-2007]",
              "An assumed load for neon and cold-cathode signs",
            ],
            [
              "Glass neon: utility-programme proposal, 2003",
              "About 11 [^ecos-cpuc-2003]",
              "Neon in channel letters, from manufacturer data",
            ],
            [
              "Glass neon: trade-magazine bench test, 2006",
              "About 10 [^sott-channel-letter-2006]",
              "One letter: about 5 ft of 12 mm red neon on a magnetic transformer",
            ],
            [
              "Glass neon: neon supplier, 2005–06",
              "3.5–4 [^egl-neon-efficiency]",
              "Electronic transformers; the supplier is an interested party",
            ],
            [
              "LED neon: Current Tetra Contour Gen 2",
              "1.6–2.2 [^current-contour-gen2]",
              "The whole system, from the datasheet",
            ],
            [
              "LED neon: SloanLED Street Wrap Flex",
              "About 3.7 [^sloanled-street-wrap]",
              "12 W per metre, from the datasheet",
            ],
          ],
          note: "Watts per foot says nothing about how bright a sign is [^egl-neon-efficiency].",
        },
        {
          type: "p",
          text: "Set side by side, every LED figure here is less than half the older magnetic-transformer figures of 8.5 to 11 W per foot [^pge-case-2007][^ecos-cpuc-2003]. Against the neon supplier's 3.5 to 4 W per foot, LED ranges from less than half to slightly more [^egl-neon-efficiency][^current-contour-gen2][^sloanled-street-wrap].",
        },
        {
          type: "p",
          text: "Brightness is the other catch. In the 2006 bench test, the LED letter was about a third as bright as the neon one [^sott-channel-letter-2006]. The more recent lumen figures above put white LED neon far closer to glass, but compare light output, not just watts.",
        },
        {
          type: "p",
          text: "Two more traps. Flat percentage savings you may see quoted appear to trace back to early utility-programme estimates built on a neon baseline of about 10 W per foot [^ecos-cpuc-2003], and we found no recent government or standards-body test comparing the two at equal brightness. And for glass neon, go by real watts, not volt-amps: one 15,000-volt magnetic transformer draws about 450 VA but only about 202 W of real power [^france-neon-transformers].",
        },
      ],
    },
    {
      id: "lifespan",
      heading: "Which lasts longer, LED or glass neon?",
      blocks: [
        {
          type: "p",
          text: "Glass neon has the longer track record: the US National Park Service puts a neon sign's typical life at 20 to 25 years, and some last 50 [^nps-brief-25]. LED lifespans are quoted in a different way, so it helps to know what the number means.",
        },
        {
          type: "p",
          text: "LEDs rarely fail outright; they dim. An **L70** rating is the time until light output falls to 70% of where it started, usually stated for the point at which half of a test sample gets there (L70-B50). It is a projection from lab tests on the LED package, and it covers dimming only [^doe-led-lifetime].",
        },
        {
          type: "p",
          text: "What the rating leaves out is everything around the LEDs. The US Department of Energy notes that a system can't outlast its shortest-lived component, and names the driver as the weak link in some LED products [^doe-led-lifetime]. An industry consortium working with the DOE found power and driver components at the top of its members' list of observed failures [^doe-lsrc-lifetime].",
        },
        {
          type: "p",
          text: "Heat matters too. One LED-neon datasheet rates the same strip more than a quarter lower at 50 °C than at 25 °C [^glls-contour-12v], and the consortium's rule of thumb is that electronics last roughly twice as long for every 10 °C cooler they run [^doe-lsrc-lifetime].",
        },
        {
          type: "p",
          text: "So a blanket claim that LED neon outlasts glass needs evidence for the specific product. The Glownique's LED neon signs use long-life LEDs; to get the most from any LED sign, keep its power supply dry and ventilated.",
        },
      ],
    },
    {
      id: "outdoors",
      heading: "Can LED neon or glass neon go outdoors?",
      blocks: [
        {
          type: "p",
          text: "What matters outdoors is the whole sign, not the rating on one part. An IP rating on LED neon usually describes the strip: one maker rates its strip IP68 only with appropriately rated accessories [^glls-contour-12v]. IP67 means a part passed a temporary-immersion test, and it doesn't cover water jets unless the part is dual-rated, such as IP66/IP67 [^castle-ipx7].",
        },
        {
          type: "p",
          text: "Water tends to get in at the joins. One maker's IP67 strip ships with silicone end caps and adhesive to seal its cut ends [^sloanled-street-wrap], and water can travel along inside a cable's jacket into an enclosure [^castle-ipx7]. Some neon fabricators consider entry-level LED products better suited to interiors [^sott-neon-vs-led-2023]. Glass neon has its own rule, indoors or out: in the US, tubing that pedestrians can readily reach must be protected from physical damage [^isa-nec].",
        },
        {
          type: "p",
          text: "The Glownique's LED neon signs are built for indoors as standard, and an outdoor build is available. It is a different construction, so tell us where the sign will hang and the quote will specify it; an indoor sign shouldn't be moved outside. Our [indoor vs outdoor signs guide](/guides/indoor-vs-outdoor-illuminated-signs) covers IP ratings in full.",
        },
      ],
    },
    {
      id: "which-is-better",
      heading: "So which is better, LED or glass neon?",
      blocks: [
        {
          type: "p",
          text: "Neither wins everywhere. Match the technology to the job:",
        },
        {
          type: "list",
          items: [
            "**Choose glass neon** when real neon is the point: restoring a historic sign, or a hand-made piece that a specialist can keep repairing for decades.",
            "**Choose LED neon** for homes, [weddings](/custom-signage/wedding-signs) and busy venues where people can reach the sign: it runs on low voltage and has no glass tubes to break.",
            "**Choose LED neon** for colour-change or dimming, or for a business logo; see [custom logo neon signs](/business-signs/custom-logo-neon-signs).",
            "**In a leased unit**, read the landlord's sign criteria before choosing either: some ban exposed neon [^vestar-sign-criteria].",
            "**Setting a budget?** See [what drives the cost of a custom sign](/guides/custom-business-sign-cost).",
          ],
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How can you tell if a sign is LED neon or glass neon?",
      a: "Look at the tubing and what powers it. Glass neon is rigid glass tube with an electrode at each end, lit by glowing gas and driven by a high-voltage transformer. LED neon is a flexible silicone or PVC jacket over a line of LEDs, usually fed by a separate low-voltage power supply. Don't handle a glass neon sign while it is on: a broken tube on a live circuit is a shock hazard.",
    },
    {
      q: "Is glass neon still made, or has LED replaced it?",
      a: "It is still made. Skilled glass benders still shape neon tubes by hand, and the US electrical code still has rules for installing neon tubing. The sign industry markets LED neon flex as a replacement, but glass neon is not obsolete.",
    },
    {
      q: "Can you leave an LED neon sign on all the time?",
      a: "You can, and The Glownique's LED neon is made to glow for hours at a stretch. But LED ratings count hours of use, so a sign left on around the clock reaches its rated hours nearly five times sooner than one lit for five hours each evening, and heat shortens the life of the electronics. Keep the power supply dry and ventilated, and switch the sign off, or put it on a plug-in timer, when nobody is there to see it.",
    },
    {
      q: "How do you work out what a neon sign costs to run?",
      a: "Multiply the sign's power in watts by the hours it is lit, divide by 1,000 to get kilowatt-hours, then multiply by the price per kWh on your electricity bill. Use real watts, ideally read from a plug-in power meter. With glass neon, don't use a transformer's volt-amp figure instead: a magnetic neon transformer can draw more than twice as many volt-amps as real watts.",
    },
    {
      q: "How do you hang an LED neon sign?",
      a: "Each Glownique LED neon sign arrives ready to hang, on wall standoffs or with a hanging kit, and plugs in through its 12V low-voltage adaptor, so an indoor sign needs no wiring. The Glownique doesn't install, so pick a spot within reach of a socket, where the adaptor can stay dry and ventilated.",
    },
    {
      q: "How do you get a custom LED neon sign made?",
      a: "Send The Glownique your wording, logo or sketch on WhatsApp, with the size you want and where the sign will hang. You get a free design mockup and a quote, with the shipping cost confirmed in it. Every sign is then made to order, paid for through our Etsy shop, where eligible orders are covered by Etsy Purchase Protection, and sent with tracked worldwide delivery.",
    },
  ],
  // In order of first citation, so the numbers rise through the page.
  sources: [
    {
      id: "sloanled-street-wrap",
      title: "Street Wrap Flex Side-Bend Spec Sheet (Rev B, 2025-10-01)",
      publisher: "SloanLED",
      url: "https://sloanled.com/downloads/street-wrap-flex-side-bend-spec-sheet-global.pdf",
    },
    {
      id: "nps-brief-25",
      title: "Preservation Brief 25: The Preservation of Historic Signs",
      publisher: "National Park Service, M. J. Auer",
      url: "https://www.nps.gov/orgs/1739/upload/preservation-brief-25-signs.pdf",
    },
    {
      id: "current-contour-gen2",
      title: "Tetra Contour Gen 2 Spec Sheet (SIGN309, Rev 11/07/24)",
      publisher: "Current Lighting Solutions",
      url: "https://cdn.currentlighting.com/site/specsheet/SIGN309-Tetra-Contour-Gen2-Spec-Sheet.pdf",
    },
    {
      id: "glls-contour-12v",
      title: "Vivid Contour Silicone 12V Static spec (v6.0, 04/15/2022)",
      publisher: "GLLS",
      url: "https://assets-global.website-files.com/6526c8266f9d6acac8ef145f/654d279ad1a1e45a2d6af395_Vivid-Contour-Silicone-12V-Static.pdf",
    },
    {
      id: "iaei-neon-transformers",
      title: "Determining Proper Loading for Neon Sign Transformers",
      publisher: "IAEI Magazine (2000)",
      url: "https://iaeimagazine.org/2000/2000january/determining-proper-loading-for-neon-sign-transformers/",
    },
    {
      id: "egl-neon-efficiency",
      title: "Dispelling the \"Inefficient Neon\" Myth",
      publisher: "B. Diffin, EGL Company (2005–06; hosted by neon-lighting.com)",
      url: "https://www.neon-lighting.com/wp-content/uploads/2020/09/LED-Vs-NEON-neonefficiency1.pdf",
    },
    {
      id: "ecos-cpuc-2003",
      title: "Proposal to CPUC: Solid-State Signs Program",
      publisher: "Ecos Consulting (2003)",
      url: "https://files.cpuc.ca.gov/eep/EcosConsulting/ecos_solid_state_signs_proposal_final0.pdf",
    },
    {
      id: "isa-mercury",
      title: "Mercury Lamp Handling & Disposal",
      publisher: "International Sign Association",
      url: "https://signs.org/codes-regulations/federal-regulations/mercury-issues/mercury-lamp-handling-disposal/",
    },
    {
      id: "current-signage-catalog",
      title: "Tetra LED Signage Lighting Systems Catalog 2024 (SIGN120)",
      publisher: "Current Lighting Solutions",
      url: "https://cdn.currentlighting.com/site/brochure/SIGN120-Signage-Catalog.pdf",
    },
    {
      id: "sott-neon-vs-led-2023",
      title: "Neon vs. LED: Which Is Better Where?",
      publisher: "Signs of the Times (2023)",
      url: "https://signsofthetimes.com/neon-vs-led-which-is-better-where/",
    },
    {
      id: "doe-led-lifetime",
      title: "Lifetime and Reliability (SSL fact sheet, PNNL-SA-97534)",
      publisher: "U.S. DOE / PNNL (2013)",
      url: "https://www1.eere.energy.gov/buildings/publications/pdfs/ssl/life-reliability_fact-sheet.pdf",
    },
    {
      id: "doe-lsrc-lifetime",
      title: "LED Luminaire Lifetime: Recommendations for Testing and Reporting, 3rd ed.",
      publisher: "NGLIA LED Systems Reliability Consortium / U.S. DOE (2014)",
      url: "https://www.energy.gov/sites/prod/files/2015/01/f19/led_luminaire_lifetime_guide_sept2014.pdf",
    },
    {
      id: "glls-s160-120v",
      title: "Vivid S160 PVC 120V UL2388 Static spec",
      publisher: "GLLS",
      url: "https://assets-global.website-files.com/6526c8266f9d6acac8ef145f/654d2768e4d1c7acb17137bf_Vivid-S160-PVC-120V-UL2388-Static.pdf",
    },
    {
      id: "france-neon-transformers",
      title: "FAQ: Neon Transformers",
      publisher: "FRANCE transformer literature, hosted by neon-lighting.com",
      url: "https://www.neon-lighting.com/wp-content/uploads/2020/09/FAQ-Neon-Transformers.pdf",
    },
    {
      id: "acrylite-acrylic-vs-glass",
      title: "Acrylic vs Glass",
      publisher: "ACRYLITE knowledge base",
      url: "https://www.acrylite.co/resources/knowledge-base/article/properties?category=acrylic-vs-glass",
    },
    {
      id: "pge-case-2007",
      title: "2008 Title 24 Rulemaking, Draft Report: Requirements for Signs (CASE)",
      publisher: "PG&E for the California Energy Commission (2007)",
      url: "https://efiling.energy.ca.gov/GetDocument.aspx?tn=46126",
    },
    {
      id: "sott-channel-letter-2006",
      title: "A Channel-Letter Comparison",
      publisher: "Signs of the Times (2006)",
      url: "https://signsofthetimes.com/a-channel-letter-comparison/",
    },
    {
      id: "castle-ipx7",
      title: "IPX7 & IPX8 Immersion Testing",
      publisher: "Castle Compliance (test lab)",
      url: "https://castle-compliance.com/ipx7-ipx8-immersion-testing/",
    },
    {
      id: "isa-nec",
      title: "Guidelines for Application of 2011 NEC Changes in Electric Sign Requirements",
      publisher: "International Sign Association (2012)",
      url: "http://nxt-live-books.s3.amazonaws.com/pub/nxtbooks/csg/isa_2011nec_guidelines/offline/csg_isa_2011nec_guidelines.pdf",
    },
    {
      id: "vestar-sign-criteria",
      title: "Exhibit B: General Sign Criteria for Shopping Center",
      publisher: "Vestar (example landlord sign criteria)",
      url: "https://vestartenantservices.com/wp-content/uploads/2021/01/Sign-Approval-Criteria.pdf",
    },
  ],
  sourcesAccessedOn: "2026-09-24",
  related: [
    {
      href: "/guides/how-led-neon-signs-are-made",
      label: "How LED neon signs are made",
      description: "How a custom LED neon sign is built, from your artwork to the finished sign.",
    },
    {
      href: "/guides/indoor-vs-outdoor-illuminated-signs",
      label: "Indoor vs outdoor illuminated signs",
      description: "What IP ratings do and don't tell you, and what a sign needs to live outside.",
    },
    {
      href: "/guides/sign-size-viewing-distance",
      label: "Sign size and viewing distance",
      description: "How big a sign should be for its wall and for the distance it is read from.",
    },
    {
      href: "/guides/custom-business-sign-cost",
      label: "Custom business sign cost",
      description: "What drives the price of LED neon, channel letters, lightboxes and acrylic logo signs.",
    },
  ],
  cta: {
    heading: "See your design in LED neon before you order",
    text: "Send your wording, logo or sketch on WhatsApp and we'll reply with a free design mockup and a quote. Every sign is made to order, and the mockup comes first.",
    label: "Get a Free LED Neon Mockup",
    productName: "custom LED neon sign",
    secondary: { href: "/products/custom-neon-signs", label: "Custom LED neon signs" },
  },
  hub: {
    category: "Neon technology",
    summary:
      "How LED neon and glass neon differ in light, voltage, power use, lifespan and repairs, with published figures, and where each one wins.",
  },
};
