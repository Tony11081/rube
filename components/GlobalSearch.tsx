'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  id: string
  title: string
  type: 'post' | 'project'
  slug: string
  description?: string
  apps?: string[]
  level?: string
}

// Mock search data - In production, this data should come from API or Sanity
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    title: 'Gmail Auto-Classification Workflow',
    type: 'post',
    slug: 'gmail-auto-classify',
    description: 'Automatically classify emails by sender and keywords into different labels',
    apps: ['gmail'],
    level: 'basic'
  },
  {
    id: '2', 
    title: 'Slack to Notion Auto-Sync',
    type: 'post',
    slug: 'slack-to-notion-sync',
    description: 'Sync important Slack messages to Notion database automatically',
    apps: ['slack', 'notion'],
    level: 'intermediate'
  },
  {
    id: '3',
    title: 'Gmail',
    type: 'project',
    slug: 'gmail',
    description: 'Google email service with natural language support for sending, finding, and managing emails',
    apps: ['gmail']
  }
]

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  // Listen for Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const filtered = mockSearchData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description?.toLowerCase().includes(query.toLowerCase()) ||
      item.apps?.some(app => app.toLowerCase().includes(query.toLowerCase()))
    )
    
    setResults(filtered)
    setSelectedIndex(0)
  }, [query])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
          break
        case 'Enter':
          event.preventDefault()
          if (results[selectedIndex]) {
            handleSelect(results[selectedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  const handleSelect = (result: SearchResult) => {
    const basePath = result.type === 'post' ? '/blog' : '/projects'
    const url = `${basePath}/${result.slug}?utm_source=site&utm_medium=search&utm_campaign=cmd_k`
    
    router.push(url)
    setIsOpen(false)
    setQuery('')
  }

  const getTypeIcon = (type: string) => {
    return type === 'post' ? '📚' : '🔗'
  }

  const getLevelColor = (level?: string) => {
    switch (level) {
      case 'basic':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-800/20'
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-800/20'
      case 'advanced':
        return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-800/20'
      default:
        return ''
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white dark:bg-zinc-900 shadow-2xl transition-all">
                {/* Search input */}
                <div className="flex items-center gap-3 p-4 border-b border-zinc-200 dark:border-zinc-700">
                  <div className="text-zinc-400">🔍</div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search workflows, apps, or keywords..."
                    className="flex-1 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 focus:outline-none text-lg"
                    autoFocus
                  />
                  <kbd className="px-2 py-1 text-xs text-zinc-500 bg-zinc-100 dark:bg-zinc-800 rounded border">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {results.length > 0 ? (
                      <div className="p-2">
                        {results.map((result, index) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: index * 0.05 }}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              index === selectedIndex
                                ? 'bg-lime-50 dark:bg-lime-900/20 border-lime-200 dark:border-lime-700'
                                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                            onClick={() => handleSelect(result)}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-xl">{getTypeIcon(result.type)}</span>
                              <div className="flex-1 text-left">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                                    {result.title}
                                  </h3>
                                  {result.level && (
                                    <span className={`px-2 py-0.5 text-xs rounded font-medium ${getLevelColor(result.level)}`}>
                                      {result.level === 'basic' ? 'Basic' : 
                                       result.level === 'intermediate' ? 'Intermediate' : 'Advanced'}
                                    </span>
                                  )}
                                </div>
                                {result.description && (
                                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                                    {result.description}
                                  </p>
                                )}
                                {result.apps && result.apps.length > 0 && (
                                  <div className="flex gap-1">
                                    {result.apps.map((app) => (
                                      <span
                                        key={app}
                                        className="px-2 py-1 text-xs bg-zinc-200 dark:bg-zinc-700 rounded"
                                      >
                                        {app}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : query && (
                      <div className="p-8 text-center text-zinc-500">
                        <div className="text-2xl mb-2">🤔</div>
                        <p>No results found</p>
                        <p className="text-sm mt-1">Try searching "Gmail", "Notion", or "automation"</p>
                      </div>
                    )}

                    {!query && (
                      <div className="p-8 text-center text-zinc-500">
                        <div className="text-2xl mb-2">⚡</div>
                        <p>Quickly find Rube workflows and apps</p>
                        <p className="text-sm mt-1">Enter keywords to start searching</p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-3 border-t border-zinc-200 dark:border-zinc-700 text-xs text-zinc-500">
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded">⏎</kbd>
                      Select
                    </span>
                  </div>
                  <div>
                    Search powered by Rube Club
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}