"use client";

import { useEffect, useState } from "react";

import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

type DetailStickyCtaProps = {
  whatsappUrl: string;
  etsyUrl: string;
  /** Prefix for `data-meta-source`, e.g. "backlit" gives "backlit-sticky-whatsapp". */
  source: string;
  /** Matches the in-page buttons: the bar hides while any of them is on screen. */
  hideWhileVisible?: string;
};

/**
 * Phone-only bar that keeps WhatsApp and Etsy one tap away on a long page.
 *
 * Most visitors here arrive from an Instagram or Facebook ad on a phone and
 * scroll past the hero within seconds. The bar appears once the hero buttons
 * have left the screen and steps aside whenever another pair of buttons is
 * visible, so the two never compete.
 *
 * It stops short of the right edge on purpose: the live chat bubble lives in
 * that corner and would sit on top of the Etsy button.
 */
export function DetailStickyCta({
  whatsappUrl,
  etsyUrl,
  source,
  hideWhileVisible = ".detail-cta",
}: DetailStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = [...document.querySelectorAll(hideWhileVisible)];
    if (targets.length === 0) return;

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      // Before the first scroll the hero buttons may be below the fold on a
      // short phone; that is not "scrolled past", so require some scroll too.
      setVisible(onScreen.size === 0 && window.scrollY > 200);
    });
    for (const target of targets) observer.observe(target);

    const onScroll = () => setVisible(onScreen.size === 0 && window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [hideWhileVisible]);

  return (
    <div className="detail-sticky" data-visible={visible} inert={!visible ? true : undefined}>
      {whatsappUrl ? (
        <a
          className="button button--whatsapp"
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-meta-source={`${source}-sticky-whatsapp`}
        >
          <WhatsappIcon className="h-5 w-5 shrink-0" />
          <span>WhatsApp</span>
        </a>
      ) : null}
      {etsyUrl ? (
        <a
          className="button button--etsy"
          href={etsyUrl}
          target="_blank"
          rel="noopener"
          aria-label="Order on Etsy (opens Etsy in a new tab)"
          data-meta-source={`${source}-sticky-etsy`}
        >
          <span className="etsy-mark" aria-hidden="true" />
          <span className="etsy-wordmark">Etsy</span>
        </a>
      ) : null}
    </div>
  );
}
