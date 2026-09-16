'use client'

import { useEffect } from 'react'
import { siteConfig } from '@/lib/site-config'

type DisqusPage = {
  url: string
  identifier: string
  title: string
}

type DisqusApi = {
  reset: (options: {
    reload: boolean
    config: (this: { page: DisqusPage }) => void
  }) => void
}

declare global {
  interface Window {
    DISQUS?: DisqusApi
    disqus_config?: (this: { page: DisqusPage }) => void
  }
}

const DISQUS_SHORTNAME = 'desert-beneath'
const DISQUS_SCRIPT_ID = 'disqus-embed-script'

export default function DisqusComments({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    const pageUrl = `${siteConfig.url}/post/${slug}`

    window.disqus_config = function () {
      this.page = {
        url: pageUrl,
        identifier: slug,
        title,
      }
    }

    // Disqus is a single-page widget. When Next.js changes articles without a
    // full page reload, reload the correct thread instead of adding another
    // embed script.
    if (window.DISQUS?.reset) {
      window.DISQUS.reset({
        reload: true,
        config: function (this: { page: DisqusPage }) {
          this.page.url = pageUrl
          this.page.identifier = slug
          this.page.title = title
        },
      })
      return
    }

    // Load the Disqus client only once. The current disqus_config is picked
    // up when the script initializes.
    if (document.getElementById(DISQUS_SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = DISQUS_SCRIPT_ID
    script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`
    script.setAttribute('data-timestamp', String(Date.now()))
    script.async = true
    document.head.appendChild(script)
  }, [slug, title])

  return (
    <div className="mt-12 pt-8 border-t border-sand-200">
      <h2 className="font-serif text-xl font-bold text-cactus-800 mb-6">Comments</h2>
      <div id="disqus_thread" />
    </div>
  )
}
