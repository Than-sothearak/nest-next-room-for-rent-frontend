"use client";

import { deleteById } from "@/actions/deleteFromDb";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

const ButtonEditAndCancel = ({ link, id, pending, session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (session?.user?.isAdmin) {
      setIsOpen((prev) => !prev);
    }
  };

  const closeAll = () => {
    setIsOpen(false);
    setShowConfirmation(false);
  };

  const deleteUserById = async (id) => {
    setShowConfirmation(false);
    await deleteById(id);
  };

  // Close dropdown on Escape key or click outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeAll();
    };

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeAll();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10" ref={dropdownRef}>
      <button
        type="button"
        title={!session?.user?.isAdmin ? "Don't have permission" : "Options"}
        onClick={toggleDropdown}
        disabled={!session?.user?.isAdmin}
        className={`hover:text-blue-500 ${
          !session?.user?.isAdmin ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <BsThreeDots size={24} />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute right-0 bottom-full mb-2 flex gap-2 bg-white border border-gray-200 shadow-lg rounded-md p-2 transition-opacity duration-200 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href={link}
          className="px-3 py-1 rounded-md bg-primary text-sm hover:bg-tertiary hover:text-secondarytext"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => {
            setShowConfirmation(true);
            setIsOpen(false);
          }}
          className="px-3 py-1 rounded-md bg-red-500 text-secondarytext text-sm hover:bg-red-600"
        >
          Cancel
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-sm">
            <p className="text-center text-sm mb-4 font-medium">
              Are you sure you want to delete this item?
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={closeAll}
                className="w-full py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
              >
                No
              </button>
              <form action={deleteUserById.bind(null, id)} className="w-full">
                <button
                  disabled={pending}
                  className={`w-full py-2 rounded text-sm ${
                    pending
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {pending ? "Deleting..." : "Yes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonEditAndCancel;
