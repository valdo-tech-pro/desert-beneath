'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // Your actual Kit (ConvertKit) form URL
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
          'Accept': 'application/json',
        }
      })
      
      if (response.ok) {
        setStatus('success')
        setEmail('') // Clear the input
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="bg-[#f0e6d8] py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-[#2c241b] mb-3">Join the Inner Circle</h2>
        <p className="text-[#5c5046] mb-6 leading-relaxed">
          Get weekly cactus care tips, seasonal watering guides, and a free chapter of <em>The Desert Beneath</em> delivered to your inbox.
        </p>
        
        {status === 'success' ? (
          <div className="bg-[#2c5631] text-white p-4 rounded-md font-medium max-w-md mx-auto">
            You&apos;re subscribed! Check your inbox for your free chapter.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email_address"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] focus:border-transparent bg-white text-[#2c241b] disabled:opacity-70"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#2c5631] hover:bg-[#1e3d22] text-white px-6 py-3 rounded-md font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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
          <p className="text-red-600 text-sm mt-3">Oops! Something went wrong. Please try again.</p>
        )}
        
        <p className="text-xs text-[#7a7068] mt-4">No spam. Unsubscribe at any time. We respect your inbox.</p>
      </div>
    </section>
  )
}