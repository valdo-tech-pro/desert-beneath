import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'Learn how affiliate links may support The Desert Beneath and how they affect the recommendations published on the website.',
  alternates: { canonical: '/affiliate-disclosure' },
  openGraph: {
    title: 'Affiliate Disclosure | The Desert Beneath',
    description: 'How affiliate links work on The Desert Beneath.',
    url: '/affiliate-disclosure',
    type: 'website',
  },
}

const sectionClass = 'mt-8'
const headingClass = 'text-xl font-bold text-[#2c241b] mb-3'
const paragraphClass = 'mb-4 leading-7'

export default function AffiliateDisclosurePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c5631]">The Desert Beneath</p>
      <h1 className="mt-3 mb-4 text-3xl font-bold text-[#2c241b] sm:text-4xl">Affiliate Disclosure</h1>
      <p className="mb-8 text-sm text-[#7a6b5d]"><strong>Last updated:</strong> October 31, 2026</p>

      <div className="text-[#5c5046]">
        <p className={paragraphClass}>
          The Desert Beneath may use affiliate links in some articles, guides, resource pages, or product recommendations. This page explains what those links mean and how they may support the website.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. What is an affiliate link?</h2>
          <p className={paragraphClass}>
            An affiliate link is a special link to a product, service, or retailer. If you click that link and make a qualifying purchase or complete another qualifying action, the website may receive a commission or referral payment from the company.
          </p>
          <p className={paragraphClass}>
            The commission, when applicable, does not add an extra charge to your purchase. The price you pay is determined by the retailer or service provider.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. How affiliate links are identified</h2>
          <p className={paragraphClass}>
            We aim to make affiliate relationships clear. Where a page contains affiliate links, we may include a disclosure near the relevant link or recommendation, as well as other notice where appropriate. If you are unsure whether a link is an affiliate link, you can contact us before using it.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Our recommendations</h2>
          <p className={paragraphClass}>
            The purpose of The Desert Beneath is to share practical information about cactus cultivation, including soil, watering, growing materials, tools, and related resources. Affiliate compensation does not guarantee that a product will be recommended, and we aim to base our discussion on relevance to the subject and usefulness to readers.
          </p>
          <p className={paragraphClass}>
            Plant-growing results vary with species, climate, growing conditions, and individual plants. A product mentioned on this website may not be suitable for every grower or situation. Check product details and make your own assessment before purchasing.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Third-party purchases</h2>
          <p className={paragraphClass}>
            When you follow a link to another company or retailer, you leave The Desert Beneath and interact with that provider. Product descriptions, prices, availability, checkout, delivery, returns, and customer support are controlled by the third party and may change. Review the provider&apos;s terms and privacy information before completing a transaction.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Questions</h2>
          <p className={paragraphClass}>
            If you have a question about an affiliate link or a recommendation on this website, please visit our <Link href="/contact" className="font-semibold text-[#2c5631] underline underline-offset-2">Contact page</Link> or email <a href="mailto:hello@desertbeneath.com" className="font-semibold text-[#2c5631] underline underline-offset-2">hello@desertbeneath.com</a>.
          </p>
        </section>

        <p className="mt-10 border-t border-[#e6dccf] pt-5 text-sm leading-6">
          For information about how this website handles visitor information, please read our <Link href="/privacy" className="font-semibold text-[#2c5631] underline underline-offset-2">Privacy Policy</Link>. You can also review our <Link href="/terms" className="font-semibold text-[#2c5631] underline underline-offset-2">Terms of Use</Link>.
        </p>
      </div>
    </article>
  )
}
