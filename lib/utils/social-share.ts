export interface ShareOptions {
  url: string
  title: string
  description?: string
  image?: string
  hashtags?: string[]
}

export class SocialShareUtils {
  static generateShortUrl(originalUrl: string): string {
    // In production, integrate with a URL shortening service like Bitly or TinyURL
    // For now, return original URL
    return originalUrl
  }

  static generateShareText(options: ShareOptions): string {
    let text = `${options.title}`
    
    if (options.description) {
      text += ` - ${options.description}`
    }
    
    text += `\n\n🔥 精选数字资源，即买即用！`
    text += `\n💝 限时特惠，不容错过！`
    text += `\n\n👆 点击链接查看更多：${options.url}`
    
    if (options.hashtags && options.hashtags.length > 0) {
      text += `\n\n${options.hashtags.map(tag => `#${tag}`).join(' ')}`
    }
    
    return text
  }

  static async copyToClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      console.error('Failed to copy text:', err)
      return false
    }
  }

  static shareToWeChat(options: ShareOptions): void {
    const shareText = this.generateShareText(options)
    this.copyToClipboard(shareText).then((success) => {
      if (success) {
        alert('📱 分享文案已复制到剪贴板！\n可直接粘贴到微信分享给朋友')
      }
    })
  }

  static shareToWeibo(options: ShareOptions): void {
    const text = encodeURIComponent(`${options.title} ${options.description || ''}`)
    const url = encodeURIComponent(options.url)
    const shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${text}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  static shareToQZone(options: ShareOptions): void {
    const text = encodeURIComponent(`${options.title} ${options.description || ''}`)
    const url = encodeURIComponent(options.url)
    const shareUrl = `https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${text}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  static shareToTwitter(options: ShareOptions): void {
    let text = `${options.title}`
    if (options.description) {
      text += ` - ${options.description}`
    }
    
    if (options.hashtags && options.hashtags.length > 0) {
      text += ` ${options.hashtags.map(tag => `#${tag}`).join(' ')}`
    }
    
    const encodedText = encodeURIComponent(text)
    const url = encodeURIComponent(options.url)
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${url}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  static shareToFacebook(options: ShareOptions): void {
    const url = encodeURIComponent(options.url)
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  static shareToLinkedIn(options: ShareOptions): void {
    const url = encodeURIComponent(options.url)
    const title = encodeURIComponent(options.title)
    const summary = encodeURIComponent(options.description || '')
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`
    window.open(shareUrl, '_blank', 'width=600,height=400')
  }

  static generateQRCode(url: string, size: number = 200): string {
    // Using QR Server API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`
  }

  static showQRCodeModal(url: string, title?: string): void {
    const qrUrl = this.generateQRCode(url, 200)
    
    const modal = document.createElement('div')
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
    modal.style.zIndex = '9999'
    
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-2xl">
        <div class="text-center mb-4">
          <h3 class="text-lg font-semibold mb-2 text-gray-900">扫码访问${title ? ` - ${title}` : ''}</h3>
          <p class="text-gray-600 text-sm">使用微信扫一扫或相机扫码访问</p>
        </div>
        <div class="flex justify-center mb-4">
          <img src="${qrUrl}" alt="QR Code" class="w-48 h-48 border border-gray-200 rounded-xl shadow-sm" />
        </div>
        <div class="space-y-2">
          <button class="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-xl font-medium transition-colors" onclick="navigator.clipboard.writeText('${url}').then(() => alert('链接已复制！'))">
            📋 复制链接
          </button>
          <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
            关闭
          </button>
        </div>
      </div>
    `
    
    document.body.appendChild(modal)
    
    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove()
      }
    })
    
    // Close on escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modal.remove()
        document.removeEventListener('keydown', handleEscape)
      }
    }
    document.addEventListener('keydown', handleEscape)
  }

  static generateShareableLink(baseUrl: string, params: Record<string, string> = {}): string {
    const url = new URL(baseUrl)
    
    // Add UTM parameters for tracking
    const defaultParams = {
      utm_source: 'social_share',
      utm_medium: 'organic',
      utm_campaign: 'shop_share'
    }
    
    const allParams = { ...defaultParams, ...params }
    
    Object.entries(allParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
    
    return url.toString()
  }

  static trackShareEvent(platform: string, url: string): void {
    // Track sharing events for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'share', {
        method: platform,
        content_type: 'shop_page',
        item_id: url
      })
    }
    
    // You can also integrate with other analytics services here
    console.log(`Share event tracked: ${platform} - ${url}`)
  }

  static async shareViaWebAPI(options: ShareOptions): Promise<boolean> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: options.title,
          text: options.description,
          url: options.url
        })
        return true
      } catch (err) {
        console.error('Error sharing via Web Share API:', err)
        return false
      }
    }
    return false
  }

  static getOptimalShareText(platform: string, options: ShareOptions): string {
    const maxLengths = {
      twitter: 280,
      weibo: 140,
      wechat: 500,
      default: 300
    }
    
    const maxLength = maxLengths[platform as keyof typeof maxLengths] || maxLengths.default
    let text = `${options.title}`
    
    if (options.description && text.length + options.description.length + 3 <= maxLength) {
      text += ` - ${options.description}`
    }
    
    // Add hashtags if space allows
    if (options.hashtags && options.hashtags.length > 0) {
      const hashtagText = ` ${options.hashtags.map(tag => `#${tag}`).join(' ')}`
      if (text.length + hashtagText.length <= maxLength) {
        text += hashtagText
      }
    }
    
    // Truncate if still too long
    if (text.length > maxLength) {
      text = text.substring(0, maxLength - 3) + '...'
    }
    
    return text
  }
}

// Global interface for gtag (Google Analytics)
declare global {
  interface Window {
    gtag?: (command: string, action: string, params: any) => void
  }
}