import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
import { included, excluded } from "@/data/service";
import { serviceConfig } from "@/lib/service/config";
export const metadata: Metadata = {
  title: "Process and scope",
  description: "One agreed flow, clear scope and reviewable delivery.",
  alternates: { canonical: "/process" },
};
export default function Process() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1>From your app to the PR.</h1>
        <p>Design and code by the same person.</p>
      </header>
      <ol className="service-process">
        {[
          {
            title: "Send your app and goal",
            text: "Choose the flow that needs attention.",
          },
          {
            title: "Agree scope and pay",
            text: "Audits are fixed price. Sprints follow a codebase check.",
          },
          {
            title: "Get the audit or PRs",
            text: "A walkthrough and screen preview, or implemented changes.",
          },
          {
            title: "Review and finish",
            text: "Discuss recommendations or review and merge the sprint PRs.",
          },
        ].map((step, i) => (
          <li key={step.title}>
            <span className="service-step-number" aria-hidden="true">
              0{i + 1}
            </span>
            <div>
              <h2>{step.title}</h2>
              <p className="service-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <section className="service-section">
        <h2>A good fit</h2>
        <p>
          Live React products, small SaaS teams and agencies without a designer.
          Bring a codebase and a flow to improve.
        </p>
      </section>
      <section className="service-section">
        <h2>Scope</h2>
        <div className="service-two-columns">
          <div>
            <h3>Included</h3>
            <ul className="service-list">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Excluded</h3>
            <ul className="service-list">
              {excluded.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="service-section">
        <h2>An open design method</h2>
        <p>Use the method yourself, or hire me to apply it.</p>
        {serviceConfig.method && (
          <a className="service-link" href={serviceConfig.method}>
            Read flavius-design-taste
          </a>
        )}
      </section>
      <div className="service-actions">
        <Link className="service-link" href="/pricing">
          See pricing
        </Link>
        <Link className="service-link" href="/faq">
          Questions before we start
        </Link>
      </div>
    </PageShell>
  );
}
