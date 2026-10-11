import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/data/blog";
import { PageShell } from "@/components/service/PageShell";
export const metadata: Metadata = { title: "Writing", alternates: { canonical: "/blog" } };
export default function Blog() { return <PageShell><header className="service-page-header"><h1>Notes to myself.</h1><p className="service-muted">Writing about software and the work around it.</p></header>{getAllBlogPosts().map(post => <article className="service-section" key={post.id}><h2><Link className="service-link" href={`/blog/${post.id}`}>{post.title}</Link></h2><p className="service-caption"><time dateTime={post.date}>{post.date}</time> · {post.readTime}</p><p className="service-muted">{post.excerpt}</p></article>)}</PageShell>; }
