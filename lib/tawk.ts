/**
 * Typed access to the Tawk.to widget.
 *
 * Every call into `window.Tawk_API` in this codebase goes through here, for the
 * same reason lib/meta-pixel.ts exists: the widget loads with `lazyOnload`, so
 * there is a real window — first paint until the embed script runs — where
 * `Tawk_API` exists as a bare object with none of its methods on it. Calling
 * `setAttributes` in that window throws, and it throws exactly when it matters
 * most: the visitor has just filled in the pre-chat form and is waiting.
 *
 * So every command waits for the widget to report ready before it runs, with a
 * bounded number of retries so a blocked or ad-blocked widget gives up quietly
 * instead of polling for the life of the page.
 */

/** Where the visitor's own details live between visits. */
export const CHAT_VISITOR_KEY = "glownique:chat-visitor";

export type ChatVisitor = {
  name: string;
  email: string;
  phone: string;
};

type TawkApi = {
  /** Present only once the widget has finished loading. */
  getStatus?: () => string;
  setAttributes?: (
    attributes: Record<string, string>,
    callback?: (error?: unknown) => void,
  ) => void;
  showWidget?: () => void;
  hideWidget?: () => void;
  maximize?: () => void;
  onLoad?: () => void;
};

declare global {
  interface Window {
    Tawk_API?: TawkApi;
  }
}

const MAX_ATTEMPTS = 60;
const RETRY_MS = 250;

/** The widget is only usable once its methods actually exist. */
function isReady(api: TawkApi | undefined): api is Required<
  Pick<TawkApi, "setAttributes" | "showWidget" | "maximize">
> &
  TawkApi {
  return Boolean(api && typeof api.getStatus === "function" && api.setAttributes);
}

/**
 * Run `action` once the widget is ready, or drop it after roughly 15 seconds.
 *
 * Dropping is deliberate. If Tawk never arrives — an ad blocker, a content
 * filter, an outage — the caller has already been told the chat is unavailable,
 * and a retry loop that outlives the visit only burns battery.
 */
export function onTawkReady(action: () => void): void {
  if (typeof window === "undefined") return;

  let attempts = 0;
  const attempt = () => {
    if (isReady(window.Tawk_API)) {
      action();
      return;
    }
    attempts += 1;
    if (attempts >= MAX_ATTEMPTS) return;
    window.setTimeout(attempt, RETRY_MS);
  };

  attempt();
}

/**
 * Attach the visitor's details to the conversation.
 *
 * `name` and `email` are Tawk's own visitor fields; `phone` is a custom
 * attribute. All three show against the conversation in the Tawk dashboard,
 * which is the point — a chat that ends without a reply can still be followed
 * up. Nothing is sent anywhere else.
 *
 * Note on secure mode: if Tawk's "Secure Mode" is ever switched on, this call
 * additionally requires a `hash` (HMAC-SHA256 of the email, signed with the API
 * key). That signing must happen server-side, so enabling secure mode means
 * adding a route handler — it cannot be done from here.
 */
export function identifyChatVisitor(visitor: ChatVisitor): void {
  onTawkReady(() => {
    window.Tawk_API?.setAttributes?.(
      {
        name: visitor.name,
        email: visitor.email,
        phone: visitor.phone,
      },
      // Swallow the error rather than surfacing it: the visitor cannot act on a
      // Tawk attribute failure, and the chat itself still works without it.
      () => {},
    );
  });
}

/** Reveal the widget and open it. Used after the pre-chat form is completed. */
export function openTawkChat(): void {
  onTawkReady(() => {
    window.Tawk_API?.showWidget?.();
    window.Tawk_API?.maximize?.();
  });
}

/** Reveal the widget without forcing it open. Used for a returning visitor. */
export function revealTawkWidget(): void {
  onTawkReady(() => window.Tawk_API?.showWidget?.());
}

/** Read stored details. Returns null when absent or unparseable. */
export function readStoredChatVisitor(): ChatVisitor | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CHAT_VISITOR_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ChatVisitor>;
    if (!parsed.name || !parsed.email) return null;
    return {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone ?? "",
    };
  } catch {
    // Private browsing, a full quota or hand-edited junk. Ask again rather than
    // crashing the launcher.
    return null;
  }
}

/** Persist details so a returning visitor is not asked twice. */
export function storeChatVisitor(visitor: ChatVisitor): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CHAT_VISITOR_KEY, JSON.stringify(visitor));
  } catch {
    // Storage denied. The chat still opens; they will just be asked again next
    // visit, which is a better failure than blocking the conversation.
  }
}

// ── Reading storage as an external store ────────────────────────────────────
//
// The component needs to know, during render, whether this visitor has already
// given their details. Doing that with `useEffect` + `setState` trips
// react-hooks/set-state-in-effect and causes a cascading render, so localStorage
// is treated as what it actually is: an external store read through
// useSyncExternalStore. Same approach the countdown section used for the clock.

/** Subscribe to cross-tab changes. Same-tab writes are handled by local state. */
export function subscribeToChatVisitor(onChange: () => void): () => void {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

/**
 * The raw stored string, which is a stable value between renders — important,
 * because useSyncExternalStore loops if the snapshot is a fresh object each time.
 */
export function getChatVisitorSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CHAT_VISITOR_KEY);
  } catch {
    return null;
  }
}

/** Null on the server, so the first client render matches the served HTML. */
export function getServerChatVisitorSnapshot(): string | null {
  return null;
}
