interface Statement {
  idx: string;
  /** rendered with <em> emphasis spans pre-split */
  parts: Array<{ text: string; em?: boolean }>;
}

const STATEMENTS: Statement[] = [
  {
    idx: "/01",
    parts: [
      { text: "Clean architecture is how you " },
      { text: "scale a team", em: true },
      { text: ", not just a system. Everything else follows from the boundaries." },
    ],
  },
  {
    idx: "/02",
    parts: [
      { text: "Performance is a " },
      { text: "feature", em: true },
      { text: ", not an afterthought. Set the budget; defend it like a deadline." },
    ],
  },
  {
    idx: "/03",
    parts: [
      { text: "Simplicity beats cleverness. The " },
      { text: "obvious", em: true },
      { text: " solution is usually the one that survives." },
    ],
  },
  {
    idx: "/04",
    parts: [
      { text: "Maintainability outlives trends. Optimize for the " },
      { text: "engineer reading this", em: true },
      { text: " in two years." },
    ],
  },
  {
    idx: "/05",
    parts: [
      { text: "AI " },
      { text: "amplifies", em: true },
      { text: " engineers; it doesn't replace engineering. The judgement stays human." },
    ],
  },
  {
    idx: "/06",
    parts: [
      { text: "Good software is " },
      { text: "understood", em: true },
      { text: " before it is optimized. Clarity first, speed second." },
    ],
  },
];

export default function Manifesto() {
  return (
    <section id="manifesto" data-screen-label="Manifesto" className="manifesto">
      <div className="manifesto-grid-bg" />
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow reveal">05 · Engineering attitude</span>
            <h2 className="reveal" style={{ marginTop: 18 }}>
              How I build.
            </h2>
          </div>
          <p className="lead reveal">
            Six convictions, learned across seven years of shipping. They are why my code reads the
            way it does.
          </p>
        </div>

        <div className="manifesto-statements">
          {STATEMENTS.map((s) => (
            <div className="statement" key={s.idx}>
              <span className="idx">{s.idx}</span>
              <div>
                {s.parts.map((p, i) =>
                  p.em ? <em key={i}>{p.text}</em> : <span key={i}>{p.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
