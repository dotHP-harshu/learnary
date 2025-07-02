import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggler = () => {
  const { theme, setTheme } = useContext(themeContext);
  const [isChecked, setIsChecked] = useState(theme === "light");

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };
  const changeTheme = () => {
    const theme = isChecked ? "light" : "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    changeTheme();
  }, [isChecked]);

  return (
    <>
      <label
        className="flex cursor-pointer select-none items-center scale-75 "
        title="Theme"
      >
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div>
            {!isChecked ? (
              <MdLightMode
                size={50}
                className="border-2 p-2 border-border-light  text-text-primary-dark  rounded-full cursor-pointer"
              />
            ) : (
              <MdDarkMode
                size={50}
                className="border-2 p-2  border-border-dark dark:text-text-primary-light  rounded-full cursor-pointer"
              />
            )}
          </div>
        </div>
      </label>
    </>
  );
};

export default ThemeToggler;
