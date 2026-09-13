const MAX_TITLE = 200
const MAX_SLUG = 160
const MAX_EXCERPT = 600
const MAX_META_DESCRIPTION = 160
const MAX_CONTENT = 500_000
const MAX_COVER_URL = 2_048

export function validatePostInput(input: unknown): string | null {
  if (!input || typeof input !== 'object') return 'Invalid request body'

  const body = input as Record<string, unknown>
  const { title, slug, excerpt, meta_description, content, cover_image } = body

  if (typeof title !== 'string' || !title.trim()) return 'Title is required'
  if (typeof slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    return 'Slug must contain lowercase letters, numbers, and single hyphens only'
  }
  if (typeof content !== 'string' || !content.trim()) return 'Content is required'
  if (title.length > MAX_TITLE) return `Title must be ${MAX_TITLE} characters or fewer`
  if (slug.length > MAX_SLUG) return `Slug must be ${MAX_SLUG} characters or fewer`
  if (typeof excerpt !== 'string' || excerpt.length > MAX_EXCERPT) return `Excerpt must be ${MAX_EXCERPT} characters or fewer`
  if (typeof meta_description !== 'string' || meta_description.length > MAX_META_DESCRIPTION) return `Meta description must be ${MAX_META_DESCRIPTION} characters or fewer`
  if (content.length > MAX_CONTENT) return `Content must be ${MAX_CONTENT} characters or fewer`

  if (cover_image !== null && cover_image !== undefined && cover_image !== '') {
    if (typeof cover_image !== 'string' || cover_image.length > MAX_COVER_URL) return 'Cover image URL is invalid or too long'
    try {
      const url = new URL(cover_image)
      if (url.protocol !== 'https:') return 'Cover image URL must use HTTPS'
    } catch {
      return 'Cover image URL must be a valid HTTPS URL'
    }
  }

  return null
}
