"use client";
import React, { createContext, useState } from "react";
export const NavbarContext = createContext({});

export const NavbarContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }
  return (
    <NavbarContext.Provider
      value={{
        handleClick,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
