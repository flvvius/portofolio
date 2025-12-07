const experiences = [
  {
    id: 1,
    hash: "a3f7c2d",
    role: "Lead Developer",
    company: "Academia SpEranței @ SiSC",
    date: "2023 - 2024",
    description:
      "Ran a 20-person dev team, built the site from scratch, fixed merge hell, and made it all work. A project close to my heart.",
    tags: ["Leadership", "Next.js", "Team Management"],
    branch: "main",
  },
  {
    id: 2,
    hash: "b8e4f1a",
    role: "Web Dev Intern",
    company: "Ubisoft",
    date: "Summer 2023",
    description:
      "Got hands-on with React, JS, APIs, monitoring, and Docker. Learned from pros. Soaked up everything like a sponge.",
    tags: ["React", "Docker", "APIs"],
    branch: "feature/internship",
  },
  {
    id: 3,
    hash: "c2d9e5b",
    role: "Back-End Developer",
    company: "SiSC",
    date: "2022 - 2023",
    description:
      "Node.js + Express + teamwork = growth. Sharpened my logic, built real stuff, and learned how to communicate like a dev.",
    tags: ["Node.js", "Express", "PostgreSQL"],
    branch: "feature/backend",
  },
  {
    id: 4,
    hash: "d5a2c8f",
    role: "Freelance Developer",
    company: "Self-employed",
    date: "2022 - Present",
    description:
      "Built websites and helped ship mobile apps for real clients. Next.js for web, React Native for iOS + Android. Solo, but solid.",
    tags: ["Next.js", "React Native", "Freelance"],
    branch: "feature/freelance",
  },
];

const ExperienceNew = () => {
  return (
    <section id="experience" className="py-20 relative">
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 font-mono">&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            git<span className="text-cyan-400">.</span>log
          </h2>
        </div>
        <p className="text-gray-400 font-mono text-sm ml-6">
          // git log --oneline --graph career
        </p>
      </div>

      {/* Git log style timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="relative pl-16 md:pl-20">
              {/* Commit dot */}
              <div className="absolute left-4 md:left-6 w-4 h-4 rounded-full bg-cyan-500 border-4 border-black-100 z-10" />

              {/* Branch indicator */}
              <div className="absolute left-12 md:left-14 top-1 text-xs font-mono text-purple-400">
                [{exp.branch}]
              </div>

              {/* Card */}
              <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 mt-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-yellow-500 font-mono text-sm">
                        commit {exp.hash}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-cyan-400 font-mono text-sm">
                      {exp.company}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-400 text-sm font-mono">
                    {exp.date}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 mb-4">{exp.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* End marker */}
          <div className="relative pl-16 md:pl-20">
            <div className="absolute left-4 md:left-6 w-4 h-4 rounded-full bg-purple-500/50 border-4 border-black-100 z-10" />
            <p className="text-gray-500 font-mono text-sm pt-2">
              // to be continued...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceNew;
