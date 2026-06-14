import { isAdminAuthenticated } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminPage() {
  if (!isAdminAuthenticated()) {
    redirect('/admin/login')
  }

  return <AdminDashboard />
}
