'use client'

import { clsxm } from '@zolplay/utils'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  title: string
  description: string
  href: string
  category: string
}

interface SearchProps {
  className?: string
  placeholder?: string
}

export function Search({
  className,
  placeholder = "Search...",
}: SearchProps) {
  const [query, setQuery] = React.useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className={clsxm('relative', className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21L16.5 16.5M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={clsxm(
              'block w-full pl-10 pr-4 py-3 text-sm',
              'bg-white dark:bg-zinc-800',
              'border border-zinc-300 dark:border-zinc-600',
              'rounded-lg',
              'text-zinc-900 dark:text-zinc-100',
              'placeholder-zinc-500 dark:placeholder-zinc-400',
              'focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400',
              'focus:border-transparent',
              'transition-colors'
            )}
            placeholder={placeholder}
          />
        </div>
      </form>
    </div>
  )
}