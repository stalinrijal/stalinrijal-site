import Link from "next/link";
import { signOutAction } from "@/app/login/actions";

export function AdminNav({ email }: { email: string }) {
  return (
    <header className="border-b border-neutral-800 px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-semibold text-neutral-100">
            Admin
          </Link>
          <Link href="/admin/posts" className="text-sm text-neutral-400 hover:text-neutral-100">
            Posts
          </Link>
        </div>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          <span>{email}</span>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-md border border-neutral-700 px-3 py-1.5 text-neutral-200 hover:bg-neutral-900"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
