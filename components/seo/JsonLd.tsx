import { type Post } from '~/sanity/schemas/post'
import { type Project } from '~/sanity/schemas/project'
import { url } from '~/lib'

interface FAQ {
  question: string
  answer: string
}

interface JsonLdProps {
  type: 'Article' | 'BreadcrumbList' | 'HowTo' | 'SoftwareApplication' | 'CollectionPage' | 'FAQPage'
  data: Post | Project | string[] | FAQ[] | { title: string; description: string; itemCount: number }
}

export function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = generateJsonLd(type, data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function generateJsonLd(type: string, data: any) {
  switch (type) {
    case 'Article':
      return generateArticleJsonLd(data as Post)
    case 'HowTo':
      return generateHowToJsonLd(data as Post)
    case 'SoftwareApplication':
      return generateSoftwareApplicationJsonLd(data as Project)
    case 'BreadcrumbList':
      return generateBreadcrumbJsonLd(data as string[])
    case 'CollectionPage':
      return generateCollectionPageJsonLd(data as { title: string; description: string; itemCount: number })
    case 'FAQPage':
      return generateFAQPageJsonLd(data as FAQ[])
    default:
      return {}
  }
}

function generateArticleJsonLd(post: Post) {
  const imageObject = post.mainImage?.asset ? {
    '@type': 'ImageObject',
    url: post.mainImage.asset.url,
    width: 1200,
    height: 630,
    caption: post.title,
    contentUrl: post.mainImage.asset.url,
    ...(post.mainImage.asset.lqip && { thumbnailUrl: post.mainImage.asset.lqip })
  } : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'inLanguage': 'en',
    headline: post.title,
    description: post.description,
    image: imageObject,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Rube Club',
      url: url('/about').href
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rube Club',
      logo: {
        '@type': 'ImageObject',
        url: url('/icon.png').href,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url(`/blog/${post.slug}`).href
    },
    keywords: post.categories?.join(','),
    articleSection: post.categories?.[0],
    wordCount: post.readingTime * 250 // Approximate words per minute
  }
}

function generateHowToJsonLd(post: Post) {
  if (!post.rubeMeta?.steps) return generateArticleJsonLd(post)

  const mainImageObject = post.mainImage?.asset ? {
    '@type': 'ImageObject',
    url: post.mainImage.asset.url,
    width: 1200,
    height: 630,
    caption: post.title
  } : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'inLanguage': 'en',
    name: post.title,
    description: post.description,
    image: mainImageObject,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Rube Club',
      url: url('/about').href
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rube Club',
      logo: {
        '@type': 'ImageObject',
        url: url('/icon.png').href,
        width: 512,
        height: 512
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url(`/blog/${post.slug}`).href
    },
    totalTime: post.rubeMeta.timeRequired,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0'
    },
    supply: post.rubeMeta.checklist?.map(item => ({
      '@type': 'HowToSupply',
      name: item
    })) || [],
    tool: post.rubeMeta.apps?.map(app => ({
      '@type': 'HowToTool',
      name: app
    })) || [],
    step: post.rubeMeta.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.details,
      ...(step.image?.asset?.url && {
        image: {
          '@type': 'ImageObject',
          url: step.image.asset.url,
          caption: step.title
        }
      })
    }))
  }
}

function generateSoftwareApplicationJsonLd(project: Project) {
  const appImageObject = (project.appMeta?.logo?.asset?.url || project.icon?.asset?.url) ? {
    '@type': 'ImageObject',
    url: project.appMeta?.logo?.asset?.url || project.icon?.asset?.url,
    width: 512,
    height: 512,
    caption: project.name
  } : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'inLanguage': 'en',
    name: project.name,
    description: project.description,
    applicationCategory: project.appMeta?.categories?.[0] || 'BusinessApplication',
    operatingSystem: 'Web',
    url: project.url,
    image: appImageObject,
    author: {
      '@type': 'Organization',
      name: 'Rube Club'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.5',
      ratingCount: '100'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    }
  }
}

function generateBreadcrumbJsonLd(items: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
      item: url(index === 0 ? '/' : `/${items.slice(0, index + 1).join('/')}`).href
    }))
  }
}

function generateCollectionPageJsonLd(data: { title: string; description: string; itemCount: number }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'inLanguage': 'en',
    'name': data.title,
    'description': data.description,
    'url': url('/blog').href,
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': data.itemCount,
      'itemListOrder': 'https://schema.org/ItemListOrderDescending'
    },
    'breadcrumb': {
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Rube Club',
          'item': url('/').href
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Workflows',
          'item': url('/blog').href
        }
      ]
    }
  }
}

function generateFAQPageJsonLd(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'inLanguage': 'en',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
} 