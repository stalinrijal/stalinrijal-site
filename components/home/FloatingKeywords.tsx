"use client";

import { useEffect, useRef } from "react";
import { FLOATING_KEYWORDS, FLOATING_KEYWORD_SLOTS } from "@/lib/data/home";

export function FloatingKeywords() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const slotEls = FLOATING_KEYWORD_SLOTS.map((pos) => {
      const el = document.createElement("span");
      el.className = "fk";
      Object.entries(pos).forEach(([k, v]) => {
        if (v) el.style.setProperty(k, v as string);
      });
      container.appendChild(el);
      return el;
    });

    let pool = [...FLOATING_KEYWORDS].sort(() => Math.random() - 0.5);
    function nextKw() {
      if (!pool.length) pool = [...FLOATING_KEYWORDS].sort(() => Math.random() - 0.5);
      return pool.pop()!;
    }

    slotEls.forEach((el, i) => {
      const kw = nextKw();
      el.textContent = kw.text;
      if (kw.color === "blue") el.classList.add("accent2");
      const dur = (3.5 + Math.random() * 3).toFixed(1);
      const delay = (i * 0.35).toFixed(1);
      el.style.setProperty("--dur", dur + "s");
      el.style.setProperty("--delay", delay + "s");

      function cycle() {
        const nkw = nextKw();
        el.textContent = nkw.text;
        el.classList.toggle("accent2", nkw.color === "blue");
        const ndur = (3.5 + Math.random() * 3).toFixed(1);
        el.style.setProperty("--dur", ndur + "s");
        el.style.setProperty("--delay", "0s");
        el.style.animation = "none";
        void el.offsetWidth;
        el.style.animation = "";
        timeouts.push(setTimeout(cycle, parseFloat(ndur) * 1000 + 200));
      }

      timeouts.push(setTimeout(cycle, (parseFloat(dur) + parseFloat(delay)) * 1000 + 200));
    });

    return () => {
      timeouts.forEach(clearTimeout);
      slotEls.forEach((el) => el.remove());
    };
  }, []);

  return <div className="floating-keywords" id="floating-kw" ref={containerRef} />;
}
