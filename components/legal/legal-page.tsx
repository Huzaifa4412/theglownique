import type { ReactNode } from "react";

import { AnnouncementBar } from "@/components/storefront/sections/announcement-bar";
import { SiteFooter } from "@/components/storefront/sections/site-footer";
import { ProductTopBar } from "@/components/product/product-top-bar";
import { formattedLastUpdated } from "@/lib/legal";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  /** Policy pages show a last-updated date; informational ones (Contact) don't. */
  showLastUpdated?: boolean;
};

/**
 * Shared shell for the policy and information pages so they stay consistent
 * with the storefront chrome and with each other.
 */
export function LegalPage({
  eyebrow,
  title,
  intro,
  children,
  showLastUpdated = true,
}: LegalPageProps) {
  return (
    <>
      <AnnouncementBar />
      <ProductTopBar productName="custom sign" />
      <main id="main-content" className="bg-white">
        <section className="border-b border-[#eadfe4] bg-gradient-to-b from-[#fff0f5] to-white py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#ce0754]">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5e5862]">{intro}</p>
            {showLastUpdated && (
              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#6b6570]">
                Last updated {formattedLastUpdated()}
              </p>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="legal-prose mx-auto max-w-3xl px-4 sm:px-6">{children}</div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
