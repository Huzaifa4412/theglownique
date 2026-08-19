"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { trackEtsyOutbound, trackPageView, trackWhatsappContact } from "@/lib/meta-pixel";

/**
 * Hostnames that mean "this visitor is leaving to talk to us".
 * wa.me is what lib/site.ts builds, the other two are what WhatsApp itself
 * redirects to and what a hand-written link is likely to use.
 */
const WHATSAPP_HOSTS = ["wa.me", "api.whatsapp.com", "web.whatsapp.com"];

/** Any Etsy domain — the shop link, a listing link, a regional TLD. */
function isEtsyHost(host: string) {
  return host === "etsy.com" || host.endsWith(".etsy.com");
}

/**
 * Meta Pixel event tracking that can't live in a single component. Render once,
 * in the root layout, next to <MetaPixel />.
 *
 * Handles two things:
 *
 * ── PageView on every route ──────────────────────────────────────────────────
 * The base snippet no longer fires PageView (see meta-pixel.tsx). This does,
 * on mount and on every pathname change, so an App Router navigation is counted
 * like a real page view instead of vanishing. Search params are ignored on
 * purpose: nothing on this site routes on them — the catalog's category and
 * search filters are React state — so watching them would only add a
 * useSearchParams Suspense boundary for no signal.
 *
 * ── Outbound clicks, by delegation ───────────────────────────────────────────
 * WhatsApp and Etsy links are the two ways a visitor converts, and they are
 * scattered across a dozen components: the floating button, the header, the
 * footer, the product top bar, the product detail CTAs, the contact page, the
 * reviews section, and CustomQuoteButton's no-shell fallback. Instrumenting
 * each one means an onClick on every anchor, a "use client" on pages that are
 * currently server components, and a near-certainty that the next WhatsApp link
 * someone adds ships untracked.
 *
 * So this listens once on the document and matches on href instead. Every
 * existing link is covered, and so is every future one, with no per-component
 * churn. The trade-off is that the tracking isn't visible at the call site —
 * hence this comment, and hence `data-meta-source`.
 *
 * Every event carries the pathname it fired on. A link can additionally label
 * itself with `data-meta-source="floating-button"` to say which CTA it is —
 * worth adding to any link whose position matters, since without it the event
 * only records the page.
 *
 * Deliberately NOT handled here: the quote form's WhatsApp handoff. That goes
 * through window.open() rather than an anchor, and fires Lead explicitly in
 * product-dialog.tsx — a completed form is a different, stronger event than a
 * click on a chat link.
 */
export function MetaPixelEvents() {
  const pathname = usePathname();

  // Guards against firing PageView twice for the same route — React Strict Mode
  // runs effects twice in development, and a layout remount would otherwise
  // double-count. Only consecutive identical pathnames are suppressed, so
  // A → B → A still reports three views.
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;
    trackPageView();
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      // closest(), not target itself: every one of these links wraps an icon
      // and a label, so the click lands on a child span nine times out of ten.
      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      let host: string;
      try {
        host = new URL(href, window.location.origin).hostname.toLowerCase();
      } catch {
        return; // mailto:, tel:, or a malformed href — not an outbound click.
      }

      const source = link.dataset.metaSource ?? "unlabelled-link";

      if (WHATSAPP_HOSTS.includes(host)) {
        trackWhatsappContact(source, pathname);
        return;
      }

      if (isEtsyHost(host)) {
        trackEtsyOutbound(source, pathname);
      }
    };

    // auxclick as well as click: these all open in a new tab anyway, so a
    // middle-click is the same intent and would otherwise go unrecorded.
    document.addEventListener("click", handleClick);
    document.addEventListener("auxclick", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("auxclick", handleClick);
    };
  }, [pathname]);

  return null;
}
