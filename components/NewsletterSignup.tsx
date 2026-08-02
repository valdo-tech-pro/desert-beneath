'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    // TODO: Replace this with your actual newsletter provider endpoint 
    // (e.g., Mailchimp, ConvertKit, or Formspree: 'https://formspree.io/f/YOUR_ID')
    // Example: await fetch('YOUR_ENDPOINT', { method: 'POST', body: JSON.stringify({ email }) })
    
    // Simulating success for now
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1000)
  }

  return (
    <section className="bg-[#f0e6d8] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#2c241b] mb-3">Join the Inner Circle</h2>
        <p className="text-[#5c5046] mb-6 leading-relaxed">
          Get weekly cactus care tips, seasonal watering guides, and a free chapter of <em>The Desert Beneath</em> delivered to your inbox.
        </p>
        
        {status === 'success' ? (
          <div className="bg-[#2c5631] text-white p-4 rounded-md font-medium">
            🌵 {"You're"} subscribed! Check your inbox for your free chapter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] focus:border-transparent bg-white text-[#2c241b]"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#2c5631] hover:bg-[#1e3d22] text-white px-6 py-3 rounded-md font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        <p className="text-xs text-[#7a7068] mt-4">No spam. Unsubscribe at any time. We respect your inbox.</p>
      </div>
    </section>
  )
}