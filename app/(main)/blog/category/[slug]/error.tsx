'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '~/components/ui/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error('博客分类页面错误:', error)
  }, [error])

  return (
    <Container className="flex flex-col items-center justify-center py-24">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
        出错了
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md">
        加载此分类的博客文章时出现了问题。这可能是由于网络连接问题或者此分类不存在。
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          重试
        </button>
        <Link
          href="/blog"
          className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          返回博客
        </Link>
      </div>
    </Container>
  )
} 