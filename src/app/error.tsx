"use client";

import { useEffect } from "react";

/** Branded error boundary — client component, reuses the site's status styles. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error to the console / monitoring; digest links to server logs.
    console.error(error);
  }, [error]);

  return (
    <main className="status-page">
      <div className="status-inner">
        <div className="status-code">500</div>
        <h1>Something broke on our end</h1>
        <p>
          An unexpected error interrupted this page. You can retry, or head back
          home.
        </p>
        <div className="status-actions">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again <span className="arrow">→</span>
          </button>
          <a className="btn btn-ghost" href="/">
            Back home
          </a>
        </div>
        {error.digest && <div className="status-ref">REF · {error.digest}</div>}
      </div>
    </main>
  );
}
