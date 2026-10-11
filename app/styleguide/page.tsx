import type { Metadata } from "next";
import { ServiceTheme } from "@/components/service/ServiceTheme";
import { BeforeAfter } from "@/components/service/BeforeAfter";
import { PricingRows } from "@/components/service/PricingRows";
import { FAQ } from "@/components/service/FAQ";
import { sampleAnnotations } from "@/data/annotations/styleguide";

export const metadata: Metadata = {
  title: "Design foundation",
  description: "Private review of the service site's design foundation.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/styleguide" },
};

const roles = ["background", "foreground", "primary", "muted-foreground", "border", "input", "ring", "annotation", "success", "warning-text", "destructive"];

export default function Styleguide() {
  return (
    <ServiceTheme>
      <main id="main" tabIndex={-1}>
        <header><h1>Clear screens. A recognizable hand.</h1><p className="service-muted" style={{ marginTop: 16 }}>Inter carries the offer, scope and UI. Schoolbell marks the work. This is a private specimen for the service site.</p></header>
        <section className="service-section" aria-labelledby="type"><h2 id="type">Type and hierarchy</h2>
          <div className="service-type-row"><small>Hero / 600 / up to 60px</small><p className="service-hero">Your app works. Let's make it feel finished.</p></div>
          <div className="service-type-row"><small>Page title / 32px / 600</small><p style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1.15 }}>Design and code, together.</p></div>
          <div className="service-type-row"><small>Row title / 18px / 600</small><h3>One flow, carefully considered.</h3></div>
          <div className="service-type-row"><small>Body / 16px desktop, 17px mobile / 400</small><p>I redesign AI-built apps and small SaaS products directly in your React codebase. Clearer screens, better interactions, reviewable pull requests.</p></div>
          <div className="service-type-row"><small>Label / 500</small><p style={{ fontWeight: 500 }}>App URL</p></div>
        </section>
        <section className="service-section" aria-labelledby="palette"><h2 id="palette">Semantic colors</h2><div className="service-swatches">{roles.map(role => <div key={role}><div className="service-swatch" style={{ background: `var(--${role})` }} /><p className="service-token-label">{role}</p></div>)}</div></section>
        <section className="service-section" aria-labelledby="controls"><h2 id="controls">Buttons and links</h2><div className="service-actions"><a className="service-button" href="#pricing">See the audit scope</a><a className="service-button secondary" href="#comparison">See before and after</a><a className="service-link" href="#forms">Review the form</a></div><p className="service-muted">44px minimum targets. Visible keyboard focus. Feedback ends within 300ms.</p></section>
        <section className="service-section" aria-labelledby="rhythm"><h2 id="rhythm">Spacing, boundaries and motion</h2><p>Content sits on the page. A hairline marks the next section.</p><p className="service-muted" style={{ marginTop: 12 }}>4px spacing unit · 40px section gap · 24px inset · 16px row gap</p><p className="service-muted">8px controls · 10px media · 14px overlays</p><p className="service-muted">140ms press · 150ms swap · 250ms overlay</p></section>
        <section className="service-section" aria-labelledby="comparison"><h2 id="comparison">Before and after</h2><p className="service-caption">Unsolicited concept / PLACEHOLDER specimen</p><BeforeAfter before={{ src: "/images/styleguide/before.svg", alt: "Placeholder interface with competing headings and three equally weighted actions." }} after={{ src: "/images/styleguide/after.svg", alt: "Placeholder interface with a clear title, quieter supporting text and one primary action.", annotations: sampleAnnotations }} caption="Illustrative sample only. These are invented interface specimens, not client work or a claimed result." /><ul className="service-decisions" style={{ marginTop: 20 }}><li>Give the title more space so the page's purpose is easier to find.</li><li>Use one primary action so the next step has a clear hierarchy.</li><li>Keep supporting copy upright and readable.</li></ul></section>
        <section className="service-section" aria-labelledby="pricing"><h2 id="pricing">Pricing rows</h2><PricingRows /></section>
        <section className="service-section" aria-labelledby="faq"><h2 id="faq">Questions</h2><FAQ items={[{ question: "What is the redesigned screen in the audit?", answer: "An annotated high-fidelity mockup or an isolated coded preview. It is not a merged production change." }, { question: "Do you write the code?", answer: "Yes. A polish sprint includes implementation as reviewable pull requests in your React codebase." }]} /></section>
        <section className="service-section" aria-labelledby="forms"><h2 id="forms">Form controls</h2><div className="service-form"><div className="service-field"><label htmlFor="sample-email">Email</label><input id="sample-email" type="email" autoComplete="email" placeholder="you@company.com" /><small>Use the address where you'd like to receive the audit.</small></div><div className="service-field"><label htmlFor="sample-flow">Flow to focus on</label><textarea id="sample-flow" rows={3} placeholder="For example, signing up and creating the first project." /></div><div className="service-field"><label htmlFor="sample-contact">Preferred contact</label><select id="sample-contact"><option>Email</option><option>Video call</option></select></div><button className="service-button" disabled type="button">Submission available after setup</button><p className="service-caption" style={{ marginTop: 12 }}>Controls specimen. No data is submitted.</p></div></section>
      </main>
    </ServiceTheme>
  );
}
