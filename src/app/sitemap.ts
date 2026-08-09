import type { MetadataRoute } from "next";

import { PUBLIC_SITEMAP_ROUTES, absoluteUrl } from "@/server/metadata/public";

// Static date: content updates are rare and per-rebuild timestamps are noise.
const LAST_MODIFIED = new Date("2026-01-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_SITEMAP_ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: LAST_MODIFIED,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
