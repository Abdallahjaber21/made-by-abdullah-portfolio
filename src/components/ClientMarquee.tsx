"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

export interface ClientLogo {
  name: string;
  src: string;
}

const SPEED = 40; // px per second of auto-scroll

/**
 * Auto-scrolling client logo marquee that the user can also grab and pull.
 *
 * Both the auto-scroll and the drag drive a single `offset` (px) applied via
 * translateX in one rAF loop — so dragging and auto-scroll share the same
 * source of truth and there's never a snap on release. The track is rendered
 * twice and the offset is kept within one track width, so it wraps seamlessly
 * in both directions.
 */
export default function ClientMarquee({ logos }: { logos: ClientLogo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const startX = useRef(0);
  const startOffset = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last: number | null = null;

    const halfWidth = () => track.scrollWidth / 2 || 1;

    const normalize = () => {
      const w = halfWidth();
      // keep offset in (-w, 0] so the duplicated copy always covers the gap
      while (offset.current <= -w) offset.current += w;
      while (offset.current > 0) offset.current -= w;
    };

    const tick = (ts: number) => {
      if (last === null) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;
      if (!dragging.current && !hovering.current && !reduce) {
        offset.current -= SPEED * dt;
      }
      normalize();
      track.style.transform = `translate3d(${offset.current}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    startOffset.current = offset.current;
    wrapRef.current?.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    offset.current = startOffset.current + (e.clientX - startX.current);
  };
  const onUp = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    wrapRef.current?.releasePointerCapture?.(e.pointerId);
  };

  const Row = ({ aria }: { aria?: boolean }) => (
    <>
      {logos.map((c, i) => (
        <span
          className="client-logo"
          key={`${c.name}-${i}`}
          title={c.name}
          aria-hidden={aria ? true : undefined}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.src} alt={c.name} loading="lazy" draggable={false} />
        </span>
      ))}
    </>
  );

  return (
    <div
      ref={wrapRef}
      className="clients-marquee-wrap marquee-wrap is-draggable"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerEnter={() => (hovering.current = true)}
      onPointerLeave={() => {
        hovering.current = false;
        dragging.current = false;
      }}
      style={{ touchAction: "pan-y" }}
    >
      <div className="marquee marquee--manual" ref={trackRef}>
        <Row />
        <Row aria />
      </div>
    </div>
  );
}
