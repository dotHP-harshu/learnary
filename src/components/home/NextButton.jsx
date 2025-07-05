import React from "react";
import { FaArrowDown } from "react-icons/fa";

function NextButton() {
  return (
    <div className="cursor-pointer absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 flex justify-center items-center rounded-full border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark z-20">
      <FaArrowDown className="w-fit h-fit text-text-primary-light dark:text-text-primary-dark " />
    </div>
  );
}

export default NextButton;
