"use client";

type PostHogClient = (typeof import("posthog-js"))["default"];
type EventProperties = Record<string, unknown>;

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const FALLBACK_LOAD_DELAY_MS = 15_000;

let clientPromise: Promise<PostHogClient | null> | null = null;
let initializationScheduled = false;

function isConfigured() {
  return Boolean(token && host);
}

function loadPostHog(): Promise<PostHogClient | null> {
  if (!isConfigured()) return Promise.resolve(null);
  if (clientPromise) return clientPromise;

  clientPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token!, {
        api_host: "/ingest",
        ui_host: "https://us.posthog.com",
        defaults: "2026-01-30",
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: false,
        capture_exceptions: false,
        capture_performance: false,
        capture_dead_clicks: false,
        enable_heatmaps: false,
        disable_session_recording: true,
        disable_surveys: true,
        disable_external_dependency_loading: false,
        advanced_disable_flags: true,
        debug: false,
      });

      return posthog;
    })
    .catch((error: unknown) => {
      if (process.env.NODE_ENV !== "production") {
        console.error("PostHog failed to load", error);
      }
      return null;
    });

  return clientPromise;
}

export function capturePostHog(
  eventName: string,
  properties?: EventProperties,
) {
  void loadPostHog().then((posthog) => {
    posthog?.capture(eventName, properties);
  });
}

/**
 * Keep the browser SDK off the hydration path. A genuine interaction loads it
 * immediately so the first custom event is retained; otherwise it waits until
 * well after the initial page-load measurement window.
 */
export function schedulePostHogInitialization() {
  if (
    typeof window === "undefined" ||
    initializationScheduled ||
    !isConfigured()
  ) {
    return;
  }

  initializationScheduled = true;
  let fallbackTimer: number | undefined;

  const removeActivityListeners = () => {
    window.removeEventListener("pointerdown", activate);
    window.removeEventListener("keydown", activate);
  };
  const activate = () => {
    if (fallbackTimer) window.clearTimeout(fallbackTimer);
    removeActivityListeners();
    void loadPostHog();
  };
  const scheduleFallback = () => {
    fallbackTimer = window.setTimeout(activate, FALLBACK_LOAD_DELAY_MS);
  };

  window.addEventListener("pointerdown", activate, { once: true, passive: true });
  window.addEventListener("keydown", activate, { once: true });

  if (document.readyState === "complete") {
    scheduleFallback();
  } else {
    window.addEventListener("load", scheduleFallback, { once: true });
  }
}
