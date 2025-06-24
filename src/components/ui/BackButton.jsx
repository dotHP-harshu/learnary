import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router";

function BackButton({ path }) {
  const navigate = useNavigate();
  return (
    <div className="py-6 pl-10">
      <BiArrowBack
        title="Back"
        onClick={() => navigate(path)}
        className="text-4xl cursor-pointer border-2 border-transparent hover:bg-primary transition-colors duration-300 p-1 rounded-full text-text-primary-light dark:text-text-primary-dark"
      />
    </div>
  );
}

export default BackButton;
