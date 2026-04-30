import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/client'
import { Badge } from '@/components/ui/badge'
import { SITE_URL } from '@/constants/site'
import {
  postBySlugQuery,
  allPostSlugsQuery,
  relatedPostsQuery,
  mostPopularPostsQuery,
} from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { PostCard } from '@/components/blog/PostCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>({
    query: allPostSlugsQuery,
    tags: ['post'],
  })
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<Post>({ query: postBySlugQuery, params: { slug }, tags: ['post'] })

  if (!post) return { title: 'Post Not Found' }

  const metaTitle = post.seo?.metaTitle ?? post.title
  const metaDescription = post.seo?.metaDescription ?? post.excerpt ?? ''
  const ogImageUrl = post.seo?.ogImage && (post.seo.ogImage as any)?.asset
    ? urlFor(post.seo.ogImage).width(1200).height(630).url()
    : post.mainImage && (post.mainImage as any)?.asset
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined

  return {
    title: { absolute: `${metaTitle} | Orderlay Blog` },
    description: metaDescription,
    keywords: post.seo?.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      url: `${SITE_URL}/blog/${slug}`,
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await sanityFetch<Post>({ query: postBySlugQuery, params: { slug }, tags: ['post'] })

  if (!post) notFound()

  const categorySlugs = post.categories?.map((c) => c.slug.current) ?? []

  const [related, popular] = await Promise.all([
    categorySlugs.length > 0
      ? sanityFetch<Post[]>({
          query: relatedPostsQuery,
          params: { currentId: post._id, categorySlugs },
          tags: ['post'],
        })
      : Promise.resolve([] as Post[]),
    sanityFetch<Post[]>({ query: mostPopularPostsQuery, tags: ['post'] }),
  ])

  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.mainImage && (post.mainImage as any)?.asset ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
            datePublished: post.publishedAt,
            dateModified: post._updatedAt,
            author: {
              '@type': 'Person',
              name: post.author?.name,
              ...(post.author?.bio && { description: post.author.bio }),
            },
            publisher: {
              '@type': 'Organization',
              name: 'Orderlay',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/asset/logo.svg` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug.current}` },
          }),
        }}
      />
      {/* Article Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-[760px] mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-wrap gap-2 mb-6">
            {post.categories?.map((cat) => (
              <Link key={cat._id} href={`/blog?category=${cat.slug.current}`}>
                <Badge variant="secondary" className="hover:bg-orange-100 hover:text-orange-700 transition-colors duration-200 cursor-pointer">
                  {cat.title}
                </Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold font-jakarta text-gray-900 leading-[1.2] tracking-[-0.5px] mb-6">{post.title}</h1>
          {post.excerpt && (
            <p className="text-[18px] font-jakarta text-gray-500 leading-[1.6] mb-8">{post.excerpt}</p>
          )}
          <div className="flex items-center gap-4">
            {post.author?.image && (post.author.image as any)?.asset && (
              <Image
                src={urlFor(post.author.image).width(44).height(44).url()}
                alt={post.author.name}
                width={44}
                height={44}
                className="rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-gray-800">{post.author?.name}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </time>
                {post.readingTime && (
                  <>
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Image */}
      {post.mainImage && (post.mainImage as any)?.asset && (
        <div className="max-w-[900px] mx-auto px-6 pt-8">
          <div className="relative w-full h-80 md:h-[460px] rounded-xl overflow-hidden">
            <Image
              src={urlFor(post.mainImage).width(1000).height(560).url()}
              alt={post.mainImage.alt ?? post.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </div>
        </div>
      )}

      {/* Content + Sidebar */}
      <div className="max-w-[1100px] mx-auto px-6 py-12 md:py-16 grid lg:grid-cols-[1fr_300px] gap-12">
        {/* Body */}
        <article>
          {post.body && <PortableTextRenderer value={post.body} />}

          {/* Author Bio */}
          {post.author?.bio && (
            <div className="mt-14 p-6 bg-white rounded-xl border border-gray-100 flex gap-5 items-start">
              {post.author.image && (post.author.image as any)?.asset && (
                <Image
                  src={urlFor(post.author.image).width(60).height(60).url()}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover shrink-0"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                {post.author.role && (
                  <p className="text-xs text-orange-500 mb-2">{post.author.role}</p>
                )}
                <p className="text-sm text-gray-500 leading-relaxed">{post.author.bio}</p>
              </div>
            </div>
          )}

          {/* Related Posts */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-[24px] md:text-[28px] font-semibold font-jakarta text-gray-900 leading-[1.3] mb-6">Related Articles</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {related.map((p) => (
                  <PostCard key={p._id} post={p} />
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="flex flex-col gap-8">
          {/* CTA */}
          <div className="bg-orange-500 rounded-xl p-6 text-white text-center sticky top-6">
            <h3 className="text-lg font-bold mb-2">Grow your restaurant</h3>
            <p className="text-orange-100 text-sm mb-5">
              See how Orderlay helps restaurants increase orders and cut costs.
            </p>
            <Link
              href="/contact-us"
              className="block bg-white text-orange-500 font-semibold py-2.5 rounded-xl hover:bg-orange-50 transition-colors text-sm"
            >
              Book a Free Demo
            </Link>
          </div>

          {/* Most Popular */}
          {popular.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">Most Popular</h3>
              <ul className="flex flex-col gap-4">
                {popular.slice(0, 4).map((p, i) => (
                  <li key={p._id}>
                    <Link
                      href={`/blog/${p.slug.current}`}
                      className="flex gap-3 items-start group"
                    >
                      <span className="text-2xl font-bold text-gray-200 leading-none w-6 shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:text-orange-500 transition-colors leading-snug font-medium">
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
