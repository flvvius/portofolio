import Link from "next/link";
import { serviceConfig } from "@/lib/service/config";
import { EventLink } from "./Analytics";
export function AuditLink({ short = false }: { short?: boolean }) {
  if (serviceConfig.stripe) return <EventLink href={serviceConfig.stripe} event="audit_click" className="service-button">{short ? "Get an audit" : "Get a EUR 300 taste audit"}</EventLink>;
  return <Link className="service-button" href="/#pricing">{short ? "Get an audit" : "Get a EUR 300 taste audit"}</Link>;
}
export function CallLink() {
  return serviceConfig.cal ? <EventLink href={serviceConfig.cal} event="call_click" className="service-link">Book a 15-min call</EventLink> : <a className="service-link" href={`mailto:${serviceConfig.email}?subject=Polish%20sprint%20question`}>Ask about a sprint by email</a>;
}
