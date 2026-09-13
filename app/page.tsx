import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 0

function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/post/${post.slug}`} className="group block h-full">
      <article className="h-full overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        {post.cover_image && <div className="h-52 overflow-hidden bg-sand-100"><img src={post.cover_image} alt={post.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>}
        <div className="p-6"><p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cactus-600">Cactus guide</p><h3 className="mt-3 font-serif text-xl font-bold leading-tight text-cactus-800 group-hover:text-cactus-600">{post.title}</h3>{post.excerpt && <p className="mt-3 leading-7 text-sand-700">{post.excerpt}</p>}<span className="mt-5 inline-block text-sm font-bold text-cactus-700">Read guide →</span></div>
      </article>
    </Link>
  )
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: posts } = await supabase.from('posts').select('*').eq('published', true).order('created_at', { ascending: false })
  const allPosts = (posts as Post[]) || []
  const featured = allPosts[0]
  const latest = allPosts.slice(0, 8)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Blog', name: siteConfig.name, description: siteConfig.description, url: siteConfig.url }

  return (
    <div className="pb-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="overflow-hidden rounded-[2rem] bg-cactus-800 shadow-xl"><div className="grid lg:grid-cols-2"><div className="px-7 py-14 text-white sm:px-10 sm:py-20"><p className="text-xs font-bold uppercase tracking-[0.28em] text-sand-100">The Desert Beneath</p><h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Grow Healthier Cacti From the Roots Up</h1><p className="mt-6 max-w-xl text-lg leading-8 text-sand-100">Practical cactus care, soil science, species guidance, and troubleshooting for growers who want to understand what their plants actually need.</p><div className="mt-9 flex flex-col gap-3 sm:flex-row"><Link href="#start-here" className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-cactus-800">Start Here</Link><Link href="/book" className="rounded-xl border border-white/40 px-6 py-3.5 text-center font-bold text-white">Get the Book →</Link></div></div><div className="min-h-[330px] bg-sand-200">{featured?.cover_image ? <img src={featured.cover_image} alt="" className="h-full min-h-[330px] w-full object-cover" /> : <div className="flex h-full items-center justify-center p-10 text-center font-serif text-2xl font-bold text-cactus-800">Root-first cactus care</div>}</div></div></section>

      <section className="py-14 sm:py-16"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Why The Desert Beneath</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Cactus care, explained from the roots up.</h2><p className="mt-4 leading-7 text-sand-700">Learn the principles behind healthy growth instead of memorizing one-size-fits-all rules.</p></div><div className="mt-9 grid gap-5 md:grid-cols-3">{[['01','Science-backed cultivation'],['02','Practical growing guidance'],['03','Species-specific care']].map(([n,t])=><div key={n} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"><span className="text-xs font-bold tracking-[0.2em] text-sand-500">{n}</span><h3 className="mt-4 font-bold text-cactus-800">{t}</h3><p className="mt-2 leading-7 text-sand-700">Clear, practical information to help you make better cactus-care decisions.</p></div>)}</div></section>

      <section id="start-here" className="scroll-mt-24 py-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Start Here</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Essential cactus guides</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{latest.slice(0,4).map(post=><PostCard key={post.id} post={post}/>)}</div></section>

      <section id="popular-guides" className="scroll-mt-24 py-10"><div className="rounded-[2rem] bg-[#efe6da] p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Diagnose Your Cactus</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Yellow, brown, soft, wrinkled or not growing?</h2><p className="mt-4 max-w-2xl leading-7 text-sand-700">Start with the visible symptom, then work backward to the likely cause.</p><Link href="/problems" className="mt-6 inline-flex rounded-xl bg-cactus-800 px-5 py-3 font-bold text-white">Browse cactus problems →</Link></div></section>

      <section id="soil" className="scroll-mt-24 py-10"><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[['Soil','/soil'],['Water','/soil/watering'],['Propagation','/propagation'],['Species Library','/species']].map(([t,h])=><Link key={t} href={h} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><h3 className="font-serif text-xl font-bold text-cactus-800">{t}</h3><p className="mt-2 text-sm leading-6 text-sand-700">Explore detailed cactus resources.</p><span className="mt-4 inline-block text-sm font-bold text-cactus-700">Explore →</span></Link>)}</div></section>

      <section id="latest" className="scroll-mt-24 py-12"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Latest Articles</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Fresh cactus care guides</h2><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{latest.map(post=><PostCard key={post.id} post={post}/>)}</div></section>

      <section className="my-10 rounded-[2rem] bg-cactus-800 p-8 text-white sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-sand-100">Go deeper</p><h2 className="mt-3 font-serif text-3xl font-bold">Stop guessing. Start understanding your cactus.</h2><p className="mt-4 max-w-2xl leading-7 text-sand-100">The Desert Beneath brings soil, water, roots, light, pests, and propagation together in one practical reference.</p><Link href="/book" className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-cactus-800">Get the book for $7.99 →</Link></section>
    </div>
  )
}
