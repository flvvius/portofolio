import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getAllBlogPosts } from "@/data/blog";
import { BlogPostJsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Container } from "@/components/sections/Section";

const baseUrl = "https://flavius.pro";

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ id: post.id }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) return { title: "this shelf is empty" };

  const postUrl = `${baseUrl}/blog/${post.id}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Flavius Cojocaru", url: baseUrl }],
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      type: "article",
      publishedTime: post.date,
      authors: ["Flavius Cojocaru"],
      tags: ["developer", "coding", "thoughts", post.mood || "reflective"],
      images: [
        {
          url: `${baseUrl}/main.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [`${baseUrl}/main.png`],
      creator: "@flaviuscj1",
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) notFound();

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const paragraphs = post.content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        date={post.date}
        slug={post.id}
      />
      <Nav rail={false} />
      <main className="py-rhythm lg:py-rhythm-lg">
        <Container>
          <p>
            <Link href="/blog" className="ink-link font-mono text-caption">
              ← the notes
            </Link>
          </p>

          <article className="mt-10">
            <header>
              <h1 className="font-display-section text-[clamp(2rem,5vw,3.4rem)] text-ink">
                {post.title}
              </h1>
              <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-ink-soft">
                <time dateTime={post.date}>{formattedDate}</time>
                {" · "}
                {post.readTime}
                {post.mood ? ` · ${post.mood}` : ""}
              </p>
            </header>

            <div aria-hidden="true" className="my-10 h-px w-full bg-ink/20" />

            <div className="measure space-y-6 font-mono text-[1rem] leading-[1.8] text-ink">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>

          <div
            aria-hidden="true"
            className="mx-auto mt-20 flex max-w-[10rem] items-center gap-4"
          >
            <span className="h-px flex-1 bg-ink/20" />
            <span className="font-mono text-caption text-ink-soft">✳</span>
            <span className="h-px flex-1 bg-ink/20" />
          </div>

          <p className="mt-10 text-center font-mono text-caption text-ink-soft">
            thanks for reading.{" "}
            <Link href="/blog" className="ink-link">
              the rest of the notes →
            </Link>
          </p>
        </Container>
      </main>
    </>
  );
}
