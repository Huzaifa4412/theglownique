import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { TestimonialCarousel } from "@/components/storefront/testimonial-carousel";

export function ReviewsSection() {
  return (
    <section
      className="reviews shell"
      aria-labelledby="review-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">Real rooms. Real reactions.</p>
          <h2 id="review-heading">
            What customers <PremiumAccentText>say</PremiumAccentText>
          </h2>
        </div>
        <div
          className="rating-summary"
          aria-label="Rated 4.9 out of 5"
        >
          <span>★★★★★</span>
          <strong>4.9 / 5</strong>
        </div>
      </div>
      <TestimonialCarousel />
    </section>
  );
}
