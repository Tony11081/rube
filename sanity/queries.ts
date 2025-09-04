import { groq } from 'next-sanity'

import { getDate } from '~/lib/date'
import { client } from '~/sanity/lib/client'
import { type Post, type PostDetail } from '~/sanity/schemas/post'
import { type Project } from '~/sanity/schemas/project'

export const getAllLatestBlogPostSlugsQuery = () =>
  groq`
  *[_type == "post" && !(_id in path("drafts.**"))
  && publishedAt <="${getDate().toISOString()}"
  && defined(slug.current)] | order(publishedAt desc).slug.current
  `

export const getAllLatestBlogPostSlugs = () => {
  return client.fetch<string[]>(getAllLatestBlogPostSlugsQuery())
}

type GetBlogPostsOptions = {
  limit?: number
  offset?: number
  forDisplay?: boolean
}
export const getLatestBlogPostsQuery = ({
  limit = 5,
  offset = 0,
  forDisplay = true,
}: GetBlogPostsOptions) =>
  groq`
  *[_type == "post" && !(_id in path("drafts.**")) && publishedAt <= "${getDate().toISOString()}"
  && defined(slug.current)] | order(publishedAt desc)[${offset}...${
    offset + limit
  }] {
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->title,
    description,
    publishedAt,
    readingTime,
    mainImage {
      _ref,
      asset->{
        url,
        ${
          forDisplay
            ? '"lqip": metadata.lqip, "dominant": metadata.palette.dominant,'
            : ''
        }
      }
    }
  }`
export const getLatestBlogPosts = (options: GetBlogPostsOptions) =>
  client.fetch<Post[] | null>(getLatestBlogPostsQuery(options))

// 获取特定分类的文章查询
type GetPostsByCategoryOptions = {
  category: string
  limit?: number
  forDisplay?: boolean
}
export const getPostsByCategoryQuery = ({
  category,
  limit = 20,
  forDisplay = true,
}: GetPostsByCategoryOptions) =>
  groq`
  *[_type == "post" && !(_id in path("drafts.**")) 
  && publishedAt <= "${getDate().toISOString()}"
  && defined(slug.current)
  && count(categories[*[_type == "category" && title == $category]._id]) > 0
  ] | order(publishedAt desc)[0...${limit}] {
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->title,
    description,
    publishedAt,
    readingTime,
    mainImage {
      _ref,
      asset->{
        url,
        ${
          forDisplay
            ? '"lqip": metadata.lqip, "dominant": metadata.palette.dominant,'
            : ''
        }
      }
    }
  }`

export const getPostsByCategory = (options: GetPostsByCategoryOptions) =>
  client.fetch<Post[] | null>(getPostsByCategoryQuery(options), { 
    category: options.category 
  })

export const getBlogPostQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    "categories": categories[]->title,
    description,
    excerpt,
    keywords,
    publishedAt,
    readingTime,
    mood,
    contentType,
    markdown,
    body[] {
      ...,
      _type == "image" => {
        "url": asset->url,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions,
        ...
      }
    },
    "headings": select(
      contentType == "markdown" => [],
      body[length(style) == 2 && string::startsWith(style, "h")]
    ),
    mainImage {
      _ref,
      asset->{
        url,
        "lqip": metadata.lqip
      }
    },
    "related": *[_type == "post" && slug.current != $slug && !(_id in path("drafts.**"))] | order(publishedAt desc, _createdAt desc) [0..5] {
      _id,
      title,
      "slug": slug.current,
      "categories": categories[]->title,
      publishedAt,
      readingTime,
      mainImage {
        _ref,
        asset->{
          url,
          "lqip": metadata.lqip,
          "dominant": metadata.palette.dominant
        }
      },
    }
  }`
export const getBlogPost = (slug: string) =>
  client.fetch<PostDetail | undefined, { slug: string }>(getBlogPostQuery, {
    slug,
  })

export const getSettingsQuery = () =>
  groq`
  *[_type == "settings"][0] {
    "projects": projects[]->{
      _id,
      name,
      url,
      description,
      icon
    },
    "heroPhotos": heroPhotos[].asset->url,
    "resume": resume[]{
      company,
      title,
      start,
      end,
      "logo": logo.asset->url
    }
}`
export const getSettings = () =>
  client.fetch<{
    projects: Project[] | null
    heroPhotos?: string[] | null
    resume?:
      | {
          company: string
          title: string
          logo: string
          start: string
          end?: string
        }[]
      | null
  }>(getSettingsQuery())

export const getTotalBlogPostsQuery = () =>
  groq`count(*[_type == "post" && !(_id in path("drafts.**")) 
  && publishedAt <= "${getDate().toISOString()}"
  && defined(slug.current)])`

export const getTotalBlogPosts = () =>
  client.fetch<number>(getTotalBlogPostsQuery())
