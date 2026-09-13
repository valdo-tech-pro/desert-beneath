import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const groups = {
  mammillaria: {
    name: 'Mammillaria',
    description: 'A broad group of compact cacti with tubercled bodies and many different forms and flowers.',
    identification: 'Usually recognized by tubercles rather than continuous ribs. Many species stay relatively compact, produce hooked or straight spines, and may form clusters or a solitary rounded body. Flowers often form a ring around the upper part of the plant.',
    growth: 'Growth varies by species, but many Mammillaria are compact and relatively slow to moderate growers. Some offset readily and can form attractive clusters over time.',
    light: 'Bright light is important for compact growth and flowering. Introduce strong direct sun gradually, especially after a period indoors or behind glass.',
    water: 'Water thoroughly when the growing mix has dried substantially, then let excess water drain away. In cool or inactive periods, allow longer dry intervals.',
    soil: 'Use a fast-draining mix with plenty of mineral structure and a pot with a drainage hole. The goal is a mix that dries reliably rather than staying damp around the roots.',
    problems: 'Watch for weak, elongated growth from insufficient light, persistent wet soil, root problems, and pests that can hide among spines or in tight clusters.',
    propagation: 'Offsets can often be separated when they are well developed. Seeds are another option for species that do not readily offset; allow fresh wounds to dry before potting cuttings.',
  },
  astrophytum: {
    name: 'Astrophytum',
    description: 'Sculptural, star-like cacti prized for ribbed forms, markings, and distinctive textures.',
    identification: 'Often recognized by strongly ribbed, symmetrical bodies, woolly areoles, and surface markings or flecks on many species. Some have pronounced ribs that create a star-like outline.',
    growth: 'Generally slow-growing compared with many common cacti. Plants often keep a compact architectural form when light is strong and watering is well timed.',
    light: 'Give strong light and introduce intense direct sun gradually to reduce stress or scorching. Good light helps maintain compact shape and characteristic markings.',
    water: 'Allow the growing mix to dry well between thorough waterings, with less water during cool or dormant periods. Avoid repeated light watering that keeps the root zone damp.',
    soil: 'Favor a very free-draining, mineral-rich mix that does not stay wet for long. A pot with dependable drainage is essential.',
    problems: 'Pay close attention to excess moisture, especially when temperatures are cool or airflow is poor. Sudden intense sun can also cause scorch on plants that were previously shaded.',
    propagation: 'Seeds are the usual route for many Astrophytum. Use a clean, well-drained seed setup and provide appropriate moisture, airflow, and bright filtered light during early growth.',
  },
  echinocactus: {
    name: 'Echinocactus',
    description: 'Globular barrel-shaped cacti with prominent ribs and a classic desert-cactus silhouette.',
    identification: 'Typically recognized by a rounded barrel form, pronounced ribs, areoles, and substantial spines. Mature plants can become broad and strongly sculptural.',
    growth: 'Usually slow-growing, especially once established. Strong light and good root conditions help maintain a compact, symmetrical form.',
    light: 'Strong light is important for compact, healthy growth; acclimate plants before exposing them to intense sun.',
    water: 'Water deeply only after the mix has dried substantially, and avoid leaving the pot sitting in water. Reduce watering when conditions are cool or growth has slowed.',
    soil: 'Choose a coarse, quick-draining mix and a container that has a reliable drainage hole. Mineral structure can help the root zone dry predictably.',
    problems: 'Look for soft areas, discoloration, or slow-drying soil that may signal moisture staying around the roots too long. Sudden exposure to intense sun can also scorch tissue.',
    propagation: 'Seeds are the primary practical method for many Echinocactus. Seedlings need careful moisture management and protection from drying out completely while very young.',
  },
  echinopsis: {
    name: 'Echinopsis',
    description: 'A diverse group of often fast-growing cacti well known for impressive, sometimes short-lived flowers.',
    identification: 'Many have rounded to short-columnar bodies with distinct ribs and areoles. Their large, funnel-shaped flowers are a major identifying feature in flowering plants.',
    growth: 'Often faster-growing than many globular desert cacti when conditions are warm and bright. Many species produce offsets and can eventually form substantial clumps.',
    light: 'Provide bright light and strong sun where appropriate, with gradual acclimation after lower-light conditions. Adequate light supports compact growth and flowering.',
    water: 'During active growth, water thoroughly after the mix dries; reduce watering when growth slows in cooler conditions. Avoid keeping the root zone constantly damp.',
    soil: 'Use a well-aerated cactus mix that drains freely while still supporting active growth. Containers must have open drainage.',
    problems: 'Insufficient light can lead to elongated growth, while overly wet conditions can damage roots. Dense clusters should also have enough airflow to dry after watering.',
    propagation: 'Offsets are often the easiest method when healthy pups are available. Seeds can also be used; allow separated offsets or cut surfaces to dry before planting.',
  },
  opuntia: {
    name: 'Opuntia',
    description: 'Prickly pears and relatives with flattened pads, distinctive growth, and many ornamental forms.',
    identification: 'Most are recognizable by flattened or rounded pads called cladodes, with areoles that may carry spines and glochids. Growth is often segmented as new pads emerge from older ones.',
    growth: 'Many Opuntia grow relatively vigorously in strong light and can branch extensively. Growth habit varies widely between species and cultivars.',
    light: 'Give abundant light and acclimate gradually to strong direct sun. Strong light generally supports sturdier pad growth.',
    water: 'Let the growing medium dry well between waterings and avoid frequent small sips that keep the roots damp. Water more conservatively during cool, low-light periods.',
    soil: 'A gritty, fast-draining mix and a container with drainage are important for healthy roots. Avoid heavy mixes that remain wet after watering.',
    problems: 'Check new pads for pests and watch for soft growth when moisture remains high for too long. Handle carefully because glochids can be difficult to see and remove.',
    propagation: 'Pad cuttings are a common and practical method. Let a detached pad develop a dry callus on the cut surface before placing it into a suitable dry, well-draining medium.',
  },
  ferocactus: {
    name: 'Ferocactus',
    description: 'Bold ribbed barrel cacti with strong spines and a preference for bright growing conditions.',
    identification: 'Recognized for robust barrel or columnar bodies, pronounced ribs, conspicuous areoles, and often heavy, colorful spines. Mature plants can become large and imposing.',
    growth: 'Generally slow to moderate growers. Strong light helps maintain a compact body and develops the characteristic spine display.',
    light: 'Provide very bright light, increasing exposure gradually when necessary. Sudden changes from shade to intense sun can cause damage.',
    water: 'Water thoroughly once the mix has dried substantially, then allow it to dry again before watering. Be especially conservative when temperatures are cool.',
    soil: 'Use a coarse, mineral-forward mix that drains quickly and does not remain saturated. A stable container with a drainage hole is important for larger plants.',
    problems: 'Persistent moisture, especially in cool weather, is a major condition to avoid. Watch for soft tissue, discoloration, and weak growth caused by inadequate light.',
    propagation: 'Seeds are the principal method for many Ferocactus. Seedlings benefit from careful moisture control, bright filtered light, and gradual exposure as they mature.',
  },
  gymnocalycium: {
    name: 'Gymnocalycium',
    description: 'Small globular cacti with varied ribs, textures, and flowers that make them popular with collectors.',
    identification: 'Usually small and rounded, with distinct ribs and areoles. The genus name is associated with its characteristic flower structure, and many species have attractive pale or colorful flowers.',
    growth: 'Often slow to moderate growers that remain relatively compact. Some species produce offsets, while others stay solitary.',
    light: 'Use bright light while protecting sensitive plants from sudden exposure to harsh midday sun. Adjust exposure to the individual species and growing environment.',
    water: 'Let the mix dry substantially between waterings and be more conservative during cool or inactive periods. Avoid keeping the roots wet for extended periods.',
    soil: 'Choose a porous, well-draining cactus mix with good airflow around the roots. Containers should drain freely.',
    problems: 'Yellowing, softness, or a pot that stays wet for an unusually long time deserves attention. Weak, stretched growth can indicate inadequate light.',
    propagation: 'Seeds work well for many species, while offsets can be separated when naturally produced. Allow wounds to dry before planting detached offsets.',
  },
  cereus: {
    name: 'Cereus',
    description: 'Columnar cacti valued for upright growth and dramatic silhouettes as they mature.',
    identification: 'Typically recognized by upright, ribbed stems that may branch with age. Depending on the species, plants can become large and tree-like, with prominent areoles and spines.',
    growth: 'Many Cereus are vigorous growers when given warmth, strong light, adequate root space, and a well-draining medium. Mature plants can develop multiple branches.',
    light: 'Give strong light and acclimate gradually to full sun when moving from sheltered conditions. Insufficient light can produce weak, leaning stems.',
    water: 'Water thoroughly after the soil has dried well, then allow the plant to dry again before repeating. Reduce watering when growth slows in cooler or darker conditions.',
    soil: 'Use a fast-draining mix in a sturdy container with a drainage hole. Larger specimens need stable containers and enough root-zone aeration.',
    problems: 'Insufficient light may produce weak, leaning growth; excess moisture can create root problems. Tall plants may also need support while young or after repotting.',
    propagation: 'Stem cuttings can be practical for suitable species: make a clean cut, allow the wound to callus, then root in a dry, well-draining medium. Seeds are another option.',
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
    description: `${guide.description} Learn how to identify ${guide.name}, understand its growth habits, and manage light, water, soil, common problems, and propagation.`,
  }
}

export default function SpeciesGuidePage({ params }: { params: { group: string } }) {
  const guide = groups[params.group as GroupKey]
  if (!guide) notFound()

  const sections = [
    ['Identification', guide.identification],
    ['Growth habits', guide.growth],
    ['Light', guide.light],
    ['Watering', guide.water],
    ['Soil & drainage', guide.soil],
    ['Common problems', guide.problems],
    ['Propagation', guide.propagation],
  ] as const

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-sm text-sand-600">
        <Link href="/species" className="font-bold text-cactus-700 hover:text-cactus-800">Species Library</Link>
        <span className="mx-2">/</span>{guide.name}
      </div>

      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Species reference</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{guide.name} cactus care</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">{guide.description}</p>
      </section>

      <section className="py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">At a glance</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">A practical reference</h2>
          <p className="mt-3 max-w-2xl leading-7 text-sand-700">Use the sections below to understand the plant before changing its routine. Exact needs vary by species, season, climate, and growing conditions.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {sections.map(([title, text]) => (
            <article key={title} className="rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-cactus-800">{title}</h2>
              <p className="mt-3 leading-7 text-sand-700">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Care principle</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Match care to the growing environment</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">A species name is a useful starting point, not a fixed watering schedule. Light intensity, temperature, airflow, pot size, soil structure, and seasonal growth all affect how quickly a cactus uses water.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/soil" className="rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Improve your soil →</Link>
          <Link href="/problems" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Diagnose problems →</Link>
          <Link href="/propagation" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Learn propagation →</Link>
          <Link href="/book" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Get the cactus guide →</Link>
        </div>
      </section>

      <div className="pb-14">
        <Link href="/species" className="text-sm font-bold text-cactus-700 hover:text-cactus-800">← Back to the Species Library</Link>
      </div>
    </div>
  )
}
