import React from 'react'
import Image from 'next/image'

function Day() {
  return (
    <div className="justify-center mx-auto pt-10">
      <h1 className='text-4xl font-bold mb-10 text-center'>Qube Day</h1>
      <Image src="/assets/kids10.webp" width='600' height='300' className='w-1/2 max-w-4xl mx-auto'/>
      <div className='bg-red-500 p-5'>
        <h2 className='text-4xl font-bold text-center inline-flex h-20 pt-2 overflow-x-hidden animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent will-change-transform'>
In a day at  The Qube, we...</h2>
      </div>

    </div>
  )
}

export default Day