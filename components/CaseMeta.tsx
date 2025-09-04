'use client'

import { motion } from 'framer-motion'

interface CaseMetaProps {
  rubeMeta?: {
    apps?: string[]
    level?: 'basic' | 'intermediate' | 'advanced'
    timeRequired?: string
    checklist?: string[]
    warnings?: string[]
    outcomes?: string[]
  }
}

const levelMap = {
  basic: { label: '基础', color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-800/20' },
  intermediate: { label: '中级', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-800/20' },
  advanced: { label: '高级', color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-800/20' },
}

const appIcons: Record<string, string> = {
  gmail: '📧',
  slack: '💬',
  notion: '📝',
  youtube: '📺',
  discord: '🎮',
  telegram: '✈️',
  gdrive: '🗂️',
  dropbox: '📦',
  trello: '📋',
  asana: '✅',
}

export function CaseMeta({ rubeMeta }: CaseMetaProps) {
  if (!rubeMeta) return null

  const { apps, level, timeRequired, checklist, warnings, outcomes } = rubeMeta

  return (
    <div className="space-y-6">
      {/* Basic info */}
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          📊 案例信息
        </h3>
        
        <div className="space-y-3">
          {/* Apps */}
          {apps && apps.length > 0 && (
            <div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">涉及应用：</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {apps.map((app) => (
                  <span
                    key={app}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-200 dark:bg-zinc-700 text-xs rounded-md"
                  >
                    <span>{appIcons[app] || '🔗'}</span>
                    <span className="capitalize">{app}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Level */}
          {level && (
            <div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">难度级别：</span>
              <span className={`ml-2 px-2 py-1 text-xs rounded-md font-medium ${levelMap[level].color}`}>
                {levelMap[level].label}
              </span>
            </div>
          )}

          {/* Time required */}
          {timeRequired && (
            <div>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">预计时间：</span>
              <span className="ml-2 text-sm text-zinc-800 dark:text-zinc-200">{timeRequired}</span>
            </div>
          )}
        </div>
      </div>

      {/* Checklist */}
      {checklist && checklist.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            ✅ 前置清单
          </h3>
          <ul className="space-y-2">
            {checklist.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-blue-500 mt-1">▪</span>
                <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Warnings */}
      {warnings && warnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            ⚠️ 注意事项
          </h3>
          <ul className="space-y-2">
            {warnings.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-yellow-500 mt-1">▪</span>
                <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Outcomes */}
      {outcomes && outcomes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            🎯 预期效果
          </h3>
          <ul className="space-y-2">
            {outcomes.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-green-500 mt-1">▪</span>
                <span className="text-zinc-700 dark:text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  )
}