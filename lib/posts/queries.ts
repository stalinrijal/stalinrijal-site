import { createPublicClient } from "@/lib/supabase/public";
import type { Json } from "@/lib/types/database.types";

export type CategoryRef = { id: string; name: string; slug: string };
export type TagRef = { id: string; name: string; slug: string };

export type PostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image: string | null;
  published_at: string | null;
  reading_time: number | null;
  category: CategoryRef | null;
};

export type PostDetail = PostSummary & {
  content: Json;
  tags: TagRef[];
};

const SUMMARY_SELECT = `
  id, title, slug, excerpt, cover_image, published_at, reading_time,
  category:categories(id, name, slug)
`;

export async function getPublishedPosts({
  q,
  categorySlug,
  tagSlug,
  page = 1,
  pageSize = 9,
}: {
  q?: string;
  categorySlug?: string;
  tagSlug?: string;
  page?: number;
  pageSize?: number;
}): Promise<{ posts: PostSummary[]; total: number }> {
  const supabase = createPublicClient();

  let postIdsForTag: string[] | null = null;
  if (tagSlug) {
    const { data: tag } = await supabase.from("tags").select("id").eq("slug", tagSlug).maybeSingle();
    if (!tag) return { posts: [], total: 0 };
    const { data: postTags } = await supabase.from("post_tags").select("post_id").eq("tag_id", tag.id);
    postIdsForTag = (postTags ?? []).map((pt) => pt.post_id);
    if (postIdsForTag.length === 0) return { posts: [], total: 0 };
  }

  let query = supabase
    .from("posts")
    .select(SUMMARY_SELECT, { count: "exact" })
    .eq("published", true)
    .order("published_at", { ascending: false });

  if (q) query = query.ilike("title", `%${q}%`);

  if (categorySlug) {
    const { data: category } = await supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle();
    if (!category) return { posts: [], total: 0 };
    query = query.eq("category_id", category.id);
  }

  if (postIdsForTag) query = query.in("id", postIdsForTag);

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);

  const { data, count } = await query;

  return { posts: (data ?? []) as unknown as PostSummary[], total: count ?? 0 };
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const supabase = createPublicClient();

  const { data: post } = await supabase
    .from("posts")
    .select(
      `id, title, slug, excerpt, content, cover_image, published_at, reading_time,
       category:categories(id, name, slug)`
    )
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  if (!post) return null;

  const { data: postTags } = await supabase
    .from("post_tags")
    .select("tags(id, name, slug)")
    .eq("post_id", post.id);

  const tags = ((postTags ?? []).map((pt) => pt.tags).filter(Boolean) as unknown) as TagRef[];

  return { ...post, tags } as unknown as PostDetail;
}

export async function getRecentPosts(limit = 8): Promise<PostSummary[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("posts")
    .select(SUMMARY_SELECT)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as unknown as PostSummary[];
}

export async function getRelatedPosts(postId: string, categoryId: string | null, limit = 3): Promise<PostSummary[]> {
  if (!categoryId) return [];
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("posts")
    .select(SUMMARY_SELECT)
    .eq("published", true)
    .eq("category_id", categoryId)
    .neq("id", postId)
    .order("published_at", { ascending: false })
    .limit(limit);
  return (data ?? []) as unknown as PostSummary[];
}

export async function getAdjacentPosts(
  publishedAt: string
): Promise<{ prev: PostSummary | null; next: PostSummary | null }> {
  const supabase = createPublicClient();
  const [{ data: prevData }, { data: nextData }] = await Promise.all([
    supabase
      .from("posts")
      .select(SUMMARY_SELECT)
      .eq("published", true)
      .lt("published_at", publishedAt)
      .order("published_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
    supabase
      .from("posts")
      .select(SUMMARY_SELECT)
      .eq("published", true)
      .gt("published_at", publishedAt)
      .order("published_at", { ascending: true })
      .limit(1)
      .maybeSingle(),
  ]);
  return {
    prev: (prevData as unknown as PostSummary) ?? null,
    next: (nextData as unknown as PostSummary) ?? null,
  };
}

export async function getAllCategories(): Promise<CategoryRef[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("categories").select("id, name, slug").order("name");
  return data ?? [];
}

export async function getAllTags(): Promise<TagRef[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("tags").select("id, name, slug").order("name");
  return data ?? [];
}
