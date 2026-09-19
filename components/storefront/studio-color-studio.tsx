"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { NEON_COLORS, type NeonColor } from "@/lib/neon-colors";
import { trackColourCustomised } from "@/lib/meta-pixel";
import styles from "./studio-home.module.css";

/**
 * The homepage Interactive Colour Studio.
 *
 * Same recolouring engine as the LED neon product page (a luminance-matched
 * canvas repaint of a real sign photo, crossfaded between shades) and the
 * same 14 colours via lib/neon-colors.ts — restyled from the product page's
 * midnight/Tailwind look into the studio's editorial language: paper type on
 * ink, hairline borders, 3px radii, unicode glyphs instead of an icon set.
 * No GSAP, no icon imports: the homepage keeps its critical bundle lean.
 */

/** Luminance above which a pixel counts as "lit tube" and gets recoloured. */
const THRESHOLD = 60;
const TRANSIT_MS = 400;
const RGBA_CYCLE_MS = 550;
const PARTY_MS = 2000;

const MOBILE_QUERY = "(max-width: 639px)";

function subscribeToViewport(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getIsMobile(): boolean {
  return window.matchMedia(MOBILE_QUERY).matches;
}
function getIsMobileOnServer(): boolean {
  return false;
}

export function StudioColorStudio() {
  const [activeColor, setActiveColor] = useState<NeonColor>(NEON_COLORS[0]);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useSyncExternalStore(
    subscribeToViewport,
    getIsMobile,
    getIsMobileOnServer,
  );
  // Stays null until the visitor zooms manually; their choice then wins over
  // the responsive default (phones fit the whole sign, desktops lean in).
  const [zoomOverride, setZoomOverride] = useState<number | null>(null);
  const zoomLevel = zoomOverride ?? (isMobile ? 1.0 : 1.25);

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const originalPixelsRef = useRef<Uint8ClampedArray | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const partyIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rgbaIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Repaint the sign photo with the tube pixels luminance-matched to a shade. */
  const buildColoredFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      originalPixels: Uint8ClampedArray,
      color: NeonColor,
    ) => {
      const imageData = ctx.createImageData(width, height);
      const d = imageData.data;
      const { r: tR, g: tG, b: tB } = color;

      for (let i = 0; i < d.length; i += 4) {
        const oR = originalPixels[i];
        const oG = originalPixels[i + 1];
        const oB = originalPixels[i + 2];
        const lum = 0.299 * oR + 0.587 * oG + 0.114 * oB;

        if (lum >= THRESHOLD) {
          const t = Math.min((lum - THRESHOLD) / (255 - THRESHOLD), 1);
          const scale = lum / 255;
          d[i] = Math.round(scale * tR * t + oR * (1 - t));
          d[i + 1] = Math.round(scale * tG * t + oG * (1 - t));
          d[i + 2] = Math.round(scale * tB * t + oB * (1 - t));
        } else {
          d[i] = oR;
          d[i + 1] = oG;
          d[i + 2] = oB;
        }
        d[i + 3] = originalPixels[i + 3];
      }
      return imageData;
    },
    [],
  );

  const crossfadeTo = useCallback(
    (color: NeonColor) => {
      if (
        !originalPixelsRef.current ||
        !mainCanvasRef.current ||
        !overCanvasRef.current
      )
        return;

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      const cnv = mainCanvasRef.current;
      const cnvOver = overCanvasRef.current;
      const ctxMain = cnv.getContext("2d", { willReadFrequently: true });
      const ctxOver = cnvOver.getContext("2d", { willReadFrequently: true });
      if (!ctxMain || !ctxOver) return;

      const newFrame = buildColoredFrame(
        ctxMain,
        cnv.width,
        cnv.height,
        originalPixelsRef.current,
        color,
      );
      ctxOver.putImageData(newFrame, 0, 0);

      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / TRANSIT_MS, 1);
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        cnvOver.style.opacity = ease.toString();
        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          ctxMain.putImageData(newFrame, 0, 0);
          cnvOver.style.opacity = "0";
          animFrameRef.current = null;
        }
      };
      animFrameRef.current = requestAnimationFrame(tick);
    },
    [buildColoredFrame],
  );

  // Defer the heavy canvas work until the studio scrolls near the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "350px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load the reference photo and capture its pixels once visible.
  useEffect(() => {
    if (!isVisible) return;
    const cnv = mainCanvasRef.current;
    const cnvOver = overCanvasRef.current;
    if (!cnv || !cnvOver) return;
    const ctxMain = cnv.getContext("2d", { willReadFrequently: true });
    if (!ctxMain) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      cnv.width = cnvOver.width = img.naturalWidth;
      cnv.height = cnvOver.height = img.naturalHeight;
      ctxMain.drawImage(img, 0, 0);
      originalPixelsRef.current = new Uint8ClampedArray(
        ctxMain.getImageData(0, 0, cnv.width, cnv.height).data,
      );
      setIsLoading(false);
      crossfadeTo(activeColor);
    };
    img.onerror = () => {
      console.error("Failed to load neon reference image.");
      setIsLoading(false);
    };
    img.src = "/images/neon-sign-changer.webp";

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const handleSelectColor = (color: NeonColor) => {
    setActiveColor(color);
    // Picking a colour is the strongest engagement signal short of opening
    // the quote form — same CustomizeProduct event as the product page.
    trackColourCustomised(color.name);
    if (color.id !== "rgba-cycle") crossfadeTo(color);
  };

  // RGBA Party swatch: morph through every solid shade continuously.
  useEffect(() => {
    if (activeColor.id === "rgba-cycle") {
      const solids = NEON_COLORS.filter((c) => c.id !== "rgba-cycle");
      let index = 0;
      rgbaIntervalRef.current = setInterval(() => {
        index = (index + 1) % solids.length;
        crossfadeTo(solids[index]);
      }, RGBA_CYCLE_MS);
    } else if (rgbaIntervalRef.current) {
      clearInterval(rgbaIntervalRef.current);
      rgbaIntervalRef.current = null;
    }
    return () => {
      if (rgbaIntervalRef.current) clearInterval(rgbaIntervalRef.current);
    };
  }, [activeColor.id, crossfadeTo]);

  // Party auto-cycle: step through the palette at a readable pace.
  useEffect(() => {
    if (isPartyMode && activeColor.id !== "rgba-cycle") {
      partyIntervalRef.current = setInterval(() => {
        setActiveColor((prev) => {
          const currentIndex = NEON_COLORS.findIndex((c) => c.id === prev.id);
          const nextIndex = (currentIndex + 1) % (NEON_COLORS.length - 1);
          const nextColor = NEON_COLORS[nextIndex];
          crossfadeTo(nextColor);
          return nextColor;
        });
      }, PARTY_MS);
    } else if (partyIntervalRef.current) {
      clearInterval(partyIntervalRef.current);
      partyIntervalRef.current = null;
    }
    return () => {
      if (partyIntervalRef.current) clearInterval(partyIntervalRef.current);
    };
  }, [isPartyMode, activeColor.id, crossfadeTo]);

  const handleCopyHex = () => {
    navigator.clipboard.writeText(
      activeColor.hex === "DYNAMIC" ? "RGBA-DYNAMIC-CYCLE" : activeColor.hex,
    );
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const zoomIn = () => setZoomOverride(Math.min(zoomLevel + 0.15, 1.8));
  const zoomOut = () => setZoomOverride(Math.max(zoomLevel - 0.15, 0.9));
  const resetZoom = () => setZoomOverride(null);

  const isRgbaActive = activeColor.id === "rgba-cycle";
  const cycling = isPartyMode || isRgbaActive;
  const ctaLabel = isRgbaActive
    ? "Order a custom multi-colour sign"
    : `Order sign in ${activeColor.name}`;

  return (
    <div
      className={styles.studioBody}
      ref={rootRef}
      style={
        {
          "--active-glow": activeColor.glow,
          "--active-hex": isRgbaActive ? "#ff1eaa" : activeColor.hex,
        } as React.CSSProperties
      }
    >
      {/* ── Preview stage ─────────────────────────────────────────────── */}
      <div className={styles.stage}>
        <div className={styles.stageBar}>
          <span className={styles.stageStatus}>
            <span className={styles.stageDot} aria-hidden="true" />
            {isRgbaActive ? "RGBA dynamic morphing" : "Live preview stage"}
          </span>
          <div
            className={styles.zoomControls}
            role="group"
            aria-label="Preview zoom"
          >
            <button type="button" onClick={zoomOut} aria-label="Zoom out">
              −
            </button>
            <span aria-live="polite">{Math.round(zoomLevel * 100)}%</span>
            <button type="button" onClick={zoomIn} aria-label="Zoom in">
              +
            </button>
            <button type="button" onClick={resetZoom} aria-label="Reset zoom">
              ↺
            </button>
          </div>
        </div>
        <div className={styles.stageCanvasFrame}>
          <span className={styles.stageAmbient} aria-hidden="true" />
          {isLoading && (
            <span className={styles.stageLoading}>Warming up the glow…</span>
          )}
          <div
            className={styles.stageZoom}
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <canvas
              ref={mainCanvasRef}
              role="img"
              aria-label={`Custom neon sign previewed in ${activeColor.name}`}
            />
            <canvas ref={overCanvasRef} aria-hidden="true" />
          </div>
        </div>
        <div className={styles.stageFooter}>
          <span>
            {isRgbaActive
              ? "Frequently changing RGBA hues"
              : "Real-time RGBA shading"}
          </span>
          <button
            type="button"
            className={styles.partyToggle}
            aria-pressed={cycling}
            onClick={() => setIsPartyMode(!isPartyMode)}
          >
            <span aria-hidden="true">{cycling ? "❚❚" : "▶"}</span>
            {cycling ? "Active morph" : "Party auto-cycle"}
          </button>
        </div>
      </div>

      {/* ── Swatches & details ────────────────────────────────────────── */}
      <div className={styles.studioAside}>
        <div className={styles.swatchHeader}>
          <span>Select neon colour ({NEON_COLORS.length})</span>
          <span className={styles.swatchActiveName}>{activeColor.name}</span>
        </div>
        <div
          className={styles.swatchGrid}
          role="group"
          aria-label="Neon colours"
          data-lenis-prevent
        >
          {NEON_COLORS.map((color) => {
            const isActive = activeColor.id === color.id;
            const isRgba = color.id === "rgba-cycle";
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => handleSelectColor(color)}
                aria-pressed={isActive}
                aria-label={`Preview in ${color.name}`}
                className={styles.swatch}
                data-rgba={isRgba || undefined}
              >
                <span
                  className={styles.swatchDot}
                  style={{
                    background: color.style,
                    boxShadow: isActive ? `0 0 18px ${color.glow}` : "none",
                  }}
                >
                  {isActive && <span aria-hidden="true">✓</span>}
                </span>
                <span className={styles.swatchName}>{color.name}</span>
              </button>
            );
          })}
        </div>

        <div className={styles.activeCard}>
          <span
            className={styles.activeCardDot}
            style={{
              background: activeColor.style,
              boxShadow: `0 0 10px ${activeColor.glow}`,
            }}
            aria-hidden="true"
          />
          <span className={styles.activeCardText}>
            <strong>{activeColor.name}</strong>
            {activeColor.vibe}
          </span>
          <button
            type="button"
            className={styles.hexButton}
            onClick={handleCopyHex}
            title="Copy colour hex"
          >
            {copiedHex ? "Copied ✓" : activeColor.hex}
          </button>
        </div>

        <div className={styles.studioCta}>
          <CustomQuoteButton
            className={`${styles.primary} ${styles.primaryWide}`}
            label={ctaLabel}
          />
          <p>Free mockup &amp; colour proofing included with every custom quote.</p>
        </div>
      </div>
    </div>
  );
}
