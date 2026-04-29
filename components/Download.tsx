import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Download({ image, title, text, bgColor, type, imageForSmall }: { image: string, title: string, text: string, bgColor: string, type?: string, imageForSmall?: string }) {
  return (
    <section id='join' className={`w-full bg-[${bgColor}] py-8 md:py-16`}>
      <div className="container relative">
        <div className={`w-full ${type === 'bigImage' ? 'bg-white px-6 md:px-10' : ''} flex flex-col md:flex-row items-center md:items-start gap-6 rounded-xl`}>

          <div className={`md:flex-1 ${type === 'bigImage' && 'py-8 md:py-12'}`}>
            {type !== 'bigImage' && (
              <h6 className="text-primary font-semibold text-[16px] md:text-[18px] leading-[1.5] tracking-[-0.3px] font-jakarta">
                Download Our App
              </h6>
            )}
            <h3 className="text-[#334155] font-semibold text-[28px] md:text-[32px] lg:text-[36px] leading-[1.2] tracking-[-0.4px] font-jakarta mt-3">
              {title}
            </h3>
            <p className="text-[#374151] font-normal text-[16px] leading-[1.6] font-jakarta mt-4 max-w-[600px]">
              {text}
            </p>

            <div className="flex mt-8 gap-4">
              <Link
                href={'https://play.google.com/store/apps/details?id=com.orderlayapp&pli=1'}
                className="w-[150px] h-12 flex items-center justify-center border border-black bg-black rounded-xl hover:opacity-90 transition-opacity duration-200"
              >
                <Image
                  height={300}
                  width={300}
                  alt="Play store link"
                  src={'/asset/play-store.png'}
                  className="h-auto w-auto px-4"
                />
              </Link>

              <Link
                href={'https://apps.apple.com/us/app/orderlay/id6504802718'}
                className="w-[150px] h-12 flex items-center justify-center border border-black rounded-xl hover:opacity-90 transition-opacity duration-200"
              >
                <Image
                  height={300}
                  width={300}
                  alt="App store link"
                  src={'/asset/app-store.png'}
                  className="h-auto w-auto px-4"
                />
              </Link>
            </div>
          </div>

          <div className='mt-0 md:mt-0 md:flex-1 w-full'>
            {type !== 'bigImage' ? (
              <>
                <Image
                  src={image}
                  alt='Download Illustration'
                  height={1000}
                  width={1000}
                  className='hidden md:flex w-full h-auto'
                />
                <Image
                  src={imageForSmall || ''}
                  alt='Download Illustration'
                  height={1000}
                  width={1000}
                  className='flex md:hidden w-full h-auto'
                />
              </>
            ) : (
              <>
                <Image
                  src={image}
                  alt='Download Illustration'
                  height={1000}
                  width={1000}
                  className='hidden md:flex h-auto mx-auto md:absolute bottom-0 lg:right-14 xl:right-14 lg:max-h-[110%] xl:max-h-[125%] 2xl:max-h-[130%] w-auto'
                />
                <Image
                  src={imageForSmall || ''}
                  alt='Download Illustration'
                  height={1000}
                  width={1000}
                  className='flex md:hidden w-full h-auto'
                />
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default Download;
