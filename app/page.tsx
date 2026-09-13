import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 0

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article
        className={`h-full overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
          featured ? 'md:grid md:grid-cols-2' : ''
        }`}
      >
        {post.cover_image && (
          <div
            className={`${featured ? 'md:min-h-[340px]' : 'h-56'} overflow-hidden bg-sand-100`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              loading={featured ? 'eager' : 'lazy'}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6 sm:p-7">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cactus-600">
            Cactus guide
          </p>
          <h3
            className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-serif font-bold leading-tight text-cactus-800 group-hover:text-cactus-600`}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-3 leading-7 text-sand-700">{post.excerpt}</p>
          )}
          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-sand-500">
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

  const keywords = ['beginner', 'watering', 'soil', 'root rot', 'sunburn', 'propagation']
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
    <div className="pb-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Premium hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-cactus-800 shadow-xl">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10 px-7 py-14 text-white sm:px-10 sm:py-16 lg:px-12 lg:py-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-sand-100">
              The Desert Beneath
            </p>
            <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
              Grow healthier cacti from the roots up.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-sand-100 sm:text-lg">
              Practical cactus care, soil science, species guides, and troubleshooting for growers who want to understand what their plants actually need.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#start-here"
                className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-cactus-800 transition hover:bg-sand-100"
              >
                Start learning
              </Link>
              <Link
                href="/book"
                className="rounded-xl border border-white/40 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white/10"
              >
                Explore the book →
              </Link>
            </div>
          </div>

          <div className="relative min-h-[330px] overflow-hidden bg-sand-200 lg:min-h-full">
            {featured?.cover_image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.cover_image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cactus-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/20 p-4 text-white backdrop-blur-sm sm:left-8 sm:right-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand-100">
                    Featured from the journal
                  </p>
                  <p className="mt-1 font-serif text-lg font-bold">{featured.title}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[330px] items-center justify-center bg-sand-200 p-10 text-center text-cactus-800">
                <div>
                  <div className="mx-auto mb-5 h-24 w-16 rounded-full border-[10px] border-cactus-700" />
                  <p className="font-serif text-xl font-bold">Root-first cactus care</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Brand promise */}
      <section className="py-14 sm:py-16">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">A better way to grow</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">
            Less guessing. More understanding.
          </h2>
          <p className="mt-3 leading-7 text-sand-700">
            Healthy cactus care starts below the surface. Learn to connect soil, roots, light, water, containers, and plant signals so you can make better decisions with confidence.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Understand the roots', 'Build the right foundation with practical lessons on soil, drainage, roots, and containers.'],
            ['02', 'Read the signals', 'Learn what yellowing, rot, sunburn, pests, stretching, and stalled growth can tell you.'],
            ['03', 'Grow with confidence', 'Use clear, practical guides designed around real growing problems—not guesswork.'],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold tracking-[0.2em] text-sand-500">{number}</span>
              <h3 className="mt-4 text-lg font-bold text-cactus-800">{title}</h3>
              <p className="mt-2 leading-7 text-sand-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Start here */}
      <section id="start-here" className="scroll-mt-24 py-4 sm:py-8">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">New to cactus care?</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Start with the essentials</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-sand-500 sm:text-right">Build a strong foundation before you worry about the details.</p>
        </div>
        {startHere.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {startHere.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        ) : (
          <p className="rounded-2xl border border-sand-200 bg-white p-6 text-sand-700">New beginner guides are coming soon.</p>
        )}
      </section>

      {/* Featured article */}
      {featured && (
        <section className="py-16 sm:py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Featured guide</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Worth a closer look</h2>
            </div>
          </div>
          <PostCard post={featured} featured />
        </section>
      )}

      {/* Latest */}
      <section className="py-4 sm:py-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">From the journal</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Latest cactus guides</h2>
        </div>
        {latest.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </section>

      {/* Book conversion section */}
      <section className="relative my-16 overflow-hidden rounded-[2rem] bg-sand-100 px-7 py-12 sm:px-10 sm:py-14">
        <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full border-[40px] border-cactus-800/5" />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Go deeper</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">The Desert Beneath book</h2>
            <p className="mt-4 leading-7 text-sand-700">
              A practical guide to cactus cultivation, soil science, watering, propagation, troubleshooting, and growing healthy desert plants with intention.
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
