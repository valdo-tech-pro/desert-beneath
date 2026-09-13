import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cactus Soil & Potting Guide',
  description: 'Learn how drainage, particle size, organic matter, and containers affect cactus roots.',
}

const topics = [
  ['Drainage', 'Good drainage helps excess water move away from the root zone instead of remaining around roots for too long.'],
  ['Mineral structure', 'Mineral particles create pore spaces and physical structure. The right balance depends on species and growing conditions.'],
  ['Organic matter', 'Organic ingredients can hold moisture and nutrients, but too much for a particular setup can keep the root zone wet longer than intended.'],
  ['Pot choice', 'A suitable pot should match the plant, root system, climate, watering habits, and drainage needs.'],
  ['Repotting', 'Repot when the plant and root system need it, using a clean container and a mix suited to the growing environment.'],
  ['Watering the mix', 'A good soil mix is only half the equation. Watering frequency should respond to drying speed, season, temperature, light, and species.'],
]

export default function SoilPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Soil & roots</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Build a root zone your cactus can actually use.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">Cactus soil is not about following one magic recipe. It is about controlling moisture, air space, structure, and drying speed for the plant and environment you have.</p>
      </section>

      <section className="py-14">
        <div className="mb-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">The fundamentals</p><h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">What makes a useful cactus mix?</h2></div>
        <div className="grid gap-5 sm:grid-cols-2">
          {topics.map(([title, description]) => <article key={title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm"><h3 className="font-serif text-2xl font-bold text-cactus-800">{title}</h3><p className="mt-3 leading-7 text-sand-700">{description}</p></article>)}
        </div>
      </section>

      <section className="mb-14 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <h2 className="font-serif text-2xl font-bold text-cactus-800">There is no universal cactus soil recipe</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">A mix that dries quickly in a humid climate may behave very differently indoors or in a dry, hot environment. Start with the plant and your conditions, then adjust the mix around how quickly it dries.</p>
        <Link href="/#start-here" className="mt-6 inline-flex rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Learn the care basics →</Link>
      </section>
    </div>
  )
}
