'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface Step {
  title: string
  details: string
  image?: {
    asset: {
      url: string
    }
  }
}

interface StepsProps {
  steps?: Step[]
}

export function Steps({ steps }: StepsProps) {
  if (!steps || steps.length === 0) {
    return null
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-6">
        🛠️ 配置步骤
      </h3>
      <ol className="space-y-6">
        {steps.map((step, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            <div className="flex gap-4">
              {/* Step number */}
              <div className="flex-shrink-0 w-8 h-8 bg-lime-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              
              {/* Step content */}
              <div className="flex-1">
                <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                  {step.title}
                </h4>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                  {step.details}
                </p>
                
                {/* Step image */}
                {step.image?.asset?.url && (
                  <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700">
                    <Image
                      src={step.image.asset.url}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Connecting line for all but last step */}
            {index < steps.length - 1 && (
              <div className="absolute left-4 top-12 w-px h-6 bg-zinc-200 dark:bg-zinc-700" />
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  )
}