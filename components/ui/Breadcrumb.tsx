'use client'

import { clsxm } from '@zolplay/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { HomeIcon } from '~/assets'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  className?: string
  items?: BreadcrumbItem[]
}

// Route-to-label mapping for automatic breadcrumb generation
const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/gear': 'Gear Guide',
  '/buying': 'Buying Guides', 
  '/training': 'Training & Health',
  '/tactics': 'Tactics Made Simple',
  '/travel': 'Fan Travel',
  '/guides': 'All Guides',
  '/about': 'About',
  '/contact': 'Contact',
  '/blog': 'Blog',
  '/guestbook': 'Guestbook',
  '/search': 'Search Results'
}

export function Breadcrumb({ className, items }: BreadcrumbProps) {
  const pathname = usePathname()

  // Generate breadcrumbs from current path if items not provided
  const breadcrumbItems = React.useMemo(() => {
    if (items) return items

    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always include home
    breadcrumbs.push({ label: 'Home', href: '/' })

    // Build breadcrumbs from path segments
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1)
      breadcrumbs.push({ label, href: currentPath })
    })

    return breadcrumbs
  }, [pathname, items])

  // Don't show breadcrumbs on home page or if only home breadcrumb
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null
  }

  return (
    <nav
      className={clsxm('flex items-center space-x-1 text-sm text-zinc-600 dark:text-zinc-400', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1
          const isHome = index === 0

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="w-4 h-4 mx-1 text-zinc-400 dark:text-zinc-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              
              {isLast ? (
                <span 
                  className="text-zinc-900 dark:text-zinc-100 font-medium"
                  aria-current="page"
                >
                  {isHome ? (
                    <HomeIcon className="w-4 h-4" />
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={clsxm(
                    'hover:text-lime-600 dark:hover:text-lime-400 transition-colors',
                    isHome && 'flex items-center'
                  )}
                >
                  {isHome ? (
                    <HomeIcon className="w-4 h-4" />
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}