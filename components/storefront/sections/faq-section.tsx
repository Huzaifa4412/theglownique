import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { serializeJsonLd } from "@/lib/utils";

const faqs = [
  {
    q: "What types of custom business signs and neon signs does The Glownique make?",
    a: "We handcraft four distinct custom signage types: flexible silicone LED neon signs, 3D metal channel-letter signs (available frontlit, halo backlit or dual-lit), ultra-thin edge-lit lightboxes for retail, and 3D acrylic signs pairing high-definition UV print with glowing LED neon contours.",
  },
  {
    q: "How long do custom LED neon signs last compared to traditional glass neon?",
    a: "Our commercial-grade LED neon is rated for up to 100,000 hours of continuous glow — over 11 years even if illuminated 24/7. They consume up to 80% less energy than traditional glass neon, generate zero buzz, and remain completely cool to the touch.",
  },
  {
    q: "Are custom LED neon signs safe and shatterproof?",
    a: "Yes. Our signs operate on low 12V DC power, stay cool to the touch, and use flexible, shatterproof silicone tubing rather than fragile glass or hazardous gases. They are safe for bedrooms, homes, weddings, bars, restaurants and busy commercial storefronts.",
  },
  {
    q: "Can I receive a free design preview and mockup before ordering?",
    a: "Always. Simply share your words, business logo, brand colours or a rough sketch. Our design team will prepare a free, colour-matched digital mockup showing exact sizing, lighting and font style before production begins — with zero obligation.",
  },
  {
    q: "Can you match exact corporate brand colours, logos and fonts?",
    a: "Yes. We accurately match any Pantone, HEX or CMYK colour code. We can UV-print complex vector logos, detailed gradients and custom typography directly onto premium acrylic or fabricate custom 3D metal letters to your exact brand guidelines.",
  },
  {
    q: "Can your custom signs be used outdoors for storefronts and commercial façades?",
    a: "Yes. We build IP67 weatherproof signs engineered specifically for exterior storefronts, building façades and outdoor commercial installations. Interior signs are optimised for office receptions, studios, gyms and home decor.",
  },
  {
    q: "How long does custom sign fabrication and delivery take?",
    a: "Custom signs are handcrafted in approximately 10–15 days and shipped with tracked international delivery. If you have an upcoming event, wedding or grand opening deadline, let us know and we will do our best to accommodate your schedule.",
  },
  {
    q: "How much does a custom neon sign or business sign cost?",
    a: "Popular ready-to-order designs have transparent fixed prices in our verified Etsy shop. For bespoke signs, pricing depends on the sign type, dimensions, lighting style, materials and design complexity. Contact us for a free, itemised project quote.",
  },
  {
    q: "Can I install my sign myself or do I need an electrician?",
    a: "Most interior neon signs and lightboxes are plug-and-play and take about 15 minutes to hang. We include pre-drilled mounting holes, stainless steel standoff spacers, wall anchors, and hanging wire. Simply mount the standoffs and plug the 12V power adapter into any standard wall outlet. For large exterior commercial channel letters that require hardwiring, we supply full mounting templates and wiring schematics so your local electrician can wire them cleanly in minutes.",
  },
  {
    q: "Does my sign come with a dimmer remote and power adapter?",
    a: "Yes. Every sign arrives complete with a regional 12V power supply (US, UK, EU, or AU plug) and a wireless remote dimmer. You can easily adjust the brightness from a soft ambient mood to maximum punch, toggle dynamic pulse/flash modes, and power it on/off with one touch.",
  },
  {
    q: "Is my sign backed by a warranty and quality guarantee?",
    a: "Yes. Every sign undergoes rigorous multi-point electrical and luminance quality checks with a 24-hour continuous burn-in test before packaging. All signs are backed by our 5-year warranty and 100% glow guarantee.",
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
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqJsonLd) }}
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
            className="button button--whatsapp"
            label="Ask us for a custom quote"
          />
        </div>
      </div>
    </section>
  );
}
