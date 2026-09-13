import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 3600 // regenerate sitemap hourly

const staticRoutes = [
  { path: '', priority: 1, changeFrequency: 'daily' as const },
  { path: '/book', priority: 0.9, changeFrequency: 'monthly' as const },
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

const speciesGroups = ['mammillaria', 'astrophytum', 'echinocactus', 'echinopsis', 'opuntia', 'ferocactus', 'gymnocalycium', 'cereus']
const problemPages = ['yellowing', 'brown-scorched', 'soft-mushy', 'wrinkled', 'not-flowering', 'not-growing', 'pests', 'stretching']
const soilTopics = ['drainage', 'mineral-structure', 'organic-matter', 'pot-choice', 'repotting', 'watering']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const resourceEntries = [
    ...speciesGroups.map((slug) => ({ url: `${siteConfig.url}/species/${slug}`, priority: 0.7 })),
    ...problemPages.map((slug) => ({ url: `${siteConfig.url}/problems/${slug}`, priority: 0.7 })),
    ...soilTopics.map((slug) => ({ url: `${siteConfig.url}/soil/${slug}`, priority: 0.7 })),
  ].map((route) => ({
    url: route.url,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }))

  const postEntries = ((posts as Pick<Post, 'slug' | 'updated_at'>[]) || []).map(
    (post) => ({
      url: `${siteConfig.url}/post/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  )

  return [...staticEntries, ...resourceEntries, ...postEntries]
}
