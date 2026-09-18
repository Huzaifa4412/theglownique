import { createClient } from "@sanity/client";
import { postBySlugQuery } from "../sanity/lib/queries.js";

const client = createClient({
  projectId: "8378herd",
  dataset: "production",
  apiVersion: "2026-08-10",
  useCdn: false,
});

async function main() {
  const slugs = [
    "halloween-neon-sign-ideas",
    "coffee-bar-neon-sign-ideas",
    "christmas-neon-sign-ideas",
  ];

  for (const slug of slugs) {
    const post = await client.fetch(postBySlugQuery, { slug });
    if (!post) {
      console.error(`Post not found: ${slug}`);
      continue;
    }
    console.log(`\n✓ Slug: ${post.slug}`);
    console.log(`  Title: ${post.title}`);
    console.log(`  Author: ${post.author?.name} (${post.author?.role})`);
    console.log(`  Category: ${post.category?.title} (${post.category?.slug})`);
    console.log(`  Cover: ${post.coverImage?.url ?? "None"}`);
    console.log(`  Body Blocks: ${post.body?.length}`);
    console.log(`  FAQs: ${post.faqs?.length}`);
    console.log(`  Related Links: ${post.relatedLinks?.map(l => l.label).join(", ")}`);
  }
}

main().catch(console.error);
