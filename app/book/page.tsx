import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'The Cactus Care Book',
  description: 'A practical cactus-care guide covering soil, watering, roots, propagation, troubleshooting, and everyday growing decisions.',
  alternates: { canonical: '/book' },
  openGraph: { title: 'The Cactus Care Book | The Desert Beneath', description: 'A practical guide to soil, watering, roots, propagation, troubleshooting, and everyday cactus care.', url: '/book', type: 'website' },
}

const benefits = [
  ['🌵', 'Build better soil', 'Understand drainage, mineral content, containers, and root health so your plants have a stronger foundation.'],
  ['💧', 'Water with confidence', 'Learn how watering changes with temperature, light, season, pot size, and plant condition.'],
  ['🔍', 'Diagnose problems early', 'Learn what yellowing, soft tissue, sunburn, pests, stretching, and stalled growth can tell you.'],
  ['🌱', 'Grow more successfully', 'Use practical care principles that help you make better decisions across many cactus and succulent species.'],
]

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="overflow-hidden rounded-3xl bg-cactus-800 text-white shadow-sm">
        <div className="grid items-center gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.15fr_.85fr] md:py-16 lg:px-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand-100">The Desert Beneath</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Stop guessing. Start understanding your cactus.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-sand-100 sm:text-xl">
              A practical guide to soil, watering, roots, propagation, troubleshooting, and everyday cactus care—built to help you grow healthier plants with confidence.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-7 py-4 text-center font-bold text-cactus-800 transition hover:bg-sand-100">
                Get the book — $7.99
              </a>
              <a href="https://a.co/d/00D6jXd1" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/40 px-7 py-4 text-center font-bold text-white transition hover:bg-white/10">
                Buy on Amazon →
              </a>
            </div>
            <p className="mt-4 text-sm text-sand-200">Available digitally • One-time purchase • Read at your own pace</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sand-100">Inside the guide</p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-sand-100">
              <li>• How roots, soil, drainage, and watering work together</li>
              <li>• How to spot common stress before it becomes serious</li>
              <li>• Practical propagation and repotting principles</li>
              <li>• Simple decision-making you can apply to different species</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cactus-700">What you will learn</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-cactus-900 sm:text-4xl">A reference you can actually use.</h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">Instead of memorizing rigid schedules, learn the conditions that should guide each care decision.</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {benefits.map(([icon, title, text]) => (
            <article key={title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-4 text-xl font-bold text-cactus-900">{title}</h3>
              <p className="mt-2 leading-7 text-stone-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-sand-200 bg-sand-50 px-6 py-12 text-center sm:px-10">
        <h2 className="font-serif text-3xl font-bold text-cactus-900">Ready to grow with more confidence?</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-stone-600">Use the free guides on this site to get started, then keep the full reference nearby when you need a deeper answer.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-cactus-700 px-6 py-3 font-bold text-white transition hover:bg-cactus-800">Get the book — $7.99</a>
          <Link href="/" className="rounded-xl border border-sand-300 bg-white px-6 py-3 font-bold text-cactus-800 transition hover:bg-sand-50">Explore the free guides</Link>
        </div>
      </section>
    </div>
  )
}
