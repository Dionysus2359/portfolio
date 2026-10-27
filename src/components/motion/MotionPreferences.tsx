"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { parseMotionChoice, shouldReduceMotion, type MotionChoice } from "@/lib/motion";

const MotionContext = createContext({ ready: false, reduced: true, systemReduced: false, toggle: () => {} });
let memoryChoice: MotionChoice = "full";

export function MotionPreferences({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<MotionChoice>(memoryChoice);
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const systemChange = () => setSystemReduced(media.matches);
    const storageChange = (event: StorageEvent) => {
      if (event.key !== "om-effects" && event.key !== null) return;
      memoryChoice = parseMotionChoice(event.newValue);
      setChoice(memoryChoice);
    };
    try { memoryChoice = parseMotionChoice(localStorage.getItem("om-effects")); } catch { /* Keep the in-memory choice. */ }
    setChoice(memoryChoice);
    systemChange();
    setReady(true);
    media.addEventListener("change", systemChange);
    window.addEventListener("storage", storageChange);
    return () => {
      media.removeEventListener("change", systemChange);
      window.removeEventListener("storage", storageChange);
    };
  }, []);

  const reduced = shouldReduceMotion(systemReduced, choice);
  useEffect(() => {
    if (ready) document.documentElement.dataset.motion = reduced ? "reduced" : "full";
    return () => { delete document.documentElement.dataset.motion; };
  }, [ready, reduced]);

  const toggle = useCallback(() => {
    if (systemReduced) return;
    memoryChoice = choice === "reduced" ? "full" : "reduced";
    setChoice(memoryChoice);
    try { localStorage.setItem("om-effects", memoryChoice); } catch { /* The choice still applies for this session. */ }
  }, [choice, systemReduced]);

  return <MotionContext.Provider value={{ ready, reduced, systemReduced, toggle }}>{children}</MotionContext.Provider>;
}

export const useMotionPreferences = () => useContext(MotionContext);
