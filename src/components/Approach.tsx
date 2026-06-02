"use client";

import { useT } from "./LocaleProvider";

export default function Approach() {
  const t = useT();
  const s = t.approach.statements;

  const STATEMENTS: Array<{ idx: string; pre: string; em: string; post: string }> = [
    { idx: "/01", pre: s.s1a, em: s.s1em, post: s.s1b },
    { idx: "/02", pre: s.s2a, em: s.s2em, post: s.s2b },
    { idx: "/03", pre: s.s3a, em: s.s3em, post: s.s3b },
    { idx: "/04", pre: s.s4a, em: s.s4em, post: s.s4b },
    { idx: "/05", pre: s.s5a, em: s.s5em, post: s.s5b },
    { idx: "/06", pre: s.s6a, em: s.s6em, post: s.s6b },
  ];

  return (
    <section id="approach" data-screen-label="Approach" className="approach">
      <div className="approach-grid-bg" />
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">{t.approach.eyebrow}</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              {t.approach.heading}
            </h2>
          </div>
          <p className="lead reveal">{t.approach.lead}</p>
        </div>

        <div className="approach-statements">
          {STATEMENTS.map((st) => (
            <div className="statement" key={st.idx}>
              <span className="idx">{st.idx}</span>
              <div>
                <span>{st.pre}</span>
                <em>{st.em}</em>
                <span>{st.post}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
