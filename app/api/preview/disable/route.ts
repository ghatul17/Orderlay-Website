import { disableDraftMode } from '@/sanity/lib/preview'

export async function GET() {
  return disableDraftMode()
}
