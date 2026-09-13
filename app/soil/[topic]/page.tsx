import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const topics = {
  drainage: {
    title: 'Cactus soil drainage: what healthy roots need',
    intro: 'Good cactus soil should let excess water leave the root zone while keeping enough air space for roots. Drainage is about the behavior of the whole mix, not one ingredient.',
    points: ['Use a container with an open drainage hole.', 'Avoid mixes that stay saturated for long periods in your growing conditions.', 'Observe how quickly the pot dries after a thorough watering.', 'Remember that climate, light, temperature, pot size, and material all affect drying speed.'],
    tip: 'If a mix stays wet for an unexpectedly long time, changing the mix or container may be more useful than simply watering less often.',
  },
  'mineral-structure': {
    title: 'Mineral structure in cactus soil',
    intro: 'Mineral components can create useful pore spaces and physical structure, but there is no single ideal percentage for every cactus or environment.',
    points: ['Choose particles that resist collapsing into a dense mass.', 'Balance drainage with the plant’s need for moisture during active growth.', 'Consider particle size alongside the organic ingredients in the mix.', 'Judge the finished mix by how it behaves after watering and drying.'],
    tip: 'The goal is a stable root zone with useful air space—not simply the highest possible amount of grit.',
  },
  'organic-matter': {
    title: 'Organic matter in cactus potting mixes',
    intro: 'Organic ingredients can contribute moisture retention and nutrients, but too much for a particular setup may slow drying.',
    points: ['Use organic material that is clean and suitable for container growing.', 'Consider how humid your environment is and how quickly your pots normally dry.', 'Do not assume that a mix needs to be mostly organic because it looks dry at the surface.', 'Combine organic matter with enough structure to prevent the root zone becoming dense.'],
    tip: 'If the surface looks dry while the lower part of the pot remains damp, inspect the entire root zone before watering again.',
  },
  'pot-choice': {
    title: 'Choosing a pot for cactus',
    intro: 'The container changes how quickly soil dries and how much root space is available. Pot choice should work together with your mix and growing environment.',
    points: ['Prioritize reliable drainage.', 'Avoid choosing a very large container simply to give the plant more room.', 'Consider how the container material affects drying in your conditions.', 'Use a stable pot for tall or top-heavy plants.'],
    tip: 'A good pot is one that fits the root system and lets you manage moisture predictably—not necessarily the most attractive or largest one.',
  },
  repotting: {
    title: 'How to repot a cactus',
    intro: 'Repotting is an opportunity to inspect roots, refresh the growing medium, and correct drainage problems.',
    points: ['Prepare the new container and mix before disturbing the plant.', 'Handle the plant carefully to protect both you and the cactus.', 'Inspect roots for obvious damage or unhealthy tissue when appropriate.', 'Use a clean container and allow the plant to settle before returning to a normal watering routine.'],
    tip: 'Avoid repotting on a fixed calendar just because a year has passed. The plant, roots, pot, and growing conditions should determine whether repotting is useful.',
  },
  watering: {
    title: 'Watering cactus soil correctly',
    intro: 'Watering is closely connected to soil. The right frequency depends on how quickly the root zone dries, which changes with species, season, temperature, light, pot, and climate.',
    points: ['Check the growing medium rather than following a rigid calendar.', 'When watering is appropriate, water thoroughly enough to moisten the root zone.', 'Let excess water drain away instead of leaving the pot standing in water.', 'Expect drying to slow during cooler, darker, or less active periods.'],
    tip: 'If you are watering frequently because the surface dries quickly, check deeper in the pot before deciding that the cactus needs more water.',
  },
} as const

type TopicKey = keyof typeof topics

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }))
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params
  const guide = topics[topic as TopicKey]
  return guide ? { title: guide.title, description: guide.intro } : { title: 'Cactus Soil Guide' }
}

export default async function SoilTopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const guide = topics[topic as TopicKey]
  if (!guide) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-sm text-sand-600"><Link href="/soil" className="font-bold text-cactus-700 hover:text-cactus-800">Soil & Roots</Link><span className="mx-2">/</span>Guide</div>
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Soil & roots</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{guide.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">{guide.intro}</p>
      </section>
      <section className="py-12">
        <h2 className="font-serif text-3xl font-bold text-cactus-800">What to focus on</h2>
        <div className="mt-6 space-y-4">{guide.points.map((point, index) => <div key={point} className="flex gap-4 rounded-2xl border border-sand-200 bg-white p-5 shadow-sm"><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cactus-700 text-sm font-bold text-white">{index + 1}</span><p className="leading-7 text-sand-700">{point}</p></div>)}</div>
      </section>
      <section className="mb-12 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Practical rule</p><p className="mt-3 leading-8 text-sand-700">{guide.tip}</p></section>
      <section className="mb-14 flex flex-wrap gap-3"><Link href="/problems" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Diagnose a problem →</Link><Link href="/species" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Browse species →</Link><Link href="/book" className="rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Get the cactus guide →</Link></section>
    </div>
  )
}
