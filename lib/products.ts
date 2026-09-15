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
    title: 'The Cactus Care Book',
    shortTitle: 'Cactus Care Book',
    description: 'A practical reference for soil, watering, roots, propagation, troubleshooting, and everyday cactus care.',
    longDescription: 'Learn the principles behind healthier cactus care so you can make better decisions about water, soil, light, roots, propagation, and common problems.',
    price: '$7.99',
    format: 'Digital book',
    icon: '📚',
    category: 'Complete guide',
    status: 'available',
    featured: true,
    checkoutUrl: 'https://selar.com/e829s1lr46',
    secondaryCheckoutUrl: 'https://a.co/d/00D6jXd1',
    secondaryLabel: 'Buy on Amazon',
    includes: [
      'Soil and drainage principles',
      'Condition-based watering guidance',
      'Root health and repotting principles',
      'Common problem diagnosis',
      'Practical propagation guidance',
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
]

export function getProduct(slug: string) {
  return digitalProducts.find((product) => product.slug === slug)
}
