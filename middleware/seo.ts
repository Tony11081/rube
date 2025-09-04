import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { redis } from '~/lib/redis'

const PERFORMANCE_THRESHOLD = 200 // 性能警告阈值(ms)
const BOT_PERFORMANCE_THRESHOLD = 100 // 爬虫性能警告阈值(ms)

// SEO指标监控
async function logSEOMetrics(req: NextRequest, metrics: {
  duration: number,
  status: number,
  isBot: boolean,
  userAgent?: string
}) {
  try {
    await redis.lpush('seo:metrics', JSON.stringify({
      path: req.nextUrl.pathname,
      ...metrics,
      timestamp: Date.now()
    }))
    
    // 仅保留最近1000条记录
    await redis.ltrim('seo:metrics', 0, 999)
    
    // 如果性能超过阈值,记录警告
    const threshold = metrics.isBot ? BOT_PERFORMANCE_THRESHOLD : PERFORMANCE_THRESHOLD
    if (metrics.duration > threshold) {
      console.warn(`[SEO Performance Warning] Slow response: ${metrics.duration}ms`, {
        path: req.nextUrl.pathname,
        isBot: metrics.isBot,
        userAgent: metrics.userAgent
      })
    }
  } catch (error) {
    console.error('[SEO Metrics] Failed to log:', error)
  }
}

export async function SeoMiddleware(request: NextRequest) {
  const start = Date.now()
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = /googlebot|bingbot|baiduspider|yandex|sogou/i.test(userAgent)
  
  try {
    // 为搜索引擎爬虫添加特殊响应头
    const response = NextResponse.next()
    
    if (isBot) {
      // 增强爬虫响应头
      response.headers.set('X-Robots-Tag', 'index,follow,max-snippet:-1,max-image-preview:large')
      response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
      
      // 添加规范链接
      const canonicalUrl = new URL(request.url)
      canonicalUrl.search = '' // 移除查询参数
      response.headers.set('Link', `<${canonicalUrl.toString()}>; rel="canonical"`)
    }
    
    // 记录性能指标
    const duration = Date.now() - start
    await logSEOMetrics(request, {
      duration,
      status: response.status,
      isBot,
      userAgent
    })
    
    return response
  } catch (error) {
    console.error(`[SEO Error] ${request.url}`, {
      error,
      isBot,
      userAgent,
      timestamp: new Date().toISOString()
    })
    
    // 对于爬虫的请求，返回503状态码
    if (isBot) {
      const response = new NextResponse(null, {
        status: 503,
        headers: {
          'Retry-After': '300',
          'X-Robots-Tag': 'noindex'
        }
      })
      
      // 记录错误指标
      await logSEOMetrics(request, {
        duration: Date.now() - start,
        status: 503,
        isBot,
        userAgent
      })
      
      return response
    }
    
    throw error
  }
} 