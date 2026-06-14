'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-12">
      <h1 className="font-serif text-2xl font-bold text-cactus-800 mb-6 text-center">
        Admin Login
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-sand-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cactus-400"
          required
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cactus-700 text-white rounded-md px-4 py-2 hover:bg-cactus-800 disabled:opacity-50"
        >
          {loading ? 'Checking...' : 'Log In'}
        </button>
      </form>
    </div>
  )
}
