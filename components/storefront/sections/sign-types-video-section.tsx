"use client";

import { useState, useRef } from "react";
import { Sparkles, Play, Pause, Volume2, VolumeX, Zap, Film } from "lucide-react";
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

export const SIGN_TYPES_DATA = [
  {
    id: "neon-sign",
    number: "01",
    title: "LED Neon Sign",
    tagline: "Vivid Flexible Silicone Neon",
    description:
      "Handcrafted using ultra-bright, energy-efficient LED silicone tubing mounted on crystal-clear acrylic backings. Perfect for homes, weddings, and commercial spaces.",
    features: ["100,000+ Glow Hours", "Shatterproof LED Silicone", "Low 12V Safe Voltage"],
    badge: "Most Popular",
    video: "/neon-sign/Videos/en-GB_1fa05acfc3a2cdf80c7787c5f585c30a.mp4",
    poster: "/neon-sign/girls room/iap_600x600.5331151538_61m43otq.webp",
  },
  {
    id: "3d-metal",
    number: "02",
    title: "3D Metal Neon Sign",
    tagline: "Frontlit, Backlit & Dual-Lit Metal Channel",
    description:
      "Fabricated 3D stainless steel channel letters engineered with internal LED neon illumination. Available in Frontlit, Halo Backlit, or Dual-Lit configurations.",
    features: ["Frontlit / Backlit / Both", "Architectural Grade Stainless Steel", "Weatherproof Outdoor IP67"],
    badge: "Architectural Grade",
    video: "/3d-metallic-neon-sign/videos/2.mp4",
    poster: "/3d-metallic-neon-sign/corporte/056b3189-6a8c-482a-8334-53ded7aff3e1.png",
  },
  {
    id: "lightbox",
    number: "03",
    title: "Ultra Thin Lightbox",
    tagline: "Sleek Edge-Lit LED Display",
    description:
      "Ultra-slim anodized aluminum framed lightboxes with edge-guided matrix LED backlighting. Delivers 100% uniform, shadow-free illumination across the entire face.",
    features: ["Ultra-Slim Profile", "Uniform Edge-Lit Dispersion", "Toolless Graphic Swap"],
    badge: "Retail & Commercial",
    video: "/neon-sign/Videos/en-GB_7bc644f6ffb88b4179c83b88c76e5ed9.mp4",
    poster: "/neon-sign/shop/iap_600x600.8012839564_cc7lygzj.webp",
  },
  {
    id: "acrylic-uv",
    number: "04",
    title: "3D Acrylic UV Print Neon",
    tagline: "High-Def UV Artwork + Contour Neon",
    description:
      "Combines photographic UV direct printing onto premium acrylic with glowing LED neon contours. Provides rich artwork detail with stunning illuminated contrast.",
    features: ["High-Def Full-Color UV Print", "Neon Contour Accents", "3D Layered Depth"],
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

  let currentVideoSrc = currentType.video;
  let currentPosterSrc = currentType.poster;

  if (is3dMetalTab) {
    currentVideoSrc = METALLIC_3D_VIDEOS[active3dVideoIndex].video;
    currentPosterSrc = METALLIC_3D_VIDEOS[active3dVideoIndex].poster;
  } else if (isAcrylicUvTab) {
    currentVideoSrc = ACRYLIC_UV_VIDEOS[activeAcrylicVideoIndex].video;
    currentPosterSrc = ACRYLIC_UV_VIDEOS[activeAcrylicVideoIndex].poster;
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
            <span>Master Sign Craftsmanship</span>
          </div>

          <h2
            id="sign-types-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight"
          >
            Four Premium Sign Types. <br className="hidden sm:inline" />
            <PremiumAccentText>Engineered to Glow.</PremiumAccentText>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            From flexible silicone LED neon signs to architectural 3D metal channel lettering, 3D acrylic UV print signs and ultra-thin lightboxes.
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
              <video
                key={currentVideoSrc}
                ref={videoRef}
                src={currentVideoSrc}
                poster={currentPosterSrc}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Video Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {is3dMetalTab
                    ? METALLIC_3D_VIDEOS[active3dVideoIndex].title
                    : isAcrylicUvTab
                    ? ACRYLIC_UV_VIDEOS[activeAcrylicVideoIndex].title
                    : "Live Craftsmanship Reel"}
                </span>
              </div>

              {/* Media Controls Bar */}
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
            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <CustomQuoteButton className="w-full justify-center text-sm py-3 font-bold" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
