import { FaGithub, FaLinkedin, FaXTwitter, FaEnvelope } from "react-icons/fa6";

const FooterNew = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-20 relative">
      {/* Main CTA */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 font-mono text-sm">
                CONNECTION READY
              </span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let&apos;s build something{" "}
              <span className="text-cyan-400">together</span>
            </h3>

            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Looking for a dev who actually enjoys this stuff? I&apos;m down to
              build cool things — solo or with a team. Startups, solid teams,
              side gigs — if it involves clean code and good vibes, I&apos;m in.
            </p>

            <a
              href="mailto:flavius@example.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 rounded-xl font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <FaEnvelope />
              <span>./send-message</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-cyan-500/10">
        {/* Logo/Name */}
        <div className="font-mono text-gray-400">
          <span className="text-cyan-400">~/</span>flavius.cojocaru
          <span className="text-gray-600 ml-2">v2.0</span>
        </div>

        {/* Social links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/flvvius"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-all duration-300"
          >
            <FaGithub className="text-xl" />
          </a>
          <a
            href="https://www.linkedin.com/in/flavius-cojocaru-20834a246/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-all duration-300"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href="https://x.com/flaviuscj1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/30 text-gray-400 hover:text-cyan-400 transition-all duration-300"
          >
            <FaXTwitter className="text-xl" />
          </a>
        </div>

        {/* Copyright */}
        <div className="font-mono text-sm text-gray-600">
          © {currentYear}{" "}
          <span className="text-gray-500">// all rights reserved</span>
        </div>
      </div>

      {/* Terminal closing */}
      <div className="mt-8 text-center">
        <p className="font-mono text-sm text-gray-600">
          <span className="text-cyan-500/50">&gt;</span> exit 0
        </p>
      </div>
    </footer>
  );
};

export default FooterNew;
