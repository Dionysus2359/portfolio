export type ProjectSlug = "acm" | "surge" | "adobe";

export interface EditorialPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  credit?: string;
  crop: { desktop: string; mobile: string };
}

export interface PortfolioProject {
  slug: ProjectSlug;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  summary: string;
  role: string;
  contribution: string[];
  technologies: string[];
  liveUrl?: string;
  poster: {
    src: string;
    alt: string;
    width: number;
    height: number;
    kind: "capture" | "process-diagram";
  };
  mobilePoster?: { src: string; alt: string; width: number; height: number };
  accent: string;
  problem: string;
  decisions: { title: string; body: string }[];
  evidenceNotes: string[];
  photographs: EditorialPhoto[];
}
