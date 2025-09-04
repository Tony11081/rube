import RSS from 'rss'

import { seo } from '~/lib/seo'
import { getLatestBlogPosts } from '~/sanity/queries'
import { isSanityConfigComplete } from '~/sanity/env'

export const revalidate = 3600 // 1 hour

export async function GET() {
  const feed = new RSS({
    title: seo.title,
    description: seo.description,
    site_url: seo.url.href,
    feed_url: `${seo.url.href}feed.xml`,
    language: 'en-US',
    image_url: `${seo.url.href}opengraph-image.png`,
    generator: 'PHP 9.0',
  })

  try {
    // 检查Sanity配置是否完整
    if (!isSanityConfigComplete) {
      console.warn('Sanity配置不完整，返回空的RSS feed')
      return new Response(feed.xml(), {
        headers: {
          'content-type': 'application/xml',
        },
      })
    }

    const data = await getLatestBlogPosts({ limit: 999 })
    if (!data) {
      return new Response('Not found', { status: 404 })
    }

    data.forEach((post) => {
      feed.item({
        title: post.title,
        guid: post._id,
        url: `${seo.url.href}blog/${post.slug}`,
        description: post.description,
        date: new Date(post.publishedAt),
        enclosure: {
          url: post.mainImage.asset.url,
        },
      })
    })

    return new Response(feed.xml(), {
      headers: {
        'content-type': 'application/xml',
      },
    })
  } catch (error) {
    console.error('生成RSS feed时出错:', error)
    // 返回空的RSS feed而不是错误
    return new Response(feed.xml(), {
      headers: {
        'content-type': 'application/xml',
      },
    })
  }
}
