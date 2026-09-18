/**
 * One article for the existing Sanity importer. Markdown remains the editorial
 * source, so fixes to headings/copy cannot drift from a second handwritten body.
 * This deliberately parses only the Markdown features used by this article.
 */
import { readFileSync } from "node:fs";
import { a, b, h2, h3, image, p, table } from "./portable-text.mjs";

export function loadEditorialPost({ slug, id, publishedAt, readingMinutes, imageFiles }) {
const base = new URL(`../../SEO-Optimization/blog-drafts/${slug}/`, import.meta.url);
const metadata = JSON.parse(readFileSync(new URL("metadata.json", base), "utf8"));
const markdown = readFileSync(new URL("article.md", base), "utf8").replaceAll("\r\n", "\n");

function inline(text) {
  const parts = [];
  const tokens = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let start = 0;
  for (const match of text.matchAll(tokens)) {
    if (match.index > start) parts.push(text.slice(start, match.index));
    if (match[1]) {
      const href = match[2].replace(/^https:\/\/www\.theglownique\.com(?=\/)/, "");
      parts.push(a(match[1], href));
    } else parts.push(b(match[3]));
    start = match.index + match[0].length;
  }
  if (start < text.length) parts.push(text.slice(start));
  return parts;
}

const faqHeading = "## Frequently asked questions";
const [beforeFaq, afterFaq] = markdown.split(faqHeading);
if (!afterFaq) throw new Error("Expected the article's FAQ section.");
const closingIndex = afterFaq.indexOf("\n## ");
if (closingIndex < 0) throw new Error("Expected the closing CTA after FAQs.");
const faqMarkdown = afterFaq.slice(0, closingIndex);
const faqs = faqMarkdown.trim().split(/\n(?=### )/).map((section) => {
  const [question, ...answer] = section.split("\n");
  if (!question.startsWith("### ")) throw new Error("Unsupported FAQ structure.");
  return { q: question.slice(4), a: answer.join(" ").trim() };
});

const bodyMarkdown = beforeFaq + afterFaq.slice(closingIndex);
const body = [];
for (const chunk of bodyMarkdown.trim().split(/\n\s*\n/)) {
  if (chunk.startsWith("# ")) {
    if (chunk.slice(2) !== metadata.title) throw new Error("Article H1 differs from metadata.");
    continue; // The post page renders the H1 once.
  }
  if (chunk.startsWith("## ")) { body.push(h2(chunk.slice(3))); continue; }
  if (chunk.startsWith("### ")) { body.push(h3(chunk.slice(4))); continue; }
  if (chunk.startsWith("![")) {
    const match = chunk.match(/^!\[([^\]]+)\]\((\S+) "([^"]+)"\)$/);
    if (!match) throw new Error("Unsupported image syntax.");
    const key = match[2].split("/").at(-1).replace(/\.webp$/, "");
    if (!imageFiles[key]) throw new Error(`Unmapped article image: ${key}`);
    body.push(image(key, match[1], match[3]));
    continue;
  }
  if (chunk.startsWith("|")) {
    const rows = chunk.split("\n").map((row) => row.split("|").slice(1, -1).map((cell) => cell.trim()));
    if (!rows[1]?.every((cell) => /^:?-+:?$/.test(cell))) throw new Error("Invalid table separator.");
    body.push(table("Halloween neon display ideas by space", rows[0], rows.slice(2)));
    continue;
  }
  if (/^\d+\. /.test(chunk)) {
    for (const line of chunk.split("\n")) {
      if (!/^\d+\. /.test(line)) throw new Error("Unsupported multiline list.");
      body.push({ ...p(...inline(line.replace(/^\d+\. /, ""))), listItem: "number", level: 1 });
    }
    continue;
  }
  if (/^[#>|]|^[-*] /.test(chunk)) throw new Error("Unsupported Markdown block.");
  body.push(p(...inline(chunk.replaceAll("\n", " "))));
}

return {
  _id: id,
  slug: metadata.slug,
  title: metadata.title,
  categorySlug: metadata.categorySlug,
  cover: metadata.cover,
  coverAlt: metadata.coverAlt,
  coverCaption: metadata.coverCaption,
  readingMinutes,
  publishedAt,
  featured: false,
  indexable: true,
  primaryKeyword: metadata.primaryKeyword,
  secondaryKeywords: metadata.secondaryKeywords,
  seoTitle: metadata.seoTitle,
  seoDescription: metadata.seoDescription,
  summary: metadata.summary,
  keyTakeaways: metadata.keyTakeaways,
  relatedLinks: metadata.relatedLinks,
  sources: metadata.sources,
  body,
  faqs,
};
}
