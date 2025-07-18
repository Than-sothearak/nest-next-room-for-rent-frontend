"use client";
import { FaSearch } from "react-icons/fa";
import Form from "next/form";
import { useState } from "react";

export default function SearchCompoenent({ placeHolder, linkPage }) {
  const [isInput, setIsInput] = useState("");

  return (
    <Form
      action={`${linkPage}`}
      className="bg-secondary rounded-md max-sm:w-full relative flex items-center justify-start pl-2 gap-2 "
    >
      <input
        type="text"
        name="query"
        value={isInput}
        onChange={(e) => setIsInput(e.target.value)}
        placeholder={placeHolder}
        className="w-36 max-sm:w-full text-xs border-none outline-none ring-0 focus:ring-0 focus:outline-none bg-transparent top-0 bottom-0 left-7 overflow-hidden"
      />
      <button
        title="Search button"
        type="submit"
        className="hover:bg-blue-400 bg-blue-500 px-2 py-2 rounded-r-md text-secondarytext"
      >
        <FaSearch size={12} />
      </button>
    </Form>
  );
}
