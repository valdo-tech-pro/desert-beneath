import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import { siteConfig } from '@/lib/site-config'

export const revalidate = 3600 // regenerate sitemap hourly

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('slug, updated_at')
    .eq('published', true)
    .order('created_at', { ascending: false })

  const postEntries = ((posts as Pick<Post, 'slug' | 'updated_at'>[]) || []).map(
    (post) => ({
      url: `${siteConfig.url}/post/${post.slug}`,
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  )

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...postEntries,
  ]
}
