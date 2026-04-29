/**
 * Draft / Preview mode helpers.
 *
 * Call `enableDraftMode()` from a Route Handler to enter preview,
 * and `disableDraftMode()` to exit. Both require SANITY_API_READ_TOKEN.
 *
 * Usage:
 *   GET /api/preview/enable?secret=<SANITY_PREVIEW_SECRET>&slug=/blog/my-post
 *   GET /api/preview/disable
 */
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET

export async function enableDraftMode(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') ?? '/blog'

  if (PREVIEW_SECRET && secret !== PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  const dm = await draftMode()
  dm.enable()
  redirect(slug)
}

export async function disableDraftMode() {
  const dm = await draftMode()
  dm.disable()
  redirect('/')
}
