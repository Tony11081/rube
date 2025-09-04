import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { PencilSwooshIcon } from '~/assets'
import { readingTimeType } from '~/sanity/schemas/types/readingTime'

export const Post = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.string(),
  mainImage: z.object({
    _ref: z.string(),
    asset: z.object({
      url: z.string(),
      lqip: z.string().optional(),
      dominant: z
        .object({
          background: z.string(),
          foreground: z.string(),
        })
        .optional(),
    }),
  }),
  publishedAt: z.string(),
  description: z.string(),
  excerpt: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  body: z.any(),
  contentType: z.enum(['richText', 'markdown']).optional(),
  markdown: z.string().optional(),
  readingTime: z.number(),
  mood: z.enum(['happy', 'sad', 'neutral']),
  rubeMeta: z.object({
    apps: z.array(z.string()).optional(),
    level: z.enum(['basic', 'intermediate', 'advanced']).optional(),
    timeRequired: z.string().optional(),
    steps: z.array(z.object({
      title: z.string(),
      details: z.string(),
      image: z.any().optional(),
    })).optional(),
    prompts: z.array(z.object({
      label: z.string(),
      content: z.string(),
    })).optional(),
    checklist: z.array(z.string()).optional(),
    warnings: z.array(z.string()).optional(),
    outcomes: z.array(z.string()).optional(),
  }).optional(),
})
export type Post = z.infer<typeof Post>
export type PostDetail = Post & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headings: any[]
  related?: Post[]
}

export default defineType({
  name: 'post',
  title: 'Workflow',
  type: 'document',
  icon: PencilSwooshIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      description: 'This image will be used for the preview (1200 x 675px)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Meta Description',
      type: 'text',
      description: 'Used for SEO and social media sharing (recommended 150-160 characters)',
      rows: 2,
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      description: 'Keywords list for SEO',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rich Text Editor', value: 'richText' },
          { title: 'Markdown', value: 'markdown' },
        ],
        layout: 'radio',
      },
      initialValue: 'richText',
    }),
    defineField({
      name: 'body',
      title: 'Content (Rich Text)',
      type: 'blockContent',
      hidden: ({ document }) => document?.contentType === 'markdown',
    }),
    defineField({
      name: 'markdown',
      title: 'Content (Markdown)',
      description: 'Paste Markdown content directly, supports links, bold, images, etc.',
      type: 'text',
      rows: 20,
      hidden: ({ document }) => document?.contentType === 'richText',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: readingTimeType.name,
      validation: (Rule) => Rule.required(),
      options: {
        source: 'body',
      },
    }),
    defineField({
      name: 'mood',
      title: 'Article Mood',
      type: 'string',
      options: {
        list: [
          { title: 'Neutral', value: 'neutral' },
          { title: 'Happy', value: 'happy' },
          { title: 'Sad', value: 'sad' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'rubeMeta',
      title: 'Rube Metadata',
      type: 'object',
      description: 'Rube workflow-related metadata',
      fields: [
        {
          name: 'apps',
          title: 'Apps Involved',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Apps involved in this workflow, e.g. gmail, slack, notion',
          options: {
            list: [
              { title: 'Gmail', value: 'gmail' },
              { title: 'Slack', value: 'slack' },
              { title: 'Notion', value: 'notion' },
              { title: 'YouTube', value: 'youtube' },
              { title: 'Discord', value: 'discord' },
              { title: 'Telegram', value: 'telegram' },
              { title: 'Google Drive', value: 'gdrive' },
              { title: 'Dropbox', value: 'dropbox' },
              { title: 'Trello', value: 'trello' },
              { title: 'Asana', value: 'asana' },
            ],
          },
        },
        {
          name: 'level',
          title: 'Difficulty Level',
          type: 'string',
          options: {
            list: [
              { title: 'Basic', value: 'basic' },
              { title: 'Intermediate', value: 'intermediate' },
              { title: 'Advanced', value: 'advanced' },
            ],
            layout: 'radio',
          },
        },
        {
          name: 'timeRequired',
          title: 'Estimated Setup Time',
          type: 'string',
          description: 'e.g.: 10 min, 30 min, 1 hour',
        },
        {
          name: 'steps',
          title: 'Configuration Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { 
                  name: 'title', 
                  title: 'Step Title', 
                  type: 'string',
                  validation: (Rule) => Rule.required().max(100)
                },
                { 
                  name: 'details', 
                  title: 'Step Details', 
                  type: 'text',
                  validation: (Rule) => Rule.required().min(10).max(500)
                },
                {
                  name: 'image',
                  title: 'Step Image',
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
              preview: {
                select: {
                  title: 'title',
                  details: 'details',
                  media: 'image'
                },
                prepare({ title, details }) {
                  return {
                    title,
                    subtitle: details?.slice(0, 50) + (details?.length > 50 ? '...' : '')
                  }
                }
              }
            },
          ],
          validation: (Rule) => Rule.min(1).max(10)
        },
        {
          name: 'prompts',
          title: 'Prompts/Commands',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Name', type: 'string' },
                { name: 'content', title: 'Content', type: 'text', rows: 4 },
              ],
            },
          ],
        },
        {
          name: 'checklist',
          title: 'Prerequisites',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Items to prepare before starting',
        },
        {
          name: 'warnings',
          title: 'Important Notes',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Important notes during configuration',
        },
        {
          name: 'outcomes',
          title: 'Expected Results',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Benefits and results after configuration',
        },
      ],
    }),
  ],

  initialValue: () => ({
    publishedAt: new Date().toISOString(),
    mood: 'neutral',
    readingTime: 0,
    contentType: 'richText',
    rubeMeta: {
      level: 'basic',
      timeRequired: '10 minutes',
      steps: [
        {
          title: 'Preparation',
          details: 'Ensure you have installed and logged into the relevant app accounts'
        },
        {
          title: 'Configure Connection',
          details: 'Follow the guide to connect your apps to Rube'
        },
        {
          title: 'Setup Workflow',
          details: 'Configure automation rules according to your needs'
        },
        {
          title: 'Test and Optimize',
          details: 'Run tests to ensure the workflow works properly'
        },
        {
          title: 'Enable and Monitor',
          details: 'Enable the workflow and regularly check its running status'
        }
      ],
      checklist: [
        'Confirm app account permissions',
        'Prepare necessary API keys or tokens',
        'Understand app usage limitations'
      ],
      warnings: [
        'Do not test directly in production environment',
        'Regularly check API usage quotas',
        'Backup important data'
      ],
      outcomes: [
        'Reduce manual operation time',
        'Improve work efficiency',
        'Reduce human errors'
      ]
    }
  }),

  preview: {
    select: {
      title: 'title',
      author: 'slug',
      media: 'mainImage',
    },
  },
})
