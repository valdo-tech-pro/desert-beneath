import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Read the terms that apply when you access and use The Desert Beneath website and its cactus-care resources.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Use | The Desert Beneath',
    description: 'The terms that apply when you access and use The Desert Beneath website and its resources.',
    url: '/terms',
    type: 'website',
  },
}

const sectionClass = 'mt-8'
const headingClass = 'text-xl font-bold text-[#2c241b] mb-3'
const paragraphClass = 'mb-4 leading-7'

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c5631]">The Desert Beneath</p>
      <h1 className="mt-3 mb-4 text-3xl font-bold text-[#2c241b] sm:text-4xl">Terms of Use</h1>
      <p className="mb-8 text-sm text-[#7a6b5d]"><strong>Last updated:</strong> October 31, 2026</p>

      <div className="text-[#5c5046]">
        <p className={paragraphClass}>
          These Terms of Use apply to your access to and use of The Desert Beneath website, including its articles, guides, downloads, and other materials. By using this website, you agree to these terms. If you do not agree, please do not use the website.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. About this website</h2>
          <p className={paragraphClass}>
            The Desert Beneath publishes educational content about cactus cultivation, including soil, watering, light, propagation, species information, and plant troubleshooting. The content is provided for general information and learning.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Educational information, not a guarantee</h2>
          <p className={paragraphClass}>
            Plant responses vary with species, growing conditions, climate, materials, and individual plant health. Information on this website is not a guarantee that a particular growing method or result will work in every situation. You are responsible for evaluating advice in the context of your own plants and conditions.
          </p>
          <p className={paragraphClass}>
            We aim to keep our content useful and accurate, but we do not promise that every page will always be complete, current, or free from errors. We may correct, update, or remove content at any time.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Acceptable use</h2>
          <p className={paragraphClass}>You agree not to:</p>
          <ul className="mb-4 list-disc space-y-2 pl-6 leading-7">
            <li>Use the website in a way that violates applicable laws or infringes another person&apos;s rights.</li>
            <li>Attempt to interfere with the website, its hosting, security, or normal operation.</li>
            <li>Upload or transmit malicious code, spam, or content that is unlawful, abusive, or misleading.</li>
            <li>Misrepresent content from this website as your own or remove copyright and attribution notices.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Intellectual property and permitted sharing</h2>
          <p className={paragraphClass}>
            Unless otherwise stated, the original text, design, graphics, and other materials published on The Desert Beneath belong to The Desert Beneath or are used with permission. They are protected by applicable intellectual-property laws.
          </p>
          <p className={paragraphClass}>
            You may share links to our public pages and quote brief excerpts for commentary or reference, provided you give clear credit and link to the original page. You may not republish substantial portions, copy complete articles, sell our materials, or use our content in another publication without prior written permission.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Products, payments, and third-party services</h2>
          <p className={paragraphClass}>
            Some pages may describe or link to books, digital products, or other resources. Purchases may be processed by third-party platforms such as Selar or Amazon. Their checkout processes, payment terms, delivery arrangements, and refund policies apply to transactions made through those platforms. Please review the relevant provider&apos;s terms before purchasing.
          </p>
          <p className={paragraphClass}>
            We do not control third-party websites or services and are not responsible for their content, availability, policies, or practices. A link does not necessarily mean that we endorse every product or statement on the linked website.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Affiliate links and advertising</h2>
          <p className={paragraphClass}>
            Some pages may contain affiliate links or advertising. If you follow an affiliate link and make a qualifying purchase, we may earn a commission at no additional cost to you. Any material relationship will be disclosed where required. See our <Link href="/affiliate-disclosure" className="font-semibold text-[#2c5631] underline underline-offset-2">Affiliate Disclosure</Link> for more information.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Comments and visitor submissions</h2>
          <p className={paragraphClass}>
            If comments or other visitor-submission features are available, you are responsible for what you submit. Do not post unlawful, threatening, harassing, deceptive, or infringing material, or disclose another person&apos;s private information. We may moderate, remove, or restrict access to submissions that we consider inappropriate or that create risk for the website or its visitors.
          </p>
          <p className={paragraphClass}>
            Do not include confidential information in a public comment. Comments may be handled by a third-party service and may be subject to that provider&apos;s own terms and privacy policy.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Disclaimer and limitation of liability</h2>
          <p className={paragraphClass}>
            To the extent permitted by applicable law, this website and its content are provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of any kind, whether express or implied. We do not warrant uninterrupted access, error-free operation, or any particular outcome from using the information.
          </p>
          <p className={paragraphClass}>
            To the extent permitted by applicable law, The Desert Beneath will not be liable for indirect, incidental, special, consequential, or punitive loss arising from your use of, or inability to use, this website or its content. Nothing in these terms excludes liability that cannot lawfully be excluded or limited.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Privacy</h2>
          <p className={paragraphClass}>
            Your use of the website is also subject to our <Link href="/privacy" className="font-semibold text-[#2c5631] underline underline-offset-2">Privacy Policy</Link>, which explains how information may be collected and used.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Changes to these terms</h2>
          <p className={paragraphClass}>
            We may update these Terms of Use from time to time. The revised version will be posted on this page with an updated date. Your continued use of the website after changes are posted means you accept the revised terms, to the extent permitted by applicable law.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>11. Contact</h2>
          <p className={paragraphClass}>
            If you have a question about these terms, please use our <Link href="/contact" className="font-semibold text-[#2c5631] underline underline-offset-2">Contact page</Link> or email <a href="mailto:hello@desertbeneath.com" className="font-semibold text-[#2c5631] underline underline-offset-2">hello@desertbeneath.com</a>.
          </p>
        </section>

      </div>
    </article>
  )
}
