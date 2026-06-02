"use client";

import HeroFabric from "./canvas/HeroFabric";
import TelemetryHud from "./TelemetryHud";
import { useT } from "./LocaleProvider";

export default function Hero() {
  const t = useT();
  return (
    <section className="hero" data-screen-label="Hero">
      <HeroFabric />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-meta reveal">
          <span className="meta-pill">
            <span className="dot" /> {t.hero.pill}
          </span>
          <span>{t.hero.based}</span>
        </div>

        <h1>
          <span className="tline">
            <span>{t.hero.titleLine1}</span>
          </span>
          <span className="tline">
            <span>
              {t.hero.titleLine2a}
              <em>{t.hero.titleLine2em}</em>
            </span>
          </span>
        </h1>

        <div className="role-rotator reveal" aria-live="polite">
          {t.hero.roles.map((r) => (
            <span className="role" key={r}>
              {r}
            </span>
          ))}
        </div>

        <div className="cta-row reveal">
          <a className="btn btn-primary" href="#projects">
            {t.hero.ctaPrimary} <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#contact">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <TelemetryHud />

      <div className="hero-foot">
        <span>{t.hero.scroll}</span>
        <div className="scroll-indicator">
          <div className="line" />
          <span>↓</span>
        </div>
        <span>{t.hero.layer} · <b id="layer-label">{t.layers[0]}</b></span>
      </div>
    </section>
  );
}
