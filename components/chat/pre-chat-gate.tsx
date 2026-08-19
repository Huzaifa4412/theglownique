"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

import { archiveLead } from "@/lib/leads";
import { trackChatStarted } from "@/lib/meta-pixel";
import {
  getChatVisitorSnapshot,
  getServerChatVisitorSnapshot,
  identifyChatVisitor,
  openTawkChat,
  readStoredChatVisitor,
  revealTawkWidget,
  storeChatVisitor,
  subscribeToChatVisitor,
  type ChatVisitor,
} from "@/lib/tawk";

/**
 * Pre-chat gate for the live-chat widget.
 *
 * Tawk's own bubble is hidden on load (see the inline script in app/layout.tsx).
 * This renders our launcher in its place, collects name, email and phone in our
 * own styling, attaches them to the conversation via the Tawk API, and only then
 * reveals and opens the real widget. So a chat can never start anonymously, and
 * an abandoned conversation can still be followed up.
 *
 * Why not Tawk's built-in Pre-Chat Form: it works, but it renders inside Tawk's
 * iframe with Tawk's styling, and it cannot be reached by our own analytics or
 * validation. This keeps the first thing a visitor sees looking like the rest of
 * the site.
 *
 * A returning visitor is not asked twice — details are kept in localStorage and
 * re-attached silently, and the widget is revealed straight away.
 */

const labelClass =
  "block text-xs font-extrabold uppercase tracking-widest text-[#1e1a22]";
const fieldClass =
  "mt-2 w-full rounded-xl border border-[#eadfe4] bg-white px-4 py-3 text-sm text-[#1e1a22] shadow-sm outline-none transition-colors placeholder:text-[#a8a2ae] focus:border-[#f40b68] focus:ring-2 focus:ring-[#f40b68]/20";

export function PreChatGate() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Read during render rather than in an effect: setting state synchronously in
  // an effect triggers a cascading render and is a lint error in this project.
  const storedRaw = useSyncExternalStore(
    subscribeToChatVisitor,
    getChatVisitorSnapshot,
    getServerChatVisitorSnapshot,
  );
  // A same-tab write does not fire a `storage` event, so completing the form is
  // tracked locally instead of round-tripping through the store.
  const [startedHere, setStartedHere] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  // Re-attach a returning visitor's details and reveal the widget. No state is
  // set here, so no cascading render.
  useEffect(() => {
    if (!storedRaw) return;
    const stored = readStoredChatVisitor();
    if (!stored) return;
    identifyChatVisitor(stored);
    revealTawkWidget();
  }, [storedRaw]);

  const closeDialog = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const openDialog = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const visitor: ChatVisitor = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    };
    if (!visitor.name || !visitor.email) return;

    storeChatVisitor(visitor);
    identifyChatVisitor(visitor);
    // Archived to Sanity so the lead survives even if the chat is abandoned
    // before anyone replies. Fire-and-forget: the chat must open regardless.
    archiveLead({
      source: "pre-chat",
      name: visitor.name,
      email: visitor.email,
      phone: visitor.phone,
      topic: "Live chat",
      pagePath: pathname ?? "/",
      consent: true,
    });
    trackChatStarted(pathname ?? "/");

    closeDialog();
    setStartedHere(true);
    openTawkChat();
  };

  // Once the visitor is known the Tawk bubble is the control, so the launcher
  // retires. Returning visitors see it for a single frame before hydration reads
  // storage; the widget itself never flashes, because layout.tsx checks the same
  // key before Tawk's onLoad decides whether to hide it.
  if (startedHere || storedRaw) return null;

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="button button--whatsapp fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full px-5 py-3.5 text-sm font-extrabold shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 active:scale-95"
        data-meta-source="pre-chat-launcher"
      >
        <ChatGlyph />
        <span>Chat with us</span>
      </button>

      <dialog
        ref={dialogRef}
        className="pre-chat-dialog"
        aria-labelledby="pre-chat-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
      >
        <form onSubmit={handleSubmit} className="p-6 sm:p-7">
          <h2
            id="pre-chat-title"
            className="text-xl font-extrabold tracking-tight text-[#1e1a22]"
          >
            Before we start chatting
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
            So we can pick the conversation back up if you close the tab or we
            miss you. We answer within one working day, 7 days a week.
          </p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className={labelClass}>Your name *</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Email *</span>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Phone or WhatsApp *</span>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555 000 0000"
                className={fieldClass}
              />
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#5e5862]">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#f40b68]"
            />
            <span>
              I&apos;m happy for The Glownique to use these details to answer my
              question and follow up about it. Our chat is run by Tawk.to — see the{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener"
                className="font-semibold text-[#ce0754] underline underline-offset-2"
              >
                privacy policy
              </a>
              .
            </span>
          </label>

          <button
            type="submit"
            disabled={!consent}
            className="button button--whatsapp mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChatGlyph />
            <span>Start the chat</span>
          </button>

          <button
            type="button"
            onClick={closeDialog}
            className="mt-3 w-full text-xs font-semibold text-[#6b6570] underline underline-offset-2"
          >
            Not now
          </button>
        </form>
      </dialog>
    </>
  );
}

function ChatGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    >
      <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.4 8.6 8.6 0 0 1-3.9-.9L3 21l1.9-4.9A8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" />
    </svg>
  );
}
