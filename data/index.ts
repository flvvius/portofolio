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
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building an AI based news aggregator app.",
    description: "",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
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
    title: "Banking App with Finance Management Dashboard",
    des: "An app that connects multiple bank accounts, displays real-time transactions, and allows you to transfer money to other users on the platform using Next.js 14.",
    img: "/banking1.png",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/c.svg"],
    link: "https://github.com/flvvius/banking-app",
  },
  {
    id: 2,
    title: "Employee Management App",
    des: "An app that allows you to manage your employees, track their performance, and generate reports using React.js.",
    img: "/employee.png",
    iconLists: ["/re.svg"],
    link: "https://github.com/flvvius/Bachelors-Degree-Graduation-Project",
  },
  {
    id: 3,
    title: "Moodle clone - Student Management App",
    des: "A Moodle clone that allows you to interact in real time as a student with the course you are taking.",
    img: "/student.png",
    iconLists: ["/re.svg"],
    link: "https://github.com/flvvius/continuous-feedback-application",
  },
  {
    id: 4,
    title: "Interactive Map of Craiova - Travel App",
    des: "An interactive map of Craiova, Romania, that allows you to explore the city and its attractions.",
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
    name: "cloudinary",
    img: "/cloud.svg",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "appwrite",
    img: "/app.svg",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "HOSTINGER",
    img: "/host.svg",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "stream",
    img: "/s.svg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "docker.",
    img: "/dock.svg",
    nameImg: "/dockerName.svg",
  },
];

export const workExperience = [
  {
    id: 1,
    title: "Web Developer Intern",
    desc: `I took part in courses offered by Ubisoft, where I learned about key technologies and concepts like JavaScript, React, API calls, monitoring, and Docker for containerization.`,
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Lead IT of Academia SpEranței",
    desc: "Academia SpEranței was a project close to my heart, as it represents the mark I left on SiSC. I led a team of 20 passionate IT members, and together we built strong, meaningful relationships in addition to developing the website itself.",
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "IT Back-End Developer - SiSC",
    desc: "Professionally, I gained hands-on experience in Back-End Development, including learning Node.js and Express. On a personal level, collaborating with a team of dedicated and driven individuals helped me enhance my communication, critical thinking, and teamwork skills.",
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  },
  {
    id: 4,
    title: "Freelancer - Web Developer",
    desc: "I worked as a freelancer for a client, where I built a website using Next.js and Tailwind CSS. I also assisted in the development of a mobile app for both iOS and Android platforms using React Native.",
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
  title: "Need a developer who actually loves this stuff?",
  description:
    "Whether it's a fast-paced startup or a well-established team, I'm excited to bring ideas to life through clean code and creative problem-solving. Let's get in touch and see how we can work together!",
};
