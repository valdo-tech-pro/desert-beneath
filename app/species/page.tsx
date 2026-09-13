import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cactus Species Library',
  description: 'Explore practical care guides for popular cactus groups and species.',
}

const groups = [
  ['Mammillaria', 'Compact, varied cacti with distinctive tubercles and often impressive flowers.'],
  ['Astrophytum', 'Star-shaped cacti known for sculptural forms, ribs, and careful watering needs.'],
  ['Echinocactus', 'Globular barrel cacti with strong ribs and a classic desert-cactus form.'],
  ['Echinopsis', 'Fast-growing cacti famous for spectacular, often short-lived flowers.'],
  ['Opuntia', 'Prickly pears and relatives with flattened pads and distinctive growth habits.'],
  ['Ferocactus', 'Large ribbed barrel cacti with strong spines and excellent light requirements.'],
  ['Gymnocalycium', 'Small globular cacti valued for their shapes, ribs, and flowers.'],
  ['Cereus', 'Columnar cacti suited to growers interested in dramatic upright growth.'],
]

export default function SpeciesPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Species library</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Know your cactus. Grow it better.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">Different cacti have different rhythms. Explore species groups and learn how form, habitat, light, soil, water, and seasonal growth shape their care.</p>
      </section>

      <section className="py-14">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Explore by group</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Popular cactus families & groups</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {groups.map(([name, description]) => (
            <article key={name} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-cactus-600">Species guide</p>
              <h3 className="mt-3 font-serif text-2xl font-bold text-cactus-800">{name}</h3>
              <p className="mt-2 leading-7 text-sand-700">{description}</p>
              <span className="mt-5 inline-block text-sm font-bold text-sand-500">Detailed guides coming soon →</span>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <h2 className="font-serif text-2xl font-bold text-cactus-800">Care still comes first</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">Species names help, but the growing environment matters just as much. Start with light, drainage, watering, soil, and seasonal growth before changing your routine.</p>
        <Link href="/#start-here" className="mt-6 inline-flex rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Start with cactus care →</Link>
      </section>
    </div>
  )
}
