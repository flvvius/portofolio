import type { Metadata } from "next";
import Link from "next/link";
import { CuckooShrug } from "@/components/art/Cuckoo";

export const metadata: Metadata = {
  title: "this shelf is empty",
  robots: { index: false, follow: true },
};

/** Appearance three of five for the cuckoo. He does not know either. */
export default function NotFound() {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center"
    >
      <CuckooShrug className="h-32 w-auto text-ink sm:h-40" />

      <h1 className="mt-10 font-display-section text-[clamp(2rem,6vw,3.5rem)] text-ink">
        this shelf is empty
      </h1>

      <p className="measure mt-4 font-mono text-caption text-ink-soft">
        nothing here, and no note explaining why.
      </p>

      <p className="mt-9">
        <Link href="/" className="ink-link font-mono text-[1.05rem]">
          ← back to the bar
        </Link>
      </p>
    </main>
  );
}
