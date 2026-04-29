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
        <div className="w-full sm:w-[48%] lg:w-[31%] flex flex-col border border-[#E5E5E5] p-6 rounded-xl gap-6 bg-white">
            <div className={`flex flex-col flex-1 ${isBottom ? 'order-last' : ''}`}>
                {!isBottom ? (
                    <div className="flex flex-col gap-3 h-full">
                        <h6 className="text-[#8B90A1] font-semibold text-[12px] font-jakarta uppercase tracking-wider">{tag}</h6>
                        <h4 className="text-[#1F2937] font-semibold text-[18px] md:text-[20px] leading-[1.4] tracking-[-0.3px] font-jakarta">{title}</h4>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 h-full">
                        <h3 className="text-[#1F2937] font-jakarta font-semibold text-[24px] md:text-[28px] leading-[1.3] tracking-[-0.4px]">{title}</h3>
                        <p className="text-[#545A70] font-jakarta font-normal text-[16px] leading-[1.6]">{description}</p>
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
