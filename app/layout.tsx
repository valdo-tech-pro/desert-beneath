import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Cactus Care & Cultivation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Cactus Care & Cultivation`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.defaultOgImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} | Cactus Care & Cultivation`,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage],
    ...(siteConfig.twitterHandle && { site: siteConfig.twitterHandle }),
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-sand-200 bg-sand-50 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌵</span>
              <span className="font-serif text-xl font-bold text-cactus-800">
                The Desert Beneath
              </span>
            </Link>
            <nav className="text-sm text-sand-700">
              <Link href="/" className="hover:text-cactus-700">
                Home
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">
          {children}
        </main>

        <footer className="border-t border-sand-200 bg-sand-50 mt-12">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-sand-600">
            <p>
              &copy; {new Date().getFullYear()} The Desert Beneath. Roots,
              soil, and everything in between.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
