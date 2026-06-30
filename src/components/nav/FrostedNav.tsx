"use client";

import { useState } from "react";
import { SITE } from "@/lib/site-config";
import { useScrollNav } from "@/lib/hooks/useScrollNav";

export function FrostedNav() {
  const scrolled = useScrollNav(40);
  const [open, setOpen] = useState(false);

  const handleNav = (href: string) => {
    setOpen(false);
    if (!href.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    const navHeight = 72;
    const top =
      target.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={`intro-nav ${scrolled ? "intro-nav--scrolled" : ""}`}
      role="banner"
    >
      <nav className="intro-nav__inner" aria-label="Primary">
        <a href="#intro" className="intro-nav__brand" onClick={() => setOpen(false)}>
          {SITE.nav.brand}
        </a>

        <button
          type="button"
          className="intro-nav__toggle"
          aria-expanded={open}
          aria-controls="intro-nav-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>

        <ul id="intro-nav-menu" className={`intro-nav__links ${open ? "is-open" : ""}`}>
          {SITE.nav.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="intro-nav__link"
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    e.preventDefault();
                    handleNav(link.href);
                  } else {
                    setOpen(false);
                  }
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}