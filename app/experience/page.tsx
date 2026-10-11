import type { Metadata } from "next";
import { PageShell } from "@/components/service/PageShell";
import { tab } from "@/data/site";
export const metadata: Metadata = {
  title: "Experience",
  alternates: { canonical: "/experience" },
};
export default function Page() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1 id="experience-title">Experience</h1>
      </header>
      <section
        className="service-section"
        id="experience"
        aria-labelledby="experience-title"
      >
        {tab.items.map((item) => (
          <article className="service-experience" key={item.place}>
            <h2>{item.place}</h2>
            <p className="service-caption">
              {item.date} · {item.duration}
            </p>
            <p className="service-muted" style={{ marginTop: 12 }}>
              {item.story}
            </p>
          </article>
        ))}
        <h2 style={{ marginTop: 24 }}>{tab.education.title}</h2>
        {tab.education.lines.map((line) => (
          <p className="service-muted" key={line.title}>
            {line.title} · {line.years}
          </p>
        ))}
      </section>
    </PageShell>
  );
}
