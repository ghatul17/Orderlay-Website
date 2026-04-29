import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { allPostsQuery, allCategoriesQuery, postsByCategoryQuery } from '@/sanity/lib/queries'
import type { Post, Category } from '@/sanity/lib/types'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { BentoGrid } from '@/components/blog/BentoGrid'

export const metadata: Metadata = {
  title: 'Blog | Orderlay — Restaurant Management Insights',
  description:
    'Expert tips on restaurant operations, marketing, inventory, and growth for modern restaurant owners.',
  openGraph: {
    title: 'Orderlay Blog',
    description: 'Expert tips for restaurant owners and managers.',
    type: 'website',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  const [categories, posts] = await Promise.all([
    sanityFetch<Category[]>({ query: allCategoriesQuery, tags: ['category'] }),
    sanityFetch<Post[]>({
      query: category ? postsByCategoryQuery : allPostsQuery,
      params: category ? { categorySlug: category } : {},
      tags: ['post'],
    }),
  ])

  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
              Orderlay Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {category ? `#${category}` : 'Restaurant Insights'}
            </h1>
          </div>
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-14">
        {posts.length > 0 ? (
          <BentoGrid posts={posts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No posts in this category yet.</p>
            <p className="text-gray-400 text-sm mt-1">Check back soon.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-orange-500 rounded-3xl px-8 py-14 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
          <div className="relative">
            <h2 className="text-3xl font-bold mb-3">Ready to grow your restaurant?</h2>
            <p className="text-orange-100 mb-8 text-lg max-w-xl mx-auto">
              Join hundreds of restaurants using Orderlay to streamline operations and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact-us"
                className="bg-white text-orange-500 font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors"
              >
                Book a Demo
              </a>
              <a
                href="/#get-started"
                className="border border-white/60 text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
              >
                Get Started Free
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
