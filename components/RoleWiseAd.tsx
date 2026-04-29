import Image from 'next/image';
import React, { ReactNode } from 'react'
import RoleWiseImage from './svgs/RoleWise';

interface IfeatureList {
    title: string;
    svg: ReactNode;
    description: string;
}
interface IroleWiseAd {
    role: string;
    title: string;
    description: string;
    features: IfeatureList[],
    image: string;
    isImageAtLeft: boolean
}


const ListView = ({ title, svg, description }: IfeatureList) => {
    return (
        <div className="flex w-full justify-start items-start flex-shrink-0 gap-[19.6px] lg:gap-8"
>
            <div className="flex aspect-square  w-6 md:w-10  h-auto lg:w-12   justify-center items-center flex-shrink-0 rounded-[4px] lg:rounded-xl bg-primary "
            >
                <div className='w-[16px] md:w-[20px] lg:w-[24px] h-auto aspect-square'>
                  {svg}
                </div>
               
            </div>
            <div className="grid grid-cols-1 gap-2 md:gap-4">
                <h4 className="text-[#040815] font-jakarta text-[14px] sm:text-[17px] md:text-[20px] lg:text-2xl font-semibold ">
                    {title}
                </h4>
                <p className="text-[#596780] font-jakarta text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-normal ">
                    {description}
                </p>
            </div>
        </div>
    );
};



function RoleWiseAd({ role, title, description, features, image, isImageAtLeft }: IroleWiseAd) {
    return (
        <div className={`flex flex-col md:flex-row justify-between items-center  gap-[20px] lg:gap-[80px] xl:gap-24  ${isImageAtLeft && `md:flex-row-reverse`}`}>
            <div className='flex-1 w-full md:w-[65%] lg:w-[68%]'>
                <h6 className="text-primary font-jakarta text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px] lg:text-2xl font-semibold leading-[150%] tracking-[-0.28px] md:tracking-[-0.48px]"
                >{role}</h6>
                <h3 className="text-[#040815] font-jakarta text-lg xs:text-xl sm:text-3xl md:text-[30px] lg:text-[37px] xl:text-[44px] font-bold leading-[150%] tracking-[-0.72px] lg:tracking-[-1.32px] mt-2 md:mt-6"
                >{title}</h3>
                <p className="text-[#596780] font-jakarta text-xs sm:text-[14px] md:text-[16px]  lg:text-xl font-normal leading-[140%] mt-4 lg:mt-8"
                >{description}</p>
                <div className=' grid grid-cols-1 gap-6 mt-10 lg:mt-14'>
                {features?.map(feature => {
                    return <ListView {...feature} />
                })}
                </div>
            </div>
          
            <div className='aspect-square w-[80%] md:w-[35%]  lg:w-[32%] h-min overflow-hidden'>
                 <RoleWiseImage
                   image={image}
                   />
            </div>
        </div>
    )
}

export default RoleWiseAd