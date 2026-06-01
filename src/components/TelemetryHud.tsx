"use client";

import { useEffect, useRef, useState } from "react";

const fmt = (n: number) => n.toLocaleString("en-US");

export default function TelemetryHud() {
  const [tel, setTel] = useState({
    rps: "48,210",
    p99: "11.4ms",
    nodes: "256",
    err: "0.01%",
    q: "12",
  });
  const sparkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const v = { rps: 48210, p99: 11.4, nodes: 256, err: 0.01, q: 12 };
    const id = setInterval(() => {
      v.rps = v.rps * 0.99 + 48210 * 0.01 + (Math.random() - 0.5) * 160;
      v.p99 = v.p99 * 0.985 + 11.4 * 0.015 + (Math.random() - 0.5) * 0.36;
      v.nodes = Math.max(248, Math.min(264, v.nodes + (Math.random() - 0.5) * 2));
      v.err = Math.max(0, Math.min(0.06, v.err + (Math.random() - 0.5) * 0.008));
      v.q = Math.max(4, Math.min(32, v.q + (Math.random() - 0.5) * 2));
      setTel({
        rps: fmt(Math.round(v.rps)),
        p99: v.p99.toFixed(1) + "ms",
        nodes: fmt(Math.round(v.nodes)),
        err: v.err.toFixed(2) + "%",
        q: fmt(Math.round(v.q)),
      });
    }, 750);

    const spark = sparkRef.current;
    if (spark) {
      spark.innerHTML = "";
      for (let i = 0; i < 20; i++) {
        const b = document.createElement("div");
        b.className = "bar";
        b.style.height = 20 + Math.random() * 60 + "%";
        spark.appendChild(b);
      }
    }
    const sid = setInterval(() => {
      if (!spark) return;
      const bars = spark.querySelectorAll<HTMLElement>(".bar");
      for (let i = 0; i < bars.length - 1; i++) bars[i].style.height = bars[i + 1].style.height;
      if (bars.length) bars[bars.length - 1].style.height = 25 + Math.random() * 60 + "%";
    }, 600);

    return () => {
      clearInterval(id);
      clearInterval(sid);
      if (spark) spark.innerHTML = "";
    };
  }, []);

  return (
    <aside className="telemetry-hud reveal" aria-hidden="true">
      <div className="hud-head">
        <span>SYSTEM · LIVE</span>
        <span className="pulse">
          <span className="dot" />
          OK
        </span>
      </div>
      <div className="hud-row"><span className="k">rps</span><span className="v">{tel.rps}</span></div>
      <div className="hud-row"><span className="k">p99 latency</span><span className="v accent">{tel.p99}</span></div>
      <div className="hud-row"><span className="k">edge nodes</span><span className="v">{tel.nodes}</span></div>
      <div className="hud-row"><span className="k">error rate</span><span className="v success">{tel.err}</span></div>
      <div className="hud-row"><span className="k">queue depth</span><span className="v">{tel.q}</span></div>
      <div className="spark" ref={sparkRef} aria-hidden="true" />
    </aside>
  );
}
