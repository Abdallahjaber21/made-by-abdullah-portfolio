"use client";

import type { ComponentType, SVGProps } from "react";
import { GeneralIcons } from "./icons";
import { useT } from "./LocaleProvider";

type ServiceKey = "product" | "saas" | "ai" | "architecture" | "performance" | "leadership";

const SERVICE_META: Array<{
  key: ServiceKey;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tags: string[];
  wide?: boolean;
}> = [
  {
    key: "product",
    icon: GeneralIcons.Layout,
    tags: ["Laravel", "Next.js", "TypeScript", "React", "PostgreSQL", "REST · APIs"],
    wide: true,
  },
  { key: "saas", icon: GeneralIcons.Layers, tags: ["Multi-tenant", "Laravel", "Next.js", "Queues"] },
  { key: "ai", icon: GeneralIcons.Sparkles, tags: ["LLM integration", "Agents", "RAG", "Evals"] },
  {
    key: "architecture",
    icon: GeneralIcons.Share,
    tags: ["Yii2 → Next.js", "Migrations", "ADRs", "Refactoring"],
  },
  {
    key: "performance",
    icon: GeneralIcons.Gauge,
    tags: ["Query tuning", "Indexing", "Caching", "Profiling"],
  },
  {
    key: "leadership",
    icon: GeneralIcons.Users,
    tags: ["Reviews", "Standards", "Mentoring", "Advisory"],
  },
];

export default function Services() {
  const t = useT();
  return (
    <section id="services" data-screen-label="Services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.services.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              {t.services.heading}
            </h2>
          </div>
        </div>

        <div className="svc-grid">
          {SERVICE_META.map((s) => {
            const copy = t.services.items[s.key];
            return (
              <article className={`svc-card reveal${s.wide ? " wide" : ""}`} key={s.key}>
                <div className="svc-head">
                  <span className="svc-num">{copy.num}</span>
                  <div className="gizmo">
                    <s.icon />
                  </div>
                </div>
                <h3>{copy.title}</h3>
                <p>{copy.body}</p>
                <div className="tags">
                  {s.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
