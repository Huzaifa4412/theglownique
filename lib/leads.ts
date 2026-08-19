/**
 * Lead capture — the shape of a submitted enquiry, and the browser-side helper
 * that archives it.
 *
 * Both forms on the site (the contact page and the live-chat pre-chat gate) post
 * the same payload to /api/leads, which is the only thing holding a Sanity write
 * token. Nothing here talks to Sanity directly.
 */

export type LeadSource = "contact-form" | "pre-chat" | "newsletter";

export type LeadPayload = {
  source: LeadSource;
  /** Absent for newsletter signups. */
  name?: string;
  email: string;
  phone?: string;
  country?: string;
  topic?: string;
  message?: string;
  signType?: string;
  size?: string;
  quantity?: string;
  usageLocation?: string;
  budget?: string;
  timeline?: string;
  orderNumber?: string;
  pagePath?: string;
  consent?: boolean;
};

/** Field length caps, enforced on both sides so the API is not the only guard. */
export const LEAD_LIMITS = {
  short: 200,
  message: 4000,
} as const;

/**
 * Archive a lead. Deliberately fire-and-forget.
 *
 * The caller's next action is opening WhatsApp or the chat widget, and that has
 * to happen synchronously inside the click handler or a popup blocker eats it.
 * So this never blocks, never throws, and never reports failure to the visitor:
 * if the archive fails, the customer still reaches us, which is the outcome that
 * actually matters. The lost record is a problem for us, not for them.
 *
 * `keepalive` lets the request finish even though the tab is about to navigate
 * to WhatsApp.
 */
export function archiveLead(payload: LeadPayload): void {
  if (typeof window === "undefined") return;

  try {
    void fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Offline, blocked, or the endpoint is down. Nothing the visitor can do.
    });
  } catch {
    // Same.
  }
}
