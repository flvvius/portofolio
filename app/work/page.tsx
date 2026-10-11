import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
import { BeforeAfter } from "@/components/service/BeforeAfter";
import { ComparisonView } from "@/components/service/Analytics";
import { sampleAnnotations } from "@/data/annotations/styleguide";
export const metadata: Metadata = {
  title: "Work",
  description: "Screens, decisions and implementation notes.",
  alternates: { canonical: "/work" },
};
const proof = [
  {
    slug: "onboarding-concept",
    title: "A clearer first step",
    label: "Unsolicited concept",
    decisions: [
      "Name the first task.",
      "Make the next action obvious.",
      "Keep guidance beside its field.",
    ],
  },
  {
    slug: "pricele",
    title: "Pricele, my daily price game",
    label: "My own product",
    decisions: [
      "Start with the price guess.",
      "Show the source and country.",
      "Explain feedback beyond color.",
    ],
  },
  {
    slug: "dashboard-concept",
    title: "Less furniture, more information",
    label: "Unsolicited concept",
    decisions: [
      "Group rows with hairlines.",
      "Align numbers for comparison.",
      "Give empty states a next action.",
    ],
  },
];
export default function Work() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1>The decisions are the work.</h1>
        <p className="service-muted">
          Comparison assets are being prepared. These placeholders do not
          represent client results.
        </p>
      </header>
      <section aria-label="Before and after examples">
        {proof.map((item) => (
          <article
            className="service-proof"
            id={`proof-${item.slug}`}
            key={item.slug}
          >
            <div className="service-proof-heading">
              <h2>{item.title}</h2>
              <p className="service-caption">{item.label} · PLACEHOLDER</p>
            </div>
            <BeforeAfter
              before={{
                src: "/images/styleguide/before.svg",
                alt: `Placeholder before interface for ${item.title}. Real screenshot pending.`,
              }}
              after={{
                src: "/images/styleguide/after.svg",
                alt: `Placeholder after interface for ${item.title}. Real screenshot pending.`,
                annotations: sampleAnnotations,
              }}
              caption="800 × 600 placeholders. Proposed direction, not delivered work."
            />
            <ul className="service-decisions">
              {item.decisions.map((decision) => (
                <li key={decision}>{decision}</li>
              ))}
            </ul>
            {item.slug === "pricele" ? (
              <Link
                className="service-link service-study-link"
                href="/work/pricele"
              >
                Read the Pricele example
              </Link>
            ) : (
              <p className="service-caption service-study-link">
                Case study pending.
              </p>
            )}
            <ComparisonView id={`proof-${item.slug}`} />
          </article>
        ))}
      </section>
    </PageShell>
  );
}
