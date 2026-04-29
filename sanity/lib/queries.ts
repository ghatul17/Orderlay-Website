import { groq } from 'next-sanity'

// Reusable fragments
const authorFragment = groq`
  author->{
    name,
    slug,
    image,
    role
  }
`

const categoryFragment = groq`
  categories[]->{
    title,
    slug,
    color
  }
`

const postCardFragment = groq`
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readingTime,
  featured,
  views,
  ${authorFragment},
  ${categoryFragment}
`

// A. All posts — sorted by publishedAt desc
export const allPostsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
    ${postCardFragment}
  }
`

// B. Single post by slug
export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postCardFragment},
    body,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogImage
    }
  }
`

// C. Featured posts
export const featuredPostsQuery = groq`
  *[_type == "post" && featured == true && defined(publishedAt)] | order(publishedAt desc) [0..2] {
    ${postCardFragment}
  }
`

// D. Posts by category slug
export const postsByCategoryQuery = groq`
  *[_type == "post" && defined(publishedAt) && $categorySlug in categories[]->slug.current]
  | order(publishedAt desc) {
    ${postCardFragment}
  }
`

// E. Most popular posts (by views)
export const mostPopularPostsQuery = groq`
  *[_type == "post" && defined(publishedAt)] | order(views desc) [0..4] {
    ${postCardFragment}
  }
`

// F. Related posts (same category, exclude current)
export const relatedPostsQuery = groq`
  *[
    _type == "post" &&
    defined(publishedAt) &&
    _id != $currentId &&
    count((categories[]->slug.current)[@ in $categorySlugs]) > 0
  ] | order(publishedAt desc) [0..2] {
    ${postCardFragment}
  }
`

// G. All categories
export const allCategoriesQuery = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    slug,
    description,
    color
  }
`

// H. All post slugs (for static generation)
export const allPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`
