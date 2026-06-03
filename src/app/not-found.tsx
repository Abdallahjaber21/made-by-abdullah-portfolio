import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** Branded 404 — reuses the site's tokens and button styles. */
export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-inner">
        <div className="status-code">404</div>
        <h1>This page drifted off the map</h1>
        <p>
          The page you’re after doesn’t exist or has moved. Let’s get you back
          to solid ground.
        </p>
        <div className="status-actions">
          <Link className="btn btn-primary" href="/">
            Back home <span className="arrow">→</span>
          </Link>
          <Link className="btn btn-ghost" href="/work">
            View work
          </Link>
        </div>
        <div className="status-ref">ERR · 404 · NOT FOUND</div>
      </div>
    </main>
  );
}
