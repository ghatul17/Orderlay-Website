import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className='w-full bg-[#1A202C] pt-[60px] pb-[30px]'>
        <div className='container grid grid-cols-1 gap-8'>
            <div>
                <Image
                   src={'/asset/logowhite.svg'}
                   alt='orderlay logo'
                   height={200}
                   width={200}
                   className=' w-full h-auto max-w-[89.015px] mx-auto md:mx-0'
                />
            </div>
            <div className='flex flex-col gap-4 md:flex-row  items-center justify-between'>
                <div>
                    <p className='text-white '>&copy;2024 Orderlay. All rights reserved. </p>
                </div>
                <div className=''>
                    <ul className='list-none items-center justify-center flex flex-wrap gap-6 capitalize text-[#A0ABC0] font-jakarta text-sm'>
                        <li><Link href="/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
                        <li><Link href="/terms-condition" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link></li>
                        <li><Link href="/cookie-policy" className="hover:text-white transition-colors duration-200">Cookie Policy</Link></li>
                        <li><Link target='_blank' href="https://support.orderlay.app/en" className="hover:text-white transition-colors duration-200">Support Articles</Link></li>
                        <li><Link href="/contact-us" className="hover:text-white transition-colors duration-200">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </div>      
    </section>
  )
}

export default Footer
