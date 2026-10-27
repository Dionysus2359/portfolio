export type MotionChoice = "full" | "reduced";

export function parseMotionChoice(value: string | null): MotionChoice {
  return value === "reduced" ? "reduced" : "full";
}

export function shouldReduceMotion(systemReduced: boolean, choice: MotionChoice) {
  return systemReduced || choice === "reduced";
}
