import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (!token || !host) {
  if (process.env.NODE_ENV !== "production") {
    console.error(
      `${!token ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN" : "NEXT_PUBLIC_POSTHOG_HOST"} variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once ${!token ? "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN" : "NEXT_PUBLIC_POSTHOG_HOST"} is configured`,
    );
  }
} else {
  posthog.init(token, {
    api_host: "/ingest",
    defaults: "2026-01-30",
    capture_pageview: false,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
}
