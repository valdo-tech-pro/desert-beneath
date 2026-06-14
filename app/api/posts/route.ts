import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { isAdminAuthenticated } from '@/lib/auth'

export async function GET() {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { title, slug, excerpt, meta_description, content, cover_image, published } = body

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: 'Title, slug, and content are required' },
      { status: 400 }
    )
  }

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
      published: !!published,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}
