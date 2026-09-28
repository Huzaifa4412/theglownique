import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { ETSY_SHOP_URL } from "@/lib/site";
import { testimonials } from "@/lib/store-data";

import "./signage-sections.css";

/**
 * "Custom neon signs for every room and occasion": the second half of the
 * homepage neon story, directly under the neon hero.
 *
 * It is the homepage's category silo into the use-case pages (the SEO
 * strategy's "wedding / bar / name neon signs" landing pages): every card is a
 * real shop photograph of a finished sign and links to the page for that
 * setting, with the card title written as the query people type ("wedding
 * neon signs", "gaming neon signs", "neon bar signs").
 *
 * A verified Etsy review that names its use case sits beside the heading,
 * because answer engines lean on consensus about what a product was bought
 * for. The quote is read from lib/store-data.ts, which only ever holds real
 * transcribed reviews (HAS_VERIFIED_REVIEWS). No rating is marked up.
 *
 * Server component: no client JavaScript ships for this section.
 */

type UseCase = {
  title: string;
  text: string;
  href: string;
  image: string;
  alt: string;
  group: "Home & gifts" | "Occasions" | "Business";
  accent: string;
};

const USE_CASES: readonly UseCase[] = [
  {
    title: "Wedding neon signs",
    text: "Your names or vows for the backdrop, then a wall at home afterwards.",
    href: "/custom-signage/wedding-signs",
    image: "/neon-sign/wedding/iap_600x600.7378705048_ipwhq76b.webp",
    alt: "White 'Chloé Adelina' neon sign hanging on a blush pink draped backdrop between two peach floral arrangements",
    group: "Occasions",
    accent: "#ffd39a",
  },
  {
    title: "Kids’ room neon signs",
    text: "Their name in a glow soft enough to sleep under, dimmable at bedtime.",
    href: "/custom-signage/kids-room-neon-signs",
    image: "/images/kids-bedroom-main.jpeg",
    alt: "Pink 'Melanie' LED neon script sign glowing above a white vanity desk in a girl's bedroom",
    group: "Home & gifts",
    accent: "#ff7ac3",
  },
  {
    title: "Gaming neon signs",
    text: "A gamertag or logo behind the monitors, in RGB if the setup is RGB.",
    href: "/custom-signage/gaming-neon-signs",
    image: "/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp",
    alt: "Green 'Game On' LED neon sign above two kids playing on dual monitors in a framed-art gaming den",
    group: "Home & gifts",
    accent: "#39e27a",
  },
  {
    title: "Bedroom & living room signs",
    text: "A family name or a phrase you chose, on the wall you look at most.",
    href: "/custom-signage/home-decor-signs",
    image: "/neon-sign/room/iap_600x600.8069307682_6sin2ngi.webp",
    alt: "Warm white 'The Dohertys' neon script on a charcoal wall above a taupe sofa with olive cushions",
    group: "Home & gifts",
    accent: "#f5e6c8",
  },
  {
    title: "Home bar neon signs",
    text: "Name the bar, the mimosa corner or the garden shed pub.",
    href: "/custom-signage/bar-neon-signs",
    image: "/neon-sign/couples/iap_600x600.7040108540_5zyjqkus.webp",
    alt: "Two smiling people holding a pink 'Mimosa Corner' LED neon script sign in front of framed family photos",
    group: "Home & gifts",
    accent: "#ff5fb0",
  },
  {
    title: "Party & birthday neon signs",
    text: "One night in light for the party, and a keepsake after it.",
    href: "/custom-signage/event-signs",
    image: "/neon-sign/event/iap_600x600.6103087465_ikaxjhp9.webp",
    alt: "Yellow neon 'paletas' sign on a vintage white ice-cream cart under a ruffled parasol on a lawn",
    group: "Occasions",
    accent: "#ffcf3d",
  },
  {
    title: "Neon bar signs for venues",
    text: "Back-bar logos for pubs, cocktail bars and lounges.",
    href: "/business-signs/bar-signs",
    image: "/neon-sign/Bar/iap_600x600.5588358323_i7bgtidf.webp",
    alt: "Pink and white BAR neon sign on a blue-lit bar counter under string lights",
    group: "Business",
    accent: "#c04bff",
  },
  {
    title: "Gym neon signs",
    text: "Studio names and motivational walls for training floors.",
    href: "/business-signs/gym-fitness-signs",
    image: "/neon-sign/Gym/iap_600x600.7178660214_6320z3ec.webp",
    alt: "Green LED neon sign reading Whaley's Home Gym with a barbell graphic, glowing on a gym wall",
    group: "Business",
    accent: "#2fe38a",
  },
];

/** Long-tail neon queries, each pointing at the page that answers it. */
const NEON_IDEAS: readonly { label: string; href: string }[] = [
  { label: "How to choose a neon sign", href: "/blog/how-to-choose-a-custom-neon-sign" },
  { label: "Neon name signs", href: "/products/custom-neon-signs" },
  { label: "Proposal neon signs", href: "/custom-signage/wedding-signs" },
  { label: "Business logo neon signs", href: "/business-signs/custom-logo-neon-signs" },
  { label: "Neon open signs", href: "/business-signs/open-signs" },
  { label: "Salon neon signs", href: "/business-signs/salon-spa-signs" },
  { label: "Restaurant neon signs", href: "/business-signs/restaurant-signs" },
  { label: "LED neon vs glass neon", href: "/guides/led-neon-vs-glass-neon" },
  { label: "How LED neon signs are made", href: "/guides/how-led-neon-signs-are-made" },
  { label: "What size neon sign do I need?", href: "/guides/sign-size-viewing-distance" },
  { label: "Can neon signs go outdoors?", href: "/guides/indoor-vs-outdoor-illuminated-signs" },
];

/** The verified review that names its use case (a gift for a teenager's room). */
const REVIEW = testimonials[0];

export function NeonUseCasesSection() {
  return (
    <section id="neon-ideas" className="neon-uses" aria-labelledby="neon-uses-heading">
      <div className="signage-shell">
        <div className="neon-uses__head">
          <div>
            <p className="signage-eyebrow">Neon signs by occasion</p>
            <h2 id="neon-uses-heading" className="signage-h2">
              Custom LED neon signs for <em>every room and occasion</em>
            </h2>
            <p className="signage-lead">
              The same flexible 12V LED neon, built differently for where it hangs: soft and dimmable
              for a nursery, bold and colour-matched for a bar, sized perfectly for the photo booth at a
              wedding. Pick the setting and see real custom signs we have made for it.
            </p>
          </div>

          {REVIEW ? (
            <figure className="neon-uses__review">
              <p className="neon-uses__stars" aria-hidden="true">
                ★★★★★
              </p>
              <blockquote>
                <p>“{REVIEW.quote}”</p>
              </blockquote>
              <figcaption>
                <strong>{REVIEW.name}</strong>
                <span>{REVIEW.role}</span>
                {ETSY_SHOP_URL ? (
                  <a href={ETSY_SHOP_URL} target="_blank" rel="noopener noreferrer">
                    Read reviews on Etsy
                  </a>
                ) : null}
              </figcaption>
            </figure>
          ) : null}
        </div>

        <ul className="neon-uses__grid">
          {USE_CASES.map((item) => (
            <li key={item.href} style={{ "--card-accent": item.accent } as CSSProperties}>
              <Link href={item.href} className="neon-use">
                <div className="neon-use__media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 50vw"
                  />
                  <span className="neon-use__group">{item.group}</span>
                </div>
                <div className="neon-use__body">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="neon-use__more">
                    See designs <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <nav className="neon-ideas" aria-label="More neon sign ideas and guides">
          <p className="neon-ideas__label">More neon sign ideas</p>
          <ul>
            {NEON_IDEAS.map((idea) => (
              <li key={idea.label}>
                <Link href={idea.href}>{idea.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
