import Link from "next/link";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { SOCIAL_LINKS, HAS_WHATSAPP, whatsappQuoteUrl } from "@/lib/site";
import styles from "../studio-chrome.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="about">
      <div className={styles.footerInner}>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.kicker}>Your idea. Our next creation.</p>
            <h2>
              Let’s make
              <br />
              <em>something glow.</em>
            </h2>
          </div>
          <div className={styles.footerCta}>
            <p>
              A name, a logo, a few words.
              <br />
              Every good sign starts somewhere.
            </p>
            <CustomQuoteButton
              className={styles.quote}
              label="Start with a free preview"
            />
          </div>
        </div>
        <div className={styles.footerLinks}>
          <div className={styles.footerAbout}>
            <Link href="/" className={styles.footerWordmark}>
              THE GLOWNIQUE
            </Link>
            <p>
              Custom LED neon, metal lettering, acrylic signs and lightboxes.
              Made to order for businesses, celebrations and homes.
            </p>
            <div className={styles.socials}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label} ↗
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Footer sign collections">
            <h3>Find your sign</h3>
            <Link href="/products/custom-neon-signs">
              Custom LED neon signs
            </Link>
            <Link href="/products/3d-metal-neon-signs">3D metal letters</Link>
            <Link href="/products/uv-print-acrylic-signs">
              Acrylic logo signs
            </Link>
            <Link href="/products/ultra-thin-lightbox">Slim lightboxes</Link>
            <Link href="/custom-signage">Shop by occasion</Link>
          </nav>
          <nav aria-label="Footer help">
            <h3>A little guidance</h3>
            <Link href="/guides">Sign buying guides</Link>
            <Link href="/#custom">How it works</Link>
            <Link href="/shipping">Shipping & delivery</Link>
            <Link href="/returns">Returns & warranty</Link>
            <Link href="/contact">Contact us</Link>
            {HAS_WHATSAPP && (
              <a
                href={whatsappQuoteUrl("custom sign")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp ↗
              </a>
            )}
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} The Glownique</span>
          <span>Designed with feeling. Built to glow.</span>
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/accessibility">Accessibility</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
