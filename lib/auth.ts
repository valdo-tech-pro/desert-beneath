import { cookies } from 'next/headers'

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies()
  const authCookie = cookieStore.get('admin_auth')
  return authCookie?.value === process.env.ADMIN_PASSWORD
}
