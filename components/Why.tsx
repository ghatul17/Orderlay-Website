import React, { ReactNode } from 'react'

interface IWhy {
  initialIcon: ReactNode
  iconTitle: string
  title: string
  description: string
  Image: React.ComponentType<any>
  isCol?: boolean
}

function Why({
  initialIcon,
  iconTitle,
  title,
  description,
  Image,
  isCol = false,
}: IWhy) {
  return (
    <div className={`grid bg-white rounded-xl gap-6 p-6 ${
      isCol ? 'grid-cols-1 md:grid-rows-[1fr,auto]' : 'grid-cols-1 md:grid-cols-2 md:col-span-2'
    }`}>
      <div className="flex flex-col items-start">

        <div className="flex items-center gap-2 bg-[#F3F4F6] px-3 py-2 h-fit w-fit rounded-lg">
          <div className="aspect-square w-6 h-auto">
            {initialIcon}
          </div>
          <h6 className="font-jakarta text-sm md:text-base font-semibold text-[#1F2937]">{iconTitle}</h6>
        </div>

        <h4 className="m-0 text-[#1F2937] font-jakarta text-[20px] md:text-[24px] font-semibold leading-[1.3] mt-4">
          {title}
        </h4>

        <p className="text-[#374151] text-start font-jakarta text-[16px] font-normal leading-[1.6] mt-3">
          {description}
        </p>
      </div>

      <div className="w-full h-full">
        <Image />
      </div>
    </div>
  )
}

export default Why
