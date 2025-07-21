"use client";
import { useState } from "react";
import SideBarMain from "./SideBarMain";

const SideBarClient = ({ session, user, navigation, servicesCount}) => {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
  }

  return (
    <>
      {/*small side */}

      <SideBarMain
      servicesCount={servicesCount}
      navigation={navigation}
        currentUser={user}
        handleClick={handleClick}
        session={session}
        isOpen={isOpen}
      />


    </>
  );
};

export default SideBarClient;
