# The Desert Beneath — Setup Guide

This is your cactus blog. It's built with Next.js + Supabase, with a
password-protected admin panel at `/admin` for writing posts. Everything
below can be done from your phone's browser.

## Overview

1. Create a Supabase project (database for your posts)
2. Run the provided SQL to create the posts table
3. Create a GitHub repo and upload these files
4. Deploy to Vercel
5. Add your environment variables
6. Visit `/admin` and start writing

---

## Step 1: Create a Supabase account & project

1. Go to **supabase.com** and sign up (use GitHub or email)
2. Click **New Project**
3. Choose a name (e.g. "desert-beneath"), set a database password (save it
   somewhere safe), pick the region closest to you
4. Wait ~2 minutes for the project to spin up

## Step 2: Create the posts table

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Open the file `supabase-schema.sql` from this project, copy ALL its
   contents, and paste into the SQL editor
4. Click **Run**
5. You should see a success message. This creates the `posts` table and adds
   one sample post.

## Step 3: Get your Supabase API keys

1. In Supabase, go to **Project Settings** (gear icon) > **API**
2. You'll need three values:
   - **Project URL** → this is `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → this is `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal") → this is
     `SUPABASE_SERVICE_ROLE_KEY` — keep this secret, never share it

## Step 4: Upload this project to GitHub

1. Go to **github.com**, sign up/log in
2. Tap the **+** icon → **New repository**
3. Name it `desert-beneath`, set to Private or Public, click **Create
   repository**
4. On the new repo page, click **uploading an existing file**
5. Upload ALL the files and folders from this project (you may need to do
   this in batches — make sure folder structure is preserved: `app/`,
   `components/`, `lib/`, etc.)
6. Commit the files

> Tip: If uploading many files individually from a phone is tedious, you can
> use the **GitHub mobile app**, which has better file/folder upload support,
> or use **GitHub Codespaces** (works in mobile browser) to clone and push.

## Step 5: Deploy to Vercel

1. Go to **vercel.com**, sign up using your GitHub account
2. Click **Add New** → **Project**
3. Select your `desert-beneath` repo and click **Import**
4. Before deploying, expand **Environment Variables** and add:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | (from Step 3) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from Step 3) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (from Step 3) |
   | `ADMIN_PASSWORD` | (pick a strong password — this protects your admin panel) |

5. Click **Deploy**
6. Wait 1-2 minutes. You'll get a live URL like `desert-beneath.vercel.app`

## Step 6: Start writing!

1. Visit `yoursite.vercel.app/admin`
2. Log in with the `ADMIN_PASSWORD` you set
3. Click **New Post**, fill in title, content, check "Published", click
   **Create Post**
4. Visit your homepage — your post appears!

---

## SEO Setup (Important!)

This blog includes built-in SEO: per-post meta tags, Open Graph/Twitter
share cards, a sitemap, robots.txt, and structured data (JSON-LD) so Google
understands it's a blog.

**One thing you MUST do:** open `lib/site-config.ts` and update the `url`
field to your real deployed domain (e.g. `https://desert-beneath.vercel.app`
or your custom domain once you have one). This powers your sitemap and all
social share previews.

### What's included automatically

- **Sitemap**: available at `yoursite.com/sitemap.xml` — lists every
  published post, updates automatically
- **robots.txt**: available at `yoursite.com/robots.txt` — tells search
  engines to crawl your site but skip `/admin`
- **Per-post meta tags**: each post gets its own title, description, and
  social preview image
- **Structured data**: each post includes Schema.org `BlogPosting` markup,
  which helps Google show rich results

### Writing SEO-friendly posts

When creating a post in `/admin`, you'll see an optional **SEO Meta
Description** field (max 160 characters). This is what shows up under your
title in Google search results. Tips:

- Include your main keyword naturally (e.g. "cactus soil mix",
  "overwatering signs")
- Write it like a compelling reason to click, not just a summary
- If left blank, your excerpt is used instead

For titles, aim for clear + specific: "Why Your Cactus Roots Are Rotting (and
How to Fix It)" beats "Cactus Problems."

### Submitting your sitemap to Google

1. Go to **Google Search Console** (search.google.com/search-console)
2. Add your site (use the domain you set in `site-config.ts`)
3. Verify ownership (Vercel domains can usually verify via DNS or HTML tag —
   Search Console will guide you)
4. Under **Sitemaps**, submit: `sitemap.xml`
5. Google will start crawling and indexing your posts within a few days

### Cover images and SEO

Cover images you set in `/admin` are used as the social-share image (Open
Graph) for that post too. Use a relevant, decent-resolution image (at least
1200x630px) for best results when shared on social media.

---

## Writing content (HTML basics)

The content field accepts HTML. Quick reference:

- Paragraph: `<p>Your text here</p>`
- Heading: `<h2>Section title</h2>`
- Bold: `<strong>important</strong>`
- Italic: `<em>emphasis</em>`
- Bullet list:
  ```html
  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>
  ```
- Image: `<img src="https://your-image-url.jpg" alt="description">`
- Link: `<a href="https://example.com">link text</a>`

For images, you can upload to a free image host (like **Imgur**) and paste
the direct image URL, or use Supabase Storage (Storage section in your
Supabase dashboard) and paste the public URL.

---

## Making future changes

Any time you want to tweak the design or add features, send the updated
files to GitHub (or ask Claude to help) — Vercel automatically redeploys
whenever you push changes to the repo.

## Custom domain (optional)

In Vercel: Project → Settings → Domains → add your domain (e.g.
thedesertbeneath.com) and follow the DNS instructions. Domains can be bought
through registrars like Namecheap or Porkbun.
