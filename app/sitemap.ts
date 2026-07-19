import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { SITE_URL } from "@/lib/site-config";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("slug, updated_at")
    .eq("published", true);

  const postEntries: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${SITE_URL}/blogs/${post.slug}`,
    lastModified: post.updated_at,
  }));

  return [
    { url: SITE_URL, lastModified: new Date() },
    { url: `${SITE_URL}/blogs`, lastModified: new Date() },
    ...postEntries,
  ];
}
