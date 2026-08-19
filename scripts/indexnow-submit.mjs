#!/usr/bin/env node
/**
 * IndexNow submission (TECH-14).
 *
 * Tells Bing, Yandex and other participating engines that specific URLs were
 * added, materially changed or deleted. Google does not participate.
 *
 *   node scripts/indexnow-submit.mjs /contact /privacy
 *   node scripts/indexnow-submit.mjs --all
 *
 * ── What this does not do ───────────────────────────────────────────────────
 *
 * An HTTP 200 from IndexNow means "your submission was accepted", not "your
 * page was indexed". Nothing in this script should ever be reported as index
 * coverage; Search Console and Bing Webmaster Tools remain the only sources for
 * that (TECH-01, TECH-15).
 *
 * Submit only on material change. Re-submitting an unchanged URL on every
 * deploy is the fastest way to have the signal discounted — the protocol is a
 * change notification, not a crawl request.
 *
 * ── The key ─────────────────────────────────────────────────────────────────
 *
 * The key is public by design: it is verified by being readable at
 * https://host/<key>.txt, which is exactly how the engine proves you control
 * the domain. It is not a credential and does not belong in an env secret.
 */

import { readdir, readFile } from "node:fs/promises";
import process from "node:process";

const HOST = "www.theglownique.com";
const ORIGIN = `https://${HOST}`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS = 10_000; // protocol limit per request

async function loadKey() {
  const publicDir = new URL("../public/", import.meta.url);
  const files = await readdir(publicDir);
  // The key file is a bare 8–128 character hex/alphanumeric name.
  const keyFile = files.find((name) => /^[a-f0-9]{8,128}\.txt$/i.test(name));
  if (!keyFile) {
    throw new Error(
      "No IndexNow key file found in public/. Create public/<key>.txt containing the key.",
    );
  }
  const key = (await readFile(new URL(keyFile, publicDir), "utf8")).trim();
  if (key !== keyFile.replace(/\.txt$/i, "")) {
    throw new Error(`public/${keyFile} must contain exactly the key "${keyFile.replace(/\.txt$/i, "")}"`);
  }
  return key;
}

async function loadAllRoutes() {
  const source = await readFile(new URL("../lib/routes.ts", import.meta.url), "utf8");
  const routes = [];
  const entryRe = /\{\s*path:\s*"([^"]+)"[\s\S]*?indexable:\s*(true|false)/g;
  let match;
  while ((match = entryRe.exec(source)) !== null) {
    if (match[2] === "true") routes.push(match[1]);
  }
  const catalog = await readFile(new URL("../lib/product-catalog.ts", import.meta.url), "utf8");
  for (const slug of catalog.matchAll(/^\s*slug:\s*"([^"]+)"/gm)) {
    routes.push(`/products/${slug[1]}`);
  }
  return routes;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node scripts/indexnow-submit.mjs <path...> | --all");
    process.exit(2);
  }

  const key = await loadKey();
  const paths = args.includes("--all") ? await loadAllRoutes() : args;

  const urlList = paths.map((path) =>
    path.startsWith("http") ? path : `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`,
  );

  if (urlList.length > MAX_URLS) {
    console.error(`${urlList.length} URLs exceeds the ${MAX_URLS} per-request limit; batch them.`);
    process.exit(2);
  }

  const payload = { host: HOST, key, keyLocation: `${ORIGIN}/${key}.txt`, urlList };
  console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
  for (const url of urlList) console.log(`  ${url}`);

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // 200 accepted, 202 accepted pending key validation. 4xx are real errors and
  // are worth reading: 422 usually means a URL did not belong to `host`.
  const body = await response.text();
  console.log(`\nHTTP ${response.status} ${response.statusText}`);
  if (body) console.log(body);
  console.log(
    "\nAccepted != indexed. Confirm coverage in Bing Webmaster Tools, not from this response.",
  );

  process.exit(response.status === 200 || response.status === 202 ? 0 : 1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
