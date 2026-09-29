"use client";

import { useRef, type ReactNode } from "react";

/**
 * A horizontal row of cards with previous/next buttons.
 *
 * The row itself is a plain scroll-snap list, so it swipes on touch screens and
 * scrolls with a trackpad without any of this code. The buttons are only a
 * convenience for mouse users, which is why they are hidden from assistive
 * technology: the cards stay in normal tab order either way.
 */
export function ShelfScroller({ label, children }: { label: string; children: ReactNode }) {
  const listRef = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * list.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="bhub-shelf">
      <ul ref={listRef} className="bhub-shelf__list" aria-label={label}>
        {children}
      </ul>
      <div className="bhub-shelf__controls" aria-hidden="true">
        <button type="button" tabIndex={-1} onClick={() => scroll(-1)} className="bhub-shelf__btn">
          ←
        </button>
        <button type="button" tabIndex={-1} onClick={() => scroll(1)} className="bhub-shelf__btn">
          →
        </button>
      </div>
    </div>
  );
}
