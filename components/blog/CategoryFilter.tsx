import Link from "next/link";
import type { CategoryRef } from "@/lib/posts/queries";

export function CategoryFilter({
  categories,
  activeSlug,
  buildHref,
}: {
  categories: CategoryRef[];
  activeSlug?: string;
  buildHref: (categorySlug?: string) => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref(undefined)}
        className={`rounded-full px-3 py-1 text-sm ${
          !activeSlug ? "bg-neutral-100 text-neutral-900" : "bg-neutral-900 text-neutral-400 hover:text-neutral-100"
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={buildHref(category.slug)}
          className={`rounded-full px-3 py-1 text-sm ${
            activeSlug === category.slug
              ? "bg-neutral-100 text-neutral-900"
              : "bg-neutral-900 text-neutral-400 hover:text-neutral-100"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
