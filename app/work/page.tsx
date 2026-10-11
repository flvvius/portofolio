import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
import { visibleStudies } from "@/data/work";
export const metadata: Metadata = {
  title: "Work",
  description:
    "Design decisions, implementation notes and honest before/after examples.",
  alternates: { canonical: "/work" },
};
export default function Work() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1>Work, with the reasons attached.</h1>
        <p className="service-muted">
          This collection is being prepared. The Pricele entry is an example
          with a real current capture and clearly marked missing evidence.
        </p>
      </header>
      {visibleStudies().map((study) => (
        <article className="service-section" key={study.slug}>
          <p className="service-caption">
            {study.ownership} ·{" "}
            {study.draft ? "DRAFT" : "Example, comparison pending"}
          </p>
          <h2 style={{ marginBlock: 12 }}>
            <Link className="service-link" href={`/work/${study.slug}`}>
              {study.title}
            </Link>
          </h2>
          <p className="service-muted">{study.summary}</p>
        </article>
      ))}
    </PageShell>
  );
}
