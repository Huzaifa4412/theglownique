/**
 * Google Analytics 4 (gtag.js) configuration and helper layer.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ||
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  "G-6PWLMLHEMK";

export const HAS_GOOGLE_ANALYTICS =
  Boolean(GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.length > 0);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Custom event helper for Google Analytics
 */
export function trackGAEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}
