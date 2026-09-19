import Link from "next/link";
import styles from "../studio-chrome.module.css";

export function AnnouncementBar() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className={styles.announcement}>
        <span>Made to order. Made to mean something.</span>
        <Link href="/#custom">Your first design preview is on us ↗</Link>
      </div>
    </>
  );
}
