"use client";

import { useActionState } from "react";
import { signInAction, type SignInState } from "./actions";

const initialState: SignInState = { error: null };

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(signInAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-4 rounded-lg border border-neutral-800 bg-neutral-900 p-8"
      >
        <h1 className="text-xl font-semibold text-neutral-100">Sign in</h1>
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm text-neutral-400">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-neutral-400">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500"
          />
        </div>
        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-neutral-100 px-3 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
