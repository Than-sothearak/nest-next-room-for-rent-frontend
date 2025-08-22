"use client";
import { sendMessageToUser } from "@/actions/sendMessgageToUser";
import React, { useActionState } from "react";
import { IoMdClose } from "react-icons/io";

export const FormSendMessage = ({ setIsClicked, userData }) => {
  const sendMessage = sendMessageToUser.bind(null ,userData);
  const [state, action, pending] = useActionState(sendMessage, undefined);
  
  return (
    <div className="bg-black/80 w-full flex justify-center items-center absolute z-40 left-0 top-0 bottom-0">
      <form
        action={action}
        className="px-6 bg-white w-1/2 absolute z-50 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2  flex flex-col justify-start items-end gap-4 rounded-md p-4 shadow-lg border"
      >
        <button
          type="button"
          onClick={() => setIsClicked(false)}
          className="p-1 hover:bg-secondary rounded-full text-black border w-max"
        >
          <IoMdClose size={20} />
        </button>
        <div className="w-full justify-center items-center">
          <label htmlFor="comments" className="font-semibold">
            Your Message
          </label>
          <textarea
            placeholder={`Write your message here...${
              userData ? ` to ${userData.username}` : ""
            } sent by ${state?.session?.user?.username || "User"}`}
            id="message"
            name="message"
            rows="10"
            cols="40"
            className="border w-full rounded-md p-4"
          ></textarea>
        </div>
        {state?.error && (
          <div className="text-red-500 text-sm">
            {state.error} {state.message}
          </div>
        )}
        {state?.success && (
          <div className="text-green-500 text-sm">
            {state.success} {state.message }
            </div>  
        )}

        <button
          type="submit"
          disabled={pending}
          className={`${pending ? 'cursor-wait opacity-50' : ''} hover:bg-secondary hover:text-blue-500 rounded-md border w-max p-4 bg-blue-500 text-primary`}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};
