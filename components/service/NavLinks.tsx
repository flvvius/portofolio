"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      {links.map(({ href, label }) => {
        const exact = pathname === href;
        const within =
          pathname.startsWith(`${href}/`) ||
          (href === "/about" &&
            ["/projects", "/experience"].includes(pathname));
        return (
          <Link
            key={href}
            href={href}
            aria-current={exact ? "page" : within ? "location" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
