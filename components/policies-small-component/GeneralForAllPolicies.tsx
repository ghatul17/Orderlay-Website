import React from 'react'
interface Igeneral {
    title: string;
    type?: string;
    paragraph?: string[];
    initialTitle?: string;
    lists?: { title: string, paragraph?: string, type?: string, subList?: { title: string, paragraph: string }[] }[]
}
function GeneralForAllPolicies({ title, type, paragraph, lists, initialTitle }: Igeneral) {

    if (type === 'paragraph') {
        return (
            <div className='container  font-jakarta  mb-[12px] md:mb-[18px] lg:mb-[30px] xl:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px]'>
                <h2 className="text-2xl lg:text-[30px]  xl:text-[25px] 2xl:text-[30px] 3xl:text-[36px] mb-[12px] font-[600] font-jakarta leading-[160%] text-gray-900 whitespace-break-spaces md:whitespace-pre">{title}</h2>
                <div className='flex flex-col gap-4'>
                    {paragraph?.map(text => {
                        return <p className=" text-[16px] md:text-[18px] font-[400]  font-jakarta leading-[160%] text-gray-800" key={text.slice(1, 100)}>{text}</p>
                    })}
                </div>

            </div>
        )
    }

    if (type === 'list') {
        return (
            <div className='container  font-jakarta  mb-[12px] md:mb-[18px] lg:mb-[30px] xl:mb-[40px] 2xl:mb-[50px] 3xl:mb-[60px]'>
                <h2 className="text-2xl lg:text-[30px] mb-[12px] xl:text-[25px] 2xl:text-[30px] 3xl:text-[36px] font-[600] font-jakarta leading-[160%] text-gray-900 whitespace-break-spaces md:whitespace-pre">{title}</h2>
                <p className='text-[16px] md:text-[18px] font-[400] mb-2 font-jakarta leading-[160%] text-gray-800'>{initialTitle}</p>
                <ol className=' list-disc flex  flex-col gap-4 list-outside ml-5'>
                    {lists?.map(list => {
                        if (list?.type === 'double') {
                            return <>
                                <li className='font-semibold text-[16px] md:text-[18px]  font-jakarta leading-[160%] text-gray-800' key={list.title.slice(1, 100) + list.paragraph?.slice(-10)}>{list?.title?.trim()}:</li>
                                <ol className=' list-disc flex  flex-col gap-4 list-outside ml-8'>
                                    {list?.subList?.map(subItem =>

                                        <li className=" text-[16px] md:text-[18px] font-[400] font-jakarta leading-[160%] text-gray-800" key={subItem.title.slice(1, 100)}><span className='font-bold'>{subItem.title?.trim()}{subItem.title && ': '}</span>{subItem.paragraph?.trim()}</li>

                                    )}
                                </ol>
                            </>
                        }
                        return <li className=" text-[16px] md:text-[18px] font-[400] font-jakarta leading-[160%] text-gray-800" key={list.title.slice(1, 100) + list.paragraph?.slice(-10)}><span className='font-bold'>{list.title?.trim()}{list.title&&': '}</span>{list.paragraph?.trim()}</li>
                    })}
                </ol>
                <p className=" text-[16px] md:text-[18px] font-bold font-jakarta leading-[160%] text-gray-700 mt-4">{paragraph}</p>
            </div>

        )
    }
}

export default GeneralForAllPolicies
