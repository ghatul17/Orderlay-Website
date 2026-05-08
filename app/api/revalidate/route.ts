import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const type: string = body?._type

  if (type === 'post') revalidateTag('post')
  if (type === 'author') revalidateTag('author')
  if (type === 'category') revalidateTag('category')

  return NextResponse.json({ revalidated: true, type })
}
