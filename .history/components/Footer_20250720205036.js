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
        <button className='hover:bg-slate-200 p-4' onClick={handleBackward}><IoArrowBack size={28}/></button>
        <button className='hover:bg-slate-200 p-4' onClick={handleRefreshPage}><IoRefresh size={28}/></button>
        <button className='hover:bg-slate-200 p-4' onClick={handleForward}><IoArrowForward size={28}/></button>
      </div>
    </div>
  )
}

export default Footer