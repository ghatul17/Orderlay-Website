import React from 'react'
import Image from 'next/image'
function ReviewImage() {
  return (
    <Image
      src='/asset/review.svg'
      alt='staff memeber management'
      height={1000}
      width={1000}
      className='w-full h-auto'
    />   
)
}

export default ReviewImage
