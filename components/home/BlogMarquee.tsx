import Link from "next/link";
import { PLACEHOLDER_BLOG_POSTS, type PlaceholderPost } from "@/lib/data/home";
import { getRecentPosts } from "@/lib/posts/queries";
import { categoryIcon } from "@/lib/posts/category-icons";
import { MarqueeTrack } from "./MarqueeTrack";

export async function BlogMarquee() {
  const recentPosts = await getRecentPosts(8);

  const posts: PlaceholderPost[] =
    recentPosts.length > 0
      ? recentPosts.map((post) => ({
          emoji: categoryIcon(post.category?.slug),
          tag: post.category?.name ?? "Blog",
          title: post.title,
          excerpt: post.excerpt ?? "",
          date: post.published_at
            ? new Date(post.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
          url: `/blogs/${post.slug}`,
        }))
      : PLACEHOLDER_BLOG_POSTS;

  return (
    <section id="blog">
      <div className="section-inner">
        <h2 className="section-title">Latest Articles</h2>
      </div>

      <MarqueeTrack posts={posts} />

      <div className="section-inner">
        <div className="view-more-wrap">
          <Link href="/blogs" className="btn-secondary">
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
