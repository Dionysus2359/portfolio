import type { EditorialPhoto } from "@/types/project";

export const profile = {
  name: "Om Tiwari",
  descriptor: "Creative developer",
  email: "omtiwari2359@gmail.com",
  github: "https://github.com/Dionysus2359",
  linkedin: "https://www.linkedin.com/in/om-tiwari-240817247",
  portrait: null as EditorialPhoto | null,
  heroPortrait: false,
};

// Add only supplied, approved photographs. No placeholder path is requested.
export const pendingPhotography = [
  "Editorial portrait for About",
  "Two or three Adobe presentation, team or award photographs, with captions and credits",
] as const;
