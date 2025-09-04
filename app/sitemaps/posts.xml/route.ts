import { getLatestBlogPosts } from '~/sanity/queries'

export async function GET() {
  try {
    const posts = await getLatestBlogPosts({ 
      limit: 1000, 
      offset: 0,
      forDisplay: true 
    }) || []
    
    const urls = posts.map(post => {
      const lastmod = new Date(post.publishedAt).toISOString()
      const imageXml = post.mainImage?.asset?.url ? `
    <image:image>
      <image:loc>${post.mainImage.asset.url}</image:loc>
      <image:caption>${post.title}</image:caption>
    </image:image>` : ''
      
      return `
  <url>
    <loc>https://rube.club/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageXml}
  </url>`
    }).join('')
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${urls}
</urlset>`
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating posts sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}