"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { Project } from "@/types/card";
import { GeneralIcons, stackIcon } from "./icons";
import { useT } from "./LocaleProvider";

const DWELL = 4200;

export default function ProjectRow({ project }: { project: Project }) {
  const t = useT();
  // Translated per-project copy, keyed by title; fall back to the English data.
  const tr = t.work[project.title as keyof typeof t.work];
  const typeLabel = tr?.typeLabel ?? project.typeLabel;
  const tag = tr?.tag ?? project.tag;
  const description = tr?.description ?? project.description;
  const { shots } = project;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const dragging = useRef(false);

  const isPhone = project.projectType === "mobile";
  const landscape = project.orientation === "landscape";
  const len = shots.length;

  const go = (d: number) => setIndex((i) => (i + d + len) % len);

  // Only start the slideshow once the project scrolls into view; reset on exit.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (!e.isIntersecting) setIndex(0);
      },
      { threshold: 0.45 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Auto-advance with synced progress bar (in-view + not paused only)
  useEffect(() => {
    if (!inView || paused || len < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let start: number | null = null;
    let raf = 0;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const pct = Math.min(1, (ts - start) / DWELL);
      if (barRef.current) barRef.current.style.width = `${pct * 100}%`;
      if (pct >= 1) setIndex((i) => (i + 1) % len);
      else raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, inView, len]);

  const onDown = (e: ReactPointerEvent) => {
    dragging.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onUp = (e: ReactPointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  const carousel = (
    <div
      className="media-carousel"
      ref={rootRef}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={() => (dragging.current = false)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="media-progress">
        <div className="bar" ref={barRef} />
      </div>
      {shots.map((s, i) => {
        const cls = i === index ? " is-active" : i === (index - 1 + len) % len ? " is-prev" : "";
        return (
          <div className={`media-slide${cls}`} key={s.src} aria-hidden={i !== index}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={`${project.title} — ${s.label}`} loading="lazy" draggable={false} />
            <div className="slide-caption">
              <span>
                {s.label}
                {s.sub ? ` · ${s.sub}` : ""}
              </span>
              <span className="step">
                {String(i + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="proj reveal" data-screen-label={`Project · ${project.title}`}>
      <div className="proj-meta">
        <div className="proj-type">{typeLabel}</div>
        <div className="proj-tag">{tag}</div>
        <h3>{project.title}</h3>
        <p>{description}</p>

        <div className="proj-stats">
          {project.stats.map((st, i) => (
            <div className="stat" key={st.l}>
              <div className="n">{st.n}</div>
              <span className="l">{tr?.stats[i] ?? st.l}</span>
            </div>
          ))}
        </div>

        <div className="proj-tech">
          {project.stack.map((t) => {
            const Logo = stackIcon(t);
            return (
              <span className="tag" key={t}>
                {Logo && <Logo />}
                {t}
              </span>
            );
          })}
        </div>

        {project.projectUrl && (
          <a className="proj-link" href={project.projectUrl} target="_blank" rel="noopener noreferrer">
            {t.projects.visit} <GeneralIcons.External style={{ width: 14, height: 14 }} />
          </a>
        )}
      </div>

      <div className="proj-visual">
        <div className={`device-stage${isPhone ? "" : " is-web"}`}>
          <span className="stage-label">
            {isPhone
              ? `${landscape ? t.projects.landscape : t.projects.portrait} · ${t.projects.swipe}`
              : `${t.projects.webApp} · ${t.projects.swipe}`}
          </span>
          <span className="stage-count">
            {len} {isPhone ? t.projects.screens : t.projects.views}
          </span>

          {isPhone ? (
            <div className={`device device-phone${landscape ? " is-landscape" : ""}`}>
              <div className="device-screen">
                <div className="notch" />
                {carousel}
              </div>
            </div>
          ) : (
            <div className="device device-browser">
              <div className="device-bar">
                <div className="traffic">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="url">{project.urlLabel || project.title.toLowerCase()}</div>
                <span style={{ color: "var(--accent)" }}>{t.projects.live}</span>
              </div>
              <div className="device-body">{carousel}</div>
            </div>
          )}

          <div className="phone-dots">
            {shots.map((s, i) => (
              <button
                key={s.src}
                className={`dot${i === index ? " is-active" : ""}`}
                aria-label={`Show ${s.label}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <div className="phone-nav-row">
            <button className="phone-arrow" aria-label="Previous screen" onClick={() => go(-1)}>
              ←
            </button>
            <span>
              {String(index + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
            </span>
            <button className="phone-arrow" aria-label="Next screen" onClick={() => go(1)}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
