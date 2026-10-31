export type ProductStatus = 'available' | 'coming-soon'

export type DigitalProduct = {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  price: string
  format: string
  icon: string
  category: string
  status: ProductStatus
  featured?: boolean
  checkoutUrl?: string
  secondaryCheckoutUrl?: string
  secondaryLabel?: string
  includes: string[]
}

export const digitalProducts: DigitalProduct[] = [
  {
    slug: 'cactus-care-book',
    title: 'The Desert Beneath: A Complete Guide to Soil Composition for Cactus Cultivation',
    shortTitle: 'The Desert Beneath',
    description: 'A special guide to cactus soil composition, featuring 10 species, soil profiles, and expert cultivation tips.',
    longDescription: 'Explore the science of minerals, microbes, and arid soil, with practical guidance on substrate ingredients, drainage, aeration, and soil profiles for 10 cactus species.',
    price: '$7.99',
    format: 'Digital book',
    icon: '📚',
    category: 'Cactus soil book',
    status: 'available',
    featured: true,
    checkoutUrl: 'https://selar.com/e829s1lr46',
    secondaryCheckoutUrl: 'https://a.co/d/00D6jXd1',
    secondaryLabel: 'View on Amazon',
    includes: [
      'The role of mineral and organic soil components',
      'Drainage, moisture retention, and aeration',
      'Particle size and pore-space structure',
      'Evaluating substrate ingredients and mixes',
    ],
  },
  {
    slug: 'cactus-watering-planner',
    title: 'Cactus Watering Planner',
    shortTitle: 'Watering Planner',
    description: 'A practical planning tool for tracking watering decisions as light, temperature, season, and plant condition change.',
    longDescription: 'Designed to help growers observe their plants and build a more thoughtful watering routine instead of relying on a fixed calendar.',
    price: 'Coming soon',
    format: 'Printable digital resource',
    icon: '💧',
    category: 'Care tools',
    status: 'coming-soon',
    includes: ['Watering log', 'Plant-condition notes', 'Seasonal planning pages', 'Observation checklist'],
  },
  {
    slug: 'cactus-problem-diagnosis-guide',
    title: 'Cactus Problem Diagnosis Guide',
    shortTitle: 'Problem Diagnosis Guide',
    description: 'A quick-reference resource for narrowing down common cactus symptoms and choosing sensible next steps.',
    longDescription: 'Use visible symptoms as clues to work through common cactus problems systematically, from watering stress to pests and light-related damage.',
    price: 'Coming soon',
    format: 'Digital quick-reference guide',
    icon: '🔎',
    category: 'Troubleshooting',
    status: 'coming-soon',
    includes: ['Symptom checklists', 'Cause-and-clue tables', 'Immediate actions', 'Prevention notes'],
  },
  {
    slug: 'cactus-propagation-guide',
    title: 'Cactus Propagation Guide',
    shortTitle: 'Propagation Guide',
    description: 'A focused companion to help you choose and prepare cactus propagation methods with greater confidence.',
    longDescription: 'A practical future guide covering propagation decisions, preparation, aftercare, and common mistakes across common cactus propagation methods.',
    price: 'Coming soon',
    format: 'Digital guide',
    icon: '🌱',
    category: 'Propagation',
    status: 'coming-soon',
    includes: ['Method selection', 'Preparation checklist', 'Aftercare principles', 'Troubleshooting'],
  },
  {
    slug: 'complete-cactus-care-bundle',
    title: 'Complete Cactus Care Bundle',
    shortTitle: 'Complete Cactus Bundle',
    description: 'A future all-in-one collection combining the cactus soil book with practical watering, diagnosis, and propagation resources.',
    longDescription: 'A planned bundle for growers who want the cactus soil reference together with practical tools for watering decisions, problem diagnosis, and propagation.',
    price: 'Coming soon',
    format: 'Digital bundle',
    icon: '🎁',
    category: 'Complete toolkit',
    status: 'coming-soon',
    includes: [
      'The Desert Beneath: A Complete Guide to Soil Composition for Cactus Cultivation',
      'Cactus Watering Planner',
      'Cactus Problem Diagnosis Guide',
      'Cactus Propagation Guide',
    ],
  },
]

export function getProduct(slug: string) {
  return digitalProducts.find((product) => product.slug === slug)
}
