import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { allPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import { Badge } from '@/components/ui/badge'

function CategoryBadge({ post }: { post: Post }) {
  const cat = post.categories?.[0]
  if (!cat) return null
  return (
    <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-200 text-[11px]">
      {cat.title}
    </Badge>
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
    <section className="py-8 md:py-16 bg-white">
      <div className="container">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-widest text-primary mb-3">
              From the Blog
            </p>
            <h2 className="text-[28px] md:text-[32px] lg:text-[36px] font-semibold font-jakarta text-gray-900 leading-[1.2] tracking-[-0.4px]">
              Guides From Our Team
            </h2>
            <p className="text-gray-500 font-jakarta text-[16px] leading-[1.6] mt-3 max-w-[600px]">
              Expert tips on restaurant operations, marketing, and growth to help your business thrive.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-gray-700 border border-gray-200 px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 shrink-0 cursor-pointer"
          >
            View all Posts
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Hero post */}
          <Link
            href={`/blog/${hero.slug.current}`}
            className="group relative rounded-xl overflow-hidden bg-gray-100 min-h-[380px] flex flex-col justify-end"
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
              <h3 className="text-[20px] md:text-[24px] font-semibold font-jakarta text-white leading-[1.3] group-hover:text-orange-200 transition-colors line-clamp-2">
                {hero.title}
              </h3>
              {hero.excerpt && (
                <p className="text-gray-300 text-[14px] leading-[1.5] line-clamp-2">{hero.excerpt}</p>
              )}
              <div className="absolute bottom-5 right-5 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17L17 7M7 7h10v10"/></svg>
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
                  className="group relative rounded-xl overflow-hidden bg-gray-100 flex-1 min-h-[178px] flex flex-col justify-end"
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
                        <h3 className="text-[16px] md:text-[18px] font-semibold font-jakarta text-white leading-[1.3] group-hover:text-orange-200 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        {post.excerpt && (
                          <p className="text-gray-300 text-[14px] mt-1 line-clamp-1">{post.excerpt}</p>
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
                className="group flex-1 min-h-[178px] rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-orange-300 hover:bg-orange-50 transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-orange-400 transition-colors duration-200" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                <span className="text-sm font-medium text-gray-500 group-hover:text-orange-500 transition-colors duration-200">
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
