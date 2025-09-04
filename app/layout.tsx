import './globals.css'
import './clerk.css'
import './prism.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import { ThemeProvider } from '~/app/(main)/ThemeProvider'
import { url } from '~/lib'
import { zhCN } from '~/lib/clerkLocalizations'
import { sansFont, displayFont } from '~/lib/font'
import { seo } from '~/lib/seo'
import { CookieConsent } from '~/components/CookieConsent'

export const metadata: Metadata = {
  metadataBase: new URL('https://rube.club'),
  title: {
    default: 'Rube Club — Make AI actually get things done',
    template: '%s | Rube Club'
  },
  description:
    'Connect 600+ apps and trigger real actions with natural language. Explore the best Rube workflows and guides.',
  keywords: [
    'Rube', 'AI automation', 'workflow automation', 'app integration', 'natural language', 'Zapier alternative',
    'AI assistant', 'productivity tools', 'no-code automation'
  ],
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Rube Club',
    url: 'https://rube.club',
    locale: 'en_US',
    title: 'Rube Club — Make AI actually get things done',
    description:
      'Connect 600+ apps and trigger real actions with natural language. Explore the best Rube workflows and guides.',
    images: [{ url: '/og/cover.png', width: 1200, height: 630, alt: 'Rube Club' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rubeclub',
    creator: '@rubeclub',
    title: 'Rube Club — Make AI actually get things done',
    description:
      'Connect 600+ apps and trigger real actions with natural language. Explore the best Rube workflows and guides.',
    images: ['/og/cover.png']
  },
  alternates: { 
    canonical: 'https://rube.club',
    types: {
      'application/rss+xml': [{ url: 'rss', title: 'RSS Feed' }],
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000212' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={zhCN}>
      <html
        lang="en"
        className={`${sansFont.variable} ${displayFont.variable} m-0 h-full p-0 font-sans antialiased`}
        suppressHydrationWarning
      >
        <head>
          {/* Preload critical resources */}
          <link
            rel="preload"
            href="/icon.png"
            as="image"
            type="image/png"
          />
          <link
            rel="preload"
            href="/og/cover.png"
            as="image"
            type="image/png"
          />
          <link
            rel="dns-prefetch"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="dns-prefetch"
            href="https://fonts.gstatic.com"
          />
          <link
            rel="dns-prefetch"
            href="https://pagead2.googlesyndication.com"
          />
          
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2357915943973678"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "name": "Rube Club",
                  "url": "https://rube.club",
                  "logo": "https://rube.club/icon.png",
                  "description": "Connect 600+ apps and trigger real actions with natural language. Explore the best Rube workflows and guides.",
                  "foundingDate": "2024",
                  "slogan": "Make AI actually get things done",
                  "inLanguage": "en",
                  "sameAs": [
                    "https://twitter.com/rubeclub",
                    "https://github.com/Tony11081/rube",
                    "https://discord.gg/rubeclub"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "url": "https://rube.club/contact"
                  }
                },
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "inLanguage": "en",
                  "name": "Rube Club",
                  "alternateName": ["RubeApp", "Rube automation", "Rube workflows"],
                  "url": "https://rube.club",
                  "description": "Connect 600+ apps and trigger real actions with natural language. Explore the best Rube workflows and guides.",
                  "publisher": {
                    "@type": "Organization",
                    "name": "Rube Club"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://rube.club/blog?q={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ])
            }}
          />
        </head>
        <body className="flex h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
