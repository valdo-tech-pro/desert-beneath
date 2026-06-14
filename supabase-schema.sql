-- Run this in your Supabase project's SQL Editor (Database > SQL Editor > New Query)

create table posts (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  title text not null,
  excerpt text default '',
  meta_description text default '',
  content text not null,
  cover_image text,
  published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Allow anyone to read PUBLISHED posts (for the public blog pages)
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Note: writes (insert/update/delete) go through the admin API routes
-- using the service_role key, which bypasses RLS entirely.
-- No additional policies are needed for the admin panel to work.

-- Optional: insert a sample post to test
insert into posts (slug, title, excerpt, content, published)
values (
  'welcome-to-the-desert-beneath',
  'Welcome to The Desert Beneath',
  'A blog about cactus care, soil science, and growing healthy succulents from the roots up.',
  '<p>Welcome! This blog is dedicated to everything beneath the surface of healthy cactus growth — soil composition, root health, watering science, and species-specific care.</p><p>Stay tuned for guides on propagation, troubleshooting common issues like rot and etiolation, and deep dives into the best soil mixes for different cactus species.</p>',
  true
);

-- ============================================
-- MIGRATION: If you already ran the schema above before,
-- run this instead to add the new SEO column:
-- ============================================
-- alter table posts add column if not exists meta_description text default '';
