import type { PostSummary } from "@/lib/posts/queries";
import { PostCard } from "./PostCard";

export function PostGrid({ posts }: { posts: PostSummary[] }) {
  if (posts.length === 0) {
    return <p className="py-16 text-center text-neutral-400">No posts found.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
