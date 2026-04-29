import React from 'react'
import * as BrowseAndOrderImage from '@/public/BrowserAndOrder.svg'
import Image from 'next/image'

function BrowseAndOrder() {
  return (
       <Image
         src={'/BrowseAndOrder.svg'}
         height={600}
         width={600}
         alt=''
       />
  )
}

export default BrowseAndOrder
