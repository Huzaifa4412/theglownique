import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const targetDir = path.join(ROOT, "public", "blog", "backlit-signage-vs-light-box-signs");
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

async function prepareAssets() {
  console.log("Preparing blog image assets...");

  // 1. Cover: Salon Reception Backlit Sign
  const coverSrc = path.join(ROOT, "public", "3d-metallic-neon-sign", "Salon", "custom-salon-logo-sign-halo-lit.webp");
  const coverDest = path.join(targetDir, "backlit-signage-salon-reception.webp");
  fs.copyFileSync(coverSrc, coverDest);
  console.log("✓ Created cover: backlit-signage-salon-reception.webp");

  // 2. Round Lightbox in Interior
  const roundSrc = path.join(ROOT, "public", "ultra-thin-slim-lightbox", "lobbies-and-branding.jpg");
  const roundDest = path.join(targetDir, "round-lightbox-sign-interior.webp");
  await sharp(roundSrc)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(roundDest);
  console.log("✓ Created round-lightbox-sign-interior.webp");

  // 3. Restaurant Menu Lightbox
  const menuSrc = path.join(ROOT, "public", "ultra-thin-slim-lightbox", "menu-boards.jpg");
  const menuDest = path.join(targetDir, "restaurant-menu-lightbox-display.webp");
  await sharp(menuSrc)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(menuDest);
  console.log("✓ Created restaurant-menu-lightbox-display.webp");

  // 4. Custom 1600x1100 Branded Infographic
  const svg = `
<svg width="1600" height="1100" viewBox="0 0 1600 1100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGradient" x1="0" y1="0" x2="1600" y2="1100" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#0B0F19" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1E1B4B" />
    </linearGradient>

    <!-- Gold Accent Gradient -->
    <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDE68A" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>

    <!-- Cyan Accent Gradient -->
    <linearGradient id="cyanGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#67E8F9" />
      <stop offset="50%" stop-color="#06B6D4" />
      <stop offset="100%" stop-color="#0284C7" />
    </linearGradient>

    <!-- Card 1 Glass Gradient -->
    <linearGradient id="card1Grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95" />
    </linearGradient>

    <!-- Card 2 Glass Gradient -->
    <linearGradient id="card2Grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E293B" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.95" />
    </linearGradient>

    <!-- Shadow filters -->
    <filter id="cardShadow" x="-20" y="-20" width="1640" height="1140" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.55" />
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1600" height="1100" fill="url(#bgGradient)" />

  <!-- Header Section -->
  <g transform="translate(80, 70)">
    <!-- Brand / Topic Badge -->
    <rect width="270" height="34" rx="17" fill="#F59E0B" fill-opacity="0.15" stroke="#F59E0B" stroke-width="1.5" />
    <text x="135" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#FBBF24" text-anchor="middle" letter-spacing="1.5">THE GLOWNIQUE ARCHITECTURAL GUIDE</text>

    <!-- Title -->
    <text x="0" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">
      Backlit Signage vs. Light Box Signs
    </text>

    <!-- Subtitle -->
    <text x="0" y="125" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94A3B8">
      Engineering comparison: indirect halo reflection vs. ultra-thin edge-lit acrylic light guide plates (LGP).
    </text>
  </g>

  <!-- 2 Major Columns -->

  <!-- LEFT CARD: HALO BACKLIT LETTERS -->
  <g transform="translate(80, 230)" filter="url(#cardShadow)">
    <!-- Outer Card Background -->
    <rect width="695" height="690" rx="20" fill="url(#card1Grad)" stroke="#F59E0B" stroke-width="2" stroke-opacity="0.6" />

    <!-- Card Header Badge -->
    <rect x="36" y="36" width="340" height="42" rx="10" fill="#F59E0B" fill-opacity="0.15" />
    <circle cx="56" cy="57" r="7" fill="#F59E0B" />
    <text x="74" y="63" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#FDE68A" letter-spacing="0.5">HALO BACKLIT SIGNAGE</text>
    <text x="36" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">Sculptural Architectural Letters</text>
    <text x="36" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="400" fill="#94A3B8">Solid 3D metal face with indirect wall reflection</text>

    <!-- Divider Line -->
    <line x1="36" y1="160" x2="659" y2="160" stroke="#334155" stroke-width="1.5" />

    <!-- Feature Row 1: Optical Mechanism -->
    <g transform="translate(36, 185)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B" letter-spacing="1">LIGHT PATH &amp; OPTICS</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#F8FAFC">Indirect reverse wash onto wall surface</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">LEDs fire backwards through clear optical backs; face stays 100% opaque.</text>
    </g>

    <!-- Feature Row 2: Structural Depth & Standoffs -->
    <g transform="translate(36, 270)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B" letter-spacing="1">STRUCTURAL DEPTH &amp; STANDOFFS</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#F8FAFC">40 mm – 90 mm overall (20–40 mm standoffs)</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Standoff length controls halo spread. Fully satisfies ADA §307.2 (under 4 in).</text>
    </g>

    <!-- Feature Row 3: Wall Surface Dependency -->
    <g transform="translate(36, 355)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B" letter-spacing="1">WALL FINISH DEPENDENCY</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#EF4444">CRITICAL (Wall is the optical reflector)</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Matte plaster, wood, stone produce smooth glow. Gloss or tile requires backer panel.</text>
    </g>

    <!-- Feature Row 4: Photography Performance -->
    <g transform="translate(36, 440)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B" letter-spacing="1">CAMERA &amp; REELS BEHAVIOUR</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#10B981">Zero glare / blowout on smartphone lenses</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Camera sensor exposes silhouette and warm glow cleanly without lens flare.</text>
    </g>

    <!-- Feature Row 5: Best Application -->
    <g transform="translate(36, 525)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#F59E0B" letter-spacing="1">IDEAL FIT-OUT USE CASE</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#FDE68A">Permanent corporate logo &amp; reception branding</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Luxury hotels, salon feature walls, executive suites, medical clinic entrances.</text>
    </g>
  </g>

  <!-- RIGHT CARD: ULTRA-THIN LIGHT BOX -->
  <g transform="translate(825, 230)" filter="url(#cardShadow)">
    <!-- Outer Card Background -->
    <rect width="695" height="690" rx="20" fill="url(#card2Grad)" stroke="#06B6D4" stroke-width="2" stroke-opacity="0.6" />

    <!-- Card Header Badge -->
    <rect x="36" y="36" width="340" height="42" rx="10" fill="#06B6D4" fill-opacity="0.15" />
    <circle cx="56" cy="57" r="7" fill="#06B6D4" />
    <text x="74" y="63" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#67E8F9" letter-spacing="0.5">ULTRA-THIN LIGHT BOX</text>
    <text x="36" y="112" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">Edge-Lit Information Display</text>
    <text x="36" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="400" fill="#94A3B8">Laser-etched light guide plate (LGP) with snap frame</text>

    <!-- Divider Line -->
    <line x1="36" y1="160" x2="659" y2="160" stroke="#334155" stroke-width="1.5" />

    <!-- Feature Row 1: Optical Mechanism -->
    <g transform="translate(36, 185)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#06B6D4" letter-spacing="1">LIGHT PATH &amp; OPTICS</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#F8FAFC">Direct forward throw via internal reflection</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Perimeter LEDs fire sideways into an acrylic dot matrix plate for 100% even face glow.</text>
    </g>

    <!-- Feature Row 2: Structural Depth & Standoffs -->
    <g transform="translate(36, 270)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#06B6D4" letter-spacing="1">STRUCTURAL DEPTH &amp; PROFILE</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#F8FAFC">~25 mm (Under 1 inch ultra-slim profile)</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Flush wall-mounted. Eliminates bulky 100 mm+ traditional cabinet depth.</text>
    </g>

    <!-- Feature Row 3: Wall Surface Dependency -->
    <g transform="translate(36, 355)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#06B6D4" letter-spacing="1">WALL FINISH DEPENDENCY</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#10B981">ZERO (Fully enclosed optical chassis)</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Wall texture, gloss, or colour has zero effect. Perfect for leased units &amp; tiles.</text>
    </g>

    <!-- Feature Row 4: Graphic Changeability -->
    <g transform="translate(36, 440)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#06B6D4" letter-spacing="1">MESSAGE &amp; GRAPHIC UPDATES</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#10B981">Swaps in under 60 seconds without tools</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Front snap frame or magnetic cover allows quick replacement of printed translucent films.</text>
    </g>

    <!-- Feature Row 5: Best Application -->
    <g transform="translate(36, 525)">
      <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="700" fill="#06B6D4" letter-spacing="1">IDEAL FIT-OUT USE CASE</text>
      <text x="0" y="24" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="600" fill="#67E8F9">Changeable operational communications</text>
      <text x="0" y="46" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">Café &amp; restaurant menu boards, seasonal retail promotions, price lists, wayfinding.</text>
    </g>
  </g>

  <!-- Bottom Strategy Banner -->
  <g transform="translate(80, 950)">
    <rect width="1440" height="90" rx="14" fill="#1E293B" stroke="#475569" stroke-width="1.5" />
    <circle cx="45" cy="45" r="18" fill="#F59E0B" fill-opacity="0.2" />
    <text x="45" y="51" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="900" fill="#F59E0B" text-anchor="middle">★</text>
    <text x="80" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#FFFFFF">THE COMMERCIAL HYBRID STANDARD:</text>
    <text x="80" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="#94A3B8">
      Specify halo backlit letters for the permanent brand wall that photographs without glare; deploy ultra-thin light boxes for messages that change monthly.
    </text>
    <text x="1400" y="50" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="600" fill="#64748B" text-anchor="end">theglownique.com</text>
  </g>
</svg>
  `;

  const infographicDest = path.join(targetDir, "backlit-signage-vs-lightbox-engineering-diagram.webp");
  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(infographicDest);
  console.log("✓ Created custom infographic: backlit-signage-vs-lightbox-engineering-diagram.webp");
  console.log("All assets prepared successfully!");
}

prepareAssets().catch(console.error);
