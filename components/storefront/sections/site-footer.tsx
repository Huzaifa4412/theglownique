import Image from "next/image";
import Link from "next/link";

import { StoreIcon } from "@/components/storefront/store-icon";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { DELIVERY } from "@/lib/claims";
import {
  HAS_WHATSAPP,
  SOCIAL_LINKS,
  formatWhatsappDisplayNumber,
  whatsappQuoteUrl,
} from "@/lib/site";

const footerColumns = [
  {
    title: "Sign types",
    links: [
      ["Custom neon signs", "/products/custom-neon-signs"],
      ["3D metal signs", "/products/3d-metal-neon-signs"],
      ["Ultra thin lightbox", "/products/ultra-thin-lightbox"],
      ["UV-print acrylic", "/products/uv-print-acrylic-signs"],
    ],
  },
  {
    title: "Custom",
    links: [
      ["Create your own", "/#custom"],
      ["How it works", "/#custom"],
      ["Design ideas", "/#categories"],
      ["FAQ", "/#faq"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "/#about"],
      // "Our process" removed: it pointed at /#about too, so two labels
      // resolved to one destination. "How it works" (above) covers the process.
      ["Case studies", "/#inspiration"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Support",
    links: [
      // "Help centre" removed — it duplicated the FAQ link above.
      // "Track your order" removed — tracking is handled by Etsy, and we have
      // no Etsy shop URL configured yet. Re-add it pointing at the Etsy shop
      // once ETSY_SHOP_URL is set rather than shipping a dead link.
      ["Shipping & delivery", "/shipping"],
      ["Returns & warranty", "/returns"],
      ["Accessibility", "/accessibility"],
      ["Privacy", "/privacy"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer" id="about">
      <div className="shell footer__lead">
        <div>
          <p className="eyebrow">Your wall is waiting</p>
          <h2>Make something <span>impossible to ignore.</span></h2>
        </div>
        <CustomQuoteButton
          className="button button--whatsapp footer__cta text-base py-3.5 px-6 font-bold"
          label="Start your design"
        />
      </div>
      <div className="shell footer__grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            <Image
              className="brand__logo"
              src="/brand/logo-mark.png"
              alt=""
              aria-hidden="true"
              width={100}
              height={60}
            />
            THE GLOWNIQUE
          </Link>
          <p>Custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — handcrafted to turn your ideas into something unforgettable.</p>
          <span className="footer-brand__note">Designed with feeling. Built to glow.</span>
          {HAS_WHATSAPP && (
            <div className="mt-4 pt-1">
              <a
                href={whatsappQuoteUrl("custom sign")}
                target="_blank"
                rel="noopener noreferrer"
                data-meta-source="footer-whatsapp"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-extrabold text-[#1e1a22] shadow-md transition-all hover:bg-[#20bd5a] hover:scale-[1.03] active:scale-95"
              >
                <WhatsappIcon className="h-4.5 w-4.5 text-[#1e1a22] shrink-0" />
                <span>WhatsApp: {formatWhatsappDisplayNumber()}</span>
              </a>
            </div>
          )}
          {SOCIAL_LINKS.length > 0 && (
            <div className="socials mt-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  rel="noopener"
                  target="_blank"
                >
                  <StoreIcon name={social.icon} />
                </a>
              ))}
            </div>
          )}
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map(([label, href]) => (
              <Link href={href} key={label}>
                {label}
              </Link>
            ))}
          </div>
        ))}
        <div className="footer-guarantees" aria-label="Shopping guarantees">
          <p>
            <StoreIcon name="Truck" />
            <span>
              <strong>{DELIVERY.short}</strong>{DELIVERY.supporting}
            </span>
          </p>
          <p>
            <StoreIcon name="ShieldCheck" />
            <span>
              <strong>5-year warranty</strong>Quality you can trust
            </span>
          </p>
          <p>
            <StoreIcon name="ImageSquare" />
            <span>
              <strong>Free design preview</strong>Approve it before we craft
            </span>
          </p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} The Glownique</span>
        <div>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
}
