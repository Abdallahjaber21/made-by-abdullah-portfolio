"use client";

import { StackIcons } from "./icons";
import { useT } from "./LocaleProvider";

// The stack, grouped by category. Each row renders a label + a wrapping set of
// icon chips, so it stays readable from wide desktop down to small phones.
// `labelKey` indexes t.about.cat for the translated category label.
const STACK_GROUPS = [
  {
    labelKey: "languages" as const,
    items: [
      { Icon: StackIcons.PHP, name: "PHP" },
      { Icon: StackIcons.Python, name: "Python" },
      { Icon: StackIcons.JavaScript, name: "JavaScript" },
      { Icon: StackIcons.CSharp, name: "C#" },
    ],
  },
  {
    labelKey: "frameworks" as const,
    items: [
      { Icon: StackIcons.Yii2, name: "Yii2" },
      { Icon: StackIcons.Laravel, name: "Laravel" },
      { Icon: StackIcons.Django, name: "Django" },
      { Icon: StackIcons.NestJS, name: "Nest.js" },
      { Icon: StackIcons.Node, name: "Node.js" },
      { Icon: StackIcons.NextJS, name: "Next.js" },
    ],
  },
  {
    labelKey: "mobile" as const,
    items: [
      { Icon: StackIcons.Flutter, name: "Flutter" },
      { Icon: StackIcons.React, name: "React Native" },
      { Icon: StackIcons.Ionic, name: "Ionic" },
      { Icon: StackIcons.Cordova, name: "Cordova" },
      { Icon: StackIcons.PHP, name: "PHP Native" },
    ],
  },
  {
    labelKey: "styling" as const,
    items: [
      { Icon: StackIcons.CSS3, name: "CSS3" },
      { Icon: StackIcons.Tailwind, name: "Tailwind CSS" },
      { Icon: StackIcons.ShadCN, name: "shadcn/ui" },
      { Icon: StackIcons.Bootstrap, name: "Bootstrap" },
      { Icon: StackIcons.GSAP, name: "GSAP" },
      { Icon: StackIcons.FramerMotion, name: "Framer Motion" },
    ],
  },
  {
    labelKey: "cloud" as const,
    items: [
      { Icon: StackIcons.GoogleCloud, name: "GCP" },
      { Icon: StackIcons.Azure, name: "Azure" },
      { Icon: StackIcons.AWS, name: "AWS" },
    ],
  },
  {
    labelKey: "data" as const,
    items: [
      { Icon: StackIcons.MySQL, name: "MySQL" },
      { Icon: StackIcons.MongoDB, name: "MongoDB" },
      { Icon: StackIcons.PostgreSQL, name: "PostgreSQL" },
      { Icon: StackIcons.SQLite, name: "SQLite" },
      { Icon: StackIcons.Firebase, name: "Firebase" },
    ],
  },
  {
    labelKey: "others" as const,
    items: [
      { Icon: StackIcons.GitHubActions, name: "GitHub Actions" },
      { Icon: StackIcons.Terraform, name: "Terraform" },
      { Icon: StackIcons.Docker, name: "Docker" },
      { Icon: StackIcons.Kubernetes, name: "kubectl" },
      { Icon: StackIcons.ArgoCD, name: "Argo CD" },
    ],
  },
] as const;

export default function About() {
  const t = useT();
  const a = t.about;
  return (
    <section id="about" data-screen-label="About">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{a.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              {a.headingA}
              <br />
              {a.headingB}
              <em>{a.headingReal}</em>
              {a.headingC}
              <em>{a.headingSystems}</em>
              {a.headingD}
            </h2>
          </div>
          <p className="lead reveal">{a.lead}</p>
        </div>

        <div className="about-grid">
          <div className="bio">
            <p className="reveal">{a.bio1}</p>
            <p className="reveal">{a.bio2}</p>
            <p className="reveal">{a.bio3}</p>

            <div className="stat-row">
              <div className="stat reveal">
                <div className="n" data-value="7" data-suffix="+">0</div>
                <span className="l">{a.statYears}</span>
              </div>
              <div className="stat reveal">
                <div className="n" data-value="3">0</div>
                <span className="l">{a.statSectors}</span>
              </div>
              <div className="stat reveal">
                <div className="n">{a.statLevelValue}</div>
                <span className="l">{a.statLevel}</span>
              </div>
            </div>
          </div>

          <div className="stack-card reveal">
            <div className="stack-card-head">
              <span className="label">{a.stackTitle}</span>
              <span className="status"><span className="dot" />{a.stackStatus}</span>
            </div>
            <div className="stack-cats">
              {STACK_GROUPS.map(({ labelKey, items }) => (
                <div className="stack-cat" key={labelKey}>
                  <span className="stack-cat-label">{a.cat[labelKey]}</span>
                  <div className="stack-cat-items">
                    {items.map(({ Icon, name }) => (
                      <span className="stack-chip" key={name}>
                        <span className="glyph">
                          <Icon />
                        </span>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
