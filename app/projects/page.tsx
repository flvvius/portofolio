import type { Metadata } from "next";
import { PageShell } from "@/components/service/PageShell";
import { projects } from "@/data/site";
import { ShelfObject } from "@/components/art/ShelfObjects";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
};
export default function Page() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1 id="projects-title">Projects</h1>
      </header>
      <section
        className="service-section"
        id="projects"
        aria-labelledby="projects-title"
      >
        {projects.map((project) => (
          <article
            className="service-project"
            id={`note-${project.slug}`}
            key={project.slug}
          >
            <div className="service-project-art" aria-hidden="true">
              <ShelfObject kind={project.object} />
            </div>
            <div>
              <h2>{project.title}</h2>
              <p className="service-caption" style={{ marginBottom: 16 }}>
                {project.caption}
              </p>
              <div className="service-prose">
                {project.story.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              {project.stack.length > 0 && (
                <p className="service-caption" style={{ marginTop: 16 }}>
                  {project.stack.join(" · ")}
                </p>
              )}
              <div className="service-actions">
                {project.links.map((link) => (
                  <a key={link.href} className="service-link" href={link.href}>
                    {link.label === "live"
                      ? "Visit the product"
                      : "Source on GitHub"}
                  </a>
                ))}
                {project.slug === "pricele" && (
                  <Link href="/work/pricele" className="service-link">
                    Design case-study example
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </section>
    </PageShell>
  );
}
