import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/data/blog";
import { PageShell } from "@/components/service/PageShell";
export function generateStaticParams() { return getAllBlogPosts().map(post => ({ id: post.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const post = getBlogPost(id); return post ? { title: post.title, description: post.excerpt, alternates: { canonical: `/blog/${id}` } } : {}; }
export default async function Post({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; const post = getBlogPost(id); if (!post) notFound(); return <PageShell><header className="service-page-header"><Link className="service-link" href="/blog">All writing</Link><h1 style={{ marginTop: 24 }}>{post.title}</h1><p className="service-caption"><time dateTime={post.date}>{post.date}</time> · {post.readTime}</p></header><article className="service-article">{post.content.split("\n\n").map((text, index) => <p key={index}>{text.trim()}</p>)}</article></PageShell>; }
