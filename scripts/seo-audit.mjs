#!/usr/bin/env node
/**
 * SEO regression suite (TECH-20).
 *
 * Crawls the built output of every route in lib/routes.ts and fails the build on
 * the defects this project has actually shipped before: a page inheriting the
 * homepage's og:url, a canonical pointing at the wrong route, a sitemap date
 * that advanced because someone rebuilt, a retired commercial claim left
 * standing on one surface after being removed from another, JSON-LD that does
 * not parse, or a non-public route quietly becoming indexable.
 *
 *   node scripts/seo-audit.mjs                 # against a running server
 *   node scripts/seo-audit.mjs --base http://localhost:3000
 *
 * Exit code is 1 if any check fails, so it can gate CI. Warnings do not fail.
 */

import { readFile } from "node:fs/promises";
import process from "node:process";

const args = process.argv.slice(2);
const baseIndex = args.indexOf("--base");
const BASE = (baseIndex !== -1 ? args[baseIndex + 1] : "http://localhost:3000").replace(/\/$/, "");

const PRODUCTION_ORIGIN = "https://www.theglownique.com";

const failures = [];
const warnings = [];

/** Rendered <title> ceiling, brand suffix included. See the note in checkPage. */
const TITLE_MAX = 60;

/** target path -> pages linking to it. Filled during the crawl. */
const internalLinks = new Map();

/**
 * Normalise an href to a same-site path, or null if it points elsewhere.
 *
 * Absolute links to the production origin count as internal: a link written as
 * https://www.theglownique.com/blog/x is exactly as broken as /blog/x when the
 * target does not exist, and CMS-authored links use both forms.
 */
function internalTarget(href) {
  if (/^(mailto:|tel:|javascript:)/i.test(href)) return null;
  try {
    const url = new URL(href, `${BASE}/`);
    const origin = new URL(BASE).origin;
    if (url.origin !== origin && url.origin !== PRODUCTION_ORIGIN) return null;
    return (url.pathname.replace(/\/$/, "") || "/") + url.search;
  } catch {
    return null;
  }
}

const fail = (route, message) => failures.push(`${route}: ${message}`);
const warn = (route, message) => warnings.push(`${route}: ${message}`);

/**
 * Claims withdrawn from the site. Each must be absent from every rendered page
 * AND from llms.txt — a claim removed from the UI but left in the AI-readable
 * file keeps getting quoted by assistants for months (see "Rollback rules" in
 * the technical plan).
 */
const RETIRED_CLAIM_PATTERNS = [
  // Two patterns, because word order varies. The first catches "free worldwide
  // delivery"; the second catches "tracked delivery, free worldwide", which the
  // first missed and which shipped to production on /contact as a result.
  // Deliberately narrow on the second: "free" must be followed by worldwide or
  // "of charge", so "tracked delivery and a free design mockup" stays legal.
  { label: "free-delivery promotion (CLM-001, ended 2026-08-11)", re: /\bfree\s+(worldwide\s+)?(delivery|shipping)\b/i },
  { label: "free-delivery promotion, reversed word order (CLM-001)", re: /\b(delivery|shipping)\b[^.]{0,20}\bfree\s+(worldwide|of charge)\b/i },
  { label: "\"no tracking pixels\" while the Meta Pixel ships (CLM-016)", re: /no\s+(advertising\s+cookies\s+or\s+)?tracking\s+pixels/i },
];

/** Pages allowed to discuss a retired claim in order to correct the record. */
const RETIRED_CLAIM_EXEMPT = new Set(["/shipping", "/privacy"]);

async function readRouteManifest() {
  // The manifest is TypeScript, so parse the literal rather than importing it —
  // this script must run without a build step.
  const source = await readFile(new URL("../lib/routes.ts", import.meta.url), "utf8");
  const entries = [];
  const entryRe = /\{\s*path:\s*"([^"]+)"[\s\S]*?indexable:\s*(true|false)/g;
  let match;
  while ((match = entryRe.exec(source)) !== null) {
    entries.push({ path: match[1], indexable: match[2] === "true" });
  }
  // The four product detail routes are generated from PRODUCT_PAGES.
  const catalog = await readFile(new URL("../lib/product-catalog.ts", import.meta.url), "utf8");
  for (const slug of catalog.matchAll(/^\s*slug:\s*"([^"]+)"/gm)) {
    entries.push({ path: `/products/${slug[1]}`, indexable: true });
  }
  return entries;
}

/** Entities must be decoded before anything is measured: a raw "&amp;" is five
 *  characters standing in for one, which silently inflates every title length. */
const decode = (value) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const tag = (html, re) => {
  const raw = html.match(re)?.[1];
  return raw === undefined ? null : decode(raw).trim();
};

function checkPage(route, html, status, headers) {
  const { path, indexable } = route;

  if (status !== 200) {
    fail(path, `expected HTTP 200, got ${status}`);
    return;
  }

  const robotsHeader = headers.get("x-robots-tag") ?? "";
  const robotsMeta = tag(html, /<meta name="robots" content="([^"]*)"/i) ?? "";
  const isNoindex = /noindex/i.test(`${robotsHeader} ${robotsMeta}`);

  if (!indexable) {
    // A non-public route must actually refuse indexing, and must be crawlable
    // enough for that refusal to be seen.
    if (!isNoindex) fail(path, "marked non-indexable but serves no noindex (header or meta)");
    return;
  }

  if (isNoindex) fail(path, "indexable route is serving a noindex");

  // ── Canonical ─────────────────────────────────────────────────────────────
  const canonical = tag(html, /<link rel="canonical" href="([^"]+)"/i);
  const expectedCanonical = path === "/" ? `${PRODUCTION_ORIGIN}/` : `${PRODUCTION_ORIGIN}${path}`;
  if (!canonical) {
    fail(path, "no canonical link");
  } else if (canonical.replace(/\/$/, "") !== expectedCanonical.replace(/\/$/, "")) {
    fail(path, `canonical points at ${canonical}, expected ${expectedCanonical}`);
  }

  // ── Title and description ─────────────────────────────────────────────────
  //
  // 60 is a hard limit, not a warning. Site audits flag anything longer, and 17
  // pages had drifted past it before anyone noticed — a warning nobody reads is
  // how that happens. Remember the budget is shared: app/layout.tsx appends
  // " | The Glownique" via `title.template`, so a page-level title has
  // TITLE_MAX - 16 = 44 characters to work with. A page that genuinely needs
  // more should use `title.absolute` and spend the brand's 16 on keywords,
  // rather than pushing the rendered title over the line.
  const title = tag(html, /<title>([^<]*)<\/title>/i);
  if (!title) fail(path, "no <title>");
  else if (title.length > TITLE_MAX) {
    fail(path, `title is ${title.length} chars, over the ${TITLE_MAX} limit: "${title}"`);
  }

  // A second pipe reads as a broken template rather than a considered title.
  if (title && (title.match(/\|/g) ?? []).length > 1) {
    fail(path, `title has ${(title.match(/\|/g) ?? []).length} pipes: "${title}"`);
  }

  // Internal links, banked for checkInternalLinks() once every page is crawled.
  for (const [, href] of html.matchAll(/<a\s[^>]*?href="([^"#][^"]*)"/gi)) {
    const target = internalTarget(href);
    if (!target) continue;
    if (!internalLinks.has(target)) internalLinks.set(target, new Set());
    internalLinks.get(target).add(path);
  }

  const description = tag(html, /<meta name="description" content="([^"]*)"/i);
  if (!description) fail(path, "no meta description");

  // ── Social fields: the homepage-inheritance bug (AUD-08) ──────────────────
  const ogUrl = tag(html, /<meta property="og:url" content="([^"]+)"/i);
  if (!ogUrl) {
    fail(path, "no og:url");
  } else if (path !== "/" && ogUrl.replace(/\/$/, "") === PRODUCTION_ORIGIN) {
    fail(path, "og:url inherited the homepage URL");
  }
  for (const property of ["og:title", "og:description", "og:image"]) {
    if (!html.includes(`property="${property}"`)) fail(path, `no ${property}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description"]) {
    if (!html.includes(`name="${name}"`)) fail(path, `no ${name}`);
  }

  // ── Unsupported metadata (AUD-11) ─────────────────────────────────────────
  if (/<meta name="keywords"/i.test(html)) {
    fail(path, "emits a keywords meta tag, which Google ignores");
  }

  // ── Exactly one H1 ────────────────────────────────────────────────────────
  const h1Count = (html.match(/<h1[\s>]/gi) ?? []).length;
  if (h1Count === 0) fail(path, "no <h1>");
  if (h1Count > 1) fail(path, `${h1Count} <h1> elements, expected 1`);

  // ── JSON-LD parses and is sanitized (TECH-07) ─────────────────────────────
  const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  if (blocks.length === 0) warn(path, "no JSON-LD");
  for (const [, body] of blocks) {
    try {
      JSON.parse(body);
    } catch (error) {
      fail(path, `JSON-LD does not parse: ${error.message}`);
    }
    if (body.includes("<")) fail(path, "JSON-LD contains a literal '<' — serializer not applied");
  }

  // ── Retired claims (TECH-06) ──────────────────────────────────────────────
  if (!RETIRED_CLAIM_EXEMPT.has(path)) {
    const text = html.replace(/<[^>]+>/g, " ");
    for (const claim of RETIRED_CLAIM_PATTERNS) {
      if (claim.re.test(text)) fail(path, `retired claim still visible: ${claim.label}`);
    }
  }
}

/** Public paths according to the sitemap — the only list that knows the CMS. */
async function readSitemapPaths() {
  try {
    const response = await fetch(`${BASE}/sitemap.xml`);
    if (!response.ok) return [];
    const xml = await response.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((match) => match[1].replace(PRODUCTION_ORIGIN, "").replace(/\/$/, "") || "/")
      .filter((path) => path.startsWith("/"));
  } catch {
    return [];
  }
}

async function checkSitemap(manifest) {
  const response = await fetch(`${BASE}/sitemap.xml`);
  if (!response.ok) {
    fail("/sitemap.xml", `HTTP ${response.status}`);
    return;
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

  for (const route of manifest) {
    const expected = route.path === "/" ? `${PRODUCTION_ORIGIN}/` : `${PRODUCTION_ORIGIN}${route.path}`;
    const present = urls.some((u) => u.replace(/\/$/, "") === expected.replace(/\/$/, ""));
    if (route.indexable && !present) fail("/sitemap.xml", `missing indexable route ${route.path}`);
    if (!route.indexable && present) fail("/sitemap.xml", `contains non-indexable route ${route.path}`);
  }

  // A build-clock timestamp is the defect TECH-05 exists to prevent.
  const today = new Date().toISOString().slice(0, 10);
  const dates = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/gi)].map((m) => m[1].slice(0, 10));
  if (dates.length > 1 && new Set(dates).size === 1 && dates[0] === today) {
    fail("/sitemap.xml", "every lastmod equals today — dates look generated from the build clock");
  }
}

async function checkLlmsTxt() {
  const response = await fetch(`${BASE}/llms.txt`);
  if (!response.ok) {
    fail("/llms.txt", `HTTP ${response.status}`);
    return;
  }
  const text = await response.text();
  for (const claim of RETIRED_CLAIM_PATTERNS) {
    // llms.txt is allowed to name a retired claim only to say it has ended.
    const lines = text.split("\n").filter((line) => claim.re.test(line));
    for (const line of lines) {
      if (!/ended|withdraw|no longer|not current|no standing/i.test(line)) {
        fail("/llms.txt", `retired claim stated without correction: ${claim.label}`);
        break;
      }
    }
  }
  if (/\b5\.0 out of 5 from \d+ reviews\b/i.test(text)) {
    fail("/llms.txt", "publishes an unverified shop-wide review count (CLM-012)");
  }
}

/**
 * Every internal link resolves.
 *
 * This exists because three published posts linked /blog/how-to-hang-a-neon-sign
 * — a post that was still an unpublished draft. One dead target produced two
 * separate audit findings ("3 pages with broken links" and "1 page returned
 * 4XX"), and nothing in the codebase could have caught it: the href was CMS
 * content pointing at a route the CMS itself decides whether to publish.
 *
 * So the check runs against rendered HTML rather than the route manifest, and it
 * reports the pages doing the linking — those are the pages that need editing.
 */
async function checkInternalLinks(crawled) {
  const targets = [...internalLinks.keys()].filter((target) => !crawled.has(target));
  const results = await Promise.all(
    targets.map(async (target) => {
      try {
        const response = await fetch(`${BASE}${target}`, { redirect: "manual" });
        return [target, response.status];
      } catch (error) {
        return [target, `request failed: ${error.message}`];
      }
    }),
  );

  for (const [target, status] of results) {
    if (status === 200) continue;
    const sources = [...internalLinks.get(target)].sort();
    // A redirect is a link worth rewriting, not a broken one.
    if (typeof status === "number" && status >= 300 && status < 400) {
      warn(target, `linked from ${sources.join(", ")} but redirects (${status})`);
      continue;
    }
    fail(target, `broken link (HTTP ${status}) from ${sources.join(", ")}`);
  }
}

async function main() {
  const manifest = await readRouteManifest();

  // lib/routes.ts cannot list the blog: posts and category archives are created
  // in the CMS, so the manifest has no idea they exist and every check in
  // checkPage silently skipped them — which is how 6 overlong post titles and 3
  // broken post links reached production. The sitemap is the only list that
  // knows the full public surface, so the crawl is manifest ∪ sitemap.
  const routes = [...manifest];
  const known = new Set(manifest.map((route) => route.path));
  for (const path of await readSitemapPaths()) {
    if (known.has(path)) continue;
    known.add(path);
    routes.push({ path, indexable: true });
  }

  console.log(
    `SEO audit — ${routes.length} routes against ${BASE}` +
      ` (${manifest.length} from lib/routes.ts, ${routes.length - manifest.length} from the sitemap)\n`,
  );

  for (const route of routes) {
    try {
      const response = await fetch(`${BASE}${route.path}`, { redirect: "manual" });
      const html = await response.text();
      checkPage(route, html, response.status, response.headers);
    } catch (error) {
      fail(route.path, `request failed: ${error.message}`);
    }
  }

  await checkInternalLinks(known);
  await checkSitemap(manifest);
  await checkLlmsTxt();

  for (const warning of warnings) console.log(`  warn  ${warning}`);
  for (const failure of failures) console.log(`  FAIL  ${failure}`);

  console.log(
    `\n${failures.length === 0 ? "PASS" : "FAIL"} — ${failures.length} failure(s), ${warnings.length} warning(s)`,
  );
  process.exit(failures.length === 0 ? 0 : 1);
}

main();
