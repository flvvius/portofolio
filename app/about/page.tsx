import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
import { BackRoomArrival } from "@/components/service/BackRoomArrival";
import { serviceConfig } from "@/lib/service/config";
export const metadata: Metadata = {
  title: "About Flavius",
  description:
    "Design engineer in Bucharest. Software, projects and engineering experience.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <PageShell>
      <BackRoomArrival />
      <header className="service-page-header">
        <p className="service-kicker">The person behind the PRs</p>
        <h1>I'm Flavius.</h1>
        <p>I design and build software in Bucharest, mostly in TypeScript.</p>
      </header>
      <div className="service-prose">
        <p>
          I've led a twenty-person engineering team. Alongside my day job, I
          build products of my own, including miez.news and Pricele.
        </p>
        <div className="service-note">
          <span>The details are the whole job.</span>
        </div>
      </div>
      <section className="service-section" aria-label="More about me">
        <div className="service-actions">
          <Link className="service-link" href="/projects">
            Projects
          </Link>
          <Link className="service-link" href="/experience">
            Experience and education
          </Link>
          <Link className="service-link" href="/blog">
            Writing
          </Link>
        </div>
      </section>
      <section className="service-section" id="contact">
        <h2>Say hi</h2>
        <a className="service-link" href={`mailto:${serviceConfig.email}`}>
          {serviceConfig.email}
        </a>
      </section>
    </PageShell>
  );
}
