import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalPosts },
    { count: publishedPosts },
    { count: draftPosts },
    { count: categoryCount },
    { count: tagCount },
    { data: latestPost },
  ] = await Promise.all([
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", true),
    supabase.from("posts").select("*", { count: "exact", head: true }).eq("published", false),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("tags").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("title, updated_at").order("updated_at", { ascending: false }).limit(1).maybeSingle(),
  ]);

  const stats = [
    { label: "Total posts", value: totalPosts ?? 0 },
    { label: "Published", value: publishedPosts ?? 0 },
    { label: "Drafts", value: draftPosts ?? 0 },
    { label: "Categories", value: categoryCount ?? 0 },
    { label: "Tags", value: tagCount ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
            <div className="text-2xl font-semibold">{stat.value}</div>
            <div className="text-sm text-neutral-400">{stat.label}</div>
          </div>
        ))}
      </div>
      {latestPost && (
        <p className="text-sm text-neutral-400">
          Last updated: <span className="text-neutral-200">{latestPost.title}</span> ·{" "}
          {new Date(latestPost.updated_at).toLocaleString()}
        </p>
      )}
    </div>
  );
}
