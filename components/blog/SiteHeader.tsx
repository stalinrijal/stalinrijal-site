import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-neutral-100">
          Stalin Rijal
        </Link>
        <nav className="flex items-center gap-6 text-sm text-neutral-400">
          <Link href="/" className="hover:text-neutral-100">
            Home
          </Link>
          <Link href="/blogs" className="hover:text-neutral-100">
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
