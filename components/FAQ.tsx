'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { JsonLd } from '~/components/seo/JsonLd'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  faqs: FAQItem[]
}

export function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <JsonLd type="FAQPage" data={faqs} />
      
      <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          ❓ 常见问题
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    className="text-zinc-500 dark:text-zinc-400 text-xl font-light"
                  >
                    +
                  </motion.span>
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-zinc-50 dark:bg-zinc-700/50"
                  >
                    <div className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}