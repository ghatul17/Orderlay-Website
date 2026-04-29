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
        <div className="flex w-full justify-start items-start flex-shrink-0 gap-4">
            <div className="flex aspect-square w-12 h-12 justify-center items-center flex-shrink-0 rounded-xl bg-primary">
                <div className='w-6 h-6 aspect-square'>
                  {svg}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2">
                <h4 className="text-[#040815] font-jakarta text-[18px] md:text-[20px] font-semibold leading-[1.4]">
                    {title}
                </h4>
                <p className="text-[#596780] font-jakarta text-[16px] font-normal leading-[1.6]">
                    {description}
                </p>
            </div>
        </div>
    );
};



function RoleWiseAd({ role, title, description, features, image, isImageAtLeft }: IroleWiseAd) {
    return (
        <div className={`flex flex-col md:flex-row justify-between items-center gap-12 lg:gap-16 ${isImageAtLeft && `md:flex-row-reverse`}`}>
            <div className='flex-1 w-full md:w-[65%] lg:w-[68%]'>
                <h6 className="text-primary font-jakarta text-[16px] md:text-[18px] font-semibold leading-[1.5] tracking-[-0.3px]">
                  {role}
                </h6>
                <h3 className="text-[#040815] font-jakarta text-[28px] md:text-[32px] lg:text-[36px] font-semibold leading-[1.2] tracking-[-0.5px] mt-3">
                  {title}
                </h3>
                <p className="text-[#596780] font-jakarta text-[16px] font-normal leading-[1.6] mt-4 max-w-[600px]">
                  {description}
                </p>
                <div className='grid grid-cols-1 gap-6 mt-8'>
                {features?.map((feature, i) => {
                    return <ListView key={i} {...feature} />
                })}
                </div>
            </div>

            <div className='aspect-square w-[80%] md:w-[35%] lg:w-[32%] h-min overflow-hidden'>
                 <RoleWiseImage
                   image={image}
                   />
            </div>
        </div>
    )
}

export default RoleWiseAd