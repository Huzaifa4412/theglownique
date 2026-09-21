"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useStorefront } from "@/components/storefront/storefront-context";
import { ETSY_SHOP_URL } from "@/lib/site";
import {
  categoryLabels,
  products,
  testimonials,
  type CategoryId,
} from "@/lib/store-data";
import styles from "./studio-home.module.css";

export function StudioCatalog() {
  const {
    activeCategory,
    search,
    changeSearch,
    chooseCategory,
    clearFilters,
    openProduct,
  } = useStorefront();
  const [expanded, setExpanded] = useState(false);
  const query = search.trim().toLowerCase();
  const filtered = products.filter(
    (product) =>
      (activeCategory === "all" || product.category === activeCategory) &&
      (!query ||
        `${product.name} ${categoryLabels[product.category]}`
          .toLowerCase()
          .includes(query)),
  );
  const shown =
    expanded || query || activeCategory !== "all"
      ? filtered
      : filtered.slice(0, 4);
  return (
    <section
      className={styles.section}
      id="shop"
      aria-labelledby="catalog-heading"
    >
      <div className={styles.sectionHeading} data-reveal>
        <span className={styles.sectionIndex} aria-hidden="true">03</span>
        <div>
          <p className={styles.kicker}>The design edit</p>
          <h2 id="catalog-heading">Find your starting point.</h2>
        </div>
        <label className={styles.search}>
          <span className="sr-only">Search the catalog</span>
          <input
            type="search"
            placeholder="Find a sign…"
            value={search}
            onChange={(event) => changeSearch(event.target.value)}
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>
      <div className={styles.filters} role="group" aria-label="Filter products">
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          onClick={() => chooseCategory("all")}
        >
          All designs
        </button>
        {Object.entries(categoryLabels).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={activeCategory === id}
            onClick={() => chooseCategory(id as CategoryId)}
          >
            {label}
          </button>
        ))}
      </div>
      <p className={styles.resultCount} aria-live="polite">
        {shown.length} of {filtered.length} designs · Made to your size and
        colour
      </p>
      <div className={styles.catalogGrid} data-reveal>
        {shown.map((product) => (
          <article className={styles.product} key={product.id}>
            <button
              type="button"
              onClick={() => openProduct(product)}
              aria-label={`Customize ${product.name}`}
            >
              <div className={styles.productImage}>
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 600px) 46vw, (max-width: 900px) 45vw, 23vw"
                  />
                )}
                <span className={styles.productAction} aria-hidden="true">
                  Make it yours ↗
                </span>
              </div>
              <h3>{product.name}</h3>
              <p>
                {product.signType} <span>↗</span>
              </p>
            </button>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className={styles.empty}>
          <h3>No matching designs.</h3>
          <p>Try a different phrase or explore all signs.</p>
          <button
            className={styles.primary}
            type="button"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
      {!query && activeCategory === "all" && filtered.length > 4 && (
        <button
          className={styles.more}
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded
            ? "Show fewer designs −"
            : `Explore all ${filtered.length} designs +`}
        </button>
      )}
    </section>
  );
}

export function StudioWallPreview() {
  const [position, setPosition] = useState(50);
  return (
    <div className={styles.wallPreview}>
      <Image
        src="/before-after/before.webp"
        alt="Salon reception wall before adding illuminated logo lettering"
        fill
        sizes="(max-width: 800px) 100vw, 52vw"
      />
      <div
        className={styles.afterImage}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src="/before-after/after.webp"
          alt="The same reception wall with a warm halo-lit Osée Beauty sign"
          fill
          sizes="(max-width: 800px) 100vw, 52vw"
        />
      </div>
      <span className={styles.beforeLabel}>Before</span>
      <span className={styles.afterLabel}>With a little glow</span>
      <div className={styles.compareLine} style={{ left: `${position}%` }}>
        <span aria-hidden="true">↔</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Compare the wall before and after adding a sign"
        aria-valuetext={`${position}% of the illuminated design shown`}
      />
      <span className={styles.previewNote}>
        Design visualisation · Drag to compare
      </span>
    </div>
  );
}

/**
 * Typewriter for the hero's serif line.
 *
 * Dependency-free on purpose: the repo's TextType component pulls GSAP into
 * whatever bundle imports it, and the homepage keeps GSAP strictly behind the
 * deferred motion loader. A pair of setTimeout loops is all a typewriter
 * needs.
 *
 * SEO and accessibility contract: the server renders the FIRST phrase in
 * full, twice — once visually (this component's initial state) and once in a
 * static sr-only span the parent owns — so crawlers and screen readers always
 * get the complete headline. The animated text is aria-hidden; under
 * prefers-reduced-motion the first phrase simply stays put, caret and all
 * animation omitted.
 */
export function HeroTypewriter({
  phrases,
  startDelayMs = 2600,
  typeMs = 62,
  deleteMs = 30,
  holdMs = 2300,
}: {
  phrases: readonly string[];
  startDelayMs?: number;
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
}) {
  const [display, setDisplay] = useState(phrases[0] ?? "");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (phrases.length < 2) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let phraseIndex = 0;
    let charIndex = (phrases[0] ?? "").length;
    let deleting = true;

    const tick = (delay: number) => {
      timer = setTimeout(step, delay);
    };
    const step = () => {
      if (cancelled) return;
      const phrase = phrases[phraseIndex] ?? "";
      if (deleting) {
        charIndex -= 1;
        setDisplay(phrase.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          tick(420);
        } else {
          tick(deleteMs);
        }
      } else {
        charIndex += 1;
        const next = phrases[phraseIndex] ?? "";
        setDisplay(next.slice(0, charIndex));
        if (charIndex >= next.length) {
          deleting = true;
          tick(holdMs);
        } else {
          // A little human jitter so it doesn't read as a metronome.
          tick(typeMs + Math.random() * 45);
        }
      }
    };

    setAnimating(true);
    tick(startDelayMs);
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [phrases, startDelayMs, typeMs, deleteMs, holdMs]);

  return (
    <span className={styles.typeSlot} aria-hidden="true">
      {display}
      {animating && <span className={styles.typeCaret} />}
    </span>
  );
}

// The colour preview moved to studio-color-studio.tsx: the full Interactive
// Colour Studio (real sign photo, 14 shades, RGBA Party) replaced the old
// six-swatch glowing-word teaser.

/** How long each review holds before the carousel advances on its own. */
const REVIEW_INTERVAL_MS = 7000;
/** A horizontal drag longer than this counts as a swipe. */
const SWIPE_THRESHOLD_PX = 44;

/**
 * The review carousel. Every entry is a verified Etsy review straight from
 * lib/store-data.ts — the same integrity rule as before (see
 * HAS_VERIFIED_REVIEWS in lib/site.ts), just all of them instead of one.
 *
 * Auto-advances with a visible progress line; pauses on hover and on
 * keyboard focus, never auto-plays under prefers-reduced-motion, and can be
 * driven by the arrows, a swipe, or left/right arrow keys.
 */
export function StudioReviews() {
  const reviews = testimonials.filter((item) => item.verified);
  const count = reviews.length;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const dragStartX = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  // Auto-advance, unless the visitor is reading (hover/focus), asked for
  // reduced motion, or there is nothing to advance to.
  useEffect(() => {
    if (paused || reducedMotion || count < 2) return;
    const timer = setInterval(
      () => setIndex((current) => (current + 1) % count),
      REVIEW_INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, [paused, reducedMotion, count]);

  if (count === 0) return null;
  const review = reviews[index];
  const autoPlaying = !paused && !reducedMotion && count > 1;

  return (
    <section
      className={`${styles.section} ${styles.reviews}`}
      aria-roledescription="carousel"
      aria-labelledby="reviews-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(index - 1);
        if (event.key === "ArrowRight") goTo(index + 1);
      }}
    >
      <div className={styles.sectionHeading} data-reveal>
        <div>
          <p className={styles.kicker}>Notes from Etsy customers</p>
          <h2 id="reviews-heading">
            Real signs,
            <br />
            in <em>real rooms.</em>
          </h2>
        </div>
        <a
          className={styles.textLink}
          href={ETSY_SHOP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read customer reviews on Etsy ↗
        </a>
      </div>

      <div
        className={styles.reviewCard}
        onPointerDown={(event) => {
          dragStartX.current = event.clientX;
        }}
        onPointerUp={(event) => {
          if (dragStartX.current === null) return;
          const delta = event.clientX - dragStartX.current;
          dragStartX.current = null;
          if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
          goTo(delta > 0 ? index - 1 : index + 1);
        }}
        onPointerCancel={() => {
          dragStartX.current = null;
        }}
      >
        {review.image && (
          /* Our own product photography for context — described by its own
             alt text, never presented as the buyer's photo. Keyed so each
             review's photo plays its entrance. */
          <div className={styles.reviewMedia} key={`photo-${index}`}>
            <Image
              src={review.image}
              alt={review.imageAlt ?? ""}
              fill
              sizes="(max-width: 800px) 100vw, 42vw"
            />
            <span className={styles.reviewsPhotoTag}>From the studio</span>
          </div>
        )}

        <div className={styles.reviewBody} aria-live="polite">
          {/* Keyed on the index so each review mounts fresh and plays its
              entrance; the progress line restarts the same way. */}
          <figure className={styles.reviewSlide} key={index}>
            {review.stars ? (
              <p
                className={styles.reviewStars}
                aria-label={`Rated ${review.stars} out of 5 stars`}
              >
                <span aria-hidden="true">{"★".repeat(review.stars)}</span>
              </p>
            ) : null}
            <blockquote className={styles.reviewQuote}>
              “{review.quote}”
            </blockquote>
            <figcaption className={styles.reviewAuthor}>
              <span className={styles.reviewInitial} aria-hidden="true">
                {review.initials}
              </span>
              <span>
                <strong>{review.name}</strong> — {review.role}
              </span>
            </figcaption>
          </figure>

          <div className={styles.reviewFooter}>
            <p className={styles.reviewsCount}>
              <span>{String(index + 1).padStart(2, "0")}</span> /{" "}
              {String(count).padStart(2, "0")}
            </p>
            {count > 1 && (
              <span className={styles.reviewsProgress} aria-hidden="true">
                <span
                  key={`progress-${index}`}
                  className={styles.reviewsProgressBar}
                  data-playing={autoPlaying || undefined}
                />
              </span>
            )}
            <div
              className={styles.reviewNav}
              role="group"
              aria-label="Review navigation"
            >
              <button
                type="button"
                className={styles.reviewArrow}
                onClick={() => goTo(index - 1)}
                aria-label="Previous review"
              >
                ←
              </button>
              <button
                type="button"
                className={styles.reviewArrow}
                onClick={() => goTo(index + 1)}
                aria-label="Next review"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
