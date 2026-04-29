'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/sanity/lib/types'

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'all'

  function handleSelect(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleSelect('all')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
          active === 'all'
            ? 'bg-orange-500 text-white border-orange-500'
            : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => handleSelect(cat.slug.current)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            active === cat.slug.current
              ? 'bg-orange-500 text-white border-orange-500'
              : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'
          }`}
        >
          {cat.title}
        </button>
      ))}
    </div>
  )
}
