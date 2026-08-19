import Script from "next/script";

import { HAS_META_PIXEL, META_PIXEL_ID } from "@/lib/meta-pixel";

/**
 * Meta Pixel base snippet. Render once, in the root layout.
 *
 * Two deliberate differences from the snippet Meta's Events Manager hands you:
 *
 * 1. It calls `fbq('init')` but NOT `fbq('track', 'PageView')`. This is an App
 *    Router app, so client-side navigations never re-run this inline script — a
 *    PageView fired here would count the first page of a session and nothing
 *    after it. MetaPixelEvents owns PageView instead and fires it on every
 *    route, including the first. Removing it from here is what keeps that from
 *    double-counting the landing page.
 *
 * 2. The pixel id comes from lib/meta-pixel.ts, so it is settable per
 *    environment via NEXT_PUBLIC_META_PIXEL_ID and a staging deploy can point
 *    somewhere harmless.
 *
 * `afterInteractive` is correct for a tag manager or analytics pixel — the
 * events layer buffers anything fired before the script lands, so nothing is
 * lost by not blocking hydration on it.
 *
 * The <noscript> beacon still carries `ev=PageView`: that request is the only
 * way a JS-off visitor is ever counted, and it can't double up with the client
 * tracker because the tracker needs JS to run at all.
 */
export function MetaPixel() {
  if (!HAS_META_PIXEL) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
