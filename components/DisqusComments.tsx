'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY, OPEN_CONSENT_EVENT, type ConsentPreferences } from '@/components/ConsentManager'

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

export default function DisqusComments({ slug, title }: { slug: string; title: string }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const syncConsent = () => setEnabled(hasCommentsConsent())
    syncConsent()
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent)
  }, [])

  useEffect(() => {
    if (!enabled) {
      document.getElementById(DISQUS_SCRIPT_ID)?.remove()
      const thread = document.getElementById('disqus_thread')
      thread?.querySelectorAll('iframe').forEach(frame => frame.remove())
      if (thread) thread.innerHTML = ''
      return
    }

    const pageUrl = `${siteConfig.url}/post/${slug}`
    window.disqus_config = function () {
      this.page = { url: pageUrl, identifier: slug, title }
    }

    if (window.DISQUS?.reset) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: DisqusResetConfig) {
          this.page = { url: pageUrl, identifier: slug, title }
        },
      })
      return
    }

    if (document.getElementById(DISQUS_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = DISQUS_SCRIPT_ID
    script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`
    script.setAttribute('data-timestamp', String(Date.now()))
    script.async = true
    document.head.appendChild(script)
  }, [enabled, slug, title])

  return (
    <div className="mt-12 pt-8 border-t border-sand-200">
      <h2 className="font-serif text-xl font-bold text-cactus-800 mb-6">Comments</h2>
      {enabled ? (
        <div id="disqus_thread" />
      ) : (
        <div className="rounded-xl border border-sand-200 bg-white p-5">
          <p className="text-sm leading-6 text-sand-700">Comments are provided by Disqus, a third-party service. Enable the optional Comments setting if you want to load the discussion here.</p>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
            className="mt-3 rounded-lg bg-cactus-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cactus-800"
          >
            Review privacy settings
          </button>
        </div>
      )}
    </div>
  )
}
