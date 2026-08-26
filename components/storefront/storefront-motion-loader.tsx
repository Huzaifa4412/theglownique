"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type RefObject } from "react";

const StorefrontMotionRuntime = dynamic(
  () =>
    import("@/components/storefront/storefront-motion-runtime").then(
      (module) => module.StorefrontMotionRuntime,
    ),
  { ssr: false },
);

const FALLBACK_LOAD_DELAY_MS = 15_000;

export function StorefrontMotionLoader({
  rootRef,
  reducedMotion,
}: {
  rootRef: RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
}) {
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

  return ready ? (
    <StorefrontMotionRuntime
      rootRef={rootRef}
      reducedMotion={reducedMotion}
    />
  ) : null;
}
