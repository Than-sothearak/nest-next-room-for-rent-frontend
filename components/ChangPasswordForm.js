"use client";
import { changePassword } from "@/actions/change-password";
import React, { useActionState, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { MdOutlineLock } from "react-icons/md";
const ChangPasswordForm = ({ userId, userData }) => {
  const [isCLicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updatePassword = changePassword.bind(null, userData?._id);

  const [state, action, isPending] = useActionState(updatePassword, undefined);
  useEffect(() => {
    if (state?.success) {
      const notify = () => toast(state.message);
      notify();

      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    }

    if (state?.errors) {
      setFormData({
        oldPassword: "",
        newPassword: "",
      });
    }
  }, [state]);
  return (
    <form
      action={action}
      className={`text-xs w-full py-4 gap-2 flex flex-col justify-start items-center`}
    >
      <div>
        <button
          onClick={() => setIsClicked((prv) => !prv)}
          type="button"
          className="hover:text-blue-500 flex justify-center items-center gap-2 text-sm font-bold text-primarytext mb-1 text-center rounded-md"
        >
          <MdOutlineLock size={24} />
          Password
        </button>
      </div>
      {/* <p>Password change successfully</p> */}

      {isCLicked && (
        <div className="bg-secondary rounded-2xl w-1/2 max-md:w-full p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="flex flex-col">
            <div className="flex justify-end">
              <button
                onClick={() => setIsClicked(false)}
                type="button"
                className="hover:bg-slate-600 rounded-full p-1"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <div className="flex justify-start flex-col text-start">
                <h1 className="text-xl font-bold">Change password</h1>
                <p>please enter your old password and new password!</p>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="address"
                    className="text-start block text-sm font-bold text-primarytext mb-1"
                  >
                    Old password
                  </label>
                  <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    onKeyDown={(e) => e.key === " " && e.preventDefault()}
                    value={formData?.oldPassword}
                    onChange={handleChange}
                    minLength={6}
                    placeholder={
                      userId
                        ? "Please enter your old password!"
                        : "Create a password aleat 6 charactors"
                    }
                    className="bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
                  />
                  {state?.errors?.oldPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {state.errors.oldPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="text-start block text-sm font-bold text-primarytext mb-1"
                  >
                    New password
                  </label>
                  <input
                    onKeyDown={(e) => e.key === " " && e.preventDefault()}
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={formData?.newPassword}
                    onChange={handleChange}
                    minLength={6}
                    placeholder={
                      userId
                        ? "Create a new password aleat 6 charactors"
                        : "Create a password aleat 6 charactors"
                    }
                    className="bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
                  />
                  {state?.errors?.newPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {state.errors.newPassword}
                    </p>
                  )}
                </div>
              </div>
              <button
                className={`text-secondarytext py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-bold ${
                  isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                <p>Update</p>
              </button>
            </div>
          </div>
          {state?.errors?.password && (
            <p className="mt-1 text-sm text-red-600">{state.errors.password}</p>
          )}
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
        </div>
      )}
      {/* Overlay (closes sidebar when clicked) */}
      {isCLicked && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80"
          onClick={() => setIsClicked(false)}
        />
      )}
    </form>
  );
};

export default ChangPasswordForm;
