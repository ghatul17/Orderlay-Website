import React from 'react'

function Header({subHeader, mainHeader}:{subHeader:string,mainHeader:string}) {
    return (
        <div className='w-full bg-[#FFEDD5]'>
        <div className='container flex flex-col justify-center h-[150px] md:h-[180px] lg:h-[200px] xl:h-[250px] 2xl:h-[350px] gap-[10px] md:gap-0 mt-[15px] md:mt-[25px]  lg:mt-[30px] xl:mt-[40] 2xl:mt-[50] 3xl:mt-[55px] mb-[44px]'>
            <h6 className='text-gray-600  text-base md:text-lg lg:text-xl leading-[160%] font-[400] font-jakarta'>{subHeader}</h6>
            <h1 className='text-gray-900 text-[32px] md:text-3xl lg:text-4xl xl:text-6xl leading-[150%] font-[700] font-jakarta '>{mainHeader}</h1>
        </div>
        </div>
    )
}

export default Header
