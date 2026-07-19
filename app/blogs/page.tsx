import type { Metadata } from "next";
import { getPublishedPosts, getAllCategories, getAllTags } from "@/lib/posts/queries";
import { PostGrid } from "@/components/blog/PostGrid";
import { SearchBar } from "@/components/blog/SearchBar";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { TagList } from "@/components/blog/TagList";
import { Pagination } from "@/components/blog/Pagination";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const DESCRIPTION = "Articles on cloud infrastructure, DevOps, SRE, and platform engineering.";

export const metadata: Metadata = {
  title: `Blog — ${SITE_NAME}`,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/blogs` },
  openGraph: {
    title: `Blog — ${SITE_NAME}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blogs`,
    type: "website",
  },
};

const PAGE_SIZE = 9;

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; tag?: string; page?: string }>;
}) {
  const params = await searchParams;
  const q = params.q ?? "";
  const categorySlug = params.category;
  const tagSlug = params.tag;
  const page = Math.max(1, Number(params.page) || 1);

  const [{ posts, total }, categories, tags] = await Promise.all([
    getPublishedPosts({ q: q || undefined, categorySlug, tagSlug, page, pageSize: PAGE_SIZE }),
    getAllCategories(),
    getAllTags(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function buildHref(overrides: { category?: string; tag?: string; page?: number }) {
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    const category = overrides.category !== undefined ? overrides.category : categorySlug;
    const tag = overrides.tag !== undefined ? overrides.tag : tagSlug;
    if (category) sp.set("category", category);
    if (tag) sp.set("tag", tag);
    const targetPage = overrides.page ?? 1;
    if (targetPage > 1) sp.set("page", String(targetPage));
    const qs = sp.toString();
    return `/blogs${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 space-y-6">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-100">Blog</h1>
          <p className="mt-2 text-neutral-400">{DESCRIPTION}</p>
        </div>
        <SearchBar initialQuery={q} />
        <CategoryFilter
          categories={categories}
          activeSlug={categorySlug}
          buildHref={(slug) => buildHref({ category: slug ?? "" })}
        />
        {tags.length > 0 && (
          <TagList tags={tags} activeSlug={tagSlug} buildHref={(slug) => buildHref({ tag: slug ?? "" })} />
        )}
      </div>

      <PostGrid posts={posts} />

      <Pagination page={page} totalPages={totalPages} buildHref={(p) => buildHref({ page: p })} />
    </div>
  );
}
