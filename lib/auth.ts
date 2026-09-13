import { cookies } from 'next/headers'
import { isValidAdminSession } from '@/lib/auth-session'

export function isAdminAuthenticated(): boolean {
  const authCookie = cookies().get('admin_auth')
  return isValidAdminSession(authCookie?.value)
}
