import { createHmac, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/auth-session'
import {
  clearAdminLoginAttempts,
  consumeAdminLoginAttempt,
} from '@/lib/admin-rate-limit'

function passwordsMatch(provided: string, expected: string, secret: string): boolean {
  const providedDigest = createHmac('sha256', secret).update(provided).digest()
  const expectedDigest = createHmac('sha256', secret).update(expected).digest()
  return timingSafeEqual(providedDigest, expectedDigest)
}

export async function POST(req: NextRequest) {
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

  let rateLimit: Awaited<ReturnType<typeof consumeAdminLoginAttempt>>
  try {
    rateLimit = await consumeAdminLoginAttempt(req)
  } catch (error) {
    console.error('Admin login protection unavailable:', error)
    return NextResponse.json(
      { success: false, error: 'Admin login is temporarily unavailable. Please try again later.', code: 'RATE_LIMITER_UNAVAILABLE' },
      { status: 503 }
    )
  }

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { success: false, error: 'Too many login attempts. Try again later.', code: 'RATE_LIMITED' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds || 900) },
      }
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

    if (!passwordsMatch(password, adminPassword, sessionSecret)) {
      return NextResponse.json(
        { success: false, error: 'The admin password is incorrect.', code: 'INVALID_CREDENTIALS' },
        { status: 401 }
      )
    }

    const session = createAdminSession()

    try {
      await clearAdminLoginAttempts(req)
    } catch (error) {
      // Authentication can still succeed; the counter will expire automatically.
      console.error('Could not reset successful admin login counter:', error)
    }

    const res = NextResponse.json({ success: true })
    res.cookies.set('admin_auth', session, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    return res
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid login request.', code: 'INVALID_REQUEST' },
      { status: 400 }
    )
  }
}
