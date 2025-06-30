"use client";
import ChooseSingleImageFile from "@/components/ChooseSingleImage";
import { addUsers, updateUser } from "@/actions/users"; // Import update function
import { useActionState, useEffect, useState } from "react";
import ChangPasswordForm from "./ChangPasswordForm";

export default function UserForm({ userId, userData, session }) {
  const [formData, setFormData] = useState({
    name: userData?.username || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
    password: "",
    role: userData?.isAdmin ? "admin" : "user",
    imageUrl: userData?.imageUrl || "",
  });
  const updateUserWithId = updateUser.bind(null, userData?._id);

  const [state, action, isPending] = useActionState(
    userId ? updateUserWithId : addUsers, // Use update action if editing
    undefined,
    userId
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (session?.user?.isAdmin === false && session?.user?._id !== userId)
    return (
      <div className="p-4 text-center text-red-500">
        <p>You are not authorize to this page!</p>
      </div>
    );

  if (session?.user?.isAdmin || session?.user?._id === userId) 
    return (
      <div
     
        className="text-lg w-[978px] max-2xl:w-full mx-auto bg-primary mt-4 border rounded-xl relative"
      >
        <div className="bg-primary text-center p-4 rounded-t-xl">
          <h1 className="font-bold text-lg">
            {userId ? "Edit user" : "Create new user"}
          </h1>
        </div>
        <div className="border-b border-secondary"></div>
        <form action={action} className="flex w-full gap-6 max-md:flex-wrap justify-center p-4">
          <div>
            <ChooseSingleImageFile
              imageUrl={
                formData?.imageUrl ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
            />
            <h2 className="text-lg font-bold mt-4 text-center">
              {formData.role === "admin" ? "Admin" : "User"}
            </h2>
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <div className="text-xs grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-lg font-bold text-primarytext mb-1"
                >
                  Full Name
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  defaultValue={formData?.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="text-lg bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all border-secondary appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
                />
                {state?.errors?.name && (
                  <p className="mt-1 text-lg text-red-600">
                    {state.errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-bold text-primarytext mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={formData?.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="text-lg bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent border-secondary outline-none focus:ring-2 focus:border-none"
                />
                {state?.errors?.email && (
                  <p className="mt-1 text-lg text-red-600">
                    {state.errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-lg font-bold text-primarytext mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  defaultValue={formData?.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="text-lg bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none border-secondary "
                />
                {state?.errors?.phone && (
                  <p className="mt-1  text-red-600">
                    {state.errors.phone}
                  </p>
                )}
              </div>

              {/* Role Field */}
             {session.user.isAdmin ?  <div>
                <label
                  htmlFor="role"
                  className="block font-bold  text-lg mb-2"
                >
                  User Role
                </label>
                <select
                  name="role"
                  id="role"
                  defaultValue={formData?.role}
                  onChange={handleChange}
                  className="text-lg bg-primaryw-full px-4 py-2.5 rounded-lg border border-secondary  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjQgdjRaIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtY2hldnJvbi1kb3duIj48cGF0aCBkPSJtNiA5IDYgNiA2LTYiLz48L3N2Zz4=')] bg-no-repeat bg-[right_0.75rem_center]"
                >
                  <option value="user">User</option>
                  <option value="admin">Administrator</option>
                </select>
              </div> :  <input
                type="text"
                name="role"
                id="address"
                defaultValue={formData?.role}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                className="text-lg bg-secondary hidden border w-full border-secondary  px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
              />}
            </div>

            {/* Address Field */}
            <div className="text-xs">
              <label
                htmlFor="address"
                className="block text-lg font-bold text-primarytext mb-1"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                defaultValue={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                className="text-lg bg-secondary border w-full border-secondary  px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
              />
              {state?.errors?.address && (
                <p className="mt-1 text-lg text-red-600">
                  {state.errors.address}
                </p>
              )}
            </div>

            {!userId ? (
              <div className="text-xs">
                <label
                  htmlFor="password"
                  className="block text-lg font-bold text-primarytext mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  defaultValue={formData?.password}
                  onChange={handleChange}
                  placeholder={
                    userId
                      ? "Leave blank to keep current"
                      : "Create a password aleat 6 charactors"
                  }
                  className="bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
                />
                {state?.errors?.password && (
                  <p className="mt-1 text-lg text-red-600">
                    {state.errors.password}
                  </p>
                )}
                {userId && (
                  <p className="mt-1 text-xs text-gray-500">
                    Only enter if you want to change the password
                  </p>
                )}
              </div>
            ) : ''}

            {/* Form Actions */}
            <div className="">
              <button
                type="submit"
                disabled={isPending}
                className={`text-secondarytext w-full bg-blue-600 hover:bg-blue-700 rounded-xl py-3 ${
                  isPending ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isPending ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {userId ? "Updating..." : "Creating..."}
                  </span>
                ) : userId ? (
                  "Update User"
                ) : (
                  "Create User"
                )}
              </button>
            </div>

            {/* Status Messages */}
            {state?.success && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-lg font-medium text-green-700 text-center">
                  User {userId ? "updated" : "created"} successfully!
                </p>
              </div>
            )}

            {state?.error && !state?.errors && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-lg font-medium text-red-700 text-center">
                  {state.error}
                </p>
              </div>
            )}
          </div>
        </form>
       
  
        {userId && (
              (
              <>
                <div className="border-b border-secondary"></div>
                <ChangPasswordForm userData={userData} formData={formData} handleChange={handleChange} userId={userId}/></>
               )
            )}
     
      </div>
    );
}
