import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase-server'
import { CATEGORY_INFO, POST_CATEGORIES, categoryFromSlug } from '@/lib/categories'
import { Post } from '@/lib/types'

export const revalidate = 0

type PageProps = { params: Promise<{ slug: string }> }

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        {post.cover_image && <div className="h-52 overflow-hidden bg-sand-100"><img src={post.cover_image} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>}
        <div className="p-6">
          <span className="inline-flex rounded-full bg-sand-100 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-cactus-700">{post.category}</span>
          <h2 className="mt-4 font-serif text-xl font-bold leading-tight text-cactus-800 group-hover:text-cactus-600">{post.title}</h2>
          {post.excerpt && <p className="mt-3 leading-7 text-sand-700">{post.excerpt}</p>}
          <span className="mt-5 inline-block text-sm font-bold text-cactus-700">Read guide →</span>
        </div>
      </article>
    </Link>
  )
}

export async function generateStaticParams() {
  return POST_CATEGORIES.map((category) => ({ slug: CATEGORY_INFO[category].slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const category = categoryFromSlug(slug)
  if (!category) return {}
  return {
    title: `${category} | The Desert Beneath`,
    description: CATEGORY_INFO[category].description,
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params
  const category = categoryFromSlug(slug)
  if (!category) notFound()

  const supabase = await createClient()
  const { data } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .eq('category', category)
    .order('created_at', { ascending: false })

  const posts = (data as Post[]) || []
  const info = CATEGORY_INFO[category]

  return (
    <main className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <Link href="/categories" className="text-sm font-bold text-cactus-700 hover:underline">← All categories</Link>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Category</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-cactus-800 sm:text-5xl">{category}</h1>
        <p className="mt-5 leading-8 text-sand-700">{info.description}</p>
      </div>

      {posts.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-sand-200 bg-white p-8 text-center shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-cactus-800">No published articles here yet</h2>
          <p className="mt-3 leading-7 text-sand-700">New guides will appear in this category as soon as they are published.</p>
          <Link href="/categories" className="mt-5 inline-flex rounded-xl bg-cactus-800 px-5 py-3 font-bold text-white">Browse other categories</Link>
        </div>
      )}
    </main>
  )
}
