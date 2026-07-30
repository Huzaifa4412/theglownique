"use client";

import { EnvelopeSimple } from "@phosphor-icons/react";
import { useState, type FormEvent } from "react";

import { IconBox } from "@/components/icon-box";

export function NewsletterSection() {
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    setMessage(`Your welcome code is on its way to ${email}.`);
    event.currentTarget.reset();
  };

  return (
    <section className="newsletter shell">
      <div className="newsletter__icon">
        <IconBox icon={EnvelopeSimple} />
      </div>
      <div>
        <h2>Get 10% off your first order</h2>
        <p>
          Sign up for product drops, colour inspiration and subscriber-only
          offers.
        </p>
      </div>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button className="button button--primary" type="submit">
          Get my code
        </button>
      </form>
      <p className="newsletter-message" aria-live="polite">
        {message}
      </p>
    </section>
  );
}
