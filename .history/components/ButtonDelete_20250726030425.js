"use client";
import { deleteById } from "@/actions/deleteFromDb";
import React, { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

const ButtonDelete = ({ id, session }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleShowConfirm = () => {
    setIsClicked(false);
    setShowConfirmation(false);
  };

  const deleteUserById = deleteById.bind(null, id)

  const [state, formAction, isPending] = useActionState(deleteUserById, undefined,
    id);
  useEffect(() => {
    if (state?.errors || state?.success) {
      const notify = () => toast(state.message);
      notify();
      setShowConfirmation(false)
    }
  }, [state]);
  return (
    <>
      <form
    
        className="flex justify-center items-center text-slate-200 transition-all opacity-0 group-hover:opacity-100
                    duration-300 transform hover:scale-125 bg-black/70 p-4 rounded-full"
        onMouseLeave={() => setIsClicked(false)}
      >
          {state?.success && (
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
                      background: "oklch(79.2% 0.209 151.711)",
                      color: "#fff",
                    },
                  }}
                />
        
              )}
        
              {state?.errors && (
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
                      background: "oklch(70.4% 0.191 22.216)",
                      color: "#fff",
                    },
                  }}
                />
              )}
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
                {isPending ? "Deleting item..." : "Are you sure you want to delete this item?"}
              </p>
              <div className="w-full flex justify-between gap-4">
                <button
                 disabled={isPending}
                  type="button"
                  onClick={handleShowConfirm}
                  className={`${isPending ? 'opacity-40 cursor-wait ' : 'hover:bg-gray-600'} bg-gray-400 rounded-md  w-full text-white`}
                >
                  No
                </button>
                <form action={formAction} className="w-full">
                  <button

                    disabled={isPending}

                    className={`${isPending ? 'opacity-40 cursor-wait' : ''} rounded-md bg-red-500 px-4 py-2 text-white w-full hover:bg-red-700`}
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
