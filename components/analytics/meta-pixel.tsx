import Script from "next/script";

import { HAS_META_PIXEL, META_PIXEL_ID } from "@/lib/meta-pixel";

/**
 * Meta Pixel base snippet. Render once, in the root layout.
 *
 * Three deliberate differences from the snippet Meta's Events Manager hands you:
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
 * 3. The `fbq` queue and the library are split. The queue is a few hundred
 *    bytes with no network cost, so it is defined as soon as the page is
 *    interactive and every event has somewhere to wait. The library
 *    (fbevents.js, the expensive part) is fetched at whichever comes first: the
 *    window load event, the visitor's first tap, key or scroll, or three
 *    seconds. Waiting for load alone, as this did until 2026-10-05, meant an ad
 *    visitor on a slow phone was not counted for the first ten seconds or more
 *    (measured on the backlit landing page), and one who left before then was
 *    never counted at all.
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
          !function(f,b){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
          var done=!1,load=function(){if(done)return;done=!0;
          var t=b.createElement('script');t.async=!0;
          t.src='https://connect.facebook.net/en_US/fbevents.js';
          var s=b.getElementsByTagName('script')[0];s.parentNode.insertBefore(t,s)};
          if(b.readyState==='complete')load();else f.addEventListener('load',load);
          ['pointerdown','touchstart','keydown','scroll'].forEach(function(e){
          f.addEventListener(e,load,{once:!0,passive:!0})});
          setTimeout(load,3000)}(window,document);
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
