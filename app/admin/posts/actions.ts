"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { calculateReadingTime } from "@/lib/content/reading-time";
import type { Json } from "@/lib/types/database.types";

export type PostFormState = { error: string | null };

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters/numbers separated by hyphens"),
  excerpt: z.string().optional(),
  categoryId: z.string().optional(),
  coverImage: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

type Supabase = Awaited<ReturnType<typeof createClient>>;

function parseFormData(formData: FormData) {
  const raw = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    categoryId: formData.get("categoryId"),
    coverImage: formData.get("coverImage"),
    content: formData.get("content"),
  };
  const parsed = postSchema.safeParse(raw);
  const tagIds = formData.getAll("tagIds").map(String);
  return { parsed, tagIds };
}

async function syncTags(supabase: Supabase, postId: string, tagIds: string[]) {
  await supabase.from("post_tags").delete().eq("post_id", postId);
  if (tagIds.length > 0) {
    await supabase.from("post_tags").insert(tagIds.map((tagId) => ({ post_id: postId, tag_id: tagId })));
  }
}

export async function createPost(_prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const published = formData.get("intent") === "publish";
  const { parsed, tagIds } = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  let content: Json;
  try {
    content = JSON.parse(parsed.data.content);
  } catch {
    return { error: "Post content is invalid" };
  }

  const readingTime = calculateReadingTime(content);
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .insert({
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      category_id: parsed.data.categoryId || null,
      cover_image: parsed.data.coverImage || null,
      content,
      reading_time: readingTime,
      published,
      published_at: published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error || !post) {
    return { error: error?.message ?? "Failed to create post" };
  }

  await syncTags(supabase, post.id, tagIds);

  revalidatePath("/admin/posts");
  if (published) revalidatePath("/");

  redirect(`/admin/posts/${post.id}`);
}

export async function updatePost(
  postId: string,
  _prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const published = formData.get("intent") === "publish";
  const { parsed, tagIds } = parseFormData(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid form data" };
  }

  let content: Json;
  try {
    content = JSON.parse(parsed.data.content);
  } catch {
    return { error: "Post content is invalid" };
  }

  const readingTime = calculateReadingTime(content);
  const supabase = await createClient();

  const { data: existing } = await supabase
    .from("posts")
    .select("published_at, slug")
    .eq("id", postId)
    .single();

  const { error } = await supabase
    .from("posts")
    .update({
      title: parsed.data.title,
      slug: parsed.data.slug,
      excerpt: parsed.data.excerpt || null,
      category_id: parsed.data.categoryId || null,
      cover_image: parsed.data.coverImage || null,
      content,
      reading_time: readingTime,
      published,
      published_at: published ? (existing?.published_at ?? new Date().toISOString()) : null,
    })
    .eq("id", postId);

  if (error) {
    return { error: error.message };
  }

  await syncTags(supabase, postId, tagIds);

  revalidatePath("/admin/posts");
  revalidatePath(`/admin/posts/${postId}`);
  revalidatePath("/");
  if (existing?.slug) revalidatePath(`/blogs/${existing.slug}`);
  revalidatePath(`/blogs/${parsed.data.slug}`);

  redirect(`/admin/posts/${postId}`);
}

export async function deletePost(postId: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", postId);
  revalidatePath("/admin/posts");
  revalidatePath("/");
}

export async function publishPost(postId: string) {
  const supabase = await createClient();
  await supabase.from("posts").update({ published: true, published_at: new Date().toISOString() }).eq("id", postId);
  revalidatePath("/admin/posts");
  revalidatePath("/");
}

export async function unpublishPost(postId: string) {
  const supabase = await createClient();
  await supabase.from("posts").update({ published: false }).eq("id", postId);
  revalidatePath("/admin/posts");
  revalidatePath("/");
}
