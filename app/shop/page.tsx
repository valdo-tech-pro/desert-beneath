import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Shop cactus-care resources from The Desert Beneath, including the practical Cactus Care Book and upcoming growing guides.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop | The Desert Beneath',
    description: 'Practical cactus-care resources to help you grow healthier plants with confidence.',
    url: '/shop',
    type: 'website',
  },
}

const benefits = [
  ['🌵', 'Practical knowledge', 'Clear guidance built around real growing decisions—not rigid care schedules.'],
  ['💧', 'Better care decisions', 'Understand how water, soil, light, roots, and season interact.'],
  ['📚', 'Keep a useful reference', 'Return to the guide whenever a cactus problem or care question comes up.'],
]

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <section className="relative overflow-hidden rounded-3xl bg-[#2c5631] px-6 py-14 text-white shadow-sm sm:px-10 sm:py-20 lg:px-16">
        <div className="relative z-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#dfe9dc]">The Desert Beneath · Shop</p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Tools and knowledge for growing better cacti.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#e8eee5] sm:text-xl">
            Start with practical resources that help you understand what your cactus needs—from the roots upward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-6 py-3.5 text-center font-bold text-[#2c5631] transition hover:-translate-y-0.5 hover:bg-[#f4eee5] hover:shadow-lg">
              Get the Cactus Care Book — $7.99
            </a>
            <Link href="/#start-here" className="rounded-xl border border-white/35 px-6 py-3.5 text-center font-bold text-white transition hover:bg-white/10">
              Explore free guides
            </Link>
          </div>
        </div>
        <div aria-hidden="true" className="absolute -right-16 -top-20 hidden h-72 w-72 rounded-full border border-white/10 sm:block" />
        <div aria-hidden="true" className="absolute -bottom-32 right-20 hidden h-80 w-80 rounded-full border border-white/10 sm:block" />
      </section>

      <section className="py-14 sm:py-18">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch">
          <article className="overflow-hidden rounded-3xl border border-[#e5d9ca] bg-white shadow-sm">
            <div className="bg-[#f1e9dc] px-6 py-8 sm:px-9 sm:py-10">
              <span className="inline-flex rounded-full bg-[#2c5631] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">Featured guide</span>
              <h2 className="mt-5 font-serif text-3xl font-bold text-[#2c5631] sm:text-4xl">The Cactus Care Book</h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#665443]">
                A practical reference covering soil, watering, roots, propagation, troubleshooting, and everyday cactus care.
              </p>
            </div>
            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Build better soil and drainage',
                  'Water according to plant conditions',
                  'Recognize common signs of stress',
                  'Apply practical propagation principles',
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl bg-[#fbf8f3] p-4 text-sm font-semibold leading-6 text-[#554434]">
                    <span className="mt-0.5 text-[#c85a3a]">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-[#c85a3a] px-6 py-3.5 text-center font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#a8482c] hover:shadow-md">
                  Buy the book — $7.99
                </a>
                <a href="https://a.co/d/00D6jXd1" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-[#d9cbbb] px-6 py-3.5 text-center font-bold text-[#2c5631] transition hover:border-[#2c5631] hover:bg-[#f5f1eb]">
                  Buy on Amazon →
                </a>
              </div>
              <p className="mt-3 text-xs leading-5 text-[#806f5d]">Digital edition available • One-time purchase • Read at your own pace</p>
            </div>
          </article>

          <aside className="rounded-3xl border border-[#e5d9ca] bg-[#fbf8f3] p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">Why start here?</p>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#2c5631] sm:text-3xl">A reference built for real growers.</h2>
            <div className="mt-7 space-y-5">
              {benefits.map(([icon, title, text]) => (
                <div key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">{icon}</span>
                  <div>
                    <h3 className="font-bold text-[#3d2e20]">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-[#6c5a48]">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[#e5d9ca] py-14 sm:py-18">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">More resources</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#2c5631]">More growing tools are on the way.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#6c5a48] sm:text-right">
            The shop will grow alongside the site with practical digital resources designed to solve specific cactus-care problems.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ['💧', 'Watering Planner', 'A simple reference for making watering decisions across changing seasons and conditions.'],
            ['🔎', 'Problem Diagnosis Guide', 'A quick-reference resource for narrowing down common cactus symptoms and next steps.'],
            ['🌱', 'Propagation Guide', 'A focused companion for choosing and preparing propagation methods with greater confidence.'],
          ].map(([icon, title, text]) => (
            <article key={title} className="rounded-2xl border border-[#e5d9ca] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl">{icon}</span>
                <span className="rounded-full bg-[#f1e9dc] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#806f5d]">Coming soon</span>
              </div>
              <h3 className="mt-5 text-lg font-bold text-[#2c5631]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#6c5a48]">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 rounded-3xl bg-[#f1e9dc] px-6 py-10 text-center sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c85a3a]">Keep learning</p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-[#2c5631]">Not ready to buy?</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#6c5a48]">
          Explore the free cactus-care library first. When you want a deeper reference, the book is ready for you.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/categories" className="rounded-xl bg-[#2c5631] px-6 py-3 font-bold text-white transition hover:bg-[#214328]">Browse categories</Link>
          <Link href="/book" className="rounded-xl border border-[#d4c5b4] bg-white px-6 py-3 font-bold text-[#2c5631] transition hover:bg-[#faf7f1]">Learn about the book</Link>
        </div>
      </section>
    </div>
  )
}
