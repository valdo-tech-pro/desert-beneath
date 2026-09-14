import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import { CATEGORY_INFO, POST_CATEGORIES, categorySlug } from '@/lib/categories'
import { Post } from '@/lib/types'

export const revalidate = 0

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data } = await supabase.from('posts').select('category').eq('published', true)
  const posts = (data as Pick<Post, 'category'>[]) || []
  const counts = posts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category || 'General'] = (acc[post.category || 'General'] || 0) + 1
    return acc
  }, {})

  return (
    <main className="py-10 sm:py-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Browse by topic</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-cactus-800 sm:text-5xl">Cactus knowledge, organized</h1>
        <p className="mt-5 leading-8 text-sand-700">Choose a category to find focused guides instead of searching through every article.</p>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {POST_CATEGORIES.map((category) => {
          const info = CATEGORY_INFO[category]
          const count = counts[category] || 0
          return (
            <Link key={category} href={`/category/${info.slug}`} className="group rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-serif text-2xl font-bold text-cactus-800 group-hover:text-cactus-600">{category}</h2>
                <span className="rounded-full bg-sand-100 px-3 py-1 text-xs font-bold text-sand-700">{count} {count === 1 ? 'article' : 'articles'}</span>
              </div>
              <p className="mt-3 leading-7 text-sand-700">{info.description}</p>
              <span className="mt-5 inline-block text-sm font-bold text-cactus-700">Explore category →</span>
            </Link>
          )
        })}
      </div>
    </main>
  )
}
