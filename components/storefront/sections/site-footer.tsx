import Link from "next/link";

import { StoreIcon } from "@/components/storefront/store-icon";
import { SOCIAL_LINKS } from "@/lib/site";

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
        <Link className="button button--primary footer__cta" href="/#custom">
          Start your design <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="shell footer__grid">
        <div className="footer-brand">
          <Link className="brand" href="/">
            THE GLOWNIQUE
          </Link>
          <p>Custom LED neon signs, 3D metal channel letters, ultra-thin lightboxes and UV-print acrylic signs — handcrafted to turn your ideas into something unforgettable.</p>
          <span className="footer-brand__note">Designed with feeling. Built to glow.</span>
          {/* Social icons render only for profiles that actually exist. Fill in
              SOCIAL_LINKS in lib/site.ts and they reappear automatically —
              previously these were three dead href="#" links. Adding the real
              URLs also feeds Organization.sameAs, which is the strongest signal
              for separating this brand from the unrelated "Glownique" tanning
              salon that currently owns the name in Google's entity graph. */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="socials">
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
              <strong>Free worldwide delivery</strong>On every order, no minimum
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
