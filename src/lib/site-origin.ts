function parseOrigin(value: string | undefined): string | undefined {
  if (!value?.trim()) return;
  try {
    const url = new URL(value.trim());
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username || url.password || url.pathname !== "/" || url.search || url.hash ||
      url.hostname === "your-project.vercel.app"
    ) return;
    return url.origin;
  } catch {
    return;
  }
}

// Used only by server metadata and static routes, never the shared client profile.
// Vercel's production domain stays stable across preview deployments.
export function resolveSiteOrigin(siteUrl?: string, productionDomain?: string): string {
  const configured = parseOrigin(siteUrl);
  if (configured) return configured;
  const vercel = parseOrigin(productionDomain ? `https://${productionDomain}` : undefined);
  if (vercel) return vercel;
  if (siteUrl?.trim() || productionDomain?.trim()) {
    throw new Error("Set NEXT_PUBLIC_SITE_URL to a plain http(s) origin, with no Markdown, path or placeholder domain.");
  }
  return "http://localhost:3001";
}

export const siteOrigin = resolveSiteOrigin(
  process.env.NEXT_PUBLIC_SITE_URL,
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
);
