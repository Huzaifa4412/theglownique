"use client";

import Script from "next/script";
import { GA_MEASUREMENT_ID } from "@/lib/google-analytics";

/** The loader itself runs only on the public site, excluding preview/dev data. */
export function GoogleAnalytics() {
  return (
    <Script id="google-analytics" strategy="lazyOnload">
      {`
        if (['theglownique.com', 'www.theglownique.com'].includes(window.location.hostname)
            && !window.location.pathname.startsWith('/studio')) {
          window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('js', new Date());
          window.gtag('config', '${GA_MEASUREMENT_ID}');
          var gaScript = document.createElement('script');
          gaScript.async = true;
          gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
          document.head.appendChild(gaScript);
        }
      `}
    </Script>
  );
}
