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
    readTime: "4 min read",
    excerpt:
      "what if I start a blog, not as something that will help my career, but as a journal where I can drop my thoughts and emotions related to programming?",
    mood: "reflective",
    content: `Last night I had an idea about starting a blog… a random idea at first, but now it starts to make sense. I don't want to start the blog just for the sake of it, but rather as a tool, a notepad where I can brain dump all my thoughts and emotions about coding itself and the emotions that come with it. It all started from a thought I had: I'm an optimizer, who is constantly trying to optimize every single aspect of his life, including coding… but I also know that you get the most knowledge from coding by doing it with passion, just for the sake of doing it… not with a particular goal in mind, not to achieve something… so like, I had this loop of meta cognitions where I wanted mastery in software development, but I also wanted to do it purely for fun and at the same time I was aware that I probably can't do it entirely for fun if in the back of my head I'm thinking about mastery.

    That's a super fucked up loop, because it can feel like it's some sort of purgatory, where I know what I want and how to achieve it, but in order to achieve it I must not want it in the first place… that's impossible, right?

    So I put my thoughts down about this idea and then started reading them again... and then the idea just dropped out of nowhere: what if I start a blog, but not as something that will help my career in any way, but as a journal-like notebook, where I can drop my thoughts and emotions related to programming? This way I will be free to put out of my head stuff that's not perfect, stuff that's not carefully structured and organized… on a blog that's not perfect. And I honestly like this idea a lot… to do something just for the sake of doing it, not with a future benefit in mind. I don't even know if I'll show this to anybody, I'm still thinking about it.

    And I just realized, while writing this, that the simple fact of writing about my thoughts and concerns gave me… enthusiasm to write code… the thing that I always wanted in the first place…

    I just needed… not to focus on that, but to trust my gut feeling and do whatever the fuck I felt like doing…

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
