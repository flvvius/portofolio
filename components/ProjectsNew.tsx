"use client";

import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: "Banking App + Finance Dashboard",
    description:
      "Connected accounts, real-time transactions, smooth transfers — built with Next.js 14 and a lot of coffee.",
    image: "/banking1.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Plaid API"],
    github: "https://github.com/flvvius/banking-app",
    live: null,
    status: "completed",
  },
  {
    id: 2,
    title: "Employee Manager App",
    description:
      "Track performance, manage teams, generate reports — all in a clean React-powered interface.",
    image: "/employee.png",
    tags: ["React", "Node.js", "PostgreSQL"],
    github: "https://github.com/flvvius/Bachelors-Degree-Graduation-Project",
    live: null,
    status: "completed",
  },
  {
    id: 3,
    title: "Student Management System",
    description:
      "Real-time feedback, course tracking, smoother experience for students and profs alike.",
    image: "/student.png",
    tags: ["React", "Express", "MongoDB"],
    github: "https://github.com/flvvius/continuous-feedback-application",
    live: null,
    status: "completed",
  },
  {
    id: 4,
    title: "Interactive Map of Craiova",
    description:
      "A travel app for my hometown — built to explore the hidden gems of Craiova, Romania.",
    image: "/craiova.png",
    tags: ["Next.js", "TypeScript", "Mapbox", "Tailwind"],
    github: null,
    live: "https://craiova-app.vercel.app/",
    status: "live",
  },
];

const ProjectsNew = () => {
  return (
    <section id="projects" className="py-20 relative">
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 font-mono">&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            mission<span className="text-cyan-400">.</span>files
          </h2>
        </div>
        <p className="text-gray-400 font-mono text-sm ml-6">
          // ls -la ~/projects | grep &quot;shipped&quot;
        </p>
      </div>

      {/* Projects grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <article
            key={project.id}
            className="group relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-500"
          >
            {/* Project image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Status badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono ${
                    project.status === "live"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  }`}
                >
                  {project.status === "live" ? "● LIVE" : "✓ COMPLETED"}
                </span>
              </div>

              {/* Project number */}
              <div className="absolute top-4 right-4 text-cyan-400/30 font-mono text-4xl font-bold">
                {String(idx + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-gray-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-cyan-500/10">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    <FaGithub />
                    <span>Source</span>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5" />
            </div>
          </article>
        ))}
      </div>

      {/* More projects hint */}
      <div className="mt-8 text-center">
        <a
          href="https://github.com/flvvius"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors font-mono text-sm"
        >
          <span className="text-cyan-400">&gt;</span>
          more on github...
        </a>
      </div>
    </section>
  );
};

export default ProjectsNew;
