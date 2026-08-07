"use client";

import { useState, useRef } from "react";
import { Sparkles, Play, Pause, Volume2, VolumeX, Zap, Film } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

export const METALLIC_3D_VIDEOS = [
  {
    id: "3d-vid-1",
    title: "Frontlit & Backlit 3D Channel",
    video: "/3d-metallic-neon-sign/videos/2.mp4",
    poster: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
    tag: "3D Dual-Lit",
  },
  {
    id: "3d-vid-2",
    title: "Halo Backlit Architectural Glow",
    video: "/3d-metallic-neon-sign/videos/3.mp4",
    poster: "/3d-metallic-neon-sign/Salon/generated/235762e8-14ec-4167-b534-2dad36c826ba.png",
    tag: "Halo Glow",
  },
  {
    id: "3d-vid-3",
    title: "Precision Metal Fabrication",
    video: "/3d-metallic-neon-sign/videos/4.mp4",
    poster: "/3d-metallic-neon-sign/corporte/14d4b621-c697-428a-b727-1c91b78e9e08.png",
    tag: "Stainless Steel",
  },
  {
    id: "3d-vid-4",
    title: "Storefront Dual-Tone Showcase",
    video: "/3d-metallic-neon-sign/videos/5.mp4",
    poster: "/3d-metallic-neon-sign/Resturants/generated/026ad950-fafb-4407-8420-c83be7f49365.png",
    tag: "Commercial Grade",
  },
];

export const ACRYLIC_UV_VIDEOS = [
  {
    id: "acrylic-vid-1",
    title: "3D Acrylic UV Contour Glow",
    video: "/3d-arcylic/videos/25763cbb2ca6866a574a4dde5853343c.mp4",
    poster: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
    tag: "UV Contour Neon",
  },
  {
    id: "acrylic-vid-2",
    title: "Layered 3D Acrylic Studio Showcase",
    video: "/3d-arcylic/videos/a2011a7af86d39e5177de4f68400b705.mp4",
    poster: "/3d-arcylic/fff64032-bdaa-459c-8caf-a4ac67b89f19.png",
    tag: "Photographic Depth",
  },
];

/**
 * The lightbox tab's stage still.
 *
 * We have no footage of an ultra-thin lightbox, and the clip that used to sit
 * on this tab was a flexible-neon reel — the wrong product entirely. Until a
 * real lightbox video exists the stage shows this photo instead of a <video>.
 */
export const LIGHTBOX_STILL = {
  image: "/ultra-thin-slim-lightbox/main-hero.png",
  alt: "Custom shop sign shown as flat artwork beside the finished, illuminated lightbox mounted on a wall",
  label: "Artwork to Finished Sign",
};

export const SIGN_TYPES_DATA = [
  {
    id: "neon-sign",
    slug: "custom-neon-signs",
    number: "01",
    title: "LED Neon Sign",
    tagline: "Flexible Silicone LED Neon",
    description:
      "Our custom LED neon signs are handcrafted from flexible, shatterproof silicone tubing on laser-cut clear acrylic — the safe, modern alternative to fragile glass neon. They run cool on low 12V power, so they're at home in bedrooms, weddings, cafés and storefronts alike.",
    features: ["Up to 100,000 hours of glow", "Shatterproof silicone — no glass", "Safe 12V, cool to the touch"],
    badge: "Most Popular",
    video: "/neon-sign/Videos/en-GB_1fa05acfc3a2cdf80c7787c5f585c30a.mp4",
    poster: "/neon-sign/girls room/iap_600x600.5331151538_61m43otq.webp",
  },
  {
    id: "3d-metal",
    slug: "3d-metal-neon-signs",
    number: "02",
    title: "3D Metal Neon Sign",
    tagline: "Frontlit, Halo Backlit & Dual-Lit Channel Letters",
    description:
      "Precision-fabricated stainless-steel channel letters lit from within by energy-efficient LED. Choose bold frontlit faces, a soft halo backlit glow, or dual-lit for both — built to make storefronts, lobbies and façades unmistakable day and night.",
    features: ["Frontlit, halo backlit or dual-lit", "Brushed, mirrored & metallic finishes", "IP67 weatherproof for outdoors"],
    badge: "Architectural Grade",
    video: "/3d-metallic-neon-sign/videos/2.mp4",
    poster: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
  },
  {
    id: "lightbox",
    slug: "ultra-thin-lightbox",
    number: "03",
    title: "Ultra Thin Lightbox",
    tagline: "Edge-Lit Slim Aluminium Display",
    description:
      "An ultra-slim anodized-aluminium frame under an inch deep, edge-lit by matrix LEDs for 100% even, shadow-free illumination across the whole face. Graphics slide out and swap in seconds — ideal for retail displays, menu boards and modern storefronts.",
    features: ["Under 1-inch slim profile", "Even, shadow-free edge lighting", "Tool-free snap-frame graphic swap"],
    badge: "Retail & Commercial",
    // Null on purpose — see LIGHTBOX_STILL. This is the one type with no video.
    video: null,
    poster: null,
  },
  {
    id: "acrylic-uv",
    slug: "uv-print-acrylic-signs",
    number: "04",
    title: "3D Acrylic UV Print Neon",
    tagline: "Full-Colour UV Artwork + Contour Neon",
    description:
      "High-definition UV printing lays sharp, full-colour artwork, gradients and brand fonts straight onto premium acrylic, then we trace it with glowing LED neon contours. Colour-matched to any Pantone, HEX or CMYK code for logos, brand walls and photo-ready displays.",
    features: ["High-def full-colour UV print", "Glowing LED neon contours", "Matched to any Pantone / HEX / CMYK"],
    badge: "Art & Branding",
    video: "/3d-arcylic/videos/25763cbb2ca6866a574a4dde5853343c.mp4",
    poster: "/3d-arcylic/3235dc09-6dac-4056-88b6-55fc26e28571.png",
  },
];

export function SignTypesVideoSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [active3dVideoIndex, setActive3dVideoIndex] = useState(0);
  const [activeAcrylicVideoIndex, setActiveAcrylicVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentType = SIGN_TYPES_DATA[activeTab];
  const is3dMetalTab = currentType.id === "3d-metal";
  const isAcrylicUvTab = currentType.id === "acrylic-uv";

  // Null src means this type has no footage, so the stage renders a still.
  let currentVideoSrc = currentType.video;
  let currentPosterSrc = currentType.poster;
  let stageLabel = currentVideoSrc ? "Live Craftsmanship Reel" : LIGHTBOX_STILL.label;

  if (is3dMetalTab) {
    currentVideoSrc = METALLIC_3D_VIDEOS[active3dVideoIndex].video;
    currentPosterSrc = METALLIC_3D_VIDEOS[active3dVideoIndex].poster;
    stageLabel = METALLIC_3D_VIDEOS[active3dVideoIndex].title;
  } else if (isAcrylicUvTab) {
    currentVideoSrc = ACRYLIC_UV_VIDEOS[activeAcrylicVideoIndex].video;
    currentPosterSrc = ACRYLIC_UV_VIDEOS[activeAcrylicVideoIndex].poster;
    stageLabel = ACRYLIC_UV_VIDEOS[activeAcrylicVideoIndex].title;
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setIsPlaying(true);
  };

  return (
    <section
      className="sign-types-section relative py-20 md:py-28 bg-[#0c0a0e] text-white overflow-hidden border-t border-white/10"
      id="product-sign-types"
      aria-labelledby="sign-types-heading"
    >
      {/* Background Neon Ambient Glows */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#f40b68]/15 via-[#6d26ff]/10 to-transparent blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#6d26ff]/15 via-[#f40b68]/10 to-transparent blur-[140px]"
        aria-hidden="true"
      />

      <div className="shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Handcrafted &amp; Made to Order</span>
          </div>

          <h2
            id="sign-types-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            Four Custom Sign Types. <br className="hidden sm:inline" />
            <PremiumAccentText>Engineered to Glow.</PremiumAccentText>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            From flexible silicone LED neon and architectural 3D metal channel letters to full-colour UV-print acrylic and ultra-thin edge-lit lightboxes — every sign is custom-built and made to order.
          </p>
        </div>

        {/* Product Type Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {SIGN_TYPES_DATA.map((type, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTabChange(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 min-h-[44px] ${
                  isActive
                    ? "bg-gradient-to-r from-[#f40b68] to-[#6d26ff] text-white shadow-[0_0_24px_rgba(244,11,104,0.4)] scale-105"
                    : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">{type.number}</span>
                <span>{type.title}</span>
              </button>
            );
          })}
        </div>

        {/* Video Showcase Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131017]/90 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
          {/* Left Column: Interactive Video Player */}
          <div className="lg:col-span-7 relative group">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              {currentVideoSrc ? (
                <video
                  key={currentVideoSrc}
                  ref={videoRef}
                  src={currentVideoSrc}
                  poster={currentPosterSrc ?? undefined}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={LIGHTBOX_STILL.image}
                  alt={LIGHTBOX_STILL.alt}
                  fill
                  // Left column is 7/12 of the 1280px shell minus the card's
                  // padding — roughly 700px — and full width below lg.
                  sizes="(max-width: 1023px) calc(100vw - 3rem), 700px"
                  className="object-cover"
                />
              )}

              {/* Video Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-medium">
                {/* The dot only pulses while something is actually moving. */}
                <span
                  className={`w-2 h-2 rounded-full bg-emerald-400 ${currentVideoSrc ? "animate-pulse" : ""}`}
                />
                <span>{stageLabel}</span>
              </div>

              {/* Media Controls Bar — omitted on stills, where both are no-ops */}
              {currentVideoSrc && (
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title={isPlaying ? "Pause Video" : "Play Video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-transform active:scale-95 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {/* 3D Metallic Video Selector Sub-Bar (When 3D Metal Tab Active) */}
            {is3dMetalTab && (
              <div className="mt-4 p-3 bg-black/60 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 px-1 text-xs text-gray-400 font-mono uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5 text-pink-400" />
                  <span>Select 3D Metallic Video Reel ({METALLIC_3D_VIDEOS.length})</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {METALLIC_3D_VIDEOS.map((v, i) => {
                    const isSelected = active3dVideoIndex === i;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setActive3dVideoIndex(i);
                          setIsPlaying(true);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl border text-left text-xs transition-all duration-300 min-h-[40px] flex flex-col justify-center ${
                          isSelected
                            ? "bg-pink-500/20 border-pink-500 text-white shadow-[0_0_12px_rgba(244,11,104,0.4)]"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span className="font-bold truncate text-[11px]">{v.title}</span>
                        <span className="text-[10px] text-pink-400 font-mono">{v.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3D Acrylic UV Print Video Selector Sub-Bar (When Acrylic UV Tab Active) */}
            {isAcrylicUvTab && (
              <div className="mt-4 p-3 bg-black/60 border border-white/10 rounded-2xl">
                <div className="flex items-center gap-2 mb-2 px-1 text-xs text-gray-400 font-mono uppercase tracking-wider">
                  <Film className="w-3.5 h-3.5 text-pink-400" />
                  <span>Select 3D Acrylic Video Reel ({ACRYLIC_UV_VIDEOS.length})</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {ACRYLIC_UV_VIDEOS.map((v, i) => {
                    const isSelected = activeAcrylicVideoIndex === i;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => {
                          setActiveAcrylicVideoIndex(i);
                          setIsPlaying(true);
                        }}
                        className={`px-2.5 py-1.5 rounded-xl border text-left text-xs transition-all duration-300 min-h-[40px] flex flex-col justify-center ${
                          isSelected
                            ? "bg-pink-500/20 border-pink-500 text-white shadow-[0_0_12px_rgba(244,11,104,0.4)]"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span className="font-bold truncate text-[11px]">{v.title}</span>
                        <span className="text-[10px] text-pink-400 font-mono">{v.tag}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sign Type Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <span>{currentType.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                {currentType.title}
              </h3>

              <p className="text-sm font-semibold text-pink-400 mb-4 font-mono">
                {currentType.tagline}
              </p>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {currentType.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-3 mb-8">
                {currentType.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-200">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#f40b68] to-[#6d26ff] flex items-center justify-center text-white shrink-0">
                      <Zap className="w-3 h-3" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Quote CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <CustomQuoteButton className="w-full justify-center text-sm py-3 font-bold" />
              <Link
                href={`/products/${currentType.slug}`}
                className="flex items-center justify-center gap-1.5 text-sm font-bold text-pink-400 transition-colors hover:text-pink-300"
              >
                Explore {currentType.title} in detail
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
