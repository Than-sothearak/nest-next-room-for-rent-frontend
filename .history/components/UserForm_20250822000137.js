"use client";
import ChooseSingleImageFile from "@/components/ChooseSingleImage";
import { addUsers, updateUser } from "@/actions/users"; // Import update function
import { useActionState, useEffect, useState } from "react";
import ChangPasswordForm from "./ChangPasswordForm";
import { formatDate, formatDateForForm } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function UserForm({ userId, userData, session }) {
  const [formData, setFormData] = useState({
    name: userData?.username || "",
    email: userData?.email || "",
    status: userData?.status || "active",
    gender: userData?.gender || "male",
    dateOfBirth: userData?.dateOfBirth || "",
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
  const router = useRouter();
  useEffect(() => {
    if (state?.success) {
      const notify = () => toast(state.message);
      notify();
      router.refresh();
    }
  }, [state]);
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

  function generatePassword(username) {
    const randomNumber = Math.floor(10000000 + Math.random() * 90000000); // 8 digit random number
    return `${username}@${randomNumber}`;
  }

  if (session?.user?.isAdmin || session?.user?._id === userId)
    return (
      <div className="text-lg w-[978px] max-2xl:w-full mx-auto bg-primary border rounded-xl relative">
        <div className="bg-primary text-center p-4 rounded-t-xl">
          <h1 className="font-bold text-lg">
            {userId ? "Edit user" : "Create new user"}
          </h1>
        </div>
        <div className="border-b border-secondary"></div>
        <form
          action={action}
          className="flex w-full gap-6 max-md:flex-wrap justify-center p-4"
        >
          <div>
            <ChooseSingleImageFile
              imageUrl={
                formData?.imageUrl ||
                "/images/user.png"
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
                  placeholder="+ (855) 123 456"
                  className="text-lg bg-secondary border w-full px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none border-secondary "
                />
                {state?.errors?.phone && (
                  <p className="mt-1 text-lg text-red-600">{state.errors.phone}</p>
                )}
              </div>

              {/* Role Field */}
              {session.user.isAdmin ? (
                <div>
                  <label
                    htmlFor="role"
                    className="block font-bold  text-lg mb-1"
                  >
                    User Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    defaultValue={formData?.role}
                    onChange={handleChange}
                    className="text-lg bg-primary w-full px-4 py-2.5 rounded-lg border border-secondary  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all "
                  >
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
              ) : (
                <input
                  type="text"
                  name="role"
                  id="address"
                  defaultValue={formData?.role}
                  onChange={handleChange}
                  placeholder="123 Main St, City, Country"
                  className="text-lg bg-secondary hidden border w-full border-secondary  px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
                />
              )}
            </div>

            {/* {session?.user?.isAdmin && (
             <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 max-md:flex-col">
                <div className="w-full">
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-lg font-bold text-primarytext mb-1"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formatDateForForm(formData?.dateOfBirth) || ""}
                    onChange={handleChange}
                    placeholder="123 Main St, City, Country"
                    className="text-lg bg-secondary border w-full border-secondary  px-4 py-2.5 rounded-lg transition-all appearance-none bg-transparent outline-none focus:ring-2 focus:border-none"
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="address"
                    className="block text-lg font-bold text-primarytext mb-1"
                  >
                    Gender
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        onChange={handleChange}
                        value={"male"}
                        checked={formData?.gender === "male"}
                      />
                      <label htmlFor="male">Male</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        onChange={handleChange}
                        value={"female"}
                        checked={formData?.gender === "female"}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                  {state?.errors?.gender && (
                    <p className="mt-1 text-lg text-red-600">
                      {state.errors.gender}
                    </p>
                  )}
                </div>

            
              </div>
                  <div className="grid gap-2">
                  <label className="font-bold">Account status</label>
                  <select
                    name="status"
                    value={formData?.status}
                    onChange={handleChange}
                    required
                    className={`border rounded p-2 ${
                      formData?.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    <option value="active" className="text-black">
                      Active
                    </option>
                    <option value="deactivated" className="text-black">
                      Deactivated
                    </option>
                  </select>

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
                </div>
             </div>
            )} */}

            {/* Address Field */}
            <div className="">
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
              <div className="">
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
            ) : (
              ""
            )}

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

            {state?.error && !state?.errors && (
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
          </div>
        </form>

        {userId && (
          <>
            <div className="border-b border-secondary"></div>
            <ChangPasswordForm
              userData={userData}
              formData={formData}
              handleChange={handleChange}
              userId={userId}
            />
          </>
        )}
      </div>
    );
}
