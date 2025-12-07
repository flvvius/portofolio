import { getAllBlogPosts } from "@/data/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { BlogListJsonLd } from "@/components/JsonLd";
import { Metadata } from "next";

const baseUrl = "https://flavius.pro";

export const metadata: Metadata = {
  title: "Blog | Flavius Cojocaru",
  description:
    "Thoughts from the trenches — the emotional side of being a developer. Raw reflections on coding, learning, and the journey.",
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
  openGraph: {
    title: "Blog | Flavius Cojocaru",
    description:
      "Thoughts from the trenches — the emotional side of being a developer. Raw reflections on coding, learning, and the journey.",
    url: `${baseUrl}/blog`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/main.png`,
        width: 1200,
        height: 630,
        alt: "Flavius Cojocaru Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Flavius Cojocaru",
    description:
      "Thoughts from the trenches — the emotional side of being a developer.",
    images: [`${baseUrl}/main.png`],
  },
};

const Blog = () => {
  const posts = getAllBlogPosts();

  return (
    <>
      <BlogListJsonLd />
      <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
        <div className="max-w-5xl w-full">
          <FloatingNav navItems={navItems} />

          <BlogHeader
            title="thoughts from the trenches"
            subtitle="raw reflections on coding, learning, and the emotional rollercoaster of being a developer. no polish, no pretense — just honest thoughts."
          />

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-white-100/40 text-lg">
                no thoughts yet... check back soon.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Blog;
