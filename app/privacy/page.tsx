import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn what information The Desert Beneath may collect, how it is used, and the services that help operate this website.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy | The Desert Beneath',
    description: 'How The Desert Beneath collects and uses information.',
    url: '/privacy',
    type: 'website',
  },
}

const sectionClass = 'mt-8'
const headingClass = 'text-xl font-bold text-[#2c241b] mb-3'
const paragraphClass = 'mb-4 leading-7'

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#2c5631]">The Desert Beneath</p>
      <h1 className="mt-3 mb-4 text-3xl font-bold text-[#2c241b] sm:text-4xl">Privacy Policy</h1>
      <p className="mb-8 text-sm text-[#7a6b5d]"><strong>Last updated:</strong> October 31, 2026</p>

      <div className="text-[#5c5046]">
        <p className={paragraphClass}>
          This policy explains how The Desert Beneath handles information when you visit this website, subscribe to our newsletter, leave a comment, or contact us. Some features are provided by third-party services, which may process information under their own privacy policies.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. Information we may collect</h2>
          <p className={paragraphClass}>
            The information collected depends on how you use the website. It may include:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 leading-7">
            <li><strong>Contact messages:</strong> your name, email address, and the message you submit through our contact form.</li>
            <li><strong>Newsletter subscriptions:</strong> your email address and subscription preferences when you sign up to receive our newsletter or free guide.</li>
            <li><strong>Comments:</strong> information you provide when posting a comment, together with information handled by the comment service, such as account details or technical identifiers.</li>
            <li><strong>Usage and device information:</strong> information such as pages viewed, approximate location derived from network information, browser and device details, referral source, and interactions with the website. Analytics and hosting providers may collect this information automatically.</li>
            <li><strong>Technical and security information:</strong> server or diagnostic logs that may record requests, timestamps, IP addresses, and error or security events.</li>
          </ul>
          <p className={paragraphClass}>
            Please do not send sensitive personal information through public comments or ordinary contact forms.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. How we use information</h2>
          <p className={paragraphClass}>Information may be used to:</p>
          <ul className="mb-4 list-disc space-y-2 pl-6 leading-7">
            <li>Respond to questions and messages.</li>
            <li>Send newsletters, requested resources, and website updates to people who subscribe.</li>
            <li>Publish and manage comments and reduce spam or abuse.</li>
            <li>Understand how visitors use the website and improve its content, navigation, and performance.</li>
            <li>Maintain website security, troubleshoot errors, and prevent misuse.</li>
            <li>Meet applicable legal obligations and protect the website and its visitors.</li>
          </ul>
          <p className={paragraphClass}>
            We do not use newsletter sign-up details for unrelated promotional email campaigns. You can unsubscribe from newsletter emails using the unsubscribe link included in them.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Services that help operate this website</h2>
          <p className={paragraphClass}>
            We use third-party providers to operate particular website features. Depending on the feature you use, information may be processed by:
          </p>
          <ul className="mb-4 list-disc space-y-3 pl-6 leading-7">
            <li><strong>Google Analytics:</strong> used to understand website traffic and visitor interactions. Google may use cookies or similar technologies and receive usage, device, and network-related information. Learn more in Google&apos;s <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="font-semibold text-[#2c5631] underline underline-offset-2">Privacy Policy</a>.</li>
            <li><strong>Disqus:</strong> used to provide comment functionality where comments are available. Information you submit in a comment may be displayed publicly. Disqus may also process account, usage, cookie, and technical information under its <a href="https://disqus.com/privacy-policy/" target="_blank" rel="noreferrer" className="font-semibold text-[#2c5631] underline underline-offset-2">Privacy Policy</a>.</li>
            <li><strong>Kit:</strong> used to manage newsletter subscriptions and send requested email content. Your email address and subscription information are sent to Kit. See <a href="https://kit.com/privacy" target="_blank" rel="noreferrer" className="font-semibold text-[#2c5631] underline underline-offset-2">Kit&apos;s Privacy Policy</a>.</li>
            <li><strong>Formspree:</strong> used to receive contact-form submissions. The name, email address, and message you submit are transmitted to Formspree for delivery to us. See <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer" className="font-semibold text-[#2c5631] underline underline-offset-2">Formspree&apos;s Privacy Policy</a>.</li>
            <li><strong>Vercel and infrastructure providers:</strong> used to host and deliver the website and support its operation. These providers may process technical request, diagnostic, and security information. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer" className="font-semibold text-[#2c5631] underline underline-offset-2">Vercel&apos;s Privacy Policy</a>.</li>
          </ul>
          <p className={paragraphClass}>
            These providers process information under their own terms and privacy practices. Their services may store or process information in countries other than the country where you live.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Cookies and similar technologies</h2>
          <p className={paragraphClass}>
            This website and the services embedded in it may use cookies, pixels, local storage, or similar technologies. These technologies can support site functionality, remember preferences, measure traffic, help protect services, or support third-party features such as analytics and comments.
          </p>
          <p className={paragraphClass}>
            The website provides a privacy-choice panel where you can accept all optional services, reject optional services, or customize your choices for Google Analytics and Disqus comments. These services are not loaded unless you enable the corresponding option. Essential storage is used to remember your choices and support basic site operation.
          </p>
          <p className={paragraphClass}>
            You can reopen the panel at any time using the “Cookie settings” control displayed on the website. Changing an option affects future loading of the relevant service. If a third-party service has already set cookies, you may also need to clear those cookies through your browser settings. Browser controls can be used to review, block, or delete cookies, although they may not control every form of third-party tracking.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. When information may be shared</h2>
          <p className={paragraphClass}>
            We do not sell your personal information. We may share information with the service providers described above when they need it to provide hosting, analytics, comments, newsletter, or contact-form services. Information may also be disclosed where required by law, to respond to valid legal requests, or to protect the rights, safety, and security of the website, its visitors, or others.
          </p>
          <p className={paragraphClass}>
            If you choose to follow a link to another website, that website will handle your information under its own policies. We do not control the privacy practices of external websites.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. How long information is kept</h2>
          <p className={paragraphClass}>
            We keep information for as long as reasonably necessary for the purpose for which it was collected, including responding to messages, maintaining newsletter subscriptions, managing comments, keeping appropriate records, and addressing security or legal matters. Retention periods for information held by third-party providers are also governed by their policies and settings.
          </p>
          <p className={paragraphClass}>
            You can unsubscribe from the newsletter at any time using the link in an email. You may also contact us to request action regarding information you have submitted directly to us, subject to applicable legal and operational requirements.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Your privacy choices and rights</h2>
          <p className={paragraphClass}>
            Depending on where you live, applicable privacy laws may give you rights to request access to, correction of, deletion of, or restriction of certain personal information, to object to particular processing, or to withdraw consent where processing is based on consent. You may also have the right to complain to a relevant data-protection authority.
          </p>
          <p className={paragraphClass}>
            You can change or withdraw your optional analytics and comments choices at any time through the “Cookie settings” control. To make another privacy request, contact us using the details below. We may need to verify your request before acting on it. Some information may need to be retained where the law permits or requires it.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Children&apos;s privacy</h2>
          <p className={paragraphClass}>
            This website is intended for a general audience and is not designed to knowingly collect personal information from children. If you believe a child has provided personal information through the website, please contact us so we can review the request.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Changes to this policy</h2>
          <p className={paragraphClass}>
            We may update this policy when our website, services, or information practices change. The revised policy will be posted on this page with a new update date. Please review it periodically.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Contact</h2>
          <p className={paragraphClass}>
            For questions or privacy requests, visit our <Link href="/contact" className="font-semibold text-[#2c5631] underline underline-offset-2">Contact page</Link> or email <a href="mailto:hello@desertbeneath.com" className="font-semibold text-[#2c5631] underline underline-offset-2">hello@desertbeneath.com</a>.
          </p>
        </section>

        <p className="mt-10 border-t border-[#e6dccf] pt-5 text-sm leading-6">
          You can also read our <Link href="/terms" className="font-semibold text-[#2c5631] underline underline-offset-2">Terms of Use</Link> and <Link href="/affiliate-disclosure" className="font-semibold text-[#2c5631] underline underline-offset-2">Affiliate Disclosure</Link>.
        </p>
      </div>
    </article>
  )
}
