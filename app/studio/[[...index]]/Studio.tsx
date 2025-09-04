'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'

import config from '~/sanity.config'

// 错误提示组件
function SanityConfigError() {
  const [missingVars, setMissingVars] = useState<string[]>([])

  useEffect(() => {
    const missing = []
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
    if (!process.env.NEXT_PUBLIC_SANITY_DATASET) missing.push('NEXT_PUBLIC_SANITY_DATASET')
    setMissingVars(missing)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Sanity Studio Configuration</h1>
        <div className="mb-6 text-gray-600">
          <p className="mb-4">
            请在 <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code> 文件中添加以下环境变量：
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
            <div className="mb-2"># Sanity CMS Configuration</div>
            <div>NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"</div>
            <div>NEXT_PUBLIC_SANITY_DATASET="production"</div>
            <div>SANITY_API_TOKEN="your-api-token"</div>
          </div>
          {missingVars.length > 0 && (
            <div className="mb-4">
              <p className="text-red-600 font-medium mb-2">缺失的环境变量：</p>
              <ul className="list-disc pl-6 text-red-600 font-mono">
                {missingVars.map(varName => (
                  <li key={varName}>{varName}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-700 mb-2">如何配置：</h3>
          <ol className="list-decimal pl-6 text-sm text-gray-600 space-y-2">
            <li>在项目根目录创建或编辑 <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> 文件</li>
            <li>添加上述环境变量，将值替换为您的 Sanity 项目信息</li>
            <li>重启开发服务器：<code className="bg-gray-100 px-1 py-0.5 rounded">pnpm dev</code></li>
            <li>访问 <a href="/studio" className="text-blue-600 hover:underline">/studio</a> 即可使用</li>
          </ol>
        </div>
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">💡 在哪里找到这些值？</h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>PROJECT_ID</strong>: 登录 sanity.io → 选择项目 → Settings → API</p>
            <p><strong>DATASET</strong>: 通常是 "production" 或 "development"</p>
            <p><strong>API_TOKEN</strong>: Settings → API → Tokens → 创建新 token</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Studio() {
  // 使用客户端检测，确保环境变量在运行时存在
  const [isConfigComplete, setIsConfigComplete] = useState<boolean | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    // 直接检查process.env中的变量
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    
    // 调试信息
    setDebugInfo(
      `PROJECT_ID: ${projectId ? '✅ 已设置' : '❌ 未设置'}, DATASET: ${dataset ? '✅ 已设置' : '❌ 未设置'}`
    )
    
    // 检查配置是否完整
    setIsConfigComplete(!!projectId && !!dataset)
  }, [])

  // 仅在客户端渲染后显示内容
  if (isConfigComplete === null) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Sanity Studio...</p>
        </div>
      </div>
    )
  }

  // 配置不完整时显示错误信息
  if (!isConfigComplete) {
    return (
      <>
        <SanityConfigError />
        {/* 调试信息 */}
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 p-3 text-xs rounded-lg shadow-lg">
          <div className="font-mono">{debugInfo}</div>
        </div>
      </>
    )
  }

  // 配置完整时渲染Sanity Studio
  return <NextStudio config={config} />
}