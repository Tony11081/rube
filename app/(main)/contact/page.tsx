import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { type Metadata } from 'next'

import { Container } from '~/components/ui/Container'

export const metadata: Metadata = {
  title: 'Contact Us | Kkgool',
  description: 'Questions about sports gear or training? Need guidance on sizing or gear care? Get in touch with our team.',
  openGraph: {
    title: 'Contact Us | Kkgool',
    description: 'Questions about sports gear or training? Need guidance on sizing or gear care? Get in touch with our team.',
    type: 'website',
  },
}

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          📬 Contact Us
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>We'd love to hear from you.</Balancer>
        </p>
      </header>

      <div className="mt-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
        <p>
          Whether you have questions about gear authenticity, need sizing advice, or want to suggest a guide topic — our team is here to help.
        </p>
      </div>

      <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h2 className="flex items-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="mr-3">📨</span>
            General Inquiries
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Email: <a href="mailto:support@kkgool.cc" className="text-lime-600 hover:text-lime-800 dark:text-lime-400 dark:hover:text-lime-300">support@kkgool.cc</a>
          </p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            We usually reply within 24–48 hours on business days.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h2 className="flex items-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="mr-3">💬</span>
            WhatsApp Support
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            For quick gear advice or urgent questions:
          </p>
          <div className="mt-4">
            <a 
              href="https://wa.me/8613462248923" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-lime-500 text-white font-medium rounded-lg hover:bg-lime-600 transition"
            >
              <span>💬</span>
              <span>Chat with our Sports Expert</span>
            </a>
          </div>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            Available Monday-Friday, 9am-6pm (UTC)
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h2 className="flex items-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="mr-3">⚽</span>
            Gear Questions
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Need help with sizing, authenticity checks, or gear recommendations? We're here to help.
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-medium">
            Please include the following in your message:
          </p>
          <ul className="mt-2 list-disc pl-5 text-zinc-600 dark:text-zinc-400">
            <li className="mt-1">Sport and type of gear you're interested in</li>
            <li className="mt-1">Your measurements or current gear sizes</li>
            <li className="mt-1">Specific questions about fit, care, or authenticity</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
          <h2 className="flex items-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="mr-3">📢</span>
            Press & Partnerships
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            For brand partnerships, content collaboration, or media inquiries, reach us at:
          </p>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Business Contact: <a href="mailto:press@kkgool.cc" className="text-lime-600 hover:text-lime-800 dark:text-lime-400 dark:hover:text-lime-300">press@kkgool.cc</a>
          </p>
        </div>
      </div>

      <div className="mt-12 max-w-2xl rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
        <h2 className="flex items-center text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          <span className="mr-3">📍</span>
          About Us
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Kkgool<br />
          Online Sports Community<br />
          <span className="text-sm">(Digital-first company)</span>
        </p>
      </div>
    </Container>
  )
}