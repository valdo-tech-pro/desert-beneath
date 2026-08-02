
    import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import GoogleAnalytics from '@/app/GoogleAnalytics'
import { siteConfig } from '@/lib/site-config'
import NewsletterSignup from '@/components/NewsletterSignup'

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
      <body className="bg-[#fbf8f3] text-[#4a3622] min-h-screen flex flex-col font-sans">
        <GoogleAnalytics />
        
        {/* --- Navigation Header --- */}
        <header className="border-b border-[#e6dccf] bg-[#fbf8f3]/95 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-[#2c5631] hover:text-[#356a3b] transition-colors">
              🌵 {siteConfig.name}
            </Link>
            <nav className="flex gap-6 items-center text-sm font-medium">
              <Link href="/" className="hover:text-[#2c5631] transition-colors">Home</Link>
              <Link href="/book" className="hover:text-[#2c5631] transition-colors">The Book</Link>              <Link 
                href="/book" 
                className="bg-[#c85a3a] hover:bg-[#a8482c] text-white px-4 py-2 rounded-md transition-colors"
              >
                Get the Book
              </Link>
            </nav>
          </div>
        </header>

        {/* --- Main Content --- */}
        <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 py-8 w-full">
          {children}
        </main>

        {/* --- Newsletter Section --- */}
        <NewsletterSignup />

        {/* --- Footer --- */}
        <footer className="bg-[#2c241b] text-[#f0e6d8] py-12 mt-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">{siteConfig.name}</h3>
              <p className="text-[#a89f95] text-sm leading-relaxed max-w-xs">
                Cultivating resilience, one pot at a time. Expert guides for the modern cactus enthusiast.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Explore</h4>
              <ul className="space-y-2 text-sm text-[#a89f95]">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/book" className="hover:text-white transition-colors">The Book</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-[#a89f95]">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8 pt-8 border-t border-[#3d342b] text-center text-sm text-[#7a7068]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )}
           