import React, { ReactNode } from 'react'
import Link from 'next/link'

interface IWhy {
  initialIcon: ReactNode
  iconTitle: string
  title: string
  description: string
  Image: React.ComponentType<any>
  isCol?: boolean
  href?: string
}

function Why({
  initialIcon,
  iconTitle,
  title,
  description,
  Image,
  isCol = false,
  href,
}: IWhy) {
  const inner = (
    <>
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 bg-[#F3F4F6] px-3 py-2 h-fit w-fit rounded-lg transition-colors duration-200 group-hover:bg-[#FEF0E7]">
          <div className="aspect-square w-6 h-auto">
            {initialIcon}
          </div>
          <h6 className="font-jakarta text-sm md:text-base font-semibold text-[#1F2937]">{iconTitle}</h6>
        </div>

        <h4 className="m-0 text-[#1F2937] font-jakarta text-[20px] md:text-[24px] font-semibold leading-[1.3] mt-4 group-hover:text-[#F97316] transition-colors duration-200">
          {title}
        </h4>

        <p className="text-[#374151] text-start font-jakarta text-[16px] font-normal leading-[1.6] mt-3">
          {description}
        </p>

        {href && (
          <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold font-jakarta text-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Learn more
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        )}
      </div>

      <div className="w-full h-full">
        <Image />
      </div>
    </>
  )

  const className = `group grid bg-white rounded-xl gap-6 p-6 border border-transparent transition-all duration-300 hover:border-[#F97316]/20 hover:shadow-md hover:-translate-y-[2px] ${
    isCol ? 'grid-cols-1 md:grid-rows-[1fr,auto]' : 'grid-cols-1 md:grid-cols-2 md:col-span-2'
  }`

  if (href) {
    return <Link href={href} className={className}>{inner}</Link>
  }

  return <div className={className}>{inner}</div>
}

export default Why
