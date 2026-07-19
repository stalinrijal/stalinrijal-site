import type { PostSummary } from "@/lib/posts/queries";
import { PostGrid } from "./PostGrid";

export function RelatedPosts({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-neutral-800 pt-8">
      <h2 className="mb-4 text-xl font-semibold text-neutral-100">Related posts</h2>
      <PostGrid posts={posts} />
    </section>
  );
}
