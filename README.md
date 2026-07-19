# stalinrijal-site

Personal site and blog for [stalinrijal.com](https://stalinrijal.com) — Next.js (App Router, TypeScript) with a Supabase-backed blogging platform and a single-admin CMS.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, Server Actions)
- **Database / Auth / Storage:** Supabase (Postgres + `@supabase/ssr` auth + Storage), authorization enforced entirely via Row Level Security — no service-role key is used anywhere in the app
- **Editor:** Tiptap (ProseMirror), content stored as JSON, rendered server-side to sanitized HTML via a `unified`/`rehype` pipeline (`rehype-pretty-code`/Shiki for syntax highlighting, `rehype-sanitize` for XSS safety)
- **Styling:** Tailwind CSS v4 (blog/admin surfaces) + hand-ported plain CSS for the homepage (`app/styles/home/*.css`), scoped under `.home`
- **Hosting:** Vercel

## Project structure

```
app/
  page.tsx                 homepage (ISR, revalidate = 3600)
  styles/home/*.css         ported homepage styles, split by section
  blogs/                    public blog (index + [slug]), ISR
  login/                    single-admin sign-in
  admin/                    protected CMS (dashboard, post CRUD)
  api/upload/route.ts       session-verified image upload to Supabase Storage
  sitemap.ts / robots.ts / rss.xml/route.ts

lib/
  supabase/                 server / browser / middleware / public (anon, stateless) clients
  content/                  Tiptap JSON -> sanitized HTML render pipeline
  posts/                    public post queries, slugify, category icons

components/
  home/   blog/   admin/    section and route-scoped components

proxy.ts                    Next 16 middleware equivalent; guards /admin/**
supabase/migrations/*.sql   schema source of truth
```

## Local development

```bash
npm install
cp .env.example .env.local   # fill in the two Supabase values below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Only two variables are required, both public/anon-scoped — there is no service-role key in this project:

| Variable | Where to find it |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API → anon/public key |

## Supabase setup (new environment)

1. Create a Supabase project.
2. Run `supabase/migrations/20260718000000_init_schema.sql` against it (via the SQL editor, or the Supabase CLI: `supabase db push`). This creates `categories`, `tags`, `posts`, `post_tags`, seeds starter taxonomy, and sets up RLS policies (anon: read-only on published posts and all categories/tags; authenticated: full read/write).
3. Create two Storage buckets: `blog-images` and `blog-covers`, both public-read with admin-only (authenticated) write policies.
4. Create exactly one user via the Supabase Dashboard (Authentication → Users → Add user). There is no public sign-up flow anywhere in the app — this is intentionally single-admin.
5. Add the two env vars above to your Vercel project (and `.env.local` for local dev).

## Deployment (Vercel)

1. Import the repo into Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as project environment variables.
3. Deploy. `next.config.ts` marks `jsdom` and `shiki` as `serverExternalPackages` — required for the server-side Tiptap render pipeline to work correctly in Vercel's serverless functions (they use dynamic `require()` patterns that the bundler otherwise fails to trace).
4. Custom domain cutover (`stalinrijal.com`) is a manual, separate step: add the domain in Vercel, then repoint DNS at the registrar.

## Content model

- Posts store their body as Tiptap ProseMirror JSON (`posts.content jsonb`), not HTML or Markdown — rendered to sanitized HTML on request (with ISR caching) rather than at write time, so rendering/highlighting improvements apply retroactively to old posts.
- One category per post, tags are many-to-many.
- `reading_time` is computed from the JSON word count and stored at save time.
- Publishing/unpublishing/deleting a post calls `revalidatePath` for the homepage and the post's own route, so changes go live immediately rather than waiting for the hourly ISR window.

## Security notes

- The only Supabase credential in the codebase or Vercel env is the anon key; RLS is the sole authorization boundary for all reads and writes.
- `/api/upload` independently verifies the caller's session server-side before accepting a file.
- `/admin` and `/login` are `noindex, nofollow` and disallowed in `robots.txt`; `/admin/**` is also guarded by `proxy.ts` middleware, redirecting unauthenticated requests to `/login`.
- Draft posts are invisible to anonymous reads (enforced by RLS, not just application logic) and excluded from the sitemap.

## Scripts

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```
