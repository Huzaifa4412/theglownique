#!/usr/bin/env node
/**
 * Publish ONE blog post module to Sanity.
 *
 *   node scripts/publish-blog-post.mjs scripts/blog-posts/<post>.mjs            # dry run
 *   node scripts/publish-blog-post.mjs scripts/blog-posts/<post>.mjs --write    # as a DRAFT
 *   node scripts/publish-blog-post.mjs scripts/blog-posts/<post>.mjs --write --publish
 *
 * The seed (scripts/seed-blog.mjs) owns the launch set and rewrites all of it
 * on every run. This runner exists so a single new article can be added
 * without re-seeding — same portable-text helpers, same claims discipline,
 * same draft-by-default behaviour, and it never touches any other document.
 *
 * A post module exports `post` (the shape used in scripts/blog-seed/content.mjs,
 * with `categorySlug` instead of a hard-coded category id) and `imageFiles`
 * (image key → repo-relative path) for the cover and any body images.
 *
 * ── Author and category ids are resolved, not assumed ───────────────────────
 *
 * The launch content was seeded with dotted ids (`author.workshop-lead`) that a
 * public dataset cannot read anonymously, and scripts/migrate-doc-ids.mjs moves
 * them to dashed ids — but that half of the migration is deliberately unrun
 * until the placeholder byline is replaced (see the memory note and the
 * comment in that script). So at write time this runner looks up which id
 * actually exists, prefers the dashed one, falls back to the dotted one, and
 * says which it used. Referencing an id that does not exist would make the
 * post render without a byline or category, or 500 in the post route.
 *
 * ── Validation runs offline ─────────────────────────────────────────────────
 *
 * The dry run checks every schema rule that would otherwise only fail in the
 * Studio (summary and meta lengths, internal-link kinds, image files) and
 * prints a word count against the stored reading time, without a network
 * request. Everything that needs the API happens only under --write.
 */

import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import { finalize } from "./blog-seed/portable-text.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const argv = process.argv.slice(2);
const WRITE = argv.includes("--write");
const PUBLISH = argv.includes("--publish");

/**
 * --ndjson <file>: instead of writing through the API, emit the document as an
 * NDJSON line that `npx sanity dataset import <file> production --replace` can
 * load. Images are referenced as `_sanityAsset: "image@file://…"` so the CLI
 * uploads them itself. This is the route when SANITY_API_WRITE_TOKEN is only a
 * viewer token but the developer is logged in to the Sanity CLI — which is the
 * state this repo was in on 2026-09-14. Author and category ids cannot be looked
 * up without a working read, so `--author-id` / `--category-id` pin them.
 */
const ndjsonIndex = argv.indexOf("--ndjson");
const NDJSON_OUT = ndjsonIndex !== -1 ? argv[ndjsonIndex + 1] : null;
const flag = (name) => {
  const index = argv.indexOf(name);
  return index !== -1 ? argv[index + 1] : undefined;
};
const consumed = new Set([NDJSON_OUT, flag("--author-id"), flag("--category-id")].filter(Boolean));
const modulePath = argv.find((arg) => !arg.startsWith("--") && !consumed.has(arg));

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

if (!modulePath) fail("Usage: node scripts/publish-blog-post.mjs <post module> [--write] [--publish]");

async function loadEnv() {
  try {
    const contents = await readFile(path.join(ROOT, ".env.local"), "utf8");
    for (const line of contents.split("\n")) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!match) continue;
      const [, key, value] = match;
      if (process.env[key] === undefined) process.env[key] = value.replace(/^["']|["']$/g, "");
    }
  } catch {
    // Variables may already be exported.
  }
}

// ── Offline validation (mirrors sanity/schemaTypes/blog/post.ts) ─────────────

function textOf(body) {
  return body
    .flatMap((node) => {
      if (Array.isArray(node.children)) return node.children.map((child) => child.text ?? "");
      if (node._type === "blogCallout" || node._type === "blogQuote") return [node.title ?? "", node.text ?? ""];
      if (node._type === "blogTable") return [node.caption ?? "", ...node.rows.flatMap((row) => row.cells)];
      if (node._type === "blogCta") return [node.heading ?? "", node.text ?? ""];
      return [];
    })
    .join(" ");
}

function validate(post, imageFiles) {
  const problems = [];
  const between = (label, value, min, max) => {
    const length = (value ?? "").length;
    if (length < min || length > max) problems.push(`${label} is ${length} chars; must be ${min}–${max}.`);
  };

  between("title", post.title, 1, 110);
  between("summary", post.summary, 80, 400);
  between("seoDescription", post.seoDescription, 70, 165);
  if (post.seoTitle) between("seoTitle", post.seoTitle, 1, 70);
  if (!post.slug || !/^[a-z0-9-]+$/.test(post.slug)) problems.push("slug must be lowercase letters, digits and dashes.");
  if (!post.categorySlug) problems.push("categorySlug is required.");
  if (!post.publishedAt) problems.push("publishedAt is required.");
  if (!(post.readingMinutes >= 1 && post.readingMinutes <= 60)) problems.push("readingMinutes must be 1–60.");
  if (!post.coverAlt || post.coverAlt.length < 8) problems.push("coverAlt must be at least 8 chars.");
  if (!imageFiles[post.cover]) problems.push(`cover "${post.cover}" is not in imageFiles.`);
  if ((post.keyTakeaways ?? []).length > 6) problems.push("keyTakeaways: at most 6.");

  const kinds = new Set((post.relatedLinks ?? []).map((link) => link.kind));
  if ((post.relatedLinks ?? []).length < 2) problems.push("relatedLinks: at least 2.");
  if (!kinds.has("commercial")) problems.push("relatedLinks: add a commercial destination.");
  if (!kinds.has("guide")) problems.push("relatedLinks: add a decision-support guide.");
  for (const link of post.relatedLinks ?? []) {
    if (!link.href?.startsWith("/")) problems.push(`relatedLinks: "${link.label}" must be an internal path.`);
    if (!link.description) problems.push(`relatedLinks: "${link.label}" needs a description.`);
  }
  if ((post.relatedPosts ?? []).length > 3) problems.push("relatedPosts: at most 3.");

  for (const node of post.body) {
    if (node._type === "blogImage") {
      if (!imageFiles[node.__image]) problems.push(`body image "${node.__image}" is not in imageFiles.`);
      if (!node.alt || node.alt.length < 8) problems.push(`body image "${node.__image}" needs alt text.`);
    }
    if (node._type === "blogTable") {
      const width = node.columns.length;
      if (width < 2 || width > 5) problems.push(`table "${node.caption}" needs 2–5 columns.`);
      for (const row of node.rows) {
        if (row.cells.length !== width) problems.push(`table "${node.caption}": a row has ${row.cells.length} cells, expected ${width}.`);
      }
    }
    if (node._type === "blogCta" && node.href && !node.href.startsWith("/")) problems.push("CTA href must be an internal path.");
    for (const def of node.markDefs ?? []) {
      if (!/^(\/|https:\/\/|mailto:)/.test(def.href)) problems.push(`link "${def.href}" must be a / path, https:// URL or mailto:.`);
    }
  }
  return problems;
}

/** The Sanity document, shared by the API and NDJSON paths so they cannot drift. */
function buildDocument({ post, body, docId, authorId, categoryId, coverImage }) {
  return {
    _id: docId,
    _type: "post",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    summary: post.summary,
    coverImage: {
      ...coverImage,
      alt: post.coverAlt,
      ...(post.coverCaption ? { caption: post.coverCaption } : {}),
    },
    category: { _type: "reference", _ref: categoryId },
    keyTakeaways: post.keyTakeaways,
    body,
    faqs: (post.faqs ?? []).map((faq, index) => ({ _type: "faq", _key: `faq${index}`, ...faq })),
    author: { _type: "reference", _ref: authorId },
    publishedAt: post.publishedAt,
    ...(post.updatedAt ? { updatedAt: post.updatedAt } : {}),
    readingMinutes: post.readingMinutes,
    featured: Boolean(post.featured),
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    primaryKeyword: post.primaryKeyword,
    indexable: post.indexable ?? true,
    relatedLinks: (post.relatedLinks ?? []).map((link, index) => ({ _type: "relatedLink", _key: `link${index}`, ...link })),
    ...(post.relatedPosts?.length
      ? { relatedPosts: post.relatedPosts.map((ref, index) => ({ _type: "reference", _key: `rp${index}`, _ref: ref })) }
      : {}),
    sources: (post.sources ?? []).map((source, index) => ({ _type: "source", _key: `src${index}`, ...source })),
  };
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  await loadEnv();

  const moduleUrl = pathToFileURL(path.resolve(ROOT, modulePath)).href;
  const { post, imageFiles } = await import(moduleUrl);
  if (!post || !imageFiles) fail("The post module must export `post` and `imageFiles`.");

  const body = finalize(post.body);
  const problems = validate({ ...post, body }, imageFiles);

  for (const [key, relativePath] of Object.entries(imageFiles)) {
    try {
      await stat(path.join(ROOT, relativePath));
    } catch {
      problems.push(`image "${key}" not found at ${relativePath}`);
    }
  }

  const words = textOf(body).split(/\s+/).filter(Boolean).length;
  const estimatedMinutes = Math.round(words / 230);

  console.log(`\n  ${post.title}`);
  console.log(`  /blog/${post.slug}\n`);
  console.log(`  ${body.length} body blocks · ${words} words (≈${estimatedMinutes} min at 230 wpm; stored ${post.readingMinutes})`);
  console.log(`  ${(post.faqs ?? []).length} FAQs · ${(post.relatedLinks ?? []).length} related links · ${(post.sources ?? []).length} sources`);
  console.log(`  Mode: ${WRITE ? (PUBLISH ? "WRITE + PUBLISH" : "WRITE (draft)") : "DRY RUN"}\n`);

  if (Math.abs(estimatedMinutes - post.readingMinutes) > 2) {
    console.log(`  ! readingMinutes (${post.readingMinutes}) is more than 2 min off the estimate (${estimatedMinutes}).\n`);
  }

  if (problems.length > 0) {
    console.error("  Validation failed:\n");
    for (const problem of problems) console.error(`    ✗ ${problem}`);
    process.exit(1);
  }
  console.log("  ✓ Validation passed (schema rules, links, tables, images)");

  if (NDJSON_OUT) {
    // Ids that exist in the dataset as of 2026-09-14 (dotted — the author and
    // category migration has not run). Override with --author-id / --category-id
    // once it has.
    const authorId = flag("--author-id") ?? `author.${post.authorSlug ?? "workshop-lead"}`;
    const categoryId = flag("--category-id") ?? `category.${post.categorySlug}`;
    const fileAsset = (key) => ({
      _type: "image",
      _sanityAsset: `image@${pathToFileURL(path.join(ROOT, imageFiles[key])).href}`,
    });
    const doc = buildDocument({
      post,
      body: body.map((node) => {
        if (node._type !== "blogImage") return node;
        const { __image, ...rest } = node;
        // The array member type is `blogImage`; the asset helper's `_type: "image"`
        // must not win the spread or the renderer skips the block as unknown.
        return { ...rest, ...fileAsset(__image), _type: "blogImage" };
      }),
      docId: PUBLISH ? post._id : `drafts.${post._id}`,
      authorId,
      categoryId,
      coverImage: fileAsset(post.cover),
    });
    const { writeFile, mkdir } = await import("node:fs/promises");
    await mkdir(path.dirname(path.resolve(ROOT, NDJSON_OUT)), { recursive: true });
    await writeFile(path.resolve(ROOT, NDJSON_OUT), `${JSON.stringify(doc)}\n`, "utf8");
    console.log(`\n  ✓ Wrote ${NDJSON_OUT}  (author ${authorId}, category ${categoryId}, id ${doc._id})`);
    console.log("\n  Import with an account that has Editor access to this project:");
    console.log(`    npx sanity dataset import ${NDJSON_OUT} ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"} --replace\n`);
    return;
  }

  if (!WRITE) {
    console.log("\n  Dry run. Re-run with --write to create it as a draft, or --write --publish to go live.\n");
    return;
  }

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-10";
  if (!projectId || !dataset) fail("NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set.");
  if (!token) fail("SANITY_API_WRITE_TOKEN is not set.");

  const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

  // ── Resolve author and category to ids that actually exist ───────────────
  const authorSlug = post.authorSlug ?? "workshop-lead";
  const candidates = {
    author: [`author-${authorSlug}`, `author.${authorSlug}`],
    category: [`category-${post.categorySlug}`, `category.${post.categorySlug}`],
  };
  const existing = await client.fetch(`*[_id in $ids]{_id, _type, name, title}`, {
    ids: [...candidates.author, ...candidates.category],
  });
  const byId = new Map(existing.map((doc) => [doc._id, doc]));
  const authorId = candidates.author.find((id) => byId.has(id));
  const categoryId = candidates.category.find((id) => byId.has(id));
  if (!authorId) fail(`No author document found for "${authorSlug}" (tried ${candidates.author.join(", ")}).`);
  if (!categoryId) fail(`No category document found for "${post.categorySlug}" (tried ${candidates.category.join(", ")}).`);

  console.log(`  author   → ${authorId}  (${byId.get(authorId).name})`);
  console.log(`  category → ${categoryId}  (${byId.get(categoryId).title})`);
  if (authorId.includes(".") || categoryId.includes(".")) {
    console.log("  ! A dotted id is in use. Anonymous reads cannot see it until scripts/migrate-doc-ids.mjs --write runs.");
  }
  // The placeholder byline must never render on a live page. On a dashed
  // (publicly readable) id it would, so that is a hard stop. On a dotted id the
  // author is invisible to anonymous reads and the route falls back to the
  // Organization — the state every currently live post is already in — so
  // publishing is allowed, with the reminder that the byline is still missing.
  if (PUBLISH && /SET YOUR NAME/i.test(byId.get(authorId).name ?? "")) {
    if (!authorId.includes(".")) {
      fail("Refusing to publish under the placeholder author byline. Set a real name in the Studio first, or omit --publish.");
    }
    console.log("  ! Author is still the placeholder. No byline will render until it is replaced and the id migration runs.");
  }

  // ── Upload images ─────────────────────────────────────────────────────────
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
  const imageRef = (key) => ({ _type: "image", asset: { _type: "reference", _ref: assets[key] } });
  const resolvedBody = body.map((node) => {
    if (node._type !== "blogImage") return node;
    const { __image, ...rest } = node;
    return { ...rest, ...imageRef(__image), _type: "blogImage" };
  });

  const now = new Date().toISOString();
  const doc = buildDocument({
    post,
    body: resolvedBody,
    docId: PUBLISH ? post._id : `drafts.${post._id}`,
    authorId,
    categoryId,
    coverImage: imageRef(post.cover),
  });

  console.log("\n  Writing…");
  const result = await client.createOrReplace(doc);
  console.log(`\n  ✓ ${PUBLISH ? "Published" : "Draft written"}: ${result._id}  (${now})`);
  console.log(`    https://www.theglownique.com/blog/${post.slug}\n`);
  if (!PUBLISH) {
    console.log("  Next: open /studio → Blog posts, read it, then Publish — or re-run with --write --publish.\n");
  } else {
    console.log("  Next: node scripts/indexnow-submit.mjs once the page is live.\n");
  }
}

main().catch((error) => {
  console.error("\n  ✗ Failed:", error?.message ?? error);
  process.exit(1);
});
