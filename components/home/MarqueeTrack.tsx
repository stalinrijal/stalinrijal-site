"use client";

import { useEffect, useRef, useState } from "react";
import type { PlaceholderPost } from "@/lib/data/home";

export function MarqueeTrack({ posts }: { posts: PlaceholderPost[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);
  const doubled = [...posts, ...posts];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function updateAnimDist() {
      if (!track) return;
      const halfW = track.scrollWidth / 2;
      let styleEl = document.getElementById("slide-style") as HTMLStyleElement | null;
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "slide-style";
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = `
        @keyframes scrollBlogs {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${halfW}px); }
        }
      `;
    }

    updateAnimDist();
    window.addEventListener("resize", updateAnimDist);
    return () => {
      window.removeEventListener("resize", updateAnimDist);
      document.getElementById("slide-style")?.remove();
    };
  }, [posts]);

  return (
    <div
      className="blog-slideshow-outer"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className={`blog-track${paused ? " paused" : ""}`} ref={trackRef}>
        {doubled.map((post, i) => (
          <a
            className="blog-card"
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            key={`${post.title}-${i}`}
          >
            <div className="blog-thumb">{post.emoji}</div>
            <div className="blog-body">
              <span className="blog-tag">{post.tag}</span>
              <div className="blog-title">{post.title}</div>
              <div className="blog-excerpt">{post.excerpt}</div>
            </div>
            <div className="blog-footer">
              <span className="blog-date">{post.date}</span>
              <span className="blog-arrow">↗</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
