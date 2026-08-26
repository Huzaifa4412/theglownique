"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { archiveLead } from "@/lib/leads";
import { trackNewsletterSignup } from "@/lib/meta-pixel";
import { capturePostHog } from "@/lib/posthog-client";

/**
 * Subscribe block for the blog.
 *
 * Deliberately NOT the homepage newsletter section. That one leads with "Get
 * 10% off your first order", which is a purchase incentive: right on a product
 * page, wrong at the end of an article about cleaning a sign, where the reader
 * has not asked to buy anything.
 *
 * The copy is also deliberately modest about what arrives. Sending is manual —
 * an address captured here becomes a `newsletter` lead in the Studio that
 * somebody emails by hand — so the form promises new articles and nothing else.
 * Do not add a frequency, a discount or a "welcome series" to this copy unless
 * something actually sends them; an unkept promise here is a claim defect in
 * exactly the sense lib/claims.ts is written to prevent.
 */
export function BlogNewsletter({
  heading = "New sign ideas, once a month",
  text = "One email when a new article goes up. Nothing else, and you can unsubscribe from any of them.",
}: {
  heading?: string | null;
  text?: string | null;
}) {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.includes("@")) return;

    archiveLead({
      source: "newsletter",
      email,
      topic: "Blog subscription",
      pagePath: pathname,
      consent: true,
    });
    trackNewsletterSignup();
    capturePostHog("blog_newsletter_signed_up", { page_path: pathname });
    setDone(true);
  };

  return (
    <section className="blog-subscribe" aria-labelledby="blog-subscribe-heading">
      <div>
        <h2 className="blog-subscribe__heading" id="blog-subscribe-heading">
          {heading}
        </h2>
        <p className="blog-subscribe__text">{text}</p>
      </div>

      {done ? (
        <p className="blog-subscribe__done" role="status">
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          Thanks — {email} is on the list. We&apos;ll email you when the next article goes up.
        </p>
      ) : (
        <form className="blog-subscribe__form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="blog-subscribe-email">
            Email address
          </label>
          <input
            id="blog-subscribe-email"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@yourbusiness.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="blog-subscribe__input"
          />
          <button type="submit" className="button button--primary shrink-0">
            <span>Subscribe</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </form>
      )}
    </section>
  );
}
