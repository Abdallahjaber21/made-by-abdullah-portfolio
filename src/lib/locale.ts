export type Locale = "en" | "ar";

export const LOCALES: Locale[] = ["en", "ar"];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_KEY = "mba.locale";

/** Text direction for a locale. Arabic is the only RTL language here. */
export function dirFor(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

/** Apply <html lang> + <html dir> for a locale. Mirrors applyMode in theme.ts. */
export function applyLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  const r = document.documentElement;
  r.setAttribute("lang", locale);
  r.setAttribute("dir", dirFor(locale));
}

/** Normalize an unknown value to a supported locale. */
export function coerceLocale(value: string | null | undefined): Locale {
  return value === "ar" ? "ar" : "en";
}
