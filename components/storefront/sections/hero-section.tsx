"use client";

import {
  ArrowLeft,
  ArrowRight,
  LockKey,
  PencilLine,
  ShieldCheck,
  Sparkle,
  Truck,
} from "@phosphor-icons/react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import homeImage from "@/app/assets/hero/home.webp";
import { IconBox } from "@/components/icon-box";
import { useStorefront } from "@/components/storefront/storefront-context";
import TextType from "@/components/TextType";
import { DELIVERY } from "@/lib/claims";
import { categoryLabels, heroSlides } from "@/lib/store-data";

const CAROUSEL_DURATION = 5500;

/**
 * The rotating second line of the headline. The first entry is what
 * reduced-motion users see, and the longest entry is measured invisibly so
 * the line never changes width while it types.
 */
const HEADLINE_ENDINGS = [
  "light up everything.",
  "turn heads.",
  "stand out.",
  "define brands.",
  "glow bright.",
];

const LONGEST_HEADLINE_ENDING = HEADLINE_ENDINGS.reduce((longest, entry) =>
  entry.length > longest.length ? entry : longest,
);

/** Shared by both crops of slide 4, which are the same picture. */
const LIGHTBOX_SLIDE_ALT =
  "Client concept sketch beside a finished ultra-thin slim LED lightbox by The Glownique";

export function HeroSection() {
  const pointerStartRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const { reducedMotion } = useStorefront();
  const activeHero = heroSlides[activeSlide];

  const goToSlide = useCallback(
    (requested: number) => {
      const nextIndex =
        (requested + heroSlides.length) % heroSlides.length;

      if (nextIndex === activeSlide) return;
      setActiveSlide(nextIndex);
    },
    [activeSlide],
  );

  useEffect(() => {
    const handleVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (carouselPaused || !pageVisible || reducedMotion) return;
    const timer = window.setTimeout(
      () => goToSlide(activeSlide + 1),
      CAROUSEL_DURATION,
    );
    return () => window.clearTimeout(timer);
  }, [
    activeSlide,
    carouselPaused,
    goToSlide,
    pageVisible,
    reducedMotion,
  ]);

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const delta = event.clientX - pointerStartRef.current;
    if (Math.abs(delta) < 45) return;
    goToSlide(activeSlide + (delta < 0 ? 1 : -1));
  };

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__copy shell-edge">
        {/* The H1 is the visible pill: it says what the business makes, in the
            words buyers search. It replaced an sr-only keyword chain that
            differed from anything a sighted visitor could see — hidden text to
            search engines, and a different headline to screen readers. */}
        <div className="hero__eyebrow-wrap">
          <h1 id="hero-heading" className="hero__badge">
            <Sparkle className="w-3.5 h-3.5" weight="fill" aria-hidden="true" />
            <span>Custom LED Neon &amp; Business Signs</span>
          </h1>
        </div>

        {/* The display line. Its accessible text is exactly what is on screen;
            the typing animation stays out of the accessibility tree and out of
            the H1, so neither the cursor glyph nor the width-reserve copy ends
            up in the page's headline. */}
        <p className="hero-title">
          <span className="sr-only">Custom signs built to light up everything.</span>
          <span className="hero-title__line" aria-hidden="true">
            Custom signs built to
          </span>
          <span
            className="hero-title__line hero-title__line--accent"
            aria-hidden="true"
          >
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
        </p>

        <p className="hero__intro">
          Design your bespoke neon sign for your home, business, wedding, or
          event. Handcrafted with commercial-grade silicone &amp; stainless
          steel. Approve your free true-to-scale mockup before you pay.
        </p>

        <div className="hero__actions">
          <a className="button button--primary hero-btn--primary" href="#custom">
            <span>Design Your Sign</span>
            <span className="hero-btn__icon-circle" aria-hidden="true">
              <ArrowRight weight="bold" />
            </span>
          </a>
          <a className="button button--secondary hero-btn--secondary" href="#categories">
            <span>Explore Sign Crafts</span>
          </a>
        </div>

        <ul className="hero-facts" aria-label="Order guarantees">
          <li className="hero-fact-item">
            <span className="hero-fact__icon-wrap">
              <PencilLine weight="bold" />
            </span>
            <div className="hero-fact__text">
              <strong>Free 1:1 Scale Mockup</strong>
              <span>Ready in ~2 hours</span>
            </div>
          </li>
          <li className="hero-fact-item">
            <span className="hero-fact__icon-wrap">
              <ShieldCheck weight="bold" />
            </span>
            <div className="hero-fact__text">
              <strong>5-Year Studio Warranty</strong>
              <span>Commercial 12V build</span>
            </div>
          </li>
          <li className="hero-fact-item">
            <span className="hero-fact__icon-wrap">
              <LockKey weight="bold" />
            </span>
            <div className="hero-fact__text">
              <strong>Secure Etsy Checkout</strong>
              <span>Pay after you approve</span>
            </div>
          </li>
          <li className="hero-fact-item">
            <span className="hero-fact__icon-wrap">
              <Truck weight="bold" />
            </span>
            <div className="hero-fact__text">
              <strong>Tracked Shipping</strong>
              <span>{DELIVERY.supporting}</span>
            </div>
          </li>
        </ul>
      </div>

      <div
        className={`hero-showcase${carouselPaused ? " is-paused" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured illuminated craft collections"
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
          if (event.key === "ArrowRight") {
            goToSlide(activeSlide + 1);
          }
          if (event.key === "ArrowLeft") {
            goToSlide(activeSlide - 1);
          }
        }}
      >
        <svg
          className="hero-curve hero-curve--desktop"
          viewBox="0 0 160 700"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="hero-curve-gradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0" stopColor="#ff2b84" />
              <stop offset="0.48" stopColor="#f40b68" />
              <stop offset="1" stopColor="#6d26ff" />
            </linearGradient>
            <filter
              id="hero-curve-glow"
              x="-80%"
              y="-20%"
              width="260%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            className="hero-curve__fill"
            d="M0 0H104C157 118 56 220 105 345C153 467 41 570 111 700H0Z"
          />
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
            <linearGradient
              id="hero-curve-gradient-mobile"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0" stopColor="#ff2b84" />
              <stop offset="0.52" stopColor="#f40b68" />
              <stop offset="1" stopColor="#6d26ff" />
            </linearGradient>
          </defs>
          <path
            className="hero-curve__fill"
            d="M0 0H700V24C570 87 448 20 332 58C202 100 104 34 0 83Z"
          />
          <path
            className="hero-curve__line"
            pathLength="1"
            d="M700 24C570 87 448 20 332 58C202 100 104 34 0 83"
          />
          <path
            className="hero-curve__trail"
            pathLength="1"
            d="M700 24C570 87 448 20 332 58C202 100 104 34 0 83"
          />
        </svg>

        <div className="hero-slides">
          {heroSlides.map((slide, index) => (
            <article
              key={slide.id}
              className={`hero-slide${index === activeSlide ? " is-active" : ""}${index === 0 ? " hero-slide--neon" : ""}${index === 3 ? " hero-slide--lightbox" : ""}`}
              aria-hidden={index !== activeSlide}
            >
              {index === 1 ? (
                activeSlide === 1 ? (
                  <video
                    src="/3d-metallic-neon-sign/videos/2.mp4"
                    poster="/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp"
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-slide__video"
                  />
                ) : (
                  <Image
                    src="/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.webp"
                    alt="Corporate 3D metal channel-letter sign with illuminated lettering"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 58vw"
                    loading="lazy"
                  />
                )
              ) : index === 2 ? (
                activeSlide === 2 ? (
                  <video
                    src="/3d-arcylic/videos/25763cbb2ca6866a574a4dde5853343c.mp4"
                    poster="/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.webp"
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hero-slide__video"
                  />
                ) : (
                  <Image
                    src="/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.webp"
                    alt="3D acrylic UV-print neon sign with a glowing contour outline"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 58vw"
                    loading="lazy"
                  />
                )
              ) : index === 3 ? (
                <div className="hero-slide__lightbox-frame">
                  <Image
                    src="/ultra-thin-slim-lightbox/main-hero.webp"
                    alt={LIGHTBOX_SLIDE_ALT}
                    fill
                    sizes="(max-width: 1024px) 75vw, 58vw"
                    loading="lazy"
                    className="hero-slide__art--wide"
                  />
                  <Image
                    src="/ultra-thin-slim-lightbox/main-hero-small-screen.webp"
                    alt={LIGHTBOX_SLIDE_ALT}
                    fill
                    sizes="100vw"
                    loading="lazy"
                    className="hero-slide__art--tall"
                  />
                </div>
              ) : (
                <Image
                  src={homeImage}
                  alt="Aesthetic sun-drenched room with Good Vibes Good Life LED neon sign"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 58vw"
                  loading="eager"
                  fetchPriority="high"
                  className="hero-slide__img"
                />
              )}
            </article>
          ))}
        </div>

        <div className="hero-controls">
          <button
            className="carousel-arrow carousel-prev"
            type="button"
            aria-label="Previous collection"
            onClick={() => goToSlide(activeSlide - 1)}
          >
            <IconBox icon={ArrowLeft} />
          </button>
          <div
            className="carousel-dots"
            role="tablist"
            aria-label="Choose featured collection"
          >
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`carousel-dot${index === activeSlide ? " is-active" : ""}`}
                type="button"
                role="tab"
                aria-selected={index === activeSlide}
                aria-label={`Show ${categoryLabels[slide.id]}`}
                onClick={() => goToSlide(index)}
              >
                <span key={`${activeSlide}-${index}`} />
              </button>
            ))}
          </div>
          <button
            className="carousel-arrow carousel-next"
            type="button"
            aria-label="Next collection"
            onClick={() => goToSlide(activeSlide + 1)}
          >
            <IconBox icon={ArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}
