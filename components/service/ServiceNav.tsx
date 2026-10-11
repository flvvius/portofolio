import Link from "next/link";
import { AuditLink } from "./Actions";
export function ServiceNav() {
  return <header className="service-nav"><Link href="/" className="service-wordmark">Flavius<span className="service-caption">Design engineer, Bucharest</span></Link><nav aria-label="Main navigation"><Link href="/#work">Work</Link><Link href="/#process">Process</Link><Link href="/#pricing">Pricing</Link><Link href="/about">About</Link></nav><AuditLink short /></header>;
}
