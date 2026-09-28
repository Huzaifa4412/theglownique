"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";

function PostHogPageViewContent(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (pathname && ph) {
      let url = window.origin + pathname;
      const search = searchParams?.toString();
      if (search) {
        url += `?${search}`;
      }
      ph.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams, ph]);

  return null;
}

function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewContent />
    </Suspense>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (!token) return;

    const isMobile = window.innerWidth < 768;

    posthog.init(token, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      capture_pageview: false, // Handled by PostHogPageView to support SPA route changes
      capture_pageleave: true,
      autocapture: !isMobile, // Defer autocapture (dead-clicks etc) on mobile
      disable_session_recording: isMobile, // Defer session recording on mobile
      capture_exceptions: true,
      capture_performance: true,
      person_profiles: "identified_only",
      session_recording: {
        maskAllInputs: false,
        maskInputOptions: {
          password: true,
        },
      },
    });

    // If mobile, we can defer starting these heavy features until the user interacts
    if (isMobile) {
      const startHeavyFeatures = () => {
        posthog.startSessionRecording();
        // PostHog doesn't have a public startAutocapture, but session recording is the main weight.
        window.removeEventListener("scroll", startHeavyFeatures);
        window.removeEventListener("touchstart", startHeavyFeatures);
        window.removeEventListener("click", startHeavyFeatures);
      };
      
      window.addEventListener("scroll", startHeavyFeatures, { once: true, passive: true });
      window.addEventListener("touchstart", startHeavyFeatures, { once: true, passive: true });
      window.addEventListener("click", startHeavyFeatures, { once: true, passive: true });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
