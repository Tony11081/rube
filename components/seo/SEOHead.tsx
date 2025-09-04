import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const defaultSEO = {
  title: 'Kkgool - Expert Sports Gear Reviews & Guides',
  description: 'Honest reviews and practical guides for sports equipment, training gear, and fan essentials. Find the best gear for your sport with expert insights.',
  keywords: ['sports gear', 'equipment reviews', 'sports guides', 'athletic gear', 'training equipment'],
  image: '/og_zh.png',
  type: 'website' as const,
  author: 'Kkgool Team'
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOProps = {}): Metadata {
  const seoTitle = title 
    ? `${title} | ${defaultSEO.title.split(' - ')[0]}`
    : defaultSEO.title

  const seoDescription = description || defaultSEO.description
  const seoImage = image || defaultSEO.image
  const seoKeywords = [...defaultSEO.keywords, ...keywords, ...tags].join(', ')
  const seoAuthor = author || defaultSEO.author

  // Construct full URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kkgool.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = seoImage.startsWith('http') ? seoImage : `${baseUrl}${seoImage}`

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: seoAuthor }],
    creator: seoAuthor,
    publisher: defaultSEO.title.split(' - ')[0],
    
    // Open Graph
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: fullUrl,
      siteName: defaultSEO.title.split(' - ')[0],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
      locale: 'en_US',
      type: type === 'product' ? 'website' : type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [fullImageUrl],
      creator: '@kkgool',
      site: '@kkgool',
    },

    // Additional metadata
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

    // Icons
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/android-chrome-192x192.png',
    },

    // Manifest
    manifest: '/site.webmanifest',

    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },

    // Alternate languages
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
        'x-default': fullUrl,
      },
    },

    // Category for articles
    ...(type === 'article' && section && { category: section }),
  }

  return metadata
}

// Pre-defined metadata for common pages
export const seoPresets = {
  home: (): Metadata => generateSEOMetadata({
    title: 'Expert Sports Gear Reviews & Guides',
    description: 'Find the best sports equipment with our honest reviews and practical guides. From soccer cleats to training gear, we help athletes make informed decisions.',
    keywords: ['sports equipment', 'gear reviews', 'athletic gear', 'sports guides'],
    url: '/',
  }),

  gear: (): Metadata => generateSEOMetadata({
    title: 'Sports Gear Reviews & Recommendations',
    description: 'In-depth reviews of sports equipment and gear. Find the best products for your sport with expert testing and honest opinions.',
    keywords: ['gear reviews', 'sports equipment', 'product reviews', 'sports gear'],
    url: '/gear',
    section: 'Gear',
  }),

  guides: (): Metadata => generateSEOMetadata({
    title: 'Sports & Training Guides',
    description: 'Comprehensive guides covering everything from equipment buying to training techniques and injury prevention.',
    keywords: ['sports guides', 'training guides', 'how-to guides', 'sports tips'],
    url: '/guides',
    section: 'Guides',
  }),

  training: (): Metadata => generateSEOMetadata({
    title: 'Training & Health Guides',
    description: 'Expert advice on training routines, injury prevention, and maintaining peak athletic performance.',
    keywords: ['training guides', 'fitness', 'injury prevention', 'athletic performance'],
    url: '/training',
    section: 'Training',
  }),

  tactics: (): Metadata => generateSEOMetadata({
    title: 'Sports Tactics & Strategy',
    description: 'Learn game tactics and strategies explained in simple terms. Perfect for players and fans wanting to understand the game better.',
    keywords: ['sports tactics', 'game strategy', 'sports analysis', 'tactical guides'],
    url: '/tactics',
    section: 'Tactics',
  }),

  travel: (): Metadata => generateSEOMetadata({
    title: 'Fan Travel Guides',
    description: 'Travel guides and tips for sports fans attending games, tournaments, and sporting events around the world.',
    keywords: ['sports travel', 'fan travel', 'game attendance', 'sports tourism'],
    url: '/travel',
    section: 'Travel',
  }),
}