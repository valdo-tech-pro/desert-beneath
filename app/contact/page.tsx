'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  // Your actual Formspree endpoint is already inserted here
  const FORMSPREE_URL = 'https://formspree.io/f/xkodlawg'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    
    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      
      if (response.ok) {
        setStatus('success')
        e.currentTarget.reset() // Clear the form
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <h1 className="text-3xl font-bold text-[#2c241b] mb-4">Get in Touch</h1>
      <p className="text-[#5c5046] mb-8">
        Have a question about cactus care, soil mixes, or the book? Fill out the form below, or email us directly at{' '}
        <a href="mailto:hello@desertbeneath.com" className="text-[#c85a3a] hover:underline font-medium">
          hello@desertbeneath.com
        </a>. 
        <span className="block mt-2 text-sm">We typically reply within 24–48 hours.</span>
      </p>
      
      <div className="bg-[#f0e6d8] p-8 rounded-xl border border-[#e6dccf]">
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌵</div>
            <h3 className="text-xl font-bold text-[#2c5631] mb-2">Message Sent!</h3>            <p className="text-[#5c5046]">Thank you for reaching out. We will get back to you shortly.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-6 text-[#c85a3a] hover:underline font-medium"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2c241b] mb-1">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                required 
                className="w-full px-4 py-3 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] bg-white text-[#2c241b]" 
                placeholder="Your name" 
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#2c241b] mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                name="_replyto"
                required 
                className="w-full px-4 py-3 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] bg-white text-[#2c241b]" 
                placeholder="your@email.com" 
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-[#2c241b] mb-1">Message</label>
              <textarea 
                id="message"
                name="message"
                rows={5} 
                required 
                className="w-full px-4 py-3 rounded-md border border-[#d4c5b0] focus:outline-none focus:ring-2 focus:ring-[#2c5631] bg-white text-[#2c241b]" 
                placeholder="How can we help you?"
              ></textarea>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm font-medium">Oops! Something went wrong. Please try again or email us directly.</p>
            )}
                        <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-[#2c5631] hover:bg-[#1e3d22] disabled:bg-[#1e3d22]/70 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {status === 'submitting' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}