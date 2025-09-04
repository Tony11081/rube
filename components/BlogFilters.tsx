'use client'

import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface BlogFiltersProps {
  availableApps: string[]
  availableLevels: string[]
}

export function BlogFilters({ availableApps, availableLevels }: BlogFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [selectedApp, setSelectedApp] = useState(searchParams.get('app') || '')
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get('level') || '')

  const appLabels: Record<string, string> = {
    gmail: '📧 Gmail',
    slack: '💬 Slack',  
    notion: '📝 Notion',
    youtube: '📺 YouTube',
    discord: '🎮 Discord',
    telegram: '✈️ Telegram',
    gdrive: '🗂️ Google Drive',
    dropbox: '📦 Dropbox',
    trello: '📋 Trello',
    asana: '✅ Asana'
  }

  const levelLabels = {
    basic: 'Basic',
    intermediate: 'Intermediate', 
    advanced: 'Advanced'
  }

  useEffect(() => {
    const params = new URLSearchParams()
    
    if (selectedApp) {
      params.set('app', selectedApp)
    }
    
    if (selectedLevel) {
      params.set('level', selectedLevel)
    }

    // Add UTM tracking for filter usage
    if (selectedApp || selectedLevel) {
      params.set('utm_source', 'site')
      params.set('utm_medium', 'filter')
      params.set('utm_campaign', 'blog_filter')
    }

    const query = params.toString()
    const newUrl = query ? `/blog?${query}` : '/blog'
    
    router.push(newUrl, { scroll: false })
  }, [selectedApp, selectedLevel, router])

  const handleAppChange = (app: string) => {
    setSelectedApp(app === selectedApp ? '' : app)
  }

  const handleLevelChange = (level: string) => {
    setSelectedLevel(level === selectedLevel ? '' : level)
  }

  const clearFilters = () => {
    setSelectedApp('')
    setSelectedLevel('')
    router.push('/blog')
  }

  const hasActiveFilters = selectedApp || selectedLevel

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 mb-8"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* App filter */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Filter by App:
            </span>
            <div className="flex flex-wrap gap-2">
              {availableApps.map((app) => (
                <button
                  key={app}
                  onClick={() => handleAppChange(app)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedApp === app
                      ? 'bg-lime-500 text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  {appLabels[app] || app}
                </button>
              ))}
            </div>
          </div>

          {/* Level filter */}
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Filter by Difficulty:
            </span>
            <div className="flex flex-wrap gap-2">
              {availableLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleLevelChange(level)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    selectedLevel === level
                      ? 'bg-lime-500 text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600'
                  }`}
                >
                  {levelLabels[level as keyof typeof levelLabels] || level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear filters */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
          >
            Clear Filters
          </motion.button>
        )}
      </div>

      {/* Active filters display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700"
        >
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span>Active filters:</span>
            {selectedApp && (
              <span className="px-2 py-1 bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 rounded text-xs">
                {appLabels[selectedApp] || selectedApp}
              </span>
            )}
            {selectedLevel && (
              <span className="px-2 py-1 bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 rounded text-xs">
                {levelLabels[selectedLevel as keyof typeof levelLabels] || selectedLevel}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}