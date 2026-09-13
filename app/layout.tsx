import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import GoogleAnalytics from '@/app/GoogleAnalytics'
import { siteConfig } from '@/lib/site-config'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: `${siteConfig.name} | Cactus Care & Cultivation`, template: `%s | ${siteConfig.name}` },
  description: siteConfig.description,
  openGraph: { type: 'website', siteName: siteConfig.name, title: `${siteConfig.name} | Cactus Care & Cultivation`, description: siteConfig.description, url: siteConfig.url, images: [{ url: siteConfig.defaultOgImage }] },
  twitter: { card: 'summary_large_image', title: `${siteConfig.name} | Cactus Care & Cultivation`, description: siteConfig.description, images: [siteConfig.defaultOgImage] },
  verification: { google: 'nnZOnE-nRF5XZWdO793cucqroUHigjINOpqUMMuZdEg' },
  robots: { index: true, follow: true },
}

const navItems = [
  ['Cactus Care', '/#start-here', 'lg'],
  ['Species', '/species', 'lg'],
  ['Problems', '/problems', 'lg'],
  ['Soil', '/soil', 'xl'],
  ['Propagation', '/propagation', 'xl'],
  ['About', '/about', 'xl'],
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#fbf8f3] text-[#4a3622] min-h-screen flex flex-col font-sans">
        <GoogleAnalytics />
        <header className="sticky top-0 z-50 border-b border-[#e6dccf] bg-[#fbf8f3]/95 shadow-sm backdrop-blur-md">
          <div className="mx-auto flex min-h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link href="/" className="group flex min-w-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#2c5631] text-lg shadow-sm transition-transform group-hover:-rotate-6">🌵</span>
              <span className="truncate text-base font-extrabold tracking-tight text-[#2c5631] sm:text-lg">{siteConfig.name}</span>
            </Link>
            <nav aria-label="Main navigation" className="flex items-center gap-1 sm:gap-1.5">
              {navItems.map(([label, href, breakpoint]) => (
                <Link key={href} href={href} className={`hidden rounded-lg px-2.5 py-2 text-sm font-semibold text-[#5f4b38] transition-colors hover:bg-[#efe6da] hover:text-[#2c5631] ${breakpoint === 'lg' ? 'lg:block' : 'xl:block'}`}>
                  {label}
                </Link>
              ))}
              <Link href="/book" className="rounded-lg bg-[#c85a3a] px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#a8482c] hover:shadow-md sm:px-4">Book</Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
        <NewsletterSignup />

        <footer className="mt-12 bg-[#2c241b] text-[#f0e6d8]">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
              <div>
                <Link href="/" className="inline-flex items-center gap-2 text-lg font-extrabold text-white"><span>🌵</span><span>{siteConfig.name}</span></Link>
                <p className="mt-4 max-w-md text-sm leading-7 text-[#b8aea3]">Practical cactus care, soil science, propagation, and growing guidance — helping you understand what is happening beneath the surface.</p>
                <Link href="/book" className="mt-5 inline-flex items-center rounded-lg border border-[#6b5848] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-[#c85a3a] hover:bg-[#3a2f25]">Get the Book →</Link>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#d6c8b8]">Explore</h3>
                <ul className="mt-4 space-y-3 text-sm text-[#b8aea3]">
                  <li><Link href="/#start-here" className="hover:text-white">Cactus Care</Link></li>
                  <li><Link href="/species" className="hover:text-white">Species</Link></li>
                  <li><Link href="/problems" className="hover:text-white">Problems</Link></li>
                  <li><Link href="/soil" className="hover:text-white">Soil</Link></li>
                  <li><Link href="/propagation" className="hover:text-white">Propagation</Link></li>
                  <li><Link href="/about" className="hover:text-white">About</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-[#d6c8b8]">Stay Connected</h3>
                <p className="mt-4 text-sm leading-6 text-[#b8aea3]">Get practical cactus tips and new guides delivered to your inbox.</p>
                <Link href="/#newsletter" className="mt-4 inline-flex text-sm font-bold text-white underline decoration-[#c85a3a] decoration-2 underline-offset-4 hover:text-[#f3d5c8]">Join the newsletter</Link>
                <h3 className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#d6c8b8]">Legal</h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#b8aea3]">
                  <Link href="/contact" className="hover:text-white">Contact</Link>
                  <Link href="/privacy" className="hover:text-white">Privacy</Link>
                  <Link href="/terms" className="hover:text-white">Terms</Link>
                  <Link href="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-3 border-t border-[#463a30] pt-6 text-xs text-[#887d73] sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p><p>Grow from the roots up.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
