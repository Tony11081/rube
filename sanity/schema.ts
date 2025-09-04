import { type SchemaTypeDefinition } from 'sanity'

import { readingTimeType } from '~/sanity/schemas/types/readingTime'

import blockContent from './schemas/blockContent'
import category from './schemas/category'
import digitalProduct from './schemas/digitalProduct'
import post from './schemas/post'
import productCategory from './schemas/productCategory'
import project from './schemas/project'
import settings from './schemas/settings'
import shopSettings from './schemas/shopSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    readingTimeType, 
    post, 
    category, 
    blockContent, 
    project, 
    settings,
    // Digital Store types
    digitalProduct,
    productCategory,
    shopSettings,
  ],
}
