'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'
import {
  CONSENT_CHANGE_EVENT,
  CONSENT_STORAGE_KEY,
  OPEN_CONSENT_EVENT,
  type ConsentPreferences,
} from '@/components/ConsentManager'

type DisqusPage = { url: string; identifier: string; title: string }
type DisqusResetConfig = { page: DisqusPage }
type DisqusApi = {
  reset: (options: { reload: boolean; config: (this: DisqusResetConfig) => void }) => void
}

declare global {
  interface Window {
    DISQUS?: DisqusApi
    disqus_config?: (this: DisqusResetConfig) => void
  }
}

const DISQUS_SHORTNAME = 'desert-beneath'
const DISQUS_SCRIPT_ID = 'disqus-embed-script'

function hasCommentsConsent(): boolean {
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!saved) return false
    return (JSON.parse(saved) as Partial<ConsentPreferences>).comments === true
  } catch {
    return false
  }
}

function clearDisqus() {
  document.getElementById(DISQUS_SCRIPT_ID)?.remove()
  const thread = document.getElementById('disqus_thread')
  if (thread) thread.replaceChildren()
  delete window.DISQUS
  delete window.disqus_config
}

export default function DisqusComments({ slug, title }: { slug: string; title: string }) {
  const [enabled, setEnabled] = useState(false)
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    const syncConsent = () => setEnabled(hasCommentsConsent())
    syncConsent()
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent)
  }, [])

  useEffect(() => {
    if (!enabled) {
      clearDisqus()
      setLoadError(false)
      return
    }

    let cancelled = false
    setLoadError(false)

    const pageUrl = `${siteConfig.url}/post/${encodeURIComponent(slug)}`
    const configurePage = function (this: DisqusResetConfig) {
      this.page = { url: pageUrl, identifier: slug, title }
    }

    window.disqus_config = configurePage

    if (window.DISQUS?.reset) {
      window.DISQUS.reset({ reload: true, config: configurePage })
      return () => { cancelled = true }
    }

    let script = document.getElementById(DISQUS_SCRIPT_ID) as HTMLScriptElement | null
    const onLoad = () => {
      if (cancelled) return
      if (!window.DISQUS) setLoadError(true)
    }
    const onError = () => {
      if (!cancelled) setLoadError(true)
    }

    if (!script) {
      script = document.createElement('script')
      script.id = DISQUS_SCRIPT_ID
      script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`
      script.async = true
      script.setAttribute('data-timestamp', String(Date.now()))
      script.addEventListener('load', onLoad)
      script.addEventListener('error', onError)
      document.head.appendChild(script)
    } else {
      script.addEventListener('load', onLoad)
      script.addEventListener('error', onError)
      if (window.DISQUS) onLoad()
    }

    return () => {
      cancelled = true
      script?.removeEventListener('load', onLoad)
      script?.removeEventListener('error', onError)
    }
  }, [enabled, slug, title])

  return (
    <section aria-labelledby="comments-heading" className="mt-14 border-t border-sand-200 pt-10">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-cactus-700">Join the discussion</p>
        <h2 id="comments-heading" className="mt-2 font-serif text-2xl font-bold text-cactus-900 sm:text-3xl">
          Comments
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-sand-600">
          Share your experience, ask a question, or add something useful to the conversation.
        </p>
      </div>

      {enabled ? (
        <div className="min-h-24 rounded-2xl border border-sand-200 bg-white p-3 shadow-sm sm:p-5">
          {loadError && (
            <div role="status" className="rounded-lg bg-sand-50 p-4 text-sm leading-6 text-sand-700">
              The comment service could not be loaded. Please check your connection or try again later.
              <button
                type="button"
                onClick={() => {
                  clearDisqus()
                  setLoadError(false)
                  setEnabled(false)
                  window.setTimeout(() => setEnabled(hasCommentsConsent()), 0)
                }}
                className="ml-2 font-semibold text-cactus-700 underline underline-offset-2"
              >
                Try again
              </button>
            </div>
          )}
          <div id="disqus_thread" />
        </div>
      ) : (
        <div className="rounded-2xl border border-sand-200 bg-white p-5 shadow-sm sm:p-6">
          <p className="text-sm leading-6 text-sand-700">
            Comments are hosted by Disqus, a third-party service. Enable the optional Comments setting to load the discussion and participate.
          </p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
            className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-cactus-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cactus-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cactus-700"
          >
            Enable comments in privacy settings
          </button>
        </div>
      )}
    </section>
  )
}
