import { DELIVERY } from "@/lib/claims";

/** Homepage copy and structured data share the same public facts. */
export const homeSignTypes = [
  {
    name: "LED neon",
    descriptor: "Your words, in light",
    href: "/products/custom-neon-signs",
    image: "/hero/neon-sign-hero.webp",
    alt: "A custom white Olivia LED neon name sign with pink hearts",
    detail: "Flexible LED tubing for names, phrases and line-art logos.",
  },
  {
    name: "3D metal letters",
    descriptor: "Give your brand dimension",
    href: "/products/3d-metal-neon-signs",
    image:
      "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp",
    alt: "Warm halo-lit Estudio Sur metal lettering on a dark reception wall",
    detail: "Channel letter signs with front, halo or dual illumination.",
  },
  {
    name: "Acrylic signs",
    descriptor: "Colour beyond the outline",
    href: "/products/uv-print-acrylic-signs",
    image: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.webp",
    alt: "Illuminated Sabroso acrylic lettering above a restaurant counter",
    detail: "UV-printed acrylic logo signs with illuminated detailing.",
  },
  {
    name: "Slim lightboxes",
    descriptor: "Put your artwork on display",
    href: "/products/ultra-thin-lightbox",
    image: "/ultra-thin-slim-lightbox/IMG-20260803-WA0010.webp",
    alt: "Custom illuminated lightbox sign with printed logo artwork",
    detail: "Edge-lit LED lightboxes for logos, menus and retail graphics.",
  },
] as const;

/**
 * The answer-engine paragraph (AEO/GEO). One self-contained, quotable
 * statement of what The Glownique is and does, rendered high on the page so
 * assistants and answer boxes can lift it whole. Wording follows the entity
 * statement in SEO-Optimization/04-us-market-and-competitors.md, adapted for
 * the full (business + consumer) audience. Every claim in it resolves to
 * lib/claims.ts or to standing copy elsewhere on the site — do not add a
 * figure here that the claims register does not hold.
 */
export const homeAnswer =
  "The Glownique is a custom sign studio that designs and handcrafts made-to-order illuminated signage: custom LED neon signs, metal channel letters, ultra-thin LED lightboxes and UV-printed acrylic logo signs for businesses, weddings and homes. Every project starts with a free design mockup, and every sign ships with tracked worldwide delivery.";

/**
 * The homepage's B2B routing row (SEO-Optimization/05 keyword map): the
 * homepage owns brand + category and passes commercial intent DOWN to the
 * industry pages instead of competing with them. All five are verified
 * head terms with live routes.
 */
export const homeBusinessLinks = [
  { label: "Channel letter signs", href: "/business-signs/channel-letter-signs" },
  { label: "Open signs", href: "/business-signs/open-signs" },
  { label: "Bar signs", href: "/business-signs/bar-signs" },
  { label: "Restaurant signs", href: "/business-signs/restaurant-signs" },
  { label: "Office signs", href: "/business-signs/office-signs" },
] as const;

/**
 * Phrases the hero headline types through. The first one is also rendered
 * statically (server-side and for screen readers), so search engines always
 * see the complete headline whatever the animation is doing.
 */
export const heroTypePhrases = [
  "Unmistakably yours.",
  "Built to glow.",
  "For your business.",
  "For your big day.",
] as const;

/**
 * The hero marquee. Short, claims-safe promises only: DELIVERY.short is the
 * approved shipping wording, and nothing here states a price, a lead time or
 * the warranty (validation_required — do not amplify).
 */
export const homeMarqueeItems = [
  "Made to order, made for you",
  "Free design preview",
  DELIVERY.short,
  "LED neon · channel letters · acrylic · lightboxes",
  "Designed with feeling. Built to glow.",
] as const;

export const homeFaqs = [
  {
    question: "How much does a custom neon sign cost?",
    answer:
      "The price depends on the size, sign type and complexity of your design. Share your idea and approximate dimensions for an itemised quote, including shipping, before you order.",
    href: "/guides/custom-business-sign-cost",
    link: "What affects the price",
  },
  {
    question: "How do I get a free design mockup and quote?",
    answer:
      "Send your wording or logo, an approximate size and a note about where the sign will hang — through WhatsApp or the contact form. You'll receive a free digital design mockup and an itemised quote to review, and production only begins once you approve both.",
    href: "/contact",
    link: "Start your free mockup",
  },
  {
    question: "Can I see my design before ordering?",
    answer:
      "Yes. Send your wording, logo or sketch for a free digital design preview. Review the layout, colour and dimensions with us before approving your sign for production.",
    href: "/contact",
    link: "Talk to the design team",
  },
  {
    question: "Which sign type is right for my space?",
    answer:
      "Choose LED neon for names and line-art designs, metal letters for dimensional branding, printed acrylic for detailed artwork, or a lightbox for an illuminated graphic. The wall, viewing distance and installation location also matter.",
    href: "/guides/front-lit-vs-halo-lit-vs-dual-lit",
    link: "Compare lighting styles",
  },
  {
    question: "Can I choose the colour and font of my sign?",
    answer:
      "Yes. Colour, font, size and backing are all set during your free design preview, so you approve exactly what will be made. You can also explore colour moods in the interactive colour studio before you enquire.",
    href: "/products/custom-neon-signs#color-studio",
    link: "Open the colour studio",
  },
  {
    question: "Can I order a sign for outdoor use?",
    answer:
      "Tell us that the sign will be outdoors when requesting your quote. We will confirm the suitable materials, electrical specification and mounting requirements for your location; an indoor sign should not be assumed suitable for outdoor use.",
    href: "/business-signs",
    link: "Explore business signage",
  },
  {
    question: "Do you make signs for events and occasions?",
    answer:
      "Yes. Alongside business signage, we make custom LED neon for weddings, parties, home decor and game rooms — each designed around your wording, colours and space, with a free preview before production.",
    href: "/custom-signage",
    link: "Browse signs by occasion",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes. The Glownique offers tracked worldwide delivery. Shipping cost and the production and delivery estimate for your project are confirmed with your quote. Tell us your event date or opening deadline when you enquire.",
    href: "/shipping",
    link: "Shipping information",
  },
  {
    question: "How will I mount my sign?",
    answer:
      "Mounting depends on the sign size, weight and wall surface. Share a photo of your wall so we can discuss the appropriate fixing method. Large or hardwired commercial signs may need a qualified installer.",
    href: "/guides/backlit-sign-wall-surfaces-and-standoffs",
    link: "Wall and mounting guide",
  },
] as const;

/**
 * Phrases the /custom-signage hero types through. Each names one of the six
 * occasion collections in the visitor's own words, so the typed line doubles
 * as a plain-language index of what the page covers. The first entry is also
 * rendered statically for crawlers and screen readers.
 */
export const occasionTypePhrases = [
  "days like these.",
  "the big day.",
  "their first room.",
  "game nights.",
  "last orders.",
  "the whole party.",
] as const;
