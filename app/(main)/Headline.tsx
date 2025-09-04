'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export function Headline() {
  return (
    <div className="text-center py-16">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 100,
          duration: 0.3,
        }}
      >
        Make AI actually get things done,<br className="sm:hidden" />
        not just chat.
      </motion.h1>
      
      <motion.p 
        className="text-zinc-500 dark:text-zinc-500 text-sm mt-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 85,
          duration: 0.3,
          delay: 0.05,
        }}
      >
        Connect 600+ apps and trigger real actions with natural language — workflows, guides, best practices.
      </motion.p>
      
      <motion.p
        className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 85,
          duration: 0.3,
          delay: 0.1,
        }}
      >
        <Balancer>
          Explore the best Rube workflows and guides. Break free from tedious repetitive tasks and focus on what really matters.
        </Balancer>
      </motion.p>
      <motion.div
        className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 90,
          duration: 0.35,
          delay: 0.25,
        }}
      >
        <Link
          href="/blog"
          className="px-6 py-3 text-white bg-zinc-900 rounded-md text-lg font-medium hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
          📚 Browse Workflows
        </Link>
        <Link
          href="/training"
          className="px-6 py-3 border border-zinc-300 text-zinc-800 rounded-md text-lg font-medium hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500"
        >
          🚀 Get Started
        </Link>
        <Link
          href="/projects"
          className="px-6 py-3 border border-lime-500 text-lime-700 rounded-md text-lg font-medium hover:bg-lime-50 dark:border-lime-600 dark:text-lime-400 dark:hover:border-lime-500"
        >
          🔗 Supported Apps
        </Link>
      </motion.div>
    </div>
  )
}
