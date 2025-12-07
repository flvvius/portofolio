"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "about", link: "#about", cmd: "cd ~/about" },
  { name: "projects", link: "#projects", cmd: "ls projects/" },
  { name: "experience", link: "#experience", cmd: "git log" },
  { name: "blog", link: "/blog", cmd: "cat blog.md" },
  { name: "contact", link: "#contact", cmd: "./contact.sh" },
];

export const NavbarNew = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["about", "projects", "experience", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          "hidden md:block"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-2xl transition-all duration-500",
            "bg-black/60 backdrop-blur-xl border border-cyan-500/20",
            isScrolled && "shadow-lg shadow-cyan-500/10"
          )}
        >
          {/* Logo/Home */}
          <Link
            href="/"
            className="px-4 py-2 text-cyan-400 font-mono text-sm hover:text-white transition-colors"
          >
            ~/flvvius
          </Link>

          <div className="w-px h-6 bg-cyan-500/20 mx-2" />

          {/* Nav items */}
          {navItems.map((item) =>
            item.link.startsWith("/") ? (
              <Link
                key={item.name}
                href={item.link}
                className={cn(
                  "group relative px-4 py-2 rounded-xl font-mono text-sm transition-all duration-300",
                  "hover:bg-cyan-500/10",
                  activeSection === item.name
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <span className="text-cyan-500/60 mr-1">&gt;</span>
                {item.name}
                {/* Tooltip with command */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-cyan-500/20 rounded text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.cmd}
                </span>
              </Link>
            ) : (
              <a
                key={item.name}
                href={item.link}
                className={cn(
                  "group relative px-4 py-2 rounded-xl font-mono text-sm transition-all duration-300",
                  "hover:bg-cyan-500/10",
                  activeSection === item.name
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-400 hover:text-white"
                )}
              >
                <span className="text-cyan-500/60 mr-1">&gt;</span>
                {item.name}
                {/* Tooltip with command */}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 border border-cyan-500/20 rounded text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.cmd}
                </span>
              </a>
            )
          )}
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-sm",
            "bg-black/60 backdrop-blur-xl border border-cyan-500/20",
            "text-cyan-400 transition-all duration-300"
          )}
        >
          <span>{isMobileOpen ? "×" : "≡"}</span>
          <span>menu</span>
        </button>

        {/* Mobile dropdown */}
        {isMobileOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-black/90 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden">
            {navItems.map((item) =>
              item.link.startsWith("/") ? (
                <Link
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 font-mono text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <span className="text-cyan-500/60 mr-2">&gt;</span>
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.link}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-4 py-3 font-mono text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                >
                  <span className="text-cyan-500/60 mr-2">&gt;</span>
                  {item.name}
                </a>
              )
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default NavbarNew;
