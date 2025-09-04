'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface Prompt {
  label: string
  content: string
}

interface PromptCopyProps {
  prompts?: Prompt[]
}

function CopyButton({ text, onCopy }: { text: string; onCopy: () => void }) {
  return (
    <button
      onClick={onCopy}
      className="absolute top-3 right-3 px-3 py-1 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 transition-colors"
    >
      复制
    </button>
  )
}

function PromptCard({ prompt, index }: { prompt: Prompt; index: number }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700"
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-medium text-zinc-900 dark:text-zinc-100 pr-12">
          {prompt.label}
        </h4>
        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            copied
              ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
              : 'bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
          }`}
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      
      <pre className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap leading-relaxed font-mono">
        {prompt.content}
      </pre>
    </motion.div>
  )
}

export function PromptCopy({ prompts }: PromptCopyProps) {
  if (!prompts || prompts.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        💬 提示词模板
      </h3>
      <div className="space-y-4">
        {prompts.map((prompt, index) => (
          <PromptCard key={index} prompt={prompt} index={index} />
        ))}
      </div>
    </div>
  )
}