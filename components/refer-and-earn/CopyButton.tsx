'use client'

export default function CopyButton({ value }: { value: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(value)}
      className="shrink-0 h-9 px-4 rounded-lg bg-primary text-white text-xs font-semibold font-jakarta hover:opacity-90 transition-opacity"
    >
      Copy
    </button>
  )
}
