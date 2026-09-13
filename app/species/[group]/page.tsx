import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const groups = {
  mammillaria: {
    name: 'Mammillaria',
    description: 'A broad group of compact cacti with tubercled bodies and many different forms and flowers.',
    light: 'Bright light with gradual acclimation when moving into stronger sun.',
    water: 'Water thoroughly when the mix has dried substantially, then let excess water drain away.',
    soil: 'Use a fast-draining mix with plenty of mineral structure and a pot with drainage.',
    watch: 'Watch for weak, stretched growth, persistent wet soil, and pests hiding around the plant surface.',
  },
  astrophytum: {
    name: 'Astrophytum',
    description: 'Sculptural, star-like cacti prized for ribbed forms, markings, and distinctive textures.',
    light: 'Give strong light and introduce intense direct sun gradually to reduce stress or scorching.',
    water: 'Allow the growing mix to dry well between thorough waterings, with less water during cool or dormant periods.',
    soil: 'Favor a very free-draining, mineral-rich mix that does not stay wet for long.',
    watch: 'Pay close attention to excess moisture, especially when temperatures are cool or airflow is poor.',
  },
  echinocactus: {
    name: 'Echinocactus',
    description: 'Globular barrel-shaped cacti with prominent ribs and a classic desert-cactus silhouette.',
    light: 'Strong light is important for compact, healthy growth; acclimate plants before exposing them to intense sun.',
    water: 'Water deeply only after the mix has dried substantially, and avoid leaving the pot sitting in water.',
    soil: 'Choose a coarse, quick-draining mix and a container that has a reliable drainage hole.',
    watch: 'Look for soft areas, discoloration, or slow-drying soil that may signal moisture staying around the roots too long.',
  },
  echinopsis: {
    name: 'Echinopsis',
    description: 'A diverse group of often fast-growing cacti well known for impressive, sometimes short-lived flowers.',
    light: 'Provide bright light and strong sun where appropriate, with gradual acclimation after lower-light conditions.',
    water: 'During active growth, water thoroughly after the mix dries; reduce watering when growth slows in cooler conditions.',
    soil: 'Use a well-aerated cactus mix that drains freely while still supporting active growth.',
    watch: 'Insufficient light can lead to elongated growth, while overly wet conditions can damage roots.',
  },
  opuntia: {
    name: 'Opuntia',
    description: 'Prickly pears and relatives with flattened pads, distinctive growth, and many ornamental forms.',
    light: 'Give abundant light and acclimate gradually to strong direct sun.',
    water: 'Let the growing medium dry well between waterings and avoid frequent small sips that keep the roots damp.',
    soil: 'A gritty, fast-draining mix and a container with drainage are important for healthy roots.',
    watch: 'Check new pads for pests and watch for soft growth when moisture remains high for too long.',
  },
  ferocactus: {
    name: 'Ferocactus',
    description: 'Bold ribbed barrel cacti with strong spines and a preference for bright growing conditions.',
    light: 'Provide very bright light, increasing exposure gradually when necessary.',
    water: 'Water thoroughly once the mix has dried substantially, then allow it to dry again before watering.',
    soil: 'Use a coarse, mineral-forward mix that drains quickly and does not remain saturated.',
    watch: 'Persistent moisture, especially in cool weather, is a major condition to avoid.',
  },
  gymnocalycium: {
    name: 'Gymnocalycium',
    description: 'Small globular cacti with varied ribs, textures, and flowers that make them popular with collectors.',
    light: 'Use bright light while protecting sensitive plants from sudden exposure to harsh midday sun.',
    water: 'Let the mix dry substantially between waterings and be more conservative during cool or inactive periods.',
    soil: 'Choose a porous, well-draining cactus mix with good airflow around the roots.',
    watch: 'Yellowing, softness, or a pot that stays wet for an unusually long time deserves attention.',
  },
  cereus: {
    name: 'Cereus',
    description: 'Columnar cacti valued for upright growth and dramatic silhouettes as they mature.',
    light: 'Give strong light and acclimate gradually to full sun when moving from sheltered conditions.',
    water: 'Water thoroughly after the soil has dried well, then allow the plant to dry again before repeating.',
    soil: 'Use a fast-draining mix in a sturdy container with a drainage hole.',
    watch: 'Insufficient light may produce weak, leaning growth; excess moisture can create root problems.',
  },
} as const

type GroupKey = keyof typeof groups

export function generateStaticParams() {
  return Object.keys(groups).map((group) => ({ group }))
}

export async function generateMetadata({ params }: { params: { group: string } }): Promise<Metadata> {
  const guide = groups[params.group as GroupKey]
  if (!guide) return { title: 'Cactus Species Guide' }
  return {
    title: `${guide.name} Cactus Care Guide`,
    description: `${guide.description} Learn practical light, water, soil, and problem-prevention tips for ${guide.name}.`,
  }
}

export default function SpeciesGuidePage({ params }: { params: { group: string } }) {
  const guide = groups[params.group as GroupKey]
  if (!guide) notFound()

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-sm text-sand-600">
        <Link href="/species" className="font-bold text-cactus-700 hover:text-cactus-800">Species Library</Link>
        <span className="mx-2">/</span>{guide.name}
      </div>

      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Species guide</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{guide.name} cactus care</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">{guide.description}</p>
      </section>

      <section className="grid gap-5 py-12 sm:grid-cols-2">
        {[
          ['Light', guide.light],
          ['Water', guide.water],
          ['Soil & drainage', guide.soil],
          ['What to watch for', guide.watch],
        ].map(([title, text]) => (
          <article key={title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-cactus-800">{title}</h2>
            <p className="mt-3 leading-7 text-sand-700">{text}</p>
          </article>
        ))}
      </section>

      <section className="mb-12 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Build the right routine</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Start with the growing environment</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">Species names are useful, but light, temperature, airflow, pot drainage, and seasonal growth all affect how quickly a cactus uses water. Adjust care to the conditions your plant is actually growing in.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/soil" className="rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Improve your soil →</Link>
          <Link href="/problems" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Diagnose problems →</Link>
          <Link href="/book" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Get the cactus guide →</Link>
        </div>
      </section>

      <div className="pb-14">
        <Link href="/species" className="text-sm font-bold text-cactus-700 hover:text-cactus-800">← Back to the Species Library</Link>
      </div>
    </div>
  )
}
