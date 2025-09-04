import { getAllProjects } from '~/sanity/queries'

export async function GET() {
  try {
    const projects = await getAllProjects({ forDisplay: true }) || []
    
    const urls = projects.map(project => {
      const lastmod = new Date().toISOString() // Projects don't have publishedAt, use current date
      const imageXml = (project.appMeta?.logo?.asset?.url || project.icon?.asset?.url) ? `
    <image:image>
      <image:loc>${project.appMeta?.logo?.asset?.url || project.icon?.asset?.url}</image:loc>
      <image:caption>${project.name}</image:caption>
    </image:image>` : ''
      
      return `
  <url>
    <loc>https://rube.club/projects/${project.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>${imageXml}
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
    console.error('Error generating apps sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}