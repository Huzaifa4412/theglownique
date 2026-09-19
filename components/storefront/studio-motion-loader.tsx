"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StudioMotionRuntime = dynamic(
  () =>
    import("@/components/storefront/studio-motion-runtime").then(
      (module) => module.StudioMotionRuntime,
    ),
  { ssr: false },
);

const FALLBACK_LOAD_DELAY_MS = 15_000;

/**
 * Same contract as StorefrontMotionLoader: the GSAP runtime for the studio
 * homepage stays entirely off the critical path and only loads on the first
 * real interaction (or a generous post-load fallback for visitors who simply
 * sit and read). Until then the page is fully usable — every section is
 * visible, the sign-type rail is a native horizontal scroller, and the only
 * things missing are the scroll flourishes.
 */
export function StudioMotionLoader() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let fallbackTimer: number | undefined;

    const activate = () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      setReady(true);
    };
    const scheduleFallback = () => {
      fallbackTimer = window.setTimeout(activate, FALLBACK_LOAD_DELAY_MS);
    };

    window.addEventListener("pointermove", activate, { once: true, passive: true });
    window.addEventListener("wheel", activate, { once: true, passive: true });
    window.addEventListener("touchstart", activate, { once: true, passive: true });
    window.addEventListener("keydown", activate, { once: true });

    if (document.readyState === "complete") {
      scheduleFallback();
    } else {
      window.addEventListener("load", scheduleFallback, { once: true });
    }

    return () => {
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      window.removeEventListener("load", scheduleFallback);
      window.removeEventListener("pointermove", activate);
      window.removeEventListener("wheel", activate);
      window.removeEventListener("touchstart", activate);
      window.removeEventListener("keydown", activate);
    };
  }, []);

  return ready ? <StudioMotionRuntime /> : null;
}
