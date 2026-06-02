import { en, type Dict } from "./en";
import { ar } from "./ar";
import type { Locale } from "@/lib/locale";

export type { Dict } from "./en";

export const dictionaries: Record<Locale, Dict> = { en, ar };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale] ?? en;
}
