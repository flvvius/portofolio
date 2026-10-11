"use client";
import Link from "next/link";
export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui,sans-serif", padding: 32 }}>
        <main>
          <h1>We couldn't load this page.</h1>
          <p>Please try again.</p>
          <button onClick={reset}>Try again</button>
          <p>
            <Link href="/">Return home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
