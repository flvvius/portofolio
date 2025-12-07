"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  { name: "React / Next.js", level: 95, color: "cyan" },
  { name: "TypeScript", level: 90, color: "blue" },
  { name: "Node.js / Express", level: 85, color: "green" },
  { name: "Tailwind CSS", level: 92, color: "purple" },
  { name: "PostgreSQL / MongoDB", level: 80, color: "orange" },
  { name: "Docker / DevOps", level: 70, color: "red" },
];

const traits = [
  {
    icon: "⚡",
    label: "Fast Learner",
    desc: "Picks up new tech in days, not weeks",
  },
  {
    icon: "🎯",
    label: "Detail-Oriented",
    desc: "Pixel-perfect, bug-free obsession",
  },
  { icon: "🤝", label: "Team Player", desc: "Led 20+ devs, zero drama" },
  { icon: "🌙", label: "Night Owl", desc: "Best code written after midnight" },
];

const AboutNew = () => {
  const [activeTab, setActiveTab] = useState<"skills" | "traits" | "stack">(
    "skills"
  );

  return (
    <section id="about" className="py-20 relative">
      {/* Section header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan-400 font-mono">&gt;</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            system<span className="text-cyan-400">.</span>stats
          </h2>
        </div>
        <p className="text-gray-400 font-mono text-sm ml-6">
          // analyzing developer capabilities...
        </p>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Bio Card */}
        <div className="lg:col-span-1">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-2xl font-bold text-black">
                FC
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">
                  Flavius Cojocaru
                </h3>
                <p className="text-cyan-400 text-sm font-mono">@flvvius</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-cyan-400">📍</span>
                <span className="text-gray-400">Romania, EU</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-cyan-400">🎓</span>
                <span className="text-gray-400">Computer Science Graduate</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-cyan-400">💼</span>
                <span className="text-gray-400">Open to opportunities</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-cyan-500/10">
              <p className="text-gray-300 text-sm leading-relaxed">
                Coding idealist with an endless thirst for knowledge. I build
                things that matter and ship code that works. Currently exploring
                AI and building the future.
              </p>
            </div>

            {/* Status indicator */}
            <div className="mt-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-mono">
                AVAILABLE FOR HIRE
              </span>
            </div>
          </div>
        </div>

        {/* Right: Interactive Stats */}
        <div className="lg:col-span-2">
          <div className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden">
            {/* Tab header */}
            <div className="flex border-b border-cyan-500/10">
              {(["skills", "traits", "stack"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "flex-1 px-6 py-4 font-mono text-sm transition-all duration-300",
                    activeTab === tab
                      ? "text-cyan-400 bg-cyan-500/10 border-b-2 border-cyan-400"
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  {tab === "skills" && "📊 skills"}
                  {tab === "traits" && "🧬 traits"}
                  {tab === "stack" && "🛠️ stack"}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === "skills" && (
                <div className="space-y-4">
                  {skills.map((skill, idx) => (
                    <div key={skill.name} className="group">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-mono text-sm">
                          {skill.name}
                        </span>
                        <span className="text-cyan-400 font-mono text-sm">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${idx * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "traits" && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {traits.map((trait) => (
                    <div
                      key={trait.label}
                      className="p-4 bg-white/5 hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-500/30 rounded-xl transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{trait.icon}</span>
                        <span className="text-white font-medium">
                          {trait.label}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{trait.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "stack" && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-cyan-400 font-mono text-sm mb-3">
                      // frontend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind",
                        "Framer Motion",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-mono text-sm mb-3">
                      // backend
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Node.js",
                        "Express",
                        "PostgreSQL",
                        "MongoDB",
                        "Prisma",
                      ].map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 text-sm font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-mono text-sm mb-3">
                      // tools
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["Git", "Docker", "VS Code", "Figma", "Vercel"].map(
                        (tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm font-mono"
                          >
                            {tech}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutNew;
