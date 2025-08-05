"use client";
import { deleteById } from "@/actions/deleteFromDb";
import React, { startTransition, useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const ButtonDelete = ({ id, session, setOptimisticData }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirm = () => {
    setIsClicked(false);
    setShowConfirmation(false);
  };


  const handelDelete = async (id) => {
    startTransition(() => {
      setOptimisticData(id) // Optimistic UI update
    });

    const res = await deleteById(id)
    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setShowConfirmation(false)
  }

  return (
    <>
      <form
        title="Delete"
        className="flex justify-center items-center transition-all rounded-full"
        onMouseLeave={() => setIsClicked(false)}
      >
        {/* <Toaster
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
        /> */}

        <button
          disabled={!session?.user?.isAdmin}
          type="button"
          title={!session?.user?.isAdmin ? "Don't have permission" : "Edit"}
          onClick={() => setIsClicked((prev) => !prev)}
        ></button>

        <button type="button" onClick={() => setShowConfirmation(true)}>
          <FaTrash />
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation &&
        createPortal(
          <div className="w-full h-full fixed inset-0 bg-black/80 flex justify-center items-center z-[9999]">
            <div className="bg-white text-black p-6 rounded-md shadow-lg w-[300px]">
              <p className="text-center text-sm mb-4">
                {"Are you sure you want to delete this item?"}
              </p>
              <div className="w-full flex justify-between gap-4">
                <button

                  type="button"
                  onClick={handleShowConfirm}
                  className={` bg-gray-400 rounded-md  w-full text-white`}
                >
                  No
                </button>
                <form className="w-full">
                  <button
                    type="button"
                    onClick={() => handelDelete(id)}

                    className={` rounded-md bg-red-500 px-4 py-2 text-white w-full hover:bg-red-700`}
                  >
                    Yes
                  </button>
                </form>
              </div>
            </div>

          </div>,

          document.body
        )}
    </>
  );
};

export default ButtonDelete;
