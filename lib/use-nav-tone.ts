"use client";

import { useEffect, useState, type RefObject } from "react";

export type NavTone = "light" | "dark";

// Below this relative luminance a backdrop counts as dark. Ink text (#1e1a22)
// stops clearing 4.5:1 at about 0.22, so anything darker than that has to get
// the white-text tone; the margin above it keeps mid-tones on the safe side.
const DARK_BELOW = 0.3;

// An image only sets the tone when it spans most of the viewport — a banner or
// a full-bleed hero. A product card's thumbnail passing under the bar must not:
// in a grid that would flip the bar on every row.
const WIDE_MEDIA_RATIO = 0.6;

const COLOR_TOKEN = /(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^()]*\)|#[0-9a-f]{3,8}\b/gi;

type Rgba = { luminance: number; alpha: number };

const parsed = new Map<string, Rgba>();
let probe: CanvasRenderingContext2D | null | undefined;

// Computed colours come back in whatever space they were authored in (Tailwind
// v4 emits oklch), so they are painted onto a 1×1 canvas and read back as sRGB
// rather than parsed by hand.
function readColor(color: string): Rgba | null {
  const cached = parsed.get(color);
  if (cached) return cached;

  if (probe === undefined) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    probe = canvas.getContext("2d", { willReadFrequently: true });
  }
  if (!probe) return null;

  probe.clearRect(0, 0, 1, 1);
  probe.fillStyle = "#000";
  probe.fillStyle = color;
  probe.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probe.getImageData(0, 0, 1, 1).data;
  const alpha = a / 255;
  if (alpha === 0) {
    const transparent = { luminance: 1, alpha: 0 };
    parsed.set(color, transparent);
    return transparent;
  }

  // getImageData is premultiplied-then-unpremultiplied, so the channels are
  // already the colour's own; only the WCAG linearisation is left to do.
  const linear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const result = {
    luminance: 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b),
    alpha,
  };
  parsed.set(color, result);
  return result;
}

// The tone one element contributes, or null when it paints nothing opaque
// enough to matter and the element behind it should decide instead.
function toneOf(element: Element): NavTone | null {
  const isWide = () =>
    element.getBoundingClientRect().width >= window.innerWidth * WIDE_MEDIA_RATIO;

  if (element instanceof HTMLImageElement || element instanceof HTMLVideoElement || element instanceof HTMLCanvasElement) {
    // Photography here is night-lit signage; treating it as dark is also the
    // safe guess, because the dark tone stays legible over a bright image and
    // the light tone does not over a dark one.
    return isWide() ? "dark" : null;
  }

  const style = getComputedStyle(element);

  if (style.backgroundImage !== "none") {
    if (style.backgroundImage.includes("url(")) return isWide() ? "dark" : null;

    const stops = (style.backgroundImage.match(COLOR_TOKEN) ?? [])
      .map(readColor)
      .filter((stop): stop is Rgba => stop !== null && stop.alpha >= 0.5);
    if (stops.length > 0) {
      const mean = stops.reduce((sum, stop) => sum + stop.luminance, 0) / stops.length;
      return mean < DARK_BELOW ? "dark" : "light";
    }
  }

  const fill = readColor(style.backgroundColor);
  if (fill && fill.alpha >= 0.5) return fill.luminance < DARK_BELOW ? "dark" : "light";

  return null;
}

function toneBehind(header: HTMLElement): NavTone {
  const rect = header.getBoundingClientRect();
  const y = rect.top + rect.height / 2;
  let dark = 0;

  // Three samples across the bar, majority wins, so a split hero (copy on
  // white, photo on the right) doesn't hinge on what sits at dead centre.
  for (const fraction of [0.2, 0.5, 0.8]) {
    const x = rect.left + rect.width * fraction;
    for (const element of document.elementsFromPoint(x, y)) {
      if (header.contains(element)) continue;
      const tone = toneOf(element);
      if (tone === null) continue;
      if (tone === "dark") dark += 1;
      break;
    }
  }

  return dark >= 2 ? "dark" : "light";
}

/**
 * Which glass tone a sticky header should wear for what is currently behind
 * it: "dark" (smoked glass, white text) over dark sections and full-bleed
 * photography, "light" (frosted glass, ink text) over everything else.
 *
 * `initial` is what the server renders. Pass "dark" only for a header that
 * starts on top of imagery, so the first paint is already right.
 */
export function useNavTone(ref: RefObject<HTMLElement | null>, initial: NavTone = "light"): NavTone {
  const [tone, setTone] = useState<NavTone>(initial);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      setTone(toneBehind(header));
    };
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(measure);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== 0) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return tone;
}
