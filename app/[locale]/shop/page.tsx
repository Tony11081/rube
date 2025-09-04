import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ShopHeader } from '~/components/shop/ShopHeader'
import { OwnerProfile } from '~/components/shop/OwnerProfile'
import { ResourceGrid } from '~/components/shop/ResourceGrid'
import { PaymentMethods } from '~/components/shop/PaymentMethods'
import { ShareSection } from '~/components/shop/ShareSection'
import { Container } from '~/components/ui/Container'

// Mock data - in production, fetch from database
const shopData = {
  id: 'default-shop',
  name: '数字资源精选店',
  description: '精心挑选的高质量数字模板和资源，助力您的创作之路',
  avatar: '/avatars/shop-owner.jpg',
  banner: '/banners/shop-banner.jpg',
  owner: {
    name: '店主小智',
    bio: '设计师 | 5年经验 | 已帮助1000+用户',
    avatar: '/avatars/owner.jpg',
    verified: true,
    stats: {
      products: 28,
      customers: 856,
      rating: 4.9
    }
  },
  categories: [
    { id: 'templates', name: '模板素材', count: 12, icon: '🎨' },
    { id: 'guides', name: '教程指南', count: 8, icon: '📚' },
    { id: 'tools', name: '实用工具', count: 6, icon: '🔧' },
    { id: 'graphics', name: '图形素材', count: 15, icon: '🖼️' }
  ],
  featured: [
    {
      id: '1',
      title: 'Notion模板合集',
      description: '包含项目管理、笔记系统、生活规划等10套精美模板',
      price: 29.9,
      currency: 'CNY',
      originalPrice: 59.9,
      cover: '/products/notion-templates.jpg',
      category: 'templates',
      tags: ['Notion', '模板', '效率'],
      downloads: 234,
      rating: 4.8,
      fileCount: 10,
      totalSize: '15.2 MB'
    },
    {
      id: '2', 
      title: 'UI设计规范手册',
      description: '完整的UI设计体系，包含颜色、字体、组件规范',
      price: 39.9,
      currency: 'CNY',
      cover: '/products/ui-guide.jpg',
      category: 'guides',
      tags: ['设计', 'UI', '规范'],
      downloads: 156,
      rating: 5.0,
      fileCount: 1,
      totalSize: '8.5 MB'
    },
    {
      id: '3',
      title: '小红书爆款文案模板',
      description: '100+种爆款文案模板，涵盖各种场景和行业',
      price: 19.9,
      currency: 'CNY',
      cover: '/products/copywriting.jpg', 
      category: 'templates',
      tags: ['文案', '小红书', '营销'],
      downloads: 445,
      rating: 4.9,
      fileCount: 5,
      totalSize: '2.1 MB'
    }
  ]
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${shopData.name} | 精选数字资源`,
    description: shopData.description,
    openGraph: {
      title: shopData.name,
      description: shopData.description,
      images: [
        {
          url: shopData.banner,
          width: 1200,
          height: 630,
          alt: shopData.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: shopData.name,
      description: shopData.description,
      images: [shopData.banner],
    },
  }
}

interface ShopPageProps {
  params: {
    locale: string
  }
  searchParams: {
    category?: string
    utm_source?: string
  }
}

export default function ShopPage({ params, searchParams }: ShopPageProps) {
  const { locale } = params
  const { category, utm_source } = searchParams

  if (!shopData) {
    notFound()
  }

  // Filter products by category if specified
  let displayProducts = shopData.featured
  if (category) {
    displayProducts = shopData.featured.filter(p => p.category === category)
  }

  const shopUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000'}/${locale}/shop`

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white dark:from-zinc-900 dark:to-zinc-800">
      {/* Shop Header with Banner */}
      <ShopHeader 
        shop={shopData}
        locale={locale}
      />

      <Container className="py-8">
        <div className="space-y-8">
          {/* Owner Profile Section */}
          <OwnerProfile 
            owner={shopData.owner}
            stats={{
              products: shopData.categories.reduce((sum, cat) => sum + cat.count, 0),
              customers: shopData.owner.stats.customers,
              rating: shopData.owner.stats.rating
            }}
          />

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !category 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-pink-50'
              }`}
            >
              全部资源
            </button>
            {shopData.categories.map((cat) => (
              <button 
                key={cat.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                  category === cat.id
                    ? 'bg-pink-500 text-white' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-pink-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-full text-xs">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Resource Grid */}
          <ResourceGrid 
            products={displayProducts}
            locale={locale}
          />

          {/* Payment Methods */}
          <PaymentMethods />

          {/* Share Section */}
          <ShareSection 
            shopUrl={shopUrl}
            shopName={shopData.name}
            description={shopData.description}
          />

          {/* Trust Badges */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">购买保障</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div className="text-sm text-gray-600">即时下载</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">🔒</span>
                  </div>
                  <div className="text-sm text-gray-600">安全支付</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">♾️</span>
                  </div>
                  <div className="text-sm text-gray-600">永久使用</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">💬</span>
                  </div>
                  <div className="text-sm text-gray-600">售后服务</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export const revalidate = 300 // Revalidate every 5 minutes