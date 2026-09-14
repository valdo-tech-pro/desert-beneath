import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import { categorySlug } from '@/lib/categories'
import DisqusComments from '@/components/DisqusComments'

export const revalidate = 0

function stripHtml(html: string) { return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim() }

async function getPost(slug: string): Promise<Post | null> {
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('*').eq('slug', slug).eq('published', true).single()
  return data as Post | null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post Not Found' }
  const description = post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160)
  const url = `${siteConfig.url}/post/${post.slug}`
  const image = post.cover_image || siteConfig.defaultOgImage
  return { title: post.title, description, alternates: { canonical: url }, openGraph: { type: 'article', title: post.title, description, url, siteName: siteConfig.name, images: [{ url: image }] }, twitter: { card: 'summary_large_image', title: post.title, description, images: [image] } }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()
  const description = post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160)
  const publishedDate = new Date(post.created_at)
  const updatedDate = post.updated_at ? new Date(post.updated_at) : null
  const category = post.category || 'General'
  const jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: post.title, description, image: post.cover_image || siteConfig.defaultOgImage, datePublished: post.created_at, dateModified: post.updated_at, articleSection: category, author: { '@type': 'Organization', name: siteConfig.name }, publisher: { '@type': 'Organization', name: siteConfig.name }, mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/post/${post.slug}` } }

  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className="mx-auto max-w-4xl">
      <Link href="/" className="mb-8 inline-flex text-sm font-semibold text-cactus-700">← Back to all articles</Link>
      <header className="mb-10"><div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium text-sand-500"><Link href={`/category/${categorySlug(category)}`} className="rounded-full bg-cactus-50 px-3 py-1 font-bold text-cactus-700 hover:bg-cactus-100">{category}</Link><time dateTime={post.created_at}>{publishedDate.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</time>{updatedDate && updatedDate.getTime() !== publishedDate.getTime() && <span>Updated {updatedDate.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span>}</div><h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-cactus-900 sm:text-5xl lg:text-6xl">{post.title}</h1>{post.excerpt && <p className="mt-5 max-w-3xl text-lg leading-relaxed text-sand-700 sm:text-xl">{post.excerpt}</p>}</header>
      {post.cover_image && <figure className="mb-10 overflow-hidden rounded-2xl border border-sand-200 bg-sand-100 shadow-sm"><img src={post.cover_image} alt={post.title} className="max-h-[560px] w-full object-cover" /></figure>}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]"><div><div className="prose-content text-[1.05rem] text-sand-800 sm:text-lg" dangerouslySetInnerHTML={{ __html: post.content }} /><div className="mt-12 rounded-2xl border border-cactus-100 bg-cactus-50/70 p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.16em] text-cactus-700">Want the complete system?</p><h2 className="mt-2 font-serif text-2xl font-bold text-cactus-900">Go deeper with The Desert Beneath.</h2><p className="mt-3 leading-relaxed text-sand-700">Learn how soil, water, light, roots, pests, and propagation work together.</p><Link href="/book" className="mt-5 inline-flex rounded-lg bg-[#c85a3a] px-5 py-3 font-semibold text-white">Get the book for $7.99 →</Link></div></div><aside className="h-fit rounded-2xl border border-sand-200 bg-white p-5 shadow-sm lg:sticky lg:top-28"><p className="text-xs font-bold uppercase tracking-[0.16em] text-cactus-700">Keep learning</p><h2 className="mt-2 font-serif text-xl font-bold text-cactus-900">More cactus care tips</h2><div className="mt-4 space-y-2"><Link href={`/category/${categorySlug(category)}`} className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800">More in {category} →</Link><Link href="/categories" className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800">Browse all categories →</Link><Link href="/#latest" className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800">Latest articles →</Link><Link href="/book" className="block rounded-lg bg-sand-50 px-3 py-2 text-sm font-semibold text-cactus-800">The book →</Link></div></aside></div>
      <div className="mt-14 border-t border-sand-200 pt-10"><DisqusComments slug={post.slug} title={post.title} /></div>
    </div>
  </article>
}
