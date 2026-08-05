import { PremiumAccentText } from "@/components/ui/premium-accent-text";
import { TestimonialCarousel } from "@/components/storefront/testimonial-carousel";
import { ETSY_SHOP_URL, HAS_VERIFIED_REVIEWS } from "@/lib/site";
import { testimonials } from "@/lib/store-data";

export function ReviewsSection() {
  // Renders only while HAS_VERIFIED_REVIEWS is true and real reviews exist.
  // See the note above `testimonials` in lib/store-data.ts: these are shown as
  // visible social proof only, with NO Review/AggregateRating markup, because
  // Google prohibits self-controlled organization reviews and aggregating
  // ratings from other websites.
  if (!HAS_VERIFIED_REVIEWS || testimonials.length === 0) return null;

  return (
    <section className="reviews shell" aria-labelledby="review-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Real rooms. Real reactions.</p>
          <h2 id="review-heading">
            What customers <PremiumAccentText>say</PremiumAccentText>
          </h2>
          <p className="reviews__source">
            Every review below is a verified purchase, left by a buyer on our Etsy shop.
            {ETSY_SHOP_URL ? (
              <>
                {" "}
                <a href={ETSY_SHOP_URL} rel="noopener" target="_blank">
                  Read them all on Etsy
                </a>
                .
              </>
            ) : null}
          </p>
        </div>
      </div>
      <TestimonialCarousel />
    </section>
  );
}
