import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'About The Desert Beneath',
  description: 'Learn about The Desert Beneath and its approach to practical cactus care.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">About</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">Cactus care, from the roots up.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">{siteConfig.name} is built around a simple idea: better cactus care starts with understanding what is happening beneath the surface.</p>
      </section>

      <section className="prose-content py-14">
        <h2>Why The Desert Beneath exists</h2>
        <p>Cacti are often described as easy plants, but successful cultivation still depends on thoughtful decisions about light, water, soil, roots, containers, temperature, and seasonal growth.</p>
        <p>This site brings those pieces together in practical guides designed to help growers observe their plants, understand the causes behind common problems, and adjust their care with confidence.</p>
        <h2>What you will find here</h2>
        <p>Expect clear cactus-care articles, species information, troubleshooting resources, soil and propagation guidance, and a growing library of practical references.</p>
        <p>The goal is not to give every cactus the same routine. It is to help you understand why a routine works—or when it needs to change.</p>
        <h2>A learning-first approach</h2>
        <p>Good plant care is a process of observation. We aim to explain the reasoning behind recommendations rather than rely on rigid schedules or one-size-fits-all recipes.</p>
      </section>

      <section className="mb-14 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <h2 className="font-serif text-2xl font-bold text-cactus-800">Ready to start?</h2>
        <p className="mt-3 leading-7 text-sand-700">Begin with the essential guides, or explore the practical cultivation book.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/#start-here" className="rounded-xl bg-cactus-700 px-5 py-3 text-center font-bold text-white hover:bg-cactus-800">Start Here</Link><Link href="/book" className="rounded-xl border border-sand-300 bg-white px-5 py-3 text-center font-bold text-cactus-800 hover:bg-sand-50">Get the Book →</Link></div>
      </section>
    </div>
  )
}
