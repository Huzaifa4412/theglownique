import { createClient } from "@sanity/client";
import { readFile, writeFile } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function loadEnv() {
  try {
    const contents = await readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of contents.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, value] = match;
      if (process.env[key] === undefined) {
        process.env[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  } catch (e) {
    console.error("Failed to load .env.local", e);
  }
}

async function fetchImageBuffer(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch (err) {
    console.warn(`Failed to download image from ${url}:`, err.message);
    return null;
  }
}

function htmlToPortableText(html) {
  const blocks = [];
  let keyCount = 1;

  // Simple regex-based HTML chunker for standard blog tags
  const tagRegex = /<(h2|h3|p|ol|ul|blockquote)>([\s\S]*?)<\/\1>/gi;
  let match;

  while ((match = tagRegex.exec(html)) !== null) {
    const [, tag, content] = match;
    const cleanText = content.replace(/<[^>]+>/g, "").trim();
    if (!cleanText) continue;

    const key = `blk_${keyCount++}`;

    if (tag === "h2") {
      blocks.push({
        _key: key,
        _type: "block",
        style: "h2",
        markDefs: [],
        children: [{ _key: `${key}_c0`, _type: "span", marks: [], text: cleanText }],
      });
    } else if (tag === "h3") {
      blocks.push({
        _key: key,
        _type: "block",
        style: "h3",
        markDefs: [],
        children: [{ _key: `${key}_c0`, _type: "span", marks: [], text: cleanText }],
      });
    } else if (tag === "blockquote") {
      blocks.push({
        _key: key,
        _type: "block",
        style: "blockquote",
        markDefs: [],
        children: [{ _key: `${key}_c0`, _type: "span", marks: [], text: cleanText }],
      });
    } else if (tag === "ol" || tag === "ul") {
      const items = content.match(/<li>([\s\S]*?)<\/li>/gi) || [];
      for (const item of items) {
        const itemText = item.replace(/<[^>]+>/g, "").trim();
        if (!itemText) continue;
        const itemKey = `blk_${keyCount++}`;
        blocks.push({
          _key: itemKey,
          _type: "block",
          style: "normal",
          listItem: tag === "ol" ? "number" : "bullet",
          level: 1,
          markDefs: [],
          children: [{ _key: `${itemKey}_c0`, _type: "span", marks: [], text: itemText }],
        });
      }
    } else {
      // normal paragraph
      blocks.push({
        _key: key,
        _type: "block",
        style: "normal",
        markDefs: [],
        children: [{ _key: `${key}_c0`, _type: "span", marks: [], text: cleanText }],
      });
    }
  }

  return blocks;
}

async function main() {
  await loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-10";

  if (!projectId || !dataset || !token) {
    console.error("Missing Sanity credentials in environment.");
    process.exit(1);
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  // Read the fetched Ubersuggest article JSON from disk
  const articlePath = "C:\\Users\\HUZAIFA\\.gemini\\antigravity-cli\\brain\\b72fc2a3-40d7-48af-8591-bb1d8b71a257\\.system_generated\\steps\\332\\output.txt";
  const rawData = await readFile(articlePath, "utf8");
  const article = JSON.parse(rawData);

  console.log(`\nImporting article: "${article.title}"`);

  // Download and upload featured image
  let assetId = null;
  const imageBuffer = await fetchImageBuffer(article.featured_image_url);
  if (imageBuffer) {
    console.log("Uploading cover image buffer to Sanity...");
    const uploadedAsset = await client.assets.upload("image", imageBuffer, {
      filename: "how-to-choose-neon-color.webp",
    });
    assetId = uploadedAsset._id;
    console.log("Cover image uploaded:", assetId);
  } else {
    console.log("Using local hero image fallback for asset upload...");
    const fallbackPath = path.join(ROOT, "public", "hero", "neon-sign-hero.webp");
    if (existsSync(fallbackPath)) {
      const uploadedAsset = await client.assets.upload("image", createReadStream(fallbackPath), {
        filename: "neon-color-guide.webp",
      });
      assetId = uploadedAsset._id;
    }
  }

  const bodyBlocks = htmlToPortableText(article.content);
  console.log(`Parsed ${bodyBlocks.length} body blocks.`);

  const slug = "how-to-choose-the-right-neon-color-for-your-sign";
  const docId = `post-${slug}`;

  const postDoc = {
    _id: docId,
    _type: "post",
    title: article.title,
    slug: { _type: "slug", current: slug },
    seoTitle: "How to Choose Right Neon Sign Color",
    seoDescription: "Practical guide to choosing the right neon sign color for storefronts, weddings, and home decor. Ambient lighting, contrast, and digital mockup checklist.",
    primaryKeyword: "choose right neon color",
    summary: "Choosing a neon color isn't just about personal taste—ambient light, background contrast, and viewing distance change how glowing colors read in real life. Here is our workshop checklist for picking the right hue for your storefront, wedding, or interior wall.",
    author: {
      _type: "reference",
      _ref: "author.workshop-lead",
    },
    category: {
      _type: "reference",
      _ref: "category.colour-and-design",
    },
    coverImage: assetId
      ? {
          _type: "image",
          asset: { _type: "reference", _ref: assetId },
          alt: "Comparison of glowing LED neon colors including warm white, electric blue, and hot pink",
          caption: "LED neon flex delivers 13+ consistent, vibrant colors under optical silicone extrusion.",
        }
      : undefined,
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    readingMinutes: 8,
    featured: true,
    indexable: true,
    keyTakeaways: [
      "Ambient light is king: High-contrast saturated hues (white, blue, red) hold up in bright daylight, while softer amber and blush pink thrive in evening settings.",
      "Contrast beats saturation: Neon yellow or lime green can vanish against light walls; dark backdrops amplify glow dramatically.",
      "Use-case color psychology: Hot pink projects energetic hospitality; electric blue signals corporate trust; warm amber creates cozy boutique intimacy.",
      "LED silicone vs glass: Flexible silicone neon flex delivers uniform, dot-free lighting across 13+ consistent Pantone-matched colors without high heat.",
      "Always test in context: A 2-hour free digital mockup under realistic ambient lighting prevents expensive installation color regrets."
    ],
    faqs: [
      {
        _key: "faq1",
        _type: "faq",
        q: "Which neon colors are most visible in direct sunlight?",
        a: "White, vivid red, and saturated electric blue hold contrast best in direct sunlight. Lighter hues like neon yellow or lime green tend to wash out faster against bright exterior walls."
      },
      {
        _key: "faq2",
        _type: "faq",
        q: "What is the best neon color for wedding photos?",
        a: "Warm white (2700K–3000K), soft blush pink, and warm amber photograph most naturally without blowing out the camera sensor or clashing with floral arrangements."
      },
      {
        _key: "faq3",
        _type: "faq",
        q: "Why does a neon color look different on a wall than on a computer screen?",
        a: "Screens emit RGB light from pixels, whereas physical signs emit light that reflects off surrounding paint, decor, and architectural surfaces. Wall color and ambient lighting shift how the glow is perceived."
      },
      {
        _key: "faq4",
        _type: "faq",
        q: "Can I dim my neon sign if the color is too intense at night?",
        a: "Yes. All The Glownique LED neon signs can be paired with a wireless RF remote that controls brightness from 1% to 100%, allowing you to adjust the mood effortlessly."
      },
      {
        _key: "faq5",
        _type: "faq",
        q: "How accurate is the color in a digital mockup compared to the finished sign?",
        a: "Our mockups simulate actual optical-grade silicone tubing and acrylic backboards under real room lighting, giving an accurate preview before handcrafted production starts."
      }
    ],
    relatedLinks: [
      {
        _key: "rel1",
        _type: "relatedLink",
        kind: "commercial",
        label: "Custom LED Neon Signs",
        href: "/products/custom-neon-signs",
        description: "Handcrafted from flexible silicone tubing with 13 vibrant colors and free design preview."
      },
      {
        _key: "rel2",
        _type: "relatedLink",
        kind: "guide",
        label: "Custom Business Sign Cost Guide",
        href: "/guides/custom-business-sign-cost",
        description: "Understand sign technology, sizing, illumination styles, and pricing drivers."
      }
    ],
    sources: [
      {
        _key: "src1",
        _type: "source",
        label: "Perceivable Color Contrast and Legibility Standards",
        publisher: "W3C Web Accessibility Guidelines (WCAG)",
        accessed: "2026-08-28"
      },
      {
        _key: "src2",
        _type: "source",
        label: "Human Eye Color Sensitivity and Wavelength Perception in Luminous Displays",
        publisher: "Illuminating Engineering Society (IES)",
        accessed: "2026-08-28"
      }
    ],
    body: bodyBlocks,
  };

  console.log("Writing document to Sanity Content Lake...");
  const result = await client.createOrReplace(postDoc);
  console.log(`\n✓ Successfully published post to Sanity!`);
  console.log(`  Document ID: ${result._id}`);
  console.log(`  Public URL:  https://www.theglownique.com/blog/${slug}\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
