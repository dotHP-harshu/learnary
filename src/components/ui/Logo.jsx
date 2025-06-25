import React from "react";

function Logo({ size }) {
  return (
    <img src="/logo.svg" alt="learnary" width={size} className="select-none" />
  );
}

export default Logo;
