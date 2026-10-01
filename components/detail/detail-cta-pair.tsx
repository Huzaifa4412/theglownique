import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { whatsappQuoteUrl } from "@/lib/site";

type DetailCtaPairProps = {
  /** Completes "I'd like a free quote and mockup for a …" in the WhatsApp message. */
  subject: string;
  /** Where "Order on Etsy" goes: the matching listing where one exists, else the shop. */
  etsyUrl: string;
  /**
   * Prefix for `data-meta-source`, e.g. "backlit-hair-salon". MetaPixelEvents
   * matches these links by href, so the label is what tells one pair from
   * another in Events Manager and in the outboundClick documents.
   */
  source: string;
  className?: string;
};

/**
 * The two ways to buy, side by side under a picture: WhatsApp and Etsy.
 *
 * Both ride on the shared `.button` base, so they are the same height and
 * shape. A Server Component: tracking is delegated (see meta-pixel-events.tsx),
 * so neither link needs an onClick.
 */
export function DetailCtaPair({ subject, etsyUrl, source, className = "" }: DetailCtaPairProps) {
  const whatsappUrl = whatsappQuoteUrl(subject);

  // Neither route configured: render nothing rather than an empty box.
  if (!whatsappUrl && !etsyUrl) return null;

  return (
    <div className={`detail-cta-box ${className}`.trim()}>
      <div className="detail-cta">
        {/* An unconfigured number returns "" — hide the button rather than open
            a chat with nobody. Etsy still works on its own. */}
        {whatsappUrl ? (
          <a
            className="button button--whatsapp"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-meta-source={`${source}-whatsapp`}
          >
            <WhatsappIcon className="h-5 w-5 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        ) : null}
        {etsyUrl ? (
          <a
            className="button button--etsy"
            href={etsyUrl}
            target="_blank"
            rel="noopener"
            aria-label="Order on Etsy (opens Etsy in a new tab)"
            data-meta-source={`${source}-etsy`}
          >
            <span className="etsy-mark" aria-hidden="true" />
            <span>
              Order on <span className="etsy-wordmark">Etsy</span>
            </span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
