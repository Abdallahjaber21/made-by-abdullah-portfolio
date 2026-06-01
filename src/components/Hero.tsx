import HeroFabric from "./canvas/HeroFabric";
import TelemetryHud from "./TelemetryHud";

const ROLES = [
  "Staff software engineer",
  "Full-stack architect",
  "SaaS platform builder",
  "AI-enhanced product engineer",
  "Performance & systems specialist",
];

export default function Hero() {
  return (
    <section className="hero" data-screen-label="Hero">
      <HeroFabric />
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-meta reveal">
          <span className="meta-pill">
            <span className="dot" /> STAFF SOFTWARE ENGINEER · 7+ YEARS
          </span>
          <span>BASED IN LEBANON · WORKING WORLDWIDE</span>
        </div>

        <h1>
          <span className="tline">
            <span>Engineering,</span>
          </span>
          <span className="tline">
            <span>
              calmly. <em>At scale.</em>
            </span>
          </span>
        </h1>

        <div className="role-rotator reveal" aria-live="polite">
          {ROLES.map((r) => (
            <span className="role" key={r}>
              {r}
            </span>
          ))}
        </div>

        <div className="cta-row reveal">
          <a className="btn btn-primary" href="#projects">
            See selected work <span className="arrow">→</span>
          </a>
          <a className="btn btn-ghost" href="#contact">
            Start a project
          </a>
        </div>
      </div>

      <TelemetryHud />

      <div className="hero-foot">
        <span>SCROLL TO DESCEND</span>
        <div className="scroll-indicator">
          <div className="line" />
          <span>↓</span>
        </div>
        <span>LAYER · <b id="layer-label">SURFACE</b></span>
      </div>
    </section>
  );
}
