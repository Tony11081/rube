import { env } from '~/env.mjs'

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-12'

// 安全地获取环境变量，不抛出错误
function safeValue<T>(v: T | undefined): T | undefined {
  return v
}

export const dataset = safeValue(
  env.NEXT_PUBLIC_SANITY_DATASET
)

export const projectId = safeValue(
  env.NEXT_PUBLIC_SANITY_PROJECT_ID
)

export const useCdn = env.NEXT_PUBLIC_SANITY_USE_CDN

// 检查是否所有必要的Sanity环境变量都已定义
export const isSanityConfigComplete = !!projectId && !!dataset && !!apiVersion

// 保留原始的assertValue函数以备需要
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
