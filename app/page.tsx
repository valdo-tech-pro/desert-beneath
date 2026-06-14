import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 0

export default async function HomePage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const allPosts = (posts as Post[]) || []

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-10 text-center">
        <h1 className="font-serif text-3xl font-bold text-cactus-800 mb-2">
          The Desert Beneath
        </h1>
        <p className="text-sand-700">
          Soil science, species guides, and lessons learned from growing
          cacti the right way.
        </p>
      </div>

      {allPosts.length === 0 && (
        <div className="text-center py-16 text-sand-600">
          <p className="text-lg">No posts yet.</p>
          <p className="text-sm mt-2">
            Head to{' '}
            <Link href="/admin" className="text-cactus-700 underline">
              /admin
            </Link>{' '}
            to write your first one.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {allPosts.map((post) => (
          <Link
            key={post.id}
            href={`/post/${post.slug}`}
            className="block group"
          >
            <article className="bg-white rounded-lg border border-sand-200 overflow-hidden hover:shadow-md transition-shadow">
              {post.cover_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h2 className="font-serif text-xl font-bold text-cactus-800 group-hover:text-cactus-600 mb-2">
                  {post.title}
                </h2>
                <p className="text-sand-700 text-sm mb-3">{post.excerpt}</p>
                <time className="text-xs text-sand-500">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
