"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Play,
  Pause,
  Sparkles,
  Check,
  Copy,
  Palette,
  Eye,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

export interface NeonColor {
  id: string;
  name: string;
  r: number;
  g: number;
  b: number;
  hex: string;
  style: string;
  glow: string;
  vibe: string;
}

export const NEON_COLORS: NeonColor[] = [
  {
    id: "warm-white",
    name: "Warm White",
    r: 255,
    g: 244,
    b: 214,
    hex: "#FFF4D6",
    style: "radial-gradient(circle at 38% 38%, #fffdf4, #fff4d6)",
    glow: "rgba(255,244,214,0.75)",
    vibe: "Cozy, warm & timeless studio illumination",
  },
  {
    id: "cold-white",
    name: "Cold White",
    r: 235,
    g: 248,
    b: 255,
    hex: "#EBF8FF",
    style: "radial-gradient(circle at 38% 38%, #ffffff, #ebf8ff)",
    glow: "rgba(235,248,255,0.75)",
    vibe: "Crisp, modern & ultra-bright gallery radiance",
  },
  {
    id: "light-yellow",
    name: "Light Yellow",
    r: 255,
    g: 244,
    b: 128,
    hex: "#FFF480",
    style: "radial-gradient(circle at 38% 38%, #fffbd1, #fff480)",
    glow: "rgba(255,244,128,0.75)",
    vibe: "Soft, cheerful & gentle pastel accent",
  },
  {
    id: "yellow",
    name: "Yellow",
    r: 255,
    g: 221,
    b: 0,
    hex: "#FFDD00",
    style: "radial-gradient(circle at 38% 38%, #fff59a, #ffdd00)",
    glow: "rgba(255,221,0,0.75)",
    vibe: "Vibrant, high-energy & iconic retro sign glow",
  },
  {
    id: "orange",
    name: "Orange",
    r: 255,
    g: 128,
    b: 0,
    hex: "#FF8000",
    style: "radial-gradient(circle at 38% 38%, #ffd29a, #ff8000)",
    glow: "rgba(255,128,0,0.75)",
    vibe: "Warm sunset aura & playful ambient light",
  },
  {
    id: "dark-blue",
    name: "Dark Blue",
    r: 0,
    g: 54,
    b: 255,
    hex: "#0036FF",
    style: "radial-gradient(circle at 38% 38%, #89a5ff, #0036ff)",
    glow: "rgba(0,54,255,0.75)",
    vibe: "Deep electric blue, mysterious & atmospheric",
  },
  {
    id: "ice-blue",
    name: "Ice Blue",
    r: 98,
    g: 218,
    b: 255,
    hex: "#62DAFF",
    style: "radial-gradient(circle at 38% 38%, #d7f8ff, #62daff)",
    glow: "rgba(98,218,255,0.75)",
    vibe: "Futuristic synthwave & cool arctic light",
  },
  {
    id: "green",
    name: "Green",
    r: 0,
    g: 220,
    b: 90,
    hex: "#00DC5A",
    style: "radial-gradient(circle at 38% 38%, #a8ffc5, #00dc5a)",
    glow: "rgba(0,220,90,0.75)",
    vibe: "Lush, vivid cyber-green spotlight",
  },
  {
    id: "light-pink",
    name: "Light Pink",
    r: 255,
    g: 170,
    b: 210,
    hex: "#FFAAD2",
    style: "radial-gradient(circle at 38% 38%, #ffe6f2, #ffaad2)",
    glow: "rgba(255,170,210,0.75)",
    vibe: "Dreamy blush & soft romantic aesthetic",
  },
  {
    id: "hot-pink",
    name: "Hot Pink",
    r: 255,
    g: 30,
    b: 170,
    hex: "#FF1EAA",
    style: "radial-gradient(circle at 38% 38%, #ffb1df, #ff1eaa)",
    glow: "rgba(255,30,170,0.75)",
    vibe: "Signature Glownique statement neon pink",
  },
  {
    id: "red",
    name: "Red",
    r: 255,
    g: 32,
    b: 32,
    hex: "#FF2020",
    style: "radial-gradient(circle at 38% 38%, #ffaaaa, #ff2020)",
    glow: "rgba(255,32,32,0.75)",
    vibe: "Bold crimson & classic vintage nightclub warmth",
  },
  {
    id: "purple",
    name: "Purple",
    r: 155,
    g: 60,
    b: 255,
    hex: "#9B3CFF",
    style: "radial-gradient(circle at 38% 38%, #d6b5ff, #9b3cff)",
    glow: "rgba(155,60,255,0.75)",
    vibe: "Mystic royal violet & velvet ambient light",
  },
  {
    id: "teal",
    name: "Teal",
    r: 0,
    g: 210,
    b: 190,
    hex: "#00D2BE",
    style: "radial-gradient(circle at 38% 38%, #a8fff4, #00d2be)",
    glow: "rgba(0,210,190,0.75)",
    vibe: "Oceanic cyan & modern chic luxury tone",
  },
  {
    id: "rgba-cycle",
    name: "RGBA Party",
    r: 255,
    g: 30,
    b: 170,
    hex: "DYNAMIC",
    style:
      "conic-gradient(from 0deg, #ff2020, #ff8000, #ffdd00, #00dc5a, #62daff, #0036ff, #9b3cff, #ff1eaa, #ff2020)",
    glow: "rgba(255, 30, 170, 0.85)",
    vibe: "Dynamic RGBA Mode — frequently morphs through colors automatically",
  },
];

const THRESHOLD = 60;
const TRANSIT_MS = 400;

export function NeonColorChangerSection() {
  const [activeColor, setActiveColor] = useState<NeonColor>(NEON_COLORS[0]);
  const [isPartyMode, setIsPartyMode] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1.1);

  // Set responsive initial zoom level
  useEffect(() => {
    if (typeof window !== "undefined") {
      setZoomLevel(window.innerWidth < 640 ? 1.0 : 1.25);
    }
  }, []);

  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const overCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const originalPixelsRef = useRef<Uint8ClampedArray | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const partyIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const rgbaCycleIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Build recolored ImageData frame using luminance match
  const buildColoredFrame = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      originalPixels: Uint8ClampedArray,
      color: NeonColor
    ) => {
      const imageData = ctx.createImageData(width, height);
      const d = imageData.data;
      const tR = color.r;
      const tG = color.g;
      const tB = color.b;

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
    []
  );

  // Perform smooth crossfade transition
  const crossfadeTo = useCallback(
    (color: NeonColor) => {
      if (
        !originalPixelsRef.current ||
        !mainCanvasRef.current ||
        !overCanvasRef.current
      )
        return;

      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }

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
        color
      );

      ctxOver.putImageData(newFrame, 0, 0);

      const start = performance.now();

      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / TRANSIT_MS, 1);
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        if (cnvOver) {
          cnvOver.style.opacity = ease.toString();
        }

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(tick);
        } else {
          ctxMain.putImageData(newFrame, 0, 0);
          if (cnvOver) cnvOver.style.opacity = "0";
          animFrameRef.current = null;
        }
      };

      animFrameRef.current = requestAnimationFrame(tick);
    },
    [buildColoredFrame]
  );

  // Load image & initialize canvas
  useEffect(() => {
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
        ctxMain.getImageData(0, 0, cnv.width, cnv.height).data
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
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle color selection
  const handleSelectColor = (color: NeonColor) => {
    setActiveColor(color);
    if (color.id !== "rgba-cycle") {
      crossfadeTo(color);
    }
  };

  // Frequent RGBA Color Morphing Mode when RGBA Party is selected
  useEffect(() => {
    if (activeColor.id === "rgba-cycle") {
      const solidColors = NEON_COLORS.filter((c) => c.id !== "rgba-cycle");
      let index = 0;

      rgbaCycleIntervalRef.current = setInterval(() => {
        index = (index + 1) % solidColors.length;
        const colorTarget = solidColors[index];
        crossfadeTo(colorTarget);
      }, 550); // frequently morph color every 550ms
    } else {
      if (rgbaCycleIntervalRef.current) {
        clearInterval(rgbaCycleIntervalRef.current);
        rgbaCycleIntervalRef.current = null;
      }
    }

    return () => {
      if (rgbaCycleIntervalRef.current) {
        clearInterval(rgbaCycleIntervalRef.current);
      }
    };
  }, [activeColor.id, crossfadeTo]);

  // General Party mode auto color cycling button toggle
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
      }, 2000);
    } else {
      if (partyIntervalRef.current) {
        clearInterval(partyIntervalRef.current);
        partyIntervalRef.current = null;
      }
    }

    return () => {
      if (partyIntervalRef.current) {
        clearInterval(partyIntervalRef.current);
      }
    };
  }, [isPartyMode, activeColor.id, crossfadeTo]);

  // Copy hex handler
  const handleCopyHex = () => {
    if (activeColor.hex === "DYNAMIC") {
      navigator.clipboard.writeText("RGBA-DYNAMIC-CYCLE");
    } else {
      navigator.clipboard.writeText(activeColor.hex);
    }
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.8));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.9));
  const resetZoom = () => setZoomLevel(1.25);

  return (
    <section
      className="neon-studio-section relative py-20 bg-[#09090b] text-white overflow-hidden"
      id="color-studio"
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full blur-[150px] opacity-40 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background:
            activeColor.id === "rgba-cycle"
              ? "radial-gradient(circle, rgba(255,30,170,0.6) 0%, rgba(98,218,255,0.6) 50%, rgba(0,220,90,0.6) 100%)"
              : activeColor.glow,
        }}
        aria-hidden="true"
      />

      <div className="shell relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Color Studio</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            See Your Neon in <PremiumAccentText>Every Shade</PremiumAccentText>
          </h2>

          <p className="text-gray-300 text-base md:text-lg">
            Experience our handcrafted LED neon colors. Click any swatch or select{" "}
            <strong className="text-pink-400">RGBA Party</strong> to see the sign
            frequently morph colors in real-time.
          </p>
        </div>

        {/* Studio Main Card */}
        <div className="bg-[#121218]/90 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Canvas Preview Stage */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full relative bg-black/95 rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-2 md:p-4 group">
                {/* Stage Header Badge & Controls */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 mb-2 border-b border-white/10 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                        style={{
                          backgroundColor:
                            activeColor.id === "rgba-cycle"
                              ? "#ff1eaa"
                              : activeColor.hex,
                        }}
                      />
                      <span
                        className="relative inline-flex rounded-full h-2.5 w-2.5"
                        style={{
                          backgroundColor:
                            activeColor.id === "rgba-cycle"
                              ? "#ff1eaa"
                              : activeColor.hex,
                        }}
                      />
                    </span>
                    <span className="font-mono uppercase tracking-wider text-[11px] text-gray-300">
                      {activeColor.id === "rgba-cycle"
                        ? "RGBA Dynamic Morphing"
                        : "Live Preview Stage"}
                    </span>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={zoomOut}
                      className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-[10px] px-1 text-gray-400">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      type="button"
                      onClick={zoomIn}
                      className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={resetZoom}
                      className="p-1.5 hover:bg-white/10 rounded text-gray-300 hover:text-white transition-colors border-l border-white/10 ml-0.5 min-h-[32px] min-w-[32px] flex items-center justify-center"
                      title="Reset Zoom"
                    >
                      <RotateCcw className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Canvas Render Container with Zoom & Crop */}
                <div className="relative w-full rounded-xl overflow-hidden bg-black flex items-center justify-center min-h-[220px] sm:min-h-[300px] md:min-h-[380px]">
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950 text-gray-400 gap-3 z-20">
                      <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs tracking-wider uppercase">
                        Initializing Canvas...
                      </span>
                    </div>
                  )}

                  <div
                    className="relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out origin-center"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <canvas
                      ref={mainCanvasRef}
                      className="w-full h-auto max-h-[500px] object-contain rounded-xl block"
                    />
                    <canvas
                      ref={overCanvasRef}
                      className="absolute inset-0 w-full h-auto max-h-[500px] object-contain rounded-xl pointer-events-none transition-opacity duration-75 opacity-0"
                    />
                  </div>
                </div>

                {/* Canvas Footer Bar */}
                <div className="mt-3 px-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-pink-400" />
                    <span className="text-[11px] sm:text-xs">
                      {activeColor.id === "rgba-cycle"
                        ? "Frequently Changing RGBA Hues"
                        : "Real-time RGBA Shading"}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPartyMode(!isPartyMode)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-medium transition-all duration-300 min-h-[32px] ${
                      isPartyMode || activeColor.id === "rgba-cycle"
                        ? "bg-pink-500/20 border-pink-500 text-pink-300 shadow-[0_0_12px_rgba(244,11,104,0.4)]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                    }`}
                  >
                    {isPartyMode || activeColor.id === "rgba-cycle" ? (
                      <>
                        <Pause className="w-3 h-3 text-pink-400" />
                        <span>Active Morph</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3 h-3 text-emerald-400" />
                        <span>Party Auto-Cycle</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Swatches & Color Controls */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-mono tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5 text-pink-400" />
                    Select Neon Color ({NEON_COLORS.length})
                  </span>

                  <span
                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                      activeColor.id === "rgba-cycle"
                        ? "bg-pink-500/20 border-pink-500 text-pink-300 animate-pulse"
                        : "bg-white/5 border-white/10 text-gray-300"
                    }`}
                  >
                    {activeColor.name}
                  </span>
                </div>

                {/* Swatches Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-3 p-2.5 sm:p-3.5 bg-black/40 border border-white/10 rounded-2xl max-h-[340px] overflow-y-auto custom-scrollbar">
                  {NEON_COLORS.map((color) => {
                    const isActive = activeColor.id === color.id;
                    const isRgba = color.id === "rgba-cycle";

                    return (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => handleSelectColor(color)}
                        aria-label={`Select ${color.name} color`}
                        className={`group relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "scale-105 bg-white/10 ring-2 ring-white/50"
                            : "hover:scale-105 hover:bg-white/5"
                        }`}
                      >
                        <span
                          className={`w-10 h-10 rounded-full border-2 border-white/20 transition-transform duration-300 shadow-md relative ${
                            isRgba ? "animate-spin-slow" : ""
                          }`}
                          style={{
                            background: color.style,
                            boxShadow: isActive
                              ? `0 0 18px ${color.glow}`
                              : "none",
                          }}
                        >
                          {isActive && (
                            <span className="absolute inset-0 flex items-center justify-center">
                              <Check className="w-4 h-4 text-zinc-950 drop-shadow-md stroke-[3]" />
                            </span>
                          )}
                        </span>
                        <span
                          className={`text-[11px] mt-1.5 font-medium text-center leading-tight ${
                            isRgba
                              ? "text-pink-400 font-bold"
                              : "text-gray-300 group-hover:text-white"
                          }`}
                        >
                          {color.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Color Details Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full border border-white/30 shadow-sm"
                      style={{
                        background: activeColor.style,
                        boxShadow: `0 0 10px ${activeColor.glow}`,
                      }}
                    />
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        {activeColor.name}
                        {activeColor.id === "rgba-cycle" && (
                          <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-mono border border-pink-500/40">
                            Auto-Morphing
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-400 leading-snug">
                        {activeColor.vibe}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyHex}
                    className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 transition-colors"
                    title="Copy Color Hex"
                  >
                    {copiedHex ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">
                          Copied!
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="font-mono">{activeColor.hex}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Action Call-to-action */}
              <div className="pt-2">
                <CustomQuoteButton
                  className="button button--primary w-full justify-center py-3.5 text-sm font-semibold rounded-xl shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  label={
                    activeColor.id === "rgba-cycle"
                      ? "Order Custom Multi-Color Sign"
                      : `Order Sign in ${activeColor.name}`
                  }
                />
                <p className="text-center text-xs text-gray-400 mt-2 flex items-center justify-center gap-1">
                  <Info className="w-3.5 h-3.5 text-pink-400" /> Free mockup &amp;
                  color proofing included with every custom quote.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
