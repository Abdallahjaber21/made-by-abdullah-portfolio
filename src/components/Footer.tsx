"use client";

import { siteConfig } from "@/config/site";
import { useLocale } from "./LocaleProvider";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="cinematic-footer">
      <span>{t.footer.rights} · {siteConfig.name}</span>
      <span>
        {t.header.role} · {siteConfig.location}
      </span>
    </footer>
  );
}
