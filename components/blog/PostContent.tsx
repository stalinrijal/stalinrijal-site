"use client";

import { useEffect, useRef } from "react";

export function PostContent({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const cleanups: (() => void)[] = [];
    container.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-code-btn")) return;
      pre.style.position = "relative";
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "Copy";
      button.className =
        "copy-code-btn absolute right-2 top-2 rounded border border-neutral-700 bg-neutral-900/80 px-2 py-1 text-xs text-neutral-300 hover:bg-neutral-800";
      const handleClick = async () => {
        const code = pre.querySelector("code")?.textContent ?? "";
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = "Copied!";
        } catch {
          button.textContent = "Failed";
        }
        setTimeout(() => {
          button.textContent = "Copy";
        }, 1500);
      };
      button.addEventListener("click", handleClick);
      pre.appendChild(button);
      cleanups.push(() => button.removeEventListener("click", handleClick));
    });

    return () => cleanups.forEach((fn) => fn());
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose prose-invert max-w-none prose-headings:scroll-mt-24"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
