import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const guides = {
  cuttings: {
    title: 'Cactus Cuttings: A Practical Propagation Guide',
    description: 'Learn how to propagate suitable cacti from cuttings while reducing the risk of rot.',
    intro: 'Cuttings are one of the most practical ways to multiply a healthy cactus when the species responds well to vegetative propagation. The key is to keep fresh wounds clean and dry until they are ready for planting.',
    bestFor: 'Cacti that naturally produce viable stem or segment cuttings.',
    steps: [
      ['Choose healthy material', 'Start with a firm, healthy section rather than tissue that is already soft, discolored, or pest-damaged.'],
      ['Make a clean cut', 'Use a clean, sharp tool and make the cut as neat as practical. Avoid repeatedly sawing through the tissue.'],
      ['Let the wound dry', 'Place the cutting somewhere clean and dry with suitable airflow. Give the cut surface time to form a dry callus before planting.'],
      ['Plant into a suitable mix', 'Set the callused end into a stable, well-draining medium. Do not bury the cutting deeply enough that it becomes unstable or stays excessively damp.'],
      ['Be patient with water', 'Fresh cuttings are vulnerable to rot. Avoid treating an unrooted cutting like an established plant; introduce moisture cautiously and according to the plant and conditions.'],
    ],
    mistakes: ['Planting a fresh, wet cut immediately.', 'Using dirty cutting tools.', 'Keeping the medium constantly wet before roots are established.', 'Taking material from a weak or diseased plant.'],
  },
  offsets: {
    title: 'Cactus Offsets: How to Propagate Pups Safely',
    description: 'A practical guide to separating and rooting cactus offsets without rushing the process.',
    intro: 'Offsets, often called pups, are naturally produced young plants. When an offset is sufficiently developed, separating it can be a straightforward propagation method with less waiting than growing from seed.',
    bestFor: 'Clustering or offset-producing cacti with a healthy, established parent plant.',
    steps: [
      ['Assess the offset', 'Choose a healthy pup that can be separated without unnecessarily damaging the parent or the young plant.'],
      ['Separate carefully', 'Use clean hands or a clean sharp tool as appropriate for how the offset is attached. Avoid tearing healthy tissue when a clean separation is possible.'],
      ['Inspect the wound', 'If separation leaves a fresh wound, keep it clean and allow the affected surface to dry before placing it into a moist environment.'],
      ['Pot securely', 'Use a small, appropriately sized container and a stable, free-draining medium. The young plant should not wobble excessively.'],
      ['Ease into normal care', 'Treat a newly separated offset as a plant recovering from handling. Gradually return it to the light and watering pattern appropriate for its species and growing conditions.'],
    ],
    mistakes: ['Separating tiny or poorly developed offsets too early.', 'Damaging the parent plant through forceful removal.', 'Watering immediately after a fresh wound without considering rot risk.', 'Using an oversized container that stays wet for too long.'],
  },
  seeds: {
    title: 'Growing Cacti From Seed: A Beginner-Friendly Guide',
    description: 'Understand the basics of cactus seed propagation, moisture control, light, and early seedling care.',
    intro: 'Seed propagation takes more time than cuttings or offsets, but it lets you raise plants from the earliest stage and explore species that are not easily propagated vegetatively.',
    bestFor: 'Growers who want to raise many seedlings, explore species diversity, or simply enjoy the full growing process.',
    steps: [
      ['Start with viable seed', 'Use fresh, properly stored seed from a reliable source and identify the species before deciding on its care.'],
      ['Prepare a clean, fine medium', 'Seedlings are small and delicate, so a reasonably clean, fine-textured, free-draining medium makes early care easier.'],
      ['Sow shallowly', 'Distribute seeds over the prepared surface. Follow the needs of the species rather than burying small cactus seed deeply.'],
      ['Balance moisture and air', 'Early seedlings need consistent access to moisture, but stagnant, overly wet conditions can encourage problems. Aim for a controlled, clean environment with appropriate airflow.'],
      ['Give gentle light and acclimate gradually', 'Provide bright but suitable light for young seedlings and increase exposure gradually as they develop. Avoid sudden harsh conditions.'],
    ],
    mistakes: ['Letting tiny seedlings repeatedly dry out completely.', 'Keeping a sealed, wet setup indefinitely.', 'Exposing delicate seedlings to sudden intense sun.', 'Ignoring species differences in germination and early growth.'],
  },
  grafting: {
    title: 'Cactus Grafting: An Introduction for Advanced Growers',
    description: 'Understand the principles of cactus grafting, clean cuts, alignment, and aftercare.',
    intro: 'Grafting joins one cactus to another so the two tissues can grow as a single plant. It is an advanced propagation technique and is not necessary for most home growers, but understanding the fundamentals helps explain why some unusual cacti are grown this way.',
    bestFor: 'Experienced growers working with suitable compatible cacti and a clear reason to graft.',
    steps: [
      ['Select compatible plants', 'Choose a healthy rootstock and a suitable scion. Compatibility and active growth can strongly influence whether a graft succeeds.'],
      ['Work cleanly', 'Use clean, sharp tools and prepare the work area before making any cuts. Contamination can turn a propagation project into a rot problem.'],
      ['Make matching cuts', 'The cut surfaces should be fresh and reasonably even. Avoid excessive handling of the exposed tissue.'],
      ['Align the vascular regions', 'Position the scion so the important vascular tissues have a good chance of making contact. Precise alignment matters more than simply placing one piece on another.'],
      ['Secure and monitor', 'Keep the union stable while it establishes. Watch for movement, drying, or signs of rot, and follow the needs of both plants as the graft heals.'],
    ],
    mistakes: ['Attempting a graft with unhealthy plants.', 'Using contaminated or dull tools.', 'Poor alignment of the vascular tissues.', 'Allowing the graft to move during healing.', 'Trying grafting before mastering basic cactus care.'],
  },
} as const

type Method = keyof typeof guides

export function generateStaticParams() {
  return Object.keys(guides).map((method) => ({ method }))
}

export async function generateMetadata({ params }: { params: { method: string } }): Promise<Metadata> {
  const guide = guides[params.method as Method]
  if (!guide) return {}
  return { title: guide.title, description: guide.description }
}

export default function PropagationGuidePage({ params }: { params: { method: string } }) {
  const guide = guides[params.method as Method]
  if (!guide) notFound()

  return (
    <div className="mx-auto max-w-4xl">
      <Link href="/propagation" className="text-sm font-bold text-cactus-700 hover:text-cactus-600">← Back to propagation</Link>

      <article className="mt-6">
        <header className="rounded-[2rem] bg-cactus-800 px-7 py-12 text-white sm:px-10 sm:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Propagation guide</p>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">{guide.title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-sand-100 sm:text-lg">{guide.intro}</p>
        </header>

        <div className="grid gap-8 py-12 lg:grid-cols-[1fr_280px]">
          <main>
            <section>
              <h2 className="font-serif text-3xl font-bold text-cactus-800">Step by step</h2>
              <div className="mt-7 space-y-7">
                {guide.steps.map(([title, text], index) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-100 text-sm font-bold text-cactus-800">{index + 1}</span>
                    <div><h3 className="font-serif text-xl font-bold text-cactus-800">{title}</h3><p className="mt-2 leading-7 text-sand-700">{text}</p></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-3xl border border-sand-200 bg-sand-100 p-7 sm:p-9">
              <h2 className="font-serif text-2xl font-bold text-cactus-800">Common mistakes to avoid</h2>
              <ul className="mt-5 space-y-3 text-sand-700">
                {guide.mistakes.map((mistake) => <li key={mistake} className="flex gap-3"><span className="font-bold text-cactus-700">•</span><span>{mistake}</span></li>)}
              </ul>
            </section>
          </main>

          <aside className="h-fit rounded-3xl border border-sand-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Best for</p>
            <p className="mt-3 leading-7 text-sand-700">{guide.bestFor}</p>
            <div className="mt-6 border-t border-sand-200 pt-5">
              <p className="text-sm font-bold text-cactus-800">Keep learning</p>
              <div className="mt-3 space-y-2 text-sm font-semibold">
                <Link href="/soil" className="block text-cactus-700 hover:text-cactus-600">Cactus soil →</Link>
                <Link href="/problems" className="block text-cactus-700 hover:text-cactus-600">Plant problems →</Link>
                <Link href="/species" className="block text-cactus-700 hover:text-cactus-600">Species library →</Link>
                <Link href="/book" className="block text-cactus-700 hover:text-cactus-600">Get the cactus book →</Link>
              </div>
            </div>
          </aside>
        </div>

        <section className="mb-14 rounded-3xl bg-cactus-50 p-7 sm:p-9">
          <h2 className="font-serif text-2xl font-bold text-cactus-800">The bigger lesson</h2>
          <p className="mt-3 leading-7 text-sand-700">Successful propagation starts with the same fundamentals as successful cactus care: healthy plant material, appropriate moisture, good drainage, clean technique, and patience. When in doubt, learn the needs of the particular species before changing your routine.</p>
          <Link href="/book" className="mt-5 inline-block rounded-full bg-cactus-700 px-5 py-3 text-sm font-bold text-white hover:bg-cactus-800">Explore the practical cactus book →</Link>
        </section>
      </article>
    </div>
  )
}
