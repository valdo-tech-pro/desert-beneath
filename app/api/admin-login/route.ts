import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/auth-session'

const attempts = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8

function getClientKey(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: NextRequest) {
  const key = getClientKey(req)
  const now = Date.now()
  const current = attempts.get(key)

  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ success: false, error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  try {
    const body = await req.json()
    const password = typeof body?.password === 'string' ? body.password : ''

    if (password.length === 0 || password.length > 256) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    if (password === process.env.ADMIN_PASSWORD) {
      attempts.delete(key)
      const res = NextResponse.json({ success: true })
      res.cookies.set('admin_auth', createAdminSession(), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      return res
    }

    const next = current && current.resetAt > now
      ? { count: current.count + 1, resetAt: current.resetAt }
      : { count: 1, resetAt: now + WINDOW_MS }
    attempts.set(key, next)

    return NextResponse.json({ success: false }, { status: 401 })
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
