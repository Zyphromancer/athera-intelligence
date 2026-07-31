-- Articles table for the Outrank blog pipeline (outrank-webhook-service).
-- Only ever read/written via the service-role key from that backend, so RLS
-- is enabled with no policies: the anon/publishable key gets zero access,
-- and the browser client never touches this table directly.

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  content_html text not null,
  excerpt text not null default '',
  tags text[] not null default '{}',
  cover_image text,
  reading_minutes integer not null default 1,
  source text not null default 'outrank',
  published_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_published_at_idx on public.articles (published_at desc);

alter table public.articles enable row level security;
