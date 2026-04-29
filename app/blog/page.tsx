import { Suspense } from 'react'
import type { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { allPostsQuery, allCategoriesQuery, featuredPostsQuery, postsByCategoryQuery } from '@/sanity/lib/queries'
import type { Post, Category } from '@/sanity/lib/types'
import { PostCard } from '@/components/blog/PostCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

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

  const [featured, categories, posts] = await Promise.all([
    sanityFetch<Post[]>({ query: featuredPostsQuery, tags: ['post'] }),
    sanityFetch<Category[]>({ query: allCategoriesQuery, tags: ['category'] }),
    sanityFetch<Post[]>({
      query: category ? postsByCategoryQuery : allPostsQuery,
      params: category ? { categorySlug: category } : {},
      tags: ['post'],
    }),
  ])

  const heroPost = !category ? featured[0] : null
  const restFeatured = !category ? featured.slice(1) : []

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero — Featured Post */}
      {heroPost && (
        <section className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-10 items-center">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Featured
              </span>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {heroPost.title}
              </h1>
              {heroPost.excerpt && (
                <p className="text-gray-500 text-lg leading-relaxed">{heroPost.excerpt}</p>
              )}
              <div className="flex items-center gap-3 text-sm text-gray-400">
                {heroPost.author?.name && <span>By {heroPost.author.name}</span>}
                <span>·</span>
                <span>
                  {new Date(heroPost.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </span>
                {heroPost.readingTime && (
                  <>
                    <span>·</span>
                    <span>{heroPost.readingTime} min read</span>
                  </>
                )}
              </div>
              <Link
                href={`/blog/${heroPost.slug.current}`}
                className="mt-2 inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors w-fit"
              >
                Read Article →
              </Link>
            </div>
            {heroPost.mainImage && (
              <div className="relative w-full h-72 rounded-2xl overflow-hidden">
                <Image
                  src={urlFor(heroPost.mainImage).width(700).height(400).url()}
                  alt={heroPost.mainImage.alt ?? heroPost.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {category ? `Posts in: ${category}` : 'All Articles'}
          </h2>
          <Suspense>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>

        {/* More Featured */}
        {restFeatured.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {restFeatured.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-20">No posts found in this category yet.</p>
        )}

        {/* CTA Section */}
        <section className="mt-20 bg-orange-500 rounded-2xl px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to grow your restaurant?</h2>
          <p className="text-orange-100 mb-8 text-lg max-w-xl mx-auto">
            Join hundreds of restaurants using Orderlay to streamline operations and boost revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact-us"
              className="bg-white text-orange-500 font-semibold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors"
            >
              Book a Demo
            </Link>
            <Link
              href="/#get-started"
              className="border border-white text-white font-semibold px-8 py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
