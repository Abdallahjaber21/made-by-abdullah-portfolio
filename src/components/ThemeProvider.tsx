"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  ACCENT_KEY,
  MODE_KEY,
  DEFAULT_ACCENT,
  DEFAULT_MODE,
  applyAccent,
  applyMode,
  type Mode,
} from "@/lib/theme";

interface ThemeContextValue {
  accent: string;
  mode: Mode;
  setAccent: (hex: string) => void;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);
  const [mode, setModeState] = useState<Mode>(DEFAULT_MODE);

  // Hydrate from localStorage and re-apply (idempotent with the no-flash script)
  useEffect(() => {
    const storedAccent = localStorage.getItem(ACCENT_KEY) || DEFAULT_ACCENT;
    const storedMode = (localStorage.getItem(MODE_KEY) as Mode) || DEFAULT_MODE;
    setAccentState(storedAccent);
    setModeState(storedMode);
    applyAccent(storedAccent);
    applyMode(storedMode);
  }, []);

  const setAccent = (hex: string) => {
    setAccentState(hex);
    applyAccent(hex);
    localStorage.setItem(ACCENT_KEY, hex);
  };

  const setMode = (next: Mode) => {
    setModeState(next);
    applyMode(next);
    localStorage.setItem(MODE_KEY, next);
  };

  return (
    <ThemeContext.Provider value={{ accent, mode, setAccent, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
