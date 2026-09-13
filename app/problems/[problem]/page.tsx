import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const problems = {
  yellowing: {
    title: 'Why is my cactus turning yellow?',
    symptom: 'Yellowing can have several causes, so look at the roots, watering pattern, light, and recent changes before treating it as a nutrient issue.',
    checks: ['Feel the growing mix and note how long it stays wet after watering.', 'Look for soft or dark tissue and inspect roots if the plant is declining.', 'Consider whether the plant recently moved into a very different light or temperature environment.', 'Compare older growth with newer growth to see where the change started.'],
    action: 'Correct the underlying growing condition rather than adding several treatments at once. If roots or tissue are soft, prioritize preventing further moisture-related damage.',
  },
  'brown-scorched': {
    title: 'Brown or scorched cactus patches',
    symptom: 'Brown areas may follow sudden intense sun, heat, physical damage, or other stress. Texture matters: dry and firm is different from soft and spreading.',
    checks: ['Ask whether the plant was recently moved into stronger direct sun.', 'Check whether the affected area is dry and firm or soft and worsening.', 'Look for damage on the side facing the strongest light.', 'Review recent temperature changes and watering conditions.'],
    action: 'Avoid making several environmental changes at once. Give the plant stable conditions and protect it from a sudden increase in intense exposure while you identify the cause.',
  },
  'soft-mushy': {
    title: 'Soft or mushy cactus tissue',
    symptom: 'Soft, collapsing tissue is a warning sign that deserves prompt attention, particularly when the growing mix has remained wet.',
    checks: ['Stop and assess how wet the growing medium is.', 'Inspect the plant for dark, translucent, or spreading soft areas.', 'Check roots if the condition suggests a root problem.', 'Review recent watering, rainfall, drainage, and temperature.'],
    action: 'Separate a declining plant from healthy plants when disease or rot is suspected. Remove the conditions that keep the plant wet and avoid watering again until you have assessed the damage.',
  },
  wrinkled: {
    title: 'Why is my cactus wrinkled?',
    symptom: 'Wrinkling often means the plant is losing stored water, but watering immediately is not always the right answer.',
    checks: ['Check whether the mix is actually dry rather than relying on the appearance alone.', 'Consider the season and whether the plant is actively growing.', 'Inspect roots if the plant stays dry despite appropriate watering.', 'Check for a recent heat, cold, or light change that could alter water use.'],
    action: 'If the roots are healthy and the mix is genuinely dry during active growth, a thorough watering may help. If the soil stays wet or roots are compromised, adding more water can make the problem worse.',
  },
  'not-flowering': {
    title: 'Why is my cactus not flowering?',
    symptom: 'Flowering depends on maturity, species, light, seasonal conditions, and the plant having enough energy to reproduce.',
    checks: ['Confirm the plant receives enough bright light for its type.', 'Consider whether the plant is mature enough to flower.', 'Review seasonal changes rather than expecting flowers continuously.', 'Avoid pushing growth with excessive watering or feeding.'],
    action: 'Focus on consistent long-term care. Give the plant appropriate light and seasonal conditions, and avoid forcing flowering with an aggressive routine.',
  },
  'not-growing': {
    title: 'Why is my cactus not growing?',
    symptom: 'Slow growth can be completely normal for some cacti, especially outside their active season. Look for signs that distinguish normal dormancy from a problem.',
    checks: ['Check the season and recent temperature pattern.', 'Evaluate light intensity and whether growth is weak or elongated.', 'Inspect the roots if the plant has been declining or the soil behaves unusually.', 'Review pot size, drainage, and recent repotting.'],
    action: 'Do not increase water and fertilizer simply because you cannot see growth. First make sure the plant has suitable light, temperature, drainage, and healthy roots.',
  },
  pests: {
    title: 'Cactus pests: what to check',
    symptom: 'Common pests can hide around joints, new growth, spines, or other protected areas. Early inspection makes control easier.',
    checks: ['Inspect the whole plant rather than only the most visible area.', 'Look closely at new growth, crevices, and the base of the plant.', 'Check nearby plants because pests can spread.', 'Repeat inspections after treatment because one check is rarely enough.'],
    action: 'Isolate an affected plant when practical and use a control method appropriate for the pest and plant. Follow the product label if using a commercial treatment.',
  },
  stretching: {
    title: 'Why is my cactus stretching or leaning?',
    symptom: 'Elongated, weak-looking growth is often associated with insufficient light, though the complete growing environment should be considered.',
    checks: ['Compare the newest growth with older, more compact growth.', 'Notice whether the plant leans toward a window or other light source.', 'Check whether it was recently moved indoors or into shade.', 'Assess whether stronger light can be introduced gradually without causing sun damage.'],
    action: 'Improve light gradually rather than moving a low-light cactus directly into harsh sun. The existing elongated growth generally will not return to its original shape, so focus on healthier future growth.',
  },
} as const

type ProblemKey = keyof typeof problems

export function generateStaticParams() {
  return Object.keys(problems).map((problem) => ({ problem }))
}

export async function generateMetadata({ params }: { params: { problem: string } }): Promise<Metadata> {
  const guide = problems[params.problem as ProblemKey]
  return guide ? { title: guide.title, description: guide.symptom } : { title: 'Cactus Problem Diagnosis' }
}

export default function ProblemPage({ params }: { params: { problem: string } }) {
  const guide = problems[params.problem as ProblemKey]
  if (!guide) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-sm text-sand-600"><Link href="/problems" className="font-bold text-cactus-700 hover:text-cactus-800">Cactus Problems</Link><span className="mx-2">/</span>Diagnosis</div>
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Diagnosis guide</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{guide.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">{guide.symptom}</p>
      </section>

      <section className="py-12">
        <h2 className="font-serif text-3xl font-bold text-cactus-800">What to check first</h2>
        <div className="mt-6 space-y-4">
          {guide.checks.map((check, index) => (
            <div key={check} className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-5 shadow-sm">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cactus-700 text-sm font-bold text-white">{index + 1}</span>
              <p className="leading-7 text-sand-700">{check}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">What to do</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Treat the cause, not just the symptom</h2>
        <p className="mt-4 leading-8 text-sand-700">{guide.action}</p>
      </section>

      <section className="mb-14 flex flex-wrap gap-3">
        <Link href="/soil" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Check your soil →</Link>
        <Link href="/species" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Browse species →</Link>
        <Link href="/book" className="rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Get the cactus guide →</Link>
      </section>
    </div>
  )
}
