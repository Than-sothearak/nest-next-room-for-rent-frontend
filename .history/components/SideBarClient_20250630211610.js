"use client";
import { useState } from "react";
import SideBarMain from "./SideBarMain";

const SideBarClient = ({ session, user, navigation}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      {/*small side */}

      <SideBarMain
      navigation={navigation}
        currentUser={user}
        handleClick={handleClick}
        session={session}
        isOpen={isOpen}
      />

      {/* Overlay (closes sidebar when clicked) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBarClient;
