import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

const faqs = [
  {
    q: "What types of custom signs does The Glownique make?",
    a: "We handcraft four custom sign types: flexible LED neon signs, 3D metal channel-letter signs (frontlit, halo backlit or dual-lit), ultra-thin edge-lit lightboxes, and 3D acrylic signs that pair full-colour UV print with glowing LED neon contours.",
  },
  {
    q: "How long do LED neon signs last?",
    a: "Our LED neon is rated for up to 100,000 hours of glow — over 11 years even if left on 24/7 — while using up to 80% less power than traditional glass neon.",
  },
  {
    q: "Are LED neon signs safe, and do they get hot?",
    a: "Yes. Our signs run on low 12V power, stay cool to the touch, and use shatterproof silicone instead of fragile glass, so they're safe for bedrooms, kids' rooms, weddings and busy commercial spaces.",
  },
  {
    q: "Can I see a design preview before I order?",
    a: "Always. Send your words, logo or a rough sketch and we'll send a free, colour-matched digital mockup to approve before anything goes into production — with no obligation.",
  },
  {
    q: "Can you match my exact brand colours and logo?",
    a: "Yes. We colour-match to any Pantone, HEX or CMYK code, and can UV-print artwork, gradients and brand fonts onto premium acrylic, then trace them in LED neon for a precise brand match.",
  },
  {
    q: "Can the signs be used outdoors?",
    a: "Yes. Choose our IP67 weatherproof build for storefronts, façades and outdoor events; indoor signs are optimised for interior walls, receptions and rooms.",
  },
  {
    q: "How long does it take to make and deliver my sign?",
    a: "Most custom signs are handcrafted in around 10–15 days and then sent with tracked delivery. If you're working to a deadline, tell us and we'll do our best to prioritise it.",
  },
  {
    q: "Do you offer worldwide delivery, and how much is shipping?",
    a: "Yes — delivery is currently free worldwide on every order, with no minimum spend, to almost every country. Every sign is carefully packed and tracked to your door.",
  },
  {
    q: "How much does a custom neon sign cost?",
    a: "There are two routes. Ready-to-order designs are listed at fixed prices in our Etsy shop, so you can see exactly what they cost before you commit. Fully bespoke work is quoted individually, because the price depends on the sign type, size, colours and complexity of your design — share your idea and we'll send a no-obligation quote.",
  },
  {
    q: "Is my sign covered by a warranty?",
    a: "Yes. Every sign is quality-checked before dispatch and backed by a 5-year warranty and our 100% glow guarantee — so you can order with complete confidence.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function FaqSection() {
  return (
    <section
      className="faq-section relative bg-white py-20 sm:py-28 border-t border-[#eadfe4]"
      id="faq"
      aria-labelledby="faq-heading"
      data-reveal
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="shell max-w-3xl mx-auto px-4">
        <header className="text-center mb-12">
          <p className="eyebrow">Questions, answered</p>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1e1a22] leading-tight mt-2"
          >
            Neon sign <PremiumAccentText>FAQs</PremiumAccentText>
          </h2>
          <p className="text-sm sm:text-base text-[#5e5862] leading-relaxed max-w-xl mx-auto mt-3">
            Materials, colours, delivery, warranty and care — everything you
            need to know before you order a custom sign.
          </p>
        </header>

        <div className="space-y-3">
          {faqs.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-[#eadfe4] bg-white/90 shadow-[0_10px_30px_rgba(107,38,67,0.06)] transition-colors hover:border-[#f8c6da] open:border-[#f8c6da]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-bold text-[#1e1a22] sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <svg
                  className="h-5 w-5 shrink-0 text-[#f40b68] transition-transform duration-300 group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 7.5 10 12.5 15 7.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-sm leading-6 text-[#5e5862] sm:px-6 sm:pb-6">
                {item.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="mb-4 text-sm font-semibold text-[#5e5862]">
            Still have a question about your sign?
          </p>
          <CustomQuoteButton
            className="button button--primary"
            label="Ask us for a custom quote"
          />
        </div>
      </div>
    </section>
  );
}
