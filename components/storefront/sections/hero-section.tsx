"use client";

import {
  ArrowLeft,
  ArrowRight,
  Lightning,
  Palette,
  PencilLine,
  ShieldCheck,
  Sparkle,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import TextType from "@/components/TextType";
import { DELIVERY, WARRANTY } from "@/lib/claims";

const CAROUSEL_DURATION = 5500;

/**
 * The homepage hero is dedicated to custom LED neon signs, the product with
 * by far the largest search demand on the keyword map ("neon signs" 40.5k,
 * "custom neon signs" 33.1k, "led neon signs" 12.1k, "neon name sign" 2.9k
 * US/mo). The other three sign types have their own section further down the
 * page and their own hub at /business-signs.
 *
 * ── Copy rules ──────────────────────────────────────────────────────────────
 *
 * - The H1 carries the head term once, in the words people search.
 * - The intro is a 40–60 word definition-first answer that stands alone if an
 *   answer engine lifts it: what a custom LED neon sign is, what it is made
 *   of, who it is for, and the one fact that de-risks the purchase (the free
 *   mockup before payment).
 * - Claims come from lib/claims.ts or the catalog only. "Mockup in 24h"
 *   is an approved claim, replacing the unverified "~2 hours" claim.
 *
 * ── Slides ──────────────────────────────────────────────────────────────────
 *
 * Every slide is a neon sign in the setting people buy one for, and each one
 * links to the page for that setting, so the carousel doubles as the
 * homepage's route into the occasion pages. Every photo is a real 600 × 600
 * shop listing image of a finished sign, with the alt text the collection
 * pages already use for it.
 */
type NeonSlide = {
  id: string;
  /** Dot label and the visible tag on the slide. */
  label: string;
  href: string;
  /** A real 600 × 600 shop listing photograph. */
  image: string;
  alt: string;
  /** Glow colour of the sign in the photo; tints the carousel chrome. */
  accent: string;
};

const NEON_SLIDES: readonly NeonSlide[] = [
  {
    id: "name",
    label: "Neon name signs",
    href: "/products/custom-neon-signs",
    image: "/neon-sign/Custom name/iap_600x600.6574462695_efoprbvt.webp",
    alt: "Woman holding a warm white LED neon script sign reading Savannah in her living room",
    accent: "#ffe7b8",
  },
  {
    id: "bar",
    label: "Home bar neon signs",
    href: "/custom-signage/bar-neon-signs",
    image: "/images/homebar-main.jpeg",
    alt: "Cyan 'Brad's Bar EST. 2026' LED neon sign with border glowing on acrylic above a bar counter",
    accent: "#38bdf8",
  },
  {
    id: "wedding",
    label: "Wedding & proposal neon signs",
    href: "/custom-signage/wedding-signs",
    image: "/neon-sign/Marriage/iap_600x600.6280886797_59j146av.webp",
    alt: "White Will You Marry Me neon sign on a gold hoop arch draped in white fabric and red roses",
    accent: "#ffd39a",
  },
  {
    id: "kids",
    label: "Kids’ room neon signs",
    href: "/custom-signage/kids-room-neon-signs",
    image: "/images/kids-bedroom-main.jpeg",
    alt: "Pink 'Melanie' LED neon script sign glowing above a white vanity desk in a girl's bedroom",
    accent: "#ff5fb0",
  },
  {
    id: "gaming",
    label: "Gaming neon signs",
    href: "/custom-signage/gaming-neon-signs",
    image: "/neon-sign/Game Room/iap_600x600.6072503848_qdloxd4q.webp",
    alt: "Green Game On LED neon sign above two kids playing on dual monitors in a gaming den",
    accent: "#39e27a",
  },
  {
    id: "home",
    label: "Bedroom & living room neon signs",
    href: "/custom-signage/home-decor-signs",
    image: "/neon-sign/room/iap_600x600.8069307682_6sin2ngi.webp",
    alt: "Warm white The Dohertys neon script on a charcoal wall above a taupe sofa with olive cushions",
    accent: "#f5e6c8",
  },
];

/**
 * The rotating end of the display line. The first entry is what reduced-motion
 * users and the accessible text see; the longest is measured invisibly so the
 * line never changes width while it types.
 */
const HEADLINE_ENDINGS = [
  "light up your wall.",
  "say your name.",
  "glow at your wedding.",
  "sell after dark.",
  "turn heads.",
];

const LONGEST_HEADLINE_ENDING = HEADLINE_ENDINGS.reduce((longest, entry) =>
  entry.length > longest.length ? entry : longest,
);

/** 60 words. Definition first, maker second, risk-reducer last. Optimized for AEO/GEO to directly answer "what is it", "who is it for", and "why choose us". */
const HERO_ANSWER =
  "Custom designed neon signs from The Glownique are handmade to order in flexible LED neon, not glass: your name, words or custom logo signs, mounted on clear acrylic and run at a safe 12V. We make lighted business signs and custom name neon signs for bedrooms, weddings, and bars in 13 colours or RGB, and send a free true-to-scale mockup before you pay.";

const HERO_FACTS = [
  { icon: PencilLine, title: "Free true-to-scale mockup", text: "Approve design before you pay" },
  { icon: Palette, title: "13 colours + RGB", text: "Any font, name or logo" },
  { icon: Lightning, title: "12V LED neon", text: "No glass tubes, no gas" },
  { icon: ShieldCheck, title: WARRANTY.term, text: DELIVERY.short },
] as const;

export function HeroSection() {
  const pointerStartRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const { reducedMotion } = useStorefront();
  const activeHero = NEON_SLIDES[activeSlide];

  const goToSlide = useCallback(
    (requested: number) => {
      const nextIndex = (requested + NEON_SLIDES.length) % NEON_SLIDES.length;
      if (nextIndex === activeSlide) return;
      setActiveSlide(nextIndex);
    },
    [activeSlide],
  );

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (carouselPaused || !pageVisible || reducedMotion) return;
    const timer = window.setTimeout(() => goToSlide(activeSlide + 1), CAROUSEL_DURATION);
    return () => window.clearTimeout(timer);
  }, [activeSlide, carouselPaused, goToSlide, pageVisible, reducedMotion]);

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const delta = event.clientX - pointerStartRef.current;
    if (Math.abs(delta) < 45) return;
    goToSlide(activeSlide + (delta < 0 ? 1 : -1));
  };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__copy shell-edge">
        {/* The H1 is the visible pill and carries the head term exactly once. */}
        <div className="hero__eyebrow-wrap">
          <h1 id="hero-heading" className="hero__badge">
            <Sparkle className="w-3.5 h-3.5" weight="fill" aria-hidden="true" />
            <span>Neon Signs, Handmade to Order</span>
          </h1>
        </div>

        {/* The display line. Its accessible text is exactly the static version;
            the typing animation stays out of the accessibility tree. */}
        <h2 className="hero-title">
          <span className="sr-only">Custom neon signs made to {HEADLINE_ENDINGS[0]}</span>
          <span className="hero-title__line" aria-hidden="true">
            Custom neon signs made to
          </span>
          <span className="hero-title__line hero-title__line--accent" aria-hidden="true">
            <span className="hero-title__accent-reserve">
              <span className="hero-title__accent-measure premium-accent-text">
                {LONGEST_HEADLINE_ENDING}
              </span>
              {reducedMotion ? (
                <span className="premium-accent-text hero-title__accent-static">
                  {HEADLINE_ENDINGS[0]}
                </span>
              ) : (
                <TextType
                  as="span"
                  text={HEADLINE_ENDINGS}
                  className="premium-accent-text hero-title__accent-type"
                  cursorCharacter="▌"
                  cursorClassName="hero-title__accent-cursor"
                  typingSpeed={68}
                  variableSpeed={{ min: 45, max: 110 }}
                  deletingSpeed={32}
                  pauseDuration={2200}
                  initialDelay={650}
                  loop
                />
              )}
            </span>
          </span>
        </h2>

        <p className="hero__intro">{HERO_ANSWER}</p>

        <div className="hero__actions">
          <a className="button button--primary hero-btn--primary" href="#color-studio">
            <span>Design your own neon sign</span>
            <span className="hero-btn__icon-circle" aria-hidden="true">
              <ArrowRight weight="bold" />
            </span>
          </a>
          <Link className="button button--secondary hero-btn--secondary" href="/products/custom-neon-signs">
            <span>Shop custom neon signs</span>
          </Link>
        </div>

        <ul className="hero-facts" aria-label="What every custom neon sign includes">
          {HERO_FACTS.map(({ icon: Icon, title, text }) => (
            <li key={title} className="hero-fact-item">
              <span className="hero-fact__icon-wrap">
                <Icon weight="bold" />
              </span>
              <div className="hero-fact__text">
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`hero-showcase${carouselPaused ? " is-paused" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Custom neon signs by occasion"
        style={{ "--slide-accent": activeHero.accent } as CSSProperties}
        tabIndex={0}
        onMouseEnter={() => setCarouselPaused(true)}
        onMouseLeave={() => setCarouselPaused(false)}
        onFocus={() => setCarouselPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setCarouselPaused(false);
          }
        }}
        onPointerDown={(event) => {
          pointerStartRef.current = event.clientX;
        }}
        onPointerUp={handlePointerUp}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") goToSlide(activeSlide + 1);
          if (event.key === "ArrowLeft") goToSlide(activeSlide - 1);
        }}
      >
        <svg
          className="hero-curve hero-curve--desktop"
          viewBox="0 0 160 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-curve-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff2b84" />
              <stop offset="0.48" stopColor="#f40b68" />
              <stop offset="1" stopColor="#6d26ff" />
            </linearGradient>
            <filter id="hero-curve-glow" x="-80%" y="-20%" width="260%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path className="hero-curve__fill" d="M0 0H104C157 118 56 220 105 345C153 467 41 570 111 700H0Z" />
          <path
            className="hero-curve__line"
            pathLength="1"
            d="M104 0C157 118 56 220 105 345C153 467 41 570 111 700"
          />
          <path
            className="hero-curve__trail"
            pathLength="1"
            d="M104 0C157 118 56 220 105 345C153 467 41 570 111 700"
          />
        </svg>

        <svg
          className="hero-curve hero-curve--mobile"
          viewBox="0 0 700 92"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="hero-curve-gradient-mobile" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ff2b84" />
              <stop offset="0.52" stopColor="#f40b68" />
              <stop offset="1" stopColor="#6d26ff" />
            </linearGradient>
          </defs>
          <path className="hero-curve__fill" d="M0 0H700V24C570 87 448 20 332 58C202 100 104 34 0 83Z" />
          <path className="hero-curve__line" pathLength="1" d="M700 24C570 87 448 20 332 58C202 100 104 34 0 83" />
          <path className="hero-curve__trail" pathLength="1" d="M700 24C570 87 448 20 332 58C202 100 104 34 0 83" />
        </svg>

        <div className="hero-slides">
          {NEON_SLIDES.map((slide, index) => {
            const active = index === activeSlide;
            return (
              <article
                key={slide.id}
                className={`hero-slide hero-slide--neon${active ? " is-active" : ""}`}
                aria-hidden={!active}
                inert={!active}
              >
                {/* The photos are 16:9 and the pane is near-square, so a
                    full-bleed crop cut the sign's own words off. The pane is
                    filled by a small, blurred copy instead, and the photo sits
                    whole in a frame lit by its own glow colour. */}
                <Image
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="160px"
                  loading={index === 0 ? "eager" : "lazy"}
                  className="hero-slide__backdrop"
                />
                <div className="hero-slide__frame">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 1024px) 88vw, 560px"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                  />
                  <Link href={slide.href} className="hero-slide__tag">
                    <span className="hero-slide__tag-dot" aria-hidden="true" />
                    {slide.label}
                    <ArrowRight weight="bold" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        <div className="hero-controls">
          <button
            className="carousel-arrow carousel-prev"
            type="button"
            aria-label="Previous neon sign"
            onClick={() => goToSlide(activeSlide - 1)}
          >
            <IconBox icon={ArrowLeft} />
          </button>
          <div className="carousel-dots" role="tablist" aria-label="Choose a neon sign occasion">
            {NEON_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                className={`carousel-dot${index === activeSlide ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Show ${slide.label.toLowerCase()}`}
                onClick={() => goToSlide(index)}
              >
                <span key={`${activeSlide}-${index}`} />
              </button>
            ))}
          </div>
          <button
            className="carousel-arrow carousel-next"
            type="button"
            aria-label="Next neon sign"
            onClick={() => goToSlide(activeSlide + 1)}
          >
            <IconBox icon={ArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}
