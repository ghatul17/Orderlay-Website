import Image from 'next/image';
import React from 'react';

interface IDashboardDemo {
    tag?: string;
    description?: string;
    title: string;
    image: string;
    isBottom: boolean;
}

function DashboardDemoItem({tag, title, image, isBottom, description}: IDashboardDemo) {
    return (
        <div className="w-full sm:w-[48%] lg:w-[30.5%] flex flex-col border border-[#E5E5E5] p-6 md:p-8 rounded-2xl gap-6 lg:gap-8">
            <div className={`flex flex-col flex-1 ${isBottom ? 'order-last' : ''}`}>
                {!isBottom ? (
                    <div className="flex flex-col gap-3 md:gap-4 h-full">
                        <h6 className="text-[#8B90A1] font-bold text-[8px]  md:text-[11px] font-jakarta uppercase">{tag}</h6>
                        <h4 className="text-[#1F2937] font-semibold text-base md:text-xl leading-normal tracking-[-0.4px] font-inter">{title}</h4>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 md:gap-4 h-full">
                        <h3 className="text-[#000] font-jakarta font-semibold text-2xl md:text-[32px] leading-normal tracking-[-0.64px]">{title}</h3>
                        <p className="text-[#545A70] font-jakarta font-medium text-xs md:text-base leading-6">{description}</p>
                    </div>
                )}
            </div>
            <div className="">
                <Image
                    src={image}
                    alt={tag || title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    );
}

export default DashboardDemoItem;
