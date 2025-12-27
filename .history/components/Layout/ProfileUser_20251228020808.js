"use client"
import Image from 'next/image'
import React from 'react'

const ProfileUser = () => {
  return (
      <>
           {!isCollapsed && (
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
              )}
      
      </>
  )
}

export default ProfileUser