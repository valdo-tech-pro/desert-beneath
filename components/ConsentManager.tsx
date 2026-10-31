'use client'

import { useEffect, useState } from 'react'

export type ConsentPreferences = {
  necessary: true
  analytics: boolean
  comments: boolean
  updatedAt: string
}

export const CONSENT_STORAGE_KEY = 'desert-beneath-consent-v1'
export const CONSENT_CHANGE_EVENT = 'desert-beneath-consent-change'
export const OPEN_CONSENT_EVENT = 'desert-beneath-open-consent'

function readConsent(): ConsentPreferences | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!value) return null
    const parsed = JSON.parse(value) as Partial<ConsentPreferences>
    if (typeof parsed.analytics !== 'boolean' || typeof parsed.comments !== 'boolean') return null
    return { necessary: true, analytics: parsed.analytics, comments: parsed.comments, updatedAt: parsed.updatedAt || '' }
  } catch {
    return null
  }
}

function saveConsent(analytics: boolean, comments: boolean) {
  const preferences: ConsentPreferences = {
    necessary: true,
    analytics,
    comments,
    updatedAt: new Date().toISOString(),
  }
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: preferences }))
  return preferences
}

export default function ConsentManager() {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(null)
  const [visible, setVisible] = useState(false)
  const [customizing, setCustomizing] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [comments, setComments] = useState(false)

  useEffect(() => {
    const saved = readConsent()
    setPreferences(saved)
    setVisible(!saved)
    if (saved) {
      setAnalytics(saved.analytics)
      setComments(saved.comments)
    }

    const openSettings = () => {
      const current = readConsent()
      setPreferences(current)
      setAnalytics(current?.analytics ?? false)
      setComments(current?.comments ?? false)
      setCustomizing(true)
      setVisible(true)
    }
    window.addEventListener(OPEN_CONSENT_EVENT, openSettings)
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, openSettings)
  }, [])

  function chooseAll() {
    const saved = saveConsent(true, true)
    setPreferences(saved)
    setVisible(false)
    setCustomizing(false)
  }

  function rejectOptional() {
    const saved = saveConsent(false, false)
    setPreferences(saved)
    setVisible(false)
    setCustomizing(false)
  }

  function saveChoices() {
    const saved = saveConsent(analytics, comments)
    setPreferences(saved)
    setVisible(false)
    setCustomizing(false)
  }

  return (
    <>
      {!visible && (
        <button
          type="button"
          onClick={() => {
            setAnalytics(preferences?.analytics ?? false)
            setComments(preferences?.comments ?? false)
            setCustomizing(true)
            setVisible(true)
          }}
          className="fixed bottom-3 left-3 z-[90] rounded-full border border-[#d8c9b8] bg-white px-3 py-2 text-xs font-semibold text-[#4a3622] shadow-lg hover:bg-[#f5eee5]"
          aria-label="Open cookie and privacy settings"
        >
          Cookie settings
        </button>
      )}

      {visible && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="consent-title"
          className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-[#d8c9b8] bg-white p-5 text-[#4a3622] shadow-2xl sm:inset-x-6 sm:bottom-6 sm:p-6"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <h2 id="consent-title" className="text-lg font-bold text-[#2c5631]">Your privacy choices</h2>
              <p className="mt-2 text-sm leading-6">
                Essential storage keeps the website working. With your permission, we also use Google Analytics
                to understand site usage and load Disqus so you can read and post comments. Optional services
                stay off until you choose to enable them. You can change your choices at any time.
              </p>
              <a href="/privacy" className="mt-2 inline-block text-sm font-semibold text-[#2c5631] underline">Read our Privacy Policy</a>
            </div>
          </div>

          {customizing && (
            <div className="mt-4 space-y-3 rounded-xl bg-[#f8f5ef] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">Essential storage</p>
                  <p className="text-xs leading-5 text-[#6b5a49]">Required for basic site operation and saving your privacy choices.</p>
                </div>
                <span className="shrink-0 text-xs font-bold text-[#2c5631]">Always active</span>
              </div>
              <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-[#e5dbce] pt-3">
                <span><span className="block text-sm font-semibold">Analytics</span><span className="block text-xs leading-5 text-[#6b5a49]">Allow Google Analytics to measure visits and site usage.</span></span>
                <input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} className="mt-1 h-4 w-4 accent-[#2c5631]" />
              </label>
              <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-[#e5dbce] pt-3">
                <span><span className="block text-sm font-semibold">Comments</span><span className="block text-xs leading-5 text-[#6b5a49]">Allow the third-party Disqus comments service to load on article pages.</span></span>
                <input type="checkbox" checked={comments} onChange={event => setComments(event.target.checked)} className="mt-1 h-4 w-4 accent-[#2c5631]" />
              </label>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={chooseAll} className="rounded-lg bg-[#2c5631] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#214326]">Accept all</button>
            <button type="button" onClick={rejectOptional} className="rounded-lg border border-[#cfc2b3] px-4 py-2.5 text-sm font-semibold hover:bg-[#f8f5ef]">Reject optional</button>
            {customizing ? (
              <button type="button" onClick={saveChoices} className="rounded-lg border border-[#cfc2b3] px-4 py-2.5 text-sm font-semibold hover:bg-[#f8f5ef]">Save choices</button>
            ) : (
              <button type="button" onClick={() => setCustomizing(true)} className="rounded-lg border border-[#cfc2b3] px-4 py-2.5 text-sm font-semibold hover:bg-[#f8f5ef]">Customize</button>
            )}
          </div>
        </section>
      )}
    </>
  )
}
