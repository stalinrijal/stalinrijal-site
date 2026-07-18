"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RECOMMENDATIONS } from "@/lib/data/home";

const GAP = 24;

export function Recommendations() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [animate, setAnimate] = useState(false);
  const startXRef = useRef(0);
  const draggingRef = useRef(false);

  const total = RECOMMENDATIONS.length;

  useEffect(() => {
    function measure() {
      if (firstCardRef.current) {
        setCardWidth(firstCardRef.current.offsetWidth);
        setAnimate(false);
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  function goTo(i: number, withAnimation = true) {
    const clamped = Math.max(0, Math.min(i, total - 1));
    setAnimate(withAnimation);
    setIndex(clamped);
  }

  function handleTouchStart(e: React.TouchEvent) {
    startXRef.current = e.touches[0].clientX;
    draggingRef.current = true;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (!draggingRef.current) return;
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(dx) > 50) goTo(index + (dx < 0 ? 1 : -1));
    draggingRef.current = false;
  }

  const offset = index * (cardWidth + GAP);

  return (
    <section id="recommendations">
      <div className="section-inner">
        <h2 className="section-title">Recognition from Peers &amp; Leaders</h2>

        <div className="rec-carousel-outer">
          <div className="rec-track-wrap">
            <div
              className="rec-track"
              ref={trackRef}
              style={{
                transform: `translateX(-${offset}px)`,
                transition: animate ? "transform 0.5s cubic-bezier(0.4,0,0.2,1)" : "none",
              }}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {RECOMMENDATIONS.map((rec, i) => (
                <div className="rec-card" key={rec.name} ref={i === 0 ? firstCardRef : undefined}>
                  <div className="rec-quote-mark">&ldquo;</div>
                  <div className="rec-stars">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <span className="rec-star" key={s}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="rec-body">{rec.body}</p>
                  <div className="rec-person">
                    <div className="rec-avatar">
                      <span className="rec-initials">{rec.initials}</span>
                      <Image
                        src={rec.avatar}
                        alt={rec.name}
                        width={52}
                        height={52}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                    <div>
                      <div className="rec-name">{rec.name}</div>
                      <div className="rec-role">{rec.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rec-controls">
          <button type="button" className="rec-arrow" aria-label="Previous" onClick={() => goTo(index - 1)}>
            ←
          </button>
          <div className="rec-dots">
            {RECOMMENDATIONS.map((rec, i) => (
              <button
                type="button"
                key={rec.name}
                className={`rec-dot${i === index ? " active" : ""}`}
                aria-label={`Slide ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button type="button" className="rec-arrow" aria-label="Next" onClick={() => goTo(index + 1)}>
            →
          </button>
        </div>
      </div>
    </section>
  );
}
