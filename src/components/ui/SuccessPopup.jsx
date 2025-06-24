import React, { useEffect, useState } from "react";

function SuccessPopup({ msg }) {
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsShowing(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    isShowing && (
      <p className="fixed top-10 left-1/2 -translate-y-1/2 w-fit border-2 border-success text-success text-sm bg-surface-light dark:bg-surface-dark px-4 py-2 rounded-lg">
        {msg}
      </p>
    )
  );
}

export default SuccessPopup;
