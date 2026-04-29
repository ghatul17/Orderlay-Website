"use client"
import React from 'react'
import DownloadNow from '../DownloadBtn'
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
      <div className="container pt-12 sm:pt-16 md:pt-24 lg:pt-28 xl:pt-32 2xl:pt-36 3xl:pt-40 lg:pb-20">
        <div className="w-full max-w-[950px] mx-auto text-start md:text-center">
        
          <h1 className="mb-3 sm:mb-4 md:mb-6 lg:mb-8 text-3xl sm:text-[48px] md:text-[60px] lg:text-[72px] font-bold leading-[36px] sm:leading-[58px] md:leading-[74px] lg:leading-[90px] tracking-[-0.72px] font-jakarta">
            <span className={heading1Color || "text-primary"}>{introHead1}</span>
            <br />
            <span className={heading2Color || "text-gray-800"}>{introHead2}</span>
          </h1>

          <p className="text-slate-500 font-jakarta text-[14px] sm:text-lg md:text-xl lg:text-2xl font-normal leading-[22px] sm:leading-[24px] md:leading-[26px] lg:leading-[30px] mb-6 md:mb-6 lg:mb-[30px] xl:mb-[35px] 2xl:mb-[40px]">
            {introdescription}
          </p>

         { showDownLoad && <div className="flex flex-col xs:flex-row justify-start md:justify-center gap-2 sm:gap-4 md:gap-6">
            {/* Play Store Link */}
            <Link
              href={'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'}
              className="w-full md:w-[200px] md:h-[56px] lg:w-[170px]  lg:h-[50px] xl:w-[180px]  xl:h-[53px] 2xl:w-[190px]  2xl:h-[55px] 3xl:w-[200px] 3xl:h-[60px] flex items-center justify-center border border-black bg-black rounded-md hover:scale-105 transition-transform"
            //  className="w-full md:w-[189px] h-auto flex items-center justify-center border bg-black border-black rounded-md hover:scale-105 transition-transform"
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
              // className="w-full md:w-[189px] h-auto flex items-center justify-center border border-black rounded-md hover:scale-105 transition-transform"
              className="w-full md:w-[200px] md:h-[56px] lg:w-[170px]  lg:h-[50px] xl:w-[180px]  xl:h-[53px] 2xl:w-[190px]  2xl:h-[55px] 3xl:w-[200px] 3xl:h-[60px] flex items-center justify-center border border-black  rounded-md hover:scale-105 transition-transform"

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
