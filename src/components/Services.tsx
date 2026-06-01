import type { ComponentType, SVGProps } from "react";
import { GeneralIcons } from "./icons";

interface Service {
  num: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  body: string;
  tags: string[];
  wide?: boolean;
}

const SERVICES: Service[] = [
  {
    num: "/01 · Product engineering",
    icon: GeneralIcons.Layout,
    title: "Staff-level product engineering",
    body: "One engineer accountable for outcomes — from data model and API contract through interaction, state, and shipped UI. Deep involvement, written-down decisions, working software at every gate.",
    tags: ["Laravel", "Next.js", "TypeScript", "React", "PostgreSQL", "REST · APIs"],
    wide: true,
  },
  {
    num: "/02 · SaaS",
    icon: GeneralIcons.Layers,
    title: "SaaS platform development",
    body: "Multi-tenant platforms built to grow — auth, billing surfaces, background jobs, and clean module boundaries.",
    tags: ["Multi-tenant", "Laravel", "Next.js", "Queues"],
  },
  {
    num: "/03 · AI",
    icon: GeneralIcons.Sparkles,
    title: "AI-powered application development",
    body: "LLM integrations and agentic workflows wired into real products — retrieval, tool-use, and evals, not demos.",
    tags: ["LLM integration", "Agents", "RAG", "Evals"],
  },
  {
    num: "/04 · Architecture",
    icon: GeneralIcons.Share,
    title: "System architecture & modernization",
    body: "Boundaries, contracts, and staged migrations that move legacy systems forward without downtime.",
    tags: ["Yii2 → Next.js", "Migrations", "ADRs", "Refactoring"],
  },
  {
    num: "/05 · Performance",
    icon: GeneralIcons.Gauge,
    title: "Performance optimization",
    body: "Query tuning, indexing, caching, and profiling — slow products and slow pipelines made fast.",
    tags: ["Query tuning", "Indexing", "Caching", "Profiling"],
  },
  {
    num: "/06 · Leadership",
    icon: GeneralIcons.Users,
    title: "Technical leadership & consulting",
    body: "Staff-level guidance — architecture reviews, standards, mentoring, and a second pair of eyes on the decisions that are expensive to reverse.",
    tags: ["Reviews", "Standards", "Mentoring", "Advisory"],
  },
];

export default function Services() {
  return (
    <section id="services" data-screen-label="Services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">02 · Services</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              What I&apos;m hired for.
            </h2>
          </div>
          <p className="lead reveal">
            Engagements run from focused diagnostics to multi-quarter platform builds. What stays
            constant: deep involvement, clear decisions, and working software at every step.
          </p>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article className={`svc-card reveal${s.wide ? " wide" : ""}`} key={s.num}>
              <div className="svc-head">
                <span className="svc-num">{s.num}</span>
                <div className="gizmo">
                  <s.icon />
                </div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
