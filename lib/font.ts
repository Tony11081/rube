import { Inter, Outfit } from 'next/font/google'

const sansFont = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
})

const displayFont = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
})

export { sansFont, displayFont }
