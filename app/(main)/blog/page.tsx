import Balancer from 'react-wrap-balancer'
import type { Metadata } from 'next'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'
import { Pagination } from '~/components/ui/Pagination'
import { BlogFilters } from '~/components/BlogFilters'

import { BlogPosts } from './BlogPosts'

const description =
  '🔄 Explore the best Rube workflow cases, from email automation to data sync, content generation to project management. 🚀 Detailed step guides and copy-ready prompt templates to get you started with AI automation.'

// Allowed filter combinations for canonical URLs
const ALLOWED_FILTER_COMBOS = new Set([
  'app=gmail&level=basic',
  'app=gmail&level=intermediate', 
  'app=slack&level=basic',
  'app=slack&level=intermediate',
  'app=notion&level=basic',
  'app=notion&level=intermediate',
  'app=youtube&level=basic',
  'app=gdrive&level=basic',
  'level=basic',
  'level=intermediate',
  'level=advanced',
  'app=gmail',
  'app=slack',
  'app=notion'
])

interface BlogPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function generateMetadata({ searchParams }: BlogPageProps): Metadata {
  // Get filter parameters
  const app = searchParams.app as string
  const level = searchParams.level as string
  const page = searchParams.page as string
  
  // Build query string for current params (excluding UTM)
  const filterParams = new URLSearchParams()
  if (app) filterParams.set('app', app)
  if (level) filterParams.set('level', level)
  if (page && page !== '1') filterParams.set('page', page)
  
  const queryString = filterParams.toString()
  const isAllowedCombo = !queryString || ALLOWED_FILTER_COMBOS.has(queryString.replace(/&?page=\d+/, '').replace(/^&/, ''))
  
  // Determine if this should be indexed
  const shouldIndex = isAllowedCombo && (!page || page === '1')
  
  // Build title and description based on filters
  let title = 'Rube Workflow Library - Automation Tutorials & Best Practices'
  let desc = description
  
  if (app || level) {
    const appName = app ? app.charAt(0).toUpperCase() + app.slice(1) : ''
    const levelName = level ? level.charAt(0).toUpperCase() + level.slice(1) : ''
    
    if (app && level) {
      title = `${appName} ${levelName} Workflows - Rube Automation Tutorials`
      desc = `Explore ${levelName.toLowerCase()} ${appName} automation workflows and tutorials. Step-by-step guides to automate your ${appName} tasks with Rube.`
    } else if (app) {
      title = `${appName} Automation Workflows - Rube Tutorials & Best Practices`
      desc = `Discover the best ${appName} automation workflows and tutorials. Learn how to automate ${appName} with detailed guides and ready-to-use templates.`
    } else if (level) {
      title = `${levelName} Rube Workflows - Automation Tutorials for ${levelName} Users`
      desc = `${levelName} automation workflows and tutorials. Perfect for ${levelName.toLowerCase()} users looking to automate their workflows with Rube.`
    }
  }
  
  return {
    title,
    description: desc,
    robots: shouldIndex ? {
      index: true,
      follow: true
    } : {
      index: false,
      follow: true
    },
    alternates: {
      canonical: shouldIndex ? undefined : 'https://rube.club/blog'
    },
    openGraph: {
      title,
      description: desc,
    },
    twitter: {
      title,
      description: desc,
      card: 'summary_large_image',
    },
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1
  const app = searchParams.app as string
  const level = searchParams.level as string
  const pageSize = 12
  
  const { posts, total } = await BlogPosts.getPostsWithPagination(page, pageSize, { app, level })
  const totalPages = Math.ceil(total / pageSize)
  
  // Get available filter options
  const availableApps = ['gmail', 'slack', 'notion', 'youtube', 'discord', 'telegram', 'gdrive', 'dropbox', 'trello', 'asana']
  const availableLevels = ['basic', 'intermediate', 'advanced']

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Workflow Library
        </h1>
        <h2 className="mt-2 text-lg font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
          Rube workflows, automation tutorials & best practices
        </h2>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
        <p className="flex items-center">
          <SocialLink href="/feed.xml" platform="rss" />
        </p>
      </header>
      
      <BlogFilters availableApps={availableApps} availableLevels={availableLevels} />
      
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
        <BlogPosts posts={posts} />
      </div>
      
      {posts.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-zinc-600 dark:text-zinc-400">
            No workflows found matching your filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
      
      <div className="mt-12 flex justify-center">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </Container>
  )
}

export const revalidate = 60
