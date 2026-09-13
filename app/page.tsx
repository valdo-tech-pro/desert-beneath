import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 0

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className={`h-full overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${featured ? 'md:grid md:grid-cols-2' : ''}`}>
        {post.cover_image && (
          <div className={`${featured ? 'md:min-h-[340px]' : 'h-52'} overflow-hidden bg-sand-100`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image} alt={post.title} loading={featured ? 'eager' : 'lazy'} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
        )}
        <div className="p-6 sm:p-7">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-cactus-600">Cactus guide</p>
          <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl'} font-serif font-bold leading-tight text-cactus-800 group-hover:text-cactus-600`}>{post.title}</h3>
          {post.excerpt && <p className="mt-3 leading-7 text-sand-700">{post.excerpt}</p>}
          <div className="mt-6 flex items-center justify-between gap-4 text-sm text-sand-500">
            <time dateTime={post.created_at}>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</time>
            <span className="font-semibold text-cactus-700">Read guide →</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function TopicCard({ title, text, href }: { title: string; text: string; href: string }) {
  return (
    <Link href={href} className="group rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-cactus-200 hover:shadow-md">
      <h3 className="font-serif text-xl font-bold text-cactus-800 group-hover:text-cactus-600">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-sand-700">{text}</p>
      <span className="mt-4 inline-block text-sm font-bold text-cactus-700">Explore →</span>
    </Link>
  )
}

export default async function HomePage() {
  const supabase = createClient()
  const { data: posts } = await supabase.from('posts').select('*').eq('published', true).order('created_at', { ascending: false })
  const allPosts = (posts as Post[]) || []

  const featured = allPosts[0]
  const latest = allPosts.slice(1, 7)
  const textFor = (post: Post) => `${post.title} ${post.excerpt || ''}`.toLowerCase()
  const pick = (terms: string[], limit: number) => allPosts.filter((post) => terms.some((term) => textFor(post).includes(term))).slice(0, limit)

  const startHere = pick(['beginner', 'watering', 'soil', 'root rot', 'sunburn', 'propagation'], 5)
  const popular = allPosts.slice(0, 8)
  const problems = pick(['yellow', 'brown', 'soft', 'rot', 'wrink', 'pest', 'flower', 'not growing', 'stretch'], 6)
  const soilPosts = pick(['soil', 'mix', 'substrate', 'drainage', 'potting'], 4)
  const propagationPosts = pick(['propagation', 'cutting', 'offset', 'seed', 'root'], 4)
  const speciesPosts = pick(['mammillaria', 'astrophytum', 'echinocactus', 'gymnocalycium', 'ferocactus', 'opuntia', 'aloe'], 6)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  }

  return (
    <div className="pb-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden rounded-[2rem] bg-cactus-800 shadow-xl">
        <div className="grid lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative z-10 px-7 py-14 text-white sm:px-10 sm:py-16 lg:px-12 lg:py-20">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-sand-100">The Desert Beneath</p>
            <h1 className="max-w-2xl font-serif text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">Grow Healthier Cacti From the Roots Up</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-sand-100 sm:text-lg">Practical cactus care, soil science, species guidance, and troubleshooting for growers who want to understand what their plants actually need.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#start-here" className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-cactus-800 transition hover:bg-sand-100">Start Here</Link>
              <Link href="/book" className="rounded-xl border border-white/40 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white/10">Get the Book →</Link>
            </div>
          </div>
          <div className="relative min-h-[330px] overflow-hidden bg-sand-200 lg:min-h-full">
            {featured?.cover_image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.cover_image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-cactus-950/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/20 bg-black/20 p-4 text-white backdrop-blur-sm sm:left-8 sm:right-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand-100">Featured guide</p>
                  <p className="mt-1 font-serif text-lg font-bold">{featured.title}</p>
                </div>
              </>
            ) : (
              <div className="flex h-full min-h-[330px] items-center justify-center bg-sand-200 p-10 text-center text-cactus-800">
                <div><div className="mx-auto mb-5 h-24 w-16 rounded-full border-[10px] border-cactus-700" /><p className="font-serif text-xl font-bold">Root-first cactus care</p></div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Why The Desert Beneath</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Cactus care, explained from the roots up.</h2>
          <p className="mt-4 leading-7 text-sand-700">Learn the principles behind healthy growth instead of memorizing one-size-fits-all rules. Every guide aims to connect what you see above the soil with what is happening below it.</p>
        </div>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {[
            ['01', 'Science-backed cultivation', 'Understand soil, roots, water, light, and plant physiology in practical language.'],
            ['02', 'Practical growing experience', 'Clear steps for everyday problems, from watering mistakes to propagation.'],
            ['03', 'Species-specific guidance', 'Make better decisions by considering the needs and signals of individual cactus groups.'],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold tracking-[0.2em] text-sand-500">{number}</span>
              <h3 className="mt-4 text-lg font-bold text-cactus-800">{title}</h3>
              <p className="mt-2 leading-7 text-sand-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="start-here" className="scroll-mt-24 py-8 sm:py-12">
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Start Here</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">5 essential cactus guides</h2></div>
          <p className="max-w-sm text-sm leading-6 text-sand-500 sm:text-right">Build a strong foundation before you worry about the details.</p>
        </div>
        {startHere.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{startHere.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="rounded-2xl border border-sand-200 bg-white p-6 text-sand-700">Beginner guides are being added soon.</p>}
      </section>

      <section id="problems" className="scroll-mt-24 py-16 sm:py-20">
        <div className="rounded-[2rem] bg-[#efe6da] p-7 sm:p-10">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Diagnose Your Cactus</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">What is your cactus trying to tell you?</h2><p className="mt-3 leading-7 text-sand-700">Yellow? Brown? Soft? Wrinkled? Not flowering? Not growing? Start with the visible symptom, then work backward to the likely cause.</p></div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {['Yellow leaves or tissue', 'Brown spots', 'Soft or collapsing', 'Wrinkled or shriveled', 'Not flowering', 'Not growing'].map((label) => <Link key={label} href="#popular-guides" className="rounded-xl bg-white p-4 text-sm font-bold text-cactus-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">{label}<span className="ml-1 text-cactus-600">→</span></Link>)}
          </div>
          {problems.length > 0 && <div className="mt-8 grid gap-5 md:grid-cols-3">{problems.slice(0, 3).map((post) => <PostCard key={post.id} post={post} />)}</div>}
        </div>
      </section>

      <section id="popular-guides" className="scroll-mt-24 py-8 sm:py-12">
        <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Popular Guides</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Practical answers for real growing problems</h2></div>
        {popular.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{popular.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="rounded-2xl border border-sand-200 bg-white p-6 text-sand-700">More guides are coming soon.</p>}
      </section>

      <section id="soil" className="scroll-mt-24 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Complete Cactus Care</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Build the right care routine.</h2><p className="mt-4 leading-7 text-sand-700">Soil, water, light, pots, and feeding work together. Learn the system rather than chasing isolated tips.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TopicCard title="Soil" text="Drainage, texture, mineral content, and choosing a practical mix." href="#soil" />
            <TopicCard title="Water" text="Know when to water, how deeply, and when to wait." href="#popular-guides" />
            <TopicCard title="Light" text="Give your cactus enough light without creating avoidable stress." href="#popular-guides" />
            <TopicCard title="Pots & Feeding" text="Choose containers and nutrients that support healthy roots." href="#popular-guides" />
          </div>
        </div>
        {soilPosts.length > 0 && <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{soilPosts.map((post) => <PostCard key={post.id} post={post} />)}</div>}
      </section>

      <section id="propagation" className="scroll-mt-24 py-8 sm:py-12">
        <div className="grid gap-8 rounded-[2rem] border border-sand-200 bg-white p-7 shadow-sm sm:p-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Propagation</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Make more plants with confidence.</h2><p className="mt-4 leading-7 text-sand-700">Explore cuttings, offsets, seeds, rooting, and the conditions that help new growth establish safely.</p></div>
          {propagationPosts.length ? <div className="grid gap-4 sm:grid-cols-2">{propagationPosts.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="rounded-xl bg-sand-100 p-6 text-sand-700">Propagation guides are coming soon.</p>}
        </div>
      </section>

      <section id="species" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mb-8 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Species Library</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Learn your cactus by name.</h2><p className="mt-3 leading-7 text-sand-700">Species-level care matters. We are building a growing reference library for common and fascinating cactus groups.</p></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {['Mammillaria', 'Astrophytum', 'Echinocactus', 'Ferocactus', 'Gymnocalycium', 'Opuntia', 'Echinopsis', 'More species →'].map((species) => <div key={species} className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm"><h3 className="font-serif text-lg font-bold text-cactus-800">{species}</h3><p className="mt-1 text-sm text-sand-600">Care reference coming soon.</p></div>)}
        </div>
        {speciesPosts.length > 0 && <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{speciesPosts.map((post) => <PostCard key={post.id} post={post} />)}</div>}
      </section>

      <section id="latest" className="scroll-mt-24 py-8 sm:py-12">
        <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Latest Articles</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Fresh from the journal</h2></div>
        {latest.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{latest.map((post) => <PostCard key={post.id} post={post} />)}</div> : <p className="rounded-2xl border border-sand-200 bg-white p-6 text-sand-700">New articles are coming soon.</p>}
      </section>

      <section className="my-16 overflow-hidden rounded-[2rem] bg-cactus-800 text-white shadow-xl sm:my-20">
        <div className="grid md:grid-cols-[.9fr_1.1fr]">
          <div className="flex min-h-[300px] items-center justify-center bg-cactus-900 p-8">
            <div className="text-center"><div className="mx-auto mb-5 flex h-44 w-32 items-end justify-center rounded-xl border border-white/20 bg-sand-100/10 p-4"><span className="text-7xl">🌵</span></div><p className="text-xs font-bold uppercase tracking-[0.2em] text-sand-100">The practical guide</p></div>
          </div>
          <div className="p-8 sm:p-10 lg:p-12"><p className="text-xs font-bold uppercase tracking-[0.2em] text-sand-100">The Book</p><h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">The Desert Beneath</h2><p className="mt-4 max-w-xl leading-7 text-sand-100">Go deeper into cactus cultivation, soil science, watering, propagation, troubleshooting, and the principles that help desert plants thrive.</p><div className="mt-7 grid gap-3 sm:grid-cols-3"><div className="rounded-xl bg-white/10 p-4"><p className="font-bold">Build better soil</p></div><div className="rounded-xl bg-white/10 p-4"><p className="font-bold">Water with confidence</p></div><div className="rounded-xl bg-white/10 p-4"><p className="font-bold">Diagnose problems early</p></div></div><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"><span className="font-serif text-3xl font-bold">$7.99</span><Link href="/book" className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-cactus-800 transition hover:bg-sand-100">Buy Now →</Link></div><Link href="/book" className="mt-5 inline-block text-sm font-semibold text-sand-100 underline underline-offset-4">Preview the book</Link></div>
        </div>
      </section>

      <section id="free-guide" className="scroll-mt-24 rounded-[2rem] border border-cactus-200 bg-sand-100 p-7 text-center sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Free Guide</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">7 Cactus Mistakes That Kill Plants</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-sand-700">Get the practical checklist that helps you spot the most common care mistakes before they become expensive problems.</p>
        <Link href="#newsletter" className="mt-7 inline-flex rounded-xl bg-cactus-700 px-7 py-3.5 font-bold text-white shadow-sm transition hover:bg-cactus-800">Get the Free Guide →</Link>
      </section>

      <section id="about" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">About the Author</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Helping cactus growers understand what is happening beneath the surface.</h2><p className="mt-5 leading-8 text-sand-700">The Desert Beneath was created to make cactus cultivation clearer, more practical, and more thoughtful. The focus is simple: explain the why behind healthy growth so you can care for your plants with confidence.</p><Link href="/contact" className="mt-7 inline-flex rounded-xl border border-cactus-300 px-6 py-3 font-bold text-cactus-800 transition hover:bg-sand-100">Get in touch →</Link></div>
      </section>
    </div>
  )
}
