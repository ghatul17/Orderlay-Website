import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { allPostsQuery, allCategoriesQuery, postsByCategoryQuery } from '@/sanity/lib/queries'
import type { Post, Category } from '@/sanity/lib/types'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { BentoGrid } from '@/components/blog/BentoGrid'
import { SITE_URL } from '@/constants/site'

export const metadata: Metadata = {
  title: { absolute: 'Orderlay Blog — Restaurant Management Insights' },
  description:
    'Expert tips on restaurant operations, marketing, inventory, and growth for modern restaurant owners.',
  alternates: { canonical: `${SITE_URL}/blog` },
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
    <main className="min-h-screen bg-[#f7f7f5]">
      {/* Header */}
      <div className="container pt-12 md:pt-16 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-widest text-primary mb-3">
              Orderlay Blog
            </p>
            <h1 className="text-[36px] md:text-[44px] lg:text-[48px] font-semibold font-jakarta text-gray-900 leading-[1.15] tracking-[-0.5px]">
              {category ? `#${category}` : 'Restaurant Insights'}
            </h1>
          </div>
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="container pb-12">
        {posts.length > 0 ? (
          <BentoGrid posts={posts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 mb-4" aria-hidden="true"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M16 19h6m-3-3v6"/></svg>
            <p className="text-gray-500 text-[16px] font-jakarta">No posts in this category yet.</p>
            <p className="text-gray-400 text-[14px] mt-1 font-jakarta">Check back soon.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="container pb-16">
        <div className="bg-primary rounded-xl px-8 py-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }}
          />
          <div className="relative">
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-semibold font-jakarta leading-[1.2] tracking-[-0.4px] mb-4">Ready to grow your restaurant?</h2>
            <p className="text-orange-100 mb-8 text-[16px] leading-[1.6] max-w-[600px] mx-auto">
              Join hundreds of restaurants using Orderlay to streamline operations and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact-us"
                className="bg-white text-primary font-semibold text-[14px] h-12 px-6 inline-flex items-center justify-center rounded-xl hover:bg-orange-50 transition-colors duration-200"
              >
                Book a Demo
              </a>
              <a
                href="/#get-started"
                className="border border-white/60 text-white font-semibold text-[14px] h-12 px-6 inline-flex items-center justify-center rounded-xl hover:bg-orange-600 transition-colors duration-200"
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
