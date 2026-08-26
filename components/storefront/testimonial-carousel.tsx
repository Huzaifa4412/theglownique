"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StoreIcon } from "@/components/storefront/store-icon";
import { useStorefront } from "@/components/storefront/storefront-context";
import { testimonials } from "@/lib/store-data";

export function TestimonialCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { reducedMotion } = useStorefront();

  const scrollToIndex = useCallback(
    (requestedIndex: number) => {
      const index =
        (requestedIndex + testimonials.length) % testimonials.length;
      const track = trackRef.current;
      const slide = track?.children.item(index) as HTMLElement | null;
      if (!track || !slide) return;

      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: reducedMotion ? "auto" : "smooth",
      });
      setActiveIndex(index);
    },
    [reducedMotion],
  );

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || scrollFrameRef.current !== null) return;

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const slide = child as HTMLElement;
        const distance = Math.abs(
          slide.offsetLeft + slide.clientWidth / 2 - center,
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
      scrollFrameRef.current = null;
    });
  }, []);

  useEffect(
    () => () => {
      if (scrollFrameRef.current !== null) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }
    },
    [],
  );

  return (
    <div className="testimonial-carousel" aria-label="Customer testimonials">
      <div className="testimonial-carousel__spark testimonial-carousel__spark--one" aria-hidden="true">✦</div>
      <div className="testimonial-carousel__spark testimonial-carousel__spark--two" aria-hidden="true">✦</div>
      <div
        ref={trackRef}
        className="testimonial-track"
        onScroll={handleScroll}
        role="region"
        aria-label="Scrollable customer testimonials"
        tabIndex={0}
      >
        {testimonials.map((item, index) => (
          <div
            className={`testimonial-slide${index === activeIndex ? " is-active" : ""}`}
            key={item.name}
            role="group"
            aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
          >
            <article className="review-card">
              {/* Stars and the "Verified" badge render only when the review
                  data actually carries them — never as a hardcoded default. */}
              {(item.stars || item.verified) && (
                <div className="review-card__topline">
                  {item.stars ? (
                    <div
                      className="review-stars"
                      aria-label={`${item.stars} out of 5 stars`}
                    >
                      {"★".repeat(Math.round(item.stars))}
                    </div>
                  ) : null}
                  {item.verified ? (
                    <span className="review-card__verified">
                      <StoreIcon name="SealCheck" /> Verified
                    </span>
                  ) : null}
                </div>
              )}
              <span className="review-card__quote-mark" aria-hidden="true">“</span>
              <blockquote>{item.quote}</blockquote>
              <footer>
                <span className="avatar">{item.initials}</span>
                <div>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </div>
                <span className="review-card__shine" aria-hidden="true">✦</span>
              </footer>
            </article>
          </div>
        ))}
      </div>
      <div className="testimonial-carousel__controls">
        <div className="testimonial-carousel__pagination" aria-label="Choose testimonial">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={index === activeIndex ? "is-active" : ""}
              aria-label={`Show testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
        <div className="testimonial-carousel__arrows">
          <button type="button" className="testimonial-carousel__arrow" aria-label="Previous testimonial" onClick={() => scrollToIndex(activeIndex - 1)}><span aria-hidden="true">←</span></button>
          <button type="button" className="testimonial-carousel__arrow" aria-label="Next testimonial" onClick={() => scrollToIndex(activeIndex + 1)}><span aria-hidden="true">→</span></button>
        </div>
      </div>
    </div>
  );
}
