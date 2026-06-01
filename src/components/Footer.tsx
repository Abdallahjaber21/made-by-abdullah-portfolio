import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="cinematic-footer">
      <span>© 2026 · {siteConfig.name}</span>
      <span>
        {siteConfig.role} · {siteConfig.location}
      </span>
    </footer>
  );
}
