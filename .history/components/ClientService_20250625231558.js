"use client";
import React, { useState } from 'react'
import { GiVacuumCleaner } from "react-icons/gi";
import { MdOutlineConstruction, MdOutlineLocalLaundryService } from "react-icons/md";
import { TbAirConditioningDisabled } from "react-icons/tb";
import ClientServiceForm from './ClientServiceForm';


const ClientService = ({isClicked, setIsClicked, booking, user}) => {
    const [serviceType, setServiceType] = useState()

  function handleClick(value) {
    setServiceType(value)
  setIsClicked(prev => !prev);
 
}

  return (
    <div className="mt-4 relative">
      <h1 className="text-xl font-bold">Service available</h1>
       <div className="mt-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
            type="button"
            className="relative border w-full justify-center items-center flex gap-4 p-4 bg-green-500 text-primary hover:bg-green-700 rounded-lg ">
              <div className="flex flex-col items-center gap-2">
                <GiVacuumCleaner size={60}/>
                <div>
                  <p className="text-lg font-bold">Cleaning room</p>
                </div>
              </div>

     <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white/80 hover:opacity-100 opacity-0 flex items-center justify-center text-black px-2 py-1 rounded-md ">
            <button 
            value="cleaning room"
            onClick={(e) => handleClick(e.target.value)}
            type='button' 
            className="p-2 bg-blue-500 rounded-md text-primary transition-all duration-300 transform  hover:scale-125">Requesting</button>
           
          </div>

          {/* <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white/80  flex items-center justify-center text-black px-2 py-1 rounded-md ">
            <p className="animate-bounce p-2 rounded-md">Padding...</p>
            <button type='button' className="absolute bottom-2 bg-red-500 p-2 rounded-md right-2 text-primary hover:bg-red-700">
              Cancel
            </button>
          </div> */}
    
           {/* <div className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-white/90  flex items-center justify-center text-black px-2 py-1 rounded-md ">
     <div className="flex items-center gap-2">
             <span className="relative flex size-3">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
      <span className="relative inline-flex size-3 rounded-full bg-green-600"></span>
    </span>
    <p className="text-lg font-bold">Accepted</p>
     </div>
          
          </div> */}
            </div>
    
     <button className="w-full justify-center items-center flex gap-4 p-4 bg-blue-500 text-primary hover:bg-blue-700 rounded-lg ">
              <div className="flex flex-col items-center gap-2">
                <MdOutlineLocalLaundryService size={60}/>
                <div>
                  <p className="text-lg font-bold">Laundry</p>
                </div>
              </div>
          
            </button>
    
             <button className="w-full justify-center items-center flex gap-4 p-4 bg-yellow-500 text-primary hover:bg-yellow-700 rounded-lg ">
              <div className="flex flex-col items-center gap-2">
                <TbAirConditioningDisabled size={60}/>
                <div>
                  <p className="text-lg font-bold">Clean air conditioner</p>
                </div>
              </div>
          
            </button>
    
             <button className="w-full justify-center items-center flex gap-4 p-4 bg-red-500 text-primary hover:bg-red-700 rounded-lg ">
              <div className="flex flex-col items-center gap-2">
                <MdOutlineConstruction size={60}/>
                <div>
                  <p className="text-lg font-bold">Comming soon</p>
                </div>
              </div>
          
            </button>
         
          </div>
          {isClicked && 
          <div className='absolute z-30 top-1/2 left-1/2 overflow-y-auto p-4 bg-white rounded-lg max-lg:w-full w-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-y-1/3 shadow-xl'>
            <ClientServiceForm serviceType={serviceType} user={user}/>
          </div>}

         
    </div>
    
  )
}

export default ClientService