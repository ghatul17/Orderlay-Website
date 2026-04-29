import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Download({ image, title, text, bgColor, type, imageForSmall }: { image: string, title: string, text: string, bgColor: string, type?: string, imageForSmall?:string }) {
  return (
    <section id='join' className={`w-full bg-[${bgColor}] py-16 sm:py-20 md:py-28 lg:py-32 xl:py-36`}>
      <div className={`container relative  `}>
         <div className={`w-full ${type === 'bigImage' ? 'bg-[#fff] px-4 py-2  md:pl-10' : ''}  flex flex-col md:flex-row items-center md:items-start gap-[32px] lg:gap-[40px]  rounded-[12px]`}>
        <div className={`md:flex-1 md:pr-2 ${type === 'bigImage' && 'py-[30px] xs:py-[50px] sm:py-[60px] md:py-[70px] lg:py-[80px]'}`}>
          {type !== 'bigImage' && <h6 className="text-primary font-[600] text-[12px] xs:text-[14px] sm:text-[16px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[1.5] tracking-[-0.4px] font-jakarta">
            Download Our App
          </h6>}
          <h3 className="text-[#334155] font-[700] text-[24px] xs:text-[28px] sm:text-[32px] md:text-[32px] lg:text-[40px]  leading-[34px] xs:leading-[38px]   md:leading-[45px] lg:leading-[56px]   font-jakarta mt-[14px]  sm:mt[20px] lg:mt-6">
            {title}
          </h3>
          <p className="text-[#374151] font-[400] text-[9px] xs:text-[12px] sm:text-[15px] md:text-[14px] lg:text-[16px]  leading-[160%] font-jakarta mt-3">
            {text}
          </p>

          {/* <div className=''>
                  <Link target='_blank' href={'https://apps.apple.com/us/app/orderlay/id6504802718'}>
                    <Image
                        src='/asset/app.svg'
                        alt='App Store'
                        height={1000}
                        width={1000}
                        className='h-[38px] xs:h-[42px] sm:h-[48px] md:h-[52px] lg:h-[58px]  xl:h-[62px]  w-auto '
                    />
                              </Link>        
                               <Link target='_blank' href={'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'}>
                    <Image
                        src='/asset/play.svg'
                        alt='Play Store'
                        height={300}
                        width={300}
                        className='h-[38px] xs:h-[42px] sm:h-[48px] md:h-[52px] lg:h-[58px]  xl:h-[62px]  w-auto '
                    />
                    </Link>

                </div> */}

          <div className="flex mt-[25px] xs:mt-[35px] sm:mt-[38px] md:mt-[40px] lg:mt-12 gap-[16px] md:gap-[30px] lg:gap-[24px] xl:gap-[24px]">
            {/* Play Store Link */}
            <Link
              href={'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'}
              className="w-[126px]   h-[36px] md:w-[150px] md:h-[40px]  xl:w-[180px]  xl:h-[53px] 2xl:w-[190px]  2xl:h-[55px] 3xl:w-[200px] 3xl:h-[60px] flex items-center justify-center border border-black bg-black rounded-md hover:scale-105 transition-transform"
            //  className="w-full md:w-[189px] h-auto flex items-center justify-center border bg-black border-black rounded-md hover:scale-105 transition-transform"
            >
              <Image
                height={300}
                width={300}
                alt="Play store link"
                src={'/asset/play-store.png'}
                className="h-[37px] w-auto py-[5px] sm:py-[6px]  md:px-5 md:py-0  md:h-auto xs:w-auto"
              />
            </Link>

            {/* App Store Link */}
            <Link
              href={'https://apps.apple.com/us/app/orderlay/id6504802718'}
              // className="w-full md:w-[189px] h-auto flex items-center justify-center border border-black rounded-md hover:scale-105 transition-transform"
              className="w-[126px]  h-[36px] md:w-[150px] md:h-[40px] xl:w-[180px]  xl:h-[53px] 2xl:w-[190px]  2xl:h-[55px] 3xl:w-[200px] 3xl:h-[60px] flex items-center justify-center border border-black  rounded-md hover:scale-105 transition-transform"

            >
              <Image
                height={300}
                width={300}
                alt="App store link"
                src={'/asset/app-store.png'}
                className="h-[37px] w-auto py-[5px] sm:py-[6px] md:px-5 md:py-0  sm:h-auto xs:w-auto"
              />
            </Link>
          </div>
        </div>
        <div className='mt-0 md:mt-0 md:flex-1 w-full'>
          {type !== 'bigImage' ? 
          <>
          <Image
            src={image}
            alt='Download Illustration'
            height={1000}
            width={1000}
            className='hidden  md:flex w-full h-auto'
          />
           <Image
            src={imageForSmall || ''}
            alt='Download Illustration'
            height={1000}
            width={1000}
            className='flex  md:hidden w-full h-auto'
          />

</>
            :
            <>

            <Image
              src={image}
              alt='Download Illustration'
              height={1000}
              width={1000}
              className='hidden  md:flex h-auto mx-auto  md:absolute bottom-0 lg:right-14 xl:right-14 lg:max-h-[110%] xl:max-h-[125%] 2xl:max-h-[130%] w-auto'
            />


<Image
            src={imageForSmall || ''}
            alt='Download Illustration'
            height={1000}
            width={1000}
            className='flex  md:hidden w-full h-auto'
          />
            </>
          }
        </div>
        </div>
      </div>
    </section>
  );
}

export default Download;
