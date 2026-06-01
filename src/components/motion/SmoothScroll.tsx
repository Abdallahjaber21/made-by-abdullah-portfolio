"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) =>
  Array.from(c.querySelectorAll<T>(s));

// Shared Lenis instance: set by the engine effect, read by the per-route effect.
let lenisInstance: Lenis | null = null;
export const HOME_SCROLL_KEY = "mba.homeScroll";

/**
 * Motion orchestrator (ported from the static site's motion.js).
 *
 * Effect A (mount once): Lenis smooth scroll + GSAP ticker, topbar scrolled
 * state, and the cursor blob — all persistent across client navigation.
 *
 * Effect B (per route): section reveals, hero entrance, role rotator, stat
 * count-ups, manifesto scrub, project parallax, and service-card glow —
 * rebuilt whenever the pathname changes so a new page's content reveals
 * correctly. Reduced-motion is honored throughout.
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  // ---- Effect A: persistent scroll engine --------------------------------
  useEffect(() => {
    const reduced = prefersReduced();
    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | null = null;
    const tickerFn = (time: number) => lenis?.raf(time * 1000);
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.25,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    }
    lenisInstance = lenis;

    const onScrollBar = () => {
      const bar = document.querySelector(".topbar");
      const y = window.scrollY || document.documentElement.scrollTop;
      bar?.classList.toggle("scrolled", y > 40);
    };
    onScrollBar();
    window.addEventListener("scroll", onScrollBar, { passive: true });

    // Cursor blob (fine pointers only)
    let blob: HTMLDivElement | null = null;
    let rafId = 0;
    let blobMove: ((e: PointerEvent) => void) | null = null;
    if (!reduced && !window.matchMedia("(pointer: coarse)").matches) {
      blob = document.createElement("div");
      blob.className = "cursor-blob";
      document.body.appendChild(blob);
      let tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
      blobMove = (e) => { tx = e.clientX; ty = e.clientY; };
      document.addEventListener("pointermove", blobMove);
      const tick = () => {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        if (blob) { blob.style.left = `${cx}px`; blob.style.top = `${cy}px`; }
        rafId = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      window.removeEventListener("scroll", onScrollBar);
      if (blobMove) document.removeEventListener("pointermove", blobMove);
      if (rafId) cancelAnimationFrame(rafId);
      if (blob) blob.remove();
      if (lenis) {
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
      }
      lenisInstance = null;
    };
  }, []);

  // ---- Effect B: per-route animations ------------------------------------
  useEffect(() => {
    const reduced = prefersReduced();

    // Route scroll: /work opens at the very top; home restores the position
    // the visitor clicked "View all work" from.
    const scrollTo = (y: number) => {
      if (lenisInstance) lenisInstance.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    };
    if (pathname === "/work") {
      scrollTo(0);
    } else if (pathname === "/") {
      const saved = sessionStorage.getItem(HOME_SCROLL_KEY);
      if (saved) {
        sessionStorage.removeItem(HOME_SCROLL_KEY);
        const y = parseInt(saved, 10) || 0;
        requestAnimationFrame(() => requestAnimationFrame(() => scrollTo(y)));
      }
    }

    function splitWords(el: HTMLElement): HTMLElement[] {
      if (el.dataset.split === "1") return $$<HTMLElement>(".split-word", el);
      const text = el.textContent || "";
      el.textContent = "";
      const frag = document.createDocumentFragment();
      text.split(/(\s+)/).forEach((part) => {
        if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
        const wrap = document.createElement("span");
        wrap.className = "word-wrap";
        const word = document.createElement("span");
        word.className = "split-word";
        word.textContent = part;
        wrap.appendChild(word);
        frag.appendChild(wrap);
      });
      el.appendChild(frag);
      el.dataset.split = "1";
      return $$<HTMLElement>(".split-word", el);
    }

    const ctx = gsap.context(() => {
      const lineSpans = $$(".hero h1 .tline > span");
      if (lineSpans.length) {
        if (reduced) gsap.set(lineSpans, { y: 0 });
        else gsap.to(lineSpans, { y: 0, duration: 1.1, ease: "expo.out", stagger: 0.12, delay: 0.3 });
      }

      const heroReveal = $$(".hero .reveal");
      if (heroReveal.length) {
        if (reduced) gsap.set(heroReveal, { opacity: 1, y: 0 });
        else gsap.fromTo(heroReveal, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.0, ease: "expo.out", stagger: 0.08, delay: 0.6 });
      }

      const isTitle = (el: Element) => el.matches(".section-head h2, .establish");
      const reveals = $$(".reveal").filter((el) => !el.closest(".hero") && !isTitle(el));
      reveals.forEach((el) => {
        if (reduced) { gsap.set(el, { opacity: 1, y: 0 }); return; }
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 1.0, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      $$<HTMLElement>(".section-head h2, .establish").forEach((h) => {
        const hasMarkup = !!h.querySelector("em, br");
        if (reduced) { gsap.set(h, { opacity: 1, y: 0 }); return; }
        if (hasMarkup) {
          gsap.fromTo(h, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 1.0, ease: "expo.out",
            scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" },
          });
          return;
        }
        gsap.set(h, { opacity: 1, y: 0 });
        const words = splitWords(h);
        gsap.fromTo(words, { y: "110%", opacity: 0 }, {
          y: "0%", opacity: 1, duration: 1.0, ease: "expo.out", stagger: 0.04,
          scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });

      $$<HTMLElement>(".stat .n[data-value]").forEach((el) => {
        const target = parseFloat(el.dataset.value || "");
        if (Number.isNaN(target)) return;
        const suffix = el.dataset.suffix || "";
        if (reduced) { if (el.firstChild) el.firstChild.nodeValue = `${target}${suffix}`; return; }
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el, start: "top 90%", once: true,
          onEnter: () => gsap.to(obj, {
            v: target, duration: 1.6, ease: "expo.out",
            onUpdate: () => {
              const out = target % 1 === 0 ? Math.round(obj.v) : obj.v.toFixed(1);
              if (el.firstChild) el.firstChild.nodeValue = `${out}${suffix}`;
            },
          }),
        });
      });

      if (!reduced) {
        $$(".statement").forEach((s) => {
          gsap.fromTo(s, { opacity: 0.15, x: -20 }, {
            opacity: 1, x: 0, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: s, start: "top 82%", end: "top 35%", scrub: 1 },
          });
        });
        $$(".proj-visual").forEach((el) => {
          gsap.fromTo(el, { y: 50, opacity: 0.5 }, {
            y: -50, opacity: 1, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      }
    });

    // Role rotator
    let rotatorTimer: ReturnType<typeof setInterval> | null = null;
    const rotator = document.querySelector(".role-rotator");
    if (rotator) {
      const roles = $$<HTMLElement>(".role", rotator);
      if (roles.length) {
        roles[0].classList.add("is-active");
        if (!reduced && roles.length > 1) {
          let i = 0;
          rotatorTimer = setInterval(() => {
            const cur = roles[i];
            i = (i + 1) % roles.length;
            const next = roles[i];
            cur.classList.remove("is-active");
            cur.classList.add("is-leaving");
            next.classList.add("is-active");
            setTimeout(() => cur.classList.remove("is-leaving"), 600);
          }, 2600);
        }
      }
    }

    // Service-card cursor glow (rebind per page). Buttons use a plain CSS
    // hover — no magnetic cursor-follow — for a calmer feel.
    const glow = $$<HTMLElement>(".svc-card").map((card) => {
      const fn = (e: PointerEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      card.addEventListener("pointermove", fn);
      return { card, fn };
    });

    const refresh = setTimeout(() => ScrollTrigger.refresh(), 500);

    return () => {
      clearTimeout(refresh);
      ctx.revert();
      if (rotatorTimer) clearInterval(rotatorTimer);
      glow.forEach(({ card, fn }) => card.removeEventListener("pointermove", fn));
    };
  }, [pathname]);

  return null;
}
