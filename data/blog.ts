export type BlogPost = {
  id: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
  mood?: "reflective" | "excited" | "frustrated" | "hopeful" | "vulnerable";
};

export const blogPosts: BlogPost[] = [
  {
    id: "exploring-something-new",
    title: "exploring something new",
    date: "2025-12-06",
    readTime: "2 min read",
    excerpt:
      "what if I start a blog that does nothing for my career? a journal, where I drop whatever's in my head about programming.",
    mood: "reflective",
    content: `Last night I had an idea about starting a blog. Random at first, but now it starts to make sense. Not for the sake of having a blog, but as a tool, a notepad where I can brain dump everything I feel about coding.

    It started from a thought: I'm an optimizer, constantly tuning every aspect of my life, coding included… but I also know you learn the most from coding when you do it out of passion, with no goal attached. So I got stuck in this loop where I wanted mastery in software development and I also wanted to do it purely for fun, while being aware that I probably can't do it purely for fun if mastery is sitting in the back of my head.

    That's a vicious loop, because it feels like purgatory: I know what I want and how to get it, but to get it I have to not want it in the first place… that's impossible, right?

    So I wrote all this down and started reading it again... and then it dropped out of nowhere: what if I start a blog that does nothing for my career? A journal, where I drop whatever's in my head about programming. That way I'm free to publish stuff that's unfinished, unstructured, messy. And I honestly like this a lot. I don't even know if I'll show it to anybody, I'm still thinking about it.

    And I just realized, while writing this, that putting my concerns on paper gave me… enthusiasm to write code. The thing I wanted all along.

    I just needed to stop chasing it, trust my gut, and do whatever I actually felt like doing…

    And that's amazing.`,
  },
];

export const getBlogPost = (id: string): BlogPost | undefined => {
  return blogPosts.find((post) => post.id === id);
};

export const getAllBlogPosts = (): BlogPost[] => {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};
