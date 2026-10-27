"use client";

import { useMotionPreferences } from "./MotionPreferences";

export function EffectsToggle() {
  const { ready, reduced, systemReduced, toggle } = useMotionPreferences();
  if (!ready) return null;
  return (
    <button className="effects-toggle" type="button" onClick={toggle} aria-pressed={reduced} disabled={systemReduced}
      title={systemReduced ? "Your device requests reduced motion" : undefined}>
      <span aria-hidden="true">{reduced ? "○" : "◉"}</span>
      {systemReduced ? "Device reduces motion" : reduced ? "Enable effects" : "Reduce effects"}
    </button>
  );
}
