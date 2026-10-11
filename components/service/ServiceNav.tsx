import Link from "next/link";
import { NavLinks } from "./NavLinks";
import { AuditLink } from "./Actions";
export function ServiceNav() {
  return (
    <header className="service-nav">
      <Link href="/" className="service-wordmark">
        Flavius
        <span className="service-caption">Design engineer, Bucharest</span>
      </Link>
      <NavLinks />
      <AuditLink short />
    </header>
  );
}
