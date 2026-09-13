import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cactus Propagation Guide',
  description: 'Learn practical methods for propagating cacti from cuttings, offsets, and seed.',
}

const methods = [
  ['Cuttings', 'Allow suitable cuttings to form a properly dried callus before planting into an appropriate, well-draining medium.'],
  ['Offsets', 'Separate naturally produced offsets carefully and give damaged surfaces time to dry before potting.'],
  ['Seeds', 'Seed propagation is slower but opens the door to growing a wider range of species and observing plants from the beginning.'],
  ['Grafting', 'Grafting can be useful for particular plants and advanced projects, but it requires clean technique and compatible partners.'],
]

export default function PropagationPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Propagation</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Turn one healthy cactus into more plants.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">Propagation is part technique, part timing, and part patience. Learn the fundamentals before choosing the method that fits your cactus.</p>
      </section>

      <section className="py-14">
        <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Choose your method</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Four ways to propagate</h2></div>
        <div className="grid gap-5 sm:grid-cols-2">
          {methods.map(([title, description]) => <article key={title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"><h3 className="font-serif text-2xl font-bold text-cactus-800">{title}</h3><p className="mt-3 leading-7 text-sand-700">{description}</p><Link href="/#latest" className="mt-5 inline-block text-sm font-bold text-cactus-700 hover:text-cactus-600">Explore cactus guides →</Link></article>)}
        </div>
      </section>

      <section className="mb-14 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <h2 className="font-serif text-2xl font-bold text-cactus-800">Clean technique matters</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">Use clean tools, handle wounds carefully, and give fresh cuts the conditions they need to dry before moisture is introduced. The exact process varies by cactus and propagation method.</p>
      </section>
    </div>
  )
}
