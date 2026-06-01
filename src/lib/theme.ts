export type Mode = "dark" | "light";

export interface AccentPreset {
  hex: string;
  /** deeper shade used for gradients / the 3D scene */
  deep: string;
  name: string;
}

/** The six accent presets from the original Tweaks panel. */
export const ACCENT_PRESETS: AccentPreset[] = [
  { hex: "#a160c5", deep: "#7a3d9b", name: "Brand purple" },
  { hex: "#7a3d9b", deep: "#3d1f55", name: "Deep violet" },
  { hex: "#8c93cf", deep: "#5d63a8", name: "Lavender" },
  { hex: "#5d8dff", deep: "#3358cf", name: "Electric blue" },
  { hex: "#22d3ee", deep: "#0e8aa2", name: "Cyan" },
  { hex: "#d62d49", deep: "#7c1424", name: "Signal red" },
];

export const DEFAULT_ACCENT = ACCENT_PRESETS[0].hex;
export const DEFAULT_MODE: Mode = "dark";

export const ACCENT_KEY = "mba.accent";
export const MODE_KEY = "mba.mode";

export function deepFor(hex: string): string {
  const found = ACCENT_PRESETS.find(
    (p) => p.hex.toLowerCase() === hex.toLowerCase()
  );
  return found ? found.deep : hex;
}

/** 8-digit hex alpha helper: "#a160c5" + 0.55 -> "#a160c58c". */
function withAlpha(hex: string, alpha: number): string {
  const a = Math.round(Math.max(0, Math.min(1, alpha)) * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
}

/** Apply an accent to :root CSS variables and notify the 3D scenes. */
export function applyAccent(hex: string): void {
  if (typeof document === "undefined") return;
  const r = document.documentElement;
  const deep = deepFor(hex);
  r.style.setProperty("--accent", hex);
  r.style.setProperty("--accent-deep", deep);
  r.style.setProperty("--accent-glow", withAlpha(hex, 0.55));
  r.style.setProperty("--accent-soft", withAlpha(hex, 0.12));
  r.style.setProperty(
    "--grad-purple",
    `linear-gradient(135deg, ${deep} 0%, ${hex} 100%)`
  );
  window.dispatchEvent(
    new CustomEvent("themechange", { detail: { accent: hex, deep } })
  );
}

export function applyMode(mode: Mode): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-mode", mode);
}
