-- Phase 2: core blog schema, RLS policies, storage buckets, starter taxonomy

create extension if not exists "pgcrypto";

-- ===== Tables =====

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table tags (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);

create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content jsonb not null default '{}'::jsonb,
  cover_image text,
  category_id uuid references categories(id) on delete set null,
  published boolean not null default false,
  published_at timestamptz,
  reading_time int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table post_tags (
  post_id uuid not null references posts(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (post_id, tag_id)
);

create index posts_published_published_at_idx on posts (published, published_at desc);
create index posts_slug_idx on posts (slug);

-- ===== updated_at trigger =====

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_set_updated_at
before update on posts
for each row execute function set_updated_at();

-- ===== Row Level Security =====

alter table categories enable row level security;
alter table tags enable row level security;
alter table posts enable row level security;
alter table post_tags enable row level security;

create policy "categories_public_read" on categories
  for select using (true);
create policy "categories_admin_write" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "tags_public_read" on tags
  for select using (true);
create policy "tags_admin_write" on tags
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "posts_public_read_published" on posts
  for select using (published = true);
create policy "posts_admin_all" on posts
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "post_tags_public_read" on post_tags
  for select using (
    exists (select 1 from posts where posts.id = post_tags.post_id and posts.published = true)
  );
create policy "post_tags_admin_all" on post_tags
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ===== Storage buckets =====

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

create policy "blog_images_public_read" on storage.objects
  for select using (bucket_id = 'blog-images');
create policy "blog_images_admin_insert" on storage.objects
  for insert with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');
create policy "blog_images_admin_update" on storage.objects
  for update using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
create policy "blog_images_admin_delete" on storage.objects
  for delete using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

create policy "blog_covers_public_read" on storage.objects
  for select using (bucket_id = 'blog-covers');
create policy "blog_covers_admin_insert" on storage.objects
  for insert with check (bucket_id = 'blog-covers' and auth.role() = 'authenticated');
create policy "blog_covers_admin_update" on storage.objects
  for update using (bucket_id = 'blog-covers' and auth.role() = 'authenticated');
create policy "blog_covers_admin_delete" on storage.objects
  for delete using (bucket_id = 'blog-covers' and auth.role() = 'authenticated');

-- ===== Starter taxonomy (mirrors homepage keywords) =====

insert into categories (name, slug) values
  ('Kubernetes', 'kubernetes'),
  ('Terraform', 'terraform'),
  ('CI/CD', 'ci-cd'),
  ('Cloud', 'cloud'),
  ('Security', 'security'),
  ('GitOps', 'gitops'),
  ('Observability', 'observability'),
  ('DevOps', 'devops')
on conflict (slug) do nothing;

insert into tags (name, slug) values
  ('Kubernetes', 'kubernetes'),
  ('Terraform', 'terraform'),
  ('CI/CD', 'ci-cd'),
  ('Cloud', 'cloud'),
  ('Security', 'security'),
  ('GitOps', 'gitops'),
  ('Observability', 'observability'),
  ('DevOps', 'devops')
on conflict (slug) do nothing;
