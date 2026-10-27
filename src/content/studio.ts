export const studio = {
  headline: { opening: "Made to", bridge: "feel", ending: "different." },
  introduction: ["I design and build websites", "with character."],
  descriptor: "Creative developer / India",
  cta: "Explore my work",
  artwork: {
    desktop: { width: 1672, height: 941, widths: [1280, 1672], focalPoint: "50% 50%" },
    portrait: { width: 941, height: 1672, widths: [600, 941], focalPoint: "20% 50%" },
  },
} as const;

export const sceneSrcSet = (composition: "desktop" | "portrait", format: "avif" | "webp") =>
  studio.artwork[composition].widths.map(width => `/media/studio/${composition}-${width}.${format} ${width}w`).join(", ");
