import { cookies } from 'next/headers'
import { isValidAdminSession } from '@/lib/auth-session'

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('admin_auth')
  return isValidAdminSession(authCookie?.value)
}
