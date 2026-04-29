import React from 'react'
import Faqs from "@/components/Faqs";
import { Heading } from './WhySection';

export interface faq{
     question:string;
     answer:string;
}
export interface FaqProps{
     faqsList:faq[]
}

function FaqSection({
  faqsList
}:FaqProps) {
  return (
    <section id="community" className="w-full py-[40px] md:py-[80px] bg-[#FBFBFB] ">
        <div className="container flex flex-col justify-center md:items-center gap-3">
          
         <Heading
            mainHeading='FAQ'
            supporrtHeading1='Orderlay simplifies food ordering. Scan, order, enjoy. Fast, easy, seamless experience. '
            supporrtHeading2='No more long lines or confusing interfaces.'
          />
          
          <div className=" flex flex-col gap-2 ">
            {faqsList?.map(faq => {
              return <Faqs {...faq} />
            })}
          </div>
        </div>
      </section>
  )
}

export default FaqSection
