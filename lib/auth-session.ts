import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_SESSION_SECRET must be at least 32 characters')
  }
  return secret
}

export function createAdminSession(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS
  const nonce = randomBytes(32).toString('hex')
  const payload = `${expiresAt}.${nonce}`
  const signature = createHmac('sha256', getSecret()).update(payload).digest('hex')
  return `${payload}.${signature}`
}

export function isValidAdminSession(token: string | undefined): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false

  const [expiresAtRaw, nonce, signature] = parts
  const expiresAt = Number(expiresAtRaw)
  if (!Number.isSafeInteger(expiresAt) || expiresAt <= Math.floor(Date.now() / 1000)) return false
  if (!/^[a-f0-9]{64}$/.test(nonce) || !/^[a-f0-9]{64}$/.test(signature)) return false

  const payload = `${expiresAt}.${nonce}`
  const expected = createHmac('sha256', getSecret()).update(payload).digest('hex')
  return timingSafeEqual(Buffer.from(signature, 'utf8'), Buffer.from(expected, 'utf8'))
}
