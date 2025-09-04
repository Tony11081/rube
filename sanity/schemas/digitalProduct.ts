import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'digitalProduct',
  title: 'Digital Product',
  type: 'document',
  icon: () => '🛍️',
  fields: [
    defineField({
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short description shown in product cards',
      validation: Rule => Rule.max(200)
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Product Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ],
      description: 'Additional images for the product page'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      description: 'Detailed product description with rich content'
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of key product features'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'productCategory' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'prices',
      title: 'Pricing',
      type: 'object',
      fields: [
        {
          name: 'usd',
          title: 'USD Price',
          type: 'number',
          validation: Rule => Rule.required().min(0)
        },
        {
          name: 'eur',
          title: 'EUR Price',
          type: 'number',
          validation: Rule => Rule.min(0)
        },
        {
          name: 'cny',
          title: 'CNY Price',
          type: 'number',
          validation: Rule => Rule.min(0)
        },
        {
          name: 'originalPrice',
          title: 'Original Price (USD)',
          type: 'number',
          description: 'For showing discounts',
          validation: Rule => Rule.min(0)
        }
      ]
    }),
    defineField({
      name: 'fileInfo',
      title: 'File Information',
      type: 'object',
      fields: [
        {
          name: 'fileCount',
          title: 'Number of Files',
          type: 'number',
          validation: Rule => Rule.required().min(1)
        },
        {
          name: 'totalSize',
          title: 'Total Size',
          type: 'string',
          description: 'e.g., "15.2 MB", "2.5 GB"',
          validation: Rule => Rule.required()
        },
        {
          name: 'formats',
          title: 'File Formats',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'e.g., PDF, ZIP, PSD, AI'
        }
      ]
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'blockContent',
      description: 'System requirements or usage instructions'
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: Rule => Rule.required()
            },
            {
              name: 'answer',
              title: 'Answer',
              type: 'blockContent'
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      description: 'Show in featured products section',
      initialValue: false
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Product visibility on the store',
      initialValue: false
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'Order in product listings (lower numbers first)',
      initialValue: 0
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: Rule => Rule.max(60)
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          validation: Rule => Rule.max(160)
        },
        {
          name: 'keywords',
          title: 'Keywords',
          type: 'array',
          of: [{ type: 'string' }]
        }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'coverImage',
      published: 'published',
      featured: 'featured'
    },
    prepare(selection) {
      const { title, subtitle, media, published, featured } = selection
      const status = published ? '🟢' : '🔴'
      const featuredIcon = featured ? '⭐' : ''
      return {
        title: `${status} ${featuredIcon} ${title}`,
        subtitle,
        media
      }
    }
  },
  orderings: [
    {
      title: 'Sort Order',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }]
    },
    {
      title: 'Created (Newest First)',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }]
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ]
})