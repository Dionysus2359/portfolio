"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMotionPreferences } from "./MotionPreferences";

// Copy remains server-rendered. Motion is attached only after its library loads.
export function MotionDirector() {
  const pathname = usePathname();
  const { ready, reduced } = useMotionPreferences();
  const allowed = ready && !reduced;

  useEffect(() => {
    if (!allowed) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        revert = () => media.revert();
        media.add(
          {
            full: "(prefers-reduced-motion: no-preference)",
            desktop: "(min-width: 900px) and (pointer: fine)",
          },
          (context) => {
            if (!context.conditions?.full) return;
            const desktop = Boolean(context.conditions.desktop);
            const cleanups: (() => void)[] = [];

            // Attach reveals only below the initial viewport; focus always completes them.
            for (const group of gsap.utils.toArray<HTMLElement>(
              "[data-reveal-group]",
            )) {
              const items = Array.from(
                group.querySelectorAll<HTMLElement>("[data-reveal]"),
              ).filter(
                (item) =>
                  item.getBoundingClientRect().height > 0 &&
                  item.getBoundingClientRect().top > window.innerHeight * 0.96,
              );
              if (!items.length) continue;
              const reveal = gsap.fromTo(
                items,
                { y: desktop ? 42 : 22, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.9,
                  stagger: 0.1,
                  ease: "power3.out",
                  clearProps: "opacity,transform",
                  scrollTrigger: {
                    trigger: group,
                    start: "top 88%",
                    once: true,
                  },
                },
              );
              const revealForFocus = (event: FocusEvent) => {
                if (
                  event.target instanceof Element &&
                  items.some((item) => item.contains(event.target as Node))
                )
                  reveal.progress(1);
              };
              group.addEventListener("focusin", revealForFocus);
              cleanups.push(() =>
                group.removeEventListener("focusin", revealForFocus),
              );
            }

            for (const figure of gsap.utils.toArray<HTMLElement>(
              "[data-media-reveal]",
            )) {
              if (
                figure.getBoundingClientRect().top <=
                  window.innerHeight * 0.96 ||
                !figure.getBoundingClientRect().height
              )
                continue;
              const tween = gsap.fromTo(
                figure,
                { clipPath: "inset(8% 0% 8% 0%)", opacity: 0.35 },
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  opacity: 1,
                  duration: 1.25,
                  ease: "power3.out",
                  clearProps: "clipPath,opacity",
                  scrollTrigger: {
                    trigger: figure,
                    start: "top 90%",
                    once: true,
                  },
                },
              );
              const reveal = () => {
                tween.progress(1);
              };
              const focusTarget = figure.closest("a") || figure;
              focusTarget.addEventListener("focusin", reveal);
              cleanups.push(() =>
                focusTarget.removeEventListener("focusin", reveal),
              );
            }

            if (desktop) {
              const hero = document.querySelector<HTMLElement>("[data-studio-hero]");
              if (hero) {
                gsap.to(hero, {
                  "--exit-y": "16px",
                  ease: "none",
                  scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: .5 },
                });
              }
              for (const frame of gsap.utils.toArray<HTMLElement>(
                "[data-media-drift]",
              )) {
                gsap.fromTo(
                  frame,
                  { y: 18 },
                  {
                    y: -18,
                    ease: "none",
                    scrollTrigger: {
                      trigger: frame,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.65,
                    },
                  },
                );
              }
              for (const core of gsap.utils.toArray<HTMLElement>(
                "[data-magnetic]",
              )) {
                const hit = core.closest("a, button");
                if (!(hit instanceof HTMLElement)) continue;
                const xTo = gsap.quickTo(core, "x", {
                  duration: 0.55,
                  ease: "power3.out",
                });
                const yTo = gsap.quickTo(core, "y", {
                  duration: 0.55,
                  ease: "power3.out",
                });
                const move = (event: PointerEvent) => {
                  const rect = core.parentElement!.getBoundingClientRect();
                  xTo(
                    gsap.utils.clamp(
                      -12,
                      12,
                      (event.clientX - rect.left - rect.width / 2) * 0.16,
                    ),
                  );
                  yTo(
                    gsap.utils.clamp(
                      -12,
                      12,
                      (event.clientY - rect.top - rect.height / 2) * 0.16,
                    ),
                  );
                };
                const reset = () => {
                  xTo(0);
                  yTo(0);
                };
                hit.addEventListener("pointermove", move);
                hit.addEventListener("pointerleave", reset);
                hit.addEventListener("blur", reset, true);
                cleanups.push(() => {
                  hit.removeEventListener("pointermove", move);
                  hit.removeEventListener("pointerleave", reset);
                  hit.removeEventListener("blur", reset, true);
                });
              }
            }
            ScrollTrigger.refresh();
            return () => cleanups.forEach((cleanup) => cleanup());
          },
        );
      })
      .catch(() => {
        revert?.();
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [allowed, pathname]);

  return null;
}
