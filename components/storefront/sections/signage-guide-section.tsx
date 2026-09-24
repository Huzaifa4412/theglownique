import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Sparkles, HelpCircle } from "lucide-react";
import { CustomQuoteButton } from "@/components/storefront/custom-quote-button";
import { PremiumAccentText } from "@/components/ui/premium-accent-text";

export function SignageGuideSection() {
  return (
    <section
      className="signage-guide-section border-t border-[#eadfe4] bg-white py-20 sm:py-28"
      id="signage-guide"
      aria-labelledby="signage-guide-heading"
    >
      <div className="shell max-w-6xl mx-auto px-4 sm:px-6">
        <header className="text-center max-w-3xl mx-auto mb-16">
          <p className="eyebrow">Expert Signmaking Guidance</p>
          <h2
            id="signage-guide-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#1e1a22] leading-tight mt-2"
          >
            How to choose the <PremiumAccentText>right sign</PremiumAccentText> for your space
          </h2>
          <p className="text-sm sm:text-base text-[#5e5862] leading-relaxed mt-4">
            Not sure whether flexible LED neon, 3D metal channel lettering, or an ultra-thin lightbox fits your wall? Here is an honest, artisan breakdown of how each sign type performs in the real world.
          </p>
        </header>

        {/* 4 Sign Types Grid Comparison */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* Sign Type 1 */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#eadfe4] bg-[#fffafd] p-6 shadow-sm transition-all hover:shadow-md hover:border-[#f8c6da]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#ce0754] bg-[#ffeef4] px-2.5 py-1 rounded-full">
                  Type 01
                </span>
                <span className="text-xs font-bold text-[#71636c]">Most Versatile</span>
              </div>
              <h3 className="text-xl font-black text-[#1e1a22] tracking-tight">
                Flexible LED Neon
              </h3>
              <p className="text-xs font-semibold text-[#8a7a85] mt-0.5 mb-3">
                Flexible Silicone on Cast Acrylic
              </p>
              <p className="text-xs sm:text-sm text-[#5e5862] leading-relaxed mb-4">
                The modern evolution of vintage glass neon, with no glass tubes. Made with flexible silicone LED neon on a low-voltage 12V supply.
              </p>
              <ul className="space-y-2 text-xs font-medium text-[#4a424d] mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ce0754] mt-0.5" />
                  <span><strong>Best for:</strong> Feature quotes, logos, weddings &amp; photo backdrops</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ce0754] mt-0.5" />
                  <span><strong>Power:</strong> 12V low-voltage, cool-to-touch, zero buzzing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ce0754] mt-0.5" />
                  <span><strong>Mounting:</strong> Standoff screws or suspended hanging wire</span>
                </li>
              </ul>
            </div>
            <Link
              href="/products/custom-neon-signs"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#ce0754] pt-4 border-t border-[#eadfe4] hover:text-[#9d0540]"
            >
              <span>Explore Custom Neon</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Sign Type 2 */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#eadfe4] bg-[#fffafd] p-6 shadow-sm transition-all hover:shadow-md hover:border-[#ffd699]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#b45309] bg-[#fef3c7] px-2.5 py-1 rounded-full">
                  Type 02
                </span>
                <span className="text-xs font-bold text-[#71636c]">Commercial Grade</span>
              </div>
              <h3 className="text-xl font-black text-[#1e1a22] tracking-tight">
                3D Metal Channel Letters
              </h3>
              <p className="text-xs font-semibold text-[#8a7a85] mt-0.5 mb-3">
                Frontlit, Halo Backlit &amp; Dual-Lit
              </p>
              <p className="text-xs sm:text-sm text-[#5e5862] leading-relaxed mb-4">
                Architectural signage built from precision-fabricated 304 stainless steel. Available in front-lit, halo-lit or dual-lit styles, built for exterior façades or interior walls.
              </p>
              <ul className="space-y-2 text-xs font-medium text-[#4a424d] mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                  <span><strong>Best for:</strong> Building storefronts, exterior façades &amp; executive lobbies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                  <span><strong>Finishes:</strong> Brushed gold, matte black, titanium &amp; polished chrome</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#b45309] mt-0.5" />
                  <span><strong>Use:</strong> Exterior façades or interior walls</span>
                </li>
              </ul>
            </div>
            <Link
              href="/business-signs/channel-letter-signs"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#b45309] pt-4 border-t border-[#eadfe4] hover:text-[#78350f]"
            >
              <span>Explore 3D Channel Letters</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Sign Type 3 */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#eadfe4] bg-[#fffafd] p-6 shadow-sm transition-all hover:shadow-md hover:border-[#bfdbfe]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#0369a1] bg-[#e0f2fe] px-2.5 py-1 rounded-full">
                  Type 03
                </span>
                <span className="text-xs font-bold text-[#71636c]">Retail Display</span>
              </div>
              <h3 className="text-xl font-black text-[#1e1a22] tracking-tight">
                Ultra-Thin Lightbox
              </h3>
              <p className="text-xs font-semibold text-[#8a7a85] mt-0.5 mb-3">
                Edge-Lit Slim Aluminium Profile
              </p>
              <p className="text-xs sm:text-sm text-[#5e5862] leading-relaxed mb-4">
                Less than one inch thick with edge-lit matrix LED panels delivering 100% uniform, shadow-free illumination. Front snap-frame allows poster swaps in seconds.
              </p>
              <ul className="space-y-2 text-xs font-medium text-[#4a424d] mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0369a1] mt-0.5" />
                  <span><strong>Best for:</strong> Boutiques, retail window displays, menu boards &amp; promos</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0369a1] mt-0.5" />
                  <span><strong>Profile:</strong> Ultra-slim &lt;1 inch anodized aluminium body</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0369a1] mt-0.5" />
                  <span><strong>Convenience:</strong> Tool-free graphic changes without dismounting</span>
                </li>
              </ul>
            </div>
            <Link
              href="/business-signs/lightbox-signs"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#0369a1] pt-4 border-t border-[#eadfe4] hover:text-[#0c4a6e]"
            >
              <span>Explore Slim Lightboxes</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Sign Type 4 */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#eadfe4] bg-[#fffafd] p-6 shadow-sm transition-all hover:shadow-md hover:border-[#ddd6fe]">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-[#6d28d9] bg-[#ede9fe] px-2.5 py-1 rounded-full">
                  Type 04
                </span>
                <span className="text-xs font-bold text-[#71636c]">Brand Art</span>
              </div>
              <h3 className="text-xl font-black text-[#1e1a22] tracking-tight">
                3D Acrylic UV Print Neon
              </h3>
              <p className="text-xs font-semibold text-[#8a7a85] mt-0.5 mb-3">
                High-Def Graphic + Neon Contour
              </p>
              <p className="text-xs sm:text-sm text-[#5e5862] leading-relaxed mb-4">
                Combines high-definition UV printing directly on acrylic backboards with glowing contour neon. Perfect for intricate corporate emblems with fine lines and gradients.
              </p>
              <ul className="space-y-2 text-xs font-medium text-[#4a424d] mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6d28d9] mt-0.5" />
                  <span><strong>Best for:</strong> Intricate multi-color logos, badges &amp; illustrated mascots</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6d28d9] mt-0.5" />
                  <span><strong>Color Accuracy:</strong> Exact Pantone / HEX / CMYK code matching</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6d28d9] mt-0.5" />
                  <span><strong>Depth:</strong> Layered visual effect with glowing raised neon accents</span>
                </li>
              </ul>
            </div>
            <Link
              href="/business-signs/acrylic-logo-signs"
              className="inline-flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#6d28d9] pt-4 border-t border-[#eadfe4] hover:text-[#4c1d95]"
            >
              <span>Explore UV Acrylic Signs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Practical Buyer Decision Resources */}
        <div className="rounded-3xl border border-[#eadfe4] bg-gradient-to-br from-[#fff7fa] via-white to-[#fdf2f8] p-8 sm:p-10 shadow-sm">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] items-center">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
                <HelpCircle className="h-4 w-4" />
                <span>Buyer Decision Guides</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1e1a22] tracking-tight">
                Read our in-depth guides before spending a dollar.
              </h3>
              <p className="text-sm text-[#5e5862] leading-relaxed">
                We believe in transparent pricing and zero surprises. Check out our detailed fabrication guides and cost breakdowns to see how sign size, lighting types, and wall surfaces impact your project budget.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/guides/custom-business-sign-cost"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1e1a22] underline underline-offset-4 decoration-[#f40b68] hover:text-[#ce0754]"
                >
                  <span>Custom Business Sign Cost Breakdown</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/guides/front-lit-vs-halo-lit-vs-dual-lit"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1e1a22] underline underline-offset-4 decoration-[#f40b68] hover:text-[#ce0754]"
                >
                  <span>Front-Lit vs Halo-Lit vs Dual-Lit Explained</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/guides/backlit-sign-wall-surfaces-and-standoffs"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#1e1a22] underline underline-offset-4 decoration-[#f40b68] hover:text-[#ce0754]"
                >
                  <span>Wall Surfaces &amp; Standoff Mounting Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-center justify-center gap-4 bg-white rounded-2xl border border-[#eadfe4] p-6 text-center">
              <div className="space-y-1">
                <p className="text-base font-extrabold text-[#1e1a22]">
                  Need expert recommendation?
                </p>
                <p className="text-xs text-[#5e5862]">
                  Send your logo or space photo for a free 1-on-1 recommendation in ~2 hours.
                </p>
              </div>
              <CustomQuoteButton
                className="button button--primary w-full text-xs uppercase tracking-wider py-3"
                label="Get Free 1-on-1 Proof"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
