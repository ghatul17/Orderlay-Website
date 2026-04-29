import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'

const categoryColorMap: Record<string, { bg: string; text: string }> = {
  blue:   { bg: 'bg-blue-100',   text: 'text-blue-700' },
  green:  { bg: 'bg-green-100',  text: 'text-green-700' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  red:    { bg: 'bg-red-100',    text: 'text-red-700' },
  teal:   { bg: 'bg-teal-100',   text: 'text-teal-700' },
}

function CategoryBadge({ post }: { post: Post }) {
  const cat = post.categories?.[0]
  if (!cat) return null
  const colors = categoryColorMap[cat.color ?? 'blue'] ?? categoryColorMap.blue
  return (
    <span className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
      {cat.title}
    </span>
  )
}

function PostMeta({ post }: { post: Post }) {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <span>
        {new Date(post.publishedAt).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric',
        })}
      </span>
      {post.readingTime && (
        <>
          <span>·</span>
          <span>{post.readingTime} min read</span>
        </>
      )}
    </div>
  )
}

// Large hero card — spans 2 cols, has big image
function BentoHero({ post }: { post: Post }) {
  const hasImage = post.mainImage && (post.mainImage as any)?.asset
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group col-span-2 row-span-2 relative rounded-3xl overflow-hidden bg-gray-900 flex flex-col justify-end min-h-[420px] shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {hasImage ? (
        <>
          <Image
            src={urlFor(post.mainImage!).width(900).height(560).url()}
            alt={post.mainImage!.alt ?? post.title}
            fill
            priority
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-700" />
      )}
      <div className="relative p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <CategoryBadge post={post} />
          {post.featured && (
            <span className="text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-orange-500 text-white">
              Featured
            </span>
          )}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-orange-200 transition-colors line-clamp-3">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 max-w-xl">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-3 mt-1">
          {post.author?.name && (
            <span className="text-xs text-gray-400">By {post.author.name}</span>
          )}
          <PostMeta post={post} />
        </div>
      </div>
    </Link>
  )
}

// Medium card — 1 col with image
function BentoMedium({ post }: { post: Post }) {
  const hasImage = post.mainImage && (post.mainImage as any)?.asset
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group col-span-1 rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col border border-gray-100"
    >
      {hasImage && (
        <div className="relative w-full h-44 overflow-hidden">
          <Image
            src={urlFor(post.mainImage!).width(500).height(300).url()}
            alt={post.mainImage!.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <div className={`flex flex-col flex-1 p-5 gap-3 ${!hasImage ? 'justify-between' : ''}`}>
        {!hasImage && (
          <div className="h-20 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center text-3xl mb-1">
            📖
          </div>
        )}
        <CategoryBadge post={post} />
        <h2 className="font-semibold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-3">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        <PostMeta post={post} />
      </div>
    </Link>
  )
}

// Small compact card — text only, no image
function BentoSmall({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group col-span-1 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col gap-3"
    >
      <CategoryBadge post={post} />
      <h2 className="font-semibold text-gray-900 leading-snug group-hover:text-orange-500 transition-colors line-clamp-3">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
        <PostMeta post={post} />
        <span className="text-orange-400 text-sm group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  )
}

// Wide card — spans 2 cols, horizontal layout
function BentoWide({ post }: { post: Post }) {
  const hasImage = post.mainImage && (post.mainImage as any)?.asset
  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group col-span-2 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex overflow-hidden"
    >
      {hasImage && (
        <div className="relative w-52 shrink-0 overflow-hidden">
          <Image
            src={urlFor(post.mainImage!).width(400).height(300).url()}
            alt={post.mainImage!.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="200px"
          />
        </div>
      )}
      <div className="flex flex-col justify-center p-6 gap-3 flex-1">
        <CategoryBadge post={post} />
        <h2 className="font-bold text-gray-900 text-xl leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
        )}
        <PostMeta post={post} />
      </div>
    </Link>
  )
}

export function BentoGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  // Bento layout patterns repeat every 6 posts:
  // [0] Hero (2x2), [1] Medium, [2] Medium
  // [3] Wide (2x1), [4] Small
  // [5+] falls back to medium cards in 3-col grid

  const hero = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="space-y-4">
      {/* First bento block: hero + 2 mediums */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        <BentoHero post={hero} />
        {rest[0] && <BentoMedium post={rest[0]} />}
        {rest[1] && <BentoMedium post={rest[1]} />}
      </div>

      {/* Second row: wide + small */}
      {rest.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest[2] && <BentoWide post={rest[2]} />}
          {rest[3] && <BentoSmall post={rest[3]} />}
        </div>
      )}

      {/* Remaining posts: 3-col grid of medium cards */}
      {rest.length >= 5 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.slice(4).map((post) => (
            <BentoMedium key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
