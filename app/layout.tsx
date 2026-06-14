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
  },
  verification: {
    google: "nnZOnE-nRF5XZWdO793cucqroUHigjINOpqUMMuZdEg",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="nnZOnE-nRF5XZWdO793cucqroUHigjINOpqUMMuZdEg" />
      </head>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-sand-200 bg-sand-50 sticky top-0 z-10">
          <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🌵</span>
              <span className="font-serif text-xl font-bold text-cactus-800">The Desert Beneath</span>
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link href="/" className="text-sand-700 hover:text-cactus-700">Home</Link>
              <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="bg-cactus-700 text-white px-3 py-1.5 rounded-md hover:bg-cactus-800 font-medium">📖 Get the Book</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-3xl mx-auto px-4 py-8 w-full">{children}</main>
        <div className="bg-cactus-800 text-white py-8 mt-12">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="text-lg font-serif font-bold mb-1">📗 The Desert Beneath — The Book</p>
            <p className="text-cactus-100 text-sm mb-4">A complete guide to soil composition for cactus cultivation. Everything you need to grow healthy cacti from the roots up.</p>
            <a href="https://selar.com/e829s1lr46" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-cactus-800 font-bold px-6 py-2 rounded-md hover:bg-sand-100">Get your copy →</a>
          </div>
        </div>
        <footer className="border-t border-sand-200 bg-sand-50">
          <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-sand-600">
            <p>&copy; {new Date().getFullYear()} The Desert Beneath. Roots, soil, and everything in between.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
