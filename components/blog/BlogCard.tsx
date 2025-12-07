import Link from "next/link";
import { BlogPost } from "@/data/blog";
import { cn } from "@/lib/utils";

const moodColors: Record<string, string> = {
  reflective: "from-blue-500/20 to-purple-500/20",
  excited: "from-yellow-500/20 to-orange-500/20",
  frustrated: "from-red-500/20 to-pink-500/20",
  hopeful: "from-green-500/20 to-teal-500/20",
  vulnerable: "from-purple-500/20 to-indigo-500/20",
};

type BlogCardProps = {
  post: BlogPost;
  index: number;
};

export const BlogCard = ({ post, index }: BlogCardProps) => {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // CSS animation delay based on index (staggered entrance)
  const animationDelay = `${index * 100}ms`;

  return (
    <div
      className="animate-fade-in-up opacity-0"
      style={{ animationDelay, animationFillMode: "forwards" }}
    >
      <Link href={`/blog/${post.id}`} className="block group">
        <article
          className={cn(
            "relative h-full p-6 rounded-2xl",
            "bg-black-200 border border-white/[0.1]",
            "transition-all duration-300 ease-out",
            "hover:border-purple/50 hover:shadow-[0_0_30px_-5px_rgba(203,172,249,0.3)]",
            "hover:-translate-y-1"
          )}
        >
          {/* Mood gradient overlay */}
          {post.mood && (
            <div
              className={cn(
                "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "bg-gradient-to-br",
                moodColors[post.mood]
              )}
            />
          )}

          <div className="relative z-10">
            {/* Date and read time */}
            <div className="flex items-center gap-3 text-xs text-white-100/60 mb-3">
              <time dateTime={post.date}>{formattedDate}</time>
              <span className="w-1 h-1 rounded-full bg-white-100/40" />
              <span>{post.readTime}</span>
              {post.mood && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white-100/40" />
                  <span className="text-purple/80">{post.mood}</span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-purple transition-colors duration-300">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-white-100/70 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Read more indicator */}
            <div className="mt-4 flex items-center gap-2 text-purple text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>read more</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};
