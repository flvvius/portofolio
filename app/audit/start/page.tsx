import type { Metadata } from "next";
import { PageShell } from "@/components/service/PageShell";
import { ServiceForm } from "@/components/service/ServiceForm";
import { serviceConfig, formsConfigured } from "@/lib/service/config";
export const metadata: Metadata = {
  title: "Start your taste audit",
  robots: { index: false, follow: false },
  alternates: { canonical: "/audit/start" },
};
export default function Intake() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1>Let's look at your flow.</h1>
        <p>
          After payment, send me your app and the goal. The 3-business-day
          turnaround starts when the intake is complete.
        </p>
        <p className="service-muted">
          I'll confirm payment and the agreed flow by email. This page does not
          verify a purchase. Please don't send repo credentials; a repo URL is
          optional.
        </p>
      </header>
      <ServiceForm
        kind="intake"
        configured={formsConfigured}
        email={serviceConfig.email}
      />
    </PageShell>
  );
}
