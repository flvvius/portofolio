import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/service/PageShell";
import { BeforeAfter } from "@/components/service/BeforeAfter";
import { ComparisonView } from "@/components/service/Analytics";
import { getStudy, visibleStudies } from "@/data/work";
import { priceleAnnotations } from "@/data/annotations/pricele";
export function generateStaticParams() { return visibleStudies().map(study => ({ slug: study.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const study = getStudy(slug);
  return study ? { title: study.title, description: study.summary, alternates: { canonical: `/work/${slug}` }, robots: study.draft ? { index: false, follow: false } : undefined } : { title: "Case study not found" };
}
export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const study = getStudy(slug); if (!study) notFound();
  return <PageShell><header className="service-page-header"><p className="service-kicker">{study.ownership} · {study.draft ? "DRAFT / PLACEHOLDER" : "Example / comparison pending"}</p><h1>{study.title}</h1><p className="service-muted">{study.summary}</p><p className="service-caption">{study.stack.join(" · ")} · <time dateTime={study.date}>{study.date}</time></p></header><section className="service-section"><h2>Problem</h2><p>{study.problem}</p></section><section className="service-section"><h2>What I changed and why</h2><p>{study.changes}</p><ul className="service-decisions" style={{ marginTop: 20 }}>{study.decisions.map(item => <li key={item.decision}><strong>{item.decision}</strong> {item.why}</li>)}</ul></section><section className="service-section" id={`study-${slug}`}><h2>Before and after gallery</h2><BeforeAfter before={study.before} after={{ ...study.after, annotations: slug === "pricele" ? priceleAnnotations : study.after.annotations }} caption={slug === "pricele" ? "Before is a placeholder. After is a current local reference capture, not a redesign after. Both use an 800 × 600 viewport." : "PLACEHOLDER specimens only."} /><ComparisonView id={`study-${slug}`} /></section><section className="service-section"><h2>Implementation notes</h2><p>{study.implementation}</p><ul className="service-decisions" style={{ marginTop: 20 }}>{study.codeChanges.map(item => <li key={item}>{item}</li>)}</ul></section><section className="service-section"><h2>Result</h2><p>{study.result}</p></section><section className="service-section"><h2>Limitations</h2><ul className="service-decisions">{study.limitations.map(item => <li key={item}>{item}</li>)}</ul></section></PageShell>;
}
