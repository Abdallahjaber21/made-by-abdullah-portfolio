"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  LOCALE_KEY,
  applyLocale,
  coerceLocale,
  dirFor,
  type Locale,
} from "@/lib/locale";
import { getDict } from "@/i18n";
import type { Dict } from "@/i18n/en";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** The active dictionary for the current locale. */
  t: Dict;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside <LocaleProvider>");
  return ctx;
}

/** Shorthand: `const t = useT();` then `t.hero.ctaPrimary`. */
export function useT(): Dict {
  return useLocale().t;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Hydrate from localStorage and re-apply (idempotent with the no-flash script).
  useEffect(() => {
    const stored = coerceLocale(localStorage.getItem(LOCALE_KEY));
    setLocaleState(stored);
    applyLocale(stored);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    applyLocale(next);
    try {
      localStorage.setItem(LOCALE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  const toggleLocale = () => setLocale(locale === "en" ? "ar" : "en");

  const value: LocaleContextValue = {
    locale,
    dir: dirFor(locale),
    t: getDict(locale),
    setLocale,
    toggleLocale,
  };

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
