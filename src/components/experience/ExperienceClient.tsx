"use client";

import dynamic from "next/dynamic";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Experience.module.css";
import type { SceneShared } from "./SceneCanvas";

const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function ExperienceClient() {
  const mount = useRef<HTMLDivElement>(null);
  const mounted = useRef(true);
  const shared = useRef<SceneShared>({
    progress: 0,
    pointer: { x: 0, y: 0 },
    active: true,
    hovered: -1,
    links: [],
    handoff: null,
    sticky: null,
  });
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [failed, setFailed] = useState(false);
  const fail = useCallback(() => {
    setFailed(true);
    setEnabled(false);
    setReady(false);
  }, []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    mounted.current = true;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const screen = window.matchMedia("(min-width: 900px)");
    let disposed = false;
    const assess = () => {
      let preference = false;
      try {
        preference = localStorage.getItem("om-effects") === "reduced";
      } catch {
        /* Storage may be unavailable. */
      }
      setReduced(preference);
      if (motion.matches || preference || !screen.matches) {
        setEnabled(false);
        setReady(false);
        return;
      }
      if (disposed) return;
      try {
        const test = document.createElement("canvas");
        const gl = test.getContext("webgl2");
        if (!gl) return;
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        setEnabled(true);
      } catch {
        setEnabled(false);
      }
    };
    assess();
    motion.addEventListener("change", assess);
    screen.addEventListener("change", assess);
    return () => {
      mounted.current = false;
      disposed = true;
      motion.removeEventListener("change", assess);
      screen.removeEventListener("change", assess);
    };
  }, []);

  useEffect(() => {
    if (!enabled || !ready || failed) return;
    const stage = mount.current?.closest<HTMLElement>(
      "[data-experience-stage]",
    );
    if (!stage) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;
    const links = Array.from(
      stage.querySelectorAll<HTMLAnchorElement>("[data-project-link]"),
    );
    shared.current.links = links;
    shared.current.handoff =
      stage.querySelector<HTMLImageElement>("[data-handoff] img");
    shared.current.sticky = stage.querySelector<HTMLElement>(
      "[data-stage-sticky]",
    );
    stage.dataset.enhanced = "true";
    const main = stage.closest("main");
    if (main) main.dataset.experience = "enhanced";
    const pointer = (event: PointerEvent) => {
      shared.current.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      shared.current.pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const resetPointer = () => {
      shared.current.pointer.x = 0;
      shared.current.pointer.y = 0;
    };
    let inView = true;
    const visibility = () => {
      shared.current.active = inView && !document.hidden;
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        shared.current.active = inView && !document.hidden;
      },
      { rootMargin: "150px" },
    );
    observer.observe(stage);
    const handlers = links.map((link, index) => {
      const enter = () => {
        shared.current.hovered = index;
      };
      const leave = () => {
        shared.current.hovered = -1;
      };
      link.addEventListener("pointerenter", enter);
      link.addEventListener("pointerleave", leave);
      link.addEventListener("focus", enter);
      link.addEventListener("blur", leave);
      return () => {
        link.removeEventListener("pointerenter", enter);
        link.removeEventListener("pointerleave", leave);
        link.removeEventListener("focus", enter);
        link.removeEventListener("blur", leave);
      };
    });
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    document.addEventListener("visibilitychange", visibility);
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const hero = stage.querySelector("[data-hero-copy]");
          const title = stage.querySelector("[data-gallery-title]");
          const projectLinks = stage.querySelector("[data-project-links]");
          const bar = stage.querySelector("[data-progress-bar]");
          const handoff = stage.querySelector("[data-handoff]");
          ScrollTrigger.create({
            trigger: stage,
            start: "top top",
            end: "bottom bottom",
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
              shared.current.progress = progress;
              const heroAlpha =
                1 - Math.min(1, Math.max(0, (progress - 0.07) / 0.2));
              const galleryAlpha =
                Math.min(1, Math.max(0, (progress - 0.24) / 0.15)) *
                (1 - Math.min(1, Math.max(0, (progress - 0.77) / 0.12)));
              gsap.set(hero, {
                opacity: heroAlpha,
                visibility: heroAlpha < 0.01 ? "hidden" : "visible",
                y: -progress * 65,
              });
              gsap.set(title, {
                opacity: galleryAlpha,
                visibility: galleryAlpha < 0.01 ? "hidden" : "visible",
                y: 15 * (1 - galleryAlpha),
              });
              gsap.set(projectLinks, {
                opacity: galleryAlpha,
                visibility: galleryAlpha < 0.01 ? "hidden" : "visible",
              });
              gsap.set(bar, { scaleX: progress });
              const handoffAlpha = Math.min(
                1,
                Math.max(0, (progress - 0.84) / 0.12),
              );
              gsap.set(handoff, {
                opacity: handoffAlpha,
                visibility: handoffAlpha < 0.01 ? "hidden" : "visible",
              });
            },
          });
        }, stage);
        ScrollTrigger.refresh();
        const anchor = window.location.hash.slice(1);
        if (anchor)
          document
            .getElementById(anchor)
            ?.scrollIntoView({ behavior: "instant" });
        cleanup = () => ctx.revert();
      })
      .catch(fail);
    return () => {
      disposed = true;
      cleanup?.();
      observer.disconnect();
      handlers.forEach((fn) => fn());
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("blur", resetPointer);
      document.removeEventListener("visibilitychange", visibility);
      const bounds = stage.getBoundingClientRect();
      const oldHeight = stage.offsetHeight;
      delete stage.dataset.enhanced;
      if (main) delete main.dataset.experience;
      stage
        .querySelectorAll<HTMLElement>(
          "[data-hero-copy], [data-gallery-title], [data-project-links], [data-handoff]",
        )
        .forEach((element) => {
          element.style.removeProperty("opacity");
          element.style.removeProperty("visibility");
          element.style.removeProperty("transform");
        });
      stage
        .querySelector<HTMLElement>("[data-progress-bar]")
        ?.style.removeProperty("transform");
      links.forEach((link) => {
        link.style.removeProperty("transform");
        link.style.removeProperty("width");
        link.style.removeProperty("height");
      });
      const collapsed = oldHeight - stage.offsetHeight;
      if (!mounted.current) return;
      if (bounds.bottom < 0)
        window.scrollBy({ top: -collapsed, behavior: "instant" });
      else if (bounds.top < -100)
        window.scrollTo({ top: stage.offsetTop, behavior: "instant" });
      shared.current.progress = 0;
    };
  }, [enabled, ready, failed, fail]);

  const toggle = () => {
    const next = !reduced;
    try {
      localStorage.setItem("om-effects", next ? "reduced" : "full");
    } catch {
      /* Preference applies in memory. */
    }
    setReduced(next);
    if (next) {
      setEnabled(false);
      setReady(false);
    } else if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.innerWidth >= 900 &&
      !failed
    )
      setEnabled(true);
  };

  return (
    <>
      <div ref={mount} className={styles.canvasMount} aria-hidden="true">
        {enabled && !failed && (
          <SceneBoundary onError={fail}>
            <SceneCanvas shared={shared} onReady={onReady} onError={fail} />
          </SceneBoundary>
        )}
      </div>
      {((enabled && ready) || reduced) && (
        <button
          type="button"
          className={styles.effectsControl}
          onClick={toggle}
          aria-pressed={reduced}
        >
          <span aria-hidden="true">{reduced ? "○" : "◉"}</span>{" "}
          {reduced ? "Enable effects" : "Reduce effects"}
        </button>
      )}
    </>
  );
}
