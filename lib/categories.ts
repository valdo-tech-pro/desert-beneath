export const CATEGORY_INFO = {
  'Cactus Care': {
    slug: 'cactus-care',
    description: 'Practical guidance for watering, light, temperature, potting, and everyday cactus care.',
  },
  'Species Guides': {
    slug: 'species-guides',
    description: 'Species-focused guides covering growth habits, conditions, and care requirements.',
  },
  'Problems & Diagnosis': {
    slug: 'problems-diagnosis',
    description: 'Identify common cactus symptoms, understand likely causes, and choose the right treatment.',
  },
  'Soil & Water': {
    slug: 'soil-water',
    description: 'Learn how soil structure, drainage, watering, and moisture affect cactus roots.',
  },
  'Propagation': {
    slug: 'propagation',
    description: 'Step-by-step guidance for propagating cacti from cuttings, offsets, and seed.',
  },
  General: {
    slug: 'general',
    description: 'Useful cactus articles that do not fit into a more specific section.',
  },
} as const

export type PostCategory = keyof typeof CATEGORY_INFO

export const POST_CATEGORIES = Object.keys(CATEGORY_INFO) as PostCategory[]

export function categorySlug(category: string) {
  return CATEGORY_INFO[category as PostCategory]?.slug ?? 'general'
}

export function categoryFromSlug(slug: string) {
  return (Object.entries(CATEGORY_INFO).find(([, info]) => info.slug === slug)?.[0] ?? null) as PostCategory | null
}
