import { defineField, defineType } from 'sanity'
import { z } from 'zod'

import { Layers3Icon } from '~/assets'

export const Project = z.object({
  _id: z.string(),
  name: z.string(),
  url: z.string().url(),
  description: z.string(),
  icon: z.object({
    _ref: z.string(),
    asset: z.any(),
  }),
  appMeta: z.object({
    appSlug: z.string().optional(),
    categories: z.array(z.string()).optional(),
    integrationNotes: z.array(z.string()).optional(),
    oauth: z.string().optional(),
    logo: z.any().optional(),
    relatedPosts: z.array(z.any()).optional(),
  }).optional(),
})
export type Project = z.infer<typeof Project>

export default defineType({
  name: 'project',
  title: '项目',
  type: 'document',
  icon: Layers3Icon,
  fields: [
    defineField({
      name: 'name',
      title: '名字',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: '链接',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: '简介',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: '图片',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'appMeta',
      title: '应用元信息',
      type: 'object',
      description: 'Rube 应用相关的元数据',
      fields: [
        {
          name: 'appSlug',
          title: '应用标识',
          type: 'string',
          description: '应用的唯一标识符，如 gmail, slack, notion',
        },
        {
          name: 'categories',
          title: '应用类别',
          type: 'array',
          of: [{ type: 'string' }],
          description: '应用分类标签',
          options: {
            list: [
              { title: '沟通', value: '沟通' },
              { title: '文档', value: '文档' },
              { title: '项目管理', value: '项目管理' },
              { title: '邮件', value: '邮件' },
              { title: '存储', value: '存储' },
              { title: '社交', value: '社交' },
              { title: '开发', value: '开发' },
              { title: '生产力', value: '生产力' },
              { title: '营销', value: '营销' },
              { title: '财务', value: '财务' },
            ],
          },
        },
        {
          name: 'integrationNotes',
          title: '集成说明',
          type: 'array',
          of: [{ type: 'string' }],
          description: '集成和配置的关键说明',
        },
        {
          name: 'oauth',
          title: '授权要求',
          type: 'string',
          description: '如：OAuth 2.1, API Key, Basic Auth',
          options: {
            list: [
              { title: 'OAuth 2.0', value: 'OAuth 2.0' },
              { title: 'OAuth 2.1', value: 'OAuth 2.1' },
              { title: 'API Key', value: 'API Key' },
              { title: 'Basic Auth', value: 'Basic Auth' },
              { title: 'Token Auth', value: 'Token Auth' },
              { title: 'No Auth', value: 'No Auth' },
            ],
          },
        },
        {
          name: 'logo',
          title: '应用Logo',
          type: 'image',
          description: '应用的官方 Logo',
          options: { hotspot: true },
        },
        {
          name: 'relatedPosts',
          title: '相关案例',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'post' }] }],
          description: '引用相关的使用案例文章',
        },
      ],
    }),
  ],
})
