"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoArrowBack, IoArrowForward, IoRefresh } from 'react-icons/io5';

function Footer() {
  const router = useRouter();
  const handleBackward = () => {
  router.back();
}
  const handleForward = () => {
  router.forward();
}

const handleRefreshPage = () => {
  router.refresh()
}

  return (
    <div className='z-20 sticky bottom-0 border bg-primary flex justify-center w-full mt-10 lg:hidden shadow-xl '>
      <div className='flex justify-between w-full'>
        <button className='bg-slate-500 p-2' onClick={handleBackward}><IoArrowBack size={28}/></button>
        <button onClick={handleRefreshPage}><IoRefresh size={28}/></button>
        <button onClick={handleForward}><IoArrowForward size={28}/></button>
      </div>
    </div>
  )
}

export default Footer