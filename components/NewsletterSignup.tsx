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
      const response = await fetch(KIT_FORM_URL, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
        },
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section id="newsletter" className="scroll-mt-24 bg-[#f0e6d8] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-3 text-2xl font-bold text-[#2c241b]">Join the Inner Circle</h2>
        <p className="mb-6 leading-relaxed text-[#5c5046]">
          Get weekly cactus care tips, seasonal watering guides, and a free chapter of <em>The Desert Beneath</em> delivered to your inbox.
        </p>

        {status === 'success' ? (
          <div className="mx-auto max-w-md rounded-md bg-[#2c5631] p-4 font-medium text-white">
            You&apos;re subscribed! Check your inbox for your free chapter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              name="email_address"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 rounded-md border border-[#d4c5b0] bg-white px-4 py-3 text-[#2c241b] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#2c5631] disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex min-w-[140px] items-center justify-center gap-2 rounded-md bg-[#2c5631] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#1e3d22] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-600">Oops! Something went wrong. Please try again.</p>
        )}

        <p className="mt-4 text-xs text-[#7a7068]">No spam. Unsubscribe at any time. We respect your inbox.</p>
      </div>
    </section>
  )
}
