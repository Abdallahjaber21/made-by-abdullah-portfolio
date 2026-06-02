"use client";

import Link from "next/link";
import { GeneralIcons } from "./icons";
import { HOME_SCROLL_KEY } from "./motion/SmoothScroll";
import { useT } from "./LocaleProvider";

/** Links to /work, remembering the current scroll so "Back to home" can restore it. */
export default function ViewAllWork({ count }: { count: number }) {
  const t = useT();
  const remember = () => {
    try {
      sessionStorage.setItem(HOME_SCROLL_KEY, String(window.scrollY || 0));
    } catch {
      /* ignore */
    }
  };
  return (
    <div className="work-cta reveal">
      <Link className="btn btn-primary" href="/work" onClick={remember}>
        {t.projects.viewAll} ({count}) <GeneralIcons.Arrow style={{ width: 16, height: 16 }} />
      </Link>
    </div>
  );
}
