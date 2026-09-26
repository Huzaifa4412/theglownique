"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export type ZigzagImage = { src: string; alt: string };

type ZigzagMediaProps = {
  /** Sign type name, for the carousel's accessible label. */
  label: string;
  images: readonly ZigzagImage[];
  caption: string;
  /** Staggers the three rows so they never change on the same beat. */
  offsetMs?: number;
};

const INTERVAL = 4800;

/**
 * The rotating photo on one zig-zag row.
 *
 * Every photo is rendered in the HTML with its alt text, so crawlers and image
 * search see the whole set; only the active one is visible. The change plays
 * the same "switch-on" effect as the hero (CSS in signage-sections.css).
 *
 * It only advances while the row is on screen, the tab is visible, the
 * visitor is not hovering or focused inside it, and reduced motion is off. The
 * corner thumbnail always previews the next photo and advances on click.
 */
export function ZigzagMedia({ label, images, caption, offsetMs = 0 }: ZigzagMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);
  const count = images.length;
  const next = (active + 1) % count;
  const firstDelay = INTERVAL / 2 + offsetMs;
  /** The progress bar runs only while the timer does, for the same length. */
  const running = count > 1 && !paused && inView && !reduced;

  const goTo = useCallback((index: number) => setActive((index + count) % count), [count]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (count < 2 || paused || !inView || reduced || document.hidden) return;
    const delay = started ? INTERVAL : firstDelay;
    const timer = window.setTimeout(() => {
      setStarted(true);
      setActive((current) => (current + 1) % count);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [active, count, firstDelay, inView, paused, reduced, started]);

  return (
    <div
      ref={rootRef}
      className={`zigzag-row__media${running ? "" : " is-paused"}`}
      style={{ "--zz-duration": `${started ? INTERVAL : firstDelay}ms` } as CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} photos`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="zigzag-row__main">
        {images.map((image, index) => {
          const isActive = index === active;
          return (
            <div
              key={image.src}
              className={`zz-slide${isActive ? " is-active" : ""}`}
              aria-hidden={!isActive}
            >
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 520px, 92vw" />
              <span className="zz-slide__sheen" aria-hidden="true" />
            </div>
          );
        })}

        <span className="zigzag-row__caption">
          <span aria-hidden="true" className="zigzag-row__dot" />
          {caption}
        </span>

        {count > 1 ? (
          <div className="zz-dots">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={`zz-dot${index === active ? " is-active" : ""}`}
                aria-label={`Show photo ${index + 1} of ${count}`}
                aria-current={index === active}
                onClick={() => goTo(index)}
              >
                <span key={`${active}-${index}`} />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {count > 1 ? (
        <button
          type="button"
          className="zigzag-row__inset"
          aria-label={`Next photo: ${images[next].alt}`}
          onClick={() => goTo(next)}
        >
          <span key={next} className="zz-inset">
            <Image src={images[next].src} alt="" fill sizes="220px" />
          </span>
          <span className="zz-inset__label" aria-hidden="true">
            Next <span>→</span>
          </span>
        </button>
      ) : null}
    </div>
  );
}
