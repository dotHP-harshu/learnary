import React from "react";
import { IoListCircle } from "react-icons/io5";
import { useNavigate } from "react-router";

function CollectionButton() {
  const navigate = useNavigate();
  return (
    <>
      <IoListCircle
        onClick={() => {
          navigate("/collection");
        }}
        title="Collections"
        size={40}
        className="border-2 p-1 dark:border-text-primary-dark
      dark:text-text-primary-dark border-text-primary-light
      text-text-primary-light rounded-full cursor-pointer"
      />
    </>
  );
}

export default CollectionButton;
