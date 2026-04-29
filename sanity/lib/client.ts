import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  // Only set token for server-side draft/preview fetching
  token: process.env.SANITY_API_READ_TOKEN,
})

export function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}) {
  return client.fetch<T>(query, params, {
    next: { revalidate: 3600, tags },
  })
}
