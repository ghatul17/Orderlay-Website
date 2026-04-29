import React from 'react'

function InitialIntro({text}:{text:string}) {
  return (
    
       <div className='container my-4 md:my-6 lg:my-8'>
       <p className='font-jakarta text-gray-800 font-[400] text-base md:text-lg lg:text-xl  leading-[160%]'>{text}</p>
  
    </div>
  )
}

export default InitialIntro
