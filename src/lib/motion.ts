export type MotionChoice = "full" | "reduced";

export function parseMotionChoice(value: string | null): MotionChoice {
  return value === "reduced" ? "reduced" : "full";
}

export function shouldReduceMotion(systemReduced: boolean, choice: MotionChoice) {
  return systemReduced || choice === "reduced";
}

/** The section supplies stable bounds; only its inner copy and arrow move. */
export function contactPointerOffset(x: number, y: number, bounds: { left: number; top: number; width: number; height: number }) {
  const horizontal = Math.max(-1, Math.min(1, ((x - bounds.left) / Math.max(1, bounds.width) - .5) * 2));
  const vertical = Math.max(-1, Math.min(1, ((y - bounds.top) / Math.max(1, bounds.height) - .5) * 2));
  const arrowX = horizontal * 21, arrowY = vertical * 10.5;
  const limit = Math.min(1, 21 / (Math.hypot(arrowX, arrowY) || 1));
  return { x: horizontal * 14, y: vertical * 7, arrowX: arrowX * limit, arrowY: arrowY * limit };
}
