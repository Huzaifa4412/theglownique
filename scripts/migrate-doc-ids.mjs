/**
 * Move Sanity documents onto the correct side of the public/private id line.
 *
 * ── The rule this script enforces ───────────────────────────────────────────
 *
 * The `production` dataset is public, because the frontend reads the blog
 * anonymously — no read token ships to the server, and none should. A public
 * dataset's default ACL grants anonymous read through one rule:
 *
 *     { filter: '_id in path("*")', permissions: ["read"] }
 *
 * `path("*")` matches a SINGLE path segment, and a dot starts a new segment.
 * So the dot in an `_id` is an access-control decision:
 *
 *     post-how-to-hang-a-neon-sign   → one segment  → world-readable
 *     lead.9f3c…                     → two segments → token required
 *
 * Nothing in the Studio shows this. A dotted document looks published, has a
 * green publish state, and is simply invisible to the site.
 *
 * ── What went wrong, in both directions ─────────────────────────────────────
 *
 * PUBLIC CONTENT THAT WAS PRIVATE. Authors and categories were seeded as
 * `author.workshop-lead` and `category.trends`, so `author->` and `category->`
 * resolved to null for the frontend's anonymous reads. Every /blog/[slug] page
 * returned 500 (the route dereferenced the null author), category pages 404ed,
 * and /blog itself looked fine — which is why it read as a blog bug rather than
 * a permissions one.
 *
 * PRIVATE CONTENT THAT WAS PUBLIC. Leads and outbound clicks are written by
 * /api/leads and /api/outbound-click, which let the client generate the id.
 * Those ids have no dot, so every lead — name, email, phone, message — was
 * readable by anyone who knew the project id. Both routes now mint dotted ids;
 * this script fixes the rows written before that.
 *
 * ── What it does ────────────────────────────────────────────────────────────
 *
 * A document's `_id` is immutable, so "renaming" is create-new, repoint every
 * reference, delete-old, in that order — Sanity refuses to delete a document
 * that is still referenced, which is a useful safety net rather than an
 * obstacle. Drafts move with their published document.
 *
 *   node scripts/migrate-doc-ids.mjs            # dry run, prints the plan
 *   node scripts/migrate-doc-ids.mjs --write    # commit it
 *
 * Idempotent: a second run finds nothing to do.
 */

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const WRITE = argv.includes("--write");

/**
 * `--only lead,outboundClick` narrows the run to those types.
 *
 * The two halves of this migration have different urgency and different blast
 * radius. Making leads private is invisible to visitors and cannot look wrong.
 * Making the author and categories public changes what every article renders,
 * so it wants to land alongside a real byline rather than whenever the fix for
 * the leaked leads is ready. One script, two moments.
 */
const ONLY = (() => {
  const index = argv.indexOf("--only");
  const raw = index !== -1 ? argv[index + 1] : undefined;
  return raw ? raw.split(",").map((type) => type.trim()).filter(Boolean) : null;
})();

/** Types that the site reads anonymously — their ids must NOT contain a dot. */
const MUST_BE_PUBLIC = ["author", "category", "post", "blogSettings"];

/** Types that hold our data or a customer's — their ids MUST contain a dot. */
const MUST_BE_PRIVATE = ["lead", "outboundClick"];

/**
 * Reference fields pointing at the types being renamed.
 *
 * Listed explicitly rather than discovered: a missed field would leave a post
 * pointing at a deleted document, and a wrong guess here is easier to spot in a
 * list than in a traversal.
 */
const REFERENCE_FIELDS = [
  { type: "post", field: "author" },
  { type: "post", field: "reviewer" },
  { type: "post", field: "category" },
  { type: "post", field: "relatedPosts", isArray: true },
];

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

/** Read .env.local without adding a dependency; the real environment wins. */
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

/** `drafts.author.x` → `{ prefix: "drafts.", base: "author.x" }` */
function splitDraft(id) {
  return id.startsWith("drafts.")
    ? { prefix: "drafts.", base: id.slice("drafts.".length) }
    : { prefix: "", base: id };
}

/** `author.workshop-lead` → `author-workshop-lead`. First dot only. */
function toPublicId(base) {
  return base.replace(".", "-");
}

/** `9f3c…` → `lead.9f3c…`. */
function toPrivateId(base, type) {
  return `${type}.${base}`;
}

/**
 * Rewrite every `_ref` in a document against the move map.
 *
 * Needed because a document can be both a mover and a referrer — the seeded
 * draft posts have dotted ids AND point at the dotted author. Patching those
 * references on the old document would be pointless: it is about to be deleted,
 * and the copy would carry the stale ref. So a mover's references are rewritten
 * in the copy itself, and only non-movers get patched.
 *
 * The walk is generic rather than driven by REFERENCE_FIELDS because a mover's
 * own body can hold references too, and missing one inside a nested block would
 * be silent.
 */
function rewriteRefs(value, byOldId) {
  if (Array.isArray(value)) return value.map((item) => rewriteRefs(item, byOldId));
  if (!value || typeof value !== "object") return value;

  const out = {};
  for (const [key, item] of Object.entries(value)) {
    out[key] =
      key === "_ref" && typeof item === "string"
        ? (byOldId.get(item) ?? item)
        : rewriteRefs(item, byOldId);
  }
  return out;
}

async function main() {
  await loadEnv();

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-10";

  if (!projectId || !dataset) {
    fail("NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET must be set.");
  }
  if (!token) fail("SANITY_API_WRITE_TOKEN is required — this script rewrites documents.");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
    // `raw` so drafts are visible: a draft has to move with its published
    // document, or publishing it later would resurrect the old id.
    perspective: "raw",
  });

  console.log(`\n  Document id migration — project ${projectId}, dataset ${dataset}`);
  console.log(`  Mode: ${WRITE ? "WRITE" : "DRY RUN"}\n`);

  const inScope = (type) => (ONLY ? ONLY.includes(type) : true);
  const types = [...MUST_BE_PUBLIC, ...MUST_BE_PRIVATE].filter(inScope);

  if (types.length === 0) {
    fail(`--only matched no known type. Known: ${[...MUST_BE_PUBLIC, ...MUST_BE_PRIVATE].join(", ")}`);
  }
  if (ONLY) console.log(`  Scope: ${types.join(", ")} only
`);

  const docs = await client.fetch(`*[_type in $types]`, { types });

  /** [{ from, to, doc, why }] */
  const moves = [];

  for (const doc of docs) {
    const { prefix, base } = splitDraft(doc._id);

    if (MUST_BE_PUBLIC.includes(doc._type) && base.includes(".")) {
      moves.push({
        from: doc._id,
        to: prefix + toPublicId(base),
        doc,
        why: "invisible to anonymous reads",
      });
      continue;
    }

    if (MUST_BE_PRIVATE.includes(doc._type) && !base.includes(".")) {
      moves.push({
        from: doc._id,
        to: prefix + toPrivateId(base, doc._type),
        doc,
        why: "world-readable",
      });
    }
  }

  if (moves.length === 0) {
    console.log("  Nothing to move — every id is already on the right side.\n");
    return;
  }

  // Reference rewrites, computed from the moves so the two can never disagree.
  const byOldId = new Map(moves.map((move) => [move.from, move.to]));
  const referencing = await client.fetch(`*[_type in $types]{ _id, _type, ...}`, {
    types: [...new Set(REFERENCE_FIELDS.map((entry) => entry.type))],
  });

  /** [{ id, field, from, to }] and [{ id, field, index, from, to }] */
  const patches = [];

  for (const doc of referencing) {
    // A mover carries its own rewritten references in the copy (see
    // rewriteRefs); patching the doomed original would achieve nothing.
    if (byOldId.has(doc._id)) continue;

    for (const { type, field, isArray } of REFERENCE_FIELDS) {
      if (doc._type !== type) continue;
      const value = doc[field];
      if (!value) continue;

      if (isArray) {
        if (!Array.isArray(value)) continue;
        value.forEach((item, index) => {
          const to = item?._ref && byOldId.get(item._ref);
          if (to) patches.push({ id: doc._id, field, index, from: item._ref, to });
        });
        continue;
      }

      const to = value._ref && byOldId.get(value._ref);
      if (to) patches.push({ id: doc._id, field, from: value._ref, to });
    }
  }

  console.log(`  ${moves.length} document${moves.length === 1 ? "" : "s"} to move:`);
  for (const move of moves) {
    console.log(`    ${move.doc._type.padEnd(14)} ${move.from}  →  ${move.to}   (${move.why})`);
  }
  console.log(`\n  ${patches.length} reference${patches.length === 1 ? "" : "s"} to repoint` +
      " (a moved document's own references travel with its copy):",
  );
  for (const patch of patches) {
    const at = patch.index === undefined ? patch.field : `${patch.field}[${patch.index}]`;
    console.log(`    ${patch.id}  ${at}  →  ${patch.to}`);
  }

  if (!WRITE) {
    console.log("\n  Dry run. Re-run with --write to commit.\n");
    return;
  }

  // Three transactions, in this order, because each depends on the last:
  //
  //   1. create the new documents (the old ones are still referenced, so
  //      nothing is broken if the run stops here)
  //   2. repoint every reference onto them
  //   3. delete the old documents — which Sanity only permits once step 2 has
  //      removed the last reference to them
  //
  // Stopping between steps leaves the dataset consistent, just mid-migration,
  // and re-running finishes the job.
  console.log("\n  1/3 Creating documents at their new ids…");
  const create = client.transaction();
  for (const move of moves) {
    const { _id, _rev, _createdAt, _updatedAt, ...fields } = move.doc;
    create.createIfNotExists({ ...rewriteRefs(fields, byOldId), _id: move.to });
  }
  await create.commit();

  console.log("  2/3 Repointing references…");
  if (patches.length > 0) {
    const repoint = client.transaction();
    for (const patch of patches) {
      const at = patch.index === undefined ? patch.field : `${patch.field}[${patch.index}]`;
      repoint.patch(patch.id, (p) => p.set({ [`${at}._ref`]: patch.to }));
    }
    await repoint.commit();
  }

  console.log("  3/3 Deleting the old documents…");
  const remove = client.transaction();
  for (const move of moves) remove.delete(move.from);
  await remove.commit();

  console.log("\n  ✓ Done. Publish a post or hit /api/revalidate to refresh the cache.\n");
}

main().catch((error) => {
  console.error("\n  ✗ Migration failed:", error?.message ?? error);
  console.error("    Nothing is half-written: re-run the dry run to see what remains.\n");
  process.exit(1);
});
