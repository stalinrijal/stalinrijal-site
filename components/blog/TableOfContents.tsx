"use client";

import { useState } from "react";
import { useScrollSpy } from "@/lib/hooks/useScrollSpy";
import type { Heading } from "@/lib/content/render";

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const [collapsed, setCollapsed] = useState(false);
  const activeId = useScrollSpy(headings.map((h) => h.id));

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-20 hidden max-h-[calc(100vh-6rem)] overflow-y-auto lg:block">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-500 hover:text-neutral-300"
      >
        On this page {collapsed ? "▸" : "▾"}
      </button>
      {!collapsed && (
        <ul className="space-y-1.5 text-sm">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
                className={`block border-l-2 py-0.5 pl-3 transition ${
                  activeId === heading.id
                    ? "border-neutral-100 text-neutral-100"
                    : "border-neutral-800 text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
