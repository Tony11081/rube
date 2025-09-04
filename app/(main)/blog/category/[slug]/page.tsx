import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { redis } from '~/lib/redis'
import { getPostsByCategory } from '~/sanity/queries'

import { BlogPostCard } from '../../BlogPostCard'

export const generateMetadata = ({ params }: { params: { slug: string } }): Metadata => {
  const categoryName = decodeURIComponent(params.slug || '').trim()
  
  return {
    title: `${categoryName} Category - ShopChina Blog`,
    description: `Browse all ShopChina blog posts about ${categoryName}, get the latest shopping guides and tips.`,
    openGraph: {
      title: `${categoryName} Category - ShopChina Blog`,
      description: `Browse all ShopChina blog posts about ${categoryName}, get the latest shopping guides and tips.`,
    },
    twitter: {
      title: `${categoryName} Category - ShopChina Blog`,
      description: `Browse all ShopChina blog posts about ${categoryName}, get the latest shopping guides and tips.`,
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  try {
    const categoryName = decodeURIComponent(params.slug || '').trim()
    
    if (!categoryName) {
      return notFound()
    }
    
    const posts = await getPostsByCategory({ 
      category: categoryName,
      limit: 50, 
      forDisplay: true 
    })
    
    if (!posts || posts.length === 0) {
      return notFound()
    }

    const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id))

    let views: number[] = []
    if (env.VERCEL_ENV === 'development') {
      views = posts.map(() => Math.floor(Math.random() * 1000))
    } else {
      if (postIdKeys.length > 0) {
        views = await redis.mget<number[]>(...postIdKeys)
      }
    }

    return (
      <Container className="mt-16 sm:mt-24">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {categoryName}
          </h1>
          <h2 className="mt-2 text-lg font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
            Category
          </h2>
          <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
            <Balancer>Browse all ShopChina blog posts about {categoryName}, get the latest shopping guides and tips.</Balancer>
          </p>
          <p className="flex items-center">
            <SocialLink href="/feed.xml" platform="rss" />
          </p>
        </header>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
          {posts.map((post, idx) => (
            <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
          ))}
        </div>
      </Container>
    )
  } catch (error) {
    console.error('Error in category page:', error)
    return notFound()
  }
}

export const revalidate = 60 