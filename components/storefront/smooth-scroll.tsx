"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Module-scope handle so the GSAP runtime (use-studio-motion.ts) can sync
 * ScrollTrigger to the same instance without a global.
 */
let lenisInstance: Lenis | null = null;
export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Programmatic scrolling that cooperates with Lenis. Native window.scrollTo /
 * scrollIntoView are overridden by an active Lenis instance (its frame loop
 * keeps re-asserting its own position), so every scripted scroll on the
 * homepage goes through here: Lenis when it's running, native otherwise.
 */
export function smoothScrollTo(
  target: string | HTMLElement,
  options?: { immediate?: boolean },
) {
  const lenis = lenisInstance;
  if (lenis) {
    lenis.scrollTo(target, {
      offset: -100,
      immediate: options?.immediate,
    });
    return;
  }
  const element =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target)
      : target;
  element?.scrollIntoView({
    behavior: options?.immediate ? "auto" : "smooth",
    block: "start",
  });
}

/**
 * Premium smooth scrolling for the studio homepage, via Lenis (already a
 * project dependency — this wires it up).
 *
 * Deliberate choices:
 * - Wheel scrolling is smoothed; touch stays native (Lenis default), because
 *   fighting a phone's momentum scrolling feels worse, not better.
 * - Never initialised under prefers-reduced-motion — those visitors keep
 *   plain native scrolling everywhere.
 * - `autoRaf` lets Lenis drive its own frame loop, so it works alone and the
 *   GSAP runtime only needs to listen for its scroll events when it loads.
 * - Anchor links (#categories, #shop, #custom…) glide with an offset that
 *   clears the sticky header, matching the CSS scroll-padding.
 * - Pauses while the quote dialog is open (body.dialog-open) so the page
 *   underneath holds still; the dialog itself scrolls natively via
 *   data-lenis-prevent.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (lenisInstance) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -100 },
    });
    lenisInstance = lenis;
    // Debug handle; also lets external embeds cooperate if they need to.
    (window as unknown as Record<string, unknown>).__glowLenis = lenis;

    const body = document.body;
    const syncDialogState = () => {
      if (body.classList.contains("dialog-open")) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };
    syncDialogState();
    const observer = new MutationObserver(syncDialogState);
    observer.observe(body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      lenis.destroy();
      lenisInstance = null;
      delete (window as unknown as Record<string, unknown>).__glowLenis;
    };
  }, []);

  return null;
}
