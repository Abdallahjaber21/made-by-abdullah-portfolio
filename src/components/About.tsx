import { StackIcons } from "./icons";

const STACK = [
  { Icon: StackIcons.PHP, name: "PHP", meta: "language" },
  { Icon: StackIcons.Laravel, name: "Laravel", meta: "framework" },
  { Icon: StackIcons.Yii2, name: "Yii2", meta: "framework" },
  { Icon: StackIcons.NextJS, name: "Next.js", meta: "frontend" },
  { Icon: StackIcons.TypeScript, name: "TypeScript", meta: "typed" },
  { Icon: StackIcons.React, name: "React", meta: "ui" },
  { Icon: StackIcons.MySQL, name: "MySQL · PostgreSQL", meta: "data" },
  { Icon: StackIcons.Docker, name: "Docker · AWS · GCP · Azure", meta: "cloud" },
  { Icon: StackIcons.GitHubActions, name: "GitHub Actions", meta: "ci/cd" },
  { Icon: StackIcons.Redis, name: "Redis · Elastic", meta: "cache · search" },
];

// Secondary tools — shown as compact icon chips under the main stack.
const ALSO = [
  { Icon: StackIcons.Node, name: "Node" },
  { Icon: StackIcons.Tailwind, name: "Tailwind" },
  { Icon: StackIcons.GraphQL, name: "GraphQL" },
  { Icon: StackIcons.Flutter, name: "Flutter" },
  { Icon: StackIcons.MongoDB, name: "MongoDB" },
];

export default function About() {
  return (
    <section id="about" data-screen-label="About">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">01 · About</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              Seven years building<br />and scaling <em>real</em> software <em>systems</em>.
            </h2>
          </div>
          <p className="lead reveal">
            I&apos;m a software engineer first. I architect the parts that don&apos;t show — the
            schemas, the boundaries, the failure modes — so the product on top stays simple. Most of
            my work is backend architecture, SaaS platforms, and modernizing systems that have to
            keep running.
          </p>
        </div>

        <div className="about-grid">
          <div className="bio">
            <p className="reveal">
              A Bachelor&apos;s in Computer Science and seven-plus years shipping production software —
              across startups, SaaS companies, enterprise software, and freelance consulting. I&apos;ve
              built greenfield platforms and, just as often, modernized legacy systems that couldn&apos;t
              afford downtime.
            </p>
            <p className="reveal">
              My core is PHP — Laravel and Yii2 — paired with Next.js, TypeScript and React on the
              frontend, MySQL and PostgreSQL underneath, and Docker, AWS and CI/CD around it. I lean
              on SOLID principles and design patterns because clean architecture is what lets a team
              move quickly without breaking things.
            </p>
            <p className="reveal">
              Lately I work as an AI-enhanced engineer — agentic workflows and LLM integrations to
              move faster while every architectural decision stays firmly human. AI amplifies good
              engineering; it doesn&apos;t replace it.
            </p>

            <div className="stat-row">
              <div className="stat reveal">
                <div className="n" data-value="7" data-suffix="+">0</div>
                <span className="l">Years building production software</span>
              </div>
              <div className="stat reveal">
                <div className="n" data-value="3">0</div>
                <span className="l">Sectors — SaaS, enterprise, freelance</span>
              </div>
              <div className="stat reveal">
                <div className="n">Staff</div>
                <span className="l">Engineering level</span>
              </div>
            </div>
          </div>

          <div className="stack-card reveal">
            <div className="stack-card-head">
              <span className="label">Stack · In regular use</span>
              <span className="status"><span className="dot" />Daily drivers</span>
            </div>
            <div className="stack-list">
              {STACK.map(({ Icon, name, meta }) => (
                <div className="stack-item" key={name}>
                  <span className="glyph">
                    <Icon />
                  </span>
                  {name}
                  <span className="meta">{meta}</span>
                </div>
              ))}
            </div>
            <div className="stack-foot">
              <span>ALSO</span>
              <div className="stack-also">
                {ALSO.map(({ Icon, name }) => (
                  <span className="also-chip" key={name}>
                    <span className="glyph">
                      <Icon />
                    </span>
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
