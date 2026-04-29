import React from 'react'
import Image from 'next/image'
function MenuImage() {
  return (
    <Image
      src='/asset/menu.svg'
      alt='staff memeber management'
      height={1000}
      width={1000}
      className='w-full h-auto'
    />   
)
}

export default MenuImage
