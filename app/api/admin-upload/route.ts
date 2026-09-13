import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'
import { isAdminAuthenticated } from '@/lib/auth'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No image file was provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Only JPG, PNG, WebP, and GIF images are allowed' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Image must be 5 MB or smaller' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const bucket = 'post-images'

    // Create the public bucket automatically the first time an image is uploaded.
    const { error: bucketError } = await supabase.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: `${MAX_FILE_SIZE}B`,
      allowedMimeTypes: Array.from(ALLOWED_TYPES),
    })

    if (bucketError && !/already exists|duplicate/i.test(bucketError.message)) {
      console.error('Storage bucket error:', bucketError.message)
      return NextResponse.json({ error: 'Could not prepare image storage' }, { status: 500 })
    }

    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const safeExtension = /^[a-z0-9]+$/.test(extension) ? extension : 'jpg'
    const filename = `${Date.now()}-${crypto.randomUUID()}.${safeExtension}`
    const path = `covers/${filename}`

    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    })

    if (uploadError) {
      console.error('Image upload error:', uploadError.message)
      return NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path)

    return NextResponse.json({ url: data.publicUrl })
  } catch (error) {
    console.error('Admin upload error:', error)
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 })
  }
}
