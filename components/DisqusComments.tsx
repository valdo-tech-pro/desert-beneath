'use client'

import { useEffect } from 'react'

export default function DisqusComments({ slug, title }: { slug: string; title: string }) {
  useEffect(() => {
    const d = window.document
    const s = d.createElement('script')
    s.src = 'https://the-desert-beneath.disqus.com/embed.js'
    s.setAttribute('data-timestamp', String(+new Date()))
    ;(d.head || d.body).appendChild(s)

    window.disqus_config = function () {
      this.page.url = `https://desert-beneath-zeta.vercel.app/post/${slug}`
      this.page.identifier = slug
      this.page.title = title
    }

    return () => {
      const disqusThread = d.getElementById('disqus_thread')
      if (disqusThread) disqusThread.innerHTML = ''
    }
  }, [slug, title])

  return (
    <div className="mt-12 pt-8 border-t border-sand-200">
      <h2 className="font-serif text-xl font-bold text-cactus-800 mb-6">Comments</h2>
      <div id="disqus_thread" />
    </div>
  )
}
