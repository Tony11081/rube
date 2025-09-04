export async function GET() {
  const lastmod = new Date().toISOString()
  
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/projects', priority: '0.8', changefreq: 'weekly' },
    { path: '/about', priority: '0.7', changefreq: 'monthly' },
    { path: '/contact', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' }
  ]
  
  const urls = staticPages.map(page => `
  <url>
    <loc>https://rube.club${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')
  
  // Add high-value filter combinations
  const filterUrls = [
    { path: '/blog?app=gmail&level=basic', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog?app=slack&level=basic', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog?app=notion&level=basic', priority: '0.7', changefreq: 'weekly' },
    { path: '/blog?level=basic', priority: '0.6', changefreq: 'weekly' },
    { path: '/blog?level=intermediate', priority: '0.6', changefreq: 'weekly' },
    { path: '/blog?app=gmail', priority: '0.6', changefreq: 'weekly' },
    { path: '/blog?app=slack', priority: '0.6', changefreq: 'weekly' },
    { path: '/blog?app=notion', priority: '0.6', changefreq: 'weekly' }
  ].map(page => `
  <url>
    <loc>https://rube.club${page.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}${filterUrls}
</urlset>`
  
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    }
  })
}