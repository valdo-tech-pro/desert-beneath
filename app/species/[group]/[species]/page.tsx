import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const species = {
  'mammillaria-hahniana': {
    group: 'mammillaria', name: 'Mammillaria hahniana', common: 'Old Lady Cactus',
    description: 'A compact, rounded Mammillaria recognized for dense white hairs and a woolly appearance.',
    identification: 'Usually a solitary or slowly clustering globular cactus with many tubercles, pale radial spines, and a dense covering of white hairs. A ring of small flowers can appear around the upper part of mature plants.',
    size: 'Usually remains relatively compact in cultivation, although mature size varies with conditions and form.',
    habitat: 'Native to Mexico, where it occurs in dry, sunny habitats. Habitat conditions help explain its preference for strong light and sharply draining soil.',
    flowering: 'Mature plants can produce a ring of small pinkish to reddish flowers around the crown when growing conditions are suitable.',
    light: 'Give bright light and acclimate gradually to strong direct sun. Good light helps maintain a compact shape and supports flowering.',
    water: 'Water thoroughly after the mix has dried well, then let excess drain away. Extend the dry period during cool or low-light conditions.',
    soil: 'Use a porous, fast-draining cactus mix and a pot with a drainage hole. Avoid heavy soil that stays wet around the roots.',
    problems: 'Watch for weak growth from insufficient light, prolonged moisture, root problems, and pests hidden among dense hairs or spines.',
    propagation: 'Seeds are reliable. Healthy offsets, when naturally produced, can also be separated and allowed to dry at the wound before potting.',
  },
  'mammillaria-spinosissima': {
    group: 'mammillaria', name: 'Mammillaria spinosissima', common: 'Red-Headed Irishman',
    description: 'A compact, cylindrical Mammillaria with dense spines and a characteristic reddish-brown spine display on many forms.',
    identification: 'Forms a cylindrical to elongated body covered in tubercles and numerous spines. Mature plants may form clusters and can produce a ring of flowers near the top.',
    size: 'Typically a small to medium cactus in cultivation, with size and clustering influenced by species form and growing conditions.',
    habitat: 'Native to Mexico and adapted to dry, bright environments. Its natural setting favors strong light and rapid drainage.',
    flowering: 'Flowers commonly form in a ring near the crown and may range from pink to reddish tones depending on the plant.',
    light: 'Provide strong light, increasing direct exposure gradually. Rotate indoor plants periodically for more even growth.',
    water: 'Let the soil dry substantially before watering again. In cooler or darker periods, water less often.',
    soil: 'A gritty, well-aerated mix with dependable drainage is a good starting point. Avoid containers without drainage holes.',
    problems: 'Insufficient light can cause elongated growth, while persistent wet soil can lead to root damage or rot. Check clustered plants carefully for pests.',
    propagation: 'Seeds are straightforward. Offsets can be separated when established, with fresh wounds allowed to callus before planting.',
  },
  'astrophytum-myriostigma': {
    group: 'astrophytum', name: 'Astrophytum myriostigma', common: 'Bishop’s Cap',
    description: 'A symmetrical, ribbed cactus with a distinctive star-like form and pale surface flecking.',
    identification: 'Often develops a smooth, rounded body with several pronounced ribs and small woolly areoles. Many plants have pale speckles across the green surface.',
    size: 'Can become a substantial globular cactus over time, especially when grown in strong light with good root conditions.',
    habitat: 'Native to Mexico and associated with dry, exposed habitats. Its form reflects a cactus adapted to bright conditions and periods of limited water.',
    flowering: 'Mature plants can produce yellow flowers from the crown during active growth.',
    light: 'Give bright light and acclimate carefully to intense sun. Strong light helps preserve the compact, symmetrical form.',
    water: 'Allow the mix to dry well between thorough waterings. Be particularly cautious with moisture when temperatures are cool.',
    soil: 'Use a mineral-rich, fast-draining mix that dries predictably. Good airflow and an open drainage hole are important.',
    problems: 'Overwatering is a key risk, especially in cool conditions. Sudden exposure to intense sunlight can also cause scorch.',
    propagation: 'Usually grown from seed. Young seedlings need careful moisture and light management until they become established.',
  },
  'astrophytum-asterias': {
    group: 'astrophytum', name: 'Astrophytum asterias', common: 'Star Cactus',
    description: 'A small, spineless or nearly spineless cactus with a flattened body and strong radial symmetry.',
    identification: 'Usually low and rounded, with clear ribs, woolly areoles, and pale flecking. The symmetrical body gives it a distinctive star-like outline when viewed from above.',
    size: 'Generally remains a small cactus, although mature specimens can broaden considerably compared with young plants.',
    habitat: 'Native to a limited region of southern Texas and northeastern Mexico, where it grows in dry, sunny habitats.',
    flowering: 'Mature plants may produce yellow flowers from the center during suitable growing conditions.',
    light: 'Use bright light with gradual acclimation to strong sun. Avoid abrupt changes from shade to intense midday exposure.',
    water: 'Water thoroughly only after the growing medium has dried well. Reduce watering during cool or inactive periods.',
    soil: 'Favor a very free-draining, mineral-forward mix. A shallow, breathable container with a drainage hole can work well when matched to the root system.',
    problems: 'Persistent moisture can be especially damaging. Watch for soft tissue, discoloration, or a mix that remains damp for too long.',
    propagation: 'Primarily propagated from seed. Keep young seedlings evenly but carefully moist, with bright filtered light and good airflow.',
  },
  'echinocactus-grusonii': {
    group: 'echinocactus', name: 'Echinocactus grusonii', common: 'Golden Barrel Cactus',
    description: 'A famous golden-spined barrel cactus that develops a strong, rounded silhouette with age.',
    identification: 'Recognized by a rounded body with numerous ribs, yellow to golden spines, and prominent areoles. Older plants may become broadly barrel-shaped.',
    size: 'Can become a large specimen over many years. Give mature plants enough physical space and a stable container.',
    habitat: 'Native to central Mexico and adapted to sunny, seasonally dry conditions.',
    flowering: 'Mature plants may flower from the crown, usually after reaching substantial size and receiving strong growing conditions.',
    light: 'Provide abundant light and acclimate gradually when moving into strong direct sun.',
    water: 'Water deeply once the mix has dried substantially, then let it dry again. Be conservative in cool conditions.',
    soil: 'Use a coarse, quick-draining mix with strong mineral structure and a container with open drainage.',
    problems: 'Persistent wet soil can lead to root problems. Scorch can occur after abrupt changes from shade to intense sun.',
    propagation: 'Usually grown from seed. Young plants need careful watering and strong but appropriately filtered light.',
  },
  'echinocactus-horizonthalonius': {
    group: 'echinocactus', name: 'Echinocactus horizonthalonius', common: 'Devil’s Pincushion',
    description: 'A compact barrel cactus with pronounced ribs and strong spines, valued by collectors for its sculptural form.',
    identification: 'Usually solitary and rounded to somewhat flattened, with distinct ribs and robust spines. Mature plants can develop a strongly patterned surface.',
    size: 'Usually remains relatively compact compared with the largest barrel cacti.',
    habitat: 'Native to parts of the southwestern United States and Mexico, growing in dry, bright environments.',
    flowering: 'Mature plants can produce flowers near the crown when conditions and age are suitable.',
    light: 'Give very bright light, with gradual acclimation to intense sun.',
    water: 'Allow the growing medium to dry well between thorough waterings. Reduce watering during cool or low-light periods.',
    soil: 'A mineral-rich, rapidly draining mix is appropriate. Avoid heavy soil and containers that trap water.',
    problems: 'Rot from prolonged moisture is a major concern. Monitor for discoloration or soft tissue and avoid watering simply because the surface looks dry.',
    propagation: 'Usually propagated by seed. Seedlings need careful moisture management and protection from extremes while young.',
  },
  'echinopsis-subdenudata': {
    group: 'echinopsis', name: 'Echinopsis subdenudata', common: 'Domino Cactus',
    description: 'A small, rounded Echinopsis known for large white flowers and a compact, ribbed body.',
    identification: 'Usually forms a low, rounded green body with distinct ribs and relatively small areoles. Large funnel-shaped white flowers are a major feature when the plant blooms.',
    size: 'Generally stays compact but can produce offsets and form a clump over time.',
    habitat: 'Associated with South American dry habitats and adapted to strong light with seasonal moisture availability.',
    flowering: 'Known for large, fragrant white flowers that can appear from mature plants during the growing season.',
    light: 'Provide bright light and some direct sun after gradual acclimation. Good light supports compact growth and flowering.',
    water: 'During active growth, water thoroughly after the mix dries. Reduce watering as growth slows in cooler conditions.',
    soil: 'Use a well-draining cactus mix with good aeration and a pot with a drainage hole.',
    problems: 'Low light can cause weak growth, while constantly wet soil can damage roots. Dense clumps should have enough airflow to dry after watering.',
    propagation: 'Offsets are convenient when available. Seeds are also useful; allow separated offsets to callus before potting.',
  },
  'echinopsis-pachanoi': {
    group: 'echinopsis', name: 'Echinopsis pachanoi', common: 'San Pedro Cactus',
    description: 'A fast-growing columnar cactus with upright, ribbed stems and a strong architectural form.',
    identification: 'Usually forms tall green columns with several broad ribs and small areoles. Mature plants can branch and develop a tree-like silhouette.',
    size: 'Can become a large outdoor specimen in suitable climates, so allow for substantial vertical and lateral growth.',
    habitat: 'Native to the Andes of South America, where it experiences strong light, seasonal rainfall, and cooler high-elevation conditions than many desert cacti.',
    flowering: 'Mature plants can produce large white flowers, often opening at night or around dawn.',
    light: 'Give bright light and acclimate gradually to strong direct sun, especially after indoor or sheltered growth.',
    water: 'During active growth, water thoroughly once the mix has dried. Allow longer dry periods during cool or low-light conditions.',
    soil: 'Use a fast-draining, airy mix and a sturdy container with good drainage. Larger plants benefit from stable support.',
    problems: 'Weak or leaning growth can indicate inadequate light. Overly wet soil can cause root problems, particularly in cool conditions.',
    propagation: 'Stem cuttings are practical: allow the cut end to callus before rooting in a dry, well-draining medium. Seeds are another option.',
  },
  'opuntia-microdasys': {
    group: 'opuntia', name: 'Opuntia microdasys', common: 'Bunny Ears Cactus',
    description: 'A branching prickly pear with flattened pads and clusters of fine glochids that can be difficult to see.',
    identification: 'Forms pairs or clusters of oval pads, with areoles carrying dense glochids rather than large obvious spines on many cultivated forms.',
    size: 'Can become a branching shrub-like plant when grown strongly outdoors or in a bright protected position.',
    habitat: 'Native to Mexico and adapted to bright, dry conditions with seasonal rainfall.',
    flowering: 'Mature plants can produce yellow flowers followed by fruit under suitable conditions.',
    light: 'Provide abundant light and acclimate gradually to intense direct sun.',
    water: 'Let the mix dry well between waterings. Water less often during cool, dark periods.',
    soil: 'Use a gritty, fast-draining mix and a container with a drainage hole. Avoid heavy, water-retentive soil.',
    problems: 'Handle carefully because glochids can lodge in skin. Watch for soft pads, root problems, and pests on new growth.',
    propagation: 'Pad propagation is simple: allow a detached pad to callus before setting it into a suitable dry, well-draining medium.',
  },
  'opuntia-ficus-indica': {
    group: 'opuntia', name: 'Opuntia ficus-indica', common: 'Prickly Pear',
    description: 'A large, pad-forming Opuntia cultivated for its edible fruit and useful, vigorous growth.',
    identification: 'Produces broad, flattened pads that branch from older pads. Mature plants can develop a substantial upright or spreading structure.',
    size: 'Can become a large plant, particularly outdoors in warm climates. Container-grown specimens remain smaller when root space is restricted.',
    habitat: 'Widely cultivated and naturalized in warm dry regions; the species is associated with arid and semi-arid conditions.',
    flowering: 'Produces showy flowers on mature pads, followed by the familiar prickly pear fruit.',
    light: 'Give abundant light and strong sun after gradual acclimation.',
    water: 'Water thoroughly after the soil has dried well, then allow it to dry again. Avoid frequent shallow watering.',
    soil: 'Use a coarse, well-draining mix and a stable container. Good drainage becomes increasingly important as the plant gets larger.',
    problems: 'Excess moisture can cause root and pad problems. Check new pads for scale and other common pests.',
    propagation: 'Healthy pads are commonly rooted after the cut surface has dried and callused. Seed propagation is also possible.',
  },
  'ferocactus-latispinus': {
    group: 'ferocactus', name: 'Ferocactus latispinus', common: 'Devil’s Tongue Barrel',
    description: 'A striking barrel cactus known for broad, flattened central spines and strong ribbing.',
    identification: 'Usually rounded to barrel-shaped with prominent ribs and robust spines. The broad central spine can be especially distinctive.',
    size: 'Generally remains a manageable barrel size in cultivation, though mature specimens can become substantially broader.',
    habitat: 'Native to Mexico and adapted to bright, dry conditions with periods of seasonal rainfall.',
    flowering: 'Mature plants can produce flowers near the crown, often in warm growing conditions.',
    light: 'Provide strong light and acclimate gradually to direct sun.',
    water: 'Water deeply after the mix has dried substantially. Reduce watering during cool or inactive periods.',
    soil: 'Choose a coarse, mineral-forward mix with dependable drainage.',
    problems: 'Watch for persistent moisture, especially when temperatures are low. Weak growth can signal inadequate light.',
    propagation: 'Primarily grown from seed. Young seedlings need careful moisture control and bright, appropriately filtered light.',
  },
  'ferocactus-wislizeni': {
    group: 'ferocactus', name: 'Ferocactus wislizeni', common: 'Fishhook Barrel Cactus',
    description: 'A robust barrel cactus with curved central spines and a classic desert form.',
    identification: 'Usually barrel-shaped with many ribs and prominent hooked central spines. Mature plants can become large and sometimes develop a leaning form with age.',
    size: 'Can become a sizeable barrel cactus outdoors in suitable climates.',
    habitat: 'Native to the southwestern United States and northern Mexico, where it experiences intense light and dry conditions with seasonal rain.',
    flowering: 'Mature specimens may flower from the crown during the warm growing season.',
    light: 'Give abundant light and acclimate carefully to full sun.',
    water: 'Allow the soil to dry well between deep waterings. Be more conservative in cold weather.',
    soil: 'Use a fast-draining, coarse mix in a container with reliable drainage.',
    problems: 'Root problems can follow prolonged wetness. Handle carefully because the hooked spines can catch skin and clothing.',
    propagation: 'Usually propagated from seed. Seedlings need controlled moisture and gradual exposure to stronger light.',
  },
  'gymnocalycium-mihanovichii': {
    group: 'gymnocalycium', name: 'Gymnocalycium mihanovichii', common: 'Chin Cactus',
    description: 'A small, ribbed Gymnocalycium best known in cultivation for its compact forms and colorful grafted varieties.',
    identification: 'Typically small and rounded with clear ribs and short spines. Natural green plants differ from the brightly colored forms commonly sold grafted onto another cactus.',
    size: 'Usually remains small, making it suitable for compact collections and windowsill growing when light is adequate.',
    habitat: 'Native to South America and adapted to warm, seasonally dry conditions.',
    flowering: 'Mature plants can produce small funnel-shaped flowers from the upper part of the body.',
    light: 'Bright light is useful, but intense direct sun should be introduced carefully. Grafted colorful forms can be particularly sensitive to harsh exposure.',
    water: 'Let the mix dry substantially between waterings. Avoid prolonged wetness, especially in cool conditions.',
    soil: 'Use a porous, fast-draining cactus mix with a drainage hole.',
    problems: 'Rot is a concern when soil stays wet. Grafted plants may also decline if the rootstock or graft union is stressed.',
    propagation: 'Green forms can be grown from seed. Many colorful cultivated forms are maintained by grafting because their lack of sufficient chlorophyll limits independent growth.',
  },
  'gymnocalycium-baldianum': {
    group: 'gymnocalycium', name: 'Gymnocalycium baldianum', common: 'Dwarf Chin Cactus',
    description: 'A small globular cactus valued for its compact body and vivid flowers.',
    identification: 'Usually forms a small rounded body with distinct ribs and short spines. Flowers are relatively large compared with the plant body.',
    size: 'A compact species that works well in small containers when the potting mix and light are appropriate.',
    habitat: 'Native to Argentina and adapted to seasonal moisture with periods of dryness.',
    flowering: 'Known for attractive flowers that can range from red and pink to other shades depending on the form.',
    light: 'Give bright light with protection from abrupt exposure to extreme midday sun.',
    water: 'During active growth, water thoroughly after the soil dries. Allow longer dry periods when cool or inactive.',
    soil: 'Use a porous, well-draining mix and a container with a drainage hole.',
    problems: 'Watch for softening, discoloration, or a pot that remains wet too long. Low light can reduce compact growth and flowering.',
    propagation: 'Seeds are the main method. Allow seedlings to establish gradually with careful moisture and light management.',
  },
  'cereus-repandus': {
    group: 'cereus', name: 'Cereus repandus', common: 'Peruvian Apple Cactus',
    description: 'A tall, branching columnar cactus valued for its dramatic upright structure and large flowers on mature plants.',
    identification: 'Forms ribbed green columns that branch with age. Mature stems develop prominent areoles and can form a tree-like silhouette.',
    size: 'Can become very large outdoors in warm climates. Container plants need sturdy support and periodic root-space management.',
    habitat: 'Associated with dry regions of South America and widely cultivated in warm climates.',
    flowering: 'Mature plants can produce large white flowers, often opening at night, followed by fruit in suitable conditions.',
    light: 'Give strong light and acclimate gradually to full sun. Insufficient light can cause thin, weak stems.',
    water: 'Water thoroughly after the mix has dried well, then let it dry again. Reduce watering during cool or low-light periods.',
    soil: 'Use a fast-draining mix with plenty of air space and a sturdy pot with open drainage.',
    problems: 'Weak stems can indicate insufficient light. Root problems can develop if a large container stays wet for too long.',
    propagation: 'Stem cuttings are practical when taken from healthy growth. Let the cut surface callus before rooting in a dry, well-draining medium.',
  },
  'cereus-hildmannianus': {
    group: 'cereus', name: 'Cereus hildmannianus', common: 'Night-Blooming Cereus',
    description: 'A branching columnar cactus that can develop tall stems and large, night-opening flowers.',
    identification: 'Produces upright to arching ribbed stems with areoles and relatively short spines. Mature plants can become heavily branched.',
    size: 'Can become a large landscape or greenhouse specimen where climate permits.',
    habitat: 'Native to parts of South America and associated with warm, seasonally dry environments.',
    flowering: 'Mature plants may produce large white flowers that open at night and can be followed by fruit.',
    light: 'Provide abundant light, with gradual acclimation to strong direct sun.',
    water: 'During active growth, water thoroughly once the mix dries. Reduce frequency in cool or darker periods.',
    soil: 'Use a well-draining, airy cactus mix in a sturdy container. Large plants need stable support.',
    problems: 'Low light can produce weak or leaning growth, while excess moisture can damage roots.',
    propagation: 'Stem cuttings are commonly practical. Allow the wound to dry and callus before rooting; seeds are another option.',
  },
} as const

type SpeciesKey = keyof typeof species

export function generateStaticParams() {
  return Object.keys(species).map((slug) => {
    const item = species[slug as SpeciesKey]
    return { group: item.group, species: slug }
  })
}

export async function generateMetadata({ params }: { params: Promise<{ group: string; species: string }> }): Promise<Metadata> {
  const { group, species: speciesSlug } = await params
  const item = species[speciesSlug as SpeciesKey]
  if (!item || item.group !== group) return { title: 'Cactus Species Guide' }
  return {
    title: `${item.name} Care Guide | The Desert Beneath`,
    description: `${item.name} (${item.common}) identification, habitat, size, flowering, light, watering, soil, problems, and propagation guide.`,
  }
}

export default async function IndividualSpeciesPage({ params }: { params: Promise<{ group: string; species: string }> }) {
  const { group, species: speciesSlug } = await params
  const item = species[speciesSlug as SpeciesKey]
  if (!item || item.group !== group) notFound()

  const sections = [
    ['Identification', item.identification],
    ['Typical size', item.size],
    ['Native range & habitat', item.habitat],
    ['Flowering', item.flowering],
    ['Light', item.light],
    ['Watering', item.water],
    ['Soil & drainage', item.soil],
    ['Common problems', item.problems],
    ['Propagation', item.propagation],
  ] as const

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-sm text-sand-600">
        <Link href="/species" className="font-bold text-cactus-700 hover:text-cactus-800">Species Library</Link>
        <span className="mx-2">/</span>
        <Link href={`/species/${item.group}`} className="font-bold text-cactus-700 hover:text-cactus-800">{item.group}</Link>
        <span className="mx-2">/</span>{item.name}
      </div>

      <section className="rounded-[2rem] bg-cactus-800 px-7 py-14 text-white sm:px-10 sm:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-sand-100">Individual species guide</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight sm:text-5xl">{item.name}</h1>
        <p className="mt-3 text-lg font-semibold text-sand-100">{item.common}</p>
        <p className="mt-5 max-w-2xl text-base leading-8 text-sand-100 sm:text-lg">{item.description}</p>
      </section>

      <section className="py-12">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Species reference</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Know the plant before changing the routine</h2>
          <p className="mt-3 max-w-2xl leading-7 text-sand-700">Use these details as a practical starting point. Watering and light needs still depend on season, climate, pot size, soil, airflow, and the plant’s current growing conditions.</p>
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
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cactus-600">Keep learning</p>
        <h2 className="mt-2 font-serif text-3xl font-bold text-cactus-800">Build the whole care system</h2>
        <p className="mt-3 max-w-2xl leading-7 text-sand-700">A healthy cactus depends on more than a species label. Learn how drainage, soil structure, watering, propagation, and diagnosis work together.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href={`/species/${item.group}`} className="rounded-xl bg-cactus-700 px-5 py-3 font-bold text-white hover:bg-cactus-800">Back to {item.group} →</Link>
          <Link href="/soil" className="rounded-xl border border-sand-300 bg-white px-5 py-3 font-bold text-cactus-800 hover:border-cactus-300">Soil guides →</Link>
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
