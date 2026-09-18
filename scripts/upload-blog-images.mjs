import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readFile } from "node:fs/promises";
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
        process.env[key] = value.replace(/^["']|["']$/g, "").trim();
      }
    }
  } catch (err) {
    console.error("Error reading .env.local", err);
  }
}

async function main() {
  await loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-10";

  if (!projectId || !dataset || !token) {
    console.error("Missing project ID, dataset, or write token.");
    process.exit(1);
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  const files = [
    {
      key: "christmas-star",
      rel: "public/blog/christmas-neon-sign-ideas/christmas-star-display.webp",
    },
    {
      key: "coffee-bar",
      rel: "public/blog/coffee-bar-sign-ideas/home-coffee-corner.webp",
    },
    {
      key: "halloween-ghost",
      rel: "public/blog/halloween-neon-sign-ideas/ghost-photo-backdrop.webp",
    },
    {
      key: "halloween-pumpkin",
      rel: "public/blog/halloween-neon-sign-ideas/pumpkin-coffee-corner.webp",
    },
  ];

  const results = {};

  for (const item of files) {
    const fullPath = path.join(ROOT, item.rel);
    console.log(`Uploading ${item.key} from ${item.rel}...`);
    const asset = await client.assets.upload("image", createReadStream(fullPath), {
      filename: path.basename(fullPath),
    });
    results[item.key] = {
      _id: asset._id,
      url: asset.url,
      originalFilename: asset.originalFilename,
    };
    console.log(`Uploaded ${item.key} -> ${asset._id}`);
  }

  console.log("\n--- UPLOAD SUMMARY ---");
  console.log(JSON.stringify(results, null, 2));
}

main().catch((err) => {
  console.error("Error in upload:", err);
  process.exit(1);
});
