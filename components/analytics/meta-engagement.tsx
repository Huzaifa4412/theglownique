"use client";

import { useEffect } from "react";

import { trackEngagedView, trackSectionView } from "@/lib/meta-pixel";

type MetaEngagementProps = {
  /** Same id the page passes to MetaViewContent. */
  contentId: string;
  contentName: string;
  /** Sections worth an audience of their own. Each must carry an `id`. */
  sectionSelector?: string;
};

/** How long a section has to stay in the reading band before it counts. */
const SECTION_DWELL_MS = 2000;

/**
 * Engagement signals for an ad landing page. Renders nothing.
 *
 * A landing page gets far more views than WhatsApp or Etsy clicks, and a view
 * alone does not separate a visitor who read the page from one who bounced. Two
 * custom events fill that gap, both for building audiences rather than for
 * optimising a campaign:
 *
 *   EngagedView — the visitor scrolled past the halfway point. Once per view.
 *   ViewSection — a named section sat in the middle of the screen for two
 *                 seconds. Once per section per view, so "people who read the
 *                 nail salon section" can be retargeted with the nail salon ad.
 *
 * The dwell is what keeps a fast scroll to the footer from reporting every
 * section on the way down.
 */
export function MetaEngagement({ contentId, contentName, sectionSelector }: MetaEngagementProps) {
  useEffect(() => {
    let engaged = false;
    const onScroll = () => {
      if (engaged) return;
      const seen = window.scrollY + window.innerHeight;
      if (seen < document.documentElement.scrollHeight / 2) return;
      engaged = true;
      window.removeEventListener("scroll", onScroll);
      trackEngagedView(contentId, contentName);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = sectionSelector ? [...document.querySelectorAll<HTMLElement>(sectionSelector)] : [];
    const timers = new Map<Element, ReturnType<typeof setTimeout>>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const section = entry.target as HTMLElement;
          const pending = timers.get(section);
          if (!entry.isIntersecting) {
            if (pending) clearTimeout(pending);
            timers.delete(section);
            continue;
          }
          if (pending) continue;
          timers.set(
            section,
            setTimeout(() => {
              observer.unobserve(section);
              timers.delete(section);
              trackSectionView(contentId, section.id);
            }, SECTION_DWELL_MS),
          );
        }
      },
      // The middle fifth of the screen: a section taller than the viewport
      // never reaches a visibility ratio, but it does cross the middle.
      { rootMargin: "-40% 0px -40% 0px" },
    );
    for (const section of sections) {
      if (section.id) observer.observe(section);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      for (const timer of timers.values()) clearTimeout(timer);
    };
  }, [contentId, contentName, sectionSelector]);

  return null;
}
