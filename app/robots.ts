import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

// Search + answer-engine crawlers we explicitly want to allow. Naming them
// documents the intent: every bot listed here is a platform that can cite us,
// and blocking one means that platform structurally cannot.
const SEARCH_AND_AI_CRAWLERS = [
  "Googlebot", // Google Search
  "Google-Extended", // Gemini + AI Overviews
  "Bingbot", // Bing Search + Microsoft Copilot + ChatGPT search
  "GPTBot", // OpenAI
  "OAI-SearchBot", // OpenAI search index
  "ChatGPT-User", // ChatGPT browsing on a user's behalf
  "PerplexityBot", // Perplexity
  "ClaudeBot", // Anthropic
  "anthropic-ai", // Anthropic (legacy token)
  "Applebot", // Apple / Siri
  "Applebot-Extended", // Apple Intelligence
  "DuckDuckBot", // DuckDuckGo
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: SEARCH_AND_AI_CRAWLERS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
