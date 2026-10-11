import Link from "next/link";
import { PageShell } from "@/components/service/PageShell";
export default function NotFound() { return <PageShell><header className="service-page-header"><p className="service-kicker">404</p><h1>This page isn't here.</h1><p>The portfolio is now on About. Try one of these paths.</p><div className="service-actions"><Link className="service-button" href="/">Home</Link><Link className="service-link" href="/work">Work</Link><Link className="service-link" href="/about">About</Link></div></header></PageShell>; }
