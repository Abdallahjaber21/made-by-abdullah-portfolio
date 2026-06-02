"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { useLocale } from "./LocaleProvider";

/**
 * EN/AR switcher is hidden for now — the full i18n machinery ships (site
 * defaults to English) but the toggle stays off until the Arabic copy is
 * polished. Flip this to `true` to re-expose it.
 */
const LOCALE_TOGGLE_ENABLED = false;

/** `base` is "" on the home page (in-page anchors) and "/" elsewhere. */
export default function Topbar({ base = "" }: { base?: string }) {
  const { locale, setLocale, t } = useLocale();
  const home = base || "#top";
  const [first, ...rest] = siteConfig.name.split(" ");

  const NAV: Array<[string, string, string]> = [
    ["about", "01", t.nav.about],
    ["services", "02", t.nav.services],
    ["projects", "03", t.nav.work],
    ["clients", "04", t.nav.clients],
    ["approach", "05", t.nav.approach],
    ["contact", "06", t.nav.contact],
  ];

  return (
    <header className="topbar" role="banner">
      <Link className="brand" href={home} aria-label={t.header.home}>
        <span className="brand-mark">{first.charAt(0)}</span>
        <span className="brand-name">
          <b>
            {/* Availability dot now sits on the name (top-left status). */}
            <span className="brand-dot" title={t.header.available} aria-hidden="true" />
            {siteConfig.name}
          </b>{" "}
          <span>· {rest.length ? t.header.role : siteConfig.role}</span>
        </span>
      </Link>
      <nav className="nav" aria-label={t.header.primaryNav}>
        {NAV.map(([id, num, label]) => (
          <Link key={id} href={`${base}#${id}`} data-num={num}>
            {label}
          </Link>
        ))}
      </nav>
      {LOCALE_TOGGLE_ENABLED ? (
        <div className="lang-toggle" role="group" aria-label={t.header.localeToggle}>
          <button
            type="button"
            className={locale === "en" ? "is-active" : ""}
            aria-pressed={locale === "en"}
            onClick={() => setLocale("en")}
          >
            EN
          </button>
          <button
            type="button"
            className={locale === "ar" ? "is-active" : ""}
            aria-pressed={locale === "ar"}
            onClick={() => setLocale("ar")}
          >
            ع
          </button>
        </div>
      ) : (
        /* Keeps the brand left-aligned while the toggle is hidden. */
        <span aria-hidden="true" />
      )}
    </header>
  );
}
