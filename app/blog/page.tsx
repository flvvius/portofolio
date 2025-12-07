import { blogPosts } from "@/data/blog";
import Link from "next/link";

const Blog = () => {
  return (
    <div>
      <h1>exploring the emotional side of coding</h1>
      {blogPosts.map((post) => (
        <Link key={post.id} className="mb-10" href={`/blog/${post.id}`}>
          <div>
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-sm text-gray-500 mb-4">{post.date}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
