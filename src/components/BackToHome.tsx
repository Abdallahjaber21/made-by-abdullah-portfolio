"use client";

import Link from "next/link";
import { useT } from "./LocaleProvider";

/** "Back to home" link on the /work page — translated, direction-aware arrow. */
export default function BackToHome() {
  const t = useT();
  return (
    <Link className="back-link" href="/">
      <span className="arrow">←</span> {t.projects.backToHome}
    </Link>
  );
}
