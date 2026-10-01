"use client";

import { useEffect, useRef } from "react";

type DetailVideoProps = {
  src: string;
  poster: string;
  /** Describes the footage: the video is silent, so this is its only text. */
  label: string;
};

/**
 * A silent product clip that loads and plays only while it is on screen.
 *
 * `preload="none"` plus the poster keeps two ~1 MB files off the critical path
 * of an ad landing page; the observer starts playback when the clip scrolls
 * into view and pauses it when it leaves. With reduced motion requested it
 * never autoplays — the poster and the native controls remain.
 */
export function DetailVideo({ src, poster, label }: DetailVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (data saver, low power mode); the
          // controls are there for that case.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="detail-video"
      src={src}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      controls
      aria-label={label}
    />
  );
}
