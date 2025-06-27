import React, { useContext, useEffect, useRef, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Signout from "./Signout";
import ThemeToggler from "../ui/ThemeToggler";
import Logo from "../ui/Logo";
import InstallApp from "./InstallApp";

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
    <div className="w-full flex justify-between mb-4 ">
      <Logo size={100} />
      <div
        ref={userPanelRef}
        className={`w-96 max-sm:w-full h-96 fixed top-6 z-50  left-full  transition-all duration-300 max-sm:px-2 ${
          isShowingUserPanel
            ? "-translate-x-[110%] max-sm:-translate-x-full"
            : "translate-x-0"
        }`}
      >
        <div className="w-full h-full p-4  pt-10 flex-col flex justify-between items-center  rounded-2xl  relative bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark">
          <span className=" inline-block w-full ">
            <span className="flex justify-center mb-6 ">
              <Logo size={150} />
            </span>

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
          <span className="flex flex-col gap-2 items-center">
            <InstallApp />
            <Signout />
          </span>
          <span
            className="absolute top-4 right-4 cursor-pointer "
            onClick={() => setIsShowingUserPanel(false)}
          >
            <BsPlusCircleFill
              size={24}
              className="text-primary-500 rotate-45"
            />
          </span>
        </div>
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
