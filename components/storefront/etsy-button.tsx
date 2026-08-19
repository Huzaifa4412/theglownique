import { ETSY_SHOP_URL } from "@/lib/site";

type EtsyButtonProps = {
  className?: string;
};

/**
     * Link out to the Etsy shop, dressed in Etsy's own colours rather than the pink
     * brand palette. Etsy holds the real checkout and the only verified reviews, so
     * the button is worth the visual detour: people recognise the orange and know
     * instantly what it does and that it leaves the site.
     *
     * It rides on the shared `.button` base so its height, padding, radius and
     * press animation are byte-identical to `.button--primary` sitting next to it —
     * `.button--etsy` only swaps the colours. Do not give it its own geometry: the
     * base rules are unlayered CSS and beat Tailwind sizing utilities, so a
     * hand-rolled pill silently ends up a different shape from its neighbour.
     *
     * The wordmark is a serif approximation, not Etsy's licensed logo file. It is
     * close enough to read as Etsy at button size; drop in the official SVG from
     * Etsy's brand assets if you ever want it exact.
     *
     * Renders nothing when ETSY_SHOP_URL is empty — same rule as the footer social
     * links: an unconfigured URL hides the link rather than shipping a dead one.
**/

export function EtsyButton({ className = "" }: EtsyButtonProps) {
  if (!ETSY_SHOP_URL) return null;

  return (
    <a
      className={`button button--etsy ${className}`.trim()}
      href={ETSY_SHOP_URL}
      target="_blank"
      rel="noopener"
      aria-label="Order on Etsy — opens our Etsy shop in a new tab"
      // Etsy holds the real checkout, so MetaPixelEvents' outbound-link listener
      // reports this click as InitiateCheckout. Stays a Server Component: the
      // listener matches on href, so no onClick and no "use client" needed here.
      data-meta-source="etsy-button"
    >
      {/* The "E" glyph is drawn by CSS (.etsy-mark::before) rather than being a
          text node. As a text node it counted as visible text, and at mobile
          widths — where .etsy-lead is display:none — the button's visible text
          read "E Etsy", which the accessible name does not contain. That fails
          the WCAG "Label in Name" check and, more practically, means a
          voice-control user cannot activate the button by saying what they see. */}
      <span className="etsy-mark" aria-hidden="true" />
      <span>
        <span className="etsy-lead">Order on </span>
        <span className="etsy-wordmark">Etsy</span>
      </span>
    </a>
  );
}