export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  meta_description: string
  content: string
  cover_image: string | null
  published: boolean
  created_at: string
  updated_at: string
}
