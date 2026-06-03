import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * robots.txt served at /robots.txt. Allows all crawlers and points them at
 * the sitemap. Both derive their origin from siteConfig.url.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
