import { createClient } from '@/lib/supabase-server'
import { Post } from '@/lib/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { siteConfig } from '@/lib/site-config'
import DisqusComments from '@/components/DisqusComments'

export const revalidate = 0

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

async function getPost(slug: string): Promise<Post | null> {
  const supabase = createClient()
  const { data: post } = await supabase
    .from('posts').select('*').eq('slug', slug).eq('published', true).single()
  return post as Post | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  if (!post) return { title: 'Post Not Found' }
  const description = post.meta_description || post.excerpt || stripHtml(post.content).slice(0, 160)
  const url = `${siteConfig.url}/post/${post.slug}`
  const ogImage = post.cover_image || siteConfig.defaultOgImage
  return {
    title: post.title, description,
    alternates: { canonical: url },
    openGraph: { type: 'article', title: post.title, description, url, siteName: siteConfig.name, images: [{ url: ogImage }], publishedTime: post.created_at, modifiedTime: post.updated_at },
    twitter: { card: 'summary_large_image', title: post.title, description, images: [ogImage] },
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  if (!post) notFound()
  const typedPost = post as Post
  const description = typedPost.meta_description || typedPost.excerpt || stripHtml(typedPost.content).slice(0, 160)
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: typedPost.title, description,
    image: typedPost.cover_image || siteConfig.defaultOgImage,
    datePublished: typedPost.created_at, dateModified: typedPost.updated_at,
    author: { '@type': 'Organization', name: siteConfig.name },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/post/${typedPost.slug}` },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Link href="/" className="text-sm text-cactus-700 hover:underline mb-6 inline-block">&larr; Back to all posts</Link>
      {typedPost.cover_image && (
        <img src={typedPost.cover_image} alt={typedPost.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      )}
      <h1 className="font-serif text-3xl font-bold text-cactus-800 mb-2">{typedPost.title}</h1>
      <time className="text-sm text-sand-500 block mb-6">
        {new Date(typedPost.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </time>
      <div className="prose-content" dangerouslySetInnerHTML={{ __html: typedPost.content }} />
      <DisqusComments slug={typedPost.slug} title={typedPost.title} />
    </article>
  )
}
