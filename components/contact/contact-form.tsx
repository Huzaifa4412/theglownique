"use client";

import { useMemo, useState, type FormEvent } from "react";

import { WhatsappIcon } from "@/components/ui/whatsapp-icon";
import { archiveLead } from "@/lib/leads";
import { trackQuoteSubmitted, trackWhatsappContact } from "@/lib/meta-pixel";
import { HAS_WHATSAPP, WHATSAPP_NUMBER } from "@/lib/site";
import {
  buildContactMessage,
  buildWhatsappUrl,
  type ContactEnquiry,
  type EnquiryTopic,
} from "@/lib/whatsapp";

/**
 * Contact form that hands off to WhatsApp.
 *
 * Nothing is posted anywhere: the form composes a labelled brief, shows it back
 * to the visitor, and opens a wa.me chat prefilled with it on an explicit click.
 * That keeps lead capture honest on a site with no inbox — the message only
 * exists once the visitor sends it themselves.
 */

const TOPICS: ReadonlyArray<{
  value: EnquiryTopic;
  blurb: string;
  /** Quote-shaping fields only make sense for the commercial topics. */
  wantsSpec: boolean;
  /** Order and warranty enquiries need an order reference instead. */
  wantsOrderNumber: boolean;
}> = [
  {
    value: "New quote & free mockup",
    blurb: "A new sign — send your words, logo or sketch and get a free mockup.",
    wantsSpec: true,
    wantsOrderNumber: false,
  },
  {
    value: "Existing order",
    blurb: "Production updates, delivery, tracking or changing an order.",
    wantsSpec: false,
    wantsOrderNumber: true,
  },
  {
    value: "Warranty claim",
    blurb: "A fault within the 5-year warranty. Photos or a short video help.",
    wantsSpec: false,
    wantsOrderNumber: true,
  },
  {
    value: "Trade, bulk & reseller",
    blurb: "Multi-site rollouts, franchises, event builds and trade pricing.",
    wantsSpec: true,
    wantsOrderNumber: false,
  },
  {
    value: "Something else",
    blurb: "Press, partnerships, or anything that doesn't fit the boxes above.",
    wantsSpec: false,
    wantsOrderNumber: false,
  },
];

const SIGN_TYPES = [
  "LED neon sign (flexible silicone)",
  "3D metal channel letters (front-lit / halo / dual-lit)",
  "Ultra-thin edge-lit lightbox",
  "UV-print acrylic sign",
  "Not sure yet — advise me",
];

const SIZES = [
  "Small · up to 24 in",
  "Medium · up to 32 in",
  "Large · up to 42 in",
  "Extra large · 50 in and over",
  "Not sure yet",
];

const BUDGETS = [
  "Under $250",
  "$250 - $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500+",
];

const TIMELINES = [
  "ASAP (within 1 week)",
  "1 - 2 weeks",
  "2 - 4 weeks",
  "1+ month / just researching",
];

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Ireland",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "United Arab Emirates",
  "Saudi Arabia",
  "Pakistan",
  "India",
  "Other country",
];

const NOT_SPECIFIED = "Not specified";

const labelClass =
  "block text-xs font-extrabold uppercase tracking-widest text-[#1e1a22]";
const fieldClass =
  "mt-2 w-full rounded-xl border border-[#eadfe4] bg-white px-4 py-3 text-sm text-[#1e1a22] shadow-sm outline-none transition-colors placeholder:text-[#a8a2ae] focus:border-[#f40b68] focus:ring-2 focus:ring-[#f40b68]/20";

export function ContactForm() {
  const [topic, setTopic] = useState<EnquiryTopic>(TOPICS[0].value);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [signType, setSignType] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [usageLocation, setUsageLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [handedOff, setHandedOff] = useState(false);

  const activeTopic = TOPICS.find((t) => t.value === topic) ?? TOPICS[0];

  const enquiry: ContactEnquiry = useMemo(
    () => ({
      topic,
      fullName,
      email,
      phone,
      country,
      // Only carry the fields this topic actually asked for, so a visitor who
      // switches from a quote to a warranty claim can't send stale answers.
      signType: activeTopic.wantsSpec ? signType : undefined,
      size: activeTopic.wantsSpec ? size : undefined,
      quantity: activeTopic.wantsSpec ? quantity : undefined,
      usageLocation: activeTopic.wantsSpec ? usageLocation : undefined,
      budget: activeTopic.wantsSpec ? budget : undefined,
      timeline: activeTopic.wantsSpec ? timeline : undefined,
      orderNumber: activeTopic.wantsOrderNumber ? orderNumber : undefined,
      message,
    }),
    [
      topic,
      fullName,
      email,
      phone,
      country,
      activeTopic,
      signType,
      size,
      quantity,
      usageLocation,
      budget,
      timeline,
      orderNumber,
      message,
    ],
  );

  const preview = useMemo(() => buildContactMessage(enquiry), [enquiry]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!HAS_WHATSAPP) return;

    const url = buildWhatsappUrl(preview, WHATSAPP_NUMBER);
    if (!url) return;

    // Archived to Sanity before the handoff, for the same reason the pixel fires
    // first: window.open can navigate this tab away. `keepalive` on the request
    // lets it complete anyway. Fire-and-forget — a failed archive must never
    // stop someone reaching us.
    archiveLead({
      source: "contact-form",
      name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country,
      topic,
      message: message.trim(),
      signType: activeTopic.wantsSpec ? signType : undefined,
      size: activeTopic.wantsSpec ? size : undefined,
      quantity: activeTopic.wantsSpec ? quantity : undefined,
      usageLocation: activeTopic.wantsSpec ? usageLocation : undefined,
      budget: activeTopic.wantsSpec ? budget : undefined,
      timeline: activeTopic.wantsSpec ? timeline : undefined,
      orderNumber: activeTopic.wantsOrderNumber ? orderNumber : undefined,
      pagePath: "/contact",
      consent,
    });

    // Fired before the handoff: window.open can navigate this tab away on
    // mobile and kill a pending pixel request, and the document-level outbound
    // listener never sees this because it isn't a click on an anchor.
    if (activeTopic.wantsSpec) {
      trackQuoteSubmitted({
        productName: signType || "Custom sign enquiry",
        signType: signType || NOT_SPECIFIED,
        colour: NOT_SPECIFIED,
        size: size || NOT_SPECIFIED,
        usageLocation: usageLocation || NOT_SPECIFIED,
        deliveryCountry: country || NOT_SPECIFIED,
        budget: budget || NOT_SPECIFIED,
        timeline: timeline || NOT_SPECIFIED,
        hasReferenceFile: false,
      });
    } else {
      // A warranty claim or order chase is support contact, not a new lead.
      // Reporting it as a Lead would poison the metric campaigns optimise on.
      trackWhatsappContact("contact-page-form", "/contact");
    }

    setHandedOff(true);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (!HAS_WHATSAPP) {
    return (
      <div
        id="contact-form"
        className="scroll-mt-24 rounded-3xl border border-[#eadfe4] bg-[#fff7fa] p-6 sm:p-8"
      >
        <h2 className="text-2xl font-extrabold text-[#1e1a22]">
          The enquiry form is temporarily unavailable
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#5e5862]">
          Our WhatsApp line isn&apos;t configured right now, so we&apos;ve
          disabled the form rather than send your message into a dead link. Etsy
          shop messages still reach us — use the Etsy link on this page and
          we&apos;ll pick it up there.
        </p>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="scroll-mt-24 rounded-3xl border border-[#eadfe4] bg-white p-6 shadow-[0_18px_50px_-30px_rgba(30,26,34,0.5)] sm:p-8"
    >
      <div className="border-b border-[#f2e7ec] pb-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1e1a22] sm:text-3xl">
          Send us the details
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#5e5862]">
          Fill this in once and it becomes a tidy WhatsApp message you can read
          before you send it. Nothing leaves this page until you tap the button.
        </p>
      </div>

      {/* Enquiry topic */}
      <fieldset className="mt-6">
        <legend className={labelClass}>What&apos;s this about?</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {TOPICS.map((option) => {
            const selected = option.value === topic;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition-colors ${
                  selected
                    ? "border-[#f40b68] bg-[#fff0f5]"
                    : "border-[#eadfe4] bg-white hover:border-[#f6b7ce]"
                }`}
              >
                <input
                  type="radio"
                  name="topic"
                  value={option.value}
                  checked={selected}
                  onChange={() => setTopic(option.value)}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#f40b68]"
                />
                <span>
                  <span className="block text-sm font-bold text-[#1e1a22]">
                    {option.value}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-[#5e5862]">
                    {option.blurb}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Your details */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelClass}>Full name *</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
          <span className={labelClass}>Phone or WhatsApp</span>
          <input
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 555 000 0000"
            className={fieldClass}
          />
        </label>

        <label className="block">
          <span className={labelClass}>Delivery country</span>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={fieldClass}
          >
            <option value="">Choose a country</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Sign specification — quote and trade enquiries only */}
      {activeTopic.wantsSpec && (
        <div className="mt-8 rounded-2xl border border-[#eadfe4] bg-[#fffafc] p-5 sm:p-6">
          <h3 className="text-base font-extrabold text-[#1e1a22]">
            Help us quote accurately
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[#5e5862]">
            Every sign is priced individually. The more of this you fill in, the
            closer the first number we send will be. Skip anything you&apos;re
            unsure about.
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className={labelClass}>Sign type</span>
              <select
                value={signType}
                onChange={(e) => setSignType(e.target.value)}
                className={fieldClass}
              >
                <option value="">Choose a sign type</option>
                {SIGN_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Approximate size</span>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className={fieldClass}
              >
                <option value="">Choose a size</option>
                {SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>How many signs?</span>
              <input
                type="text"
                inputMode="numeric"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 1, or 12 for a rollout"
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Where will it go?</span>
              <select
                value={usageLocation}
                onChange={(e) => setUsageLocation(e.target.value)}
                className={fieldClass}
              >
                <option value="">Choose a location</option>
                <option value="Indoor — walls, receptions, rooms">
                  Indoor — walls, receptions, rooms
                </option>
                <option value="Outdoor — storefronts, façades, exteriors">
                  Outdoor — storefronts, façades, exteriors
                </option>
                <option value="Both indoor and outdoor">
                  Both indoor and outdoor
                </option>
              </select>
            </label>

            <label className="block">
              <span className={labelClass}>Working budget (USD)</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={fieldClass}
              >
                <option value="">Choose a range</option>
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </label>

            <label className="block sm:col-span-2">
              <span className={labelClass}>When do you need it?</span>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className={fieldClass}
              >
                <option value="">Choose a timeline</option>
                {TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      )}

      {/* Order reference — order and warranty enquiries only */}
      {activeTopic.wantsOrderNumber && (
        <label className="mt-8 block">
          <span className={labelClass}>Etsy order number</span>
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. 3512345678"
            className={fieldClass}
          />
          <span className="mt-2 block text-xs leading-relaxed text-[#5e5862]">
            It&apos;s on your Etsy confirmation email and in your Etsy account.
            Don&apos;t have it to hand? Leave it blank and describe the order.
          </span>
        </label>
      )}

      {/* Message */}
      <label className="mt-8 block">
        <span className={labelClass}>
          {activeTopic.wantsSpec ? "Your idea *" : "How can we help? *"}
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            activeTopic.wantsSpec
              ? "Example: our logo in warm white above the reception desk, roughly 90 cm wide, mounted on dark wood…"
              : "Tell us what's happened and what you'd like us to do."
          }
          className={`${fieldClass} resize-y`}
        />
      </label>

      <p className="mt-3 rounded-xl bg-[#fff0f5] px-4 py-3 text-xs leading-relaxed text-[#5e5862]">
        <strong className="font-bold text-[#1e1a22]">Got artwork?</strong> A
        browser can&apos;t attach files to a WhatsApp message for you — send your
        logo, sketch or fault photos straight into the chat once it opens. Any
        format works, even a phone photo of a napkin.
      </p>

      {/* Preview — the visitor reads exactly what they're about to send */}
      <details className="mt-6 rounded-2xl border border-[#eadfe4] bg-[#fbf8f9] p-4 sm:p-5">
        <summary className="cursor-pointer text-sm font-bold text-[#1e1a22]">
          Preview the message you&apos;ll send
        </summary>
        <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-[#5e5862]">
          {preview}
        </pre>
      </details>

      {/* Consent */}
      <label className="mt-6 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#5e5862]">
        <input
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#f40b68]"
        />
        <span>
          I&apos;m happy for The Glownique to use these details to answer my
          enquiry and follow up about it. See our{" "}
          <a
            href="/privacy"
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
        className="button button--whatsapp mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-base font-bold disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span>Open this message in WhatsApp</span>
        <WhatsappIcon className="h-5 w-5 shrink-0" />
      </button>

      <p
        className="mt-4 text-center text-xs text-[#5e5862]"
        role="status"
        aria-live="polite"
      >
        {handedOff
          ? "Your message is waiting in WhatsApp — tap send there to reach us."
          : "Opens WhatsApp with everything above filled in, and saves a copy so we can reply either way."}
      </p>

      <p className="mt-4 text-center text-xs text-[#6b6570]">
        Never send card details, bank details or identity documents over chat. We
        will never ask for them — payment is taken through Etsy&apos;s encrypted
        checkout.
      </p>
    </form>
  );
}
