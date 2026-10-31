import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase-server'
import { siteConfig } from '@/lib/site-config'
import { digitalProducts } from '@/lib/products'

export const revalidate = 3600

const staticRoutes = [
  { path: '', priority: 1, changeFrequency: 'daily' as const },
  { path: '/shop', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/book', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/categories', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/species', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/problems', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/soil', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/propagation', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/affiliate-disclosure', priority: 0.2, changeFrequency: 'yearly' as const },
]

const speciesGroups = [
  'mammillaria',
  'astrophytum',
  'echinocactus',
  'echinopsis',
  'opuntia',
  'ferocactus',
  'gymnocalycium',
  'cereus',
]

const speciesPages = [
  ['mammillaria', 'mammillaria-hahniana'],
  ['mammillaria', 'mammillaria-spinosissima'],
  ['astrophytum', 'astrophytum-myriostigma'],
  ['astrophytum', 'astrophytum-asterias'],
  ['echinocactus', 'echinocactus-grusonii'],
  ['echinocactus', 'echinocactus-horizonthalonius'],
  ['echinopsis', 'echinopsis-subdenudata'],
  ['echinopsis', 'echinopsis-pachanoi'],
  ['opuntia', 'opuntia-microdasys'],
  ['opuntia', 'opuntia-ficus-indica'],
  ['ferocactus', 'ferocactus-latispinus'],
  ['ferocactus', 'ferocactus-wislizeni'],
  ['gymnocalycium', 'gymnocalycium-mihanovichii'],
  ['gymnocalycium', 'gymnocalycium-baldianum'],
  ['cereus', 'cereus-repandus'],
  ['cereus', 'cereus-hildmannianus'],
] as const

const problemPages = [
  'yellowing',
  'brown-scorched',
  'soft-mushy',
  'wrinkled',
  'not-flowering',
  'not-growing',
  'pests',
  'stretching',
]

const soilTopics = [
  'drainage',
  'mineral-structure',
  'organic-matter',
  'pot-choice',
  'repotting',
  'watering',
]

const propagationMethods = ['cuttings', 'offsets', 'seeds', 'grafting']

const categoryPages = [
  'cactus-care',
  'species-guides',
  'problems-diagnosis',
  'soil-water',
  'propagation',
  'general',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const productEntries = digitalProducts.map((product) => ({
    url: `${siteConfig.url}/shop/${product.slug}`,
    changeFrequency: 'monthly' as const,
    priority: product.status === 'available' ? 0.8 : 0.5,
  }))

  const resourceEntries: MetadataRoute.Sitemap = [
    ...speciesGroups.map((slug) => ({
      url: `${siteConfig.url}/species/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...speciesPages.map(([group, slug]) => ({
      url: `${siteConfig.url}/species/${group}/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...problemPages.map((slug) => ({
      url: `${siteConfig.url}/problems/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...soilTopics.map((slug) => ({
      url: `${siteConfig.url}/soil/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...propagationMethods.map((slug) => ({
      url: `${siteConfig.url}/propagation/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...categoryPages.map((slug) => ({
      url: `${siteConfig.url}/category/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.65,
    })),
  ]

  const postEntries = (posts ?? []).map((post) => ({
    url: `${siteConfig.url}/post/${post.slug}`,
    lastModified: new Date(post.updated_at ?? post.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...productEntries, ...resourceEntries, ...postEntries]
}
