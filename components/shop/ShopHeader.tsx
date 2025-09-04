'use client'

import React from 'react'
import Image from 'next/image'
import { Container } from '~/components/ui/Container'

interface ShopHeaderProps {
  shop: {
    name: string
    description: string
    banner?: string
    avatar?: string
  }
  locale: string
}

export function ShopHeader({ shop, locale }: ShopHeaderProps) {
  return (
    <div className="relative">
      {/* Banner Background */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 relative overflow-hidden">
        {shop.banner && (
          <Image
            src={shop.banner}
            alt={shop.name}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating Elements for Visual Appeal */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-12 right-8 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-75" />
        <div className="absolute bottom-8 left-1/4 w-4 h-4 bg-white/25 rounded-full animate-pulse delay-150" />
      </div>

      {/* Shop Info Overlay */}
      <Container className="relative">
        <div className="relative -mt-16 md:-mt-20">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mx-4">
            <div className="flex items-start space-x-4">
              {/* Shop Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-pink-400 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg">
                  {shop.avatar ? (
                    <Image
                      src={shop.avatar}
                      alt={shop.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl text-white font-bold">
                      {shop.name.charAt(0)}
                    </span>
                  )}
                </div>
                {/* Verified Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Shop Details */}
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  {shop.name}
                </h1>
                <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-3">
                  {shop.description}
                </p>
                
                {/* Quick Stats */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <span>⭐</span>
                    <span>4.9分</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>👥</span>
                    <span>856人购买</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>📦</span>
                    <span>28个资源</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4">
              <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl font-medium text-sm hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2">
                <span>💝</span>
                <span>关注小店</span>
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                <span>💬</span>
                <span>联系店主</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}