import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAdjacentPosts, getRelatedPosts, getPublishedPosts } from "@/lib/posts/queries";
import { renderPostContent } from "@/lib/content/render";
import { PostContent } from "@/components/blog/PostContent";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";
import { PrevNextNav } from "@/components/blog/PrevNextNav";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { posts } = await getPublishedPosts({ page: 1, pageSize: 100 });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const fullTitle = `${post.title} — ${SITE_NAME}`;
  const description = post.excerpt ?? undefined;

  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: "article",
      publishedTime: post.published_at ?? undefined,
      images: post.cover_image ? [{ url: post.cover_image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [{ html, headings }, { prev, next }, related] = await Promise.all([
    renderPostContent(post.content),
    post.published_at ? getAdjacentPosts(post.published_at) : Promise.resolve({ prev: null, next: null }),
    getRelatedPosts(post.id, post.category?.id ?? null),
  ]);

  const url = `${SITE_URL}/blogs/${post.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? undefined,
    image: post.cover_image ?? undefined,
    datePublished: post.published_at ?? undefined,
    author: { "@type": "Person", name: "Stalin Rijal" },
    mainEntityOfPage: url,
  };

  return (
    <>
      <ReadingProgressBar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="mx-auto max-w-6xl px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/blogs" className="text-sm text-neutral-400 hover:text-neutral-300">
            ← Back to blog
          </Link>

          <header className="mt-4 space-y-3">
            {post.category && (
              <Link
                href={`/blogs?category=${post.category.slug}`}
                className="inline-block rounded-full bg-neutral-800 px-2.5 py-0.5 text-xs text-neutral-400 hover:text-neutral-100"
              >
                {post.category.name}
              </Link>
            )}
            <h1 className="text-3xl font-semibold text-neutral-100 sm:text-4xl">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-400">
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
              {post.reading_time && <span>· {post.reading_time} min read</span>}
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {post.tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blogs?tag=${tag.slug}`}
                    className="rounded-full border border-neutral-800 px-2.5 py-0.5 text-xs text-neutral-400 hover:border-neutral-600 hover:text-neutral-300"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            )}
          </header>

          {post.cover_image && (
            <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image src={post.cover_image} alt={post.title} fill className="object-cover" priority />
            </div>
          )}
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[1fr_240px]">
          <div className="mx-auto w-full max-w-3xl space-y-10">
            <PostContent html={html} />
            <ShareButtons url={url} title={post.title} />
            <PrevNextNav prev={prev} next={next} />
            <RelatedPosts posts={related} />
          </div>
          <TableOfContents headings={headings} />
        </div>
      </article>
    </>
  );
}
