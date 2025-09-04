import React from 'react'
import Link from 'next/link'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { Newsletter } from '~/app/(main)/Newsletter'
import { Container } from '~/components/ui/Container'
import { Button } from '~/components/ui/Button'
import { getLatestBlogPosts } from '~/sanity/queries'

export default async function HomePage() {
  const posts = await getLatestBlogPosts({ limit: 3, forDisplay: true }) || []

  return (
    <>
      {/* Hero Section */}
      <div className="bg-white dark:bg-zinc-900 pb-16 pt-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
              Premium Digital
              <span className="text-lime-600 dark:text-lime-400"> Resources</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Discover high-quality digital templates, guides, and resources to accelerate your projects. 
              Instant download, lifetime access.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button as={Link} href="/store" size="lg">
                Browse Store
              </Button>
              <Button as={Link} href="/about" variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </div>

<<<<<<< HEAD
      {/* Popular apps section */}
      <section className="bg-white dark:bg-zinc-900 py-12">
        <div className="text-center">
          <p className="text-sm text-zinc-500 uppercase tracking-wider mb-4 dark:text-zinc-400">
            Popular app integrations
          </p>
          <div className="flex flex-wrap justify-center gap-6 grayscale opacity-70">
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">📧 Gmail</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">💬 Slack</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">📝 Notion</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">📺 YouTube</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">🗂️ Google Drive</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="border-t border-zinc-200 bg-white py-12 dark:bg-zinc-900 dark:border-zinc-800">
        <StatsCounter />
      </section>

      {/* Feature Intro section */}
      <FeatureIntro />

      {/* Testimonials section */}
      <Testimonials />

      {/* Blog and Newsletter section */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-6 pt-6">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="mr-2 text-xl">📚</span>
              <span>Workflows</span>
=======
      {/* Features Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Why Choose Our Digital Store?
>>>>>>> 110d17e5fa24b5c08e141998efc75b1235ad1913
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Professional resources designed to save you time and boost productivity.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Instant Download
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get immediate access to your purchases. No waiting, no delays.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Secure & Reliable
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Bank-level security with reliable download links that never expire.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Global Payment
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Multiple currencies and payment methods accepted worldwide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-zinc-900 py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">1000+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Digital Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">50k+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">99.9%</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">24/7</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Support</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Featured Products
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Hand-picked digital resources from our premium collection.
            </p>
          </div>
          <div className="mt-12 text-center">
            <Button as={Link} href="/store" size="lg">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Blog and Newsletter Section */}
      {posts.length > 0 && (
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-6 pt-6">
              <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <span className="mr-2 text-xl">📰</span>
                <span>Latest Posts</span>
              </h2>
              <BlogPosts posts={posts} />
            </div>
            <aside className="space-y-10 lg:sticky lg:top-8 lg:h-fit lg:pl-16 xl:pl-20">
              <Newsletter />
              <div className="rounded-xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
<<<<<<< HEAD
                  <span className="mr-2 text-xl">🛠️</span>
                  <span>Toolbox</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Copy-ready prompt templates, scripts, and configuration files to boost productivity.
=======
                  <span className="mr-2 text-xl">🛍️</span>
                  <span>Start Shopping</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Browse our collection of premium digital resources and templates.
>>>>>>> 110d17e5fa24b5c08e141998efc75b1235ad1913
                </p>
                <div className="mt-6">
                  <Link
                    href="/store"
                    className="text-sm font-medium text-lime-600 transition hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300"
                  >
<<<<<<< HEAD
                    Browse All Tools →
                  </a>
=======
                    Visit Store →
                  </Link>
>>>>>>> 110d17e5fa24b5c08e141998efc75b1235ad1913
                </div>
              </div>
            </aside>
          </div>
        </Container>
      )}
    </>
  )
}

export const revalidate = 60
