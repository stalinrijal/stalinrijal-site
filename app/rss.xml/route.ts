import { createPublicClient } from "@/lib/supabase/public";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site-config";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  const supabase = createPublicClient();
  const { data: posts } = await supabase
    .from("posts")
    .select("title, slug, excerpt, published_at")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(50);

  const items = (posts ?? [])
    .map((post) => {
      const link = `${SITE_URL}/blogs/${post.slug}`;
      const pubDate = post.published_at ? new Date(post.published_at).toUTCString() : new Date().toUTCString();
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} — Blog</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
