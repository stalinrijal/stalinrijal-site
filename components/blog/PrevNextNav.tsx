import Link from "next/link";
import type { PostSummary } from "@/lib/posts/queries";

export function PrevNextNav({ prev, next }: { prev: PostSummary | null; next: PostSummary | null }) {
  if (!prev && !next) return null;

  return (
    <nav className="grid gap-4 border-t border-neutral-800 pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={`/blogs/${prev.slug}`}
          className="rounded-lg border border-neutral-800 p-4 hover:border-neutral-600"
        >
          <div className="text-xs text-neutral-400">← Previous</div>
          <div className="mt-1 font-medium text-neutral-100">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/blogs/${next.slug}`}
          className="rounded-lg border border-neutral-800 p-4 text-right hover:border-neutral-600"
        >
          <div className="text-xs text-neutral-400">Next →</div>
          <div className="mt-1 font-medium text-neutral-100">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
