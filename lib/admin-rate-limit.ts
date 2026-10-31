import { createHmac } from 'node:crypto'
import { isIP } from 'node:net'
import type { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase-admin'

const MAX_ATTEMPTS = 8
const WINDOW_SECONDS = 15 * 60

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters')
  }
  return secret
}

function getClientIp(req: NextRequest): string {
  // Vercel overwrites this platform-provided header to prevent client IP spoofing.
  const candidate =
    req.headers.get('x-vercel-forwarded-for') ??
    req.headers.get('x-real-ip') ??
    req.headers.get('x-forwarded-for')

  const ip = candidate?.split(',')[0]?.trim()
  return ip && isIP(ip) ? ip : 'unknown'
}

function getRateLimitKey(req: NextRequest): string {
  return createHmac('sha256', getSessionSecret())
    .update(getClientIp(req))
    .digest('hex')
}

export async function consumeAdminLoginAttempt(req: NextRequest): Promise<{
  allowed: boolean
  retryAfterSeconds: number
}> {
  const supabase = createAdminClient()
  const { data, error } = await supabase.rpc('consume_admin_login_attempt', {
    p_key_hash: getRateLimitKey(req),
    p_max_attempts: MAX_ATTEMPTS,
    p_window_seconds: WINDOW_SECONDS,
  })

  if (error) {
    console.error('Admin login rate limiter error:', error.message)
    throw new Error('Admin login rate limiter is unavailable')
  }

  const result = Array.isArray(data) ? data[0] : null
  if (!result || typeof result.allowed !== 'boolean') {
    throw new Error('Admin login rate limiter returned an invalid response')
  }

  return {
    allowed: result.allowed,
    retryAfterSeconds: Number(result.retry_after_seconds) || 0,
  }
}

export async function clearAdminLoginAttempts(req: NextRequest): Promise<void> {
  const supabase = createAdminClient()
  const { error } = await supabase.rpc('clear_admin_login_rate_limit', {
    p_key_hash: getRateLimitKey(req),
  })

  if (error) {
    console.error('Admin login rate limit reset error:', error.message)
    throw new Error('Admin login rate limiter could not be reset')
  }
}
