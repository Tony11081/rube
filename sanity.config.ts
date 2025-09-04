/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...index]]/page.tsx` route
 */

import { codeInput } from '@sanity/code-input'
import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { media } from 'sanity-plugin-media'

import { settingsPlugin, settingsStructure } from '~/sanity/plugins/settings'
import { schema } from './sanity/schema'
import settingsType from './sanity/schemas/settings'

// 直接从process.env获取配置
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-12'
const isSanityConfigComplete = !!projectId && !!dataset

// 创建一个空的配置，在环境变量缺失时使用
const emptyConfig = defineConfig({
  basePath: '/studio',
  projectId: '',
  dataset: '',
  schema: { types: [] },
  plugins: [],
})

// 只有在所有必需的环境变量都存在时才创建完整的配置
const studioConfig = isSanityConfigComplete
  ? defineConfig({
      basePath: '/studio',
      projectId,
      dataset,
      // Add and edit the content schema in the './sanity/schema' folder
      schema,
      plugins: [
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        structureTool({ structure: settingsStructure(settingsType) }),
        // Vision is a tool that lets you query your content with GROQ in the studio
        // https://www.sanity.io/docs/the-vision-plugin
        visionTool({ defaultApiVersion: apiVersion }),
        settingsPlugin({
          type: settingsType.name,
        }),
        media(),
        codeInput(),
      ],
    })
  : emptyConfig

export default studioConfig
