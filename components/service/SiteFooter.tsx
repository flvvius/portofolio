import Link from "next/link";
import { serviceConfig } from "@/lib/service/config";
export function SiteFooter() {
  return <footer className="service-footer"><a className="service-link" href={`mailto:${serviceConfig.email}`}>{serviceConfig.email}</a><div className="service-footer-links">{([{ label: "GitHub", href: serviceConfig.github }, { label: "X", href: serviceConfig.x }, { label: "LinkedIn", href: serviceConfig.linkedin }]).map(({ label, href }) => href && <a key={label} href={href}>{label}</a>)}<Link href="/about">About</Link><Link href="/work">Work</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div><p className="service-caption">Design and code by Flavius Cojocaru in Bucharest.</p></footer>;
}
