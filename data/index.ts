export const hero = [
  {
    id: 1,
    title: "full stack engineer",
    description: "building stuff that matters",
  },
  {
    id: 2,
    aboutMe:
      "coding idealist, thirst for knowledge and working on becoming better, romania based, wanting to shape my future",
  },
];

export const navItems = [
  { name: "about", link: "#about" },
  { name: "projects", link: "#projects" },
  { name: "testimonials", link: "#testimonials" },
  { name: "blog", link: "/blog" },
  { name: "contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "i don't just code — i collaborate.",
    description: "clear talks. quick feedback. no ego. just good work.",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.webp",
    spareImg: "",
  },
  {
    id: 2,
    title: "async? sync? middle of the night?",
    description: "i'll show up — timezone-flexible and always caffeinated.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "my tech stack?",
    description: "full and always growing.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "lead dev. mentor. caffeine-powered debugger.",
    description: "led a team of 20 people. smooth shipping.",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.webp",
    spareImg: "/b4.svg",
  },
  {
    id: 5,
    title: "currently building an ai-powered news app.",
    description: "real news. no doomscroll. smart feeds with smart code.",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.webp",
    spareImg: "/grid.webp",
  },
  {
    id: 6,
    title: "got an open role or a cool idea?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "banking app + finance dashboard",
    des: "connected accounts, real-time transactions, smooth transfers — built with next.js 14 and a lot of coffee.",
    img: "/banking1.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://github.com/flvvius/banking-app",
  },
  {
    id: 2,
    title: "employee manager app",
    des: "track performance, manage teams, generate reports — all in a clean react-powered interface.",
    img: "/employee.png",
    iconLists: ["/re.svg"],
    link: "https://github.com/flvvius/Bachelors-Degree-Graduation-Project",
  },
  {
    id: 3,
    title: "student management (moodle-style)",
    des: "real-time feedback, course tracking, smoother experience for students and profs alike.",
    img: "/student.png",
    iconLists: ["/re.svg"],
    link: "https://github.com/flvvius/continuous-feedback-application",
  },
  {
    id: 4,
    title: "interactive map of craiova",
    des: "a travel app for my hometown — built to explore the hidden gems of craiova, romania.",
    img: "/craiova.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://craiova-app.vercel.app/",
  },
];

export const testimonials = [
  {
    quote:
      "As the Team Lead of the IT division, Flavius was a passionate worker who knew how to motivate his team. He was always friendly and encouraging, while assertive enough to make sure no deadlines are passed. He learned new technologies with speed and ease and had a strong creative vision. I'm honored to have had the privilage of working with him.",
    name: "Alexandru Predescu",
    title: "Director of IT department @ SiSC",
    photo: "/predescu.jpg",
  },
  {
    quote:
      "During the time I spent in college, Flavius was the person I learned with for every exam, and also the person with whom I realised every team project. He is smart, dedicated to programming, especially when it comes about web development and also very organized. I had a lot of things to learn from him and I am happy to say that at the end of the college, I would be happy to work with him again at any other project. He is a team player, an optimistic person and also one of the greatest programmers that I've met.",
    name: "Andreea Maria Constantin",
    title: "Dev Engineer @ ING Hubs",
    photo: "/andreea.jpg",
  },
  {
    quote: `I highly recommend Flavius as a software developer. He's incredibly innovative, hardworking, and always open to new ideas. Working with him has been an amazing experience—he brings fresh perspectives to every project and is never afraid to tackle challenges head-on. Flavius's problem-solving skills and adaptability make him a valuable teammate. He's always willing to learn, collaborate, and improve, which makes working with him both productive and enjoyable. His passion for coding and creativity truly set him apart. Any team would be lucky to have him!`,
    name: "Radu Petruța",
    title: "Full Stack Software Engineer @ Operative",
    photo: "/petruta.jpg",
  },
];

export const companies = [
  {
    id: 1,
    name: "example",
    img: "/example.svg",
    nameImg: "/exampleName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "lead dev - Academia SpEranței @ SiSC",
    desc: "ran a 20-person dev team, built the site, fixed merge hell, and made it all work. a project close to my heart — lots of growth, both technical and human.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 2,
    title: "web dev intern @ ubisoft",
    desc: "got hands-on with react, js, apis, monitoring, and docker. learned from pros. soaked up everything like a sponge.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "back-end dev @ SiSC",
    desc: "node.js + express + teamwork = growth. sharpened my logic, built real stuff, and learned how to communicate like a dev who gets things done.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 4,
    title: "freelance dev (next.js + react native)",
    desc: "built a website and helped ship a mobile app for a real client. next.js for the web, react native for ios + android. solo, but solid.",
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
];

export const aboutMe = [
  {
    id: 1,
    face: "know",
    title: "hiking",
    description:
      "It's all about being outdoors, walking new trails, and seeing nature at its best. For me, every hike is an adventure, and each step brings excitement, peace, and a deeper connection with the world around me.",
  },
  {
    id: 2,
    face: "me",
    title: "playing chess",
    description:
      "It's fun, challenging, and makes me think in a different way. Sometimes I get pretty mad when I mess up or lose a good position, but that's part of the game. I play the Sicilian Defense a lot and enjoy the back-and-forth, the quiet focus, and how every match feels like a new challenge.",
  },
  {
    id: 3,
    face: "better",
    title: "music",
    description:
      "I listen to all kinds of stuff — some weirder than others — but it's what makes me feel alive. Prog rock is probably my favorite, but I'm also into rap and metal. I like mixing up genres and finding new artists to get inspired by.",
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/flvvius",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://x.com/flaviuscj1",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/flavius-cojocaru-20834a246/",
  },
];

export const footer = {
  title: "looking for a dev who actually enjoys this stuff?",
  description:
    "i'm down to build cool things — solo or with a team. startups, solid teams, side gigs — if it involves clean code and good vibes, i’m in. let’s talk.",
};
