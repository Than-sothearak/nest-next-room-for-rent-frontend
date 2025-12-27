"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import ChooseSingleImageFile from '../ChooseSingleImage'
import { IoMdClose } from 'react-icons/io'

const ProfileUser = ({ currentUser, isCollapsed, session }) => {
     const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="relative">
         
                <button
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <Image
                    width={44}
                    height={44}
                    alt="user"
                    className="h-11 w-11 rounded-full object-cover"
                    src={
                      currentUser?.imageUrl ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }
                  />
                  <div>
                    <h1 className="text-sm font-bold">{currentUser?.username}</h1>
                    <p className="text-xs">
                      {session?.user?.isAdmin ? "Admin" : "User"}
                    </p>
                  </div>
                </button>
          

                 {/* Profile Dropdown */}
                    {isProfileOpen && (
                      <div className="absolute w-96 top-14 right z-50">
                        <div className="bg-slate-100 shadow-lg border border-slate-300 rounded-lg p-4 absolute top-1 left-0 w-full max-w-xs z-50">
                          <button
                            onClick={() => setIsProfileOpen(false)}
                            className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full"
                          >
                            <IoMdClose size={20} />
                          </button>
              
                          <div className="flex flex-col items-center gap-2 pt-4">
                            <p>{session?.user?.email}</p>
              
                            <ChooseSingleImageFile
                              imageUrl={
                                currentUser?.imageUrl ||
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                              }
                            />
              
                            <p className="text-2xl">Hi, {currentUser?.username}!</p>
              
                            <Link
                              href={`/dashboard/users/${currentUser?.id}`}
                              className="bg-slate-200 hover:bg-slate-300  w-full text-center flex gap-2 justify-center items-center border border-slate-300 p-4 rounded-xl cursor-pointer"
                            >
                              <p>Edit your account information</p>
                            </Link>
              
                          
                          </div>
                        </div>
                      </div>
                    )}
              
      
      </div>
  )
}

export default ProfileUser