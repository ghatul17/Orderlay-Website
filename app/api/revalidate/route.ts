import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Called by a Sanity webhook on document publish/unpublish
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const type: string = body?._type

  if (type === 'post') revalidateTag('post')
  if (type === 'author') revalidateTag('author')
  if (type === 'category') revalidateTag('category')

  return NextResponse.json({ revalidated: true, type })
}
