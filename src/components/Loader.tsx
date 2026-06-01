"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { siteConfig } from "@/config/site";

/**
 * Pre-homepage loading screen — a port of the made-by-abdullah v1 loader.
 *
 * The four polylines draw themselves on with a staggered stroke-dashoffset
 * sweep, the label pulses character-by-character, then the whole overlay
 * fades up and out. Unlike v1 (hardcoded off-white), every stroke and the
 * label inherit `var(--accent)`, so the loader is tinted by the active theme
 * preset — red by default — applied before first paint by the no-flash script
 * in layout.tsx.
 *
 * Reduced-motion shows a static mark and dismisses quickly. Once dismissed it
 * unmounts (sessionStorage gate) so client navigations don't replay it.
 */

// The original v1 monogram — four polylines forming an abstract "ecosystem".
const POINTS = [
  "0 0 0 34.9162585 31.8888889 54.0252776 63.7777778 34.9162585 95.7777778 54.0252776 95.7777778 88.9162585 127.5 108.5 159.555556 88.9162585",
  "95.7777778 88.9162585 63.7777778 108.025278 63.7777778 142.941536 32 162.025278",
  "63.8888889 142.945268 95.7777778 162.025278 127.5 142.945268 160 162.025278 159.555556 196.970546 127.666667 216.079565",
  "160 162.025278 191.444444 142.941536 223.555556 162.054287 254.777778 142.945268",
];

const LABEL = "Loading";

export default function Loader() {
  // Plays on every fresh page load. (No session gate — a loading splash is
  // expected to appear on load; gating it made reloads skip the animation.)
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<SVGPolylineElement[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);
  // Strict Mode (dev) mounts effects twice; this guard makes the second
  // invocation a no-op so the timeline isn't torn down and re-run instantly.
  const startedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || startedRef.current) return;
    startedRef.current = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Lock scroll while the loader is up.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dismiss = () =>
      gsap.to(root, {
        opacity: 0,
        scale: 0.97,
        y: -16,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => setDone(true),
      });

    // Restore scroll once we're truly done (real unmount). Cleanup must NOT
    // tear down the timer/timeline — under Strict Mode the first run's cleanup
    // fires while `startedRef` already blocks the re-run, which would otherwise
    // freeze the loader on screen forever.
    const restoreScroll = () => {
      document.body.style.overflow = prevOverflow;
    };

    if (reduced) {
      setTimeout(() => {
        dismiss();
        restoreScroll();
      }, 600);
      return;
    }

    gsap.context(() => {
      const lines = lineRefs.current;

      // Prime every line to its fully-undrawn state FIRST, in one synchronous
      // pass, then reveal the mark. The SVG is rendered hidden (opacity:0 via
      // CSS) so we never flash the fully-drawn paths before the dashes are set.
      const lengths = lines.map((line) => {
        const len = line.getTotalLength();
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
        return len;
      });
      gsap.set(".loader-mark", { opacity: 1 });

      // Draw → hold → un-draw → fade, all on one timeline.
      const tl = gsap.timeline({
        onComplete: () => {
          dismiss();
          restoreScroll();
        },
      });

      // 1) Draw on (staggered).
      lines.forEach((line, i) => {
        tl.to(line, { strokeDashoffset: 0, duration: 1.1, ease: "power1.inOut" }, i * 0.15);
      });

      // 2) Hold the completed mark, then 3) un-draw it (reverse the same sweep).
      const drawnAt = (lines.length - 1) * 0.15 + 1.1; // when the last line finishes
      lines.forEach((line, i) => {
        tl.to(
          line,
          { strokeDashoffset: lengths[i], duration: 1.0, ease: "power1.inOut" },
          drawnAt + 0.8 + i * 0.12 // 0.8s hold, then staggered retract
        );
      });

      // Pulse the label one character at a time (manual split — v2 ships no
      // SplitText plugin) for the lifetime of the timeline.
      const chars = labelRef.current
        ? Array.from(labelRef.current.querySelectorAll<HTMLSpanElement>(".ld-char"))
        : [];
      gsap.set(chars, { opacity: 1 });
      chars.forEach((ch, i) => {
        gsap.to(ch, {
          opacity: 0.3,
          duration: 0.5,
          ease: "power3.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * 0.05,
        });
      });
    }, root);
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} className="loader-screen" role="status" aria-label="Loading">
      <svg
        viewBox="0 0 256 218"
        xmlns="http://www.w3.org/2000/svg"
        className="loader-mark"
        aria-hidden="true"
      >
        <g fill="none" strokeWidth={1}>
          {POINTS.map((points, i) => (
            <polyline
              key={i}
              points={points}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              ref={(el) => {
                if (el) lineRefs.current[i] = el;
              }}
            />
          ))}
        </g>
      </svg>

      <span ref={labelRef} className="loader-label">
        {LABEL.split("").map((c, i) => (
          <span className="ld-char" key={i}>
            {c}
          </span>
        ))}
      </span>

      <span className="loader-name">{siteConfig.name}</span>
    </div>
  );
}
