'use client'

import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt ?? ''}
            width={800}
            height={450}
            className="rounded-lg w-full object-cover"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
    callout: ({ value }) => {
      const styles: Record<string, string> = {
        info: 'bg-blue-50 border-blue-400 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-400 text-yellow-800',
        tip: 'bg-green-50 border-green-400 text-green-800',
        success: 'bg-emerald-50 border-emerald-400 text-emerald-800',
      }
      const icons: Record<string, string> = {
        info: 'ℹ️', warning: '⚠️', tip: '💡', success: '✅',
      }
      const style = styles[value.type ?? 'info']
      return (
        <div className={`my-6 border-l-4 px-5 py-4 rounded-r-lg ${style}`}>
          <span className="mr-2">{icons[value.type ?? 'info']}</span>
          {value.text}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-semibold font-jakarta mt-10 mb-4 text-gray-900 leading-[1.2]">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold font-jakarta mt-8 mb-3 text-gray-900 leading-[1.25]">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-2 text-gray-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base leading-7 text-gray-700 mb-4">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-orange-400 pl-5 italic text-gray-600 my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-4 text-gray-700">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-orange-600 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target={value?.blank ? '_blank' : '_self'}
        rel={value?.blank ? 'noopener noreferrer' : undefined}
        className="text-orange-500 underline underline-offset-2 hover:text-orange-600"
      >
        {children}
      </a>
    ),
  },
}

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-lg max-w-none">
      <PortableText value={value} components={components} />
    </div>
  )
}
