import React, { ReactNode } from 'react';

interface IWhy {
  initialIcon: ReactNode;
  iconTitle: string;
  title: string;
  description: string;
  Image: React.ComponentType<any>;
  isCol?: boolean;
}

function Why({
  initialIcon,
  iconTitle,
  title,
  description,
  Image,
  isCol = false
}: IWhy) {
  return (
    <div className={`grid bg-white rounded-lg gap-6 p-6 sm:p-8 md:p-10 lg:p-12 ${
      isCol ? 'grid-cols-1 md:grid-rows-[1fr,auto]' : 'grid-cols-1 md:grid-cols-2 md:col-span-2'
    }`}>
      <div className="flex flex-col items-start">
        
        <div className="flex items-center gap-[10px] bg-[#F3F4F6] p-[10px] h-fit w-fit rounded-[4px]">
          <div className="aspect-square w-[20px] xs:w-[24px] sm:w-[30px] h-auto">
            {initialIcon}
          </div>
          <h6 className="h6">{iconTitle}</h6>
        </div>
        
        <h4 className="m-0 text-[#1F2937] font-jakarta text-base xs:text-lg sm:text-xl lg:text-2xl font-bold lg:leading-9 mt-[14px] sm:mt-[17px]  md:mt-[20] lg:mt-6">
          {title}
        </h4>
        
        <p className="text-[#374151] text-start font-jakarta text-xs sm:text-sm md:text-base font-normal lg:leading-[160%] mt-[7px]  sm:mt-[9px]  md:mt-[11]  lg:mt-3">
          {description}
        </p>
      </div>

      <div className="w-full h-full">
        <Image />
      </div>
    </div>
  );
}

export default Why;
