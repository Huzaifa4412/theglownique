"use client";

import type { RefObject } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/storefront/gsap";
import { getLenis } from "@/components/storefront/smooth-scroll";

/**
 * Scroll choreography for the studio homepage.
 *
 * Everything here is a flourish on top of a page that already works: the
 * markup renders complete and visible on the server, the sign-type rail is a
 * native horizontal scroller until this hook upgrades it, and the whole file
 * only loads after the visitor's first interaction (see
 * studio-motion-loader.tsx). Selectors are data attributes rather than CSS
 * module classes so the hook never depends on hashed class names.
 */
export function useStudioMotion(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    (_context, contextSafe) => {
      const root =
        scopeRef.current ??
        document.querySelector<HTMLElement>("[data-studio-home]");
      if (!root) return;
      scopeRef.current = root;

      const one = <T extends Element>(
        selector: string,
        base: ParentNode = root,
      ) => base.querySelector<T>(selector);
      const all = <T extends Element>(
        selector: string,
        base: ParentNode = root,
      ) => Array.from(base.querySelectorAll<T>(selector));

      const media = gsap.matchMedia();
      media.add(
        {
          desktop: "(min-width: 1000px)",
          mobile: "(max-width: 999px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            // Anything a previous context may have transformed goes back to
            // its resting, fully visible state.
            const settled = all<HTMLElement>(
              "[data-reveal] > *, [data-parallax], [data-words] span, [data-rail-track]",
            );
            if (settled.length > 0) {
              gsap.set(settled, { clearProps: "all" });
            }
            all<HTMLElement>("[data-step]").forEach((step) => {
              step.dataset.stepActive = "true";
            });
            const lab = one<HTMLElement>("[data-glow-lab]");
            if (lab) lab.dataset.lit = "true";
            return;
          }

          // ── Reading progress ────────────────────────────────────────────
          const progressBar = document.querySelector<HTMLElement>(
            ".scroll-progress__bar",
          );
          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { start: 0, end: "max", scrub: 0.15 },
              },
            );
          }

          // ── Hero gallery parallax ───────────────────────────────────────
          const hero = one<HTMLElement>("[data-hero]");
          if (hero) {
            all<HTMLElement>("[data-parallax]", hero).forEach((element) => {
              const depth = Number(element.dataset.parallax || "0");
              if (!depth) return;
              gsap.fromTo(
                element,
                { y: 0 },
                {
                  y: () =>
                    depth * (context.conditions?.desktop ? -46 : -18),
                  ease: "none",
                  scrollTrigger: {
                    trigger: hero,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.7,
                  },
                },
              );
            });
          }

          // ── Section reveals ─────────────────────────────────────────────
          all<HTMLElement>("[data-reveal]").forEach((section) => {
            const children = Array.from(section.children);
            if (children.length === 0) return;
            ScrollTrigger.create({
              trigger: section,
              start: "top 86%",
              once: true,
              onEnter: () => {
                gsap.from(children, {
                  autoAlpha: 0,
                  y: 30,
                  duration: 0.7,
                  stagger: 0.07,
                  ease: "power3.out",
                  clearProps: "all",
                });
              },
            });
          });

          // ── The answer paragraph: words surface as you read ─────────────
          const answer = one<HTMLElement>("[data-words]");
          if (answer) {
            const words = all<HTMLElement>("span", answer);
            if (words.length > 0) {
              gsap.fromTo(
                words,
                { autoAlpha: 0.16 },
                {
                  autoAlpha: 1,
                  ease: "none",
                  stagger: 0.6,
                  scrollTrigger: {
                    trigger: answer,
                    start: "top 84%",
                    end: "top 34%",
                    scrub: 0.4,
                  },
                },
              );
            }
          }

          // ── Sign-type rail: pinned horizontal scroll on desktop ─────────
          const railSection = one<HTMLElement>("[data-rail]");
          const railViewport = one<HTMLElement>("[data-rail-viewport]");
          const railTrack = one<HTMLElement>("[data-rail-track]");
          const railProgress = one<HTMLElement>("[data-rail-progress]");

          if (
            railSection &&
            railViewport &&
            railTrack &&
            context.conditions?.desktop &&
            // The pinned section (heading + cards) has to fit under the
            // sticky header; on short laptop screens the native scroller is
            // the better experience.
            window.innerHeight >= 720
          ) {
            const distance = () =>
              Math.max(0, railTrack.scrollWidth - railViewport.clientWidth);

            if (distance() > 0) {
              // Native scrolling hands over to the pin.
              railViewport.scrollLeft = 0;
              gsap.set(railViewport, { overflowX: "visible" });

              const railTimeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: railSection,
                  start: "top 88px",
                  end: () => `+=${distance()}`,
                  pin: true,
                  scrub: 0.6,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                },
              });

              railTimeline.to(railTrack, { x: () => -distance() }, 0);
              if (railProgress) {
                railTimeline.fromTo(
                  railProgress,
                  { scaleX: 0 },
                  { scaleX: 1 },
                  0,
                );
              }
            }
          }

          // ── Spaces photo drift ──────────────────────────────────────────
          const spacesPhoto = one<HTMLElement>("[data-drift]");
          if (spacesPhoto) {
            const drifted = one<HTMLElement>("img", spacesPhoto);
            if (drifted) {
              gsap.fromTo(
                drifted,
                { yPercent: -6, scale: 1.12 },
                {
                  yPercent: 6,
                  scale: 1.12,
                  ease: "none",
                  scrollTrigger: {
                    trigger: spacesPhoto,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
            }
          }

          // ── Process steps light up as the line draws past them ──────────
          const processLine = one<HTMLElement>("[data-process-line]");
          if (processLine) {
            gsap.fromTo(
              processLine,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: "none",
                transformOrigin: "top center",
                scrollTrigger: {
                  trigger: processLine.parentElement ?? processLine,
                  start: "top 74%",
                  end: "bottom 46%",
                  scrub: 0.5,
                },
              },
            );
          }
          all<HTMLElement>("[data-step]").forEach((step) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 66%",
              onEnter: () => {
                step.dataset.stepActive = "true";
              },
              onLeaveBack: () => {
                step.dataset.stepActive = "false";
              },
            });
          });

          // ── The colour moment flickers on as it enters view ─────────────
          const glowLab = one<HTMLElement>("[data-glow-lab]");
          if (glowLab) {
            ScrollTrigger.create({
              trigger: glowLab,
              start: "top 72%",
              once: true,
              onEnter: () => {
                glowLab.dataset.lit = "true";
              },
            });
          }
        },
      );

      // ── Magnetic CTAs (fine pointers only, outside matchMedia so the
      //    listeners are managed once) ────────────────────────────────────
      const supportsFineHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      );
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const cleanups: Array<() => void> = [];

      // Keep ScrollTrigger frame-synced with Lenis when smooth scrolling is
      // active (see smooth-scroll.tsx). Lenis drives its own rAF; all the
      // triggers need is an update per smoothed scroll step.
      const lenis = getLenis();
      if (lenis) {
        const syncScrollTrigger = () => ScrollTrigger.update();
        lenis.on("scroll", syncScrollTrigger);
        cleanups.push(() => lenis.off("scroll", syncScrollTrigger));
      }

      all<HTMLElement>("[data-magnetic]").forEach((element) => {
        const xTo = gsap.quickTo(element, "x", {
          duration: 0.4,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(element, "y", {
          duration: 0.4,
          ease: "power3.out",
        });

        const onMove = contextSafe?.((event: PointerEvent) => {
          if (!supportsFineHover.matches || prefersReduced.matches) return;
          const bounds = element.getBoundingClientRect();
          const xRatio = (event.clientX - bounds.left) / bounds.width - 0.5;
          const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;
          xTo(xRatio * 12);
          yTo(yRatio * 9);
        });
        const onLeave = contextSafe?.(() => {
          xTo(0);
          yTo(0);
        });

        if (!onMove || !onLeave) return;
        element.addEventListener("pointermove", onMove);
        element.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          element.removeEventListener("pointermove", onMove);
          element.removeEventListener("pointerleave", onLeave);
        });
      });

      ScrollTrigger.refresh();
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        media.revert();
      };
    },
    { dependencies: [] },
  );
}
