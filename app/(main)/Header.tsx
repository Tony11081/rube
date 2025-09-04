'use client'

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/nextjs'
import { clsxm } from '@zolplay/utils'
import {
  AnimatePresence,
  motion,
} from 'framer-motion'
import { usePathname } from 'next/navigation'
import React from 'react'

import { NavigationBar } from '~/app/(main)/NavigationBar'
import { ThemeSwitcher } from '~/app/(main)/ThemeSwitcher'
import {
  UserArrowLeftIcon,
} from '~/assets'
import { Container } from '~/components/ui/Container'
// import { Search } from '~/components/ui/Search'
import { clamp } from '~/lib/math'

export function Header() {
  const isHomePage = usePathname() === '/'

  const headerRef = React.useRef<HTMLDivElement>(null)
  const isInitial = React.useRef(true)

  React.useEffect(() => {
    function setProperty(property: string, value: string | null) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      const { top } = headerRef.current.getBoundingClientRect()
      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      if (top === 0 && scrollY > 0) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomePage])

  return (
    <>
      <motion.header
        className={clsxm(
          'relative z-50 flex flex-col',
          'h-[var(--header-height,64px)]'
        )}
        layout
        layoutRoot
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <motion.div
                className="flex flex-1 gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 250,
                }}
              >
                <div className="hidden md:block">
                  <NavigationBar.Desktop />
                </div>
                {/* <div className="hidden md:block flex-1 max-w-sm">
                  <Search 
                    placeholder="Search guides, gear..."
                    className="w-full"
                  />
                </div> */}
              </motion.div>
              <div className="flex flex-1 justify-end md:justify-center">
                <div className="flex items-center gap-2 md:hidden">
                  {/* <div className="w-48">
                    <Search 
                      placeholder="Search..."
                      className="w-full"
                    />
                  </div> */}
                  <ThemeSwitcher />
                  <NavigationBar.Mobile className="relative z-50" />
                </div>
                <div className="hidden md:block">
                  <motion.div
                    className="pointer-events-auto"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      damping: 25,
                      stiffness: 250,
                      delay: 0.1,
                    }}
                  >
                    <div className="flex gap-2">
                      <UserInfo />
                      <ThemeSwitcher />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </motion.header>
    </>
  )
}

function UserInfo() {
  return (
    <div className="pointer-events-auto">
      <AnimatePresence>
        <SignedIn key="user-info">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <UserButton afterSignOutUrl="/" />
          </motion.div>
        </SignedIn>
        <SignedOut key="sign-in">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <SignInButton mode="modal">
              <a className="group block cursor-pointer transition-all">
                <div className="rounded-full bg-gradient-to-b from-zinc-50/10 via-white/50 to-white/70 p-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md dark:from-zinc-900/20 dark:via-zinc-800/70 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20">
                  <UserArrowLeftIcon className="size-5 stroke-zinc-500 transition-all group-hover:stroke-zinc-700 dark:stroke-zinc-400 dark:group-hover:stroke-zinc-300" />
                </div>
              </a>
            </SignInButton>
          </motion.div>
        </SignedOut>
      </AnimatePresence>
    </div>
  )
}
