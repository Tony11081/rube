import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kkgool.cc'
  
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/blog/',
        '/guides/',
        '/gear/',
        '/buying/',
        '/training/',
        '/tactics/',
        '/travel/',
        '/about/',
        '/contact/',
        '/guestbook/'
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/studio/',
        '/_next/',
        '/cdn-cgi/',
        '/blocked/',
        '/confirm/',
        '/newsletters/'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}