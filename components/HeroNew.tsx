import { FaGithub, FaLinkedin, FaTerminal } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const HeroNew = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse delay-1000" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Terminal window */}
        <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-cyan-500/10">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="ml-4 text-cyan-400/60 text-sm font-mono">
              flavius@portfolio ~{" "}
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-6 md:p-10 font-mono">
            {/* Command line intro */}
            <div className="flex items-start gap-3 mb-6">
              <span className="text-cyan-400 select-none">&gt;</span>
              <div>
                <span className="text-gray-400">whoami</span>
              </div>
            </div>

            {/* Output */}
            <div className="ml-6 space-y-6">
              {/* Name with glitch effect */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                <span className="text-white">flavius</span>
                <span className="text-cyan-400">.</span>
                <span className="text-purple-400">cojocaru</span>
              </h1>

              {/* Title badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm">
                  full-stack engineer
                </span>
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm">
                  lead developer
                </span>
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm">
                  open to work
                </span>
              </div>

              {/* Bio */}
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
                <span className="text-cyan-400">{`{`}</span> building stuff that
                matters. coding idealist with a thirst for knowledge.
                romania-based, future-focused.{" "}
                <span className="text-cyan-400">{`}`}</span>
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 py-4 border-y border-cyan-500/10">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    20+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    team led
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    4+
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    years coding
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    ∞
                  </div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">
                    coffee cups
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/flvvius"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-lg transition-all duration-300"
                >
                  <FaGithub className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                    github
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/flavius-cojocaru-20834a246/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-lg transition-all duration-300"
                >
                  <FaLinkedin className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                    linkedin
                  </span>
                </a>
                <a
                  href="https://x.com/flaviuscj1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 rounded-lg transition-all duration-300"
                >
                  <FaXTwitter className="text-xl text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-gray-400 group-hover:text-white text-sm transition-colors">
                    twitter
                  </span>
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#projects"
                className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-lg font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                <FaTerminal className="text-lg" />
                <span>./view-projects</span>
              </a>
              <Link
                href="/blog"
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-cyan-500/50 rounded-lg font-medium text-white transition-all duration-300"
              >
                <span className="text-cyan-400">$</span>
                <span>read blog</span>
              </Link>
            </div>

            {/* Blinking cursor */}
            <div className="mt-8 flex items-center gap-2">
              <span className="text-cyan-400">&gt;</span>
              <span className="w-3 h-5 bg-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
          <span className="text-xs uppercase tracking-widest">scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroNew;
