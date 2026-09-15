import type { Metadata } from 'next'
import Link from 'next/link'
import { digitalProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop digital cactus-care resources from The Desert Beneath, including practical guides and the Cactus Care Book.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop | The Desert Beneath',
    description: 'Practical digital cactus-care resources to help you grow healthier plants with confidence.',
    url: '/shop',
    type: 'website',
  },
}

const availableProducts = digitalProducts.filter((product) => product.status === 'available')
const upcomingProducts = digitalProducts.filter((product) => product.status === 'coming-soon')

export default function ShopPage() {
  const featured = availableProducts.find((product) => product.featured) ?? availableProducts[0]

  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-3xl bg-[#2c5631] px-6 py-14 text-white shadow-sm sm:px-10 sm:py-20 lg:px-16">
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dfe9dc]">The Desert Beneath · Shop</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">Tools and knowledge for growing better cacti.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#e8eee5] sm:text-xl">Practical digital resources designed to help you understand what your cactus needs—from the roots upward.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {featured?.checkoutUrl && (
              <a href={featured.checkoutUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-[#2c5631] transition hover:-translate-y-0.5 hover:bg-[#f4eee5] hover:shadow-lg">Get the {featured.shortTitle} — {featured.price}</a>
            )}
            <Link href="/#start-here" className="rounded-xl border border-white/35 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white/10">Explore free guides</Link>
          </div>
        </div>
        <div aria-hidden="true" className="absolute -right-16 -top-20 hidden h-72 w-72 rounded-full border border-white/10 sm:block" />
        <div aria-hidden="true" className="absolute -bottom-32 right-20 hidden h-80 w-80 rounded-full border border-white/10 sm:block" />
      </section>

      <section className="py-14 sm:py-18">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">Digital products</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#2c5631] sm:text-4xl">Learn once. Use it whenever you grow.</h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {availableProducts.map((product) => (
            <article key={product.slug} className="overflow-hidden rounded-3xl border border-[#e5d9ca] bg-white shadow-sm">
              <div className="bg-[#f1e9dc] px-6 py-8 sm:px-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">{product.icon}</span>
                  <span className="rounded-full bg-[#2c5631] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">Available</span>
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#806f5d]">{product.category}</p>
                <h3 className="mt-2 font-serif text-3xl font-bold text-[#2c5631]">{product.title}</h3>
                <p className="mt-3 leading-7 text-[#665443]">{product.description}</p>
              </div>
              <div className="px-6 py-7 sm:px-8">
                <ul className="space-y-2 text-sm text-[#554434]">
                  {product.includes.slice(0, 4).map((item) => <li key={item} className="flex gap-3"><span className="text-[#c85a3a]">✓</span><span>{item}</span></li>)}
                </ul>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link href={`/shop/${product.slug}`} className="rounded-xl bg-[#c85a3a] px-5 py-3.5 text-center font-bold text-white transition hover:bg-[#a8482c]">View product</Link>
                  {product.checkoutUrl && <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#d9cbbb] px-5 py-3.5 text-center font-bold text-[#2c5631] transition hover:border-[#2c5631]">Buy now · {product.price}</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5d9ca] py-14 sm:py-18">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">Coming next</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-[#2c5631]">More practical tools are being prepared.</h2>
          <p className="mt-3 max-w-2xl leading-7 text-[#6c5a48]">The catalog is structured so new digital products can be added without redesigning the Shop.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingProducts.map((product) => (
            <Link key={product.slug} href={`/shop/${product.slug}`} className="group rounded-2xl border border-[#e5d9ca] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl">{product.icon}</span>
                <span className="rounded-full bg-[#f1e9dc] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#806f5d]">Coming soon</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#2c5631] group-hover:underline">{product.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6c5a48]">{product.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-3xl bg-[#f1e9dc] px-6 py-10 text-center sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">Keep learning</p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-[#2c5631]">Not ready to buy?</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#6c5a48]">Explore the free cactus-care library first. When you want a deeper reference, the Shop will be here.</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/categories" className="rounded-xl bg-[#2c5631] px-6 py-3 font-bold text-white transition hover:bg-[#214328]">Browse categories</Link>
          <Link href="/book" className="rounded-xl border border-[#d4c5b4] bg-white px-6 py-3 font-bold text-[#2c5631] transition hover:bg-[#faf7f1]">Learn about the book</Link>
        </div>
      </section>
    </div>
  )
}
