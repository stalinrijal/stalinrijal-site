"use client";

import { deletePost } from "@/app/admin/posts/actions";

export function DeletePostButton({ postId }: { postId: string }) {
  return (
    <form
      action={deletePost.bind(null, postId)}
      onSubmit={(e) => {
        if (!window.confirm("Delete this post? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-sm text-red-400 hover:text-red-300">
        Delete
      </button>
    </form>
  );
}
