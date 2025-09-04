import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Shop | Share your digital resources',
  description: 'Beautiful, shareable digital resource store perfect for social media',
  openGraph: {
    title: 'Social Shop - Digital Resources',
    description: 'Beautiful, shareable digital resource store perfect for social media',
    type: 'website',
  },
}

interface ShopLayoutProps {
  children: React.ReactNode
  params: {
    locale: string
  }
}

export default function ShopLayout({ children, params }: ShopLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-purple-50 to-blue-50">
      {children}
    </div>
  )
}