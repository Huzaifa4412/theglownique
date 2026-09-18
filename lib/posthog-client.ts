"use client";

import posthog from "posthog-js";

type EventProperties = Record<string, unknown>;

export function capturePostHog(
  eventName: string,
  properties?: EventProperties,
) {
  if (typeof window === "undefined") return;

  try {
    posthog.capture(eventName, properties);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[PostHog] capture error:", error);
    }
  }
}

export function identifyPostHog(
  distinctId: string,
  userProperties?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;

  try {
    posthog.identify(distinctId, userProperties);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[PostHog] identify error:", error);
    }
  }
}

export function resetPostHog() {
  if (typeof window === "undefined") return;

  try {
    posthog.reset();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[PostHog] reset error:", error);
    }
  }
}
