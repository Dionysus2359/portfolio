"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { EXPERIENCE_READY, openingReleaseDelay, waitForImage } from "@/lib/readiness";
import { useMotionPreferences } from "@/components/motion/MotionPreferences";
import { LoadingScreen } from "./LoadingScreen";

function anchorTarget() {
  try { return document.getElementById(decodeURIComponent(location.hash.slice(1))); }
  catch { return null; }
}

function criticalImage() {
  const anchor = location.hash ? anchorTarget() : null;
  if (location.hash && !anchor) return null;
  const image = anchor
    ? anchor.querySelector<HTMLImageElement>("img")
    : document.querySelector<HTMLImageElement>("[data-studio-image], [data-critical-image]");
  if (!image) return null;
  const relativeTop = image.getBoundingClientRect().top - (anchor?.getBoundingClientRect().top || 0);
  return relativeTop < window.innerHeight ? image : null;
}

export function ExperienceGate({ children }: { children: ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const { ready, reduced } = useMotionPreferences();
  const pathname = usePathname();
  const initialPath = useRef<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const state = window.__omExperience;
    if (!state || state.phase === "ready") return;
    setAnnouncement("Preparing the portfolio.");
    if (content.current) {
      content.current.inert = true;
      content.current.setAttribute("aria-busy", "true");
    }
    const release = () => setAnnouncement("Portfolio ready.");
    window.addEventListener(EXPERIENCE_READY, release, { once: true });
    return () => window.removeEventListener(EXPERIENCE_READY, release);
  }, []);

  useEffect(() => {
    // Use the browser URL so an initial 404/pathname hydration correction does
    // not get mistaken for navigation and cut the opening short.
    if (initialPath.current === null) initialPath.current = location.pathname;
    else if (location.pathname !== initialPath.current) window.__omExperience?.release("route", true);
  }, [pathname]);

  useEffect(() => {
    const state = window.__omExperience;
    if (!ready || !state || state.phase === "ready") return;
    state.reduced = reduced;
    if (state.phase === "exiting") {
      if (reduced) state.release(state.reason || "assets", true);
      return;
    }
    let disposed = false;
    let timer = 0;
    let resizeFrame = 0;
    let resources: AbortController;
    let settled = false;
    let selectedImage: HTMLImageElement | null = null;
    let selectedSource = "";
    const fonts = Promise.allSettled([
      document.fonts.load('600 16px "Bodoni Moda"'),
      document.fonts.load('400 16px "Space Grotesk"'),
    ]);

    const alignAnchor = () => {
      if (!location.hash || state.interacted) return;
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (navigation?.type !== "back_forward") anchorTarget()?.scrollIntoView({ behavior: "instant" });
    };

    const release = () => {
      if (disposed || state.phase !== "loading") return;
      // A responsive candidate may change after it decoded but before the hold ends.
      if (settled && (selectedImage !== criticalImage() || (selectedImage && selectedSource !== (selectedImage.currentSrc || selectedImage.src)))) {
        loadResources();
        return;
      }
      alignAnchor();
      state.release(settled ? "assets" : "deadline");
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(release, openingReleaseDelay(performance.now() - state.startedAt, settled, reduced));
    };
    const loadResources = () => {
      resources?.abort();
      resources = new AbortController();
      const current = resources;
      settled = false;
      selectedImage = criticalImage();
      schedule();
      void Promise.allSettled([fonts, selectedImage ? waitForImage(selectedImage, current.signal) : Promise.resolve()]).then(() => {
        if (disposed || current.signal.aborted || state.phase !== "loading") return;
        selectedSource = selectedImage?.currentSrc || selectedImage?.src || "";
        settled = true;
        schedule();
      });
    };
    const resize = () => {
      if (disposed) return;
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(loadResources);
    };
    const cancel = () => {
      disposed = true;
      window.clearTimeout(timer);
      cancelAnimationFrame(resizeFrame);
      resources?.abort();
      window.removeEventListener("resize", resize);
    };
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener(EXPERIENCE_READY, cancel, { once: true });
    // Let native lazy loading discover a direct anchor's critical media while
    // covered, rather than waiting for a below-fold image before scrolling to it.
    alignAnchor();
    loadResources();
    return () => {
      cancel();
      window.removeEventListener("resize", resize);
      window.removeEventListener(EXPERIENCE_READY, cancel);
    };
  }, [ready, reduced]);

  return (
    <>
      <LoadingScreen />
      <p className="sr-only" role="status">{announcement}</p>
      <div ref={content} data-experience-content>{children}</div>
    </>
  );
}
