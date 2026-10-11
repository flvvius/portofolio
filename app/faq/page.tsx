import type { Metadata } from "next";
import { PageShell } from "@/components/service/PageShell";
import { FAQ } from "@/components/service/FAQ";
import { faq } from "@/data/service";
export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: "Stacks, access, timing, revisions, refunds and invoicing.",
  alternates: { canonical: "/faq" },
};
export default function Questions() {
  return (
    <PageShell>
      <header className="service-page-header">
        <h1>Before we start.</h1>
      </header>
      <FAQ items={faq} />
    </PageShell>
  );
}
