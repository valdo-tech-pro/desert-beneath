import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { isAdminAuthenticated } from '@/lib/auth'
import { validatePostInput } from '@/lib/post-validation'

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: 'Unable to load posts' }, { status: 500 })
  }

  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validationError = validatePostInput(body)
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

    const { title, slug, excerpt, meta_description, content, cover_image, category, published } = body
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        excerpt: excerpt || '',
        meta_description: meta_description || '',
        content,
        cover_image: cover_image || null,
        category,
        published: !!published,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Unable to create post' }, { status: 500 })
    }

    return NextResponse.json({ post: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
