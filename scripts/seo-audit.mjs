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
const assetsToCheck = new Set();

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
  const title = tag(html, /<title>([^<]*)<\/title>/i);
  if (!title) fail(path, "no <title>");
  else {
    if (title.length > 65) warn(path, `title is ${title.length} chars and may truncate in SERPs`);
    if (/\|\s*The Glownique\s*\|\s*The Glownique$/i.test(title)) {
      fail(path, "title repeats the brand because page metadata includes the layout template suffix");
    }
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
  for (const property of ["og:title", "og:description"]) {
    if (!html.includes(`property="${property}"`)) fail(path, `no ${property}`);
  }
  const ogImage = tag(html, /<meta property="og:image" content="([^"]+)"/i);
  if (!ogImage) fail(path, "no og:image");
  else assetsToCheck.add(ogImage);
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
  if (!/xml/i.test(response.headers.get("content-type") ?? "")) {
    fail("/sitemap.xml", "response is not served as XML");
  }

  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const imageUrls = [...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(
    (match) => match[1],
  );

  for (const imageUrl of imageUrls) assetsToCheck.add(imageUrl);
  if (imageUrls.length === 0) {
    fail("/sitemap.xml", "contains no image entries for this visual product catalog");
  }
  if (new Set(urls).size !== urls.length) {
    fail("/sitemap.xml", "contains duplicate URL entries");
  }

  for (const route of manifest) {
    const expected = route.path === "/" ? `${PRODUCTION_ORIGIN}/` : `${PRODUCTION_ORIGIN}${route.path}`;
    const present = urls.some((url) => url.replace(/\/$/, "") === expected.replace(/\/$/, ""));
    if (route.indexable && !present) fail("/sitemap.xml", `missing indexable route ${route.path}`);
    if (!route.indexable && present) fail("/sitemap.xml", `contains non-indexable route ${route.path}`);
  }

  for (const value of urls) {
    try {
      const url = new URL(value);
      if (url.origin !== PRODUCTION_ORIGIN) {
        fail("/sitemap.xml", `contains URL on a different origin: ${value}`);
      }
      if (url.search || url.hash) {
        fail("/sitemap.xml", `contains a query string or fragment: ${value}`);
      }
    } catch {
      fail("/sitemap.xml", `contains an invalid URL: ${value}`);
    }
  }

  const rawDates = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/gi)].map((match) => match[1]);
  if (rawDates.length !== urls.length) {
    fail("/sitemap.xml", `${urls.length} URLs but ${rawDates.length} lastmod values`);
  }

  const today = new Date().toISOString().slice(0, 10);
  for (const rawDate of rawDates) {
    const timestamp = Date.parse(rawDate);
    if (Number.isNaN(timestamp)) fail("/sitemap.xml", `invalid lastmod value: ${rawDate}`);
    if (rawDate.slice(0, 10) > today) fail("/sitemap.xml", `future lastmod value: ${rawDate}`);
  }

  const dates = rawDates.map((date) => date.slice(0, 10));
  if (dates.length > 1 && new Set(dates).size === 1 && dates[0] === today) {
    fail("/sitemap.xml", "every lastmod equals today — dates look generated from the build clock");
  }
}

async function checkRobotsTxt() {
  const response = await fetch(`${BASE}/robots.txt`);
  if (!response.ok) {
    fail("/robots.txt", `HTTP ${response.status}`);
    return;
  }
  if (!/text\/plain/i.test(response.headers.get("content-type") ?? "")) {
    fail("/robots.txt", "response is not served as plain text");
  }

  const text = await response.text();
  const groups = text.split(/\r?\n\s*\r?\n/);
  const universal = groups.find((group) => /^User-agent:\s*\*\s*$/im.test(group)) ?? "";

  if (!universal) fail("/robots.txt", "missing User-agent: * group");
  if (!/^Allow:\s*\/\s*$/im.test(universal)) fail("/robots.txt", "public crawl is not explicitly allowed");
  if (/^Disallow:\s*\/\s*$/im.test(universal)) fail("/robots.txt", "universal group blocks the whole site");
  for (const path of ["/api/", "/_vercel/"]) {
    if (!text.includes(`Disallow: ${path}`)) fail("/robots.txt", `does not disallow ${path}`);
  }
  if (/^Disallow:\s*\/studio\/?\s*$/im.test(text)) {
    fail("/robots.txt", "blocks /studio, preventing crawlers from seeing its X-Robots-Tag noindex");
  }
  if (!text.includes(`Sitemap: ${PRODUCTION_ORIGIN}/sitemap.xml`)) {
    fail("/robots.txt", "does not advertise the canonical sitemap URL");
  }
  for (const crawler of ["Googlebot", "Googlebot-Image", "Bingbot", "OAI-SearchBot", "PerplexityBot"]) {
    if (!text.includes(`User-Agent: ${crawler}`) && !text.includes(`User-agent: ${crawler}`)) {
      fail("/robots.txt", `missing documented policy for ${crawler}`);
    }
  }
}

async function checkLlmsTxt(manifest) {
  const response = await fetch(`${BASE}/llms.txt`);
  if (!response.ok) {
    fail("/llms.txt", `HTTP ${response.status}`);
    return;
  }
  if (!/text\/plain/i.test(response.headers.get("content-type") ?? "")) {
    fail("/llms.txt", "response is not served as plain text");
  }

  const text = await response.text();
  for (const claim of RETIRED_CLAIM_PATTERNS) {
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
  if (!text.startsWith("# The Glownique\n\n> ")) {
    fail("/llms.txt", "must start with the site H1 followed by a summary blockquote");
  }

  for (const route of manifest.filter((entry) => entry.indexable)) {
    const expected = route.path === "/" ? `${PRODUCTION_ORIGIN}/` : `${PRODUCTION_ORIGIN}${route.path}`;
    if (!text.includes(`](${expected})`) && !text.includes(`](${expected}):`)) {
      fail("/llms.txt", `missing canonical indexable route ${route.path}`);
    }
  }

  for (const section of text.split("\n## ").slice(1)) {
    const heading = section.split("\n", 1)[0];
    if (!/\n- \[[^\]]+\]\(https:\/\//.test(section)) {
      fail("/llms.txt", `section "${heading}" contains no linked resources`);
    }
  }
}

async function checkAssets() {
  for (const assetUrl of assetsToCheck) {
    let parsed;
    try {
      parsed = new URL(assetUrl);
    } catch {
      fail("asset", `invalid absolute URL: ${assetUrl}`);
      continue;
    }

    // External CMS assets are owned by their provider and should not make local
    // validation network-dependent. Project-owned assets are checked locally.
    if (parsed.origin !== PRODUCTION_ORIGIN) continue;

    const target = `${BASE}${parsed.pathname}${parsed.search}`;
    try {
      const response = await fetch(target, { method: "HEAD" });
      if (!response.ok) {
        fail(parsed.pathname, `referenced image returned HTTP ${response.status}`);
      } else if (!/^image\//i.test(response.headers.get("content-type") ?? "")) {
        fail(parsed.pathname, "referenced image is not served with an image content type");
      }
    } catch (error) {
      fail(parsed.pathname, `image request failed: ${error.message}`);
    }
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
  await checkRobotsTxt();
  await checkLlmsTxt(manifest);
  await checkAssets();

  for (const warning of warnings) console.log(`  warn  ${warning}`);
  for (const failure of failures) console.log(`  FAIL  ${failure}`);

  console.log(
    `\n${failures.length === 0 ? "PASS" : "FAIL"} — ${failures.length} failure(s), ${warnings.length} warning(s)`,
  );
  process.exit(failures.length === 0 ? 0 : 1);
}

main();
