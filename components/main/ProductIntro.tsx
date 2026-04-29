"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


export interface productIntroProps{
  introHead1?:string;
  introHead2?:string;
  introdescription?:string;
  showDownLoad:boolean;
  heading1Color?:string;
  heading2Color?:string;
}
function ProductIntro({
  introHead1,
  introHead2,
  introdescription,
  showDownLoad,
  heading1Color,
  heading2Color
}:productIntroProps) {

  return (
    <section className="w-full">
      <div className="container pt-12 md:pt-16 lg:pt-24 pb-8 lg:pb-16">
        <div className="w-full max-w-[900px] mx-auto text-start md:text-center">

          <h1 className="mb-6 text-[36px] sm:text-[40px] md:text-[44px] lg:text-[48px] font-semibold leading-[1.15] tracking-[-0.5px] font-jakarta">
            <span className={heading1Color || "text-primary"}>{introHead1}</span>
            <br />
            <span className={heading2Color || "text-gray-800"}>{introHead2}</span>
          </h1>

          <p className="text-slate-500 font-jakarta text-[16px] md:text-[16px] font-normal leading-[1.6] mb-8 max-w-[600px] mx-auto">
            {introdescription}
          </p>

         { showDownLoad && <div className="flex flex-col xs:flex-row justify-start md:justify-center gap-4">
            {/* Play Store Link */}
            <Link
              href={'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'}
              className="w-full md:w-[180px] h-12 flex items-center justify-center border border-black bg-black rounded-xl hover:opacity-90 transition-opacity duration-200"
            >
              <Image
                height={300}
                width={300}
                alt="Play store link"
                src={'/asset/play-store.png'}
                className="h-[37px] w-auto py-1  xs:py-[4px] md:px-5 md:py-0  md:h-auto xs:w-auto"
              />
            </Link>

            {/* App Store Link */}
            <Link
              href={'https://apps.apple.com/us/app/orderlay/id6504802718'}
              className="w-full md:w-[180px] h-12 flex items-center justify-center border border-black rounded-xl hover:opacity-90 transition-opacity duration-200"
            >
              <Image
                height={300}
                width={300}
                alt="App store link"
                src={'/asset/app-store.png'}
                className="h-[37px] w-auto py-1  xs:py-[4px] md:px-5 md:py-0  sm:h-auto xs:w-auto"
              />
            </Link>
          </div>}

        </div>

      </div>
    </section>
  )
}

export default ProductIntro
