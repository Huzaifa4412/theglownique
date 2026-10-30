import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const targetDir = path.join(ROOT, "public", "blog", "how-long-does-a-custom-neon-sign-take");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function prepareAssets() {
  console.log("Preparing lead-time blog image assets...");

  // 1. Cover: High-res illuminated neon sign
  const heroSrc = path.join(ROOT, "public", "hero", "neon-sign-hero.webp");
  const coverDest = path.join(targetDir, "custom-neon-sign-lead-time-production-cover.webp");
  await sharp(heroSrc)
    .resize({ width: 1200, height: 800, fit: "cover", position: "center" })
    .webp({ quality: 88 })
    .toFile(coverDest);
  console.log("✓ Created cover: custom-neon-sign-lead-time-production-cover.webp");

  // 2. Real Venue/Backdrop Packshot
  const weddingSrc = path.join(ROOT, "public", "neon-sign", "wedding", "iap_600x600.7067612362_80odpmx4.webp");
  const venueDest = path.join(targetDir, "protective-packaging-and-crating-delivery.webp");
  await sharp(weddingSrc)
    .resize({ width: 1000, height: 750, fit: "cover" })
    .webp({ quality: 85 })
    .toFile(venueDest);
  console.log("✓ Created protective-packaging-and-crating-delivery.webp");

  // 3. Technical Timeline Flowchart (1600x1050)
  const flowchartSvg = `
<svg width="1600" height="1050" viewBox="0 0 1600 1050" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1600" y2="1050" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#090D16" />
      <stop offset="50%" stop-color="#0F172A" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
    <linearGradient id="amberCard" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#3B82F6" />
    </linearGradient>
    <linearGradient id="amberGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="emeraldGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#059669" />
    </linearGradient>
    <linearGradient id="purpleGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#A855F7" />
      <stop offset="100%" stop-color="#7C3AED" />
    </linearGradient>
  </defs>

  <rect width="1600" height="1050" fill="url(#bgGrad)" />

  <!-- Header Section -->
  <g transform="translate(80, 50)">
    <rect width="320" height="32" rx="16" fill="#06B6D4" fill-opacity="0.15" stroke="#06B6D4" stroke-width="1.5" />
    <text x="160" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#22D3EE" text-anchor="middle" letter-spacing="1.5">END-TO-END PRODUCTION ROADMAP</text>
    <text x="0" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#FFFFFF">How Long Does a Custom Neon Sign Take?</text>
    <text x="0" y="108" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#94A3B8">From initial vector mockup approval through CNC fabrication, 48-hour burn-in QC, and tracked courier delivery</text>
  </g>

  <!-- 4 Stage Cards Grid -->
  <!-- STAGE 1: Mockup & Design -->
  <g transform="translate(80, 200)">
    <rect width="335" height="680" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="48" height="48" rx="14" fill="#06B6D4" fill-opacity="0.15" />
    <text x="48" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#06B6D4" text-anchor="middle">1</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">Vector Mockup</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#06B6D4">WITHIN 24 HOURS</text>
    <line x1="24" y1="150" x2="311" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">WHAT HAPPENS:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Master vector digitizing of customer logo or font.</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Precise acrylic backboard cutline generation.</text>
    <text x="24" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Sizing, colour codes, and mounting points visualised.</text>

    <text x="24" y="315" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FBBF24">CRITICAL RULES:</text>
    <text x="24" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• 24-hr turnaround including weekends.</text>
    <text x="24" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Unlimited free revisions standing policy.</text>
    <text x="24" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Production clock begins only after formal sign-off.</text>

    <rect x="24" y="555" width="287" height="95" rx="12" fill="#0B132B" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#06B6D4">SPEED PRO TIP:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Provide vector files (AI, EPS, SVG, PDF) to</text>
    <text x="36" y="625" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">bypass raster redraw delays completely.</text>
  </g>

  <!-- STAGE 2: CNC & Assembly -->
  <g transform="translate(450, 200)">
    <rect width="335" height="680" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="48" height="48" rx="14" fill="#F59E0B" fill-opacity="0.15" />
    <text x="48" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#F59E0B" text-anchor="middle">2</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">CNC &amp; Assembly</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#F59E0B">3 TO 5 BUSINESS DAYS</text>
    <line x1="24" y1="150" x2="311" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">WORKSHOP STEPS:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">High-speed CNC milling of 5mm cast acrylic.</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Flame polishing of outer contour perimeter.</text>
    <text x="24" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Hand-forming optical silicone LED neon flex.</text>
    <text x="24" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Precision copper pad lead-wire micro-soldering.</text>

    <text x="24" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FBBF24">FABRICATION REALITY:</text>
    <text x="24" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Intricate script lettering requires manual bending.</text>
    <text x="24" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• IP67 outdoor signs require 24h silicone cure.</text>
    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Channel letters &amp; lightboxes take 3–10 days.</text>

    <rect x="24" y="555" width="287" height="95" rx="12" fill="#0B132B" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#F59E0B">STANDARDS USED:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">IPC/WHMA-A-620 Class 2 soldering criteria</text>
    <text x="36" y="625" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">for zero cold-solder hairline fractures.</text>
  </g>

  <!-- STAGE 3: 48-Hour QC Burn-In -->
  <g transform="translate(820, 200)">
    <rect width="335" height="680" rx="18" fill="url(#amberCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="24" y="24" width="48" height="48" rx="14" fill="#A855F7" fill-opacity="0.15" />
    <text x="48" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#A855F7" text-anchor="middle">3</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">48-Hour QC Test</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#A855F7">CONTINUOUS BURN-IN</text>
    <line x1="24" y1="150" x2="311" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">WHY IT CANNOT BE SKIPPED:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Continuous 48-hr full-load stress testing.</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Tests 12V driver thermal equilibrium under load.</text>
    <text x="24" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Verifies wireless RF dimmer response curve.</text>
    <text x="24" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Eliminates early component infant mortality.</text>

    <text x="24" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FBBF24">BENEFIT TO BUYER:</text>
    <text x="24" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• 0% DOA (Dead on Arrival) failure rate.</text>
    <text x="24" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Prevents wedding &amp; event day disaster.</text>
    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Backs The Glownique 5-year warranty.</text>

    <rect x="24" y="555" width="287" height="95" rx="12" fill="#0B132B" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#A855F7">QUALITY GATE:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">Signs that fail thermal or flicker checks are</text>
    <text x="36" y="625" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">re-wired before packing, not shipped broken.</text>
  </g>

  <!-- STAGE 4: Packing & Express Air Transit -->
  <g transform="translate(1190, 200)">
    <rect width="335" height="680" rx="18" fill="url(#amberCard)" stroke="#10B981" stroke-width="1.5" />
    <rect x="24" y="24" width="48" height="48" rx="14" fill="#10B981" fill-opacity="0.15" />
    <text x="48" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="#10B981" text-anchor="middle">4</text>
    <text x="24" y="105" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF">Express Transit</text>
    <text x="24" y="130" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#10B981">3 TO 8 BUSINESS DAYS</text>
    <line x1="24" y1="150" x2="311" y2="150" stroke="#334155" stroke-width="1.5" />

    <text x="24" y="180" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#E2E8F0">CRATING &amp; SHIPPING:</text>
    <text x="24" y="205" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Triple-layer high-density EPE foam wrapping.</text>
    <text x="24" y="230" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Reinforced honeycomb carton or timber crating.</text>
    <text x="24" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Air courier dispatch via DHL / FedEx / UPS.</text>
    <text x="24" y="280" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Door-to-door tracking notifications.</text>

    <text x="24" y="340" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" fill="#FBBF24">TOTAL TURNAROUND:</text>
    <text x="24" y="365" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Standard Door-to-Door: 7–14 business days.</text>
    <text x="24" y="390" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Free worldwide shipping standing policy.</text>
    <text x="24" y="415" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">• Rush orders prioritised at no extra fee.</text>

    <rect x="24" y="555" width="287" height="95" rx="12" fill="#0B132B" stroke="#1E293B" />
    <text x="36" y="582" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#10B981">RUSH TRACK:</text>
    <text x="36" y="605" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">State your exact required date at checkout;</text>
    <text x="36" y="625" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="400" fill="#94A3B8">workshop prioritises queue placement.</text>
  </g>

  <!-- Bottom Summary Banner -->
  <g transform="translate(80, 915)">
    <rect width="1445" height="85" rx="14" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
    <circle cx="45" cy="42" r="18" fill="#06B6D4" fill-opacity="0.2" />
    <text x="45" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#22D3EE" text-anchor="middle">⏱</text>
    <text x="80" y="36" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">THE GLOWNIQUE SUMMARY TIMELINE:</text>
    <text x="80" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">
      LED Neon: 3–5 days production + 3–8 days transit (7–14 days total). Channel Letters &amp; Lightboxes: 3–10 days production (10–18 days total).
    </text>
    <text x="1405" y="48" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="end">theglownique.com</text>
  </g>
</svg>
  `;

  const flowchartDest = path.join(targetDir, "custom-neon-sign-production-timeline-flowchart.webp");
  await sharp(Buffer.from(flowchartSvg))
    .webp({ quality: 90 })
    .toFile(flowchartDest);
  console.log("✓ Created timeline flowchart: custom-neon-sign-production-timeline-flowchart.webp");

  // 4. Event Planning Countdown Matrix (1600x1050)
  const matrixSvg = `
<svg width="1600" height="1050" viewBox="0 0 1600 1050" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad2" x1="0" y1="0" x2="1600" y2="1050" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>
    <linearGradient id="rowCard" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1E293B" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>
  </defs>

  <rect width="1600" height="1050" fill="url(#bgGrad2)" />

  <!-- Header Section -->
  <g transform="translate(80, 50)">
    <rect width="330" height="32" rx="16" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-width="1.5" />
    <text x="165" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" text-anchor="middle" letter-spacing="1.5">DEADLINE &amp; EVENT PLANNING</text>
    <text x="0" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="800" fill="#FFFFFF">Custom Sign Event Planning Countdown Matrix</text>
    <text x="0" y="108" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#94A3B8">Recommended ordering windows, fabrication buffers, and transit allowances by project archetype</text>
  </g>

  <!-- 4 Archetype Rows -->
  <!-- ROW 1: Weddings & Social Events -->
  <g transform="translate(80, 180)">
    <rect width="1440" height="150" rx="16" fill="url(#rowCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="25" y="25" width="220" height="100" rx="12" fill="#EC4899" fill-opacity="0.15" stroke="#EC4899" stroke-width="1" />
    <text x="135" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#F472B6" text-anchor="middle">WEDDINGS &amp;</text>
    <text x="135" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">RECEPTIONS</text>

    <!-- Column 1: Order Window -->
    <g transform="translate(280, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">RECOMMENDED WINDOW</text>
      <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#EC4899">3 TO 4 WEEKS</text>
      <text x="0" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Prior to wedding or rehearsal date</text>
    </g>

    <!-- Column 2: Key Milestones -->
    <g transform="translate(620, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">FABRICATION &amp; TRANSIT</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• 3–5 business days precision silicone bending</text>
      <text x="0" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• 3–8 business days express tracked air courier</text>
    </g>

    <!-- Column 3: The Critical Buffer -->
    <g transform="translate(1030, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">WHY THE 7-DAY BUFFER MATTERS</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Allows unboxing, floral arch test-hanging,</text>
      <text x="0" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">dimmer RF pairing, and venue photo lighting checks.</text>
    </g>
  </g>

  <!-- ROW 2: Commercial Storefronts & Restaurants -->
  <g transform="translate(80, 355)">
    <rect width="1440" height="150" rx="16" fill="url(#rowCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="25" y="25" width="220" height="100" rx="12" fill="#06B6D4" fill-opacity="0.15" stroke="#06B6D4" stroke-width="1" />
    <text x="135" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#22D3EE" text-anchor="middle">STOREFRONTS &amp;</text>
    <text x="135" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">RESTAURANTS</text>

    <!-- Column 1: Order Window -->
    <g transform="translate(280, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">RECOMMENDED WINDOW</text>
      <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#06B6D4">4 TO 5 WEEKS</text>
      <text x="0" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Prior to grand opening inspection</text>
    </g>

    <!-- Column 2: Key Milestones -->
    <g transform="translate(620, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">FABRICATION &amp; TRANSIT</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• 3–10 business days for Channel Letters / Lightbox</text>
      <text x="0" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• 3–8 business days heavy timber-crated freight</text>
    </g>

    <!-- Column 3: The Critical Buffer -->
    <g transform="translate(1030, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">WHY THE 14-DAY BUFFER MATTERS</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Accommodates commercial electrician scheduling,</text>
      <text x="0" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">raceway mounting, and municipal building sign-off.</text>
    </g>
  </g>

  <!-- ROW 3: Trade Shows & Corporate Expos -->
  <g transform="translate(80, 530)">
    <rect width="1440" height="150" rx="16" fill="url(#rowCard)" stroke="#334155" stroke-width="1.5" />
    <rect x="25" y="25" width="220" height="100" rx="12" fill="#A855F7" fill-opacity="0.15" stroke="#A855F7" stroke-width="1" />
    <text x="135" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#C084FC" text-anchor="middle">TRADE SHOWS &amp;</text>
    <text x="135" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">CORPORATE EXPOS</text>

    <!-- Column 1: Order Window -->
    <g transform="translate(280, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">RECOMMENDED WINDOW</text>
      <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#A855F7">3 TO 4 WEEKS</text>
      <text x="0" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Prior to advance booth freight marshaling</text>
    </g>

    <!-- Column 2: Key Milestones -->
    <g transform="translate(620, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">FABRICATION &amp; TRANSIT</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• 3–5 days LED neon / 3–10 days UV Acrylic logo</text>
      <text x="0" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• 3–8 days direct express transit to venue/hotel</text>
    </g>

    <!-- Column 3: The Critical Buffer -->
    <g transform="translate(1030, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">WHY THE 7-DAY BUFFER MATTERS</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Convention drayage deadlines require signs to arrive</text>
      <text x="0" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">at the advance warehouse before direct show-floor delivery.</text>
    </g>
  </g>

  <!-- ROW 4: Rush Orders Protocol -->
  <g transform="translate(80, 705)">
    <rect width="1440" height="150" rx="16" fill="url(#rowCard)" stroke="#10B981" stroke-width="1.5" />
    <rect x="25" y="25" width="220" height="100" rx="12" fill="#10B981" fill-opacity="0.15" stroke="#10B981" stroke-width="1" />
    <text x="135" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="800" fill="#34D399" text-anchor="middle">RUSH ORDER</text>
    <text x="135" y="90" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF" text-anchor="middle">FAST TRACK</text>

    <!-- Column 1: Order Window -->
    <g transform="translate(280, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">TIGHTEST EXPEDITE</text>
      <text x="0" y="55" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="900" fill="#10B981">7 TO 9 DAYS</text>
      <text x="0" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#CBD5E1">Door-to-door express delivery</text>
    </g>

    <!-- Column 2: Key Milestones -->
    <g transform="translate(620, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#94A3B8" letter-spacing="1">WORKSHOP POLICY</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• Zero rush fees: priority scheduling at NO extra charge</text>
      <text x="0" y="75" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#FFFFFF">• Customer must state required date during checkout</text>
    </g>

    <!-- Column 3: The Critical Buffer -->
    <g transform="translate(1030, 35)">
      <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="700" fill="#FBBF24" letter-spacing="1">HOW WE MAKE IT HAPPEN</text>
      <text x="0" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">Immediate vector routing, front-of-queue CNC milling,</text>
      <text x="0" y="70" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94A3B8">and priority air courier manifest booking.</text>
    </g>
  </g>

  <!-- Bottom Notice -->
  <g transform="translate(80, 885)">
    <rect width="1440" height="95" rx="14" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
    <circle cx="45" cy="48" r="18" fill="#F59E0B" fill-opacity="0.2" />
    <text x="45" y="54" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#FBBF24" text-anchor="middle">★</text>
    <text x="80" y="40" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">THE GLOWNIQUE COMMITMENT:</text>
    <text x="80" y="65" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">
      Free worldwide delivery is a permanent standing policy with no hidden freight surcharges. Every sign includes free mockups within 24 hours.
    </text>
    <text x="1400" y="52" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="end">theglownique.com</text>
  </g>
</svg>
  `;

  const matrixDest = path.join(targetDir, "custom-sign-event-planning-countdown-matrix.webp");
  await sharp(Buffer.from(matrixSvg))
    .webp({ quality: 90 })
    .toFile(matrixDest);
  console.log("✓ Created countdown matrix: custom-sign-event-planning-countdown-matrix.webp");

  console.log("All lead-time blog assets prepared successfully!");
}

prepareAssets().catch(console.error);
