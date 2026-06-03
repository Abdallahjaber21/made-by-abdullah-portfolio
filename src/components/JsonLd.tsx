import { siteConfig, activeSocials } from "@/config/site";

/**
 * Structured data (schema.org JSON-LD) for richer search results.
 * Emits a Person graph (who you are, where to find you) and a WebSite graph.
 * Server component — rendered once in the root layout.
 */
export default function JsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        email: `mailto:${siteConfig.email}`,
        url: siteConfig.url,
        address: {
          "@type": "PostalAddress",
          addressCountry: siteConfig.location,
        },
        sameAs: activeSocials().map((s) => s.href),
        knowsAbout: [
          "Software Engineering",
          "SaaS Platforms",
          "Backend Systems",
          "System Architecture",
          "Web Development",
          "Mobile Development",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: `${siteConfig.name} — ${siteConfig.role}`,
        inLanguage: "en",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored object — no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
