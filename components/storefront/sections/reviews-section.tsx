import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { TestimonialCarousel } from "@/components/storefront/testimonial-carousel";
import { HAS_VERIFIED_REVIEWS } from "@/lib/site";
import { testimonials } from "@/lib/store-data";

export function ReviewsSection() {
  // Renders only once real, attributable reviews exist. See HAS_VERIFIED_REVIEWS
  // in lib/site.ts — the previous version published an invented "4.9 / 5"
  // aggregate and three fabricated named testimonials marked "Verified".
  if (!HAS_VERIFIED_REVIEWS || testimonials.length === 0) return null;

  return (
    <section className="reviews shell" aria-labelledby="review-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Real rooms. Real reactions.</p>
          <h2 id="review-heading">
            What customers <PremiumAccentText>say</PremiumAccentText>
          </h2>
        </div>
      </div>
      <TestimonialCarousel />
    </section>
  );
}
