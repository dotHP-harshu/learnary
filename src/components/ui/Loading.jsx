import React from "react";
import { VscLoading } from "react-icons/vsc";

function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <VscLoading
        size={24}
        className="animate-spin text-text-primary-light dark:text-text-primary-dark"
      />
    </div>
  );
}

export default Loading;
