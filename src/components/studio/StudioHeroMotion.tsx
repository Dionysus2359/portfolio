"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/motion/MotionPreferences";

let entered = false;

export function StudioHeroMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  const { ready, reduced } = useMotionPreferences();
  useEffect(() => {
    if (!ready || reduced) return;
    const root = marker.current?.closest<HTMLElement>("[data-studio-hero]");
    if (!root) return;
    const hero = root;
    const art = hero.querySelector<HTMLElement>("[data-studio-art]")!;
    const image = hero.querySelector<HTMLImageElement>("[data-studio-image]")!;
    const light = hero.querySelector<HTMLElement>("[data-studio-light]")!;
    const typeLight = hero.querySelector<HTMLElement>("[data-studio-type-light]")!;
    const fine = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    let disposed = false, frame = 0, visible = true, inside = false;
    let x = -300, y = -300, targetX = -300, targetY = -300, sceneX = 0, sceneY = 0;
    let entranceCleanup: (() => void) | undefined;
    const syncImage = () => {
      if (image.complete && image.naturalWidth) light.style.backgroundImage = `url("${image.currentSrc}")`;
    };
    function requestFrame() {
      if (!frame && visible && !document.hidden && fine.matches) frame = requestAnimationFrame(paint);
    }
    function paint() {
      frame = 0;
      if (disposed || !visible || document.hidden || !fine.matches) return;
      x += (targetX - x) * .18; y += (targetY - y) * .18;
      const rect = hero.getBoundingClientRect();
      const nextX = inside ? ((x / rect.width) - .5) * -12 : 0;
      const nextY = inside ? ((y / rect.height) - .5) * -8 : 0;
      sceneX += (nextX - sceneX) * .14; sceneY += (nextY - sceneY) * .14;
      art.style.setProperty("--scene-x", `${sceneX.toFixed(2)}px`);
      art.style.setProperty("--scene-y", `${sceneY.toFixed(2)}px`);
      const artRect = art.getBoundingClientRect(), scale = artRect.width / art.offsetWidth;
      hero.style.setProperty("--light-x", `${(x + rect.left - artRect.left) / scale}px`);
      hero.style.setProperty("--light-y", `${(y + rect.top - artRect.top) / scale}px`);
      const typeRect = typeLight.getBoundingClientRect(), typeScale = typeRect.width / typeLight.offsetWidth;
      typeLight.style.setProperty("--type-x", `${(x + rect.left - typeRect.left) / typeScale}px`);
      typeLight.style.setProperty("--type-y", `${y + rect.top - typeRect.top}px`);
      if (Math.abs(targetX-x) + Math.abs(targetY-y) + Math.abs(nextX-sceneX) + Math.abs(nextY-sceneY) > .25) requestFrame();
    }
    const clearPointer = () => { inside = false; hero.style.setProperty("--light-alpha", "0"); targetX = x; targetY = y; requestFrame(); };
    const move = (event: PointerEvent) => {
      if (!fine.matches || !visible || document.hidden) return;
      const rect = hero.getBoundingClientRect();
      targetX = event.clientX - rect.left; targetY = event.clientY - rect.top;
      if (!inside) { x = targetX; y = targetY; }
      inside = true; hero.style.setProperty("--light-alpha", "1"); requestFrame();
    };
    const stop = () => {
      cancelAnimationFrame(frame); frame = 0; inside = false;
      hero.style.setProperty("--light-alpha", "0");
      art.style.removeProperty("--scene-x"); art.style.removeProperty("--scene-y"); sceneX = 0; sceneY = 0;
    };
    const visibility = () => { if (document.hidden) stop(); };
    const resize = () => { stop(); syncImage(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) stop(); });
    observer.observe(hero); syncImage();
    image.addEventListener("load", syncImage);
    hero.addEventListener("pointermove", move, { passive: true }); hero.addEventListener("pointerleave", clearPointer);
    window.addEventListener("resize", resize); window.addEventListener("scroll", clearPointer, { passive: true });
    window.addEventListener("blur", stop); fine.addEventListener("change", resize);
    document.addEventListener("visibilitychange", visibility);
    // Late enhancement and return visits retain the already-visible composition.
    if (!entered && performance.now() < 1800 && window.scrollY < 60 && !hero.contains(document.activeElement)) {
      entered = true;
      void import("gsap").then(({ gsap }) => {
        if (disposed || performance.now() > 2100 || hero.contains(document.activeElement)) return;
        const context = gsap.context(() => {
          gsap.fromTo("[data-studio-line]", { y: 24, opacity: .3 }, { y: 0, opacity: 1, duration: .85, stagger: .08, ease: "power3.out", clearProps: "transform,opacity" });
          gsap.fromTo("[data-studio-detail]", { y: 12, opacity: .4 }, { y: 0, opacity: 1, duration: .7, delay: .15, stagger: .1, clearProps: "transform,opacity" });
        }, hero);
        const reveal = () => context.revert();
        hero.addEventListener("focusin", reveal, { once: true });
        entranceCleanup = () => { hero.removeEventListener("focusin", reveal); context.revert(); };
      }).catch(() => { /* Server-rendered composition stays visible. */ });
    }
    return () => {
      disposed = true; stop(); entranceCleanup?.(); observer.disconnect();
      image.removeEventListener("load", syncImage);
      hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", clearPointer);
      window.removeEventListener("resize", resize); window.removeEventListener("scroll", clearPointer);
      window.removeEventListener("blur", stop); fine.removeEventListener("change", resize);
      document.removeEventListener("visibilitychange", visibility); light.style.removeProperty("background-image");
      ["--light-alpha", "--light-x", "--light-y"].forEach(key => hero.style.removeProperty(key));
      ["--type-x", "--type-y"].forEach(key => typeLight.style.removeProperty(key));
    };
  }, [ready, reduced]);
  return <span ref={marker} hidden />;
}
