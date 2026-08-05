/**
 * Company and legal details shared by the policy pages.
 *
 * ⚠️  ACTION REQUIRED — the empty strings below are details only the business
 * owner knows. They are deliberately left blank rather than filled with
 * plausible-looking values: an invented address or governing law on a legal
 * page is worse than an absent one.
 *
 * Every page reads these defensively — a blank value makes the page OMIT that
 * clause rather than print a placeholder. So the site is safe to ship as-is,
 * but the privacy notice is not legally complete until `email` and at least one
 * of `registeredName` / `address` is set (UK/EU GDPR requires an identifiable
 * data controller), and the Terms have no governing-law clause until
 * `governingLaw` is set.
 */
export const LEGAL = {
  /** Public trading name. */
  entityName: "The Glownique",

  /** Registered company name, if incorporated. Leave "" for a sole trader. */
  registeredName: "",

  /** Company registration number, if any. */
  companyNumber: "",

  /** Full postal address, newline-separated. "" hides all address blocks. */
  address: "",

  /** Support/privacy contact email. "" routes readers to WhatsApp instead. */
  email: "",

  /** Public phone number. "" hides the phone row. */
  phone: "",

  /**
   * Country (or country + state) whose law governs the Terms, e.g.
   * "England and Wales". "" hides the governing-law and jurisdiction clause.
   */
  governingLaw: "",

  /**
   * Statutory cancellation window in days for NON-custom items. 14 is the
   * UK/EU distance-selling minimum. Bespoke, made-to-order goods are normally
   * exempt from change-of-mind cancellation — the returns page says so.
   */
  returnsWindowDays: 14,

  /** Support availability, as claimed on the homepage. */
  supportHours: "7 days a week",

  /** Shown as "Last updated" on every policy page. Bump when you edit one. */
  lastUpdated: "2026-08-05",
} as const;

/** True when a specific contact route can be published. */
export const HAS_EMAIL = LEGAL.email.length > 0;
export const HAS_ADDRESS = LEGAL.address.length > 0;
export const HAS_PHONE = LEGAL.phone.length > 0;

/** Human-readable "last updated" for page footers. */
export function formattedLastUpdated(): string {
  return new Date(LEGAL.lastUpdated).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
