import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

/**
 * Crawler policy.
 *
 * Encodes the decisions in SEO-Optimization/resources/crawler-and-indexing-matrix.md
 * (TECH-11). Three things that earlier versions of this file got wrong and that
 * are easy to get wrong again:
 *
 * 1. Robots rules are crawl controls, not access control and not index control.
 *    Disallowing a path does NOT remove it from an index — it stops the crawl,
 *    which means the crawler never sees the `noindex` that would remove it. That
 *    is why /studio is deliberately NOT disallowed below; it is served with an
 *    `X-Robots-Tag: noindex` header from next.config.ts instead, which is the
 *    only combination that actually keeps it out of results. Real protection for
 *    the Studio is authentication, which remains an open product decision.
 *
 * 2. Google-Extended is a training/grounding control for certain Gemini uses. It
 *    has no effect on Google Search inclusion or ranking, and it is not an "AI
 *    Overviews" switch — AI Overviews draw on normal Search eligibility.
 *
 * 3. Search bots, training bots and user-triggered fetchers are three different
 *    things and deserve three separate decisions. User-triggered agents
 *    (ChatGPT-User, Perplexity-User, Claude-User) fetch a page because a person
 *    asked for it, and they do not all treat robots rules the way an automatic
 *    crawler does.
 *
 * `User-agent: *` already allows everything public, so the named groups below
 * are not technically required. They are kept because they document a policy
 * that would otherwise live only in someone's memory.
 */

/**
 * Automatic crawlers that put pages into a search or answer index. Blocking any
 * of these structurally prevents that platform from citing the site.
 */
const SEARCH_AND_CITATION_CRAWLERS = [
  "Googlebot", // Google Search, and therefore Google's AI surfaces
  "Bingbot", // Bing, Microsoft Copilot
  "DuckDuckBot", // DuckDuckGo
  "OAI-SearchBot", // ChatGPT search results
  "PerplexityBot", // Perplexity search results
  "Claude-SearchBot", // Anthropic search indexing
  "Applebot", // Apple Search / Siri
];

/**
 * Model-training and grounding agents. Allowed — a brand this small gains more
 * from being present in model knowledge than it loses from the training use.
 * This is a business preference, not a technical requirement: flip any of these
 * to a disallow group to opt out, and note that doing so has no effect on search
 * ranking either way.
 */
const TRAINING_AND_GROUNDING_AGENTS = [
  "GPTBot", // OpenAI foundation-model training
  "ClaudeBot", // Anthropic model training
  "Google-Extended", // Gemini training/grounding — NOT a Search control
  "Applebot-Extended", // Apple Intelligence training
];

/**
 * Fetched on a person's explicit request rather than on a crawl schedule. Listed
 * for documentation: these may not honour robots rules the way crawlers do, so
 * anything that genuinely must stay private needs authentication, not an entry
 * here.
 */
const USER_TRIGGERED_AGENTS = ["ChatGPT-User", "Perplexity-User", "Claude-User"];

// Not public content. /studio is excluded from this list on purpose — see note 1
// above. Add paths here only when they should never be fetched at all.
const NON_PUBLIC_PATHS = ["/api/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: NON_PUBLIC_PATHS,
      },
      {
        userAgent: [
          ...SEARCH_AND_CITATION_CRAWLERS,
          ...TRAINING_AND_GROUNDING_AGENTS,
          ...USER_TRIGGERED_AGENTS,
        ],
        allow: "/",
        disallow: NON_PUBLIC_PATHS,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
