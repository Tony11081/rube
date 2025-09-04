'use client'

import React from 'react'
import Image from 'next/image'

interface OwnerProfileProps {
  owner: {
    name: string
    bio: string
    avatar: string
    verified: boolean
  }
  stats: {
    products: number
    customers: number
    rating: number
  }
}

export function OwnerProfile({ owner, stats }: OwnerProfileProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span>👤</span>
          店主介绍
        </h2>
        <div className="flex items-center gap-1 text-orange-500">
          <span>⭐</span>
          <span className="text-sm font-medium">{stats.rating}</span>
        </div>
      </div>

      {/* Owner Info */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-pink-100">
            {owner.avatar ? (
              <Image
                src={owner.avatar}
                alt={owner.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {owner.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {owner.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900">{owner.name}</h3>
            {owner.verified && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                认证店主
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {owner.bio}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-pink-500 mb-1">
            {stats.products}
          </div>
          <div className="text-xs text-gray-500">资源数量</div>
        </div>
        <div className="text-center border-l border-r border-gray-100">
          <div className="text-2xl font-bold text-purple-500 mb-1">
            {stats.customers}
          </div>
          <div className="text-xs text-gray-500">购买用户</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500 mb-1">
            {stats.rating}
          </div>
          <div className="text-xs text-gray-500">好评评分</div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-center space-x-4">
          <button className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">微信咨询</span>
          </button>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <span className="text-lg">📧</span>
            <span className="text-sm font-medium">邮箱联系</span>
          </button>
          <button className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-medium">定制服务</span>
          </button>
        </div>
      </div>
    </div>
  )
}