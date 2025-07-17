"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';

function Footer() {
  const router = useRouter();
  const handleBackward = () => {
  router.back();
}
  const handleForward = () => {
  router.forward();
}

  return (
    <div className='z-20 sticky bottom-0 border bg-primary flex justify-center p-4 w-full mt-10 lg:hidden shadow-xl '>
      <div className='flex justify-between w-full'>
        <button onClick={handleBackward}><IoArrowBack size={28}/></button>
        <button onClick={handleForward}><IoArrowForward size={28}/></button>
      </div>
    </div>
  )
}

export default Footer