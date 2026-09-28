import type { Metadata } from "next";
import Link from "next/link";
import { StorefrontShell } from "@/components/storefront/storefront-shell";
import { SiteHeader } from "@/components/storefront/sections/site-header";
import { SiteFooter } from "@/components/storefront/sections/site-footer";

export const metadata: Metadata = {
  title: "Custom Sign Projects & Case Studies | The Glownique",
  description: "Browse our gallery of custom LED neon signs, 3D channel letters, and lightboxes created for businesses, events, and homes.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <StorefrontShell>
      <SiteHeader />
      <main id="main-content" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#1e1a22] sm:text-5xl">
              Our Projects
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[#5e5862]">
              Explore some of our favorite custom signs we've crafted for brands and events worldwide.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* [PLACEHOLDER] Owner: Add 3-5 real projects with photos and permissions here */}
            
            <div className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6 text-center shadow-sm">
              <div className="flex h-48 w-full items-center justify-center rounded-xl bg-[#eadfe4] text-sm text-[#5e5862]">
                [Project Image Placeholder 1]
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1e1a22]">[Project Name]</h2>
              <p className="mt-2 text-sm text-[#5e5862]">[Brief description of the sign type, dimensions, and business]</p>
            </div>

            <div className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6 text-center shadow-sm">
              <div className="flex h-48 w-full items-center justify-center rounded-xl bg-[#eadfe4] text-sm text-[#5e5862]">
                [Project Image Placeholder 2]
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1e1a22]">[Project Name]</h2>
              <p className="mt-2 text-sm text-[#5e5862]">[Brief description of the sign type, dimensions, and business]</p>
            </div>

            <div className="rounded-2xl border border-[#eadfe4] bg-[#fdfafb] p-6 text-center shadow-sm">
              <div className="flex h-48 w-full items-center justify-center rounded-xl bg-[#eadfe4] text-sm text-[#5e5862]">
                [Project Image Placeholder 3]
              </div>
              <h2 className="mt-4 text-xl font-bold text-[#1e1a22]">[Project Name]</h2>
              <p className="mt-2 text-sm text-[#5e5862]">[Brief description of the sign type, dimensions, and business]</p>
            </div>

          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#ce0754] px-8 py-4 text-sm font-bold text-white hover:bg-[#b00647]"
            >
              Get a Free Quote & Mockup
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </StorefrontShell>
  );
}
