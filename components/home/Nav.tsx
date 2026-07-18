"use client";

import { useState } from "react";
import { NAV_LINKS, SECTION_IDS } from "@/lib/data/home";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";

export function Nav() {
  const [open, setOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  return (
    <nav>
      <div className="nav-logo">STALIN RIJAL</div>
      <ul className={`nav-links${open ? " open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={activeId === link.href.slice(1) ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Contact
          </a>
        </li>
      </ul>
      <button
        type="button"
        className="hamburger"
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
