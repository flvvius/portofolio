type BlogPostProps = {
  params: {
    id: string;
  };
};

const BlogPost = async ({ params }: BlogPostProps) => {
  const { id } = await params;
    
  return <div>BlogPost {id}</div>;
};

export default BlogPost;
