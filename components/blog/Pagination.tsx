import Link from "next/link";

export function Pagination({
  page,
  totalPages,
  buildHref,
}: {
  page: number;
  totalPages: number;
  buildHref: (page: number) => string;
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-3 pt-10">
      <Link
        href={buildHref(Math.max(1, page - 1))}
        className={`rounded-md border border-neutral-700 px-3 py-1.5 text-sm ${
          page === 1 ? "pointer-events-none opacity-40" : "text-neutral-200 hover:bg-neutral-900"
        }`}
      >
        Previous
      </Link>
      <span className="text-sm text-neutral-400">
        Page {page} of {totalPages}
      </span>
      <Link
        href={buildHref(Math.min(totalPages, page + 1))}
        className={`rounded-md border border-neutral-700 px-3 py-1.5 text-sm ${
          page === totalPages ? "pointer-events-none opacity-40" : "text-neutral-200 hover:bg-neutral-900"
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
