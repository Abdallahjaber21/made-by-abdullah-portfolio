import type { SVGProps } from "react";

/**
 * GeneralIcons — UI/stroke icons. Usage: <GeneralIcons.Sliders className="..." />
 *
 * To add one: paste the inner SVG markup (paths/shapes) of a 24×24 stroke icon
 * as a new entry below. They inherit `currentColor` and stroke styling.
 */
function Stroke({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

type P = SVGProps<SVGSVGElement>;

export const GeneralIcons = {
  Layout: (p: P) => (
    <Stroke {...p}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </Stroke>
  ),
  Layers: (p: P) => (
    <Stroke {...p}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
    </Stroke>
  ),
  Sparkles: (p: P) => (
    <Stroke {...p}>
      <path d="M12 3l1.9 4.8L19 9.7l-4.8 1.9L12 16.5l-2.2-4.9L5 9.7l5.1-1.9L12 3Z" />
      <path d="M19 14.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
    </Stroke>
  ),
  Share: (p: P) => (
    <Stroke {...p}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </Stroke>
  ),
  Gauge: (p: P) => (
    <Stroke {...p}>
      <path d="M12 14 19 7" />
      <path d="M3.4 16a9 9 0 1 1 17.2 0" />
      <circle cx="12" cy="14" r="1.4" />
    </Stroke>
  ),
  Users: (p: P) => (
    <Stroke {...p}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M16.5 20a5.5 5.5 0 0 0-2-4.3" />
    </Stroke>
  ),
  Sliders: (p: P) => (
    <Stroke {...p}>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </Stroke>
  ),
  Arrow: (p: P) => (
    <Stroke {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  ),
  External: (p: P) => (
    <Stroke {...p}>
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </Stroke>
  ),
  Download: (p: P) => (
    <Stroke {...p}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </Stroke>
  ),
  Mail: (p: P) => (
    <Stroke {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Stroke>
  ),
} as const;
