import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { type Metadata } from 'next'

import { Container } from '~/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy | ShopChina',
  description: 'ShopChina privacy policy explaining how we collect, use, and protect your personal data.',
  openGraph: {
    title: 'Privacy Policy | ShopChina',
    description: 'ShopChina privacy policy explaining how we collect, use, and protect your personal data.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          🛡️ Privacy Policy
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Effective Date: May 9, 2025</Balancer>
        </p>
        <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Website: shopchina.net</Balancer>
        </p>
        <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Operator: ShopChina Team (Beijing, China)</Balancer>
        </p>
      </header>

      <div className="mt-16 sm:mt-20 prose prose-zinc dark:prose-invert max-w-none">
        <h2>1. Introduction</h2>
        <p>
          At ShopChina, your privacy matters. This policy explains how we collect, use, and protect your personal data when you visit our website, use our services, or interact with our tools (such as product link forwarding and order assistance).
        </p>
        <p>
          By using ShopChina.net, you agree to the practices described here.
        </p>

        <h2>2. Information We Collect</h2>
        <p>
          We collect limited personal data to provide and improve our services:
        </p>
        <ul>
          <li><strong>Basic Info:</strong> Name, email address, and country (if submitted)</li>
          <li><strong>Order Data:</strong> Links you paste for purchase assistance</li>
          <li><strong>Usage Data:</strong> Browser type, device, IP address, and page activity</li>
          <li><strong>Analytics:</strong> We use cookies and analytics tools (like Vercel Analytics and Google Analytics) to understand traffic and improve UX</li>
        </ul>
        <p>
          We do not store passwords or payment information on our servers. All payments are processed via trusted third-party services.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
          We use your data to:
        </p>
        <ul>
          <li>Help you place orders through Chinese platforms</li>
          <li>Deliver product recommendations and shopping guides</li>
          <li>Respond to customer inquiries</li>
          <li>Monitor and optimize website performance</li>
          <li>Prevent fraud and abuse</li>
        </ul>
        <p>
          We do not sell your data to third parties.
        </p>

        <h2>4. Data Sharing</h2>
        <p>
          We may share minimal data with:
        </p>
        <ul>
          <li>Order fulfillment partners (e.g. logistics agents, payment processors)</li>
          <li>Analytics services (in anonymized, aggregated format)</li>
          <li>Legal authorities if required by law</li>
        </ul>
        <p>
          All partners comply with applicable data protection laws.
        </p>

        <h2>5. Cookies</h2>
        <p>
          We use cookies to:
        </p>
        <ul>
          <li>Remember your preferences</li>
          <li>Track page visits (for analytics)</li>
          <li>Enable core site functionality</li>
        </ul>
        <p>
          You can opt out of cookies via your browser settings.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We apply reasonable technical and organizational measures to secure your information, including HTTPS encryption, access controls, and data minimization.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have the right to:
        </p>
        <ul>
          <li>Access, correct, or delete your personal data</li>
          <li>Opt out of non-essential cookies</li>
          <li>Request data portability</li>
          <li>File a complaint with a data protection authority</li>
        </ul>
        <p>
          To exercise these rights, email us at support@shopchina.net
        </p>

        <h2>8. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect personal data from minors.
        </p>

        <h2>9. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy occasionally. Changes will be posted here with a new effective date. Continued use of our website after changes means you accept the updated terms.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions or concerns, please reach out:
        </p>
        <ul>
          <li>📧 Email: support@shopchina.net</li>
          <li>🌐 Website: shopchina.net</li>
          <li>📍 Location: Beijing, China</li>
        </ul>
      </div>
    </Container>
  )
} 