import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'

function CategoryBadge({ post }: { post: Post }) {
  const cat = post.categories?.[0]
  if (!cat) return null
  return (
    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-gray-700 border border-gray-200">
      {cat.title}
    </span>
  )
}

export default async function BlogSection() {
  const posts = await sanityFetch<Post[]>({
    query: allPostsQuery,
    tags: ['post'],
  })

  if (!posts || posts.length === 0) return null

  const [hero, ...rest] = posts
  const sidePosts = rest.slice(0, 2)

  const heroHasImage = hero.mainImage && (hero.mainImage as any)?.asset

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
              From the Blog
            </p>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Guides From Our Team
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Expert tips on restaurant operations, marketing, and growth to help your business thrive.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors shrink-0"
          >
            View all Posts <span>→</span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Hero post */}
          <Link
            href={`/blog/${hero.slug.current}`}
            className="group relative rounded-2xl overflow-hidden bg-gray-100 min-h-[380px] flex flex-col justify-end"
          >
            {heroHasImage ? (
              <>
                <Image
                  src={urlFor(hero.mainImage!).width(700).height(500).url()}
                  alt={hero.mainImage!.alt ?? hero.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600" />
            )}

            {/* Featured badge */}
            {hero.featured && (
              <div className="absolute top-4 right-4">
                <span className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-white/90 text-gray-800">
                  Featured
                </span>
              </div>
            )}

            <div className="relative p-6 flex flex-col gap-2">
              <div className="flex gap-2 flex-wrap">
                <CategoryBadge post={hero} />
              </div>
              <h3 className="text-xl font-bold text-white leading-snug group-hover:text-orange-200 transition-colors line-clamp-2">
                {hero.title}
              </h3>
              {hero.excerpt && (
                <p className="text-gray-300 text-sm line-clamp-2">{hero.excerpt}</p>
              )}
              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <span className="text-white text-sm">↗</span>
              </div>
            </div>
          </Link>

          {/* Side posts */}
          <div className="flex flex-col gap-4">
            {sidePosts.map((post) => {
              const hasImage = post.mainImage && (post.mainImage as any)?.asset
              return (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug.current}`}
                  className="group relative rounded-2xl overflow-hidden bg-gray-100 flex-1 min-h-[178px] flex flex-col justify-end"
                >
                  {hasImage ? (
                    <>
                      <Image
                        src={urlFor(post.mainImage!).width(600).height(240).url()}
                        alt={post.mainImage!.alt ?? post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
                  )}

                  <div className="relative p-5 flex flex-col gap-1.5">
                    <div className="flex gap-2 flex-wrap">
                      <CategoryBadge post={post} />
                    </div>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-white leading-snug group-hover:text-orange-200 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-300 text-xs mt-1 line-clamp-1">{post.excerpt}</p>
                        )}
                      </div>
                      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-colors">
                        <span className="text-white text-xs">↗</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}

            {/* If less than 2 side posts, show a CTA card */}
            {sidePosts.length < 2 && (
              <Link
                href="/blog"
                className="group flex-1 min-h-[178px] rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-orange-300 hover:bg-orange-50 transition-colors"
              >
                <span className="text-2xl">✍️</span>
                <span className="text-sm font-medium text-gray-500 group-hover:text-orange-500 transition-colors">
                  More articles coming soon
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
