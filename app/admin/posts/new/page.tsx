import { createClient } from "@/lib/supabase/server";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const supabase = await createClient();
  const [{ data: categories }, { data: tags }] = await Promise.all([
    supabase.from("categories").select("id, name").order("name"),
    supabase.from("tags").select("id, name").order("name"),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">New Post</h1>
      <PostForm mode="create" categories={categories ?? []} tags={tags ?? []} />
    </div>
  );
}
