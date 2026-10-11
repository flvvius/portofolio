import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
import { AuditLink } from "@/components/service/Actions";
import { LegacyFragments } from "@/components/service/LegacyFragments";
import { Testimonials } from "@/components/service/Testimonials";
export const metadata: Metadata = {
  title: "Flavius: design engineer for AI-built apps",
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <PageShell>
      <LegacyFragments />
      <section
        className="service-opening"
        id="the-bar"
        aria-labelledby="hero-title"
      >
        <p className="service-kicker">Design engineering for live products</p>
        <h1 id="hero-title" className="service-hero">
          Your app works.
          <br />
          Let's make it feel{" "}
          <span className="service-hero-mark">
            finished.
            <svg viewBox="0 0 240 12" aria-hidden="true">
              <path d="M3 7 Q110 1 237 5 M9 9 Q125 5 226 8" />
            </svg>
          </span>
        </h1>
        <p className="service-lead">
          I redesign AI-built apps and small SaaS products in your React
          codebase, then deliver reviewable PRs.
        </p>
        <p className="service-muted">
          Next.js, Tailwind, shadcn/ui and Lovable, Bolt or v0 exports.
        </p>
        <div className="service-actions">
          <AuditLink />
          <Link className="service-link" href="/work">
            See the work
          </Link>
        </div>
        <p className="service-caption">
          One flow. EUR 300. Within 3 business days of complete intake.
        </p>
      </section>
      <section className="service-section" aria-labelledby="services-title">
        <h2 id="services-title">Start with one flow.</h2>
        <div className="service-two-columns">
          <div>
            <h3>Taste audit · EUR 300</h3>
            <p className="service-muted">
              A recorded walkthrough, ten ranked fixes and one redesigned screen
              preview. Full refund if it isn't useful.
            </p>
          </div>
          <div>
            <h3>Polish sprint · from EUR 1,500</h3>
            <p className="service-muted">
              One flow or 3–5 screens, implemented in your codebase. Your audit
              fee is credited.
            </p>
          </div>
        </div>
        <div className="service-actions">
          <Link className="service-link" href="/pricing">
            Pricing and availability
          </Link>
          <Link className="service-link" href="/process">
            How we work
          </Link>
        </div>
      </section>
      <Testimonials />
    </PageShell>
  );
}
