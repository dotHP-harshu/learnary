import React, { useContext, useEffect, useRef, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Signout from "./Signout";
import ThemeToggler from "../ui/ThemeToggler";

function UserPanel({ user }) {
  const userPanelRef = useRef(null);

  const [isShowingUserPanel, setIsShowingUserPanel] = useState(false);

  useEffect(() => {
    const hadleOutsideClick = (e) => {
      if (userPanelRef.current && !userPanelRef.current.contains(e.target)) {
        setIsShowingUserPanel(false);
      }
    };

    document.addEventListener("mousedown", hadleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", hadleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full flex justify-end mb-4">
      <div
        ref={userPanelRef}
        className={` min-w-96 min-h-96 fixed top-6 p-4 pt-10 flex-col flex justify-between items-center rounded-2xl left-full bg-surface-light dark:bg-surface-dark transition-all duration-300 border-2 border-border-light dark:border-border-dark ${
          isShowingUserPanel ? "-translate-x-[110%]" : "translate-x-0"
        }`}
      >
        <span className=" inline-block w-full ">
          <h2 className="text-text-primary-light dark:text-text-primary-dark text-2xl max-sm:text-lg text-center capitalize font-bold ">
            {user.user_metadata.name}
          </h2>
          <h2 className="text-text-muted-light dark:text-text-muted-dark text-lg max-sm:text-sm text-center">
            {user.user_metadata.email}
          </h2>
        </span>

        <span className="w-full flex justify-between">
          <h3>Dark theme </h3>
          <ThemeToggler />
        </span>

        <Signout />
        <span
          className="absolute top-4 right-4 cursor-pointer "
          onClick={() => setIsShowingUserPanel(false)}
        >
          <BsPlusCircleFill size={24} className="text-primary-500 rotate-45" />
        </span>
      </div>
      <span
        onClick={() => setIsShowingUserPanel(true)}
        className="inline-block cursor-pointer "
        title="Profile"
      >
        <FaUserCircle
          size={26}
          className="text-text-muted-light dark:text-text-muted-dark "
        />
      </span>
    </div>
  );
}

export default UserPanel;
