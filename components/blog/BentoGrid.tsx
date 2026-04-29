import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import { Separator } from '@/components/ui/separator'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

function CategoryLabel({ post }: { post: Post }) {
  const cat = post.categories?.[0]
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
      {cat?.title ?? 'Blog'}
    </p>
  )
}

// Large hero — 2 cols, image top, text bottom
function BentoHero({ post }: { post: Post }) {
  const hasImage = post.mainImage && (post.mainImage as any)?.asset
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {hasImage && (
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={urlFor(post.mainImage!).width(900).height(400).url()}
            alt={post.mainImage!.alt ?? post.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>
      )}
      {!hasImage && (
        <div className="w-full h-44 bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-orange-300" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
        </div>
      )}
      <div className="p-7 flex flex-col gap-2">
        <CategoryLabel post={post} />
        <h2 className="text-xl font-semibold font-jakarta text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          {post.author?.name && <span>{post.author.name}</span>}
          {post.author?.name && <span>·</span>}
          <span>{formatDate(post.publishedAt)}</span>
          {post.readingTime && <><span>·</span><span>{post.readingTime} min read</span></>}
        </div>
      </div>
    </Link>
  )
}

// Standard card — 1 col
function BentoCard({ post }: { post: Post }) {
  const hasImage = post.mainImage && (post.mainImage as any)?.asset
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {hasImage && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={urlFor(post.mainImage!).width(500).height(280).url()}
            alt={post.mainImage!.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className="p-6 flex flex-col gap-2 flex-1">
        <CategoryLabel post={post} />
        <h2 className="font-semibold font-jakarta text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-3 flex-1">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="mt-auto">
          <Separator className="mb-3" />
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{formatDate(post.publishedAt)}</span>
            {post.readingTime && (
              <span className="text-xs text-gray-400">{post.readingTime} min read</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

// Wide card — 2 cols, horizontal layout
function BentoWide({ post }: { post: Post }) {
  const hasImage = post.mainImage && (post.mainImage as any)?.asset
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex"
    >
      {hasImage && (
        <div className="relative w-56 shrink-0 overflow-hidden">
          <Image
            src={urlFor(post.mainImage!).width(400).height(300).url()}
            alt={post.mainImage!.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="224px"
          />
        </div>
      )}
      <div className="flex flex-col justify-center p-7 gap-2 flex-1">
        <CategoryLabel post={post} />
        <h2 className="font-semibold font-jakarta text-gray-900 text-xl leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
          {post.author?.name && <><span>{post.author.name}</span><span>·</span></>}
          <span>{formatDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}

export function BentoGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  const [first, ...rest] = posts

  return (
    <div className="flex flex-col gap-4">
      {/* Row 1: hero (2col) + card (1col) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BentoHero post={first} />
        {rest[0] && <BentoCard post={rest[0]} />}
      </div>

      {/* Row 2: card (1col) + wide (2col) */}
      {rest.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest[1] && <BentoCard post={rest[1]} />}
          {rest[2] && <BentoWide post={rest[2]} />}
        </div>
      )}

      {/* Row 3+: 3-col grid */}
      {rest.length >= 4 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.slice(3).map((post) => (
            <BentoCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
