"use client";
import { deleteById } from "@/actions/deleteFromDb";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const ButtonEditAndCancel = ({ link, id,pending, session }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirm = () => {
    setIsClicked(false);
    setShowConfirmation(false);
  };


  const deleteUserById = async (id) => {
    setShowConfirmation(false);
    await deleteById(id);
  };

  return (
    <form action={deleteUserById.bind(null, id)} 
      className="relative z-0 border"
      onMouseLeave={() => setIsClicked(false)} // Hide when mouse leaves entire area
    >
      <button
      disabled={!session?.user?.isAdmin}
      type="button"
      title={!session?.user?.isAdmin ? "Don't have permission" : 'Edit'}
        onClick={() => setIsClicked((prev) => !prev)}
        className={`relative hover:text-blue-500 ${!session?.user?.isAdmin ? 'opacity-50 cursor-not-allowed' :''}`}
        // Show on hover over button
      >
        <BsThreeDots size={24} />
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute bg-primary border border-secondary shadow-sm p-2 flex gap-2 justify-items-center items-center rounded-md transition-opacity duration-200 ease-out z-40 right-0 top-4 max-md:right-0 ${
          isClicked ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onMouseEnter={() => setIsClicked(true)}
      >
        <Link
          href={link}
          className="border bg-primary border-secondary px-2 py-1 rounded-md hover:bg-tertiary hover:text-secondarytext text-sm"
        >
          Edit
        </Link>
        <button
           type="button"
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 text-secondarytext px-2 py-1 rounded-md hover:bg-tertiary hover:text-secondarytext text-sm"
        >
          Cancel
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-secondary bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-primary p-6 rounded-md shadow-lg">
            <p className="text-center text-sm mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-between gap-4">
              <button
                 type="button"
                onClick={handleShowConfirm}
                className="bg-gray-400  rounded-md hover:bg-gray-600 w-full text-secondarytext"
              >
                No
              </button>
       
                <button disabled={pending} className="rounded-md  bg-red-500 px-4 py-2 text-secondarytext w-full hover:bg-red-700">
                {pending ? "Deteting..." : "Yes"}
                </button>
            
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default ButtonEditAndCancel;
