-- Run this once in Supabase SQL Editor.
-- It adds the category field used by the admin editor and category pages.

alter table posts
add column if not exists category text not null default 'General';

-- Optional: normalize any blank categories already present.
update posts
set category = 'General'
where category is null or trim(category) = '';
