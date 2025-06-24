import React, { useContext, useEffect, useState } from "react";
import { themeContext } from "../../context/ThemeContext";

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
      <label className="flex cursor-pointer select-none items-center scale-75">
        <div className="relative">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="sr-only"
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? "bg-bg-dark" : "bg-primary"
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? "" : "translate-x-full"
            }`}
          ></div>
        </div>
      </label>
    </>
  );
};

export default ThemeToggler;
