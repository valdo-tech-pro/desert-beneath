import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import DisqusComments from '@/components/DisqusComments'

export const revalidate = 0

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

async function getPost(slug: string): Promise<Post | null> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('posts').select('*').eq('slug', slug).eq('published', true).single()
  return post as Post | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  const description = post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160)
  const url = `${siteConfig.url}/post/${post.slug}`
  const ogImage = post.cover_image || siteConfig.defaultOgImage
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article', title: post.title, description, url, siteName: siteConfig.name,
      images: [{ url: ogImage }], publishedTime: post.created_at, modifiedTime: post.updated_at,
    },
    twitter: { card: 'summary_large_image', title: post.title, description, images: [ogImage] },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  const typedPost = post as Post
  const description = typedPost.meta_description || typedPost.excerpt || stripHtml(typedPost.content).slice(0, 160)
  const publishedDate = new Date(typedPost.created_at)
  const updatedDate = typedPost.updated_at ? new Date(typedPost.updated_at) : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: typedPost.title,
    description,
    image: typedPost.cover_image || siteConfig.defaultOgImage,
    datePublished: typedPost.created_at,
    dateModified: typedPost.updated_at,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/post/${typedPost.slug}` },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-cactus-700 hover:text-cactus-900 transition-colors mb-8">
          <span aria-hidden="true">←</span> Back to all articles
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-medium text-sand-500 mb-5">
            <span className="inline-flex items-center rounded-full bg-cactus-50 px-3 py-1 text-cactus-700">Cactus Care Guide</span>
            <span aria-hidden="true">•</span>
            <time dateTime={typedPost.created_at}>
              {publishedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            {updatedDate && updatedDate.getTime() !== publishedDate.getTime() && (
              <>
                <span aria-hidden="true">•</span>
                <span>Updated {updatedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-cactus-900 mb-5">
            {typedPost.title}
          </h1>

          {typedPost.excerpt && (
            <p className="text-lg sm:text-xl leading-relaxed text-sand-700 max-w-2xl">
              {typedPost.excerpt}
            </p>
          )}
        </header>

        {typedPost.cover_image && (
          <figure className="mb-10 overflow-hidden rounded-2xl border border-sand-200 bg-sand-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={typedPost.cover_image}
              alt={typedPost.title}
              className="w-full max-h-[560px] object-cover"
            />
          </figure>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_220px] gap-10 items-start">
          <div>
            <div className="prose-content text-[1.05rem] sm:text-lg text-sand-800" dangerouslySetInnerHTML={{ __html: typedPost.content }} />

            <div className="mt-12 rounded-2xl border border-cactus-100 bg-cactus-50/70 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cactus-700 mb-2">Want the complete system?</p>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cactus-900 mb-3">Go deeper with The Desert Beneath.</h2>
              <p className="text-sand-700 leading-relaxed mb-5">
                Learn how soil, water, light, roots, pests, and propagation work together so you can care for your cacti with confidence.
              </p>
              <Link href="/book" className="inline-flex items-center justify-center rounded-lg bg-[#c85a3a] px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-[#a8482c]">
                Get the book for $7.99 →
              </Link>
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cactus-700 mb-2">Keep learning</p>
            <h2 className="font-serif text-xl font-bold text-cactus-900 mb-3">More cactus care tips</h2>
            <p className="text-sm leading-relaxed text-sand-600 mb-4">Explore the latest guides or start with the beginner resources.</p>
            <div className="space-y-2">
              <Link href="/#start-here" className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800 hover:bg-cactus-50 transition">Start here →</Link>
              <Link href="/#latest" className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800 hover:bg-cactus-50 transition">Latest articles →</Link>
              <Link href="/book" className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800 hover:bg-cactus-50 transition">The book →</Link>
            </div>
          </aside>
        </div>

        <div className="mt-14 border-t border-sand-200 pt-10">
          <DisqusComments slug={typedPost.slug} title={typedPost.title} />
        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-sand-300 bg-white px-5 py-3 text-sm font-semibold text-cactus-800 hover:border-cactus-300 hover:bg-cactus-50 transition">
            ← Explore more cactus guides
          </Link>
        </div>
      </div>
    </article>
  )
}
