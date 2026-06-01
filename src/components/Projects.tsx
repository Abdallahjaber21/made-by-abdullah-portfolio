import { PROJECTS } from "@/data/projects";
import ProjectRow from "./ProjectRow";
import ViewAllWork from "./ViewAllWork";

const FEATURED = 3;

/** `all` renders every project (the /work page); otherwise a featured subset. */
export default function Projects({ all = false }: { all?: boolean }) {
  const list = all ? PROJECTS : PROJECTS.slice(0, FEATURED);

  return (
    <section id="projects" data-screen-label="Projects">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">03 · {all ? "All work" : "Selected work"}</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              {all ? (
                <>Everything I&apos;ve<br />built and shipped.</>
              ) : (
                <>Selected work,<br />built and shipped.</>
              )}
            </h2>
          </div>
          <p className="lead reveal">
            {all
              ? "Mobile apps, a point-of-sale platform, and an e-commerce build — the full set. Happy to walk through the architecture and tradeoffs over a call."
              : "A slice of recent work — mobile apps, a point-of-sale platform, and an e-commerce build. Happy to walk through the architecture over a call."}
          </p>
        </div>

        {list.map((p) => (
          <ProjectRow key={p.title} project={p} />
        ))}

        {!all && PROJECTS.length > FEATURED && <ViewAllWork count={PROJECTS.length} />}
      </div>
    </section>
  );
}
