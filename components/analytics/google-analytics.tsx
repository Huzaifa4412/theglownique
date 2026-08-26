import Script from "next/script";

import { GA_MEASUREMENT_ID, HAS_GOOGLE_ANALYTICS } from "@/lib/google-analytics";

/**
 * Google Analytics (gtag.js) component.
 * Rendered in the root layout to load GA tracking across all routes.
 */
export function GoogleAnalytics() {
  if (!HAS_GOOGLE_ANALYTICS) return null;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
