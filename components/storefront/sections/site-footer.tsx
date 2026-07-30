import { StoreIcon } from "@/components/storefront/store-icon";

const footerColumns = [
  {
    title: "Shop",
    links: [
      ["All signs", "#shop"],
      ["Best sellers", "#shop"],
      ["New arrivals", "#shop"],
      ["Gift cards", "#custom"],
    ],
  },
  {
    title: "Custom",
    links: [
      ["Create your own", "#custom"],
      ["How it works", "#custom"],
      ["Design ideas", "#categories"],
      ["FAQ", "#inspiration"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About us", "#about"],
      ["Our process", "#about"],
      ["Case studies", "#inspiration"],
      ["Contact", "#"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Help centre", "#"],
      ["Shipping info", "#"],
      ["Returns", "#"],
      ["Track your order", "#"],
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
        <a className="button button--primary footer__cta" href="#custom">
          Start your design <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="shell footer__grid">
        <div className="footer-brand">
          <a className="brand" href="#">
            THE GLOWNIQUE
          </a>
          <p>Custom neon signs that turn your ideas into something unforgettable.</p>
          <span className="footer-brand__note">Designed with feeling. Built to glow.</span>
          <div className="socials">
            <a href="#" aria-label="Instagram">
              <StoreIcon name="InstagramLogo" />
            </a>
            <a href="#" aria-label="TikTok">
              <StoreIcon name="TiktokLogo" />
            </a>
            <a href="#" aria-label="Pinterest">
              <StoreIcon name="PinterestLogo" />
            </a>
          </div>
        </div>
        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </div>
        ))}
        <div className="footer-guarantees" aria-label="Shopping guarantees">
          <p>
            <StoreIcon name="Truck" />
            <span>
              <strong>Free shipping</strong>On orders $99+
            </span>
          </p>
          <p>
            <StoreIcon name="ShieldCheck" />
            <span>
              <strong>24-month warranty</strong>Quality you can trust
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
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Accessibility</a>
        </div>
      </div>
    </footer>
  );
}
