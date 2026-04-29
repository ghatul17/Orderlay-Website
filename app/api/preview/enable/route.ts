import { enableDraftMode } from '@/sanity/lib/preview'

export async function GET(request: Request) {
  return enableDraftMode(request)
}
