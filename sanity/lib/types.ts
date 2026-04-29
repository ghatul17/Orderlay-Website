import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export interface SanitySlug {
  current: string
}

export interface SanityImage extends SanityImageSource {
  alt?: string
  caption?: string
}

export interface Author {
  name: string
  slug: SanitySlug
  image: SanityImage
  role?: string
  bio?: string
}

export interface Category {
  _id: string
  title: string
  slug: SanitySlug
  description?: string
  color?: string
}

export interface PostSEO {
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  ogImage?: SanityImage
}

export interface Post {
  _id: string
  title: string
  slug: SanitySlug
  excerpt?: string
  mainImage?: SanityImage
  author: Author
  categories?: Category[]
  publishedAt: string
  body?: PortableTextBlock[]
  featured?: boolean
  readingTime?: number
  views?: number
  seo?: PostSEO
}
