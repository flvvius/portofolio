import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/data/blog";
import { BlogListJsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/sections/Section";
import { Rise } from "@/components/ink/Rise";
import { IndexCard } from "@/components/art/Paper";

const baseUrl = "https://flavius.pro";

const description =
  "notes rather than articles. thinking out loud about building software, with none of it tidied up first.";

export const metadata: Metadata = {
  title: "the notes",
  description,
  alternates: { canonical: `${baseUrl}/blog` },
  openGraph: {
    title: "the notes | Flavius Cojocaru",
    description,
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/main.png`,
        width: 1200,
        height: 630,
        alt: "Flavius Cojocaru, the notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "the notes | Flavius Cojocaru",
    description,
    images: [`${baseUrl}/main.png`],
  },
};

export default function BlogIndex() {
  const posts = getAllBlogPosts();

  return (
    <>
      <BlogListJsonLd name="the notes" description={description} />
      <Nav />
      <main
        id="main"
        tabIndex={-1}
        className="min-h-[70svh] py-rhythm lg:py-rhythm-lg"
      >
        <Container>
          <Rise as="h1" className="font-display-section text-section text-ink">
            the notes
          </Rise>

          <Rise delay={60} className="mt-5 block">
            <p className="measure font-mono text-ink-soft">
              index cards, mostly. written for me, left out where anyone can
              read them.
            </p>
          </Rise>

          {posts.length > 0 ? (
            <ul className="mt-16 grid gap-8 sm:grid-cols-2">
              {posts.map((post, index) => (
                <li key={post.id}>
                  <Rise delay={index * 60}>
                    <IndexCard tilt={index % 2 === 0 ? -1.2 : 1.2}>
                      <Link href={`/blog/${post.id}`} className="group block no-underline">
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-soft">
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                          {" · "}
                          {post.readTime}
                          {post.mood ? ` · ${post.mood}` : ""}
                        </p>
                        <h2 className="mt-2 font-display-section text-[1.35rem] leading-tight text-ink transition-colors duration-[180ms] group-hover:text-accent">
                          {post.title}
                        </h2>
                        <p className="mt-3 font-mono text-caption leading-relaxed text-ink-soft">
                          {post.excerpt}
                        </p>
                        <p className="mt-4 font-mono text-caption text-ink-soft transition-colors duration-[180ms] group-hover:text-accent">
                          read it →
                        </p>
                      </Link>
                    </IndexCard>
                  </Rise>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-16 font-mono text-caption text-ink-soft">
              nothing written down yet. the pen is right there, though.
            </p>
          )}

          <p className="mt-20">
            <Link href="/" className="ink-link font-mono text-[0.95rem]">
              ← back to the bar
            </Link>
          </p>
        </Container>
      </main>
    </>
  );
}
