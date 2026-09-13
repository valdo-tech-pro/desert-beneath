import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cactus Problems & Diagnosis',
  description: 'Identify common cactus problems by symptoms and learn what to check first.',
}

const problems = [
  ['Yellow cactus', 'yellowing', 'Check watering, root health, light, and recent changes before assuming a nutrient problem.'],
  ['Brown or scorched patches', 'brown-scorched', 'Look at light exposure, sudden sun changes, temperature, and whether tissue is dry or soft.'],
  ['Soft or mushy tissue', 'soft-mushy', 'Act quickly: inspect the roots and stem for excess moisture and signs of rot.'],
  ['Wrinkled cactus', 'wrinkled', 'Wrinkling can indicate water stress, but season, temperature, roots, and species all matter.'],
  ['Not flowering', 'not-flowering', 'Check maturity, light, seasonal conditions, dormancy, and whether the plant has enough growth energy.'],
  ['Not growing', 'not-growing', 'Review light, temperature, season, roots, pot size, and the plant’s normal growth rate.'],
  ['Pests', 'pests', 'Inspect new growth, joints, spines, and hidden areas regularly so infestations are caught early.'],
  ['Stretching or leaning', 'stretching', 'Insufficient light is a common cause of elongated growth, but evaluate the whole growing setup.'],
]

export default function ProblemsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Cactus diagnosis</p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">Something looks wrong?</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">Start with the symptom, then work backward. A good diagnosis considers the plant, roots, environment, recent changes, and growing season—not just one visible sign.</p>
      </section>

      <section className="py-14">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Start with the symptom</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">What is your cactus telling you?</h2>
          <p className="mt-3 max-w-2xl leading-7 text-sand-700">Choose the closest match to get a simple checklist of what to inspect before changing your care routine.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {problems.map(([title, slug, description]) => (
            <article key={slug} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="font-serif text-2xl font-bold text-cactus-800">{title}</h3>
              <p className="mt-3 leading-7 text-sand-700">{description}</p>
              <Link href={`/problems/${slug}`} className="mt-5 inline-flex text-sm font-bold text-cactus-700 hover:text-cactus-800">Open diagnosis guide →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-14 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <h2 className="font-serif text-2xl font-bold text-cactus-800">Before you treat the problem</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">Take a photo, check the roots when appropriate, note recent watering and light changes, and avoid adding multiple treatments at once. Good diagnosis comes before intervention.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/soil" className="rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Learn about soil →</Link>
          <Link href="/species" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Browse species →</Link>
        </div>
      </section>
    </div>
  )
}
