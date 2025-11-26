"use client";
import { deleteById } from "@/actions/deleteFromDb";
import Link from "next/link";
import React, { startTransition, useActionState, useEffect, useOptimistic, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const ButtonViewAndDelete = ({
  link,
  id,
  setOptimisticData
}) => {
  const [isClicked, setIsClicked] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] =useState(false)

  const handleShowConfirm = () => {
    setIsClicked(false);
    setShowConfirmation(false);
  };


  const handelDelete = async (id) => {
    setIsLoading(true)
    startTransition(() => {
      setOptimisticData(id) // Optimistic UI update
    });

    const res = await deleteById(id)
    if (res?.success) {
      toast.success(res.message);
      setIsLoading(false)
    } else {
      toast.error(res.message);
      setIsLoading(false)
    }

    setShowConfirmation(false)
  }
  return (



    <form
      className="justify-end flex items-center gap-2"
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "oklch(62.3% 0.214 259.815)",
            color: "#fff",
          },
        }}
      />
      <div
        className={`flex gap-2 justify-items-center items-center rounded-md transition-opacity duration-200 ease-out max-sm:right-0 left-0 top-4 
        }`}
      >
        <Link
          href={link}
          className="bg-blue-600  text-primary border border-secondary px-2 py-1 rounded-md hover:bg-tertiary hover:text-secondarytext text-sm"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 text-secondarytext px-2 py-1 rounded-md hover:bg-tertiary hover:text-secondarytext text-sm"
        >
          Delete
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation &&
        createPortal(
          <div className="w-full h-full fixed inset-0 bg-black/80 flex justify-center items-center">
            <div className="bg-white text-black p-6 rounded-md w-[300px]">
              <p className="text-center text-sm mb-4">
                {isLoading ? "Deleting..." : "Are you sure to delete this item?"}
              </p>
              <div className="w-full flex justify-between gap-4">
                <button
                  disabled={isLoading}
                  type="button"
                  onClick={handleShowConfirm}
                  className={`${isLoading ? 'cursor-wait' : ''} 'hover:bg-gray-600'} bg-gray-400 rounded-md  w-full text-white`}
                >
                  No
                </button>
                <form className="w-full">
                  <button
                    type="button"
                    onClick={() => handelDelete(id)}
                    disabled={isLoading}
                    className={` rounded-md bg-red-500 px-4 py-2 text-white w-full hover:bg-red-700 ${isLoading ? 'cursor-wait' : ''}`}
                  >
                    Yes
                  </button>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}
    </form>

  );
};

export default ButtonViewAndDelete;
