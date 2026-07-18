"use client";

import { useEffect, useState } from "react";

/** Returns the id of the section currently under the nav offset, matching the original scroll-spy logic. */
export function useScrollSpy(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop - 100;
        const bottom = top + el.offsetHeight;
        if (scrollY >= top && scrollY < bottom) {
          current = id;
          break;
        }
      }
      setActiveId(current);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ids]);

  return activeId;
}
