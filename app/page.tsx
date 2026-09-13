import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 0

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link key={post.id} href={`/post/${post.slug}`} className="group block h-full">
      <article
        className={`h-full overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
          featured ? 'md:grid md:grid-cols-2' : ''
        }`}
      >
        {post.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <div
            className={`${
              featured ? 'md:min-h-[320px]' : 'h-52'
            } overflow-hidden bg-sand-100`}
          >
            <img
              src={post.cover_image}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-cactus-600">
            Cactus guide
          </p>
          <h3
            className={`${
              featured ? 'text-2xl md:text-3xl' : 'text-xl'
            } font-serif font-bold leading-tight text-cactus-800 group-hover:text-cactus-600`}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-3 leading-relaxed text-sand-700">
              {post.excerpt}
            </p>
          )}
          <div className="mt-5 flex items-center justify-between gap-4 text-sm text-sand-500">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span className="font-semibold text-cactus-700">Read guide →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default async function HomePage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const allPosts = (posts as Post[]) || []
  const featured = allPosts[0]
  const latest = allPosts.slice(1, 7)

  const keywords = [
    'beginner',
    'watering',
    'soil',
    'root rot',
    'sunburn',
    'propagation',
  ]

  const startHere = allPosts
    .filter((post) =>
      keywords.some((keyword) =>
        `${post.title} ${post.excerpt || ''}`.toLowerCase().includes(keyword)
      )
    )
    .slice(0, 6)

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

      <section className="relative overflow-hidden rounded-3xl bg-cactus-800 px-6 py-16 text-white shadow-sm sm:px-10 md:py-24">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-sand-300/10 blur-3xl" />
        <div className="relative max-w-3xl">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.22em] text-sand-100">
            The Desert Beneath
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Grow healthier cacti from the roots up.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-sand-100 sm:text-xl">
            Practical cactus care, soil science, species guides, and troubleshooting for growers who want to understand what their plants actually need.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="#start-here"
              className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-cactus-800 transition hover:bg-sand-100"
            >
              Start here
            </Link>
            <Link
              href="/book"
              className="rounded-xl border border-white/40 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white/10"
            >
              Get the book →
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['🌱', 'Understand the roots', 'Learn how soil, drainage, roots, and containers work together.'],
            ['☀️', 'Read the signals', 'Diagnose yellowing, rot, sunburn, pests, stretching, and stalled growth.'],
            ['📖', 'Grow with confidence', 'Use practical guides built around real growing problems—not guesswork.'],
          ].map(([icon, title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"
            >
              <div className="text-2xl">{icon}</div>
              <h2 className="mt-4 text-lg font-bold text-cactus-800">{title}</h2>
              <p className="mt-2 leading-relaxed text-sand-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start-here" className="scroll-mt-24 py-4 sm:py-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cactus-600">
              New to cactus care?
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">
              Start with the essentials
            </h2>
          </div>
          <span className="hidden text-sm text-sand-500 sm:block">
            Build a strong foundation first.
          </span>
        </div>
        {startHere.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startHere.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-sand-200 bg-white p-6 text-sand-700">
            New beginner guides are coming soon.
          </p>
        )}
      </section>

      {featured && (
        <section className="py-16 sm:py-20">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cactus-600">
              Featured guide
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">
              A closer look at cactus care
            </h2>
          </div>
          <PostCard post={featured} featured />
        </section>
      )}

      <section className="py-4 sm:py-8">
        <div className="mb-7">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cactus-600">
            From the journal
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">
            Latest cactus guides
          </h2>
        </div>
        {latest.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>

      <section className="my-16 overflow-hidden rounded-3xl border border-sand-200 bg-sand-100 px-6 py-12 sm:px-10 sm:py-14">
        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cactus-600">
              Go deeper
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">
              The Desert Beneath book
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-sand-700">
              A practical guide to cactus cultivation, soil science, watering,
              propagation, troubleshooting, and growing healthy desert plants
              with intention.
            </p>
          </div>
          <Link
            href="/book"
            className="rounded-xl bg-cactus-700 px-7 py-4 text-center font-bold text-white shadow-sm transition hover:bg-cactus-800"
          >
            Explore the book →
          </Link>
        </div>
      </section>
    </div>
  )
}
