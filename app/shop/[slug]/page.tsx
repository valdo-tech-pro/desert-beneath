import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { digitalProducts, getProduct } from '@/lib/products'

export function generateStaticParams() {
  return digitalProducts.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}
  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/shop/${product.slug}` },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const available = product.status === 'available' && product.checkoutUrl

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/shop" className="text-sm font-bold text-[#2c5631] hover:underline">← Back to Shop</Link>

      <section className="mt-6 overflow-hidden rounded-3xl border border-[#e5d9ca] bg-white shadow-sm">
        <div className="bg-[#2c5631] px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">{product.category}</span>
            {product.status === 'coming-soon' && <span className="rounded-full bg-[#c85a3a] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">Coming soon</span>}
          </div>
          <div className="mt-6 flex items-start gap-5">
            <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl">{product.icon}</span>
            <div>
              <h1 className="font-serif text-4xl font-bold leading-tight sm:text-5xl">{product.title}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#e8eee5]">{product.longDescription}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-10 px-6 py-9 sm:px-10 lg:grid-cols-[1fr_320px] lg:px-14 lg:py-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">What is included</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {product.includes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-[#fbf8f3] p-4 text-sm font-semibold leading-6 text-[#554434]">
                  <span className="text-[#c85a3a]">✓</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 rounded-2xl bg-[#f1e9dc] p-6">
              <h2 className="font-serif text-2xl font-bold text-[#2c5631]">Built for practical growing.</h2>
              <p className="mt-2 leading-7 text-[#6c5a48]">The Desert Beneath focuses on clear, useful cactus-care information you can apply to real plants and changing growing conditions.</p>
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-[#e5d9ca] bg-[#fbf8f3] p-6 lg:sticky lg:top-28">
            <p className="text-sm font-semibold text-[#806f5d]">{product.format}</p>
            <div className="mt-2 font-serif text-3xl font-bold text-[#2c5631]">{product.price}</div>
            {available ? (
              <a href={product.checkoutUrl} target="_blank" rel="noopener noreferrer" className="mt-6 block rounded-xl bg-[#c85a3a] px-5 py-3.5 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a8482c] hover:shadow-md">Get the product</a>
            ) : (
              <div className="mt-6 rounded-xl bg-[#e9e0d3] px-5 py-3.5 text-center font-bold text-[#806f5d]">Coming soon</div>
            )}
            {product.secondaryCheckoutUrl && product.secondaryLabel && (
              <a href={product.secondaryCheckoutUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block rounded-xl border border-[#d9cbbb] bg-white px-5 py-3.5 text-center font-bold text-[#2c5631] transition hover:border-[#2c5631]">{product.secondaryLabel} →</a>
            )}
            <p className="mt-4 text-center text-xs leading-5 text-[#806f5d]">Secure checkout is handled by the payment platform.</p>
          </aside>
        </div>
      </section>
    </div>
  )
}
