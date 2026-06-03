import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Sitemap served at /sitemap.xml. Lists the public, indexable routes.
 * URLs are built from siteConfig.url so a single env var (NEXT_PUBLIC_SITE_URL)
 * controls the whole site's canonical origin.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Build-time stamp. Static (not `new Date()`) so repeat builds are
  // deterministic; bump when content changes meaningfully.
  const lastModified = "2026-06-03";

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/work`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
