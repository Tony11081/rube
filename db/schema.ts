import {
  boolean,
  decimal,
  index,
  integer,
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 120 }),
  token: varchar('token', { length: 50 }),
  subscribedAt: timestamp('subscribed_at'),
  unsubscribedAt: timestamp('unsubscribed_at'),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const newsletters = pgTable('newsletters', {
  id: serial('id').primaryKey(),
  subject: varchar('subject', { length: 200 }),
  body: text('body'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    userInfo: json('user_info'),
    postId: varchar('post_id', { length: 100 }).notNull(),
    parentId: integer('parent_id'),
    body: json('body'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    postIdx: index('post_idx').on(table.postId),
  })
)

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 200 }).notNull(),
  userInfo: json('user_info'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

// Digital Commerce Tables
export const orderStatusEnum = pgEnum('order_status', ['UNPAID', 'PAID', 'EXPIRED', 'REFUNDED'])
export const paymentChannelEnum = pgEnum('payment_channel', ['stripe', 'paypal', 'mock'])
export const currencyEnum = pgEnum('currency', ['USD', 'EUR', 'JPY', 'GBP', 'CNY'])

export const productCategories = pgTable('product_categories', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  sortOrder: integer('sort_order').default(0),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  sku: varchar('sku', { length: 50 }),
  title: varchar('title', { length: 300 }).notNull(),
  subtitle: varchar('subtitle', { length: 500 }),
  description: text('description'),
  coverUrl: text('cover_url'),
  categoryId: integer('category_id').references(() => productCategories.id),
  tags: json('tags').$type<string[]>().default([]),
  featured: boolean('featured').default(false),
  published: boolean('published').default(false),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  slugIdx: index('product_slug_idx').on(table.slug),
  categoryIdx: index('product_category_idx').on(table.categoryId),
  publishedIdx: index('product_published_idx').on(table.published),
}))

export const productAssets = pgTable('product_assets', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  fileName: varchar('file_name', { length: 255 }).notNull(),
  fileType: varchar('file_type', { length: 50 }).notNull(),
  fileSize: integer('file_size').notNull(),
  storageKey: varchar('storage_key', { length: 500 }).notNull(),
  description: text('description'),
  downloadCount: integer('download_count').default(0),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  productIdx: index('asset_product_idx').on(table.productId),
}))

export const productPrices = pgTable('product_prices', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  currency: currencyEnum('currency').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  taxInclusive: boolean('tax_inclusive').default(false),
  regionCode: varchar('region_code', { length: 10 }),
  validFrom: timestamp('valid_from').defaultNow(),
  validTo: timestamp('valid_to'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  productCurrencyIdx: index('price_product_currency_idx').on(table.productId, table.currency),
  regionIdx: index('price_region_idx').on(table.regionCode),
}))

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: varchar('order_number', { length: 50 }).notNull().unique(),
  productId: integer('product_id').notNull().references(() => products.id),
  currency: currencyEnum('currency').notNull(),
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }).default('0'),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').default('UNPAID'),
  paymentChannel: paymentChannelEnum('payment_channel').notNull(),
  paymentReference: varchar('payment_reference', { length: 255 }),
  paymentIntentId: varchar('payment_intent_id', { length: 255 }),
  userId: varchar('user_id', { length: 200 }),
  buyerEmail: varchar('buyer_email', { length: 255 }).notNull(),
  buyerName: varchar('buyer_name', { length: 255 }),
  country: varchar('country', { length: 10 }),
  postalCode: varchar('postal_code', { length: 20 }),
  vatNumber: varchar('vat_number', { length: 50 }),
  taxRegion: varchar('tax_region', { length: 50 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  paidAt: timestamp('paid_at'),
  expiresAt: timestamp('expires_at'),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  orderNumberIdx: index('order_number_idx').on(table.orderNumber),
  statusIdx: index('order_status_idx').on(table.status),
  userIdx: index('order_user_idx').on(table.userId),
  emailIdx: index('order_email_idx').on(table.buyerEmail),
  paymentIdx: index('order_payment_idx').on(table.paymentReference),
}))

export const downloadTokens = pgTable('download_tokens', {
  id: serial('id').primaryKey(),
  orderId: integer('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).notNull().unique(),
  remainingDownloads: integer('remaining_downloads').default(5),
  maxDownloads: integer('max_downloads').default(5),
  expiresAt: timestamp('expires_at').notNull(),
  lastAccessedAt: timestamp('last_accessed_at'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => ({
  tokenIdx: index('download_token_idx').on(table.token),
  orderIdx: index('download_order_idx').on(table.orderId),
  expiresIdx: index('download_expires_idx').on(table.expiresAt),
}))

export const fxRatesCache = pgTable('fx_rates_cache', {
  id: serial('id').primaryKey(),
  baseCurrency: currencyEnum('base_currency').notNull(),
  counterCurrency: currencyEnum('counter_currency').notNull(),
  rate: decimal('rate', { precision: 12, scale: 6 }).notNull(),
  provider: varchar('provider', { length: 50 }).default('mock'),
  fetchedAt: timestamp('fetched_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => ({
  currencyPairIdx: index('fx_currency_pair_idx').on(table.baseCurrency, table.counterCurrency),
  expiresIdx: index('fx_expires_idx').on(table.expiresAt),
}))

// Type exports
export type Product = typeof products.$inferSelect
export type ProductInsert = typeof products.$inferInsert
export type ProductPrice = typeof productPrices.$inferSelect
export type Order = typeof orders.$inferSelect
export type OrderInsert = typeof orders.$inferInsert
export type DownloadToken = typeof downloadTokens.$inferSelect
