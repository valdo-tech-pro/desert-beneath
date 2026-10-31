import type { Metadata } from 'next'
import Link from 'next/link'

const bookTitle = 'The Desert Beneath: A Complete Guide to Soil Composition for Cactus Cultivation'
const bookDescription = 'A focused guide to cactus soil composition, mineral and organic components, drainage, aeration, and the root environment.'

export const metadata: Metadata = {
  title: 'The Desert Beneath — Cactus Soil Composition Book',
  description: bookDescription,
  alternates: { canonical: '/book' },
  openGraph: { title: bookTitle, description: bookDescription, url: '/book', type: 'website' },
}

const benefits = [
  ['🪨', 'Understand soil components', 'Learn what mineral and organic ingredients contribute to a cactus growing medium, and why the role of each component matters.'],
  ['💧', 'Look beyond quick drainage', 'Understand how water movement, moisture retention, and air-filled pore spaces work together around cactus roots.'],
  ['🌱', 'Build a more suitable mix', 'Use the properties of your ingredients, your growing conditions, and the needs of your plants to make informed substrate choices.'],
  ['🔍', 'Recognise soil problems', 'Understand how fine particles, decomposition, compaction, and changing substrate structure can affect the root zone.'],
]

export default function BookPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <section className="overflow-hidden rounded-3xl bg-cactus-800 text-white shadow-sm">
        <div className="grid items-center gap-10 px-6 py-12 sm:px-10 md:grid-cols-[1.15fr_.85fr] md:py-16 lg:px-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sand-100">Real Plant Species presents · Special Guide</p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              The Desert Beneath
            </h1>
            <p className="mt-3 max-w-2xl text-xl font-semibold leading-8 text-sand-100 sm:text-2xl">
              A Complete Guide to Soil Composition for Cactus Cultivation
            </p>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-sand-200">
              10 Species · Soil Profiles · Expert Cultivation Tips
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-sand-100">
              Minerals, microbes, and the science of thriving in arid soil. Explore the materials beneath your cactus, how they influence water and air movement, and how substrate structure supports a healthy root environment.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white px-7 py-4 text-center font-bold text-cactus-800 transition hover:bg-sand-100">
                Get the digital book — $7.99
              </a>
              <a href="https://a.co/d/00D6jXd1" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-white/40 px-7 py-4 text-center font-bold text-white transition hover:bg-white/10">
                View on Amazon →
              </a>
            </div>
            <p className="mt-4 text-sm text-sand-200">First Edition · Desert Botanical Press · 2026</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur-sm">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sand-100">Inside the book</p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-sand-100">
              <li>• The role of mineral and organic components</li>
              <li>• Drainage, moisture retention, and aeration</li>
              <li>• Particle size, pore spaces, and substrate structure</li>
              <li>• Soil profiles and cultivation guidance for 10 cactus species</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-cactus-700">What this book focuses on</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-cactus-900 sm:text-4xl">The growing medium beneath the plant.</h2>
          <p className="mt-4 text-lg leading-8 text-stone-600">Cactus soil is more than a list of ingredients. Its physical structure influences how water moves, how long moisture remains, and how much air is available around the roots. The book connects these soil principles with species-specific profiles and practical cultivation advice.</p>
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
        <h2 className="font-serif text-3xl font-bold text-cactus-900">Give your cactus roots a better foundation.</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-stone-600">Explore the free soil and cultivation articles on The Desert Beneath, or get the complete book for a deeper look at substrate composition and species-specific growing conditions.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="rounded-xl bg-cactus-700 px-6 py-3 font-bold text-white transition hover:bg-cactus-800">Get the digital book — $7.99</a>
          <Link href="/soil" className="rounded-xl border border-sand-300 bg-white px-6 py-3 font-bold text-cactus-800 transition hover:bg-sand-50">Explore free soil guides</Link>
        </div>
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Real Plant Species · Desert Botanical Press · First Edition</p>
      </section>
    </div>
  )
}
