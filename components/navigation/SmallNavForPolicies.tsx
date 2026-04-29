"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SmallNavForPolicies() {
  const path = usePathname()
  return (
    <nav className='w-full'>
      <div className="container ">
        <div className='flex gap-[23px] border-b-[0.5px]  border-[rgba(174, 174, 211, 0.89)]'>
          <Link
            className={`${path === '/privacy-policy' ? 'border-b-[2px] border-[#F97316] ' : ''
              } text-slate-600 font-jakarta pb-[6px] text-xs md:text-base font-normal leading-[150%]`} href={'/privacy-policy'} >Privacy Policy</Link>
          <Link
            className={`${path === '/terms-condition' ? 'border-b-[2px] border-[#F97316] ' : ''
              } text-slate-600 font-jakarta pb-[6px] text-xs md:text-base font-normal leading-[150%]`}
            href={'/terms-condition'}
          >
            Terms & Conditions
          </Link>
          <Link
            className={`${path === '/cookie-policy' ? 'border-b-[2px] border-[#F97316] ' : ''
              } text-slate-600 font-jakarta pb-[6px] text-xs md:text-base font-normal leading-[150%]`} href={'/cookie-policy'}>Cookie Policy</Link>
        </div>
      </div>
    </nav>
  )
}

export default SmallNavForPolicies
