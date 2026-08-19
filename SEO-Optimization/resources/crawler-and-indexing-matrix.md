# Crawler and Indexing Matrix

Reviewed 2026-08-11 against official platform documentation. Business choices should be encoded deliberately; explicit allow groups are not technically required when `User-agent: *` already allows all paths.

| Token/agent | Primary use | Automatic crawler | robots behavior | Recommended policy | Index/citation implication | Source |
|---|---|---:|---|---|---|---|
| `Googlebot` | Google Search, including Search features | Yes | Obeys robots | Allow intended public content | Blocking prevents normal Google crawl; Google generative Search relies on Search eligibility | `G-CRAWL-01`, `G-AI-01` |
| `Google-Extended` | Control over specified Gemini training and grounding uses outside Search controls | Control token, no distinct fetch UA | Applied through robots controls | Business choice; do not describe as AI Overview control | Does not affect Google Search inclusion or ranking | `G-CRAWL-01` |
| `Bingbot` | Bing Search and supporting Microsoft experiences | Yes | Obeys supported controls | Allow intended public content | Needed for Bing visibility; track AI citations in Bing tools | `BING-AI-01` |
| `OAI-SearchBot` | ChatGPT search results | Yes | Obeys robots; changes may take about 24h | Allow if ChatGPT search visibility desired | Disallow prevents normal appearance in ChatGPT search answers except possible navigational links | `OPENAI-CRAWL-01` |
| `GPTBot` | Content that may be used for OpenAI foundation-model training | Yes | Obeys robots | Separate business decision from search | Disallow signals no future training use; does not equal search opt-out | `OPENAI-CRAWL-01` |
| `ChatGPT-User` | User-triggered fetch/actions | No automatic crawl | Robots may not apply | Document; secure sensitive routes with auth, not robots | Not used to determine Search inclusion | `OPENAI-CRAWL-01` |
| `PerplexityBot` | Surface/link pages in Perplexity search | Yes | Publisher control via robots; IP ranges published | Allow if Perplexity visibility desired; verify WAF | Blocking can reduce search result inclusion | `PERP-CRAWL-01` |
| `Perplexity-User` | User-triggered retrieval | No automatic crawl | Generally ignores robots | Protect non-public content with auth | May fetch public page on user request | `PERP-CRAWL-01` |
| `Claude-SearchBot` | Anthropic search indexing/quality | Yes | Anthropic says bots honor robots | Allow if Claude search visibility desired | Blocking may reduce visibility/accuracy in user search results | `ANTH-CRAWL-01` |
| `ClaudeBot` | Content potentially used for Anthropic model training | Yes | Honors robots and supports crawl-delay | Separate business decision | Training preference, not the search bot | `ANTH-CRAWL-01` |
| `Claude-User` | User-directed retrieval | User-triggered | Anthropic documents separate robots control | Allow/deny based on business choice; use auth for private content | Blocking may reduce user-directed visibility | `ANTH-CRAWL-01` |
| `anthropic-ai` | Legacy token currently listed in project | Unclear/currently superseded in official taxonomy | Do not rely on legacy assumptions | Remove or retain only with documented compatibility reason | Current official policy names three Claude agents above | `ANTH-CRAWL-01` |
| `Applebot` / `Applebot-Extended` | Apple search/Siri and Apple generative-use controls | Platform-specific | Verify current Apple docs before changing | Keep allowed pending owner policy | No claim made here beyond current project allowance | Validation required |
| `DuckDuckBot` | DuckDuckGo search | Yes | Standard publisher controls | Allow intended public content | Supports discovery in DuckDuckGo | Validation required before detailed claims |

## Implementation notes

- Robots directives are not access control. Authenticate or remove `/studio` and any preview/admin endpoints.
- Allowing a crawler does not guarantee indexing, citation or recommendation.
- Verify legitimate automated agents with official IP/DNS mechanisms when enforcing WAF rules; user-agent strings can be spoofed.
- Record `X-Robots-Tag` and page-level `noindex` separately from crawl controls.
- Re-review this matrix quarterly because crawler tokens and product behavior change.
