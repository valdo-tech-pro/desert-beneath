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
    return NextResponse.json(
      { success: false, error: 'Too many attempts. Try again later.', code: 'RATE_LIMITED' },
      { status: 429 }
    )
  }

  try {
    const body = await req.json()
    const password = typeof body?.password === 'string' ? body.password : ''

    if (password.length === 0 || password.length > 256) {
      return NextResponse.json(
        { success: false, error: 'Please enter your admin password.', code: 'INVALID_PASSWORD' },
        { status: 401 }
      )
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    const sessionSecret = process.env.ADMIN_SESSION_SECRET

    if (!adminPassword) {
      console.error('Admin authentication configuration error: ADMIN_PASSWORD is missing.')
      return NextResponse.json(
        { success: false, error: 'Admin authentication is not configured correctly. The production admin password is missing.', code: 'ADMIN_PASSWORD_CONFIG_ERROR' },
        { status: 503 }
      )
    }

    if (!sessionSecret || sessionSecret.length < 32) {
      console.error('Admin authentication configuration error: ADMIN_SESSION_SECRET is missing or too short.')
      return NextResponse.json(
        { success: false, error: 'Admin authentication is not configured correctly. The production session secret is missing or invalid.', code: 'ADMIN_SESSION_SECRET_CONFIG_ERROR' },
        { status: 503 }
      )
    }

    if (password !== adminPassword) {
      const next = current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + WINDOW_MS }
      attempts.set(key, next)

      return NextResponse.json(
        { success: false, error: 'The admin password is incorrect.', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      )
    }

    try {
      const session = createAdminSession()
      attempts.delete(key)

      const res = NextResponse.json({ success: true })
      res.cookies.set('admin_auth', session, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      return res
    } catch (error) {
      console.error('Admin session creation error:', error)
      return NextResponse.json(
        { success: false, error: 'Admin login could not create a secure session. Please check the production authentication settings.', code: 'AUTH_SESSION_ERROR' },
        { status: 503 }
      )
    }
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid login request.', code: 'INVALID_REQUEST' },
      { status: 400 }
    )
  }
}
