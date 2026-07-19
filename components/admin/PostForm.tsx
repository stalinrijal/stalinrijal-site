"use client";

import { useActionState, useState } from "react";
import type { JSONContent } from "@tiptap/react";
import dynamic from "next/dynamic";
import { slugify } from "@/lib/posts/slugify";
import { CoverImageUpload } from "./editor/CoverImageUpload";
import { createPost, updatePost, type PostFormState } from "@/app/admin/posts/actions";

const PostEditor = dynamic(() => import("./editor/PostEditor").then((m) => m.PostEditor), {
  ssr: false,
  loading: () => <div className="h-[300px] animate-pulse rounded-md border border-neutral-800 bg-neutral-900" />,
});

type Category = { id: string; name: string };
type Tag = { id: string; name: string };

type PostFormProps = {
  mode: "create" | "edit";
  categories: Category[];
  tags: Tag[];
  post?: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: JSONContent;
    cover_image: string | null;
    category_id: string | null;
    published: boolean;
    tagIds: string[];
  };
};

const initialState: PostFormState = { error: null };
const emptyDoc: JSONContent = { type: "doc", content: [{ type: "paragraph" }] };

export function PostForm({ mode, categories, tags, post }: PostFormProps) {
  const action = mode === "edit" && post ? updatePost.bind(null, post.id) : createPost;
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(mode === "edit");
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [content, setContent] = useState<JSONContent>(post?.content ?? emptyDoc);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-1">
        <label htmlFor="title" className="text-sm text-neutral-400">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="slug" className="text-sm text-neutral-400">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugEdited(true);
            setSlug(slugify(e.target.value));
          }}
          className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 font-mono text-sm text-neutral-100 outline-none focus:border-neutral-500"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="excerpt" className="text-sm text-neutral-400">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
          className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100 outline-none focus:border-neutral-500"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-1">
          <label htmlFor="categoryId" className="text-sm text-neutral-400">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={post?.category_id ?? ""}
            className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-3 py-2 text-neutral-100"
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <span className="text-sm text-neutral-400">Tags</span>
          <div className="flex flex-wrap gap-3 rounded-md border border-neutral-700 bg-neutral-950 p-3">
            {tags.map((tag) => (
              <label key={tag.id} className="flex items-center gap-1.5 text-sm text-neutral-300">
                <input type="checkbox" name="tagIds" value={tag.id} defaultChecked={post?.tagIds.includes(tag.id)} />
                {tag.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-sm text-neutral-400">Cover image</span>
        <input type="hidden" name="coverImage" value={coverImage} readOnly />
        <CoverImageUpload value={coverImage} onChange={setCoverImage} />
      </div>

      <div className="space-y-1">
        <span className="text-sm text-neutral-400">Content</span>
        <input type="hidden" name="content" value={JSON.stringify(content)} readOnly />
        <PostEditor content={content} onChange={setContent} />
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          name="intent"
          value="draft"
          disabled={isPending}
          className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-900 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save draft"}
        </button>
        <button
          type="submit"
          name="intent"
          value="publish"
          disabled={isPending}
          className="rounded-md bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 disabled:opacity-50"
        >
          {isPending ? "Saving..." : post?.published ? "Update & keep published" : "Publish"}
        </button>
      </div>
    </form>
  );
}
