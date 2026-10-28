import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const targetDir = path.join(ROOT, "public", "blog", "why-is-my-neon-sign-flickering");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function prepareAssets() {
  console.log("Preparing flickering blog image assets...");

  // 1. Cover: High-res illuminated neon sign
  const heroSrc = path.join(ROOT, "public", "hero", "neon-sign-hero.webp");
  const coverDest = path.join(targetDir, "flickering-neon-sign-troubleshooting-cover.webp");
  await sharp(heroSrc)
    .resize({ width: 1200, height: 800, fit: "cover", position: "center" })
    .webp({ quality: 88 })
    .toFile(coverDest);
  console.log("✓ Created cover: flickering-neon-sign-troubleshooting-cover.webp");

  // 2. Commercial Stable Illumination
  const barSrc = path.join(ROOT, "public", "neon-sign", "Bar", "custom-bar-neon-sign-cocktails.webp");
  const barDest = path.join(targetDir, "commercial-neon-sign-stable-illumination.webp");
  await sharp(barSrc)
    .resize({ width: 1000, height: 750, fit: "cover" })
    .webp({ quality: 85 })
    .toFile(barDest);
  console.log("✓ Created commercial-neon-sign-stable-illumination.webp");

  // 3. Technical Wiring Anatomy Diagram (1200x800)
  const anatomySvg = `
<svg width="1200" height="800" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1200" y2="800" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
    <linearGradient id="amberGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
    <linearGradient id="cyanGlow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#67E8F9" />
      <stop offset="100%" stop-color="#06B6D4" />
    </linearGradient>
    <filter id="shadow" x="-10" y="-10" width="1220" height="820" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="1200" height="800" fill="url(#bgGrad)" />

  <!-- Header Section -->
  <g transform="translate(60, 50)">
    <rect width="260" height="30" rx="15" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-width="1.5" />
    <text x="130" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" text-anchor="middle" letter-spacing="1.5">ELECTRICAL POWER CHAIN</text>
    <text x="0" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#FFFFFF">LED Neon Electrical Anatomy &amp; Fault Points</text>
    <text x="0" y="102" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#94A3B8">Where flickers, voltage drops, and loose connections occur along the 12V/24V power line</text>
  </g>

  <!-- Power Chain Blocks -->
  <!-- Block 1: AC Wall Outlet -->
  <g transform="translate(60, 190)">
    <rect width="220" height="230" rx="16" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
    <rect x="20" y="20" width="40" height="40" rx="8" fill="#F59E0B" fill-opacity="0.15" />
    <text x="40" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#F59E0B" text-anchor="middle">1</text>
    <text x="20" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">AC Wall Outlet</text>
    <text x="20" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F59E0B">110V - 240V AC</text>
    <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Household mains power.</text>
    <line x1="20" y1="165" x2="200" y2="165" stroke="#334155" stroke-width="1" />
    <text x="20" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#EF4444">FAULT POINT:</text>
    <text x="20" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#CBD5E1">Tripped GFCI or shared compressor load sag</text>
  </g>

  <!-- Flow Arrow 1 -->
  <path d="M 295 305 L 325 305" stroke="#F59E0B" stroke-width="3" stroke-linecap="round" marker-end="url(#arrow)" />
  <polygon points="335,305 325,300 325,310" fill="#F59E0B" />

  <!-- Block 2: 12V/24V Power Adapter -->
  <g transform="translate(345, 190)">
    <rect width="240" height="230" rx="16" fill="#1E293B" stroke="#06B6D4" stroke-width="1.5" />
    <rect x="20" y="20" width="40" height="40" rx="8" fill="#06B6D4" fill-opacity="0.15" />
    <text x="40" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#06B6D4" text-anchor="middle">2</text>
    <text x="20" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">12V/24V Power Driver</text>
    <text x="20" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#06B6D4">AC to DC Switcher</text>
    <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Converts AC to low-voltage DC.</text>
    <line x1="20" y1="165" x2="220" y2="165" stroke="#334155" stroke-width="1" />
    <text x="20" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#EF4444">FAULT POINT (#1 CAUSE):</text>
    <text x="20" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#CBD5E1">Thermal overload, dried capacitor, undersized watts</text>
  </g>

  <!-- Flow Arrow 2 -->
  <polygon points="615,305 605,300 605,310" fill="#06B6D4" />

  <!-- Block 3: Inline PWM Dimmer -->
  <g transform="translate(625, 190)">
    <rect width="230" height="230" rx="16" fill="#1E293B" stroke="#334155" stroke-width="1.5" />
    <rect x="20" y="20" width="40" height="40" rx="8" fill="#F59E0B" fill-opacity="0.15" />
    <text x="40" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#F59E0B" text-anchor="middle">3</text>
    <text x="20" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">Inline PWM Dimmer</text>
    <text x="20" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F59E0B">RF or Touch Receiver</text>
    <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Rapid power modulation.</text>
    <line x1="20" y1="165" x2="210" y2="165" stroke="#334155" stroke-width="1" />
    <text x="20" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#EF4444">FAULT POINT (#2 CAUSE):</text>
    <text x="20" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#CBD5E1">MOSFET chip failure, low Hz camera roll, bad RF sync</text>
  </g>

  <!-- Flow Arrow 3 -->
  <polygon points="885,305 875,300 875,310" fill="#F59E0B" />

  <!-- Block 4: DC Barrel & LED Sign -->
  <g transform="translate(895, 190)">
    <rect width="245" height="230" rx="16" fill="#1E293B" stroke="#10B981" stroke-width="1.5" />
    <rect x="20" y="20" width="40" height="40" rx="8" fill="#10B981" fill-opacity="0.15" />
    <text x="40" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="900" fill="#10B981" text-anchor="middle">4</text>
    <text x="20" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">DC Jack &amp; LED Flex</text>
    <text x="20" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#10B981">5.5×2.1mm + Silicone</text>
    <text x="20" y="145" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Light emission core.</text>
    <line x1="20" y1="165" x2="225" y2="165" stroke="#334155" stroke-width="1" />
    <text x="20" y="185" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#EF4444">FAULT POINT:</text>
    <text x="20" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#CBD5E1">Loose center barrel spring, cold solder joint at wire feed</text>
  </g>

  <!-- Detail Callout Panels -->
  <!-- Callout Left: The 5-Minute Bypass Test -->
  <g transform="translate(60, 460)">
    <rect width="525" height="280" rx="16" fill="#111827" stroke="#334155" stroke-width="1.5" />
    <text x="30" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FBBF24">The 5-Minute Direct Bypass Test (Isolate Dimmer vs Adapter)</text>
    <text x="30" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">1. Unplug the inline dimmer or remote receiver box completely.</text>
    <text x="30" y="98" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">2. Plug the 12V power supply barrel directly into the sign's lead wire.</text>
    <text x="30" y="126" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">3. Turn on mains power at 100% full unregulated current.</text>
    <rect x="30" y="150" width="465" height="100" rx="10" fill="#1E293B" stroke="#475569" stroke-width="1" />
    <text x="45" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#10B981">IF FLICKERING STOPS:</text>
    <text x="45" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">The dimmer is defective. Replace with an RF wireless controller.</text>
    <text x="45" y="224" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#EF4444">IF FLICKERING CONTINUES:</text>
    <text x="45" y="244" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">The power adapter is failing or the DC barrel is loose.</text>
  </g>

  <!-- Callout Right: DC Barrel Jack Inspection -->
  <g transform="translate(615, 460)">
    <rect width="525" height="280" rx="16" fill="#111827" stroke="#334155" stroke-width="1.5" />
    <text x="30" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#06B6D4">5.5mm × 2.1mm DC Barrel Connector Physics</text>
    <text x="30" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Most sign flickers occur when moving cables or from slight vibrations.</text>
    <g transform="translate(30, 95)">
      <!-- Visual diagram of barrel connector -->
      <rect width="180" height="50" rx="6" fill="#334155" stroke="#64748B" stroke-width="1.5" />
      <rect x="180" y="15" width="60" height="20" rx="2" fill="#94A3B8" />
      <circle cx="210" cy="25" r="4" fill="#0B0F19" />
      <text x="90" y="32" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FFFFFF" text-anchor="middle">Outer Sleeve (-)</text>
      <text x="270" y="30" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B">Center Pin (+)</text>
    </g>
    <text x="30" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F8FAFC">Why It Causes Flickering:</text>
    <text x="30" y="202" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">• Center spring loses tension over time, breaking contact under micro-vibrations.</text>
    <text x="30" y="224" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">• 2.5mm vs 2.1mm pin mismatch: a 2.5mm plug on a 2.1mm pin causes intermittent arcs.</text>
    <text x="30" y="246" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#10B981">✓ Quick Fix: Gently tighten spring contact inside the female socket using a plastic pick.</text>
  </g>
</svg>
  `;

  const anatomyDest = path.join(targetDir, "neon-sign-power-supply-and-dimmer-connection.webp");
  await sharp(Buffer.from(anatomySvg))
    .webp({ quality: 90 })
    .toFile(anatomyDest);
  console.log("✓ Created anatomy diagram: neon-sign-power-supply-and-dimmer-connection.webp");

  // 4. Custom 1600x1100 Branded Diagnostic Flowchart Infographic
  const flowchartSvg = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="flowBg" x1="0" y1="0" x2="1600" y2="1100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
    <linearGradient id="amberCard" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.98" />
    </linearGradient>
    <filter id="cardShadow" x="-20" y="-20" width="1640" height="1140" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6" />
    </filter>
  </defs>

  <rect width="1600" height="1100" fill="url(#flowBg)" />

  <!-- Header -->
  <g transform="translate(80, 60)">
    <rect width="280" height="34" rx="17" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-width="1.5" />
    <text x="140" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" text-anchor="middle" letter-spacing="1.5">THE GLOWNIQUE WORKSHOP DIAGNOSTIC</text>
    <text x="0" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
      Neon Sign Flickering: 5-Point Diagnostic Flowchart
    </text>
    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94A3B8">
      Troubleshooting decision tree: isolate whether the fault is in your outlet, 12V power brick, dimmer, barrel jack, or LED flex.
    </text>
  </g>

  <!-- 5 Diagnostic Step Cards in a 5-Column Grid -->
  <!-- STEP 1 -->
  <g transform="translate(80, 220)">
    <rect width="265" height="660" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="44" height="44" rx="12" fill="#F59E0B" fill-opacity="0.15" />
    <text x="46" y="53" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#F59E0B" text-anchor="middle">1</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Bypass Dimmer</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F59E0B">ISOLATE CONTROLLER</text>
    <line x1="24" y1="150" x2="241" y2="150" stroke="#334155" stroke-width="1.5" />
    
    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">ACTION:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Unplug inline dimmer or remote receiver box. Connect 12V adapter directly into sign lead.</text>
    
    <text x="24" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#10B981">IF FLICKER STOPS:</text>
    <text x="24" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Dimmer failed. The internal MOSFET transistor or antenna solder point is damaged.</text>

    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#EF4444">IF FLICKER PERSISTS:</text>
    <text x="24" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Dimmer is innocent. Reconnect dimmer or proceed to Step 2.</text>

    <rect x="24" y="555" width="217" height="75" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24">WORKSHOP STAT:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Resolves ~35% of all reported neon sign flickers.</text>
  </g>

  <!-- STEP 2 -->
  <g transform="translate(375, 220)">
    <rect width="265" height="660" rx="18" fill="url(#amberCard)" stroke="#06B6D4" stroke-width="1.5" />
    <rect x="24" y="24" width="44" height="44" rx="12" fill="#06B6D4" fill-opacity="0.15" />
    <text x="46" y="53" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#06B6D4" text-anchor="middle">2</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Inspect DC Barrel</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#06B6D4">5.5×2.1mm JACK</text>
    <line x1="24" y1="150" x2="241" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">ACTION:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Gently wiggle the barrel connector at the adapter junction. Check for looseness or warmth.</text>

    <text x="24" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#10B981">IF FLICKER OCCURS:</text>
    <text x="24" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Center spring has relaxed or plug is 2.5mm instead of 2.1mm. High contact resistance.</text>

    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FBBF24">THE FIX:</text>
    <text x="24" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Use a wooden toothpick to gently re-tension the female spring contact, or splice a new DC tail.</text>

    <rect x="24" y="555" width="217" height="75" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#06B6D4">COMMON SYMPTOM:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Flickers when door closes or bass vibrates wall.</text>
  </g>

  <!-- STEP 3 -->
  <g transform="translate(670, 220)">
    <rect width="265" height="660" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="44" height="44" rx="12" fill="#F59E0B" fill-opacity="0.15" />
    <text x="46" y="53" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#F59E0B" text-anchor="middle">3</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Check 5-Min Warmth</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F59E0B">THERMAL OVERLOAD</text>
    <line x1="24" y1="150" x2="241" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">ACTION:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Turn sign on from room temperature. Time how long before flickering or shutdown starts.</text>

    <text x="24" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#EF4444">STROBES AFTER 3-5 MIN:</text>
    <text x="24" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Power adapter is overheating. Internal thermal switch trips, cools, resets, creating cyclical strobe.</text>

    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#10B981">THE FIX:</text>
    <text x="24" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Replace power supply with higher amperage unit (e.g., upgrade 12V 3A to 12V 5A).</text>

    <rect x="24" y="555" width="217" height="75" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24">THE 80% RULE:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Total sign watts must not exceed 80% of driver capacity.</text>
  </g>

  <!-- STEP 4 -->
  <g transform="translate(965, 220)">
    <rect width="265" height="660" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="44" height="44" rx="12" fill="#F59E0B" fill-opacity="0.15" />
    <text x="46" y="53" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#F59E0B" text-anchor="middle">4</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Camera vs Naked Eye</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F59E0B">OPTICAL PWM ARTIFACT</text>
    <line x1="24" y1="150" x2="241" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">ACTION:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Check sign with your naked eye. Does it only flicker on phone camera or video monitor?</text>

    <text x="24" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#10B981">IF ONLY ON VIDEO:</text>
    <text x="24" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Zero hardware fault! Camera shutter speed is beating against PWM dimming frequency.</text>

    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FBBF24">THE FIX:</text>
    <text x="24" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Set brightness to 100% (eliminates PWM pulsing), or adjust camera shutter to 1/60s or 1/50s.</text>

    <rect x="24" y="555" width="217" height="75" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24">VIDEO TIP:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Essential for wedding photo booths &amp; TikTok sets.</text>
  </g>

  <!-- STEP 5 -->
  <g transform="translate(1260, 220)">
    <rect width="260" height="660" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="44" height="44" rx="12" fill="#F59E0B" fill-opacity="0.15" />
    <text x="46" y="53" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="900" fill="#F59E0B" text-anchor="middle">5</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#FFFFFF">Inspect Silicone Flex</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="600" fill="#F59E0B">COLD SOLDER JOINTS</text>
    <line x1="24" y1="150" x2="236" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">ACTION:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Does only one letter or segment flicker while the rest stays solid? Gently press the letter tip.</text>

    <text x="24" y="295" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#EF4444">PARTIAL FLICKER:</text>
    <text x="24" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Cold solder joint where lead wire meets copper cut pads, or cracked internal copper trace.</text>

    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#10B981">THE FIX:</text>
    <text x="24" y="440" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Resolder wire lead at copper pad under silicone end-cap, or contact manufacturer under warranty.</text>

    <rect x="24" y="555" width="212" height="75" rx="10" fill="#0F172A" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#10B981">WARRANTY FIRST:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Professional makers cover internal solder defects.</text>
  </g>

  <!-- Bottom Strategy Banner -->
  <g transform="translate(80, 930)">
    <rect width="1440" height="90" rx="14" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
    <circle cx="45" cy="45" r="18" fill="#F59E0B" fill-opacity="0.2" />
    <text x="45" y="51" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#F59E0B" text-anchor="middle">⚡</text>
    <text x="80" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">THE GOLDEN WORKSHOP RULE FOR REPLACEMENT POWER SUPPLIES:</text>
    <text x="80" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">
      Never replace a 12V adapter with higher voltage (e.g. 24V), which permanently fries LED diodes. Always match the voltage exactly and increase amperage headroom by 20% to 30%.
    </text>
    <text x="1400" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="end">theglownique.com</text>
  </g>
</svg>
  `;

  const flowchartDest = path.join(targetDir, "neon-sign-flickering-diagnostic-flowchart.webp");
  await sharp(Buffer.from(flowchartSvg))
    .webp({ quality: 90 })
    .toFile(flowchartDest);
  console.log("✓ Created diagnostic flowchart: neon-sign-flickering-diagnostic-flowchart.webp");
  console.log("All flickering blog assets prepared successfully!");
}

prepareAssets().catch(console.error);
