"use client";

import { LINKS } from "@/lib/constants";

const NAV_ITEMS = [
  { label: "LinkedIn", href: LINKS.linkedin, external: true },
  { label: "Naukri", href: LINKS.naukri, external: true },
  { label: "Medium", href: LINKS.medium, external: true },
  { label: "Email", href: LINKS.email, external: false },
  { label: "Resume", href: LINKS.resume, external: false },
] as const;

export function TopNav() {
  return (
    <nav className="fixed top-0 right-0 z-50 px-4 md:px-8 py-4 md:py-6 bg-gradient-to-l from-[#030712]/90 via-[#030712]/50 to-transparent pl-16 md:pl-24">
      <ul className="flex items-center gap-1 md:gap-2">
        {NAV_ITEMS.map((item, i) => (
          <li key={item.label} className="flex items-center">
            <a
              href={item.href}
              target={item.external ? "_blank" : "_blank"}
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 md:px-3 md:py-2 font-mono text-[10px] md:text-xs tracking-wide text-white/45 hover:text-highlight transition-colors duration-300 uppercase"
            >
              {item.label}
            </a>
            {i < NAV_ITEMS.length - 1 && (
              <span className="text-white/15 text-[10px] select-none hidden sm:inline">/</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}