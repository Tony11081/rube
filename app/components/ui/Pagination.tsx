import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  // 生成页码数组
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    const halfVisible = Math.floor(maxVisiblePages / 2)
    
    // 添加首页
    pages.push(1)
    
    let start = Math.max(2, currentPage - halfVisible)
    let end = Math.min(totalPages - 1, start + maxVisiblePages - 3)
    
    if (end - start + 1 < maxVisiblePages - 2) {
      start = Math.max(2, end - maxVisiblePages + 3)
    }
    
    // 添加省略号
    if (start > 2) {
      pages.push('...')
    }
    
    // 添加中间页码
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    // 添加省略号
    if (end < totalPages - 1) {
      pages.push('...')
    }
    
    // 添加末页
    if (totalPages > 1) {
      pages.push(totalPages)
    }
    
    return pages
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-between gap-2 px-2">
      <div className="flex w-[120px] justify-start">
        {currentPage > 1 && (
          <Link
            href={`/blog?page=${currentPage - 1}`}
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <ChevronLeftIcon className="mr-1 h-4 w-4" />
            Previous
          </Link>
        )}
      </div>
      
      <div className="flex items-center justify-center gap-1">
        {getPageNumbers().map((page, idx) => (
          typeof page === 'number' ? (
            <Link
              key={page}
              href={`/blog?page=${page}`}
              className={clsx(
                'inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors',
                page === currentPage
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
              )}
            >
              {page}
            </Link>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-1 text-zinc-400">
              {page}
            </span>
          )
        ))}
      </div>
      
      <div className="flex w-[120px] justify-end">
        {currentPage < totalPages && (
          <Link
            href={`/blog?page=${currentPage + 1}`}
            className="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Next
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Link>
        )}
      </div>
    </nav>
  )
} 