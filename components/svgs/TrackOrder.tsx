import Image from 'next/image'
import React from 'react'

function TrackOrder() {
  return (
     <Image
              src={'/TrackYourOrder.svg'}
              height={600}
              width={600}
              alt=''
              className='w-full h-auto'
            />
  )
}

export default TrackOrder
