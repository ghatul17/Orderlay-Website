import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function PostCard({ post }: { post: Post }) {
  const category = post.categories?.[0]

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
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
            <Badge variant="secondary">{category.title}</Badge>
          )}
          {post.featured && (
            <Badge variant="outline">Featured</Badge>
          )}
        </div>
        <h2 className="font-semibold font-jakarta text-gray-900 text-lg leading-snug group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="mt-auto pt-3">
          <Separator className="mb-3" />
          <div className="flex items-center justify-between text-xs text-gray-400">
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
      </div>
    </Link>
  )
}
