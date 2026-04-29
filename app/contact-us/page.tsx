import ContactForm from '@/components/forms/ContactForm'
import EmailIcon from '@/components/svgs/EmailIcon'
import Facebook from '@/components/svgs/Facebook'
import Insta from '@/components/svgs/Insta'
import LocationIcon from '@/components/svgs/LocationIcon'
import Mail1 from '@/components/svgs/Mail1'
import PhoneIcon from '@/components/svgs/PhoneIcon'
import Twitter from '@/components/svgs/Twitter'
import { ReactQueryProvider } from '@/reacr-query/QueryProvider'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'


export const metadata: Metadata = {
  title: "Contact Orderlay — Restaurant Management Support",
  description:
    "Get in touch with the Orderlay team. We're here to help you set up and grow your restaurant business.",
  alternates: { canonical: "/contact-us" },
};

function page() {
  return (
    <div className='w-full'>
       <div className="container  my-[41px] sm:my-[50px] md:my-[60px] lg:my-[70px] xl:my-[80px] 2xl:my-[100px] 3xl:my-[120px]">
      {/* initial question */}
      <div className="flex flex-col md:items-center justify-center gap-2 sm:gap-3 mb-[30px] md:mb-[40px] lg:mb-[45px] xl:mb-[50px] 2xl:mb-[55px] 3xl:mb-[60px]"
      >
        <h1
         className="font-jakarta  text-left md:text-center text-[30px] md:text-[40px] lg:text-[45px] xl:text-[50px] 2xl:text-[55px]  text-[#374151] font-bold leading-[120%]  capitalize"
        >Contact Us</h1>
        <p
         className="lg:px-2 text-gray-800 lg:text-[#557087] text-left md:text-center font-normal font-jakarta text-[14px]  md:text-2xl leading-[160%] mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14 mt-2 lg:mt-3"
        >Contact us for support, solutions, and advice to help grow your restaurant and simplify your operations.</p>
      </div>
      {/*  flex box  */}
       <div className='flex flex-col md:flex-row bg-[#F1F5F9] rounded-[6px] md:rounded-[12px]'>
          <div className='w-full md:w-[47%] relative overflow-hidden bg-orange-400 pt-[49.2px] pl-[31px] md:pl-[35px] lg:ol-[40px] xl:pl-[45px] 3xl:pl-[49.2px] pb-[53px] md:pb-[55px] lg:pb-[65px] xl:pb-[75px] 2xl:pb-[85px] 3xl:pb-[95px] rounded-[12px]'>
            <h3 className='text-white font-jakarta text-2xl  lg:text-[28px] 3xl:text-[32px] text-[600]'>Contact Information</h3>
            <p className='text-stone-50 font-jakarta text-base md:text-xl lg:text-2xl   text-[400] mt-[9px] md:mt-[12px] xl:mt-[15px] 3xl:mt-[19px]'>Say something to start a live chat!</p>

            {/* derails */}
            <div className='mt-[44px] sm:mt-[50px] md:mt-[60px] lg:mt-[80px] xl:mt-[100px] 2xl:mt-[120px] 3xl:mt-[140px] flex flex-col gap-[24px] sm:gap-[30px] md:gap-[40px] lg:gap-[45px] xl:gap-[50px] 2xl:gap-[55px] 3xl:gap-[66px]'>
                <div className='flex items-start gap-[24px] lg:gap-[31px]'> <div className=' h-[18px] w-[18px] md:h-[24px] md:w-[24px] lg:h-[30px] lg:w-[30px] text-white '><PhoneIcon/></div> <Link href={'tel:9801753818'} className='text-white text-xs sm:text-base md:text-lg lg:text-xl text-[600] font-jakarta'>+977 9801753818</Link></div>
                <div className='flex items-start gap-[24px] lg:gap-[31px]'> <div className=' h-[18px] w-[18px] md:h-[24px] md:w-[24px] lg:h-[30px] lg:w-[30px] '><EmailIcon/></div> <Link href={'mailto:hello@orderlay.app'} className='text-white text-xs sm:text-base md:text-lg lg:text-xl  text-[600] font-jakarta'>hello@orderlay.app</Link></div>
                <div className='flex items-start gap-[24px] lg:gap-[31px]'> <div className=' h-[18px] w-[18px] md:h-[24px] md:w-[24px] lg:h-[30px] lg:w-[30px] '><LocationIcon/></div> <p className='text-white text-xs sm:text-base md:text-lg lg:text-xl  text-[600] font-jakarta'>11-17 York Street, <br/>
                Sydney NSW 2000</p></div>
            </div>

            {/* social icons */}
            <div className='flex mt-[44px] sm:mt-[50px] md:mt-[60px] lg:mt-[80px] xl:mt-[100px] 2xl:mt-[120px] 3xl:mt-[140px] gap-[9px] md:gap-[12px]' >
             <Link target='_blank' href={'https://www.facebook.com/profile.php?id=61557919740911'} className='h-[24px] w-[24px] lg:h-[30px] lg:w-[35px]'>
               <Facebook/>
               </Link>
             <Link target='_blank'  href={'https://www.instagram.com/orderlay.app/'} className='h-[24px] w-[24px]  lg:h-[30px] lg:w-[35px]'> <Insta/></Link>
             <Link target='_blank'  href={'https://www.tiktok.com/@orderlay'} className='h-[24px] w-[24px]  lg:h-[30px] lg:w-[35px]'> <Twitter/></Link>
             <Link target='_blank'  href={'mailto:hello@orderlay.com'} className='h-[24px] w-[24px]  lg:h-[30px] lg:w-[35px]'> <Mail1/></Link>
            </div>
            <div className="absolute  aspect-square h-[210px] sm:h-[220px] md:h-[230px] lg:h-[250px] xl:h-[280px] 2xl:[310px] 3xl:h-[330px] bg-circle rounded-full right-0 bottom-0 translate-x-1/2 translate-y-1/2"></div>

           </div>
           <div className='w-full md:w-[53%] pt-[20px]  md:pt-[14px] lg:pt-[16px] xl:pt-[18px] 2xl:pt-[20px] 3xl:pt-[23px] lg:pr-[20px] px-[10px] sm:pl-[16px] md:pl-[20px] lg:pl-[25px] xl:pl-[28px] 2xl:pl-[30px] 3xl:pl-[36px] pb-[53px] md:pb-[65px] lg:pb-[75px] 2xl:pb-[80px] 3xl:pb-[91px]'>
               <ReactQueryProvider>
               <ContactForm/>
               </ReactQueryProvider>
           </div>
       </div>
      
       </div>
    </div>
  )
}

export default page
