import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import { getBlogPost, getAllBlogPosts } from "@/data/blog";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { BlogPostJsonLd } from "@/components/JsonLd";
import { Metadata } from "next";

const baseUrl = "https://flavius.pro";

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    id: post.id,
  }));
}

// Generate metadata for each blog post (enhanced for SEO)
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) {
    return {
      title: "Post Not Found | Blog",
    };
  }

  const postUrl = `${baseUrl}/blog/${post.id}`;

  return {
    title: `${post.title} | Flavius Cojocaru`,
    description: post.excerpt,
    authors: [{ name: "Flavius Cojocaru", url: baseUrl }],
    alternates: {
      canonical: postUrl,
    },
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

const moodEmoji: Record<string, string> = {
  reflective: "🌙",
  excited: "✨",
  frustrated: "🔥",
  hopeful: "🌱",
  vulnerable: "💜",
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = getBlogPost(id);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Split content into paragraphs
  const paragraphs = post.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <>
      <BlogPostJsonLd
        title={post.title}
        description={post.excerpt}
        date={post.date}
        slug={post.id}
      />
      <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
        <div className="max-w-3xl w-full">
          <FloatingNav navItems={navItems} />

          {/* Header with spotlights */}
          <div className="relative pb-12 pt-36">
            {/* Spotlights */}
            <div>
              <Spotlight
                className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
                fill="white"
              />
              <Spotlight
                className="h-[80vh] w-[50vw] top-10 left-full"
                fill="purple"
              />
            </div>

            {/* Grid background */}
            <div
              className="h-[40vh] w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.02] bg-grid-black-100/[0.2]
            absolute top-0 left-0 flex items-center justify-center"
            >
              <div
                className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
              bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
              />
            </div>

            {/* Back button */}
            <div className="relative z-10 mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white-100/60 hover:text-purple transition-colors duration-300 text-sm group"
              >
                <FaArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform duration-300" />
                <span>back to blog</span>
              </Link>
            </div>

            {/* Title */}
            <div className="relative z-10">
              <TextGenerateEffect
                words={post.title}
                className="text-left text-[28px] md:text-3xl lg:text-4xl !leading-tight"
              />

              {/* Meta info */}
              <div className="flex items-center gap-3 text-sm text-white-100/50 mt-6">
                <time dateTime={post.date}>{formattedDate}</time>
                <span className="w-1 h-1 rounded-full bg-white-100/30" />
                <span>{post.readTime}</span>
                {post.mood && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-white-100/30" />
                    <span className="flex items-center gap-1">
                      <span>{moodEmoji[post.mood]}</span>
                      <span className="text-purple/70">{post.mood}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <article className="relative z-10 pb-20">
            <div className="prose prose-invert prose-lg max-w-none">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-white-100/80 leading-relaxed mb-6 text-base md:text-lg"
                >
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-16 mb-8 flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple/30" />
              <span className="text-purple/50 text-xl">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple/30" />
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-white-100/40 text-sm mb-4">
                thanks for reading.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-purple hover:text-purple/80 transition-colors duration-300 text-sm"
              >
                <FaArrowLeft className="w-3 h-3" />
                <span>see all posts</span>
              </Link>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
