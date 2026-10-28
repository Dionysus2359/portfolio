"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMotionPreferences } from "@/components/motion/MotionPreferences";
import { useExperienceReady } from "@/components/loading/useExperienceReady";
import { contactPointerOffset } from "@/lib/motion";

export function ContactSectionMotion() {
  const marker = useRef<HTMLSpanElement>(null);
  const { ready, reduced } = useMotionPreferences();
  const experienceReady = useExperienceReady();
  const pathname = usePathname();

  useEffect(() => {
    if (!ready || reduced || !experienceReady) return;
    const section = marker.current?.closest<HTMLElement>("[data-contact-motion]");
    if (!section) return;
    const fine = matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
    const properties = ["--contact-x", "--contact-y", "--contact-arrow-x", "--contact-arrow-y"];
    let frame = 0, visible = true, active = false;
    let pointerX = 0, pointerY = 0;
    let current = [0, 0, 0, 0], target = [0, 0, 0, 0];

    const paint = () => {
      frame = 0;
      if (!visible || document.hidden || !fine.matches) return;
      let unsettled = false;
      current = current.map((value, i) => {
        const next = value + (target[i] - value) * .18;
        if (Math.abs(target[i] - next) > .025) unsettled = true;
        const result = Math.abs(target[i] - next) < .025 ? target[i] : next;
        section.style.setProperty(properties[i], `${result.toFixed(3)}px`);
        return result;
      });
      if (unsettled) frame = requestAnimationFrame(paint);
    };
    const requestPaint = () => { if (!frame && visible && !document.hidden && fine.matches) frame = requestAnimationFrame(paint); };
    const reset = () => {
      active = false;
      delete section.dataset.contactActive;
      target = [0, 0, 0, 0];
      requestPaint();
    };
    const stop = () => {
      cancelAnimationFrame(frame); frame = 0;
      active = false; current = [0, 0, 0, 0]; target = [0, 0, 0, 0];
      delete section.dataset.contactActive;
      properties.forEach(property => section.style.removeProperty(property));
    };
    const update = () => {
      const bounds = section.getBoundingClientRect();
      if (pointerX < bounds.left || pointerX > bounds.right || pointerY < bounds.top || pointerY > bounds.bottom) { reset(); return; }
      const offset = contactPointerOffset(pointerX, pointerY, bounds);
      target = [offset.x, offset.y, offset.arrowX, offset.arrowY];
      active = true;
      section.dataset.contactActive = "";
      requestPaint();
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType === "touch" || !visible || document.hidden) return;
      pointerX = event.clientX; pointerY = event.clientY;
      update();
    };
    const scroll = () => { if (active) update(); };
    const visibility = () => { if (document.hidden) stop(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) stop(); });
    observer.observe(section);
    section.addEventListener("pointerenter", move, { passive: true });
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", reset);
    section.addEventListener("pointercancel", stop);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", stop);
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", visibility);
    fine.addEventListener("change", stop);
    return () => {
      stop(); observer.disconnect();
      section.removeEventListener("pointerenter", move);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", reset);
      section.removeEventListener("pointercancel", stop);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", stop);
      window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", visibility);
      fine.removeEventListener("change", stop);
    };
  }, [ready, reduced, experienceReady, pathname]);

  return <span ref={marker} hidden />;
}
