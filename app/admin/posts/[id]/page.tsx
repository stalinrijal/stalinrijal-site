import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "@/components/admin/PostForm";
import type { JSONContent } from "@tiptap/react";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: post }, { data: categories }, { data: tags }, { data: postTags }] = await Promise.all([
    supabase.from("posts").select("*").eq("id", id).single(),
    supabase.from("categories").select("id, name").order("name"),
    supabase.from("tags").select("id, name").order("name"),
    supabase.from("post_tags").select("tag_id").eq("post_id", id),
  ]);

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Post</h1>
      <PostForm
        mode="edit"
        categories={categories ?? []}
        tags={tags ?? []}
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content as JSONContent,
          cover_image: post.cover_image,
          category_id: post.category_id,
          published: post.published,
          tagIds: (postTags ?? []).map((t) => t.tag_id),
        }}
      />
    </div>
  );
}
