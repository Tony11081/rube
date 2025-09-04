'use client'

import React from 'react'

export function PaymentMethods() {
  const paymentMethods = [
    {
      name: '支付宝',
      icon: '💙',
      description: '支持支付宝扫码和余额支付',
      popular: true
    },
    {
      name: '微信支付',
      icon: '💚',
      description: '支持微信扫码和钱包支付',
      popular: true
    },
    {
      name: 'PayPal',
      icon: '🌐',
      description: '国际用户首选支付方式'
    },
    {
      name: '银行卡',
      icon: '💳',
      description: '支持Visa、MasterCard等'
    }
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
          💳 支持的支付方式
        </h3>
        <p className="text-gray-600 text-sm">
          多种支付方式，安全便捷，支持全球用户
        </p>
      </div>

      {/* Payment Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {paymentMethods.map((method, index) => (
          <div 
            key={index}
            className="relative bg-gray-50 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors"
          >
            {method.popular && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  推荐
                </span>
              </div>
            )}
            
            <div className="text-2xl mb-2">{method.icon}</div>
            <div className="font-medium text-gray-900 text-sm mb-1">
              {method.name}
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              {method.description}
            </div>
          </div>
        ))}
      </div>

      {/* Security Info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>🔒</span>
            <span>SSL安全加密</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🛡️</span>
            <span>资金安全保障</span>
          </div>
          <div className="flex items-center gap-1">
            <span>⚡</span>
            <span>即时到账</span>
          </div>
        </div>
      </div>

      {/* Payment Process */}
      <div className="mt-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4">
        <div className="text-center mb-3">
          <h4 className="font-medium text-gray-900 text-sm">支付流程</h4>
        </div>
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="text-center">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mb-1 mx-auto">
              <span>1️⃣</span>
            </div>
            <div>选择资源</div>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-2"></div>
          <div className="text-center">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mb-1 mx-auto">
              <span>2️⃣</span>
            </div>
            <div>安全支付</div>
          </div>
          <div className="flex-1 h-px bg-gray-200 mx-2"></div>
          <div className="text-center">
            <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mb-1 mx-auto">
              <span>3️⃣</span>
            </div>
            <div>即时下载</div>
          </div>
        </div>
      </div>
    </div>
  )
}