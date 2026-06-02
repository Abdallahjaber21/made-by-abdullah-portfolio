"use client";

import { PROJECTS } from "@/data/projects";
import ProjectRow from "./ProjectRow";
import ViewAllWork from "./ViewAllWork";
import { useT } from "./LocaleProvider";

const FEATURED = 3;

/** `all` renders every project (the /work page); otherwise a featured subset. */
export default function Projects({ all = false }: { all?: boolean }) {
  const t = useT();
  const list = all ? PROJECTS : PROJECTS.slice(0, FEATURED);

  return (
    <section id="projects" data-screen-label="Projects">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">
              {all ? t.projects.eyebrowAll : t.projects.eyebrowRecent}
            </span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              {all ? (
                <>
                  {t.projects.headingAllA}
                  <br />
                  {t.projects.headingAllB}
                </>
              ) : (
                <>
                  {t.projects.headingRecentA}
                  <br />
                  {t.projects.headingRecentB}
                </>
              )}
            </h2>
          </div>
        </div>

        {list.map((p) => (
          <ProjectRow key={p.title} project={p} />
        ))}

        {!all && PROJECTS.length > FEATURED && <ViewAllWork count={PROJECTS.length} />}
      </div>
    </section>
  );
}
