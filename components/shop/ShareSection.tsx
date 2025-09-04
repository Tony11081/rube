'use client'

import React, { useState } from 'react'
import { Button } from '~/components/ui/Button'

interface ShareSectionProps {
  shopUrl: string
  shopName: string
  description: string
}

export function ShareSection({ shopUrl, shopName, description }: ShareSectionProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shopUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const shareToWeChat = () => {
    // Generate WeChat share text
    const shareText = `${shopName} - ${description}\n\n🔥 精选数字资源，即买即用！\n💝 限时特惠，不容错过！\n\n👆 点击链接查看更多：${shopUrl}`
    
    // Copy to clipboard for WeChat sharing
    navigator.clipboard.writeText(shareText).then(() => {
      alert('分享文案已复制！可直接粘贴到微信分享 📱')
    })
  }

  const shareToSocialMedia = (platform: string) => {
    const text = `发现一个超棒的数字资源店铺！${shopName} - ${description}`
    const encodedText = encodeURIComponent(text)
    const encodedUrl = encodeURIComponent(shopUrl)
    
    let shareUrl = ''
    
    switch (platform) {
      case 'weibo':
        shareUrl = `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedText}`
        break
      case 'qzone':
        shareUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${encodedUrl}&title=${encodedText}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
        break
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  const generateQRCode = () => {
    // Generate QR code for the shop URL
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(shopUrl)}`
    
    // Create a modal to show QR code
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-sm mx-4">
        <div class="text-center mb-4">
          <h3 class="text-lg font-semibold mb-2">扫码访问小店</h3>
          <p class="text-gray-600 text-sm">使用微信扫一扫或相机扫码</p>
        </div>
        <div class="flex justify-center mb-4">
          <img src="${qrUrl}" alt="QR Code" class="w-48 h-48 border border-gray-200 rounded-xl" />
        </div>
        <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors" onclick="this.parentElement.parentElement.remove()">
          关闭
        </button>
      </div>
    `
    
    document.body.appendChild(modal)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
          🚀 分享小店
        </h3>
        <p className="text-gray-600 text-sm">
          分享给朋友，一起发现优质数字资源
        </p>
      </div>

      {/* Quick Share Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <button
          onClick={shareToWeChat}
          className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors flex flex-col items-center gap-1"
        >
          <span className="text-lg">💬</span>
          <span>微信分享</span>
        </button>
        
        <button
          onClick={() => shareToSocialMedia('weibo')}
          className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors flex flex-col items-center gap-1"
        >
          <span className="text-lg">📱</span>
          <span>微博</span>
        </button>
        
        <button
          onClick={generateQRCode}
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors flex flex-col items-center gap-1"
        >
          <span className="text-lg">📲</span>
          <span>二维码</span>
        </button>
        
        <button
          onClick={() => shareToSocialMedia('twitter')}
          className="bg-sky-500 hover:bg-sky-600 text-white py-3 px-4 rounded-xl font-medium text-sm transition-colors flex flex-col items-center gap-1"
        >
          <span className="text-lg">🐦</span>
          <span>Twitter</span>
        </button>
      </div>

      {/* Copy Link Section */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-600 font-mono truncate">
            {shopUrl}
          </div>
          <Button
            onClick={handleCopyLink}
            size="sm"
            className={`min-w-[80px] transition-all duration-200 ${
              copied 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-pink-500 hover:bg-pink-600 text-white'
            }`}
          >
            {copied ? '✓ 已复制' : '📋 复制'}
          </Button>
        </div>
        
        {copied && (
          <div className="mt-2 text-center">
            <span className="text-green-600 text-sm font-medium">
              ✅ 链接已复制到剪贴板，可以分享给朋友了！
            </span>
          </div>
        )}
      </div>

      {/* Share Stats */}
      <div className="mt-6 text-center">
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <span>👁️</span>
            <span>浏览 2.1k</span>
          </div>
          <div className="flex items-center gap-1">
            <span>💝</span>
            <span>收藏 345</span>
          </div>
          <div className="flex items-center gap-1">
            <span>🚀</span>
            <span>分享 128</span>
          </div>
        </div>
      </div>

      {/* Share Tips */}
      <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-xl p-3">
        <div className="flex items-start gap-2">
          <span className="text-yellow-500 flex-shrink-0">💡</span>
          <div className="text-yellow-700 text-xs leading-relaxed">
            <strong>分享小贴士：</strong> 分享链接时可以添加你的推荐语，让朋友们更了解这些优质资源的价值！
          </div>
        </div>
      </div>
    </div>
  )
}