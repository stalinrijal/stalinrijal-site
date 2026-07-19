import Link from "next/link";
import type { TagRef } from "@/lib/posts/queries";

export function TagList({
  tags,
  activeSlug,
  buildHref,
}: {
  tags: TagRef[];
  activeSlug?: string;
  buildHref: (tagSlug?: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.id}
          href={buildHref(activeSlug === tag.slug ? undefined : tag.slug)}
          className={`rounded-full border px-2.5 py-0.5 text-xs ${
            activeSlug === tag.slug
              ? "border-neutral-100 text-neutral-100"
              : "border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
          }`}
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
}
