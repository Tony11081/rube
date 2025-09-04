'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '~/components/ui/Button'

interface Product {
  id: string
  title: string
  description: string
  price: number
  currency: string
  originalPrice?: number
  cover: string
  category: string
  tags: string[]
  downloads: number
  rating: number
  fileCount: number
  totalSize: string
}

interface ResourceGridProps {
  products: Product[]
  locale: string
}

export function ResourceGrid({ products, locale }: ResourceGridProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'CNY') {
      return `¥${price}`
    }
    return `$${price}`
  }

  const handleQuickBuy = (productId: string) => {
    // 快速购买逻辑
    window.location.href = `/${locale}/checkout/${productId}`
  }

  const handlePreview = (productId: string) => {
    // 预览逻辑
    window.location.href = `/${locale}/p/${productId}`
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ✨ 精选资源
        </h2>
        <p className="text-gray-600">
          精心挑选的高质量数字资源，助力您的创作之路
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            {/* Product Cover */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={product.cover}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              
              {/* Overlay on Hover */}
              {hoveredProduct === product.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center space-x-2 transition-opacity duration-200">
                  <button
                    onClick={() => handlePreview(product.id)}
                    className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors"
                  >
                    👀 预览
                  </button>
                  <button
                    onClick={() => handleQuickBuy(product.id)}
                    className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-pink-600 transition-colors"
                  >
                    ⚡ 购买
                  </button>
                </div>
              )}

              {/* Discount Badge */}
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                </div>
              )}

              {/* Hot Badge */}
              {product.downloads > 200 && (
                <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  🔥 热销
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              {/* Title & Description */}
              <div className="mb-3">
                <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">
                  {product.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  📁 {product.fileCount} 个文件
                </span>
                <span className="flex items-center gap-1">
                  💾 {product.totalSize}
                </span>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    ⭐ {product.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    📥 {product.downloads}
                  </span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-pink-500">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.originalPrice, product.currency)}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/${locale}/p/${product.id}`}>
                    <Button variant="outline" size="sm">
                      详情
                    </Button>
                  </Link>
                  <Button 
                    size="sm"
                    onClick={() => handleQuickBuy(product.id)}
                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    立即购买
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {products.length >= 6 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg">
            查看更多资源 →
          </Button>
        </div>
      )}
    </div>
  )
}