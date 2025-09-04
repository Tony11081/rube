export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Block parameter-heavy URLs
Disallow: /*?q=*
Disallow: /*?utm_*
Disallow: /*?search=*
Disallow: /*&utm_*
Disallow: /*?*&utm_*

# Block admin and development paths
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /studio/

# Block duplicate content
Disallow: /*?page=1
Disallow: /*&page=1

# Allow important filtered pages
Allow: /blog?app=*
Allow: /blog?level=*
Allow: /blog?app=*&level=*

# Sitemaps
Sitemap: https://rube.club/sitemap.xml

# Crawl delay for politeness
Crawl-delay: 1`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
}