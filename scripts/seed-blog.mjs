#!/usr/bin/env node
/**
 * Seed the blog into Sanity.
 *
 *   node scripts/seed-blog.mjs                 # dry run — prints what it would do
 *   node scripts/seed-blog.mjs --write         # create everything as DRAFTS
 *   node scripts/seed-blog.mjs --write --publish
 *   node scripts/seed-blog.mjs --write --publish \
 *       --author "Ali Raza|Production lead|Twelve years building illuminated signage; ..."
 *
 * ── Why drafts are the default ──────────────────────────────────────────────
 *
 * Two reasons, and both are about not putting something untrue on a live
 * commercial site.
 *
 * The byline. Every post needs a named author with real, checkable experience —
 * that is the page quality contract in
 * SEO-Optimization/08-content-aeo-geo-aio-plan.md, and it is also just true
 * that a fabricated expert is an unverifiable trust claim, the same category of
 * problem as an invented review. The seed ships a placeholder author, and
 * --publish refuses to run until it has been replaced.
 *
 * The facts. The articles avoid prices, delivery costs and anything else the
 * claims register does not cover, but they do contain workshop statements
 * ("the adapter is what usually fails first") that are ours and should be read
 * by someone who knows whether they are right. That is what the editorial gate
 * in the content plan is for.
 *
 * So: run it, read the drafts at /studio, fix the byline, publish.
 *
 * ── Idempotence ─────────────────────────────────────────────────────────────
 *
 * Every document has a deterministic `_id`, and the script uses createOrReplace
 * for content it owns. Re-running it restores the seeded state — which also
 * means it will overwrite edits made in the Studio to these specific
 * documents. It never touches anything it did not create.
 */

import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import {
  AUTHOR_PLACEHOLDER,
  blogSettings,
  categories,
  imageFiles,
  preparePosts,
} from "./blog-seed/content.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// ── Arguments ───────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const WRITE = argv.includes("--write");
const PUBLISH = argv.includes("--publish");

function flagValue(name) {
  const index = argv.indexOf(name);
  return index !== -1 ? argv[index + 1] : undefined;
}

/** --author "Name|Role|Experience sentence" */
function parseAuthor() {
  const raw = flagValue("--author");
  if (!raw) return null;

  const [name, role, expertise] = raw.split("|").map((part) => part?.trim());
  if (!name || !role || !expertise) {
    fail('--author needs three parts: --author "Name|Role|Experience sentence"');
  }
  if (expertise.length < 40) {
    fail("The experience sentence is too short to be useful. Say what makes this person qualified.");
  }
  return { ...AUTHOR_PLACEHOLDER, name, role, expertise };
}

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

// ── Environment ─────────────────────────────────────────────────────────────

/**
 * Read .env.local without adding a dependency.
 *
 * Values already in the real environment win, so CI can supply the token
 * without a file present.
 */
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
  } catch {
    // No .env.local. Fine if the variables are already exported.
  }
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-10";

  if (!projectId || !dataset) {
    fail("NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set.");
  }

  const author = parseAuthor() ?? AUTHOR_PLACEHOLDER;

  if (PUBLISH && author === AUTHOR_PLACEHOLDER) {
    fail(
      "Refusing to publish with the placeholder author.\n" +
        '    Pass --author "Name|Role|Experience sentence", or run without --publish\n' +
        "    and set the real byline in the Studio before publishing.",
    );
  }

  const preparedPosts = preparePosts();

  console.log(`\n  Blog seed — project ${projectId}, dataset ${dataset}`);
  console.log(`  ${categories.length} categories, ${preparedPosts.length} posts, 1 author, 1 settings doc`);
  console.log(`  Mode: ${WRITE ? (PUBLISH ? "WRITE + PUBLISH" : "WRITE (drafts)") : "DRY RUN"}\n`);

  // Verify every referenced image exists before touching the dataset — a
  // half-seeded blog with three missing covers is much more annoying to clean
  // up than a script that refused to start.
  for (const [key, relativePath] of Object.entries(imageFiles)) {
    try {
      await stat(path.join(ROOT, relativePath));
    } catch {
      fail(`Image "${key}" not found at ${relativePath}`);
    }
  }
  console.log(`  ✓ All ${Object.keys(imageFiles).length} images found on disk`);

  if (!WRITE) {
    console.log("\n  Dry run. Documents that would be written:\n");
    console.log(`    author.${author.slug}  (${author.name})`);
    for (const category of categories) console.log(`    ${category._id}`);
    console.log(`    blogSettings`);
    for (const post of preparedPosts) console.log(`    ${post._id}  /blog/${post.slug}`);
    console.log("\n  Re-run with --write to create them as drafts.\n");
    return;
  }

  if (!token) {
    fail(
      "SANITY_API_WRITE_TOKEN is not set.\n" +
        "    Create one at sanity.io/manage → API → Tokens with Editor permission,\n" +
        "    then add it to .env.local.",
    );
  }

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  // ── Upload images ─────────────────────────────────────────────────────────
  //
  // Uploaded first, because a post document cannot reference an asset that does
  // not exist yet. Sanity deduplicates by content hash, so re-running does not
  // pile up duplicate assets.
  console.log("\n  Uploading images…");
  const assets = {};
  for (const [key, relativePath] of Object.entries(imageFiles)) {
    const absolute = path.join(ROOT, relativePath);
    const asset = await client.assets.upload("image", createReadStream(absolute), {
      filename: path.basename(absolute),
    });
    assets[key] = asset._id;
    console.log(`    ✓ ${key}`);
  }

  const imageRef = (key) => ({
    _type: "image",
    asset: { _type: "reference", _ref: assets[key] },
  });

  /** Swap `{__image: "key"}` placeholders in a body for real asset refs. */
  const resolveBody = (body) =>
    body.map((node) => {
      if (node._type !== "blogImage") return node;
      const { __image, ...rest } = node;
      return { ...rest, ...imageRef(__image) };
    });

  // Drafts live under a `drafts.` id prefix; that is the whole mechanism.
  //
  // Only POSTS are drafted. The author, the categories and the hub settings are
  // always published, for a structural reason rather than a stylistic one: a
  // draft document cannot hold a reference to another draft, so drafting the
  // categories would make every post reference a category that does not exist
  // and the whole transaction would be rejected.
  //
  // It is also the right split on its own terms. Taxonomy and hub copy are
  // configuration — nothing renders them until a post is live. The posts are
  // the part carrying claims that need a human to read them first.
  const id = (base) => (PUBLISH ? base : `drafts.${base}`);

  const transaction = client.transaction();

  // ── Author (published; edit the byline in the Studio) ─────────────────────
  transaction.createOrReplace({
    _id: AUTHOR_PLACEHOLDER._id,
    _type: "author",
    name: author.name,
    slug: { _type: "slug", current: author.slug },
    role: author.role,
    expertise: author.expertise,
  });

  // ── Categories (published) ────────────────────────────────────────────────
  for (const category of categories) {
    transaction.createOrReplace({
      _id: category._id,
      _type: "category",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      intro: category.intro,
      order: category.order,
    });
  }

  // ── Hub settings (published) ──────────────────────────────────────────────
  transaction.createOrReplace({
    _id: blogSettings._id,
    _type: "blogSettings",
    eyebrow: blogSettings.eyebrow,
    heading: blogSettings.heading,
    intro: blogSettings.intro,
    seoTitle: blogSettings.seoTitle,
    seoDescription: blogSettings.seoDescription,
    newsletterHeading: blogSettings.newsletterHeading,
    newsletterText: blogSettings.newsletterText,
    positioning: blogSettings.positioning,
  });

  // ── Posts ─────────────────────────────────────────────────────────────────
  //
  // References point at published ids even when the posts themselves are
  // drafts, because a draft referencing `drafts.category.x` would break the
  // moment the category is published. Sanity resolves a reference to the
  // published document and falls back to its draft in the Studio, which is
  // exactly the behaviour wanted here.
  for (const post of preparedPosts) {
    transaction.createOrReplace({
      _id: id(post._id),
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      summary: post.summary,
      coverImage: {
        ...imageRef(post.cover),
        alt: post.coverAlt,
        ...(post.coverCaption ? { caption: post.coverCaption } : {}),
      },
      category: { _type: "reference", _ref: post.category },
      keyTakeaways: post.keyTakeaways,
      body: resolveBody(post.body),
      faqs: post.faqs?.map((faq, index) => ({ _type: "faq", _key: `faq${index}`, ...faq })),
      author: { _type: "reference", _ref: AUTHOR_PLACEHOLDER._id },
      publishedAt: post.publishedAt,
      readingMinutes: post.readingMinutes,
      featured: Boolean(post.featured),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      primaryKeyword: post.primaryKeyword,
      indexable: true,
      relatedLinks: post.relatedLinks?.map((link, index) => ({
        _type: "relatedLink",
        _key: `link${index}`,
        ...link,
      })),
      sources: post.sources?.map((source, index) => ({
        _type: "source",
        _key: `src${index}`,
        ...source,
      })),
    });
  }

  console.log("\n  Committing…");
  await transaction.commit();

  console.log(`\n  ✓ Done. ${preparedPosts.length} posts written as ${PUBLISH ? "published" : "drafts"}.\n`);

  if (!PUBLISH) {
    console.log("  Next:");
    console.log("    1. Open /studio → Blog → Authors and replace the placeholder byline.");
    console.log("    2. Read the drafts and check the workshop claims are ones you stand behind.");
    console.log("    3. Publish each post, or re-run with --publish and --author.\n");
  } else {
    console.log("  Next: node scripts/indexnow-submit.mjs --all, once the pages are live.\n");
  }
}

main().catch((error) => {
  console.error("\n  ✗ Seed failed:", error?.message ?? error);
  process.exit(1);
});
