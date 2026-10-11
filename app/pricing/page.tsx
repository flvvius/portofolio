import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
import { PricingRows } from "@/components/service/PricingRows";
import { AuditLink, CallLink } from "@/components/service/Actions";
import { ServiceForm } from "@/components/service/ServiceForm";
import { formsConfigured, serviceConfig } from "@/lib/service/config";
export const metadata: Metadata = {
  title: "Pricing",
  description:
    "EUR 300 taste audit. Polish sprint from EUR 1,500. Monthly design partner waitlist.",
  alternates: { canonical: "/pricing" },
};
export default function Pricing() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1>Start with one flow.</h1>
      </header>
      <PricingRows headingLevel={2} />
      <div className="service-actions">
        {serviceConfig.stripe ? (
          <AuditLink />
        ) : (
          <a
            className="service-button"
            href={`mailto:${serviceConfig.email}?subject=Taste%20audit`}
          >
            Email me about an audit
          </a>
        )}
        <CallLink />
      </div>
      {!serviceConfig.stripe && (
        <p className="service-caption">
          Self-serve checkout is awaiting setup.
        </p>
      )}
      <section className="service-section">
        <h2>Monthly design partner: waitlist</h2>
        <p className="service-muted">
          One request at a time. Join for availability; no payment now.
        </p>
        <ServiceForm
          kind="waitlist"
          configured={formsConfigured}
          email={serviceConfig.email}
        />
      </section>
      <div className="service-actions">
        <Link className="service-link" href="/process">
          Scope and process
        </Link>
        <Link className="service-link" href="/faq">
          Refunds, revisions and other questions
        </Link>
      </div>
    </PageShell>
  );
}
