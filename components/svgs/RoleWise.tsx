import Image from 'next/image'
import React from 'react'

function RoleWiseImage({ image }: { image: string }) {
    return (

        <Image
            src={image}
            alt='Restaurant role illustration'
            height={1000}
            width={1000}
            className='w-full h-auto'
        />

    )
}

export default RoleWiseImage


