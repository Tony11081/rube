import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { type Metadata } from 'next'

import { Container } from '~/components/ui/Container'

export const metadata: Metadata = {
  title: 'Terms of Service | ShopChina',
  description: 'Read our terms of service for using ShopChina website and services.',
  openGraph: {
    title: 'Terms of Service | ShopChina',
    description: 'Read our terms of service for using ShopChina website and services.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          📄 Terms of Service
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Effective Date: May 9, 2025</Balancer>
        </p>
        <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Website: shopchina.net</Balancer>
        </p>
      </header>

      <div className="mt-16 sm:mt-20 prose prose-zinc dark:prose-invert max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using ShopChina.net, you agree to be bound by these Terms of Service.
          If you do not agree with any part of these terms, please do not use our site or services.
        </p>

        <h2>2. About ShopChina</h2>
        <p>
          ShopChina is an informational and purchasing-assistance platform designed to help international users shop from Chinese online stores like Weidian, Taobao, DHGate, Kakobuy, and others.
        </p>
        <p>
          We do not operate as an official agent, manufacturer, or seller of the products listed.
        </p>

        <h2>3. User Responsibilities</h2>
        <p>
          When using our website, you agree to:
        </p>
        <ul>
          <li>Provide accurate, lawful, and non-fraudulent information</li>
          <li>Use product links and resources responsibly</li>
          <li>Not engage in abusive, spammy, or illegal behavior</li>
          <li>Respect third-party platform terms (Weidian, DHGate, etc.)</li>
        </ul>

        <h2>4. Content Disclaimer</h2>
        <p>
          We provide spreadsheets, links, guides, and recommendations for convenience. However:
        </p>
        <ul>
          <li>We do not guarantee the quality, accuracy, or availability of third-party products</li>
          <li>You are responsible for reviewing sellers, products, and making informed decisions</li>
          <li>ShopChina does not own or stock any of the items displayed</li>
          <li>We are not liable for losses resulting from purchases made via external links.</li>
        </ul>

        <h2>5. Payment & Fulfillment</h2>
        <p>
          All payments, order placement, and shipping are facilitated by partnered agents or platforms (when applicable).
          ShopChina does not directly charge for product purchases unless explicitly stated.
        </p>
        <p>
          We may offer services or referral tools and receive a small affiliate fee for some links — at no additional cost to you.
        </p>

        <h2>6. Account & Data Use</h2>
        <p>
          We may offer optional features like order tracking, saved lists, or account dashboards. If you create an account:
        </p>
        <ul>
          <li>You are responsible for your login credentials</li>
          <li>You may delete your account at any time</li>
          <li>We store minimal data, in accordance with our <Link href="/privacy" className="text-lime-600 hover:text-lime-800 dark:text-lime-400 dark:hover:text-lime-300">Privacy Policy</Link></li>
        </ul>

        <h2>7. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, ShopChina and its team shall not be liable for:
        </p>
        <ul>
          <li>Direct or indirect loss due to third-party store issues</li>
          <li>Delivery delays, customs problems, or payment disputes</li>
          <li>Any damages arising from using or relying on spreadsheet content</li>
        </ul>

        <h2>8. Changes to These Terms</h2>
        <p>
          We may update these Terms at any time. Changes will be reflected on this page with a new "Effective Date."
          By continuing to use the site after changes, you agree to the updated terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          If you have questions or concerns about these Terms:
        </p>
        <ul>
          <li>📧 Email: <a href="mailto:support@shopchina.net" className="text-lime-600 hover:text-lime-800 dark:text-lime-400 dark:hover:text-lime-300">support@shopchina.net</a></li>
          <li>🌐 Website: shopchina.net</li>
        </ul>
      </div>
    </Container>
  )
} 