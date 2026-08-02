"use client";

import type { RefObject } from "react";

import {
  gsap,
  ScrollTrigger,
  useGSAP,
} from "@/components/storefront/gsap";

export function useStorefrontMotion(
  rootRef: RefObject<HTMLDivElement | null>,
  reducedMotion: boolean,
) {
  useGSAP(
    (_context, contextSafe) => {
      const root = rootRef.current;
      if (!root) return;

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
          desktop: "(min-width: 800px)",
          mobile: "(max-width: 799px)",
          timelineDesktop: "(min-width: 900px)",
          timelineMobile: "(max-width: 899px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduceMotion) {
            gsap.set(
              all<HTMLElement>(
                ".announcement__inner, .header__inner, .hero__copy > *, .hero-showcase, .hero-curve__line, .hero-curve__trail",
              ),
              { clearProps: "transform,opacity,visibility" },
            );
            return;
          }

          const heroIntroTimeline = gsap
            .timeline()
            .from(".announcement__inner", {
              autoAlpha: 0,
              y: -8,
              duration: 0.45,
            })
            .from(
              ".header__inner",
              { autoAlpha: 0, y: -12, duration: 0.55 },
              "-=0.2",
            )
            .from(
              ".hero__eyebrow",
              { autoAlpha: 0, x: -20, duration: 0.5 },
              "-=0.2",
            )
            .from(
              ".hero-title__line > span",
              {
                yPercent: 118,
                rotate: 2.5,
                duration: 0.82,
                stagger: 0.09,
                ease: "power4.out",
              },
              "-=0.3",
            )
            .from(
              ".hero__intro, .hero__actions",
              {
                autoAlpha: 0,
                y: 22,
                stagger: 0.09,
                duration: 0.58,
              },
              "-=0.44",
            )
            .from(
              ".trust-row > div",
              {
                autoAlpha: 0,
                y: 15,
                stagger: 0.055,
                duration: 0.45,
              },
              "-=0.28",
            )
            .from(
              ".hero-showcase",
              {
                autoAlpha: 0,
                x: context.conditions?.desktop ? 44 : 0,
                y: context.conditions?.mobile ? 24 : 0,
                duration: 0.9,
              },
              "-=0.88",
            )
            .from(
              ".hero-slide.is-active img",
              { scale: 1.08, duration: 1.4, ease: "power2.out" },
              "<",
            )
            .to(
              ".hero-curve__line",
              {
                strokeDashoffset: 0,
                duration: 1.35,
                ease: "power2.inOut",
              },
              "-=0.72",
            )
            .to(
              ".hero-curve__trail",
              { autoAlpha: 0.9, duration: 0.45 },
              "-=0.42",
            );

          heroIntroTimeline.add(() => {
            gsap.to(".hero-curve__trail", {
              strokeDashoffset: -1,
              duration: 6.5,
              repeat: -1,
              ease: "none",
            });
          });

          const scrollProgress = one<HTMLElement>(
            ".scroll-progress__bar",
          );
          if (scrollProgress) {
            gsap.fromTo(
              scrollProgress,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  start: 0,
                  end: "max",
                  scrub: 0.15,
                },
              },
            );
          }

          const hero = one<HTMLElement>(".hero");
          const heroCopy = hero
            ? one<HTMLElement>(".hero__copy", hero)
            : null;
          const heroShowcase = hero
            ? one<HTMLElement>(".hero-showcase", hero)
            : null;
          const heroMeta = hero
            ? one<HTMLElement>(".slide-meta", hero)
            : null;

          if (hero && heroCopy && heroShowcase) {
            const heroScroll = gsap.timeline({
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.75,
              },
            });

            heroScroll
              .to(
                heroCopy,
                {
                  y: context.conditions?.desktop ? -54 : -22,
                  autoAlpha: context.conditions?.desktop ? 0.48 : 0.72,
                  ease: "none",
                },
                0,
              )
              .to(
                heroShowcase,
                {
                  y: context.conditions?.desktop ? 48 : 22,
                  scale: context.conditions?.desktop ? 1.035 : 1.015,
                  ease: "none",
                },
                0,
              );

            if (heroMeta) {
              heroScroll.to(
                heroMeta,
                {
                  y: context.conditions?.desktop ? -24 : -12,
                  ease: "none",
                },
                0,
              );
            }
          }

          all<HTMLElement>(
            "[data-reveal], .shop-section, .reviews, .newsletter",
          ).forEach((section) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top 84%",
              once: true,
              onEnter: () => {
                gsap.from(Array.from(section.children), {
                  autoAlpha: 0,
                  y: 32,
                  duration: 0.72,
                  stagger: 0.07,
                });
              },
            });
          });

          const timelineSection = one<HTMLElement>(".order-timeline");
          const timelineHeading = timelineSection
            ? one<HTMLElement>(".timeline-heading", timelineSection)
            : null;

          if (
            timelineSection &&
            timelineHeading &&
            context.conditions?.timelineDesktop
          ) {
            const steps = all<HTMLElement>(
              "[data-timeline-step]",
              timelineSection,
            );
            const paths = all<SVGPathElement>(
              ".timeline-path__line",
              timelineSection,
            );

            gsap.set(paths, { autoAlpha: 0, strokeDashoffset: 48 });
            ScrollTrigger.create({
              trigger: timelineSection,
              start: "top 72%",
              once: true,
              onEnter: () => {
                const timeline = gsap
                  .timeline()
                  .from(Array.from(timelineHeading.children), {
                    autoAlpha: 0,
                    y: 22,
                    duration: 0.56,
                    stagger: 0.07,
                  })
                  .from(steps[0], {
                    autoAlpha: 0,
                    y: 24,
                    scale: 0.86,
                    duration: 0.48,
                  });

                paths.forEach((path, index) => {
                  timeline
                    .to(path, {
                      autoAlpha: 1,
                      strokeDashoffset: 0,
                      duration: 0.54,
                      ease: "power2.inOut",
                    })
                    .from(
                      steps[index + 1],
                      {
                        autoAlpha: 0,
                        y: index % 2 === 0 ? -22 : 22,
                        scale: 0.86,
                        duration: 0.46,
                      },
                      "-=0.12",
                    );
                });

                timeline.add(() => {
                  gsap.to(paths, {
                    strokeDashoffset: -72,
                    duration: 5,
                    repeat: -1,
                    ease: "none",
                  });
                });
              },
            });
          }

          if (
            timelineSection &&
            timelineHeading &&
            context.conditions?.timelineMobile
          ) {
            const mobileTrack = one<HTMLElement>(
              ".timeline-mobile__track",
              timelineSection,
            );
            const mobileSteps = all<HTMLElement>(
              "[data-timeline-mobile-step]",
              timelineSection,
            );

            if (mobileTrack) {
              gsap.set(mobileTrack, { scaleY: 0 });
              ScrollTrigger.create({
                trigger: timelineSection,
                start: "top 78%",
                once: true,
                onEnter: () => {
                  gsap
                    .timeline()
                    .from(Array.from(timelineHeading.children), {
                      autoAlpha: 0,
                      y: 18,
                      duration: 0.5,
                      stagger: 0.06,
                    })
                    .to(mobileTrack, {
                      scaleY: 1,
                      duration: 0.85,
                      ease: "power2.inOut",
                    })
                    .from(
                      mobileSteps,
                      {
                        autoAlpha: 0,
                        x: 22,
                        duration: 0.48,
                        stagger: 0.15,
                      },
                      "-=0.62",
                    );
                },
              });
            }
          }

          const comparisonSection = one<HTMLElement>(".comparison-section");
          const conceptSection = one<HTMLElement>(".concept-to-glow");
          if (conceptSection) {
            const conceptCopy = all<HTMLElement>(
              ".concept-to-glow__copy > *",
              conceptSection,
            );
            const conceptStage = one<HTMLElement>(
              ".concept-to-glow__compare",
              conceptSection,
            );

            ScrollTrigger.create({
              trigger: conceptSection,
              start: "top 78%",
              once: true,
              onEnter: () => {
                const timeline = gsap
                  .timeline()
                  .from(conceptCopy, {
                    autoAlpha: 0,
                    x: -24,
                    duration: 0.5,
                    stagger: 0.06,
                  });

                if (conceptStage) {
                  timeline.from(
                    conceptStage,
                    {
                      autoAlpha: 0,
                      y: 24,
                      scale: 0.98,
                      duration: 0.8,
                      ease: "power3.out",
                    },
                    "-=0.36",
                  );
                }
              },
            });

            const conceptParallaxStage = one<HTMLElement>(
              ".concept-to-glow__stage",
              conceptSection,
            );
            const conceptCopyPanel = one<HTMLElement>(
              ".concept-to-glow__copy",
              conceptSection,
            );

            if (conceptParallaxStage && conceptCopyPanel) {
              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: conceptSection,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                })
                .fromTo(
                  conceptParallaxStage,
                  { y: context.conditions?.desktop ? 42 : 20 },
                  {
                    y: context.conditions?.desktop ? -42 : -20,
                    ease: "none",
                  },
                  0,
                )
                .fromTo(
                  conceptCopyPanel,
                  { y: context.conditions?.desktop ? -18 : -8 },
                  {
                    y: context.conditions?.desktop ? 18 : 8,
                    ease: "none",
                  },
                  0,
                );
            }
          }

          if (comparisonSection) {
            const comparisonCopy = all<HTMLElement>(
              ".comparison-copy > *",
              comparisonSection,
            );
            const comparisonTableRows = all<HTMLElement>(
              ".comparison-row",
              comparisonSection,
            );
            const comparisonRail = one<HTMLElement>(
              ".comparison-rail",
              comparisonSection,
            );

            ScrollTrigger.create({
              trigger: comparisonSection,
              start: "top 78%",
              once: true,
              onEnter: () => {
                const timeline = gsap
                  .timeline()
                  .from(comparisonSection.querySelector(".comparison-shell"), {
                    autoAlpha: 0,
                    y: 28,
                    duration: 0.65,
                  })
                  .from(
                    comparisonCopy,
                    {
                      autoAlpha: 0,
                      x: -22,
                      duration: 0.45,
                      stagger: 0.06,
                    },
                    "-=0.35",
                  )
                  .from(
                    comparisonTableRows,
                    {
                      autoAlpha: 0,
                      x: 24,
                      duration: 0.42,
                      stagger: 0.055,
                    },
                    "-=0.46",
                  );

                if (comparisonRail) {
                  timeline.fromTo(
                    comparisonRail,
                    { scaleY: 0.76, autoAlpha: 0 },
                    {
                      scaleY: 1,
                      autoAlpha: 1,
                      duration: 0.58,
                      ease: "back.out(1.25)",
                    },
                    "-=0.48",
                  );
                }
              },
            });
          }

          const inspirationSection = one<HTMLElement>(".inspiration");
          if (inspirationSection) {
            const inspirationPin = one<HTMLElement>(
              "[data-inspiration-pin]",
              inspirationSection,
            );
            const inspirationVisual = one<HTMLElement>(
              "[data-inspiration-visual]",
              inspirationSection,
            );
            const inspirationCopy = all<HTMLElement>(
              "[data-inspiration-copy] > *",
              inspirationSection,
            );
            const inspirationSteps = all<HTMLElement>(
              "[data-inspiration-step]",
              inspirationSection,
            );
            const inspirationAction = one<HTMLElement>(
              "[data-inspiration-action]",
              inspirationSection,
            );
            const inspirationWordmark = one<HTMLElement>(
              ".inspiration__wordmark",
              inspirationSection,
            );

            if (
              inspirationPin &&
              inspirationVisual &&
              context.conditions?.timelineDesktop
            ) {
              const inspirationTimeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: inspirationSection,
                  start: "top top",
                  end: "+=110%",
                  pin: inspirationPin,
                  scrub: 0.8,
                  anticipatePin: 1,
                },
              });

              if (inspirationWordmark) {
                inspirationTimeline.fromTo(
                  inspirationWordmark,
                  { xPercent: -7, autoAlpha: 0.08 },
                  { xPercent: 8, autoAlpha: 0.16, duration: 2.2 },
                  0,
                );
              }

              inspirationTimeline
                .from(
                  inspirationVisual,
                  {
                    autoAlpha: 0,
                    x: -70,
                    rotation: -5,
                    scale: 0.9,
                    duration: 0.8,
                  },
                  0,
                )
                .from(
                  inspirationCopy,
                  {
                    autoAlpha: 0,
                    y: 46,
                    stagger: 0.12,
                    duration: 0.72,
                  },
                  0.12,
                )
                .from(
                  inspirationSteps,
                  {
                    autoAlpha: 0,
                    x: 46,
                    stagger: 0.14,
                    duration: 0.72,
                  },
                  0.48,
                );

              if (inspirationAction) {
                inspirationTimeline.from(
                  inspirationAction,
                  { autoAlpha: 0, y: 26, duration: 0.5 },
                  0.98,
                );
              }

              inspirationTimeline.to(
                inspirationVisual,
                { y: -26, rotation: 1.5, scale: 1.018, duration: 0.72 },
                1.38,
              );
            }
          }
        },
      );

      const timelineSection = one<HTMLElement>(".order-timeline");
      const supportsFineHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      );
      const cleanups: Array<() => void> = [];

      if (timelineSection) {
        const steps = all<HTMLElement>(
          "[data-timeline-step]",
          timelineSection,
        );
        const paths = all<SVGPathElement>(
          ".timeline-path__line",
          timelineSection,
        );
        const orbs = all<HTMLElement>(".timeline-orb", timelineSection);

        steps.forEach((step, stepIndex) => {
          const node = one<HTMLElement>(".timeline-step__node", step);
          if (!node) return;

          const onEnter = contextSafe?.(() => {
            if (!supportsFineHover.matches || reducedMotion) return;
            step.classList.add("is-hovered");
            [paths[stepIndex - 1], paths[stepIndex]]
              .filter(Boolean)
              .forEach((path) => path.classList.add("is-lit"));
            gsap.to(node, { scale: 1.065, duration: 0.35 });
          });
          const onMove = contextSafe?.((event: PointerEvent) => {
            if (!supportsFineHover.matches || reducedMotion) return;
            const bounds = node.getBoundingClientRect();
            const xRatio =
              (event.clientX - bounds.left) / bounds.width - 0.5;
            const yRatio =
              (event.clientY - bounds.top) / bounds.height - 0.5;
            gsap.to(node, {
              x: xRatio * 11,
              y: yRatio * 11,
              rotationX: yRatio * -9,
              rotationY: xRatio * 9,
              duration: 0.36,
              overwrite: "auto",
            });
          });
          const onLeave = contextSafe?.(() => {
            step.classList.remove("is-hovered");
            [paths[stepIndex - 1], paths[stepIndex]]
              .filter(Boolean)
              .forEach((path) => path.classList.remove("is-lit"));
            gsap.to(node, {
              x: 0,
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.5,
              ease: "elastic.out(1, 0.55)",
            });
          });

          if (!onEnter || !onMove || !onLeave) return;
          step.addEventListener("pointerenter", onEnter);
          step.addEventListener("pointermove", onMove);
          step.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            step.removeEventListener("pointerenter", onEnter);
            step.removeEventListener("pointermove", onMove);
            step.removeEventListener("pointerleave", onLeave);
          });
        });

        const onSectionMove = contextSafe?.((event: PointerEvent) => {
          if (!supportsFineHover.matches || reducedMotion) return;
          const bounds = timelineSection.getBoundingClientRect();
          const xRatio =
            (event.clientX - bounds.left) / bounds.width - 0.5;
          const yRatio =
            (event.clientY - bounds.top) / bounds.height - 0.5;
          orbs.forEach((orb, index) => {
            const direction = index === 0 ? 1 : -1;
            gsap.to(orb, {
              x: xRatio * 32 * direction,
              y: yRatio * 24 * direction,
              duration: 1.15,
              overwrite: "auto",
            });
          });
        });
        const onSectionLeave = contextSafe?.(() => {
          gsap.to(orbs, {
            x: 0,
            y: 0,
            duration: 1.2,
            overwrite: "auto",
          });
        });

        if (onSectionMove && onSectionLeave) {
          timelineSection.addEventListener("pointermove", onSectionMove);
          timelineSection.addEventListener("pointerleave", onSectionLeave);
          cleanups.push(() => {
            timelineSection.removeEventListener(
              "pointermove",
              onSectionMove,
            );
            timelineSection.removeEventListener(
              "pointerleave",
              onSectionLeave,
            );
          });
        }
      }

      ScrollTrigger.refresh();
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        media.revert();
      };
    },
    {
      scope: rootRef,
      dependencies: [reducedMotion],
      revertOnUpdate: true,
    },
  );
}
