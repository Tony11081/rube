'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface StatItemProps {
  value: number
  label: string
  suffix?: string
  delay?: number
}

const StatItem = ({ value, label, suffix = '+', delay = 0 }: StatItemProps) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const duration = 2000 // animation duration in milliseconds
    const steps = 20 // number of steps to reach the target value
    const stepTime = duration / steps
    let currentStep = 0
    
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        currentStep += 1
        setCount(Math.floor((value / steps) * currentStep))
        
        if (currentStep >= steps) {
          setCount(value)
          clearInterval(interval)
        }
      }, stepTime)
      
      return () => clearInterval(interval)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      <h3 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        {count}{suffix}
      </h3>
      <p className="mt-1 text-sm text-zinc-500 uppercase tracking-wide dark:text-zinc-400">
        {label}
      </p>
    </motion.div>
  )
}

export function StatsCounter() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 text-center gap-8 px-4">
      <StatItem value={120} label="Actionable Guides" suffix="+" delay={0} />
      <StatItem value={80} label="Gear Checklists" suffix="+" delay={200} />
      <StatItem value={60} label="Countries Reading" suffix="+" delay={400} />
    </div>
  )
} 