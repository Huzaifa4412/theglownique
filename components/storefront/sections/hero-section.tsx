"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ImageSquare,
  SealCheck,
  ShieldCheck,
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

import { IconBox } from "@/components/icon-box";
import { gsap, useGSAP } from "@/components/storefront/gsap";
import { useStorefront } from "@/components/storefront/storefront-context";
import TextType from "@/components/TextType";
import { categoryLabels, heroSlides } from "@/lib/store-data";

const CAROUSEL_DURATION = 5500;

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const previousSlideRef = useRef(0);
  const directionRef = useRef(1);
  const pointerStartRef = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const { chooseCategory, reducedMotion } = useStorefront();
  const activeHero = heroSlides[activeSlide];

  const goToSlide = useCallback(
    (requested: number, direction?: number) => {
      const nextIndex =
        (requested + heroSlides.length) % heroSlides.length;

      if (nextIndex === activeSlide) return;
      directionRef.current =
        direction ?? (nextIndex > activeSlide ? 1 : -1);
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
      () => goToSlide(activeSlide + 1, 1),
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

  useGSAP(
    () => {
      const previousIndex = previousSlideRef.current;
      if (previousIndex === activeSlide) return;

      const current = slideRefs.current[previousIndex];
      const next = slideRefs.current[activeSlide];
      const meta = heroRef.current?.querySelector(".slide-meta");

      previousSlideRef.current = activeSlide;
      if (!current || !next || !meta) return;

      if (reducedMotion) {
        gsap.set(current, { autoAlpha: 0, visibility: "hidden" });
        gsap.set(next, {
          autoAlpha: 1,
          visibility: "visible",
          xPercent: 0,
          scale: 1,
        });
        return;
      }

      const direction = directionRef.current;
      gsap.set(current, { visibility: "visible" });
      gsap.set(next, {
        visibility: "visible",
        autoAlpha: 0,
        xPercent: direction * 5,
        scale: 1.035,
      });

      gsap
        .timeline()
        .to(
          current,
          {
            autoAlpha: 0,
            xPercent: direction * -3,
            scale: 1.025,
            duration: 0.8,
          },
          0,
        )
        .to(
          next,
          {
            autoAlpha: 1,
            xPercent: 0,
            scale: 1,
            duration: 1.05,
            ease: "power3.inOut",
          },
          0.08,
        )
        .fromTo(
          meta.children,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.045 },
          0.34,
        )
        .set(current, { visibility: "hidden" });
    },
    {
      dependencies: [activeSlide, reducedMotion],
      scope: heroRef,
      revertOnUpdate: true,
    },
  );

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const delta = event.clientX - pointerStartRef.current;
    if (Math.abs(delta) < 45) return;
    goToSlide(activeSlide + (delta < 0 ? 1 : -1), delta < 0 ? 1 : -1);
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      aria-labelledby="hero-heading"
    >
      <div className="hero__copy shell-edge">
        <p className="eyebrow hero__eyebrow">
          <span aria-hidden="true" /> Custom-made LED neon
        </p>
        <h1 id="hero-heading" className="hero-title">
          <span className="sr-only">Light up what feels like you.</span>
          <span className="hero-title__line" aria-hidden="true">
            <span>Light up</span>
          </span>
          <span
            className="hero-title__line hero-title__line--accent"
            aria-hidden="true"
          >
            <span className="hero-title__accent-reserve">
              <span className="hero-title__accent-measure premium-accent-text">
                what glows
              </span>
              {reducedMotion ? (
                <span className="premium-accent-text hero-title__accent-static">
                  what feels
                </span>
              ) : (
                <TextType
                  as="span"
                  text={["what feels", "what looks", "what glows"]}
                  className="premium-accent-text hero-title__accent-type"
                  cursorCharacter="▌"
                  cursorClassName="hero-title__accent-cursor"
                  typingSpeed={72}
                  deletingSpeed={40}
                  pauseDuration={1450}
                  initialDelay={850}
                  loop
                  aria-hidden="true"
                />
              )}
            </span>
          </span>
          <span className="hero-title__line" aria-hidden="true">
            <span>like you.</span>
          </span>
        </h1>
        <p className="hero__intro">
          Turn your favourite words, logo or moment into handcrafted LED neon —
          previewed free, made to order, and ready to glow.
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href="#custom">
            Create your sign <IconBox icon={ArrowRight} />
          </a>
          <a className="button button--secondary" href="#shop">
            Explore the glow
          </a>
        </div>
        <div className="trust-row" aria-label="Store guarantees">
          <div>
            <IconBox icon={Truck} />
            <span>
              <strong>Free shipping</strong>Orders $99+
            </span>
          </div>
          <div>
            <IconBox icon={ShieldCheck} />
            <span>
              <strong>24-month</strong>Warranty
            </span>
          </div>
          <div>
            <IconBox icon={SealCheck} />
            <span>
              <strong>5,000+</strong>Happy customers
            </span>
          </div>
          <div>
            <IconBox icon={ImageSquare} />
            <span>
              <strong>Free</strong>Design preview
            </span>
          </div>
        </div>
      </div>

      <div
        className={`hero-showcase${carouselPaused ? " is-paused" : ""}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured neon collections"
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
            goToSlide(activeSlide + 1, 1);
          }
          if (event.key === "ArrowLeft") {
            goToSlide(activeSlide - 1, -1);
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
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={`hero-slide${index === activeSlide ? " is-active" : ""}${index === 0 ? " hero-slide--neon" : ""}`}
              aria-hidden={index !== activeSlide}
            >
              <Image
                src={index === 0 ? "/hero/neon-sign-hero.png" : slide.image}
                alt={index === 0 ? "Pink neon sign glowing in a dark room" : slide.alt}
                fill
                sizes="(max-width: 800px) 100vw, 58vw"
                fetchPriority={index === 0 ? "high" : "auto"}
                placeholder={index === 0 ? undefined : "blur"}
              />
            </article>
          ))}
          <div className="hero-scrim" aria-hidden="true" />
          <div className="slide-meta" aria-live="polite">
            <p className="slide-meta__eyebrow">{activeHero.eyebrow}</p>
            <h2>{activeHero.title}</h2>
            <p className="slide-meta__copy">{activeHero.copy}</p>
            <button
              className="slide-meta__link"
              type="button"
              onClick={() => chooseCategory(activeHero.id, true)}
            >
              Explore {categoryLabels[activeHero.id]}{" "}
              <IconBox icon={ArrowUpRight} />
            </button>
          </div>
        </div>

        <div className="hero-controls">
          <button
            className="carousel-arrow carousel-prev"
            type="button"
            aria-label="Previous collection"
            onClick={() => goToSlide(activeSlide - 1, -1)}
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
            onClick={() => goToSlide(activeSlide + 1, 1)}
          >
            <IconBox icon={ArrowRight} />
          </button>
        </div>
      </div>
    </section>
  );
}
