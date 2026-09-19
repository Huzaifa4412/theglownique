/**
 * The 14 neon colours the studio offers, shared by the interactive colour
 * studio on the LED neon product page (neon-color-changer-section.tsx) and
 * the homepage colour studio (studio-color-studio.tsx). One source so a
 * colour can never look different on two surfaces.
 */

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
