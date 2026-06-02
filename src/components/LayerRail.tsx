"use client";

import { useEffect, useState } from "react";
import { useT } from "./LocaleProvider";

export default function LayerRail() {
  const t = useT();
  const LAYERS = t.layers;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = window.innerHeight;
      const y = window.scrollY || document.documentElement.scrollTop;
      const docMax = Math.max(1, document.body.scrollHeight - h);
      const li = Math.min(LAYERS.length - 1, Math.floor((y / docMax) * LAYERS.length));
      setIdx(li);
      const label = document.getElementById("layer-label");
      if (label) label.textContent = LAYERS[li];
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [LAYERS]);

  return (
    <nav className="layer-rail" aria-label="Abstraction layers" aria-hidden="true">
      {LAYERS.map((name, i) => (
        <div
          key={name}
          className={`layer-step${i === idx ? " is-active" : i < idx ? " is-past" : ""}`}
        >
          <span className="ldot" />
          <span className="lname">{name}</span>
        </div>
      ))}
    </nav>
  );
}
