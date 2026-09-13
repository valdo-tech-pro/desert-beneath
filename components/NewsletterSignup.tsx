'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const KIT_FORM_URL = 'https://app.kit.com/forms/9755772/subscriptions'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.currentTarget)
    try {
      const response = await fetch(KIT_FORM_URL, { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
      if (response.ok) { setStatus('success'); setEmail('') } else setStatus('error')
    } catch { setStatus('error') }
  }

  return (
    <section id="newsletter" className="scroll-mt-24 bg-[#f0e6d8] px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c5631]">Free cactus guide</p>
        <h2 className="mt-2 text-3xl font-serif font-bold text-[#2c241b]">7 Cactus Mistakes That Kill Plants</h2>
        <p className="mt-3 mb-6 leading-relaxed text-[#5c5046]">Join the newsletter and get practical cactus-care lessons, seasonal tips, and the free guide delivered to your inbox.</p>
        {status === 'success' ? (
          <div className="mx-auto max-w-md rounded-xl bg-[#2c5631] p-4 font-medium text-white">You&apos;re subscribed! Check your inbox for your guide.</div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input type="email" name="email_address" required placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} disabled={status === 'loading'} className="flex-1 rounded-xl border border-[#d4c5b0] bg-white px-4 py-3 text-[#2c241b] focus:outline-none focus:ring-2 focus:ring-[#2c5631] disabled:opacity-70" />
            <button type="submit" disabled={status === 'loading'} className="flex min-w-[150px] items-center justify-center rounded-xl bg-[#2c5631] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1e3d22] disabled:cursor-not-allowed disabled:opacity-70">{status === 'loading' ? 'Joining...' : 'Get the Free Guide'}</button>
          </form>
        )}
        {status === 'error' && <p className="mt-3 text-sm text-red-600">Oops! Something went wrong. Please try again.</p>}
        <p className="mt-4 text-xs text-[#7a7068]">No spam. Unsubscribe at any time. We respect your inbox.</p>
      </div>
    </section>
  )
}
