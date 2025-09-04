'use client'

import Link from 'next/link'
import { Container } from '~/components/ui/Container'

export default function NotFoundPage() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-9xl font-bold text-zinc-800 dark:text-zinc-100">404</h1>
      <h2 className="mt-6 text-2xl font-medium text-zinc-600 dark:text-zinc-400">Page not found</h2>
      <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-700 dark:bg-lime-600 dark:hover:bg-lime-500 transition-colors"
      >
        Back to Home
      </Link>
    </Container>
  )
}
