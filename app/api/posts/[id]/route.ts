import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { isAdminAuthenticated } from '@/lib/auth'
import { validatePostInput } from '@/lib/post-validation'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const validationError = validatePostInput(body)
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 })

    const { title, slug, excerpt, meta_description, content, cover_image, published } = body
    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        excerpt,
        meta_description,
        content,
        cover_image: cover_image || null,
        published: !!published,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: 'Unable to update post' }, { status: 500 })
    }

    return NextResponse.json({ post: data })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createAdminClient()
  const { error } = await supabase.from('posts').delete().eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: 'Unable to delete post' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
