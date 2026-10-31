'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY, type ConsentPreferences } from '@/components/ConsentManager'

const MEASUREMENT_ID = 'G-PJ194BFFPV'
const DISABLE_FLAG = `ga-disable-${MEASUREMENT_ID}`

function hasAnalyticsConsent(): boolean {
  try {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!saved) return false
    return (JSON.parse(saved) as Partial<ConsentPreferences>).analytics === true
  } catch {
    return false
  }
}

export default function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const syncConsent = () => {
      const nextAllowed = hasAnalyticsConsent()
      ;(window as unknown as Record<string, unknown>)[DISABLE_FLAG] = !nextAllowed
      setAllowed(nextAllowed)
    }

    syncConsent()
    window.addEventListener(CONSENT_CHANGE_EVENT, syncConsent)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, syncConsent)
  }, [])

  if (!allowed) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${MEASUREMENT_ID}');
        `}
      </Script>
    </>
  )
}
