import Link from 'next/link'

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
            <ul className="mt-5 space-y-4 text-sand-50">
              <li className="flex gap-3"><span>✓</span><span>Soil and drainage fundamentals</span></li>
              <li className="flex gap-3"><span>✓</span><span>Watering and seasonal care</span></li>
              <li className="flex gap-3"><span>✓</span><span>Root problems and recovery</span></li>
              <li className="flex gap-3"><span>✓</span><span>Pests, sunburn, stretching, and stress</span></li>
              <li className="flex gap-3"><span>✓</span><span>Propagation and species-specific care</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-cactus-600">Why this book?</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Cactus care gets easier when you understand what is happening beneath the surface.</h2>
          <p className="mt-5 leading-7 text-sand-700">Instead of relying on rigid schedules or one-size-fits-all advice, learn the principles behind healthy growth and use them to make better decisions for your own plants.</p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(([icon, title, text]) => (
            <div key={title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <div className="text-2xl">{icon}</div>
              <h3 className="mt-4 font-bold text-cactus-800">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-sand-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-sand-200 bg-sand-100 px-6 py-12 sm:px-10 sm:py-14">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-cactus-600">A practical reference</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Keep the answers close when your cactus starts telling you something is wrong.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-sand-700">Use the guide alongside the free articles on The Desert Beneath. Learn the fundamentals here, then return to the site whenever you need a deeper troubleshooting guide.</p>
          </div>
          <div className="text-center md:min-w-[170px]">
            <p className="text-4xl font-bold text-cactus-800">$7.99</p>
            <p className="mt-1 text-sm text-sand-600">USD</p>
            <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="mt-5 block rounded-xl bg-cactus-700 px-6 py-3.5 font-bold text-white transition hover:bg-cactus-800">Buy on Selar →</a>
          </div>
        </div>
      </section>

      <section className="py-14 text-center sm:py-20">
        <h2 className="font-serif text-3xl font-bold text-cactus-800 sm:text-4xl">Ready to grow from the roots up?</h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-sand-700">Get the guide, learn the fundamentals, and make your next cactus-care decision with more confidence.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-cactus-700 px-8 py-4 font-bold text-white transition hover:bg-cactus-800">Get the book — $7.99</a>
          <a href="https://a.co/d/00D6jXd1" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-cactus-700 px-8 py-4 font-bold text-cactus-800 transition hover:bg-sand-100">Amazon →</a>
        </div>
        <Link href="/" className="mt-5 inline-block text-sm font-semibold text-cactus-700 hover:underline">← Back to The Desert Beneath</Link>
      </section>
    </div>
  )
}
