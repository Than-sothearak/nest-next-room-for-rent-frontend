"use client";
import { deleteById } from "@/actions/deleteFromDb";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import toast, { Toaster } from "react-hot-toast";

const ButtonViewAndDelete = ({
  link,
  id,
}) => {
  const [isClicked, setIsClicked] = useState(true);
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

  function test () {
    const notify = () => toast("state.message");
      notify();
  }
  return (
    <form
      className="justify-end flex items-center gap-2 relative"
      onMouseLeave={() => setIsClicked(false)} // Hide when mouse leaves entire area
    >
      <button onClick={() =>setIsClicked(pre => !pre)} type="button">
sdsd
      </button>
      {isClicked && (
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
      {/* Dropdown menu */}
      <div
        className={`flex gap-2 justify-items-center items-center rounded-md transition-opacity duration-200 ease-out max-sm:right-0 left-0 top-4 
        }`}
      >
        <Link
          href={link}
          className="bg-blue-500  text-primary border border-secondary px-2 py-1 rounded-md hover:bg-tertiary hover:text-secondarytext text-sm"
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
    </form>
  );
};

export default ButtonViewAndDelete;
