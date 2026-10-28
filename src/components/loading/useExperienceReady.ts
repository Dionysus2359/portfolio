"use client";

import { useSyncExternalStore } from "react";
import { EXPERIENCE_READY } from "@/lib/readiness";

const subscribe = (notify: () => void) => {
  window.addEventListener(EXPERIENCE_READY, notify);
  return () => window.removeEventListener(EXPERIENCE_READY, notify);
};
const snapshot = () => !window.__omExperience || window.__omExperience.phase === "ready";

export function useExperienceReady() {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
