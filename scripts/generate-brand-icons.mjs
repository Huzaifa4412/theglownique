/**
 * Regenerates every derived brand asset from the single source of truth,
 * `public/logo.svg` (the rose-gold GQ mark).
 *
 * Run it after the logo changes:  npm run brand:icons
 *
 * The logo is used whole. Nothing is trimmed and nothing is cropped, so the
 * artwork's own canvas margin becomes the padding in every output and the mark
 * you see here is the mark you drew. That costs legibility at 16px — a 1.67:1
 * canvas centred in a square leaves the letterforms about 60% of the height —
 * which is the accepted trade for showing the complete mark everywhere.
 *
 * Two families come out of one file:
 *
 *   Square tab/app icons  (app/favicon.ico, app/icon.png, app/apple-icon.png)
 *     The whole canvas, contained on an opaque plum square. Zero extra padding:
 *     the source already carries margin, and at 16px every pixel of letterform
 *     counts.
 *
 *   Wide lockup marks  (public/brand/logo-mark.png, public/brand/logo-512.png)
 *     The same canvas as a transparent PNG for the header/footer lockups, plus
 *     a squared version for structured data.
 *
 * sharp is not a direct dependency — it arrives via next/sanity. If this script
 * ever fails to resolve it, install it as a devDependency rather than reaching
 * for a different rasteriser: the SVG wraps a masked bitmap, and sharp's librsvg
 * handles that correctly.
 */
import { writeFileSync } from "node:fs";
import sharp from "sharp";

const SRC = "public/logo.svg";

// Same plum the footer gradient opens on, so the tab icon reads as part of the
// site rather than a stray sticker. The mark's rose-gold and pink neon sit on it
// the way the signage sits on a dark wall.
const BG = { r: 0x17, g: 0x0c, b: 0x24, alpha: 1 };

// Density 600 renders the SVG's embedded bitmap to 4167x2500 — well above every
// output size below, so nothing is ever upscaled.
const source = await sharp(SRC, { density: 600 })
  .png()
  .toBuffer({ resolveWithObject: true });

/** Centres the full logo canvas on an opaque plum square. */
async function square(size, pad = 0) {
  const inner = Math.round(size * (1 - pad * 2));
  const fitted = await sharp(source.data)
    .resize({ width: inner, height: inner, fit: "inside" })
    .toBuffer({ resolveWithObject: true });

  return sharp({
    create: { width: size, height: size, channels: 4, background: BG },
  })
    .composite([
      {
        input: fitted.data,
        left: Math.round((size - fitted.info.width) / 2),
        top: Math.round((size - fitted.info.height) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

/**
 * Assembles a multi-size .ico. sharp cannot write the format, so the container
 * is built by hand with PNG-compressed entries — read by every browser Next 16
 * supports.
 */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon (2 would be cursor)
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;
  const directory = entries.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size, 0); // width  (0 would mean 256)
    entry.writeUInt8(size, 1); // height
    entry.writeUInt8(0, 2); // palette entries — 0 for truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });

  return Buffer.concat([header, ...directory, ...entries.map((e) => e.png)]);
}

// --- Square icons, picked up by Next's app/ file conventions ---------------
writeFileSync("app/icon.png", await square(512));
writeFileSync("app/apple-icon.png", await square(180));
writeFileSync(
  "app/favicon.ico",
  ico([
    { size: 16, png: await square(16) },
    { size: 32, png: await square(32) },
    { size: 48, png: await square(48) },
  ]),
);

// --- Wide lockup marks, referenced from components and JSON-LD -------------
// 480px is well over 3x the ~73px the header renders it at, so it stays sharp
// on high-density screens while next/image serves AVIF/WebP downscales.
const lockup = await sharp(source.data)
  .resize({ width: 480 })
  .png({ compressionLevel: 9 })
  .toFile("public/brand/logo-mark.png");

// Square version for structured data and social profiles, where a wide
// transparent PNG gets cropped or letterboxed unpredictably.
writeFileSync("public/brand/logo-512.png", await square(512));

console.log(
  [
    `source        ${source.info.width}x${source.info.height} (untrimmed)`,
    `app/icon.png  512x512`,
    `apple-icon    180x180`,
    `favicon.ico   16, 32, 48`,
    `logo-mark     ${lockup.width}x${lockup.height}`,
    `logo-512      512x512`,
  ].join("\n"),
);
