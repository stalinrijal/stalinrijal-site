import { PLACEHOLDER_BLOG_POSTS } from "@/lib/data/home";
import { MarqueeTrack } from "./MarqueeTrack";

export function BlogMarquee() {
  return (
    <section id="blog">
      <div className="section-inner">
        <h2 className="section-title">Latest Articles</h2>
      </div>

      <MarqueeTrack posts={PLACEHOLDER_BLOG_POSTS} />

      <div className="section-inner">
        <div className="view-more-wrap">
          <a href="https://medium.com/@stalinrijal" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Read More on Medium ↗
          </a>
        </div>
      </div>
    </section>
  );
}
