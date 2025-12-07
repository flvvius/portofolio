import { getAllBlogPosts } from "@/data/blog";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogCard } from "@/components/blog/BlogCard";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export const metadata = {
  title: "Blog | Flavius Cojocaru",
  description:
    "Thoughts from the trenches — the emotional side of being a developer. Raw reflections on coding, learning, and the journey.",
};

const Blog = () => {
  const posts = getAllBlogPosts();

  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 px-5 overflow-clip min-h-screen">
      <div className="max-w-5xl w-full">
        <FloatingNav navItems={navItems} />

        <BlogHeader
          title="thoughts from the trenches"
          subtitle="raw reflections on coding, learning, and the emotional rollercoaster of being a developer. no polish, no pretense — just honest thoughts."
        />

        {/* Back to home */}
        <div className="flex justify-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white-100/60 hover:text-purple transition-colors duration-300 text-sm"
          >
            <FaArrowLeft className="w-3 h-3" />
            <span>back to home</span>
          </Link>
        </div>

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
  );
};

export default Blog;
