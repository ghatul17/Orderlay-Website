import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'

const categoryColorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
  teal: 'bg-teal-100 text-teal-700',
}

export function PostCard({ post }: { post: Post }) {
  const category = post.categories?.[0]
  const badgeClass = categoryColorMap[category?.color ?? 'blue']

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      {post.mainImage && (post.mainImage as any)?.asset && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={urlFor(post.mainImage).width(600).height(340).url()}
            alt={post.mainImage.alt ?? post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {category && (
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`}>
              {category.title}
            </span>
          )}
          {post.featured && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700">
              Featured
            </span>
          )}
        </div>
        <h2 className="font-semibold text-gray-900 text-lg leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          {post.readingTime && <span>{post.readingTime} min read</span>}
        </div>
      </div>
    </Link>
  )
}
