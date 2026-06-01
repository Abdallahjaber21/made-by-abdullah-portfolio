"use client";

import { useEffect, useState } from "react";
import { ACCENT_PRESETS } from "@/lib/theme";
import { useTheme } from "./ThemeProvider";
import { GeneralIcons } from "./icons";

export default function ThemeSwitcher() {
  const { accent, mode, setAccent, setMode } = useTheme();
  const [open, setOpen] = useState(false);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {open && (
        <div className="theme-panel" role="dialog" aria-label="Theme settings">
          <div className="tp-head">
            <span>Theme</span>
            <button
              className="tp-close"
              onClick={() => setOpen(false)}
              aria-label="Close theme settings"
            >
              ✕
            </button>
          </div>

          <div className="tp-section">Accent · preset</div>
          <div className="swatches">
            {ACCENT_PRESETS.map((p) => {
              const active = p.hex.toLowerCase() === accent.toLowerCase();
              return (
                <button
                  key={p.hex}
                  className={`swatch${active ? " is-active" : ""}`}
                  style={{ background: p.hex, color: p.hex }}
                  title={p.name}
                  aria-label={p.name}
                  aria-pressed={active}
                  onClick={() => setAccent(p.hex)}
                />
              );
            })}
          </div>

          <div className="tp-section">Appearance</div>
          <div className="mode-seg" role="radiogroup" aria-label="Appearance">
            <button
              role="radio"
              aria-checked={mode === "dark"}
              className={mode === "dark" ? "is-active" : ""}
              onClick={() => setMode("dark")}
            >
              Dark
            </button>
            <button
              role="radio"
              aria-checked={mode === "light"}
              className={mode === "light" ? "is-active" : ""}
              onClick={() => setMode("light")}
            >
              Light
            </button>
          </div>
        </div>
      )}

      <button
        className="theme-fab"
        aria-label="Theme settings"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <GeneralIcons.Sliders />
      </button>
    </>
  );
}
