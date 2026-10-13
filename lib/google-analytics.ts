export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ||
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  "G-6PWLMLHEMK";

export function isAnalyticsHost(hostname: string): boolean {
  return hostname === "theglownique.com" || hostname === "www.theglownique.com";
}

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

/** Quote clicks are intent signals, never proof of a conversation or a sale. */
export function trackGoogleAnalyticsEvent(
  name: "whatsapp_click" | "etsy_click" | "quote_form_submit",
  parameters: Record<string, string>,
): void {
  if (typeof window === "undefined" || !isAnalyticsHost(window.location.hostname) || window.location.pathname.startsWith("/studio")) return;
  const analyticsWindow = window as AnalyticsWindow;
  // Queue intent events even when the deferred Google script hasn't loaded.
  // No form values, phone numbers, email addresses or WhatsApp messages leave
  // the page through this helper.
  analyticsWindow.dataLayer ??= [];
  analyticsWindow.gtag ??= function () {
    // gtag consumes Arguments objects, as in Google's standard snippet.
    // eslint-disable-next-line prefer-rest-params -- Google's queue consumes Arguments objects.
    analyticsWindow.dataLayer!.push(arguments);
  };
  analyticsWindow.gtag("event", name, { ...parameters, send_to: GA_MEASUREMENT_ID, transport_type: "beacon" });
}
