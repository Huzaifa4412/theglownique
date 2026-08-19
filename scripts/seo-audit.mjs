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
  { label: "free-delivery promotion (CLM-001, ended 2026-08-11)", re: /free\s+(worldwide\s+)?(delivery|shipping)/i },
  { label: "free-delivery promotion, reversed word order (CLM-001)", re: /(delivery|shipping)[^.]{0,20}free\s+(worldwide|of charge)/i },
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
  const title = tag(html, /<title>([^<]*)<\/title>/i);
  if (!title) fail(path, "no <title>");
  else if (title.length > 70) warn(path, `title is ${title.length} chars and will truncate in SERPs`);

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

async function main() {
  const manifest = await readRouteManifest();
  console.log(`SEO audit — ${manifest.length} routes against ${BASE}\n`);

  for (const route of manifest) {
    try {
      const response = await fetch(`${BASE}${route.path}`, { redirect: "manual" });
      const html = await response.text();
      checkPage(route, html, response.status, response.headers);
    } catch (error) {
      fail(route.path, `request failed: ${error.message}`);
    }
  }

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
