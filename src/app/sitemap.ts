import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site-origin";
import { projects } from "@/content/projects";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/contact/",
    "/privacy/",
    ...projects.map((project) => `/work/${project.slug}/`),
  ].map((path) => ({ url: `${siteOrigin}${path}` }));
}
