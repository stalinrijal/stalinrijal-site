import Link from "next/link";
import Image from "next/image";
import type { PostSummary } from "@/lib/posts/queries";
import { categoryIcon } from "@/lib/posts/category-icons";

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <Link
      href={`/blogs/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 transition hover:border-neutral-600"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
        {post.cover_image ? (
          <Image
            src={post.cover_image}
            alt={post.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            {categoryIcon(post.category?.slug)}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        {post.category && (
          <span className="w-fit rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400">
            {post.category.name}
          </span>
        )}
        <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-white">{post.title}</h3>
        {post.excerpt && <p className="line-clamp-2 text-sm text-neutral-400">{post.excerpt}</p>}
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-neutral-400">
          {post.published_at && (
            <span>
              {new Date(post.published_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
          {post.reading_time && <span>· {post.reading_time} min read</span>}
        </div>
      </div>
    </Link>
  );
}
